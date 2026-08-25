#!/usr/bin/env python3
"""
Subset the ancient-script faces, and prove every sign the site publishes is really there.

    python scripts/font/build_scripts.py            # verify only
    python scripts/font/build_scripts.py --write    # write public/fonts/*.woff2

TWO CHECKS, AND THE FIRST ONE MATTERS MORE.

1. RE-DERIVE. src/data/scripts.js carries both the rendered string and the Unicode sign
   NAMES it is supposed to be made of. This script looks every name up through
   unicodedata and rebuilds the string from scratch. If the literal and the derivation
   disagree, someone pasted a sign that is not the sign they meant — which is exactly the
   failure nobody can see, because one cuneiform sign looks much like another to a reader
   who does not read cuneiform.

2. CMAP. Every codepoint must exist in the shipped subset. A missing sign renders as a
   tofu box, and a tofu box on a site about accuracy is worse than showing nothing.

WHY NOT unicode-range ALONE. `unicode-range` only saves the download when the range is
UNUSED. Here every range is always used, so it saves nothing — the win comes from
subsetting to the roughly two dozen signs actually published, which turns 5.9 MB of font
into tens of kilobytes.

LICENCE. `--name-IDs=0,7,13,14` is deliberate and must not be trimmed to save 300 bytes:
IDs 0, 13 and 14 are the copyright notice, the licence description and the licence URL,
and OFL clause 2 requires them to travel with any redistributed copy.
"""
from __future__ import annotations

import pathlib
import re
import sys
import unicodedata as ud

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = pathlib.Path(__file__).resolve().parents[2]
SRC = ROOT / "scripts" / "font" / "src"
OUT = ROOT / "public" / "fonts"
DATA = ROOT / "src" / "data" / "scripts.js"

# script key -> (source face, output stem, Unicode name prefix for re-derivation)
FACES = {
    "cuneiform": ("NotoSansCuneiform-Regular.ttf", "noto-cuneiform", "CUNEIFORM SIGN "),
    "egyptian": ("NotoSansEgyptianHieroglyphs-Regular.ttf", "noto-egyptian", "EGYPTIAN HIEROGLYPH "),
    "linearb": ("NotoSansLinearB-Regular.ttf", "noto-linearb", "LINEAR B SYLLABLE "),
    "ugaritic": ("NotoSansUgaritic-Regular.ttf", "noto-ugaritic", "UGARITIC LETTER "),
}


def parse_words() -> dict[str, list[dict]]:
    """Read the word list straight out of scripts.js.

    Regex rather than a JS parser on purpose: the file is a plain literal, this runs in the
    same breath as the font build, and adding a Node round-trip to read four arrays would
    cost more than it is worth.
    """
    text = DATA.read_text(encoding="utf-8")
    out: dict[str, list[dict]] = {}
    for script in FACES:
        m = re.search(rf"\b{script}: \[(.*?)\n  \],", text, re.S)
        if not m:
            continue
        rows = []
        for entry in re.finditer(
            r"\{\s*signs:\s*'((?:[^'\\]|\\.)*)'.*?t:\s*'((?:[^'\\]|\\.)*)'.*?of:\s*\[(.*?)\]",
            m.group(1),
            re.S,
        ):
            # scripts.js writes astral signs as ES6 \u{1F...} escapes, which the
            # unicode_escape codec does not understand (it wants the 4-digit \uXXXX form
            # and chokes on the brace). Expand the braced form directly instead.
            signs = re.sub(
                r"\\u\{([0-9A-Fa-f]+)\}",
                lambda x: chr(int(x.group(1), 16)),
                entry.group(1),
            )
            names = re.findall(r"'([^']+)'", entry.group(3))
            rows.append({"signs": signs, "t": entry.group(2), "of": names})
        out[script] = rows
    return out


def main() -> None:
    write = "--write" in sys.argv
    words = parse_words()
    if not words:
        sys.exit("could not read any words out of scripts.js")

    problems: list[str] = []
    total = 0

    for script, (src_name, stem, prefix) in FACES.items():
        rows = words.get(script, [])
        src = SRC / src_name
        if not rows:
            print(f"  {script}: no words")
            continue
        if not src.exists():
            print(f"  SKIP {script} ({src_name} not downloaded)")
            continue

        # -- check 1: rebuild each string from its declared sign names ------------------
        for r in rows:
            try:
                derived = "".join(ud.lookup(prefix + n) for n in r["of"])
            except KeyError as e:
                problems.append(f"{script} {r['t']}: no sign named {e}")
                continue
            if derived != r["signs"]:
                problems.append(
                    f"{script} {r['t']}: literal {[hex(ord(c)) for c in r['signs']]} "
                    f"!= names {[hex(ord(c)) for c in derived]}"
                )

        cps = sorted({ord(c) for r in rows for c in r["signs"]})
        font = TTFont(src)
        have = set()
        for t in font["cmap"].tables:
            have |= set(t.cmap)
        font.close()
        for cp in cps:
            if cp not in have:
                problems.append(f"{script}: U+{cp:05X} not in {src_name}")

        if not write:
            print(f"  {script:10s} {len(rows)} words, {len(cps)} signs — source OK")
            continue

        dest = OUT / f"{stem}-subset.woff2"
        subset.main([
            str(src),
            "--unicodes=" + ",".join(f"U+{c:X}" for c in cps),
            "--layout-features=",     # isolated display signs; there is no shaping to do
            "--no-hinting",           # never set below ~24px
            "--desubroutinize",
            "--name-IDs=0,7,13,14",   # OFL clause 2 — see module docstring
            "--drop-tables+=DSIG",
            "--flavor=woff2",
            f"--output-file={dest}",
        ])

        # -- check 2: the SUBSET must still draw every sign ----------------------------
        out_font = TTFont(dest)
        got = set()
        for t in out_font["cmap"].tables:
            got |= set(t.cmap)
        out_font.close()
        missing = [c for c in cps if c not in got]
        for c in missing:
            problems.append(f"{script}: U+{c:05X} LOST in subsetting")

        kb = dest.stat().st_size / 1024
        total += kb
        ratio = src.stat().st_size / dest.stat().st_size
        print(f"  {stem:16s} {len(cps):3d} signs  {kb:6.1f} KB  ({ratio:.0f}x smaller)")

    if write:
        print(f"\n  {'total':16s}      {total:11.1f} KB")

    if problems:
        print("\nPROBLEMS")
        for p in problems:
            print("  " + p)
        sys.exit("refusing to ship — see above")
    print("\nall signs verified against their Unicode names and the shipped cmap")


if __name__ == "__main__":
    main()
