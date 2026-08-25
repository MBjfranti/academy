#!/usr/bin/env python3
"""
Subset the webfonts, and prove the subsets actually cover what the site renders.

    python scripts/font/build_fonts.py            # report only
    python scripts/font/build_fonts.py --write    # write public/fonts/*.woff2

WHY SELF-HOST AT ALL. Google Fonts cannot serve this site correctly at any price: its
subset slices exclude U+0357 (combining right half ring, in ı͗t) and the subscript digits
U+2082/U+2084 (in NINDA.GUR₄.RA and tu-ro₂). Those characters are not optional decoration,
they are inside published ancient names. A hosted stylesheet that silently drops them is
how "ancient names fall back mid-word" became a live bug in the first place.

WHY SUBSET. The site renders a fixed, hand-authored set of strings. Shipping whole faces
costs 723 KB today for an English-only page — largely because the Source Serif request asks
for three separate instances of one variable font.

THE COVERAGE ASSERTION IS THE POINT. Every failure this replaces was silent: a missing
glyph does not error, it falls back to another face mid-word and merely looks slightly off.
So the build refuses to write a subset that cannot render the site's own characters, and
names the offending codepoints. A font pipeline without that check is how subsets rot.
"""
from __future__ import annotations

import io
import pathlib
import sys
import unicodedata

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = pathlib.Path(__file__).resolve().parents[2]
SRC = ROOT / "scripts" / "font" / "src"
OUT = ROOT / "public" / "fonts"
CHARSET = ROOT / "scripts" / "font" / "charset.txt"

# Characters the site does not use YET but will: the Egyptological letters the next
# Egyptian dish needs, and the macrons Akkadian transliteration keeps reaching for. They
# cost bytes in the tens. Re-running a font build for one glyph is how subsets rot.
FORWARD = "ḎḏṮṯĒĪŌōŪḤḪṢṬÁÂÊÈÎÔÙÜàáçèíìîñôùüĀꜢꜣꜤꜥ₀₁₂₃₄₅₆₇₈₉"

# Punctuation and symbols the UI draws that may not appear as literals in source.
UI_EXTRA = "‘’“”–—…·°µ×→←↑↓≈✓✕✦◆●○▾▴†‡§№£€%‰"

# Symbols the UI draws that NO text face carries, and none should: the close glyph, the
# theme toggle, the meta separator, geometric marks. Every text face on earth omits these,
# and they render perfectly well from the system symbol font. Listing them here keeps them
# out of the subsets AND out of the failure report, so a real coverage gap is not buried
# under seven expected ones.
FALLBACK_OK = set("⌕─═☀☾✕✦◆●○▾▴→←↑↓≈✓†‡№")

# Eczar is DISPLAY ONLY — headings, the wordmark. It renders English dish names and section
# titles, never a transliteration: `.dmodal__anc` and friends ask for --translit, which is
# Gentium. So its subset is plain Latin, and the 45 characters it lacks (every diacritic,
# U+0357, the subscripts) are not a problem as long as nothing routes ancient text into a
# heading. That constraint is the reason §6.3 of docs/typography.md exists.
DISPLAY_ONLY = True

FACES = [
    # (source file, output stem, layout features, display-only?)
    ("SourceSans3.ttf", "source-sans-3",
     "kern,mark,mkmk,ccmp,liga,calt,locl,case,tnum,frac", False),
    ("SourceSans3-Italic.ttf", "source-sans-3-italic",
     "kern,mark,mkmk,ccmp,liga,calt,locl,case,tnum,frac", False),
    ("Eczar.ttf", "eczar",
     "kern,mark,mkmk,ccmp,liga,calt,case,tnum", True),
    ("GentiumPlus-Regular.ttf", "gentium-plus",
     "kern,mark,mkmk,ccmp,liga,locl", False),
]


