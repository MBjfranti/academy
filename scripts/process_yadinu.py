#!/usr/bin/env python3
"""
Yadinu's photographs: images/_custom -> public/img/yadinu/*.webp

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

    python scripts/process_yadinu.py            # report
    python scripts/process_yadinu.py --write    # write public/img/yadinu/
"""
from __future__ import annotations

import hashlib
import re
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "images" / "_custom"
# The narrator's own frames, generated against the standard in yadinu.py. They arrive
# already composed and already the right shape, so they need only the resize-and-encode
# half of this script — the same half the hand-supplied photographs need.
GEN = ROOT / "images" / "_raw" / "generated"
OUT = ROOT / "public" / "img" / "yadinu"

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
    """A file that names itself keeps its name; everything else gets a number."""
    stem = path.stem.strip()
    if NAMED.match(stem):
        return f"yadinu-{stem}"
    return f"yadinu-{shape}-{seq:02d}"


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
        rows.append((slug, shape, w, h, p.name))

        if not write:
            continue

        OUT.mkdir(parents=True, exist_ok=True)
        for suffix, longest in (("", FULL), ("-thumb", THUMB)):
            scale = longest / max(w, h)
            out_im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS) if scale < 1 else im
            dest = OUT / f"{slug}{suffix}.webp"
            for q in (80, 72, 64, 56):
                out_im.save(dest, "WEBP", quality=q, method=6)
                if dest.stat().st_size <= MAX_KB * 1024:
                    break

    # ── the generated frames ─────────────────────────────────────────────────────────
    # Named for what they are rather than numbered, because these are placed by hand in
    # an article and a caption has to be able to find them: yadinu-world-hatti, not
    # yadinu-portrait-07.
    for p in sorted(GEN.glob("gen-y-*.png")):
        slug = f"yadinu-{p.stem[len('gen-y-'):]}"
        im = Image.open(p).convert("RGB")
        w, h = im.size
        rows.append((slug, "landscape" if w > h else "portrait", w, h, p.name))
        if not write:
            continue
        OUT.mkdir(parents=True, exist_ok=True)
        for suffix, longest in (("", FULL), ("-thumb", THUMB)):
            scale = longest / max(w, h)
            out_im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS) if scale < 1 else im
            dest = OUT / f"{slug}{suffix}.webp"
            for q in (82, 76, 68, 60, 52):
                out_im.save(dest, "WEBP", quality=q, method=6)
                if dest.stat().st_size <= MAX_KB * 1024:
                    break

    by = {}
    for slug, shape, *_ in rows:
        by[shape] = by.get(shape, 0) + 1
    print(f"\n{len(rows)} unique image(s): {by}")

    if write:
        total = sum(f.stat().st_size for f in OUT.glob("*.webp"))
        print(f"wrote {len(list(OUT.glob('*.webp')))} files, {total // 1024} KB into "
              f"{OUT.relative_to(ROOT)}")
        for slug, shape, w, h, name in rows:
            print(f"  {slug:24s} {shape:10s} {w}x{h}   <- {name[:42]}")
    else:
        print("\n(pass --write to encode)")


if __name__ == "__main__":
    main()
