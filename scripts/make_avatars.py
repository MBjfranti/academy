#!/usr/bin/env python3
"""
Square avatars for the four writers, cropped out of their face frames.

    python scripts/make_avatars.py            # report
    python scripts/make_avatars.py --write    # write public/img/writers/<id>/avatar.webp

WHY NOT JUST USE THE FACE FRAME. The byline was showing `face-thumb.webp`, which is the
whole environmental portrait scaled to 420px and then squeezed into a small round slot by
CSS. At that size the writer is a smudge in the middle of a quayside, and the one job a
byline picture has is to be recognisable at forty pixels.

So this crops a real square around the head and ships it at 256px. The crop is not detected,
it is DECLARED, per writer, below. Face detection would need another dependency to get four
numbers that will not change again, and a wrong automatic crop is harder to notice than a
wrong number in a table.

CENTRES are the head's position in the source frame as a fraction of width and height, and
SIDE is the square's size as a fraction of the frame's SHORTER edge. Read off the pictures
by eye. If a face frame is ever rerolled, these want checking again, which is why the report
mode prints the crop box it would use.
"""
from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
WRITERS = ROOT / "public" / "img" / "writers"
OUT_PX = 256

# writer -> (centre x, centre y, square side as a fraction of the shorter edge)
CROPS = {
    "yadinu":   (0.50, 0.30, 0.62),
    "henut":    (0.52, 0.26, 0.58),
    "balatu":   (0.43, 0.30, 0.62),
    "anniwiya": (0.50, 0.28, 0.58),
}


def crop_box(w: int, h: int, cx: float, cy: float, side: float):
    """A square inside the frame, centred where asked and nudged back in if it overhangs."""
    s = int(min(w, h) * side)
    x, y = int(w * cx - s / 2), int(h * cy - s / 2)
    x = max(0, min(x, w - s))
    y = max(0, min(y, h - s))
    return x, y, x + s, y + s


def main() -> None:
    write = "--write" in sys.argv
    missing, made = [], []

    for writer, (cx, cy, side) in CROPS.items():
        src = WRITERS / writer / "face.webp"
        if not src.exists():
            missing.append(writer)
            continue
        with Image.open(src) as im:
            im = im.convert("RGB")
            box = crop_box(im.width, im.height, cx, cy, side)
            av = im.crop(box).resize((OUT_PX, OUT_PX), Image.LANCZOS)
            dest = WRITERS / writer / "avatar.webp"
            print(f"  {writer:9s} {im.width}x{im.height} -> crop {box} -> {OUT_PX}px")
            if write:
                # Quality 88 rather than the ladder the big frames use: an avatar is 30 KB
                # at worst and the file-size ceiling those obey is not in play here.
                av.save(dest, "WEBP", quality=88, method=6)
                made.append(dest)

    if missing:
        print(f"\nno face frame yet for: {', '.join(missing)}")
    if write:
        total = sum(p.stat().st_size for p in made)
        print(f"\nwrote {len(made)} avatar(s), {total // 1024} KB")
    else:
        print("\n(pass --write to encode)")


if __name__ == "__main__":
    main()
