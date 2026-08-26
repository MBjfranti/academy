#!/usr/bin/env python3
"""
Barley & Bronze - image GENERATION. The missing front half of the pipeline.

    raw art  ->  images/_raw/gen-<slug>.png
                      |
                      v
             scripts/process_images.py     (already exists: key, crop, resize, budget)
                      |
                      v
                 public/img/*.webp|png  +  src/data/imagery.js

This script owns only the first arrow. It does NOT key, crop, resize or encode anything -
process_images.py already does all of that well, and duplicating it would give us two
answers to the same question. What this adds is: a prompt per subject, a call to OpenAI, a
manifest so a second run costs nothing, and a cost ceiling so a bad flag cannot empty an
account.

DRY RUN IS THE DEFAULT. It prints every prompt and the exact spend, and calls nothing.
You must pass --execute to spend money.

    python scripts/generate_images.py                      # plan everything, spend nothing
    python scripts/generate_images.py --tier staples       # plan one batch
    python scripts/generate_images.py --show pearl-barley  # the full prompt for one subject
    python scripts/generate_images.py --audit              # slugs here vs slugs in src/data
    python scripts/generate_images.py --tier staples --execute --budget 1.00

    python scripts/process_images.py                       # then the existing back half

FLAGS
    --tier T[,T]      staples | dishes | panels | icons        (default: all)
    --only slug[,..]  just these subjects
    --execute         actually call the API. Without it nothing is called.
    --force           re-generate subjects that already have art (see REROLLING)
    --budget USD      hard ceiling for this run (default 5.00). Refuses to start above it,
                      and stops mid-run once actual spend would cross it.
    --quality Q       low | medium | high. Overrides the per-tier default.
    --concurrency N   parallel calls (default 1 - see RATE LIMITS)
    --retries N       attempts per image (default 4, exponential backoff)
    --show slug       print one full prompt and exit
    --audit           cross-check slugs against src/data/*.js and exit
    --emit            rewrite scripts/generated.json from what is on disk and exit
    --imagery         rewrite src/data/imagery.generated.js from public/img and exit
    --prompts         with a dry run, print the full text of every planned prompt

THE API KEY comes from $OPENAI_API_KEY and nowhere else. It is never printed, never
written to the manifest, never passed on a command line. If it is missing, --execute fails
immediately with a message rather than prompting for it.

IDEMPOTENCY. scripts/imagegen_manifest.json records, per subject: the sha256 of the prompt
that produced the art, the model/size/quality, the sha256 of the returned bytes, the
timestamp and the charge. A subject is SKIPPED when its raw file exists AND its manifest
row's prompt hash matches the prompt we would send now. So:

  * re-running costs nothing and changes nothing;
  * editing a subject's art direction in subjects.py invalidates only that subject, and
    the next run reports it as CHANGED rather than silently keeping stale art;
  * a run interrupted half way resumes exactly where it stopped.

LAYOUT.

    images/_raw/                      hand-supplied source art, loose (never touched here)
    images/_raw/generated/            what this script writes: gen-<slug>.png
    images/_raw/generated/superseded/ raws replaced by a reroll, kept for comparison
    images/_raw/processed/            what process_images.py shipped, mirrored for review
    public/img/                       what the site actually serves

REROLLING. `--force` does not overwrite. It moves the existing raw into
images/_raw/generated/superseded/<slug>-<sha8>.png first, which is Undici's convention and
which happens to be load-bearing here: process_images.py walks each input directory with a
non-recursive iterdir(), so anything in a subfolder stops being a candidate the moment it
is moved. The old art is kept, it just stops shipping.

RATE LIMITS. Default concurrency is 1, one blocking call at a time, because that is what
Undici settled on and because image endpoints throttle on concurrent requests rather than
on tokens. --concurrency 3 is safe on a warm account. Every call is wrapped in exponential
backoff with jitter on 429 and 5xx; a 400 (content refusal, bad size) is NOT retried,
because it will fail identically four more times.
"""

from __future__ import annotations

import argparse
import base64
import concurrent.futures as futures
import hashlib
import json
import os
import random
import re
import sys
import threading
import time
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from subjects import SUBJECTS, TIERS  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
# images/_raw holds hand-supplied source art loose at the top level. Everything this
# script produces lives one level down in _raw/generated, so that "what a human found"
# and "what the API made" never get mixed up again, and so a bulk reroll can never touch
# the hand-supplied files.
RAW = ROOT / "images" / "_raw" / "generated"
DONE = RAW / "superseded"
MANIFEST = Path(__file__).resolve().parent / "imagegen_manifest.json"
GENERATED = Path(__file__).resolve().parent / "generated.json"
DATA = ROOT / "src" / "data"

