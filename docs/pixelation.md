# Pixelation

An assessment of `bronzeAgeGame/proto/scribe/tools/pixelate.html` against the 95-odd
image assets Barley & Bronze ships, written after porting the tool to Pillow and running
it on one asset from each of the four registers at the sizes the site actually draws them.

Nothing in either project was modified. The test port and its output live in a scratch
directory outside both trees.

---

## 1. Recommendation, in five sentences

**Do not pixelate the imagery — not the plaster, not the cutouts, not the watercolours,
and least of all the photographs.** The tool is good and the algorithm is correct, but
every register on this site already carries its own age signal, and quantising to a grid
replaces those four different signals with one shared Bayer lattice, which collapses the
attested/invented distinction the whole site is built to hold. The measured trade is
brutal in both directions: below about 100px of display size the pixel grid is finer than
the box it is drawn into and the effect is *invisible*, and above it the effect is
*visible damage* — there is no size at which it both shows and helps. The one thing this
investigation did turn up that is worth doing costs nothing and involves no pixel art at
all: `DishModal.jsx:67` serves the full 880px plate (40–110 KB) into a 132px box, and
changing it to `art.card ?? art.src` removes the real pop-in for about 40 KB per modal
open. If you want pixel art on this site, commission it as a **fifth register on new
content** — a trade map for `places.js`, which has no picture today — rather than as a
filter over art that is already finished.

---

## 2. What the tool actually does

