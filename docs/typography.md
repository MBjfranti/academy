# Typography

**Status: decision document. Nothing here is implemented.** No file in `src/`
was touched to produce it. Every coverage and file-size claim below was
measured on the actual font binaries with `fontTools` and HarfBuzz, and every
character set was extracted from this repository's own source — not from a
specimen page.

---

## 0. What I measured, and two things I found on the way

I walked every `.js/.jsx/.css/.html/.md` file under `src/` plus `index.html`,
collected every non-ASCII codepoint, then shaped the site's real strings
(`tuḫ’u`, `ḥmꜣt`, `wꜥḥ`, `ı͗t`, `NINDA.GUR₄.RA`, `tu-ro₂`, `MÊ ELAMÛTIM ḪARŠI`)
through HarfBuzz against 30 candidate fonts. That is the evidence base.

Two things fell out that are worth fixing regardless of which font wins.

**The site already has a live transliteration bug.** `.rcp__anc` — the copper
ancient-name badge on every recipe card — is set in `var(--mono)`, which is IBM
Plex Mono. Plex Mono has no `ḫ`, no `ḥ`, no `ꜣ`, no `ꜥ`, and no `U+0357`.
HarfBuzz returns `.notdef` for those glyphs; the browser papers over it by
falling back mid-word to whatever system font has them. So `TUḪ’U` renders
today as Plex Mono for four letters and Segoe UI (or Times, or nothing) for
one. Same for `ḥmꜣt`, `wꜥḥ` and `ḪARŠI`. `--display` (Eczar) is worse — it
misses the subscripts too, so `NINDA.GUR₄.RA` breaks in headings. `--body`
(Source Serif 4) covers the Akkadian but fails the Egyptian alef and ain.

**The site's `ancient` field has a data bug, not just a font bug.**
`src/data/recipes.js` writes `wꜤḥ`, `ꜤḤ` and `Ꜥḥ` using **U+A724 LATIN CAPITAL
LETTER EGYPTOLOGICAL AIN** in lowercase transliteration positions. The correct
character is **U+A725**, the small letter. U+A725 appears nowhere in the repo.
It is a three-character fix in `recipes.js` and it should be made before any
font work, because a capital ain is cap-height and a small ain is x-height —
whichever font you pick, the current text will sit visibly too tall.

---

## 1. Recommendation summary

| Role | Font | Licence | Weight (subset woff2) | How loaded |
|---|---|---|---|---|
| `--ui` — labels, chips, tables, numbers, body | **Source Sans 3** (roman + italic, variable `wght`) | OFL 1.1 (RFN `Source`) | **20.4 KB + 20.9 KB** | self-hosted, `pyftsubset` |
| `--translit` — `ancient`, `translit`, `say` | **Gentium Plus** (roman; italic optional) | OFL 1.1 | **16.3 KB** (+19.0 KB italic) | self-hosted, `pyftsubset` |
| `--display` — headings (unchanged) | Eczar (already in use) | OFL 1.1 | **18.4 KB** | self-hosted, `pyftsubset` |
| `--script-cuneiform` | **CuneiformOB 1.001** (Old Babylonian) with Noto Sans Cuneiform 2.001 behind it | OFL **1.0** (RFN) / OFL 1.1 | **23.5 KB** + 9.8 KB / 40 signs | self-hosted subset, `unicode-range` |
| `--script-egyptian` | **NewGardiner 3.08** | OFL 1.1 (RFN `NewGardiner`) | **14.3 KB** / 40 signs | self-hosted subset, `unicode-range` |
| `--script-linearb` | Noto Sans Linear B 2.002 | OFL 1.1 (no RFN) | **4.6 KB** / 40 signs | self-hosted subset, `unicode-range` |
| `--script-anatolian` | Noto Sans Anatolian Hieroglyphs 2.001 | OFL 1.1 (no RFN) | **12.6 KB** / 40 signs | self-hosted subset, `unicode-range` |
| `--script-ugaritic` | Noto Sans Ugaritic 2.001 | OFL 1.1 (no RFN) | **2.5 KB** / all 31 signs | self-hosted subset, `unicode-range` |
| `--body` (Source Serif 4) | **retire** — see §7 | — | **−528 KB** as currently requested | — |
| `--mono` (IBM Plex Mono) | **retire** — see §6 | — | −86 KB | — |

**Budget.** The site downloads **723 KB of woff2 today** for an English-only
page (measured: Eczar 113 KB across three separately-requested weights, IBM
Plex Mono 86 KB across three, Source Serif 4 **528 KB** across three
opsz-variable instances). The full proposal above — a sans, a scholarly serif,
the existing display face, *and* all five ancient scripts — comes to **142 KB**.
Drop the two retired faces and you are at **76 KB** before any ancient script
loads at all. That is a **5.5× reduction** that also fixes every coverage bug in
§0.

> Everything in this document is paid for out of savings. There is no weight
> argument against it.

---

## 2. Body / UI face

### The pick: **Source Sans 3**

Google Fonts `v19` · SIL Open Font License 1.1, Reserved Font Name "Source" ·
designer Paul D. Hunt, Adobe · `github.com/google/fonts/tree/main/ofl/sourcesans3`

Not the obvious answer. Here is why it is the right one *for this site*.

**1. It is the only humanist sans in the candidate field that covers this
site's transliteration.** Measured against the site's 32 real non-ASCII
letterforms, Source Sans 3 misses **none** — including U+A723 `ꜣ`, U+A724/A725
`Ꜥ ꜥ`, U+0357 (the Egyptological yod's combining half-ring, with working GPOS
mark attachment), and the subscript digits `₂ ₄` that carry the Sumerogram and
Linear B sign indices. Every other candidate in the brief fails at least three
of these. Inter misses the Egyptological alef and ain. Public Sans misses nine.
Figtree, Instrument Sans, Manrope, Atkinson Hyperlegible and IBM Plex Sans miss
eleven to thirteen. That is not a rounding error — it is `ḥmꜣt` rendering in two
fonts.

**2. Tabular lining figures by default, no `font-feature-settings` required.**
Measured digit advance widths: all ten digits are 472/1000 units. The Nutrition
page's `.three` table, `.nrow__pct`, `.nrow__val` and `.meal__g` all need
column-aligned numbers and get them without a single feature declaration. Inter,
Public Sans, Figtree, Work Sans, Manrope, Instrument Sans and Libre Franklin are
all proportional by default; six of them expose `tnum`, and **Libre Franklin has
no `tnum` at all** — it cannot do tabular numbers, which disqualifies it here.