# -- model ----------------------------------------------------------------
#
# gpt-image-1, which is what Undici's config.py defaults to and what produced every asset
# already in public/img. Keeping the same model is the point: the shipped plates and the new
# cutouts have to sit on the same page, and a model change is a style change.
#
# gpt-image-1 accepts only 1024x1024, 1024x1536 and 1536x1024. That decides the panel size:
# 1536x1024 is 3:2, and process_images.py::centre_crop already crops the plates to 1.6, so
# 3:2 is the cheapest source that loses the least (6% off the sides).
MODEL = "gpt-image-1"

# USD per image, gpt-image-1, from OpenAI's image pricing table.
# VERIFY THIS BEFORE A REAL RUN - it is the one number here that goes stale without warning,
# and the whole cost report is built on it. --execute prints it so a wrong figure is visible
# before any spend, not after.
PRICE = {
    ("1024x1024", "low"): 0.011,
    ("1024x1024", "medium"): 0.042,
    ("1024x1024", "high"): 0.167,
    ("1024x1536", "low"): 0.016,
    ("1024x1536", "medium"): 0.063,
    ("1024x1536", "high"): 0.250,
    ("1536x1024", "low"): 0.016,
    ("1536x1024", "medium"): 0.063,
    ("1536x1024", "high"): 0.250,
}

# Per-tier size and quality. Chosen against the FINAL size each asset ships at, which
# process_images.py fixes: cutouts land at 160-360px tall, plates at 880px wide.
#
#   icons    ship at 160px of flat carved stone. `low` is genuinely enough for a silhouette
#            plus a bevel, and it is fifteen times cheaper than `high`.
#   staples  ship at 300px and have to be identifiable - barley vs lentil vs coriander seed
#   dishes   ship at 360px and are the most detailed things here
#   panels   ship at 880x550 next to four existing plates and must not look softer than them
TIER_SPEC = {
    "icons":   ("1024x1024", "low"),
    "staples": ("1024x1024", "medium"),
    "dishes":  ("1024x1024", "medium"),
    "panels":  ("1536x1024", "high"),
    # Landscape like panels, but medium rather than high: these are decorative jokes, not
    # the five accent plates the Market leans on, and four figures at two-thirds height
    # survive medium fine. High would nearly triple the cost of the set for no visible gain
    # at the ~440px they are drawn at.
    "moderns": ("1536x1024", "medium"),
    # Square, same as the other dish plates. Medium is plenty for a drawing that
    # renders at 88px in the grid and 132px in the modal.
    "invented": ("1024x1024", "medium"),
    # The only asset a reader actually studies, and the only one with HTML laid over
    # it, so the coastlines have to hold up. High.
    "maps": ("1536x1024", "high"),
    # The four writers. HIGH, and not negotiable: these are the only photographs on a site
    # of drawings, they carry a face a reader has to recognise across a whole set, and a
    # soft one reads as a costume rather than a person. Portrait is the tier default and
    # the landscape frames override it per subject. See scripts/narrators.py.
    "writers": ("1024x1536", "high"),
}

BACKOFF_BASE = 2.0
_lock = threading.Lock()


# =========================================================================
# manifest
# =========================================================================

def load_manifest() -> dict:
    if MANIFEST.exists():
        return {r["slug"]: r for r in json.loads(MANIFEST.read_text())}
    return {}


def save_manifest(rows: dict) -> None:
    out = sorted(rows.values(), key=lambda r: (r["tier"], r["slug"]))
    MANIFEST.write_text(json.dumps(out, indent=1) + "\n")


def sha(b: bytes) -> str:
    return hashlib.sha256(b).hexdigest()


def raw_path(slug: str) -> Path:
    return RAW / f"gen-{slug}.png"


def spec(subject: dict) -> tuple[str, str]:
    """Tier decides size and quality, unless the subject overrides the size.

    Most tiers are uniform, so the tier table is the right home for the decision. The
    narrator's frames are the exception: the two article heroes are landscape and the rest
    of the set is portrait, and they are one tier because they are one look. A per-subject
    `size` is cheaper than splitting the tier in two.
    """
    size, quality = TIER_SPEC[subject["tier"]]
    return subject.get("size", size), quality


