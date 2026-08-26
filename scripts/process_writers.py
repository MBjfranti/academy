#!/usr/bin/env python3
"""
The writers' photographs: images/_custom and images/_raw/generated -> public/img/writers/<id>/

Deliberately its own script rather than a branch inside process_images.py. That script is
built around two questions — is this a chroma-keyed cutout, or a plate to be matted and
cropped — and neither applies here. These are finished photographs. They need resizing,
encoding and nothing else, and bolting a third mode onto a file that already carries the
keying, despilling and vignette-splitting machinery would make it harder to read for no
gain.

TWO SHAPES, and both are kept:
  portrait   1122x1402 (4:5)   — Yadinu himself, mostly
  landscape  1448x1086 (4:3)   — scenes, kitchens, ports

They are NOT cropped to a common ratio. A 4:5 portrait forced into 4:3 loses the head or
the feet, and the whole point of these is the person in them.

Duplicates are dropped by content hash, so a file saved twice under two names ships once.

    python scripts/process_writers.py            # report
    python scripts/process_writers.py --write    # write public/img/writers/<id>/
"""
from __future__ import annotations

import hashlib
import json
import re
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "images" / "_custom"
# The narrator's own frames, generated against the standard in narrators.py. They arrive
# already composed and already the right shape, so they need only the resize-and-encode
# half of this script — the same half the hand-supplied photographs need.
GEN = ROOT / "images" / "_raw" / "generated"
OUT_ROOT = ROOT / "public" / "img" / "writers"

# ONE FOLDER PER WRITER, and the folder carries the identity so the filename does not have
# to. Three of the four writers have a slot named "face", which a single flat directory
# could not hold without a prefix on every reference.
#
# WHICH WRITER A GENERATED FRAME BELONGS TO is not guessable from its filename, so it is not
# guessed: scripts/frames.json says, and that file is written out of the posts themselves by
# `npm run frames`. The hand-supplied photographs in images/_custom are all of Yadinu, from
# when he was the only writer, so they default to his folder.
FRAMES = ROOT / "scripts" / "frames.json"
CUSTOM_WRITER = "yadinu"


def routes() -> dict[str, tuple[str, str]]:
    """gen-<slug>.png  ->  (writer, name). Empty when nobody has run `npm run frames`."""
    if not FRAMES.exists():
        return {}
    return {r["slug"]: (r["writer"], r["name"])
            for r in json.loads(FRAMES.read_text(encoding="utf-8"))}

# Longest edge for the version shown in a post. 1440 rather than 1200 because articles
# now ZOOM into these frames — a 2x close-up on an inset is showing a fraction of the
# file at close to 1:1, so the headroom is the difference between a tight crop and a soft
# one. The source frames are 1448, so this is very nearly native and there is nothing
# further to gain.
FULL = 1440
THUMB = 420        # for the card strip
MAX_KB = 250  # the site-wide ceiling; these were the only assets above it

# NAMED SLOTS — how to control what a picture is called.
#
# Name the FILE what you want the image called, in lowercase with hyphens, and this script
# uses that name verbatim: `world-hatti.png` becomes `yadinu-world-hatti.webp`, which is the
# name an article reaches for. Anything else — a camera filename, a ChatGPT timestamp — gets
# a sequence number by shape instead (`yadinu-portrait-07`), which is fine for a library and
# useless for a caption.
#
# So: to replace the picture in a given slot, drop in a file named after that slot. Nothing
# else needs editing; the article picks it up on the next run.
#
# Subfolders are searched too, and their names mean nothing — group files however suits you.
NAMED = __import__("re").compile(r"^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$")


def slug_for(path: Path, seq: int, shape: str) -> str:
    """A file that names itself keeps its name; everything else gets a number.

    No writer prefix any more: the folder carries that now, so `world-hatti.png` becomes
    writers/yadinu/world-hatti.webp rather than yadinu/yadinu-world-hatti.webp.
    """
    stem = path.stem.strip()
    return stem if NAMED.match(stem) else f"{shape}-{seq:02d}"


def encode(im, w: int, h: int, out_dir: Path, slug: str, qualities) -> None:
    """Both derivatives of one frame, walked down the quality ladder until each fits.

    Pulled out of the two loops below because they had drifted: the hand-supplied set was
    encoding at 80/72/64/56 and the generated set at 82/76/68/60/52, for no reason anybody
    had written down, and a shared ceiling enforced by two different ladders is not a
    shared ceiling.
    """
    out_dir.mkdir(parents=True, exist_ok=True)
    for suffix, longest in (("", FULL), ("-thumb", THUMB)):
        scale = longest / max(w, h)
        out_im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS) if scale < 1 else im
        dest = out_dir / f"{slug}{suffix}.webp"
        for q in qualities:
            out_im.save(dest, "WEBP", quality=q, method=6)
            if dest.stat().st_size <= MAX_KB * 1024:
                break


