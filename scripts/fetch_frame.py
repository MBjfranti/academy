#!/usr/bin/env python3
"""
Land an image generated SOMEWHERE ELSE into the writers pipeline.

    python scripts/fetch_frame.py <slug> <url-or-local-path>
    python scripts/fetch_frame.py henut-oven https://.../generated.png
    python scripts/fetch_frame.py henut-oven ~/Downloads/henut-oven.png

WHY THIS EXISTS. Copied from undici's `imagegen.fetch_to_file`, which solves the same
problem there: not every generator is a Python client this repo can call. An agent driving
a hosted image tool (Composio's GEMINI_GENERATE_IMAGE, a web UI, a colleague) produces a
short-lived URL or a file on disk, and the rest of the pipeline should not care where the
bytes came from.

    generate_images.py   prompt -> bytes, for providers we can call directly
    fetch_frame.py       bytes  -> the same place, for everything else
    process_writers.py   bytes  -> public/img/writers/<id>/*.webp

SPECIFICALLY: Composio exposes GEMINI_GENERATE_IMAGE, and it is RESTRICTED in this
environment, so the agent route undici uses is unavailable here today. It may not be
tomorrow, and a Gemini key may arrive first. Either way the landing strip is the same, so
it is worth having built.

WHAT IT DOES NOT DO is invent a manifest cost. A frame that arrived from outside has no
price this script can know, so it records usd=0.0 and provider='external'. The manifest
stays honest about what it actually knows.
"""
from __future__ import annotations

import hashlib
import json
import shutil
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RAW = ROOT / "images" / "_raw" / "generated"
DONE = RAW / "superseded"
MANIFEST = Path(__file__).resolve().parent / "imagegen_manifest.json"
FRAMES = Path(__file__).resolve().parent / "frames.json"


def known_slugs() -> set[str]:
    if not FRAMES.exists():
        return set()
    return {r["slug"] for r in json.loads(FRAMES.read_text(encoding="utf-8"))}


def fetch(url: str) -> bytes:
    """A URL or a path on disk. Both are just bytes by the time they get here."""
    if url.startswith(("http://", "https://")):
        try:
            import requests
        except ImportError:
            sys.exit("pip install requests  - required to fetch a URL")
        r = requests.get(url, timeout=180)
        r.raise_for_status()
        return r.content
    p = Path(url).expanduser()
    if not p.is_file():
        sys.exit(f"not a URL and not a file: {url}")
    return p.read_bytes()


def main() -> None:
    if len(sys.argv) != 3:
        sys.exit(__doc__.strip())
    slug, src = sys.argv[1], sys.argv[2]

    slugs = known_slugs()
    if slugs and slug not in slugs:
        sys.exit(f"unknown frame: {slug}\n  known: " + ", ".join(sorted(slugs))
                 + "\n  (run `npm run frames` if a post has just added one)")

    data = fetch(src)
    if len(data) < 1024:
        sys.exit(f"refusing {len(data)} bytes: that is not an image")

    RAW.mkdir(parents=True, exist_ok=True)
    dest = RAW / f"gen-{slug}.png"
    # Same reroll convention as generate_images.py: the old raw is kept, not overwritten,
    # so two versions can be compared by eye afterwards.
    if dest.exists():
        DONE.mkdir(parents=True, exist_ok=True)
        old = dest.read_bytes()
        dest.replace(DONE / f"{slug}-{hashlib.sha256(old).hexdigest()[:8]}.png")
    dest.write_bytes(data)

    rows = {r["slug"]: r for r in json.loads(MANIFEST.read_text(encoding="utf-8"))} \
        if MANIFEST.exists() else {}
    rows[slug] = dict(
        slug=slug, tier="writers", out=f"writers/{slug}", kind="plate",
        raw=dest.name, provider="external", model="external", size="", quality="",
        # No prompt hash: this frame was NOT made from the prompt this repo holds, so
        # claiming otherwise would make the next run think it is up to date when the brief
        # has since changed. Leaving it out means the next planned run reports it as needing
        # regeneration, which is the truthful state.
        image_sha256=hashlib.sha256(data).hexdigest(), bytes=len(data), usd=0.0,
        generated=datetime.now(timezone.utc).isoformat(timespec="seconds"),
        source=src if src.startswith("http") else "local file",
    )
    MANIFEST.write_text(json.dumps(sorted(rows.values(), key=lambda r: r["slug"]),
                                   indent=1) + "\n", encoding="utf-8")

    print(f"landed {len(data) // 1024} KB -> {dest.relative_to(ROOT)}")
    print("next:  python scripts/process_writers.py --write")


if __name__ == "__main__":
    main()