def price_of(subject: dict, quality_override=None, args=None) -> float:
    if args is not None and getattr(args, "provider", "openai") == "gemini":
        return gemini_price(subject, args.gemini_model)
    size, quality = spec(subject)
    return PRICE[(size, quality_override or quality)]


# =========================================================================
# what needs doing
# =========================================================================

def plan(subjects, manifest, force: bool):
    """Split subjects into (todo, skipped). A subject is done when its art exists AND the
    prompt that made it is byte-identical to the prompt we would send now."""
    todo, skipped = [], []
    for s in subjects:
        row = manifest.get(s["slug"])
        have = raw_path(s["slug"]).exists()
        want = sha(s["prompt"].encode())
        if force:
            s["_why"] = "forced"
            todo.append(s)
        elif have and row and row.get("prompt_sha256") == want:
            skipped.append((s, "up to date"))
        elif have and row and row.get("prompt_sha256") != want:
            s["_why"] = "prompt CHANGED since this art was made"
            todo.append(s)
        elif have and not row:
            skipped.append((s, "art on disk but not in the manifest - left alone, "
                               "use --force to replace it"))
        else:
            s["_why"] = "new"
            todo.append(s)
    return todo, skipped


# =========================================================================
# the call
# =========================================================================

# =========================================================================
# GEMINI, the second provider
# =========================================================================
#
# WHY A SECOND PROVIDER AT ALL. One thing only: REFERENCE IMAGES. gpt-image-1 takes a
# prompt and nothing else, so every frame of a writer is an independent roll of the dice
# against a text description, and the set drifts. Henut came back with hair in two frames
# out of three after the brief said shaved head, and the fix was to shout louder in words.
#
# Gemini's image models accept input images alongside the prompt. So a writer's canonical
# `face.webp` can be attached to every other frame in their set, and the model is matching a
# picture rather than reconstructing one from adjectives. That is the whole reason this
# exists, and it is why `--provider gemini` attaches the face automatically.
#
# EVERYTHING ELSE IS SHARED. The prompts are provider-neutral prose and are not rewritten.
# The manifest, the budget ceiling, the idempotency check, the reroll-to-superseded rule and
# the concurrency cap all work exactly as before, because a provider is a function that
# turns a subject into PNG bytes and nothing more.

GEMINI_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/interactions"

# Default to Pro for the writers: these carry faces a reader must recognise across a set,
# which is precisely where the cheaper model is a false economy.
GEMINI_MODEL = "gemini-3-pro-image"

# USD per image, from Google's published pricing table. SAME CAVEAT AS `PRICE` ABOVE: this
# is the one number here that goes stale silently, and every cost report is built on it.
# Verify before a real run. --execute prints the table in use.
GEMINI_PRICE = {
    ("gemini-3-pro-image", "1K"): 0.134,
    ("gemini-3-pro-image", "2K"): 0.134,
    ("gemini-3-pro-image", "4K"): 0.24,
    ("gemini-3.1-flash-image", "1K"): 0.067,
    ("gemini-3.1-flash-image", "2K"): 0.101,
    ("gemini-3.1-flash-image", "4K"): 0.151,
    ("gemini-3.1-flash-lite-image", "1K"): 0.0336,
}

# gpt-image-1 speaks in pixel dimensions and Gemini speaks in aspect ratios, so the subject's
# `size` is translated rather than duplicated. Keeping one vocabulary in subjects.py means a
# frame does not have to know which provider will render it.
GEMINI_RATIO = {"1024x1536": "2:3", "1536x1024": "3:2", "1024x1024": "1:1"}

# 2K is a little over our 1440px shipping edge, which leaves headroom for the article crops
# that zoom into a frame. 4K costs more and buys nothing we display.
GEMINI_SIZE = "2K"


def gemini_price(subject, model: str) -> float:
    return GEMINI_PRICE[(model, GEMINI_SIZE)]


def gemini_reference(subject: dict) -> list[dict]:
    """The writer's canonical face, as an input image, for any frame they appear in.

    THIS IS THE POINT OF THE WHOLE PROVIDER. A frame with `who` set is a frame containing a
    person the reader has to recognise, and the face frame is the reference the rest of the
    set is judged against by eye anyway. Handing it to the model closes that loop.

    Returns [] for a still life, for a face frame generating itself, and whenever the face
    has not been made yet, so a cold checkout still works.
    """
    who = subject.get("who")
    if not who or subject["slug"] == f"{who}-face":
        return []
    face = ROOT / "public" / "img" / "writers" / who / "face.webp"
    if not face.exists():
        return []
    return [{"type": "image", "mime_type": "image/webp",
             "data": base64.b64encode(face.read_bytes()).decode()}]