def main() -> None:
    write = "--write" in sys.argv
    if not SRC.is_dir():
        sys.exit(f"missing {SRC}")

    seen: dict[str, str] = {}
    rows = []
    counters = {"portrait": 0, "landscape": 0, "sheet": 0}

    for p in sorted(SRC.rglob("*")):
        if p.suffix.lower() not in {".png", ".jpg", ".jpeg", ".webp"}:
            continue
        # _maps holds candidate map tablets, which are not photographs of Yadinu and
        # must not be swept in and filed as `yadinu-landscape-NN`.
        #
        # _alt holds superseded takes of a shot that has since been re-shot. They are
        # kept on disk deliberately — a rejected take is worth being able to go back to —
        # but they must not be processed, or a folder that has been re-shot once ends up
        # publishing both versions under two different slot names.
        if "_maps" in p.parts or "_alt" in p.parts:
            continue
        digest = hashlib.md5(p.read_bytes()).hexdigest()
        if digest in seen:
            print(f"  duplicate: {p.name[:40]}  ==  {seen[digest]}  (skipped)")
            continue

        im = Image.open(p).convert("RGB")
        w, h = im.size
        ratio = w / h
        # 1402x1122 is the contact sheet; the ordinary landscapes are 1448x1086.
        if 1.2 < ratio < 1.28:
            shape = "sheet"
        elif ratio < 1:
            shape = "portrait"
        else:
            shape = "landscape"

        counters[shape] += 1
        slug = slug_for(p, counters[shape], shape)
        named = not slug.endswith(f"{shape}-{counters[shape]:02d}")
        if named:
            # A named file did not consume a sequence number, or the numbering would
            # shift every time one was added and every existing reference would break.
            counters[shape] -= 1
        seen[digest] = slug
        rows.append((CUSTOM_WRITER, slug, shape, w, h, p.name))

        if write:
            encode(im, w, h, OUT_ROOT / CUSTOM_WRITER, slug, (80, 72, 64, 56))

    # ── the generated frames ─────────────────────────────────────────────────────────
    # Named for what they are rather than numbered, because an article places these by hand
    # and a caption has to be able to find them: writers/yadinu/world-hatti, not
    # writers/yadinu/portrait-07.
    #
    # THE WORK ORDER DRIVES THIS LOOP, not the directory. images/_raw/generated holds the
    # raws for every tier — dishes, staples, panels, maps — so globbing it and treating
    # whatever turned up as a writer frame would sweep two hundred drawings of lentils into
    # somebody's photograph folder. Walking frames.json instead means this script only ever
    # touches images a post actually asked for, and it can say which of those are still
    # missing, which is the more useful half of the report.
    route = routes()
    pending = []
    for slug, (writer, name) in sorted(route.items()):
        p = GEN / f"gen-{slug}.png"
        if not p.exists():
            pending.append(slug)
            continue
        im = Image.open(p).convert("RGB")
        w, h = im.size
        rows.append((writer, name, "landscape" if w > h else "portrait", w, h, p.name))
        if write:
            encode(im, w, h, OUT_ROOT / writer, name, (82, 76, 68, 60, 52))

    by = {}
    for _, _, shape, *_ in rows:
        by[shape] = by.get(shape, 0) + 1
    print(f"\n{len(rows)} unique image(s): {by}")

    if pending:
        print(f"\n{len(pending)} frame(s) a post asks for and nobody has generated yet:")
        for slug in pending:
            print(f"  {slug}")
        print("  python scripts/generate_images.py --tier writers --execute --budget 4.00")

    if write:
        files = sorted(OUT_ROOT.rglob("*.webp"))
        total = sum(f.stat().st_size for f in files)
        print(f"wrote {len(files)} files, {total // 1024} KB into "
              f"{OUT_ROOT.relative_to(ROOT)}")
        for writer, slug, shape, w, h, name in rows:
            print(f"  {writer:9s} {slug:24s} {shape:10s} {w}x{h}   <- {name[:42]}")
    else:
        print("\n(pass --write to encode)")


if __name__ == "__main__":
    main()