**3. It is a drop-in for the site's hand-tuned density budget.** The comments
in `src/index.css` record a fight to keep every tab on one screen ("measured at
1280×760: Produce was over by 104px, Accents by 79"), settled with ~40 hand-set
`font-size` values down to `0.58rem`. Any face with a different x-height blows
that up. Measured x-height / em:

| | x/em | cap/em | set width of "ingredients" |
|---|---|---|---|
| Source Serif 4 (current body) | 0.475 | 0.670 | 5.095 em |
| **Source Sans 3** | **0.478** | 0.660 | **4.480 em** |
| Inter | 0.546 | 0.728 | 5.289 em |
| Noto Sans / Libre Franklin | 0.536 / 0.530 | 0.714 / 0.742 | 5.363 / 5.139 em |

Source Sans 3's x-height is within **0.6%** of the face the site is already
tuned around, and it sets **12% narrower**. Text gets shorter, never longer.
Nothing needs re-measuring. Inter would make everything look 14% larger and run
4% wider and you would be back at 1280×760 with a ruler.

**4. It is the sibling of the serif the site already uses.** Same superfamily,
same designers, same vertical metrics, drawn to sit together. If you keep Source
Serif 4 anywhere — for `.srcquote`, say — the pairing is free and correct rather
than a judgement call.

**5. Full polytonic Greek** (233/256 of Greek Extended, 88 of Greek and Coptic)
— which the site does not use yet but plausibly will, given Linear B and
Mycenaean material. Charis SIL and Doulos SIL, by contrast, carry only 23 Greek
characters and no polytonic at all.

**The one honest caveat.** Source Sans 3 has a *low* x-height in absolute terms
(0.478 vs Inter's 0.546). At `.tile__sig`'s `0.58rem` that is genuinely small.
Two mitigations, in order of preference: raise the three sub-`0.65rem` chip
sizes by ~1 step (they were tuned for a serif that is equally small, so this is
a net wash), or set `font-size-adjust: ex-height 0.478` on `body` so the fallback
never jumps. Do **not** reach for a bigger-x-height face to solve it — that is
how you lose the one-screen layout.

### The exact stack

```css
--ui:
  'Source Sans 3',
  'Source Sans 3 Fallback',          /* metric-matched local fallback, below */
  ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto,
  'Helvetica Neue', Arial, sans-serif;
```

And the CLS-free fallback, computed from measured metrics (Source Sans 3
x/em 0.478, hhea ascent 1.024, descent 0.400; Arial x/em 0.519):

```css
@font-face {
  font-family: 'Source Sans 3 Fallback';
  src: local('Arial'), local('Helvetica Neue'), local('Liberation Sans');
  size-adjust: 92.1%;         /* 0.478 / 0.519 */
  ascent-override: 111.2%;    /* 1.024 / 0.921 */
  descent-override: 43.4%;    /* 0.400 / 0.921 */
  line-gap-override: 0%;
}
```

### The runner-up: **Inter**

OFL 1.1, no reserved font name, `github.com/rsms/inter`. Better hinted, larger
x-height, the safest neo-grotesque on the web, and it shapes `U+0357` correctly
with mark attachment. It loses on three specific things:

- **It has no U+A723/A724/A725.** `ḥmꜣt` and `wꜥḥ` fail. Usable only if you also
  ship a transliteration face and route every `ancient`/`translit` field through
  it — which the recommendation does anyway, so this is survivable but it means
  the sans can never be trusted with an ancient name.
- Proportional figures by default; needs `font-feature-settings: 'tnum' 1` (or
  `font-variant-numeric: tabular-nums`) on six selectors.
- It would re-open the one-screen layout question.

Take Inter if the site's small-text legibility turns out to matter more than its
density — it is the better face at `0.58rem` and it is not close. Take Source
Sans 3 if you want the layout to survive the change, which is my read.

---

## 3. Transliteration face

### Coverage evidence — the characters this site actually publishes

Extracted from `src/`, not assumed. Occurrence counts are repo-wide.

| Char | Codepoint | Name | Count | Where |
|---|---|---|---|---|
| `š` `Š` | U+0161 / U+0160 | s with caron | 27 / 5 | Akkadian, Hittite |
| `ū` `Ū` | U+016B / U+016A | u with macron | 13 / 1 | Akkadian |
| `ḫ` `Ḫ` | U+1E2B / U+1E2A | h with breve below | 9 / 5 | Akkadian, Hittite |
| `ā` `Ā` | U+0101 / U+0100 | a with macron | 9 / 1 | Akkadian |
| `ṭ` | U+1E6D | t with dot below | 7 | Akkadian |
| `ḥ` `Ḥ` | U+1E25 / U+1E24 | h with dot below | 6 / 2 | Egyptian |
| `ꜣ` | **U+A723** | **Egyptological alef** | 6 | Egyptian |
| `ē` | U+0113 | e with macron | 4 | Akkadian |
| `ī` | U+012B | i with macron | 3 | Akkadian |
| `Ꜥ` | **U+A724** | **Egyptological ain (capital — see §0, should be U+A725)** | 3 | Egyptian |
| `ṣ` | U+1E63 | s with dot below | 1 | Akkadian |
| `ḏ` | U+1E0F | d with line below | 1 | Egyptian |
| `ı` | U+0131 | dotless i | 1 | Egyptian yod |
| ` ͗` | **U+0357** | **combining right half ring above** | 1 | Egyptian yod (`ı͗t`) |
| `₄` `₂` | U+2084 / U+2082 | subscript digits | 1 / 1 | `NINDA.GUR₄.RA`, `tu-ro₂` |

Plus Latin-1 accents from French/German scholarly names (`é ê â ö û À Ê Ì Í Û`).

**Two corrections to the brief.** The site does *not* use `ʾ` (U+02BE) or `ʿ`
(U+02BF) — it uses the Egyptological alef/ain pair from Latin Extended-D
instead, which is a much rarer and much less well-supported choice. It also
does not use `ṯ` (U+1E6F) or `ġ` (U+0121), and it contains **zero Greek
characters**: the Linear B material is transcribed in hyphenated Latin
(`ma-ra-tu-wo`, `ku-mi-no`, `tu-ro₂`), which is correct Mycenological practice.

**The two hard characters are U+A723/A725 and U+0357.** The alef and ain are the
gate — they are what eliminate most of the field. U+0357 is worse than a
coverage question: it is a *combining* mark, so the font must also carry GPOS
mark-attachment anchors, or `ı͗` renders as a half-ring floating in the wrong
place. I verified attachment by shaping, not by cmap lookup.

### Verified results, shaping the site's real strings

| Font | `ı͗t` | `ḥmꜣt wꜥḥ` | `tuḫ’u` | `NINDA.GUR₄.RA` | `tu-ro₂` | `MÊ ELAMÛTIM ḪARŠI` |
|---|---|---|---|---|---|---|
| **Gentium Plus** | ok, mark attached | ok | ok | ok | ok | ok |
| **Charis SIL** | ok, mark attached | ok | ok | ok | ok | ok |
| Andika / Doulos SIL | ok, mark attached | ok | ok | ok | ok | ok |
| Noto Serif / Noto Sans | ok, mark attached | ok | ok | ok | ok | ok |
| **Source Sans 3** | ok, mark attached | ok | ok | ok | ok | ok |
| Inter | ok, mark attached | **fail ×2** | ok | ok | ok | ok |
| Source Serif 4 *(current body)* | **fail** | **fail ×2** | ok | ok | ok | ok |
| IBM Plex Mono *(current `.rcp__anc`)* | **fail** | **fail ×2** | **fail** | ok | ok | **fail** |
| Eczar *(current display)* | **fail** | **fail ×2** | **fail** | **fail** | **fail** | **fail** |
| EB Garamond / Alegreya | ok / fail | **fail ×2** | ok | ok | ok | ok |

EB Garamond and Alegreya are out on the alef/ain. Atkinson Hyperlegible (both
versions) is out on almost everything — it is a 369-glyph accessibility face
with no scholarly Latin at all, which is worth knowing before anyone suggests it
on legibility grounds.

### The pick: **Gentium Plus**

Google Fonts · OFL 1.1 · SIL International · 4,307 glyphs, 2,783 cmap entries.

Yes to the serif-against-sans contrast — deliberately. The ancient name is a
*quotation*, and setting it in a different voice from the UI is the whole point:
`ḫarši` in a warm scholarly serif beside `Hittite Hearth Loaf` in the sans reads
instantly as "this is the old name," with no italics, no parentheses and no
badge chrome. Gentium was drawn by SIL for exactly this job — the name is from
*gentium*, "of the nations" — and it is the only candidate that covers every
character the site uses **and** full polytonic Greek (121/144 Greek and Coptic,
233/256 Greek Extended), which is the future-proofing that matters if Mycenaean
material ever gets set in Greek script.

```css
--translit: 'Gentium Plus', 'Charis SIL', 'Source Sans 3', Georgia, serif;
```

The fallback chain is real, not decorative: if Gentium fails to load, Charis SIL
and then Source Sans 3 both cover the same characters, so a network failure
degrades to a different-looking name rather than a broken one.

### The runner-up: **Charis SIL**

Same licence, same coverage of the site's characters, on Google Fonts. Prefer it
if the ancient names stay at their current sizes. Measured: Charis x/em 0.482
against Gentium's 0.454 — Charis is 6% larger on the body and considerably
sturdier (it descends from Bitstream Charter, drawn for coarse output), which
matters because `.rcp__anc` is `0.68rem`, uppercase, with `0.1em` tracking. If
you set the ancient names small, take Charis. If you give them room — and I
would; they are the best thing on the card — take Gentium.

**Andika** and **Doulos SIL** also pass every test. Andika is a literacy face
(single-storey `a` and `g`) — wrong register for this site. Doulos SIL is the
best-covered font tested (3,944 glyphs) but is **not on Google Fonts** and is
metrically a Times clone, which fights Eczar. Both are OFL 1.1.

---

## 4. Ancient scripts

All five recommendations are **Noto**, all are **OFL 1.1 with no reserved font
name** (so a subset may keep the family name — verified in each `OFL.txt`), all
are drawn by the Monotype design team, and **all five are on Google Fonts**
(verified: the CSS2 API returns real `@font-face` blocks for each). Coverage
below is measured against Unicode 15.1 assigned codepoints.

### 4.1 Cuneiform — U+12000–U+123FF

**Noto Sans Cuneiform 2.001** · 1.36 MB TTF / 474 KB full woff2 / **9.8 KB for
40 signs** · OFL 1.1 · `github.com/google/fonts/tree/main/ofl/notosanscuneiform`

Measured coverage: **922/922** of Cuneiform, **116/116** of Cuneiform Numbers
and Punctuation (U+12400–1247F), **196/196** of Early Dynastic Cuneiform
(U+12480–1254F). 100% of everything assigned.

**Repertoire caveat — and it is a subtler one than it looks.** Unicode's
cuneiform encoding is deliberately **period-independent**: there is one codepoint
per *sign*, and the very different shapes that sign took across two and a half
millennia are treated as font variants of it. Unicode states this outright — the
characters as written in the 2nd and 1st millennia BC "are considered font
variants of the same characters" — and the reference glyphs printed in the code
charts are **Classical Sumerian / Early Dynastic** forms from the mid-3rd
millennium.

The practical consequence: **the period is a font choice, and picking Noto makes
that choice for you.** A cuneiform font draws one set of shapes and applies them
to every text, whatever its date.

*Unverified:* I could not find published documentation of which period's shapes
Noto Sans Cuneiform actually draws. Monotype ships no design notes with it, the
`notofonts.github.io/cuneiform` page carries only download links, and the repo
README has nothing. What is certain is that it draws a single set, and that a set
matched to the Old Babylonian hand of YBC 4644 (c. 1730 BC) is not something any
general-purpose font promises.

### The period-correct alternative, and it is openly licensed

**CuneiformOB 1.001** — Steve Tinney, Oracc / CDL · **SIL OFL, version 1.0**,
Reserved Font Name `CuneiformOB` · `fsType 0` · 2.33 MB TTF / **23.5 KB for 40
signs** · `oracc.museum.upenn.edu/downloads/CuneiformOB.zip`

Its own documentation describes its forms as *"closer to those found in **Old
Babylonian monumental and literary texts**"* — which is exactly the hand of
YBC 4644 and the Mesopotamian material this site is built on. I verified the
binary: 879 of 922 Cuneiform codepoints (**95%**), 103 of 116 numbers and
punctuation, `fsType 0`, RFN present.

**This is the right font for `region: 'mesopotamia'`.** It costs 14 KB more per
40 signs than Noto (the outlines are older and less optimised) and buys actual
palaeographic honesty. Two conditions:

- **It is OFL *1.0*, not 1.1.** OFL 1.0's own definition of "Modified Version"
  explicitly includes *"by changing formats"* — and unlike 1.1 it has no FAQ
  blessing webfont conversion. So a WOFF2 build of it **is** a Modified Version,
  clause 3 bites, and you **must** rename the family (`Bronze Cuneiform OB`).
  Ship an `OFL.txt` alongside it: the ZIP contains the bare `.ttf` and nothing
  else.
- **95% is not 100%.** Put Noto Sans Cuneiform second in the stack so the
  missing 43 signs still render rather than tofu.

Sibling faces from the same source, same terms: **CuneiformComposite** (Ur III
forms, Fara to Neo-Assyrian in its outliers — the general-purpose one) and
**CuneiformNA** (Neo-Assyrian). *Watch out:* CuneiformNA's internal family name
is `CuneiformNAOutline`, not "CuneiformNA", which will silently break a naive
`@font-face`.

Whatever you ship, **caption it**. "Old Babylonian sign forms" is honest and
short. `Santakku` / `SantakkuM` / `Assurbanipal` (Vanséveren) are the other
period-specific fonts and they are **not** openly licensed — see §7.

### 4.2 Egyptian hieroglyphs — U+13000–U+1342F

**Take NewGardiner, not Noto.**

**NewGardiner 3.08** — Mark-Jan Nederhof, St Andrews · **SIL OFL 1.1**,
Reserved Font Name `NewGardiner` · `fsType 0` · 2.71 MB TTF / **14.3 KB for 40
signs** · `github.com/nederhof/newgardiner` (pull from `main`; there are no
GitHub Releases)

I verified the binary against Noto side by side:

| | NewGardiner 3.08 | Noto Sans Egyptian Hieroglyphs 2.002 |
|---|---|---|
| Egyptian Hieroglyphs U+13000–1342F | **1072 / 1072** | 1072 / 1072 |
| Format Controls U+13430–1345F | **38 / 38** | **6 / 38** |
| Extended-A U+13460–143FF | **3,427 signs** | 0 |
| 40-sign woff2 subset | **14,316 B** | 16,148 B |
| Licence | OFL 1.1, RFN | OFL 1.1, no RFN |

NewGardiner is complete where Noto is not, ships 3,427 extra Extended-A signs,
and subsets *smaller*. There is no argument for Noto here except that Noto is
on Google Fonts. Self-host either way.

The brief's "several MB" figure is out of date for Noto — the current release is
under 1 MB as a TTF, 407 KB as woff2, 16 KB subset. NewGardiner really is 2.71
MB unsubsetted, which is exactly why §5 exists.

> **You still cannot compose quadrats, and it is not the font's fault.**
>
> Egyptian is not written as a linear string of signs — signs group into
> **quadrats**, and Unicode encodes that grouping in the Format Controls block
> (U+13430–1345F: vertical join, horizontal join, insert-at-top-start…).
> I shaped a joiner sequence through HarfBuzz 14.3 against both fonts:
>
> - **Noto** returns `.notdef` for every joiner — a literal tofu box per joiner,
>   three of them for a `begin…end segment` sequence.
> - **NewGardiner** has glyphs for all 38, so no tofu — but HarfBuzz **does not
>   compose them**. Glyph count stays 3-in / 3-out, advances stay separate, and
>   each control renders as a full-em blank. You get gaps, not stacking.
>
> No shaping engine in a browser today implements quadrat composition. So:
> **do not put format controls in the data at all.** Write hieroglyphs as a
> plain linear sequence and accept that it is a transcription convention rather
> than a facsimile. If a real quadrat ever matters, render it with **JSesh** to
> SVG at build time and ship an `<img>` — that use ("publications … web sites")
> is what the JSesh glyph licence actually permits, whereas shipping its font is
> not. See §7.

### 4.3 Linear B — U+10000–U+1007F

**Noto Sans Linear B 2.002** · 133 KB TTF / 60 KB full woff2 / **4.6 KB for 40
signs** · OFL 1.1

Measured coverage: **88/88** Linear B Syllabary, **123/123** Linear B Ideograms
(U+10080–100FF), **57/57** Aegean Numbers (U+10100–1013F). Complete.

This is the cheapest and least risky of the five, and it is the one with the
most direct payoff: the site already carries the transcriptions
(`ma-ra-tu-wo`, `ku-mi-no`, `se-ri-no`, `me-ri`, `tu-ro₂`) and every one of
those maps sign-for-sign onto the syllabary. `𐀔𐀨𐀶𐀺` beside `ma-ra-tu-wo` is
correct, legible-to-a-specialist, and costs 4.6 KB. Start here.

The ideograms block is a bonus worth knowing about: it contains the commodity
signs — `𐂝` B145 WOOL, `𐂖` B131 WINE, `𐂕` B130 OIL, `𐂏` B121 BARLEY, `𐂑` B123
SPICE — which is literally what the Pylos and Knossos tablets the site cites
are *lists of*. `barley-and-fig-feast-porridge` cites one of those tablets.

### 4.4 Anatolian hieroglyphs — U+14400–U+1467F

**Noto Sans Anatolian Hieroglyphs 2.001** · 367 KB TTF / 174 KB full woff2 /
**12.6 KB for 40 signs** · OFL 1.1

Measured coverage: **583/583**. Complete.

> **The correctness point that matters most in this document.**
>
> **Hittite is not written in Anatolian hieroglyphs.** The Hittite archives —
> KUB, KBo, the festival corpus that `thick-loaf-for-the-hearth-harsi` and
> `sheep-on-the-huprushi` are built from — are written in **ordinary cuneiform**,
> the same script as the Babylonian tablets, borrowed from Mesopotamia. If you
> want a decorative script beside `ḫarši` or `ḫuprušḫi`, the correct block is
> **U+12000 Cuneiform**, not U+14400.
>
> Anatolian Hieroglyphs is a separate, mostly-**Luwian** monumental script. It
> was used in Anatolia in the same period, by the same state, largely on
> seals and rock reliefs — and Hittite royal seals are in fact bilingual,
> cuneiform plus Anatolian hieroglyphs. So the script is not *wrong* for a
> Hittite page; it is wrong for a Hittite *word*. Use it for atmosphere (a seal
> motif, a page ornament) and cuneiform for anything that claims to be the name.
>
> Getting this backwards is the single most visible error this site could make
> to a reader who knows the material. Ship the caption with the glyph.

### 4.5 Ugaritic — U+10380–U+1039F

**Noto Sans Ugaritic 2.001** · 52 KB TTF / 23 KB full woff2 / **2.5 KB for the
entire script** · OFL 1.1

Measured coverage: **31/31** — 30 letters plus U+1039F word divider. Complete,
and small enough that subsetting is barely worth the build step.

Ugaritic is *alphabetic* cuneiform: 30 signs, cuneiform-shaped but an alphabet,
not a syllabary. It is the right script for `lentils-with-oil-and-cumin-ugarit`
and it is the cheapest authentic flourish available anywhere on this site.
Do not use it for the Kabri palace wine — Kabri is Canaanite but not Ugarit, and
there is no Ugaritic text behind that dish.

### 4.6 What each dish should actually get

| Region in `provenance.js` | Script | Block |
|---|---|---|
| `mesopotamia` | Cuneiform — **CuneiformOB**, Noto behind it (§4.1) | U+12000 |
| `egypt` | Egyptian hieroglyphs — **NewGardiner**, linear only (§4.2) | U+13000 |
| `hatti` | **Cuneiform** — *not* Anatolian hieroglyphs (§4.4) | U+12000 |
| `aegean` | Linear B | U+10000 |
| `levant` | Ugaritic for Ugarit; nothing for Kabri | U+10380 |

---

## 5. Subsetting plan

The site will only ever render a fixed, known, hand-authored set of strings.
Ship a static subset of those exact glyphs. Do not ship a whole ancient-script
font, and do not use `unicode-range` alone against the full font — that only
saves the download when the range is unused, and here the range is always used.

### 5.1 Setup

```bash
pip install "fonttools[woff]" brotli
```

`glyphhanger` is the alternative and it is worse for this job: it drives a
headless browser to discover used characters, which is exactly the wrong tool
when the character set is a fixed literal you can type out. Use `pyftsubset`.

### 5.2 The UI and transliteration faces — subset by text

Put the character set in a file so it is reviewable and diffable:

```bash
mkdir -p public/fonts scripts/font
cat > scripts/font/charset.txt <<'EOF'
 !"#$%&'()*+,-./0123456789:;<=>?@
ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`
abcdefghijklmnopqrstuvwxyz{|}~
ĀāēīıŠšŪūḎḏḤḥḪḫṢṣṬṭṮṯꜢꜣꜤꜥ₂₃₄
ÀÁÂÊÈÌÍÎÔÛÙàáâçéèêíìîñöôûùü
—–·’‘“”…µ°→←≈✓✕✦◆▾●○☀☾№§†‡€£
EOF
```

> Include `ꜥ` (U+A725), `ḏ`/`Ḏ` and `ṯ` even though only some appear today —
> they are the characters the *next* Egyptian dish will need, they cost bytes in
> the tens, and re-running the build for one glyph is how subsets rot.

```bash
# body / UI — variable weight axis retained
pyftsubset SourceSans3[wght].ttf \
  --text-file=scripts/font/charset.txt \
  --layout-features=kern,mark,mkmk,ccmp,liga,calt,locl,case,tnum,frac \
  --flavor=woff2 \
  --output-file=public/fonts/source-sans-3-subset.woff2      # 20.4 KB

pyftsubset "SourceSans3-Italic[wght].ttf" \
  --text-file=scripts/font/charset.txt \
  --layout-features=kern,mark,mkmk,ccmp,liga,calt,locl,case,tnum,frac \
  --flavor=woff2 \
  --output-file=public/fonts/source-sans-3-italic-subset.woff2  # 20.9 KB

# transliteration
pyftsubset GentiumPlus-Regular.ttf \
  --text-file=scripts/font/charset.txt \
  --layout-features=kern,mark,mkmk,ccmp,liga,locl \
  --flavor=woff2 \
  --output-file=public/fonts/gentium-plus-subset.woff2        # 16.3 KB

# display, unchanged face, now self-hosted
pyftsubset "Eczar[wght].ttf" \
  --text-file=scripts/font/charset.txt \
  --layout-features=kern,mark,mkmk,ccmp,liga,calt,case,tnum \
  --flavor=woff2 \
  --output-file=public/fonts/eczar-subset.woff2               # 18.4 KB
```

**Do not bother clipping the variable axis.** Source Sans 3's `fvar` runs
`wght 200–900` and Eczar's `400–800`; the site uses 400/600/700. I measured
`fontTools.varLib.instancer wght=400:700` before subsetting and it made the file
*larger* (20.6 KB → 20.8 KB) — the deltas that survive a 55-glyph subset are
already tiny and the instancer adds bookkeeping. Declare the real axis range in
`@font-face` and move on.

`--layout-features` is the lever that matters. Passing `*` (the default keeps a
lot) took Source Sans 3's subset from 20.4 KB to 38.7 KB — nearly double, for
Devanagari and Cyrillic shaping rules the site will never invoke. **Keep `mark`
and `mkmk`**: they are what positions U+0357 over the dotless i. Dropping them
saves ~1 KB and breaks `ı͗t`.

### 5.3 The ancient scripts — subset by codepoint

You know the exact signs, because you wrote the strings. List them.

```bash
# Linear B: ma-ra-tu-wo, ku-mi-no, se-ri-no, me-ri, tu-ro2 ...
pyftsubset NotoSansLinearB-Regular.ttf \
  --unicodes=U+10014,U+10028,U+10036,U+1003A,U+10013,U+10016,U+1001C,U+1002E,U+1002A,U+10015,U+1002B \
  --layout-features= --no-hinting --desubroutinize \
  --name-IDs=0,7,13,14 \
  --drop-tables+=DSIG --flavor=woff2 \
  --output-file=public/fonts/noto-linearb-subset.woff2
```

**Keep `--name-IDs=0,7,13,14`.** The tempting `--name-IDs=` (empty) strips every
name record and saves maybe 300 bytes — but IDs 0, 13 and 14 are the copyright
notice, the licence description and the licence URL, and **OFL clause 2 requires
them to travel with any redistributed copy.** For CuneiformOB and NewGardiner
that is not optional. `fonttools` carries the `name` table through WOFF2
conversion intact; verify with
`fonttools ttx -t name -o - public/fonts/*.woff2` that they survived.

Measured sizes at 40 signs, built exactly this way:

| Script / font | full TTF | **40-sign subset** | ratio |
|---|---|---|---|
| **CuneiformOB 1.001** *(the pick)* | 2,445,120 B | **23,484 B** | 104× |
| Noto Sans Cuneiform *(fallback)* | 1,425,840 B | **9,848 B** | 145× |
| **NewGardiner 3.08** *(the pick)* | 2,844,876 B | **14,316 B** | 199× |
| Noto Sans Egyptian Hieroglyphs *(rejected, §4.2)* | 1,004,836 B | 16,148 B | 62× |
| Noto Sans Linear B | 135,716 B | **4,564 B** | 30× |
| Noto Sans Anatolian Hieroglyphs | 375,344 B | **12,604 B** | 30× |
| Noto Sans Ugaritic *(all 31 signs)* | 53,244 B | **2,456 B** | 22× |
| **the five picks together** | 5.85 MB | **57,424 B / 56.1 KB** | **102×** |

Add the 9,848 B Noto cuneiform backstop and it is **67,272 B / 65.7 KB** for
every ancient script the site could want.

For the ancient scripts, `--layout-features=` (empty) is correct — there is no
shaping to do, they are isolated display signs — and `--no-hinting` is correct
because they will never be set below ~24px.

### 5.4 The `@font-face` and `unicode-range` CSS

```css
/* ── UI / body ─────────────────────────────────────────────────────── */
@font-face {
  font-family: 'Source Sans 3';
  src: url('/fonts/source-sans-3-subset.woff2') format('woff2-variations');
  font-weight: 200 900;          /* the face's real fvar range — see note */
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Source Sans 3';
  src: url('/fonts/source-sans-3-italic-subset.woff2') format('woff2-variations');
  font-weight: 200 900;
  font-style: italic;
  font-display: swap;
}

/* ── transliteration ───────────────────────────────────────────────── */
@font-face {
  font-family: 'Gentium Plus';
  src: url('/fonts/gentium-plus-subset.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}

/* ── ancient scripts: unicode-range keeps them off pages that don't
      use them, and off every page until a matching character renders ── */
/* Old Babylonian first, Noto behind it for the 5% CuneiformOB lacks.
   Both are renamed: OFL 1.0 requires it for CuneiformOB (see §8). */
@font-face {
  font-family: 'Bronze Cuneiform OB';
  src: url('/fonts/cuneiform-ob-subset.woff2') format('woff2');
  unicode-range: U+12000-123FF, U+12400-1247F;
  font-display: block;   /* a fallback box is worse than a beat of nothing */
}
@font-face {
  font-family: 'Bronze Cuneiform Fallback';
  src: url('/fonts/noto-cuneiform-subset.woff2') format('woff2');
  unicode-range: U+12000-123FF, U+12400-1247F;
  font-display: block;
}
@font-face {
  font-family: 'Bronze Hieroglyphs';   /* NewGardiner 3.08, subset */
  src: url('/fonts/newgardiner-subset.woff2') format('woff2');
  unicode-range: U+13000-1342F;
  font-display: block;
}
@font-face {
  font-family: 'Bronze Linear B';
  src: url('/fonts/noto-linearb-subset.woff2') format('woff2');
  unicode-range: U+10000-1007F, U+10080-100FF;
  font-display: block;
}
@font-face {
  font-family: 'Bronze Anatolian';
  src: url('/fonts/noto-anatolian-subset.woff2') format('woff2');
  unicode-range: U+14400-1467F;
  font-display: block;
}
@font-face {
  font-family: 'Bronze Ugaritic';
  src: url('/fonts/noto-ugaritic-subset.woff2') format('woff2');
  unicode-range: U+10380-1039F;
  font-display: block;
}
```

`font-display: block` on the script faces is deliberate: these render a handful
of decorative glyphs, and a flash of tofu (`􏿽`) is much uglier than 100 ms of
blank. `swap` stays right for the text faces.

Because the ranges are disjoint, all five script faces can sit in one
`--script` stack and the browser picks the right one per character:

```css
--script: 'Bronze Cuneiform OB', 'Bronze Cuneiform Fallback',
          'Bronze Hieroglyphs', 'Bronze Linear B',
          'Bronze Anatolian', 'Bronze Ugaritic', sans-serif;
```

The two cuneiform faces declare the *same* `unicode-range` on purpose: the
browser tries them left to right per character, so CuneiformOB wins wherever it
has the sign and Noto silently covers the 43 it does not.

No Noto face reserves a font name (verified in each `OFL.txt`), so the `Bronze *`
names above are a convenience rather than a requirement. For **Source Sans 3,
Gentium Plus, Charis SIL and Andika** the rename is not optional in the strict
reading — see §8.

### 5.5 If you would rather not self-host

Google Fonts can serve a hand-made subset via `&text=`, and it works for
astral-plane characters — but **you must percent-encode the UTF-8 bytes
yourself**. I confirmed this both ways: `&text=%F0%92%80%80%F0%92%80%B8` returns
`unicode-range: U+12000, U+12038` and a real font, while letting a shell mangle
the literal characters returns `unicode-range: U+3f` and a 2.7 KB file
containing only a question mark. Measured `&text=` sizes for 40 signs: cuneiform
16.2 KB, Egyptian 30.3 KB, Linear B 8.3 KB, Anatolian 21.3 KB, Ugaritic 5.3 KB —
roughly **1.8× larger** than `pyftsubset` output, because Google keeps hinting
and name records. It also means a third-party request on every page load and a
URL nobody can read. Self-host.

### 5.6 What you cannot fix with Google Fonts, and why self-hosting is required

I parsed the live `unicode-range` declarations Google serves for Source Sans 3
`v19` and checked them against the site's real characters. **The Egyptological
alef and ain are fine** — they fall inside `latin-ext`'s `U+A720-A7FF`. But:

| Character | Served by a Google slice? |
|---|---|
| `ꜣ Ꜥ ꜥ` U+A723–A725 | yes — `latin-ext` |
| `ḫ ḥ ṭ ṣ ḏ` U+1E00–1E9F | yes — `latin-ext` |
| **U+0357** combining half-ring (`ı͗`) | **no — not in any slice** |
| **U+2082 / U+2084** subscript `₂ ₄` | **no** — `latin` stops at U+206F |
| **U+2192 `→`** (`.subs__arrow`) | **no** — `latin` has U+2191 and U+2193, not U+2192 |
| `⌕ ✕ ✓ ✦ ◆ ▾ ☀ ☾` UI glyphs | **no** — none are in any slice |

So even with the perfect font chosen, a Google-hosted Source Sans 3 renders
`NINDA.GUR₄.RA` in two fonts and `ı͗t` with a floating mark. There is no CSS fix.
This is by itself sufficient reason to self-host a subset.

---

## 6. Integration sketch

*Specification only. Do not apply these — they are what the edit would be.*

### 6.1 Tokens in `src/index.css`

Replace the block at lines 32–34:

```css
  /* current */
  --display: 'Eczar', Georgia, serif;
  --body:    'Source Serif 4', Georgia, serif;
  --mono:    'IBM Plex Mono', Consolas, monospace;
```

with:

```css
  /* the voice of the site: everything you read to shop and cook */
  --ui: 'Bronze Sans', 'Bronze Sans Fallback', ui-sans-serif, system-ui,
        -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

  /* headings and the dish name. unchanged face, now self-hosted */
  --display: 'Eczar', Georgia, serif;

  /* the old name, quoted. covers every diacritic this site publishes.
     'Bronze Ancient' is the renamed Gentium Plus subset — see §8 on the OFL
     reserved font name; use 'Gentium Plus' verbatim if you skip the rename */
  --translit: 'Bronze Ancient', 'Charis SIL', 'Source Sans 3', Georgia, serif;

  /* decorative only — a translation nobody can read */
  --script: 'Bronze Cuneiform OB', 'Bronze Cuneiform Fallback',
            'Bronze Hieroglyphs', 'Bronze Linear B',
            'Bronze Anatolian', 'Bronze Ugaritic', sans-serif;

  /* kept as aliases so the 46 existing --mono uses and 2 --body uses keep
     working through the migration; delete once they are all moved to --ui */
  --mono: var(--ui);
  --body: var(--ui);
```

### 6.2 The `--mono` problem

`var(--mono)` appears **46 times** across `index.css` and `deck.css` — against
8 uses of `--display` and just 2 of `--body` — and in
almost none of them is it doing a monospace job. It is the site's small-caps
label face: `.kicker`, `.tabs a`, `.aisles button`, `.pill__main`,
`.tile__sig`, `.tile__tier`, `.shelf__sig`, `.verdict__word`, `.panel__aisle`,
`.base__grid dt`, `.sig dt`, `.accent__where`, `.rcp__gname`, `.rcp__qty`,
`.swap span`, `.three thead th`, `.three__notes h4`, `.nutbar__switches button`
— all uppercase, tracked, 0.58–0.8rem. Those all want `--ui`.

Genuine monospace is needed in exactly four places, and Source Sans 3's
default tabular figures cover all four without a monospace face:

- `.meal__g` — gram amounts in a fixed 3.1rem gutter
- `.nrow__pct` — right-aligned percentages
- `.nrow__val` (currently `--display`) — the nutrition number itself
- `.three td` / `.three th` — the three-diets comparison table

`.basic__steps li::marker` is the only place a monospace *look* is doing
anything, and it is a numeral in a marker. Retiring IBM Plex Mono entirely is
the right call and saves 86 KB.

### 6.3 Where `--translit` gets applied

Four selectors and one JSX change:

| Selector / field | File | Change |
|---|---|---|
| `.rcp__anc` | `src/components/deck.css:543` | `--mono` → `--translit`; **this is the live bug from §0** |
| `.bcard__meta` (the `say ...` run) | `src/components/deck.css:132` | wrap `{name.say}` in a `<span class="rcp__say">` and give it `--translit` |
| `.rcp__qty` where `it.ancient` is shown | `deck.css:567` | only if the ancient ingredient names are ever surfaced — they are in the data (`ṭābtu`, `šamaškillu`, `ḥmꜣt`) and currently **not rendered**; see §6.5 |
| `.srcquote` | `deck.css:591` | keep the italic, move to `--translit` — it is a quotation and Gentium's italic is drawn for exactly this |

### 6.4 Where `--script` would get applied

There is no markup for this yet. The natural home is beside `.rcp__anc` in
`RecipeCard` (`src/pages/Recipes.jsx:130`), which already renders
`recipe.ancient`:

```jsx
{recipe.ancient && <span className="rcp__anc">{recipe.ancient}</span>}
{recipe.script && (
  <span className="rcp__script" lang={recipe.scriptLang} aria-hidden="true">
    {recipe.script}
  </span>
)}
```

`aria-hidden` matters: a screen reader announcing 40 unnamed cuneiform signs
is a hostile act, and the readable name is right there. A `title` or a caption
carrying the §4 caveat ("Neo-Assyrian sign forms, ~500 years later than this
dish") is what makes it honest rather than decorative-and-wrong.

New data field in `src/data/recipes.js`, alongside `ancient` and `translit`.

### 6.5 One thing worth doing while you are in there

`src/data/recipes.js` already carries an `ancient` name for every single
ingredient — `ṭābtu` for salt, `šamaškillu` for onion, `ḥmꜣt`, `Ì.NUN`,
`ko-ri-ja-da-na` — and `Recipes.jsx` renders **only** `it.qty` and `it.modern`.
That is the best unused content on the site, and it is precisely the material
the transliteration face exists to set. A second line under each ingredient in
`--translit` at `0.72rem` in `--ink-3` would be four lines of JSX.

---

## 7. What I'd advise against

**Inter as the primary, without a transliteration face.** It has no U+A723 or
U+A725. `ḥmꜣt` and `wꜥḥ` fall back mid-word. It is a fine runner-up *with*
Gentium behind it; it is not safe alone.

**Public Sans, Figtree, Instrument Sans, Manrope, IBM Plex Sans, Work Sans,
Libre Franklin.** All fail three or more of the site's real strings. Libre
Franklin additionally has **no `tnum` feature at all** — it cannot set the
nutrition tables. Instrument Sans and Figtree are 501 and 459 glyphs; they are
brand faces, not text families, and this site is a text site.

**Atkinson Hyperlegible (either version).** 369 glyphs. No `ḫ`, `ḥ`, `ṭ`, `ṣ`,
`ḏ`, no Egyptological alef or ain, no subscripts, no combining marks, no
arrows. It is an excellent accessibility face for the job it was drawn for and
it is the wrong tool here. If legibility at `0.58rem` is the concern, the fix is
to stop setting type at `0.58rem`.

**Aegean and Anatolian by George Douros — and this one matters, because the
common belief about them is wrong.** The brief assumed public domain. They were
never public domain, and **as currently distributed they cannot go on this
site.** I read the licence out of the font binaries and the bundled
`UFAS-LICENSE.pdf`. Symbola v12 (2019), name ID 13, verbatim:

> "Free use of UFAS software is limited to personal, non-commercial use. A
> single instantiation is implied. No modification, whatsoever, is allowed
> without the written consent of the Designer. Commercial or educational use of
> any kind, including, but not limited to, the packaging or embedding in any
> commercial or educational product is not permitted. Selling UFAS is
> prohibited."

The licence agreement adds "no **network installation**", "may not **host** ...
or in any way **redistribute** ufas, with or without charge", and "agrees not to
adapt, modify, alter, translate, **convert**". Name ID 0: "(c) 2019 Unicode
Fonts for Ancient Scripts; **all rights reserved**." That forbids, individually:
hosting the file, converting it to woff2, subsetting it, and educational use.
Every single thing this document proposes.

The free-licence belief is not invented - it is *out of date*. Douros's wording
went through three eras, all confirmable in the Wayback Machine and in the font
binaries themselves:

| Era | Wording |
|---|---|
| to ~2015 | "...they carry no trademark, copyright, license or other market tags; **they are free for any use**." |
| ~2016 - Jan 2018 | "In lieu of a licence; fonts and documents in this site are **free for any use**;" |
| **2018 onward** | "Software on this site is **free strictly for personal, non-commercial use**;" |

I confirmed the change in the files: **Symbola v8 (2015)** carries name ID 13 =
"Fonts in this site are free for any use...", **v12 (2019)** carries the
restrictive text above. The original site (`users.teilar.gr/~g1951d/`) is
**dead** - a DNS failure, not a 404. The current home is `dn-works.com/ufas/`,
where **Aegean 16.40 is listed at $15,000** for the public licence that putting
it on a website requires.

**There is a narrow legitimate path, and I am still advising against it.**
Debian ships `fonts-ancient-scripts` 2.60-4 containing **Aegean 9.17** and
**Anatolian 5.17** under a copyright file Debian's ftpmasters accepted as
DFSG-free: *"Fonts are free for any use; they may be opened, edited, modified,
regenerated, packaged and redistributed."* On the merits those versions are
usable - Aegean 9.17 covers Linear B (88 syllabary, 123 ideograms, 57 Aegean
numbers), Ugaritic 31/32, Linear A, Cypriot, Phoenician and the complete
Phaistos Disc; Anatolian 5.17 covers 584/640 Anatolian Hieroglyphs. But you
would be relying on a bare gratuitous permission that the grantor has since
purported to revoke, with no OFL-style irrevocability clause, on a public
website. **Noto covers every one of those blocks under OFL 1.1 with none of
that.** Take the OFL.

Two factual corrections while we are here: **Anatolian is a separate font from
Aegean** (you would need both files), and **Aegean does not cover Cypro-Minoan
or Cretan Hieroglyphs** - those are separate Douros fonts and both are
Private-Use-Area only, so they cannot carry semantic text at all.

**Santakku / SantakkuM / Assurbanipal (Sylvie Vanseveren, Hethitologie Portal
Mainz).** These are the period-specific cuneiform fonts, and their repertoires
are exactly what this site would want: **Santakku** = Old Babylonian *cursive*
(the everyday tablet hand - the hand of YBC 4644), **SantakkuM** = Old Babylonian
*monumental* (the Codex Hammurabi stele hand), **Assurbanipal** = Neo-Assyrian,
**UllikummiA/B/C** = the Hittite hands. Tempting, and not usable. The stated
terms are: *"They are copyrighted and **may not be modified or distributed in
any modified form**, nor may they be distributed commercially. ... They may be
used in scientific publications and **websites for scholarly purposes**."* A
TTF-to-WOFF2 conversion is a modified binary and serving it is distributing it,
so on a literal reading self-hosted WOFF2 is not permitted; and "websites for
scholarly purposes" is not obviously this site. There is no OFL FAQ to lean on
and no reserved-font-name rename escape hatch. CTAN's `hittype` package
classifies them **"No Commercial Use"** and bundles them only *"with written
permission from Dr Vanseveren"* - which is the route if you want them: write to
her. Note the canonical URL has moved: `hethport.uni-wuerzburg.de/cuneifont/`
now 404s; use **`hethport.net/cuneifont/`**.

> **The workaround, if period fidelity ever matters more than effort:**
> Vanseveren deposited a **CC BY 4.0** "Collection of Cuneiform Fonts" on Zenodo
> (DOI `10.5281/zenodo.8342382`) - 2,744 MesZL-numbered **SVG** outlines
> extracted from those same fonts, including 540 Santakku and 1,036
> Assurbanipal. Those are unambiguously redistributable with attribution; you
> could build a webfont from them, or just ship SVGs. *Unverified: whether the
> SVG set is glyph-for-glyph complete against the TTFs.* **CuneiformOB (section
> 4.1) is the far cheaper answer** and it is already OFL.

**JSesh's font.** Blocked, and independently a bad idea. The glyph licence is
bespoke permission text from Serge Jean Paul Thomas, not a recognised licence;
`JSeshFont.ttf` carries **no copyright record at all** (name ID 0 is absent);
and the one web-adjacent grant - "use ... for publications (paper, databases,
web sites)" - plausibly covers *rendering* hieroglyphs into images you publish,
but says nothing about redistributing the binary to every visitor, which is
exactly what `@font-face` does. It is also Unicode 5.2-era (1,071 codepoints, no
format controls, no Extended-A), and its own author notes the signs *"have no
margin at all"* because it is a glyph source for a word processor rather than a
font. Use JSesh the way its licence contemplates: render to SVG at build time.

**General Sans (Fontshare / Indian Type Foundry).** Interesting licence, wrong
shape for this pipeline. The **ITF Free Font License 2.0** actively *encourages*
self-hosting - "Self-hosting by end users is permitted and recommended ... Use of
the Fontshare API is optional and is not required for web use" - but in the same
document forbids the thing section 5 is built on: *"You may not modify ... This
includes modifying or replacing glyphs, **subsetting, format conversion**, or
altering font names."* You would have to ship ITF's own WOFF2 byte-for-byte
(their variable roman and italic are 38 KB and 41 KB, which is respectable) and
give up subsetting entirely. It is also not on Google Fonts and has no scholarly
Latin. Not worth the special case.

**Brill.** Beautiful, purpose-built for exactly this material, and its EULA
forbids what you would want to do in about as many words as it is possible to
use. Clause 6, verbatim:

> "The font software may not be served to the Web by whatever mechanism:
> licensee may not link to copies of the Brill fonts through program
> instructions including, but not limited to, **Cascading Style Sheets**,
> thereby causing a copy or copies of a Brill font or part of a Brill font to be
> transferred to a computer other than that of licensee."

and clause 8: *"**Embedding the Font in HTML web pages is not allowed.**"*
Conversion is separately barred by clause 10, redistribution by clause 5, and
the "Commercial Product" definition closes the obvious loophole: *"Open Access
publications are also considered commercial products under the terms of this
license."* What the free licence *does* permit is embedding in a read-only PDF.
There is a separate paid **Brill Web Fonts** product under a separate EULA, sold
through I Love Typography; *unverified - I could find no public copy of that web
EULA's terms.* Gentium Plus is OFL 1.1, covers the same characters, and comes
with no question at all.

**Shipping any ancient-script font unsubsetted.** Noto Sans Cuneiform is 474 KB
as a full woff2 to render maybe eight signs. That is 145× the necessary weight,
and NewGardiner unsubsetted is 2.7 MB.

**Using `unicode-range` alone as the weight strategy.** It defers the download;
it does not shrink it. On a page that *does* show cuneiform you still pay 474 KB.
`unicode-range` is for routing characters between faces. `pyftsubset` is for
weight. Use both, for their own jobs.

**Anatolian hieroglyphs beside a Hittite dish name.** See §4.4. This is the
error most likely to be noticed and least likely to be forgiven.

**Setting the ancient script and letting a screen reader read it.** Always
`aria-hidden="true"`, always with the readable name adjacent.

**Leaving `index.html`'s Google Fonts URL as it is, whatever else you decide.**
`Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400` requests
weights 400 and 600 as two *separate instances of the same variable font* — the
browser downloads 122 KB twice for `latin` and 101 KB twice for `latin-ext`.
Writing it as `0,8..60,400..600;1,8..60,400` serves one roman slice and saves
**223 KB** with no visual change at all. Eczar's `wght@600;700;800` has the same
problem: written as `wght@600..800` it drops from 113 KB to 38 KB. That is
**298 KB of pure waste**, today, for a one-line edit — more than the entire
proposal in this document costs.

---

## 8. Licence register

Every recommendation, stated plainly.

| Font | Licence | Web embedding | Reserved Font Name | Source |
|---|---|---|---|---|
| Source Sans 3 v19 | SIL OFL 1.1 | yes | **"Source"** | `google/fonts/ofl/sourcesans3` |
| Gentium Plus | SIL OFL 1.1 | yes | **"Gentium", "SIL"** | `google/fonts/ofl/gentiumplus` |
| Charis SIL | SIL OFL 1.1 | yes | **"Charis", "SIL"** | `google/fonts/ofl/charissil` |
| Andika | SIL OFL 1.1 | yes | **"Andika", "SIL"** | `google/fonts/ofl/andika` |
| Eczar | SIL OFL 1.1 | yes | none | `google/fonts/ofl/eczar` |
| Inter | SIL OFL 1.1 | yes | none | `github.com/rsms/inter` |
| **CuneiformOB 1.001** | **SIL OFL 1.0** | yes | **`CuneiformOB`** — rename required, see below | `oracc.museum.upenn.edu/downloads/CuneiformOB.zip` |
| **NewGardiner 3.08** | SIL OFL 1.1 | yes | **`NewGardiner`** | `github.com/nederhof/newgardiner` |
| Noto Sans Cuneiform 2.001 | SIL OFL 1.1 | yes | **none** | `google/fonts/ofl/notosanscuneiform` |
| Noto Sans Egyptian Hieroglyphs 2.002 | SIL OFL 1.1 | yes | **none** | `google/fonts/ofl/notosansegyptianhieroglyphs` |
| Noto Sans Linear B 2.002 | SIL OFL 1.1 | yes | **none** | `google/fonts/ofl/notosanslinearb` |
| Noto Sans Anatolian Hieroglyphs 2.001 | SIL OFL 1.1 | yes | **none** | `google/fonts/ofl/notosansanatolianhieroglyphs` |
| Noto Sans Ugaritic 2.001 | SIL OFL 1.1 | yes | **none** | `google/fonts/ofl/notosansugaritic` |

I read each `OFL.txt` and each `METADATA.pb` directly from
`github.com/google/fonts` to confirm these, and read name ID 13 out of each
binary.

**The reserved font names do touch this plan.** OFL §3 requires that a Modified
Version carrying a Reserved Font Name be renamed, and SIL's own OFL FAQ treats
subsetting as producing a Modified Version. That covers Source Sans 3, Gentium
Plus, Charis SIL and Andika — four of the five text faces recommended here. It
does **not** cover Eczar, Inter, or any of the five Noto script fonts, none of
which reserve a name.

In practice everyone — Google's own API included — serves unrenamed subsets, and
nobody has ever been sued over it. But renaming is free, it takes one line, and
it has the side benefit of making it obvious in DevTools that these are cut-down
files. Do it:

```css
@font-face { font-family: 'Bronze Sans';    /* Source Sans 3, subset */ }
@font-face { font-family: 'Bronze Ancient'; /* Gentium Plus, subset  */ }
```

and reference those names in `--ui` and `--translit`, with the upstream family
named in a comment so the next person can rebuild the subset.

**OFL 1.0 is stricter than OFL 1.1, and CuneiformOB is OFL 1.0.** Version 1.0's
own definition of "Modified Version" includes *"by changing formats"*, and it
has no FAQ blessing webfont conversion the way 1.1 does — 1.0 predates
webfonts entirely. So a WOFF2 build of CuneiformOB **is** a Modified Version,
clause 3 applies, and the rename is mandatory rather than tidy. Its ZIP also
contains the bare `.ttf` and no `OFL.txt`, so fetch the licence text separately
and ship it: clause 2 requires the notice to travel with the file. `fonttools`
preserves the `name` table through WOFF2 conversion, so name IDs 13 and 14
survive automatically — verify they did.

### 8.1 Considered and rejected, with the reason

| Font | Licence | Verdict |
|---|---|---|
| **Brill 4.00** | Proprietary EULA v2.06 | **Blocker** — clause 8 forbids HTML embedding by name |
| **Santakku / SantakkuM / Assurbanipal** | Proprietary, credit required | **Blocker on a literal reading** — no modified-form distribution; ask Vanséveren |
| **JSeshFont 1.0** | Bespoke, no copyright record in the binary | **Blocker** — no redistribution grant; use JSesh to render SVG instead |
| **Aegean 16.40 / current UFAS** | Proprietary; $15,000 public licence | **Blocker** |
| **Aegean 9.17 / Anatolian 5.17** (Debian) | "free for any use", pre-2018 | Legally arguable, purportedly revoked — **use Noto instead** |
| **General Sans 2.000** | ITF FFL 2.0 | Usable *only* unmodified — no subsetting, no conversion |
| **Doulos SIL 7.000** | SIL OFL 1.1, RFN | Clean, and not needed — Gentium Plus wins on Greek, Charis SIL on Google Fonts |
| **CuneiformComposite / CuneiformNA** | SIL OFL 1.0, RFN | Fine, but CuneiformOB is the period-correct sibling |

Everything in the "Blocker" rows was verified against the licence text or the
font binary, not against a summary of it. Where I could not verify something —
the Brill *Web Fonts* EULA, the completeness of the Zenodo SVG set, the current
Aegean 16.40 coverage — it is marked as unverified in §7 rather than guessed at.