def gemini_generate(subject: dict, model: str, retries: int) -> bytes:
    """One image from Gemini. Returns PNG bytes; raises on final failure."""
    import requests

    key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    refs = gemini_reference(subject)
    prompt = subject["prompt"]
    if refs:
        prompt = (
            "The attached photograph is the reference for the person named in this brief. "
            "Reproduce that same individual exactly: the same face, bone structure, "
            "colouring, hair and clothing. Place them in the new scene described below.\n\n"
            + prompt
        )
    body = {
        "model": model,
        "input": [{"type": "text", "text": prompt}] + refs,
        "response_format": {
            "type": "image",
            "aspect_ratio": GEMINI_RATIO[spec(subject)[0]],
            "image_size": GEMINI_SIZE,
        },
    }
    for attempt in range(1, retries + 1):
        try:
            r = requests.post(GEMINI_ENDPOINT, json=body, timeout=300,
                              headers={"x-goog-api-key": key,
                                       "Content-Type": "application/json"})
            if r.status_code in (400, 401, 403, 404):
                raise RuntimeError(f"HTTP {r.status_code}: {r.text[:300]}")
            r.raise_for_status()
            j = r.json()
            b64 = (j.get("output_image") or {}).get("data")
            if not b64:
                for step in j.get("steps", []):
                    for c in step.get("content", []):
                        if c.get("type") == "image" and c.get("data"):
                            b64 = c["data"]
                            break
                    if b64:
                        break
            if not b64:
                raise RuntimeError(f"no image in response: {str(j)[:300]}")
            return base64.b64decode(b64)
        except Exception as e:                                    # noqa: BLE001
            if attempt == retries or "HTTP 4" in str(e):
                raise
            wait = BACKOFF_BASE ** attempt + random.uniform(0, 1.0)
            with _lock:
                print(f"    {subject['slug']}: {type(e).__name__} "
                      f"(attempt {attempt}/{retries}) - retrying in {wait:.1f}s")
            time.sleep(wait)
    raise RuntimeError("unreachable")