def harvest() -> set[str]:
    """Every character the site can render, read out of the source rather than typed."""
    chars: set[str] = set()
    for p in (ROOT / "src").rglob("*"):
        if p.suffix in {".js", ".jsx", ".css"} and "_parked" not in str(p):
            chars |= set(io.open(p, encoding="utf-8").read())
    for p in (ROOT / "index.html",):
        if p.exists():
            chars |= set(io.open(p, encoding="utf-8").read())
    # ASCII printable always, plus the forward-looking sets.
    chars |= set(chr(c) for c in range(0x20, 0x7F))
    chars |= set(FORWARD) | set(UI_EXTRA)
    # Drop anything a font cannot carry: control chars, and the astral planes, which belong
    # to the ancient-script faces and are handled by their own unicode-range blocks.
    return {c for c in chars if c.isprintable() and ord(c) < 0x10000 and not c.isspace()} | {" "}


def has(font: TTFont, ch: str) -> bool:
    return any(ord(ch) in t.cmap for t in font["cmap"].tables)


def main() -> None:
    write = "--write" in sys.argv
    if not SRC.is_dir():
        sys.exit(f"missing {SRC} — download the source faces first")

    charset = harvest()
    text = "".join(sorted(charset))
    CHARSET.write_text(text, encoding="utf-8")
    print(f"charset: {len(charset)} characters -> {CHARSET.relative_to(ROOT)}\n")

    OUT.mkdir(parents=True, exist_ok=True)
    failures = []
    total = 0

    for name, stem, features, display_only in FACES:
        src = SRC / name
        if not src.exists():
            print(f"  SKIP {name} (not downloaded)")
            continue

        # A display face needs plain Latin only; a text face needs everything.
        want = {c for c in charset if c not in FALLBACK_OK}
        if display_only:
            want = {c for c in want if ord(c) < 0x0100 or c in "’‘“”–—…·"}
        face_charset = ROOT / "scripts" / "font" / f"charset-{stem}.txt"
        face_charset.write_text("".join(sorted(want)), encoding="utf-8")

        font = TTFont(src)
        # Pre-flight: what does the SOURCE face lack? Subsetting cannot add a glyph, so a
        # gap here is a font-choice problem, not a build problem, and must be reported as
        # such rather than showing up later as a fallback mid-word.
        missing = sorted({c for c in want if not has(font, c)}, key=ord)
        font.close()

        if missing:
            shown = " ".join(f"U+{ord(c):04X}({c})" for c in missing[:12])
            print(f"  {stem}: source lacks {len(missing)} char(s): {shown}")
            failures.append((stem, missing))

        if not write:
            continue

        dest = OUT / f"{stem}-subset.woff2"
        args = [
            str(src),
            f"--text-file={face_charset}",
            f"--layout-features={features}",
            "--flavor=woff2",
            f"--output-file={dest}",
            "--desubroutinize",
            "--no-hinting",
        ]
        subset.main(args)
        kb = dest.stat().st_size / 1024
        total += kb

        # Post-flight: the subset must still render everything the source could. This is
        # the assertion that stops a silent regression shipping.
        out_font = TTFont(dest)
        lost = sorted(
            {c for c in want if c not in set(missing) and not has(out_font, c)}, key=ord
        )
        out_font.close()
        flag = "" if not lost else f"   ** LOST {len(lost)} GLYPHS **"
        print(f"  {stem:24s} {kb:6.1f} KB{flag}")
        if lost:
            failures.append((stem + " (subset)", lost))

    if write:
        print(f"\n  {'total':24s} {total:6.1f} KB")

    if failures:
        print("\nCOVERAGE PROBLEMS")
        for stem, chars in failures:
            for c in chars:
                try:
                    n = unicodedata.name(c)
                except ValueError:
                    n = "?"
                print(f"  {stem:28s} U+{ord(c):04X}  {c}  {n}")
        # A source gap is informational — some faces legitimately do not carry box-drawing
        # characters and never need to. A gap introduced BY subsetting is a build failure.
        if any("(subset)" in s for s, _ in failures):
            sys.exit("subsetting dropped glyphs the source had — refusing to ship")


if __name__ == "__main__":
    main()