`pixelate.html` is a single-file browser tool, ~230 lines of JS inside a dark control
panel. It has a Node twin, `tools/quantise.js`, which runs the identical pipeline
headless for `genart.js`; the header comment says so explicitly ("Same algorithm as
tools/pixelate.html, so a backdrop looks the same whichever route it came in by"). The
Node file is the one to lift from.

### Algorithm

Four stages, in this order, and the ordering is the point:

1. **Fit and sample.** Crop to the target aspect (`cover` / `contain` / `stretch` in the
   browser; in `quantise.js`, a crop with a **0.62 vertical anchor** because "landscapes
   usually want their horizon, not their sky"), then reduce to the target grid. The
   browser uses `drawImage` with `imageSmoothingQuality: 'high'`; Node does an explicit
   box average. This decides *what a pixel represents*.
2. **Palette.** Either the game's hardcoded 24-colour `PAL` from `mycenae.js`, or
   **median cut** derived from the image — split the box with the widest channel at its
   median, repeat until you have *n* boxes, average each. Subsampled to ≤20,000 pixels
   first, which is correct: median cut finds the shape of the colour cloud, not its
   census.
3. **Dither, then quantise.** Add an **ordered Bayer offset** (4×4 or 8×8) scaled by
   `42 × strength`, then snap to the nearest palette entry under a **luminance-weighted
   RGB distance** (0.30 / 0.59 / 0.11 — "plain RGB distance picks visibly wrong colours
   in shadow", which is true). This decides *what a pixel is*. Every output pixel is
   exactly one palette entry; no averaged colour survives.
4. **Present.** Integer zoom only, `imageSmoothingEnabled = false`.

### Knobs

| Knob | Range | Default |
|---|---|---|
| target grid w × h | 8–1024 | 480 × 200 |
| fit | cover / contain / stretch | cover |
| palette source | game palette / median cut from image | game |
| colour count | 2–256 | 32 (Node: 56) |
| dither | Bayer 4×4 / Bayer 8×8 / none | 4×4 |
| dither strength | 0–100% → `42 × s` offset | 55% (Node: 40%) |
| zoom | 1× / 2× / 3× / 4× | 3× |

### Input and output

Takes a raster image by drop, file picker, **or clipboard paste** (a nice touch). Emits a
PNG download, a `palette.js` file listing the colours actually used, or a `POST /_save`
into the game's art folder via its dev server. The stats readout distinguishes "palette
offered" from "colours actually used", which is the number that matters.

### Code quality, and what is liftable

Good. Genuinely good — better commented than most production code, and the comments
explain *why* (the Mark Ferrari note on ordered dither reading as tone rather than noise
is correct and load-bearing). The pipeline is textbook-right in the two places people
usually get it wrong: median cut before dither, and luminance weighting in the nearest
match.

**The core is already lifted.** `quantise.js` exports `{ pixelate, crop, sample,
medianCut, nearest, hex }` as pure functions over `{width, height, data:Buffer}` with no
DOM anywhere. Porting to Pillow + numpy took about 60 lines and matched visually on the
first run — and numpy and scipy are *already* dependencies of `process_images.py`, so
there is no new install on the Python side either. Liftability is not the obstacle here.
Desirability is.

### The one real defect for this codebase

**The tool has no alpha model.** It carries a 1-bit cutoff: `if (d[i+3] < 8) { d[i+3] =
0 } else { d[i+3] = 255 }`. Every partially transparent pixel becomes fully opaque or
fully gone.

That is fine for opaque game backdrops and disqualifying here. Thirteen of the site's
assets — seven aisle plaques, five accent cutouts, the shared kitchen — are keyed PNGs
whose entire value is a clean feathered edge that is correct on both `#FAF6EC` paper and
`#161D1B` ground. `process_images.py` spends roughly 200 lines producing that edge:
distance-to-background alpha ramp, hue confidence vote, alpha unmultiply ("which is what
actually kills the halo"), despill, speck removal, `feather=0.7`. The pixel tool throws
all of it away and reinstates the jaggies. My test on `aisle-produce.png` came back with
a hard black box where the transparency had been.

---

## 3. Register by register

I ran the ported algorithm on a representative asset from each register at grid sizes
bracketing the sizes the site actually draws them, and looked at the results.

### Painted plaster — dishes, staples, accent plates, the modern frescoes (~50 assets)

**Actively harmful.** These read as ancient because of the craquelure: a fine, irregular,
low-contrast crack network over a cream plaster ground. Two things happen to it.

Box-averaging 880px → 128px is a 7× reduction, which erases the crack network entirely —
the cracks are one to two source pixels wide. Then the Bayer pass paints a *regular* 4×4
lattice over the flat ground in its place. The net effect is an exact inversion of what
makes the asset work: irregular age is replaced by machine regularity. At 128px the
result looks like a competent VGA background and nothing at all like excavated plaster.
At 64px the parsley is a green blob and the onion crescents are gone.

There is a version that does no damage: skip the downsample, quantise at native size
(420px, 24 colours, dither 0.35). The craquelure survives, the plate goes very slightly
flatter and more poster-like — and it is essentially indistinguishable from the original
at card size while costing **18,706 B against the existing card's 17,616 B, +6%**. The
only setting that does not hurt is the one that does nothing.

### Carved stone — aisle icons, accent cutouts, shared kitchen (13 assets)

**Blocked outright**, for the alpha reason in §2. Even granting a proper alpha model,
these are already the site's most "reduced" assets: `save_png` quantises them to 160
colours with FASTOCTREE and they are drawn at 46–54px in the Market note row. A 48px grid
into a 54px box is a 1:1 mapping — you would pay the whole cost of a build stage to
produce something the eye cannot distinguish from the input, except at the edges, where
it is worse.

### Modern watercolour — the 18 invented dishes (`dish-inv-*.webp`)

**The most expensive loss on the site, and the least obvious one.** These exist to be
unmistakably *drawn* rather than *excavated* — `invented.js` is blunt about why ("One
invented dish loose among the tablets would do more damage than these twelve are worth")
and `cards.css` reinforces it with a dashed border on every invented card.

The visual half of that signal is soft wet-edge washes and a loose graphite outline
against the plaster's flat opaque fills and craquelure. Put both through the same
quantiser at 128px and they come out speaking the same dialect: hard-edged flat colour
with an identical Bayer texture over the ground. I put the two side by side and the
distinction is not gone but it is markedly weaker — the shared quantisation vocabulary
dominates the difference in mark-making. A global pixel pass would leave the dashed
border doing that work alone, which is exactly the position the site went out of its way
to avoid being in.

If pixelation is applied to *only* one register to keep them distinct, note that you have
then made the invented dishes look like retro video-game art, which is a specific and
somewhat frivolous connotation to attach to the only content on the site that is
knowingly made up.

### Photographs — the 31 Yadinu shots

**Technically the best result and rhetorically the worst.** At 128×160 with 32 colours
the portrait holds up remarkably well: the sepia palette is naturally narrow, so median
cut serves it, and the face is still legible. It looks good.

It is still wrong. `reports.css` says exactly why: "These are the only images on the site
with a person in them — everything else is painted plaster or a drawn dish — so they
carry real alt text rather than the empty alt the decorative art uses." Yadinu is
fictional, and the photographs are the one place the site presents him without
commentary, as a matter of fact. Turning them into illustration folds them into the
decorative layer and quietly admits the fiction — which is a narrative decision, made by
an image filter, for aesthetic reasons. If that call is ever made it should be made
deliberately and not as the tail of a global pass.

A secondary point: at 74px (`.post__fig`) the pixelation is invisible, and at full column
width (~600px in `.shot`) it is a poster. There is no in-between where it reads as a
subtle treatment.

---

## 4. Integration path

**None of the three, on the current imagery.** But the comparison is worth having on
record, because it is what makes the "no" defensible rather than merely cautious.

### Path 1 — build step (the one I would choose if forced)

Best fit by a distance. It matches how everything else here is made, it can be reviewed
asset by asset, it costs nothing at runtime, and the port is trivial.

- **New file:** `scripts/pixelate.py`, ~110 lines. `crop / sample / median_cut /
  nearest / pixelate`, plus alpha handling the original lacks. numpy and scipy are
  already imported by `process_images.py`, so no new dependency.
- **Touched:** `scripts/make_thumbs.py` gains a third derivative alongside `-thumb` and
  `-card` and one more key in the emitted block; `src/data/imagery.generated.js`
  regenerates; one CSS rule per placement adds `image-rendering: pixelated`.
- **Cost:** ~65 more files. At the grid sizes that are visible at all (128px, 32 colours)
  the derivatives land at roughly the same weight as the existing thumbs — call it
  +300 KB on disk, +2–3 s of build. Not a real cost.
- **Why it still loses:** the effect is baked. It cannot respond to `data-theme`, which
  matters here because `imagery.css`, `cards.css` and `plates.css` all carry a dark-theme
  `brightness(0.86) saturate(0.94)` knock-back on exactly these assets, tuned on the
  reasoning that "the drawing is near-black and the ground is near-white". Quantise to 32
  colours and that reasoning stops holding: a filter over 32 flat fills posterises
  visibly rather than proportionally.

### Path 2 — runtime canvas

**Disqualified on measurement.** I benchmarked the tool's actual inner loop (nearest over
a 32-entry palette, luminance-weighted) in Node — JIT-warm, no canvas round trip, no
median cut:

| target | ms |
|---|---|
| 176px thumb, 32 colours | **4.0** |
| 420px card, 32 colours | **23.5** |
| 880px plate, 32 colours | **101.0** |

The Pantry plate grid draws twelve staples at `card` size: **~280 ms of blocked main
thread** for the quantise alone, before `getImageData` / `putImageData` and before median
cut, which sorts a 20,000-sample array repeatedly and is likely the larger half. The
Recipes grid draws 33 thumbs. On a site whose entire layout architecture exists to keep
one screen responsive — a 100dvh grid with `overflow: hidden` and exactly one internal
scroller per route — spending a third of a second of main thread on a decorative filter
is not a trade worth discussing. A worker plus `OffscreenCanvas` would fix the jank and
add real complexity for an effect §3 says should not ship.

### Path 3 — CSS-only approximation

Nearly free and genuinely worse. `image-rendering: pixelated` on a downscaled source gets
you the grid and none of the palette, which means none of the ordered dither, which is
the part of the tool doing the actual work — a Bayer lattice is what makes a reduced
image read as tone rather than as a JPEG artefact. What you would ship is not the owner's
tool; it is the cheap thing the owner's tool was written to be better than. If the
conclusion is "don't", this is a bad way to do it anyway.

---

## 5. What I would try first

The experiment is ten minutes and it is designed to kill the idea rather than flatter it.

Take three assets — `dish-lamb-and-beet-stew-tuhu.webp` (plaster),
`dish-inv-caesar-salad.webp` (watercolour), `yadinu-portrait-01-thumb.webp` (photograph).
Run each through `pixelate.html` twice: once at the grid the site's *display size*
implies (64×64, 64×64, 72×90) and once at a grid where the pixels are actually visible
(128×128, 128×128, 128×160).

Then — and this is the whole test — **put the six outputs in a page at 1:1 next to the
originals, at 62px, 88px and 190px, which are the three sizes this site actually draws
these files.** Not at 3× or 4× zoom. Pixel art always wins at 4× zoom; that is the
tool's preview default and it is why this looks more promising than it is.

The prediction, from having run it: at 62px and 88px you will not be able to tell the
pixelated version from the original, and at 190px you will be able to tell and will
prefer the original. If that prediction is wrong the idea is alive and Path 1 is cheap.
If it is right, it is dead in ten minutes and no code was written.

The variant worth running in the same sitting, because it is the strongest form of the
idea: quantise at **native size with no downsample** (420 × 420, 24 colours, dither 35%).
That preserves the craquelure. Compare that against the existing `-card` derivative and
decide whether a 6% byte increase buys anything you can see. I could not see it.

---

## 6. What I would advise against

**A global pixel pass over `/img`.** It flattens four deliberate registers into one, and
the two the site most needs to keep apart — attested plaster and invented watercolour —
are the two that converge hardest under quantisation. That distinction currently survives
on artwork and a dashed border; do not ask the border to carry it alone.

**Pixelating the cutouts, at all, with this tool.** The 1-bit alpha cutoff undoes
`process_images.py`'s entire keying stage. If it is ever wanted, the alpha handling has to
be written first, and then §3 says don't anyway.

**Pixel-art photographs of Yadinu.** That is a narrative decision wearing an image
filter's clothes.

**Pixelation as a hover effect.** It needs a canvas per hovered card (23.5 ms at card
size), it flickers on a grid of 33 cards, `prefers-reduced-motion` would have to disable
it entirely, and the site's own comments describe rejecting fussier interactions than
this for less reason.

**Pixelation as a loading placeholder.** This is the one I expected to recommend and the
numbers refused. A 20×20 / 12-colour LQIP encodes to **420 B as base64 WebP**, against an
average thumb of **4,755 B** — you would spend 9% of the payload inline in the JS bundle
to cover a gap of a few milliseconds on a 4.7 KB image. LQIP earns its place against
100 KB heroes over slow links, not against these. And the site's one genuine pop-in has a
free fix that is not a placeholder at all: **`DishModal.jsx:67` passes `art.src` — the
full 880px plate, 40–110 KB — into a 132px box.** `art.card ?? art.src` is 19 KB average
and covers that box at 3×. `CardGrid.jsx` and `PlateGrid.jsx` already do exactly this.

**A low-bandwidth tier.** It doubles the manifest, needs a persisted user setting, and the
imagery is already lazy-loaded and inside a 250 KB per-asset budget. There is no bandwidth
problem to solve. (One genuine budget note found in passing, unrelated to pixels:
`process_writers.py` sets `MAX_KB = 320`, above the site's stated 250 KB ceiling, and
`public/img/writers` is 6.2 MB of the 14 MB total.)

### The one thing I would say yes to

If the appetite is really for pixels rather than for age, put them on **new content in a
fifth register**, where a pixel grid is the native idiom rather than a filter over
someone else's finished work.

The obvious candidate is `places.js`. It carries eight-plus places with local, neighbour
and modern names — "the shipping manifest of the Late Bronze Age", in its own words — and
it renders today as a dotted text list with no picture at all. A small pixel map of the
eastern Mediterranean, drawn *as* pixel art at a fixed grid with a fixed 16-colour palette
derived from the site's own copper tokens, would be the only asset on the site that is
neither excavated nor drawn nor photographed: a diagram, honestly labelled as one. It
would carry no risk of being confused with the attested material, it would answer a real
question a reader arrives with (where are these places), it would cost one asset instead
of ninety-five, and it is exactly what `pixelate.html` plus `px.js`'s `ramp()` and
`dither()` are good at.

That is a commission, not an integration. Which is, I think, the honest answer to the
question that was asked.
