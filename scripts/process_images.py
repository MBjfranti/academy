#!/usr/bin/env python3
"""
Barley & Bronze - image pipeline.

Turns images/_raw/* into web-ready assets in public/img/.
Re-runnable: it always rebuilds from the raws, never from its own output.

    python scripts/process_images.py            # build everything
    python scripts/process_images.py --contact  # also dump working files to images/_work

Three buckets, because the raws are three genuinely different kinds of picture:

  KEYED    flat-magenta chroma plates -> transparent PNG cutouts.
           Real keying: distance-to-background alpha ramp, alpha unmultiply
           (which is what actually kills the halo), speck removal, feather,
           autocrop. These are the only assets safe on BOTH the light #FAF6EC
           paper and the dark #161D1B theme, because there is no background
           left to be the wrong colour.

  SHEET    the same, but the plate holds five captioned vignettes. Segment
           into components, cluster them into vignettes, then drop the
           baked-in caption band under each one.

  PLATE    full illustrated scenes. NOT keyable - there is no separable
           background, only picture. Matted, cropped, resized, shipped as WebP.

Requires: Pillow, numpy, scipy.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import shutil
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
# Two input roots, deliberately separate. RAW holds art a human found and dropped in;
# RAW_GEN holds art generate_images.py made. Both are scanned non-recursively, so
# _raw/generated/superseded and _raw/processed are invisible to the scan - which is what
# keeps a superseded reroll from coming back to life and what keeps this script from
# reprocessing its own output.
RAW = ROOT / "images" / "_raw"
RAW_GEN = RAW / "generated"
MIRROR = RAW / "processed"
OUT = ROOT / "public" / "img"
WORK = ROOT / "images" / "_work"

# -- budget ---------------------------------------------------------------
MAX_KB = 250          # nothing shipped may exceed this
PLATE_W = 880         # scene plates: 2x the ~440px they are drawn at
CUTOUT_H = 420        # keyed cutouts, tall dimension


# =========================================================================
# keying
# =========================================================================

def background_colour(rgb: np.ndarray) -> np.ndarray:
    """Median of the four corner patches. These plates are flat-filled, so the
    corners are the background by construction."""
    h, w, _ = rgb.shape
    k = max(4, min(h, w) // 100)
    patches = [
        rgb[:k, :k], rgb[:k, w - k:],
        rgb[h - k:, :k], rgb[h - k:, w - k:],
    ]
    return np.median(np.concatenate([p.reshape(-1, 3) for p in patches]), axis=0)


def key_alpha(rgb: np.ndarray, bg: np.ndarray, t0: float, t1: float) -> np.ndarray:
    """Alpha from distance to the background colour, ramped between t0 and t1.

    A ramp rather than a hard threshold is the whole point: it gives a soft
    edge for free, and it gives us a band of partial-alpha pixels that the
    unmultiply step can then clean up.
    """
    d = np.linalg.norm(rgb.astype(np.float32) - bg[None, None, :], axis=2)
    return np.clip((d - t0) / max(t1 - t0, 1e-6), 0.0, 1.0)


def hsv(rgb: np.ndarray):
    """Vectorised RGB->HSV. Hue in degrees, s and v in 0..1."""
    a = rgb.astype(np.float32) / 255.0
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    mx, mn = a.max(axis=2), a.min(axis=2)
    c = mx - mn
    h = np.zeros_like(mx)
    nz = c > 1e-6
    idx = nz & (mx == r)
    h[idx] = ((g - b)[idx] / c[idx]) % 6
    idx = nz & (mx == g)
    h[idx] = ((b - r)[idx] / c[idx]) + 2
    idx = nz & (mx == b)
    h[idx] = ((r - g)[idx] / c[idx]) + 4
    return h * 60.0, np.where(mx > 1e-6, c / np.maximum(mx, 1e-6), 0.0), mx


def key_confidence(rgb: np.ndarray, bg: np.ndarray, hue_tol=30.0, sat_min=0.30):
    """How confident are we that each pixel is background, judged by HUE?

    The Euclidean-distance ramp alone is a brightness test as much as a colour
    test, so it quietly keeps any part of the background that the generator
    shaded - the soft drop-shadow behind a shelf, a vignette in a corner. Those
    survive as opaque pink blobs, which is exactly the sort of thing that gets
    noticed once the cutout sits on cream paper.

    Hue does not care how dark the shadow is. None of this artwork is anywhere
    near magenta (it is ochre, terracotta, teal, bone and black), so anything
    sharing the key's hue at real saturation is background whatever its value.
    """
    h, s, _ = hsv(rgb)
    h0, s0, _ = hsv(bg.reshape(1, 1, 3).astype(np.uint8))
    if float(s0[0, 0]) < 0.35:
        return np.zeros(rgb.shape[:2], np.float32)   # unsaturated key: hue is meaningless
    dh = np.abs((h - float(h0[0, 0]) + 180.0) % 360.0 - 180.0)
    near_hue = np.clip((hue_tol - dh) / hue_tol, 0.0, 1.0)
    strong = np.clip((s - sat_min) / 0.18, 0.0, 1.0)
    return near_hue * strong


def saturation(c: np.ndarray) -> float:
    """HSV-style saturation of one colour, 0..1."""
    hi, lo = float(c.max()), float(c.min())
    return 0.0 if hi == 0 else (hi - lo) / hi


def edge_connected(alpha: np.ndarray, thresh: float = 0.5) -> np.ndarray:
    """Only treat background as background if it reaches the frame edge.

    Guards against punching a hole through a light object in the middle of the
    picture that happens to sit near the key colour.

    Only correct for a WASHED-OUT background (white, cream, grey), where an
    object really might share the background's colour. Against a saturated key
    it is actively wrong: the gaps between two figures, or inside a jug handle,
    are enclosed rather than edge-connected, and this would refill them solid.
    That is why cut_out() decides per image rather than always calling it.
    """
    bgmask = alpha < thresh
    lab, n = ndimage.label(bgmask)
    if n == 0:
        return alpha
    edge_ids = set(lab[0].tolist()) | set(lab[-1].tolist())
    edge_ids |= set(lab[:, 0].tolist()) | set(lab[:, -1].tolist())
    edge_ids.discard(0)
    if not edge_ids:
        return alpha
    outside = np.isin(lab, list(edge_ids))
    # interior background pockets get their alpha restored to solid
    return np.where(bgmask & ~outside, 1.0, alpha)


def unmultiply(rgb: np.ndarray, alpha: np.ndarray, bg: np.ndarray) -> np.ndarray:
    """Recover the true foreground colour of partially-transparent edge pixels.

    An edge pixel is  px = a*F + (1-a)*bg,  so  F = (px - (1-a)*bg) / a.
    Without this, every cutout keeps a rim of the key colour blended into it -
    the classic magenta/white halo. Skipped where alpha is tiny (the division
    explodes) or already solid (nothing to correct).
    """
    a = alpha[..., None]
    band = (alpha > 0.06) & (alpha < 0.995)
    f = (rgb.astype(np.float32) - (1.0 - a) * bg[None, None, :]) / np.maximum(a, 0.06)
    out = rgb.astype(np.float32).copy()
    out[band] = np.clip(f[band], 0, 255)
    return out


def despill(rgb: np.ndarray, alpha: np.ndarray, bg: np.ndarray, width: int = 3):
    """Neutralise leftover key colour in the antialiased rim.

    Unmultiply fixes pixels whose alpha honestly reports partial coverage, but
    a hard 1px outline drawn against magenta leaves pixels that read as almost
    opaque while still being half key colour. Those are the ones that show up
    as a fringe once the cutout is placed on cream paper.

    So: work only inside a narrow band along the edge (never in the interior,
    where a legitimate blue or purple would look identical to spill), measure
    how far each pixel leans along the key's colour axis versus its own
    neighbours, then pull the colour back off that axis and take the alpha
    down in step.
    """
    inside = alpha > 0.5
    band = ndimage.binary_dilation(~inside, np.ones((width * 2 + 1,) * 2, bool)) & inside
    if not band.any():
        return rgb, alpha

    # Project onto the background's own colour axis: how much of this pixel is
    # explained by the key colour rather than by anything else.
    axis = bg / max(np.linalg.norm(bg), 1e-6)
    px = rgb.astype(np.float32)
    proj = px @ axis                       # component along the key colour
    resid = np.linalg.norm(px - proj[..., None] * axis[None, None, :], axis=2)
    # spill = strongly aligned with the key and not much else going on
    spill = np.clip((proj - resid * 1.35 - 90.0) / 110.0, 0.0, 1.0)
    spill = np.where(band, spill, 0.0)

    k = spill[..., None]
    neutral = np.repeat(px.mean(axis=2, keepdims=True), 3, axis=2)
    rgb = px * (1 - k) + neutral * k       # off the key axis, toward grey
    alpha = alpha * (1.0 - 0.9 * spill)    # and thin what is left
    return rgb, alpha


def drop_specks(alpha: np.ndarray, min_frac: float = 0.0004) -> np.ndarray:
    """Kill isolated crumbs left by compression noise in the flat background."""
    lab, n = ndimage.label(alpha > 0.35)
    if n == 0:
        return alpha
    sizes = ndimage.sum_labels(np.ones_like(lab), lab, index=np.arange(1, n + 1))
    keep = np.where(sizes >= alpha.size * min_frac)[0] + 1
    return np.where(np.isin(lab, keep), alpha, 0.0)


def cut_out(path: Path, t0=68.0, t1=118.0, feather=0.7, connected="auto"):
    """Full key. Returns float RGB, alpha 0..1, and the detected background.

    `connected="auto"` uses the flood-from-the-edges guard only when the
    background is desaturated enough for a real object to be confused with it.
    """
    rgb = np.asarray(Image.open(path).convert("RGB"))
    bg = background_colour(rgb)
    # two independent votes: distance (catches everything near the flat fill)
    # and hue (catches the shaded background the distance test lets through)
    alpha = np.minimum(key_alpha(rgb, bg, t0, t1), 1.0 - key_confidence(rgb, bg))
    if connected == "auto":
        connected = saturation(bg) < 0.35
    if connected:
        alpha = edge_connected(alpha)
    alpha = drop_specks(alpha)
    if feather:
        alpha = np.clip(ndimage.gaussian_filter(alpha, feather), 0, 1)
    rgb = unmultiply(rgb, alpha, bg)
    rgb, alpha = despill(rgb, alpha, bg)
    return rgb, alpha, bg


def to_png(rgb: np.ndarray, alpha: np.ndarray, box=None, margin=8) -> Image.Image:
    if box is None:
        ys, xs = np.where(alpha > 0.06)
        if len(ys) == 0:
            raise ValueError("keyed away to nothing")
        box = (xs.min(), ys.min(), xs.max() + 1, ys.max() + 1)
    x0, y0, x1, y1 = box
    h, w = alpha.shape
    x0, y0 = max(0, x0 - margin), max(0, y0 - margin)
    x1, y1 = min(w, x1 + margin), min(h, y1 + margin)
    arr = np.dstack([rgb[y0:y1, x0:x1], alpha[y0:y1, x0:x1] * 255.0])
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGBA")


# =========================================================================
# sprite sheets
# =========================================================================

def vignettes(alpha: np.ndarray, gap: int = 26, min_frac: float = 0.004):
    """Cluster the keyed mask into vignette bounding boxes.

    Dilating before labelling is what merges a figure, the pot beside her and
    the shelf above her into one vignette instead of nine fragments.
    """
    solid = alpha > 0.4
    grown = ndimage.binary_dilation(solid, np.ones((gap, gap), bool))
    lab, n = ndimage.label(grown)
    boxes = []
    for i, sl in enumerate(ndimage.find_objects(lab), start=1):
        if sl is None:
            continue
        piece = solid[sl] & (lab[sl] == i)
        if piece.sum() < alpha.size * min_frac:
            continue
        ys, xs = np.where(piece)
        boxes.append((sl[1].start + xs.min(), sl[0].start + ys.min(),
                      sl[1].start + xs.max() + 1, sl[0].start + ys.max() + 1))
    # reading order: rows top-to-bottom, then left-to-right within a row
    boxes.sort(key=lambda b: (b[1], b[0]))
    rows, cur = [], []
    for b in boxes:
        if cur and b[1] > cur[0][1] + (cur[0][3] - cur[0][1]) * 0.55:
            rows.append(sorted(cur, key=lambda x: x[0]))
            cur = []
        cur.append(b)
    if cur:
        rows.append(sorted(cur, key=lambda x: x[0]))
    return [b for row in rows for b in row]


def strip_caption(alpha: np.ndarray, box, max_caption_frac=0.12, gap_rows=5):
    """Drop the baked-in caption under a vignette.

    The caption is a short band of ink at the bottom, separated from the
    picture by clear rows. So: read the row-ink profile, split into bands, and
    if the last band is short and detached, cut above it.
    """
    x0, y0, x1, y1 = box
    ink = (alpha[y0:y1, x0:x1] > 0.4).sum(axis=1)
    rows = ink > 0
    bands, start = [], None
    for i, on in enumerate(rows):
        if on and start is None:
            start = i
        elif not on and start is not None:
            bands.append((start, i))
            start = None
    if start is not None:
        bands.append((start, len(rows)))
    if len(bands) < 2:
        return box
    height = y1 - y0
    last_s, last_e = bands[-1]
    prev_e = bands[-2][1]
    if (last_e - last_s) <= height * max_caption_frac and (last_s - prev_e) >= gap_rows:
        return (x0, y0, x1, y0 + prev_e)
    return box


# =========================================================================
# scene plates
# =========================================================================

def trim_mat(path: Path, tol: int = 18):
    """These 16x10 plates arrive matted on a flat cream card. Strip the mat so
    the fresco fills the frame - a baked-in cream border would read as a bright
    slab in the dark theme.

    The row/column version of this was wrong twice over, and both mistakes
    shipped:

      1. It only recognised ONE non-picture colour, the cream of the mat. Every
         one of these five raws is ALSO framed in a thin band of pure white
         between the mat and the picture - 32px of it across the top of the
         Babylonian and the Canaanite. White is nowhere near cream, so the
         "is this row all mat?" test failed on it and the white shipped, which
         is the bright slab across the top of accent-babylonian.webp.

      2. A row only counted as mat if 98.5% of it was mat, so a single stripe
         of anything else anywhere in the frame vetoed the whole row. Three of
         the raws (Egyptian, Aegean, Hittite) carry a narrow slice of a
         NEIGHBOURING picture down the left-hand side, separated from the real
         one by a white gutter. That slice runs the full height, so no row ever
         qualified, nothing was trimmed off the top or bottom, and the slice
         itself stayed in frame - the stray "bit of art off to the side".

    So instead: classify every pixel as mat, as pale (the white frame and
    gutter), or as picture; then take the LARGEST CONNECTED REGION of picture.
    Connectivity is what does the real work - it is the only cheap test that
    knows the left-hand slice is a different picture rather than part of this
    one, because the white gutter disconnects them.

    Falls back to the untouched source if no convincing mat is found (a
    full-bleed raw, e.g. anything from generate_images.py) or if the region
    that comes back is implausibly small.
    """
    src = Image.open(path).convert("RGB")
    rgb = np.asarray(src).astype(np.int16)
    h, w, _ = rgb.shape
    bg = background_colour(np.asarray(src))

    mat = np.abs(rgb - bg[None, None, :]).max(axis=2) <= tol
    if mat.mean() < 0.02:
        return src                       # no mat worth speaking of: full bleed

    hi, lo = rgb.max(axis=2), rgb.min(axis=2)
    pale = (lo >= 225) & ((hi - lo) <= 25)   # the white frame and the gutter
    pic = ~(mat | pale)
    # open then close: drop speckle in the mat, then heal the hairline gaps a
    # pale highlight inside the picture would otherwise punch through it.
    pic = ndimage.binary_closing(
        ndimage.binary_opening(pic, np.ones((7, 7), bool)), np.ones((15, 15), bool))

    lab, n = ndimage.label(pic)
    if n == 0:
        return src
    sizes = ndimage.sum_labels(np.ones_like(lab), lab, index=np.arange(1, n + 1))
    ys, xs = np.where(lab == int(np.argmax(sizes)) + 1)
    left, right = int(xs.min()), int(xs.max()) + 1
    top, bot = int(ys.min()), int(ys.max()) + 1
    if bot - top < h * 0.4 or right - left < w * 0.4:
        return src
    return src.crop((left, top, right, bot))


def ratio_crop(im: Image.Image, ratio: float, ax: float = 0.5, ay: float = 0.5):
    """Crop to an exact aspect ratio, keeping the window at (ax, ay).

    0 is left/top, 1 is right/bottom, 0.5 is the old centre crop. Only the axis
    that is actually being cut pays attention to its anchor.

    A blind centre crop is fine when the source is already close to the target
    ratio and hopeless when it is not, and after the mat comes off these five
    are not: two are wide friezes at ~1.80 and three are near-square panels at
    ~1.12-1.20. Whichever ratio the set is normalised to, something gets cut,
    and it matters enormously WHAT - the difference between losing a repeated
    row of storage jars and losing a person's feet. That judgement cannot be
    made from pixel statistics, so it is made by eye, once, and written down in
    PLATE_CROP below.
    """
    w, h = im.size
    if w / h > ratio:
        nw = round(h * ratio)
        x = round((w - nw) * min(max(ax, 0.0), 1.0))
        return im.crop((x, 0, x + nw, h))
    nh = round(w / ratio)
    y = round((h - nh) * min(max(ay, 0.0), 1.0))
    return im.crop((0, y, w, y + nh))


# =========================================================================
# saving
# =========================================================================

REPORT: list[tuple[str, str, int]] = []


def _record(path: Path, im: Image.Image):
    kb = path.stat().st_size // 1024
    REPORT.append((path.name, f"{im.size[0]}x{im.size[1]}", kb))
    flag = "   ** OVER BUDGET **" if kb > MAX_KB else ""
    print(f"  {path.name:30s} {im.size[0]:>4}x{im.size[1]:<5} {kb:>4} KB{flag}")
    # Mirror into images/_raw/processed so the finished asset can be compared against its
    # raw side by side without digging through public/. public/img stays the only copy the
    # site actually serves; this one is purely for review and is safe to delete.
    if MIRROR.is_dir():
        shutil.copy2(path, MIRROR / path.name)


def save_webp(im: Image.Image, name: str, width=PLATE_W, quality=74):
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    p = OUT / (name + ".webp")
    for q in (quality, 66, 58, 50):
        im.save(p, "WEBP", quality=q, method=6)
        if p.stat().st_size <= MAX_KB * 1024:
            break
    _record(p, im)


def save_png(im: Image.Image, name: str, height=CUTOUT_H, colours=160):
    """Transparent PNG, palette-quantised.

    FASTOCTREE is used because it is the one Pillow quantiser that keeps the
    alpha channel. Flat illustration survives ~160 colours with no visible
    banding and the file lands at a fraction of full RGBA.
    """
    if im.height > height:
        im = im.resize((round(im.width * height / im.height), height), Image.LANCZOS)
    p = OUT / (name + ".png")
    for c in (colours, 96, 64):
        im.quantize(colors=c, method=Image.Quantize.FASTOCTREE).save(p, optimize=True)
        if p.stat().st_size <= MAX_KB * 1024:
            break
    _record(p, im)


# =========================================================================
# the manifest of what each raw actually is
# =========================================================================

# Decided by looking at every plate, not by reading filenames.
# key: raw filename -> (output slug, aspect ratio to crop to)
#
# The five accent plates are 4:3, not the 16:10 their filenames claim. The
# filename describes the CANVAS the generator was given; it says nothing about
# the picture drawn on it. Measured, with the mat and the white frame off:
#
#     babylonian  1586 x 859   1.85    wide frieze
#     canaanite   1538 x 856   1.80    wide frieze
#     hittite     1181 x 986   1.20    near-square panel
#     aegean      1138 x 986   1.15    near-square panel
#     egyptian    1100 x 986   1.12    near-square panel
#
# Two families, and no ratio is free for both. Held at 16:10 the three panels
# lost a quarter of their height, which in a standing-figure composition is
# precisely the heads and the feet - that is why the Hittite shipped with its
# frieze band gone and its pedestal bowl sawn off. 4:3 spends the loss on the
# friezes instead, where it costs a column of repeated storage jars, and 4:3 is
# also the widest ratio at which the Egyptian pair still fits between its own
# top and bottom edges at all. One ratio for all five is worth keeping: the
# plate is the first thing in an accent panel and it should be the same block
# of picture whichever accent you opened.
PLATES = {
    "babylonian_pantry_16x10.png": ("accent-babylonian", 4 / 3),
    "egyptian_new_kingdom_pantry_16x10.png": ("accent-egyptian", 4 / 3),
    "mycenaean_greek_pantry_16x10.png": ("accent-aegean", 4 / 3),
    "hittite_pantry_16x10.png": ("accent-hittite", 4 / 3),
    "canaanite_pantry_16x10.png": ("accent-canaanite", 4 / 3),
}

# Where the ratio crop sits, per slug: (x anchor, y anchor), 0..1, default 0.5.
# One line each, decided by looking at the alternatives side by side.
PLATE_CROP = {
    # Frieze. Cut from the left, because the left is two stacks of plain
    # storage jars and the right is the heifer, which a centre crop docks.
    "accent-babylonian": (0.72, 0.5),
    # Frieze. Centred: the shelving either side of the pair is equally worth
    # keeping and equally expendable.
    "accent-canaanite": (0.5, 0.5),
    # Panel. Bottom-anchored. The band of hieroglyphs and the two figures do
    # not both fit; a figure standing on its own floor line reads as a picture,
    # a band of hieroglyphs sliced through the middle reads as a mistake. So
    # the band goes and the feet stay.
    "accent-egyptian": (0.5, 1.0),
    # Panel. Top-anchored: this source already clips the feet at its own
    # bottom edge, so there is nothing down there to protect, and the top is
    # the amphora being handed across - the whole subject of the picture.
    "accent-aegean": (0.5, 0.0),
    # Panel. Centred, and it needs nothing else: at 4:3 the frieze band, both
    # figures, the pedestal bowl and the floor line all fit.
    "accent-hittite": (0.5, 0.5),
}

# Single-vignette magenta chroma plates worth keying and shipping.
CUTOUTS = {
    "ChatGPT Image Aug 24, 2026, 12_57_17 PM (1).png": "kitchen-shared",
}

# Captioned five-up magenta sheets. Caption order read off the sheet itself.
SHEETS = {
    "ChatGPT Image Aug 24, 2026, 12_51_03 PM.png": (
        "accent",
        ["hittite", "aegean", "egyptian", "babylonian", "canaanite"],
    ),
}

# Deliberately not shipped. Kept here rather than deleted so the next person to
# run this knows these were looked at and judged, not simply missed.
EXCLUDED = {
    "watermarked_img_148779706389951006.jpg":
        "watermarked stock image, no rights story",

    # Two more captioned five-up magenta sheets, cooking rather than pantry.
    # Cleanly keyable, and the art is good. Rejected on content: the fifth
    # panel is captioned TROJAN / ILION, and there is no trojan accent in
    # accents.js. Shipping them would cover four of the five accents and
    # invent a sixth culture the site does not talk about. Re-generate with
    # Canaanite in place of Troy and they become usable as a set.
    "ChatGPT Image Aug 24, 2026, 01_11_36 PM (1).png":
        "five-up cooking sheet, but panel 5 is Trojan/Ilion - no such accent",
    "ChatGPT Image Aug 24, 2026, 01_11_36 PM (2).png":
        "five-up cooking sheet, captions above panels, same Trojan/Ilion problem",
}

# Looked at, keyable or usable, but not needed. Recorded for the next pass.
PARKED = {
    "Gemini_Generated_Image_ze0vxdze0vxdze0v*.jpg":
        "4 figure pairs on flat crimson - keyable, but only 4 of the 5 accents "
        "and a different illustration style from the set we shipped",
    "ChatGPT Image Aug 24, 2026, 12_35_5*.png / 12_37_5*.png":
        "10 landscape market-stall and hearth scenes - good scene plates, but "
        "the Market must stay ~one screen per aisle, so there is nowhere to "
        "put them that does not cost more than it gives",
    "ChatGPT Image Aug 24, 2026, 12_55_1*.png / 12_57_1*.png":
        "9 further single magenta vignettes - keyable, but unlabelled, so "
        "which accent each belongs to would be a guess",

    # Found uncatalogued on the crop pass. These are the sheets EXCLUDED wishes
    # the 01_11_36 pair had been: the same five-up magenta cooking format, but
    # captioned HITTITE / MYCENAEAN GREEK / EGYPTIAN NEW KINGDOM / BABYLONIAN /
    # CANAANITE - all five accents, no Trojan sixth. Cleanly keyable. Parked
    # only because the cutouts we ship already come from a complete five-up
    # (12_51_03) and are pantry scenes that match the plates; swapping in
    # cooking scenes is an art direction decision, not a bug fix.
    "ChatGPT Image Aug 24, 2026, 01_01_49 PM (1..3).png":
        "three five-up cooking sheets covering ALL FIVE accents - the usable "
        "version of the pair excluded above; a real alternative cutout set",

    "Gemini_Generated_Image_5x3g385x3g385x3g.jpg":
        "contact sheet of 5 small scene thumbnails on a crimson ground - the "
        "individual pictures are ~300px, far under PLATE_W, so unusable",
}


# -- generated art --------------------------------------------------------
#
# scripts/generate_images.py writes images/_raw/gen-<slug>.png and records what each one is
# in scripts/generated.json. Folding that in here rather than hand-listing it above means a
# generation run never requires an edit to this file - the three dicts above stay what they
# are, a record of the raws a human looked at and judged.
#
# Generated rows carry their own final height / aspect ratio, because an aisle icon and a
# dish still are not the same size and CUTOUT_H cannot be both.

GENERATED = Path(__file__).resolve().parent / "generated.json"
CUTOUT_H_BY_SLUG: dict[str, int] = {}


def load_generated() -> int:
    """Fold scripts/generated.json into PLATES / CUTOUTS.

    A generated row is keyed by its RAW filename, so it cannot collide with a
    hand-listed raw - but two different raws can still name the same output
    SLUG, and then both get built, one over the top of the other, with the
    winner decided by nothing better than dict order. That is how
    accent-canaanite.webp came to be written twice in one run.

    So a slug already claimed above wins and the generated row is skipped, out
    loud. A name in PLATES / CUTOUTS is an editorial decision about a specific
    picture - the manifest's alt text describes that picture, and the five
    accent plates are a matched set that only works as a set. When a generation
    run is genuinely meant to take a slug over, delete the hand row: one line,
    and the intent is then written down rather than raced for.
    """
    if not GENERATED.exists():
        return 0
    claimed = {slug for slug, _ in PLATES.values()} | set(CUTOUTS.values())
    n = 0
    for row in json.loads(GENERATED.read_text()):
        raw, out = row["raw"], row["out"]
        if out in claimed:
            print(f"  skipped:   {raw}\n             -> slug '{out}' is already "
                  f"claimed by a hand-listed raw; delete that row to hand it over")
            continue
        if row["kind"] == "cutout":
            CUTOUTS[raw] = out
            CUTOUT_H_BY_SLUG[out] = int(row.get("height", CUTOUT_H))
        else:
            PLATES[raw] = (out, float(row.get("ratio", 1.6)))
        claimed.add(out)
        n += 1
    return n


def dedupe() -> dict[str, Path]:
    """Hash every raw and keep one copy of each. The folder ships exact dupes.

    Sorted so that `foo.png` wins over the browser's `foo (1).png`, because the
    un-suffixed name is the one the manifest below refers to.
    """
    seen, keep = {}, {}
    files = [f for d in (RAW, RAW_GEN) if d.is_dir() for f in d.iterdir() if f.is_file()]
    for f in sorted(files, key=lambda p: (" (" in p.name, p.name)):
        if f.suffix.lower() not in {".png", ".jpg", ".jpeg", ".webp"}:
            continue
        h = hashlib.md5(f.read_bytes()).hexdigest()
        if h in seen:
            print(f"  duplicate: {f.name}  ==  {seen[h].name}  (skipped)")
            continue
        seen[h] = f
        keep[f.name] = f
    return keep


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--contact", action="store_true",
                    help="dump intermediate slices to images/_work for eyeballing")
    args = ap.parse_args()

    OUT.mkdir(parents=True, exist_ok=True)
    MIRROR.mkdir(parents=True, exist_ok=True)
    if args.contact:
        WORK.mkdir(parents=True, exist_ok=True)

    n_gen = load_generated()
    if n_gen:
        print(f"\n-- {n_gen} generated raw(s) folded in from {GENERATED.name} --")

    print("\n-- dedupe --")
    raws = dedupe()
    for name, why in EXCLUDED.items():
        if name in raws:
            print(f"  excluded:  {name}\n             -> {why}")
    for pattern, why in PARKED.items():
        print(f"  parked:    {pattern}\n             -> {why}")

    print("\n-- scene plates (WebP) --")
    for name, (slug, ratio) in PLATES.items():
        src = raws.get(name)
        if src is None:
            print(f"  MISSING {name}")
            continue
        ax, ay = PLATE_CROP.get(slug, (0.5, 0.5))
        save_webp(ratio_crop(trim_mat(src), ratio, ax, ay), slug)

    print("\n-- keyed cutouts (transparent PNG) --")
    for name, slug in CUTOUTS.items():
        src = raws.get(name)
        if src is None:
            print(f"  MISSING {name}")
            continue
        rgb, alpha, _ = cut_out(src)
        save_png(to_png(rgb, alpha), slug,
                 height=CUTOUT_H_BY_SLUG.get(slug, CUTOUT_H))

    print("\n-- sprite sheets --")
    for name, (prefix, keys) in SHEETS.items():
        src = raws.get(name)
        if src is None:
            print(f"  MISSING {name}")
            continue
        rgb, alpha, _ = cut_out(src)
        boxes = vignettes(alpha)
        print(f"  {name}: {len(boxes)} vignettes, expected {len(keys)}")
        if args.contact:
            for i, b in enumerate(boxes):
                to_png(rgb, alpha, strip_caption(alpha, b)).save(WORK / f"{prefix}-slice-{i}.png")
        if len(boxes) != len(keys):
            print("    -> count mismatch, NOT shipping this sheet")
            continue
        for key, box in zip(keys, boxes):
            save_png(to_png(rgb, alpha, strip_caption(alpha, box)), f"{prefix}-{key}-cut", height=340)

    total = sum(kb for _, _, kb in REPORT)
    print(f"\n-- {len(REPORT)} assets, {total} KB total --\n")
    if any(kb > MAX_KB for _, _, kb in REPORT):
        sys.exit("one or more assets are over the size budget")


if __name__ == "__main__":
    main()