def gemini_client(model: str):
    """Fails before spending anything if the key or the dependency is missing."""
    if not (os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")):
        sys.exit(
            "GEMINI_API_KEY is not set.\n"
            "  PowerShell:  $env:GEMINI_API_KEY = '<key>'\n"
            "  bash:        export GEMINI_API_KEY='<key>'\n"
            "Get one at https://aistudio.google.com/apikey\n"
            "Nothing was generated and nothing was charged."
        )
    try:
        import requests  # noqa: F401
    except ImportError:
        sys.exit("pip install requests  - required for --provider gemini")
    if model not in {m for m, _ in GEMINI_PRICE}:
        sys.exit(f"unknown gemini model: {model}\nknown: "
                 + ", ".join(sorted({m for m, _ in GEMINI_PRICE})))
    return model


def client():
    """The OpenAI client, or a clear exit. The key is read here and nowhere else."""
    if not os.environ.get("OPENAI_API_KEY"):
        sys.exit(
            "OPENAI_API_KEY is not set.\n"
            "  PowerShell:  $env:OPENAI_API_KEY = '<key>'\n"
            "  bash:        export OPENAI_API_KEY='<key>'\n"
            "Nothing was generated and nothing was charged."
        )
    try:
        from openai import OpenAI
    except ImportError:
        sys.exit("pip install openai  - required for --execute")
    return OpenAI()          # reads OPENAI_API_KEY from the environment itself


def generate_one(cli, subject: dict, quality: str, retries: int) -> bytes:
    """One image, with backoff. Returns PNG bytes; raises on final failure.

    TWO ENDPOINTS, and which one is used depends on whether the subject carries a reference
    photograph. This is the whole answer to the drift problem and it was available all along:

      images.generate   prompt only. Still lifes, and a writer's own face frame.
      images.edit       prompt PLUS the writer's canonical face.webp. Every other frame of
                        a person, so the model is matching a photograph of them rather than
                        reconstructing one from adjectives.

    Before this, every frame of Henut was an independent roll against a text description and
    the set drifted: hair where the brief said shaved head, a different woman between the
    oven and the ration line. narrators.py pairs the reference with a much SHORTER brief for
    the same reason, since a photograph answers the face better than six hundred words can.
    """
    size, _ = spec(subject)
    ref = subject.get("reference")
    for attempt in range(1, retries + 1):
        fh = None
        try:
            if ref:
                fh = open(ref, "rb")
                r = cli.images.edit(
                    model=MODEL,
                    image=fh,
                    prompt=subject["prompt"],
                    size=size,
                    quality=quality,
                    n=1,
                )
                return base64.b64decode(r.data[0].b64_json)
            r = cli.images.generate(
                model=MODEL,
                prompt=subject["prompt"],
                size=size,
                quality=quality,
                n=1,
                # Opaque, ALWAYS - never the model's own transparency. Undici measured this:
                # gpt-image-1 renders near-white regions as transparent when asked for a
                # transparent background, which put a 49% hole through a mark that was half
                # off-white. Half the subjects here are bone, cream and white cheese. We key
                # a flat magenta field ourselves instead, and process_images.py's keyer is a
                # better one than the model's alpha anyway.
                background="opaque",
                output_format="png",
            )
            return base64.b64decode(r.data[0].b64_json)
        except Exception as e:                                    # noqa: BLE001
            status = getattr(e, "status_code", None) or getattr(e, "code", None)
            fatal = status in (400, 401, 403, 404)
            if fatal or attempt == retries:
                raise
            wait = BACKOFF_BASE ** attempt + random.uniform(0, 1.0)
            with _lock:
                print(f"    {subject['slug']}: {type(e).__name__} "
                      f"(attempt {attempt}/{retries}) - retrying in {wait:.1f}s")
            time.sleep(wait)
        finally:
            if fh is not None:
                fh.close()
    raise RuntimeError("unreachable")


def run(subjects, manifest, args) -> None:
    gemini = args.provider == "gemini"
    cli = gemini_client(args.gemini_model) if gemini else client()
    size_q = {s["slug"]: (spec(s)[0], args.quality or spec(s)[1]) for s in subjects}
    spent = 0.0
    made, failed = [], []

    def one(s):
        nonlocal spent
        size, quality = size_q[s["slug"]]
        cost = gemini_price(s, args.gemini_model) if gemini else PRICE[(size, quality)]
        with _lock:
            # The ceiling is checked immediately before each call, not once up front, so a
            # concurrent run cannot overshoot by more than one image.
            if spent + cost > args.budget:
                return s, None, f"budget ceiling ${args.budget:.2f} reached"
            spent += cost
        try:
            data = (gemini_generate(s, args.gemini_model, args.retries) if gemini
                    else generate_one(cli, s, quality, args.retries))
        except Exception as e:                                    # noqa: BLE001
            with _lock:
                spent -= cost                                     # nothing was produced
            return s, None, f"{type(e).__name__}: {e}"
        p = raw_path(s["slug"])
        if p.exists():
            DONE.mkdir(parents=True, exist_ok=True)
            old = p.read_bytes()
            p.replace(DONE / f"{s['slug']}-{sha(old)[:8]}.png")
        p.write_bytes(data)
        return s, dict(
            slug=s["slug"], tier=s["tier"], out=s["out"], kind=s["kind"],
            raw=p.name, provider=args.provider,
            reference=(Path(s["reference"]).name if s.get("reference") else None),
            model=(args.gemini_model if gemini else MODEL),
            size=(GEMINI_SIZE if gemini else size), quality=quality,
            prompt_sha256=sha(s["prompt"].encode()),
            image_sha256=sha(data), bytes=len(data), usd=cost,
            generated=datetime.now(timezone.utc).isoformat(timespec="seconds"),
        ), None

    print(f"\n-- generating {len(subjects)} image(s), ceiling ${args.budget:.2f} --")
    with futures.ThreadPoolExecutor(max_workers=max(1, args.concurrency)) as pool:
        for s, row, err in pool.map(one, subjects):
            with _lock:
                if err:
                    print(f"  !! {s['slug']:38s} {err}")
                    failed.append(s["slug"])
                else:
                    manifest[s["slug"]] = row
                    made.append(s["slug"])
                    print(f"  ok {s['slug']:38s} {row['size']} {row['quality']:<6} "
                          f"{row['bytes'] // 1024:>4} KB  ${row['usd']:.3f}")
                    save_manifest(manifest)      # after EVERY image: a crash loses one call

    save_manifest(manifest)
    emit_generated(manifest)
    print(f"\n{len(made)} generated, {len(failed)} failed. Spent ${spent:.2f}.")
    if failed:
        print("failed: " + ", ".join(failed))
    print("Next:  python scripts/process_images.py")


# =========================================================================
# handing off to process_images.py
# =========================================================================

def emit_generated(manifest: dict) -> None:
    """The bridge. process_images.py reads this and folds the rows into its own PLATES /
    CUTOUTS tables, so a generation run never requires editing that file.

    Only rows whose raw is actually on disk are written, so the file never asks
    process_images.py for something that is not there.

    THE WRITERS TIER IS EXCLUDED, and that is the whole reason this filter exists. Those
    frames are photographs of people and process_writers.py already owns them: it reads the
    same images/_raw/generated directory and does the resize-and-encode they need. Letting
    them through here would hand the same file to process_images.py as well, which would
    mat and crop it as though it were a drawn plate.
    """
    by_slug = {s["slug"]: s for s in SUBJECTS}
    rows = []
    for slug, r in sorted(manifest.items()):
        if not raw_path(slug).exists():
            continue
        s = by_slug.get(slug)
        if s is None or s["tier"] == "writers":
            continue
        row = dict(raw=r["raw"], out=s["out"], kind=s["kind"])
        if s["kind"] == "cutout":
            row["height"] = s["height"]
        else:
            row["ratio"] = s.get("ratio", 1.6)
        rows.append(row)
    GENERATED.write_text(json.dumps(rows, indent=1) + "\n")
    print(f"wrote {GENERATED.relative_to(ROOT)}  ({len(rows)} row(s))")


IMAGERY = ROOT / "src" / "data" / "imagery.generated.js"

GROUPS = {"staples": ("stapleImages", "staple-"),
          "dishes": ("dishImages", "dish-"),
          "icons": ("aisleIcons", "aisle-")}


def emit_imagery() -> None:
    """Write src/data/imagery.generated.js - the same {src, alt, w, h, kind} shape as
    imagery.js, for whatever has actually shipped into public/img.

    A SEPARATE MODULE, not an edit to imagery.js, for two reasons. imagery.js is hand-written
    and its alt text is careful; a generator that rewrites it would flatten that. And a file
    that only exists after a real run cannot be imported unconditionally without breaking
    `npm run build` for anyone who has not run one. To wire it up, once, by hand:

        import { stapleImages, dishImages, aisleIcons } from './imagery.generated.js'
        ...spread them into `byKey` at the bottom of imagery.js.

    THE ALT TEXT HERE IS A DRAFT. It is the art direction from subjects.py, which describes
    what was ASKED for, not what came back. Read the picture and rewrite it - imagery.js's
    own comment is right that these assets carry real information and deserve describing.
    """
    from PIL import Image
    by_slug = {s["slug"]: s for s in SUBJECTS}
    out = ["// GENERATED by scripts/generate_images.py --imagery. Do not hand-edit;",
           "// re-running overwrites it. See imagery.js for the hand-written manifest.",
           "//",
           "// ALT TEXT IS A DRAFT taken from the prompt. Rewrite it against the picture.",
           ""]
    n = 0
    for tier, (export, prefix) in GROUPS.items():
        rows = []
        for s in (x for x in SUBJECTS if x["tier"] == tier):
            p = ROOT / "public" / "img" / f"{s['out']}.png"
            if not p.exists():
                continue
            with Image.open(p) as im:
                w, h = im.size
            alt = s["art"][0].upper() + s["art"][1:] + "."
            rows.append(f"  '{s['slug']}': {{\n"
                        f"    src: '/img/{s['out']}.png',\n"
                        f"    alt: {json.dumps(alt)},\n"
                        f"    w: {w},\n    h: {h},\n    kind: 'cutout',\n  }},")
            n += 1
        out.append(f"export const {export} = {{")
        out.extend(rows)
        out.append("}\n")
    IMAGERY.write_text("\n".join(out), encoding="utf-8")
    print(f"wrote {IMAGERY.relative_to(ROOT)}  ({n} entr{'y' if n == 1 else 'ies'})")
    if not n:
        print("  (nothing in public/img yet - run process_images.py first)")


# =========================================================================
# reporting
# =========================================================================

def report(subjects, todo, skipped, args) -> None:
    for s, why in skipped:
        print(f"  skip {s['slug']:38s} {why}")
    if skipped:
        print()

    by_tier: dict[str, list] = {}
    for s in todo:
        by_tier.setdefault(s["tier"], []).append(s)

    total = 0.0
    for tier in TIERS:
        group = by_tier.get(tier)
        if not group:
            continue
        size, quality = TIER_SPEC[tier]
        quality = args.quality or quality
        each = (gemini_price(group[0], args.gemini_model)
                if args.provider == "gemini" else PRICE[(size, quality)])
        sub = each * len(group)
        total += sub
        label = (f"{args.gemini_model} {GEMINI_SIZE}"
                 if args.provider == "gemini" else f"{MODEL} {size} {quality}")
        print(f"  {tier:<8} {len(group):>3} x {label:<34} "
              f"@ ${each:.3f} = ${sub:>6.3f}")
    print(f"  {'':<8} {len(todo):>3} images{'':<38} ${total:>6.3f}")

    if total > args.budget:
        print(f"\n  ** ${total:.2f} exceeds the --budget ceiling of ${args.budget:.2f}. "
              f"Raise it deliberately or narrow the run with --tier / --only. **")
    return total


def show_prompts(todo) -> None:
    for s in todo:
        size, quality = spec(s)
        print("\n" + "=" * 78)
        print(f"{s['slug']}   [{s['tier']}]  -> {s['out']}.{'png' if s['kind'] == 'cutout' else 'webp'}")
        print(f"{MODEL}  {size}  {quality}  ${price_of(s):.3f}   ({s['_why']})")
        print(f"source: {s['source']}")
        print("=" * 78)
        print(s["prompt"])


# =========================================================================
# audit: are the slugs here still the slugs in src/data?
# =========================================================================

def js_slugs(path: Path, key: str | None = None) -> set[str]:
    """Every `slug:`/`key:` string literal in a JS data file. Deliberately crude - it only
    has to be good enough to notice drift, and a crude check that runs is worth more than an
    exact one that needs a JS parser in the loop."""
    txt = path.read_text(encoding="utf-8")
    return set(re.findall(rf"\b{key or 'slug'}:\s*'([^']+)'", txt))


def audit() -> int:
    bad = 0
    ours = {s["tier"]: {x["slug"] for x in SUBJECTS if x["tier"] == s["tier"]}
            for s in SUBJECTS}

    checks = [
        ("staples", "fundamentals.js :: staples",
         js_slugs(DATA / "fundamentals.js") & set(re.findall(
             r"slug:\s*'([^']+)'",
             (DATA / "fundamentals.js").read_text(encoding="utf-8")
             .split("export const buildingBlocks")[0]))),
        ("icons", "market.js :: AISLES", js_slugs(DATA / "market.js", "key")),
    ]

    # dishes = the four basics + every recipe in the five routed regions
    fund = (DATA / "fundamentals.js").read_text(encoding="utf-8")
    basics = set(re.findall(r"slug:\s*'([^']+)'", fund.split("export const basics")[1]
                            .split("export const SECTIONS")[0]))
    rec = (DATA / "recipes.js").read_text(encoding="utf-8")
    routed = {slug for slug, region in re.findall(
        r"slug:\s*'([^']+)'.*?region:\s*'([^']+)'", rec, re.S)
        if region in {"mesopotamia", "egypt", "aegean", "hatti", "levant"}}
    checks.append(("dishes", "basics + routed recipes", basics | routed))

    for tier, label, want in checks:
        have = ours.get(tier, set())
        missing, extra = sorted(want - have), sorted(have - want)
        status = "ok" if not missing and not extra else "DRIFT"
        print(f"{status:<6} {tier:<8} {len(have):>2} here vs {len(want):>2} in {label}")
        for m in missing:
            print(f"         no subject for   {m}")
            bad += 1
        for e in extra:
            print(f"         not in the data  {e}")
            bad += 1

    # AISLES has no market key for 'tap', and hot-pan-flatbread is deliberately shared.
    print("\nnote: hot-pan-flatbread is both a base recipe and a routed Levantine dish "
          "under one slug.\n      One image covers both, which is why dishes is 21 and "
          "not 22.")
    return bad


# =========================================================================

def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__.split("FLAGS")[0],
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--tier", default="", help=f"comma list of {'|'.join(TIERS)}")
    ap.add_argument("--only", default="", help="comma list of slugs")
    ap.add_argument("--execute", action="store_true", help="actually call the API")
    ap.add_argument("--force", action="store_true", help="re-generate existing art")
    ap.add_argument("--budget", type=float, default=5.00, help="hard USD ceiling")
    ap.add_argument("--quality", choices=["low", "medium", "high"])
    # WHICH PROVIDER RENDERS. The prompts are provider-neutral prose and are not
    # rewritten, so this switches the renderer and nothing else. Gemini is here for one
    # reason: it accepts the writer's canonical face as a reference image, which is the
    # only real cure for a set that drifts. See the GEMINI block above.
    ap.add_argument("--provider", choices=["openai", "gemini"], default="openai")
    ap.add_argument("--gemini-model", default=GEMINI_MODEL,
                    help=f"default {GEMINI_MODEL}; also gemini-3.1-flash-image")
    ap.add_argument("--concurrency", type=int, default=1)
    ap.add_argument("--retries", type=int, default=4)
    ap.add_argument("--show", default="", help="print one full prompt and exit")
    ap.add_argument("--prompts", action="store_true", help="print every planned prompt")
    ap.add_argument("--audit", action="store_true")
    ap.add_argument("--emit", action="store_true",
                    help="rewrite scripts/generated.json from disk and exit")
    ap.add_argument("--imagery", action="store_true",
                    help="rewrite src/data/imagery.generated.js and exit")
    args = ap.parse_args()

    if args.audit:
        sys.exit(1 if audit() else 0)
    if args.emit:
        emit_generated(load_manifest())
        return
    if args.imagery:
        emit_imagery()
        return

    subjects = SUBJECTS
    if args.tier:
        want = {t.strip() for t in args.tier.split(",")}
        unknown = want - set(TIERS)
        if unknown:
            sys.exit(f"unknown tier(s): {', '.join(sorted(unknown))}")
        subjects = [s for s in subjects if s["tier"] in want]
    if args.only:
        want = {t.strip() for t in args.only.split(",")}
        subjects = [s for s in subjects if s["slug"] in want]
        missing = want - {s["slug"] for s in subjects}
        if missing:
            sys.exit(f"unknown slug(s): {', '.join(sorted(missing))}")
    if args.show:
        s = next((x for x in SUBJECTS if x["slug"] == args.show), None)
        if s is None:
            sys.exit(f"unknown slug {args.show!r}")
        s["_why"] = "--show"
        show_prompts([s])
        return
    if not subjects:
        sys.exit("nothing selected")

    RAW.mkdir(parents=True, exist_ok=True)
    manifest = load_manifest()
    todo, skipped = plan(subjects, manifest, args.force)

    print(f"\n-- Barley & Bronze : image generation --")
    print(f"{len(subjects)} subject(s) selected, {len(todo)} to generate, "
          f"{len(skipped)} already done\n")
    total = report(subjects, todo, skipped, args)

    if not todo:
        print("\nNothing to do. Run  python scripts/process_images.py  to (re)build public/img.")
        emit_generated(manifest)
        return

    if not args.execute:
        if args.prompts:
            show_prompts(todo)
        print(f"\nDRY RUN - nothing was called and nothing was charged.")
        need = "GEMINI_API_KEY" if args.provider == "gemini" else "OPENAI_API_KEY"
        have = os.environ.get(need) or (os.environ.get("GOOGLE_API_KEY")
                                        if args.provider == "gemini" else None)
        if not have:
            print(f"{need} is NOT set; --execute would fail immediately.")
        print(f"Add --prompts to see the full text of each. "
              f"Add --execute --budget {max(total * 1.1, 0.05):.2f} to spend ${total:.3f}.")
        return

    # The key check is per provider. Calling client() unconditionally meant a Gemini run
    # died on a missing OPENAI_API_KEY, which is a confusing way to fail.
    if args.provider == "gemini":
        gemini_client(args.gemini_model)   # exits with its own message if unusable
    elif not os.environ.get("OPENAI_API_KEY"):
        client()                           # exits with the message; never reaches the API
    if total > args.budget:
        sys.exit(f"\nrefusing to start: ${total:.2f} planned against a "
                 f"${args.budget:.2f} ceiling. Raise --budget deliberately.")
    if args.provider == "gemini":
        print(f"\nprice table in use: {args.gemini_model} at {GEMINI_SIZE}, "
              + ", ".join(f"{k[1]}=${v}" for k, v in sorted(GEMINI_PRICE.items())
                          if k[0] == args.gemini_model))
        print("VERIFY against Google's published pricing before a real run.")
    else:
        print(f"\nprice table in use: {MODEL}, "
              + ", ".join(f"{k[0]}/{k[1]}=${v}" for k, v in sorted(PRICE.items())))
    run(todo, manifest, args)


if __name__ == "__main__":
    main()
