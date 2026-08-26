# -*- coding: utf-8 -*-
"""
Verify every article figure's framing is physically possible.

THE GEOMETRY. A cropped figure is a `.fig__crop` span with `aspect-ratio: <crop>` and
`overflow: hidden`, holding an <img> pinned to `inset: 0` at 100% x 100% with
`object-fit: cover`. So before any transform the image covers the frame exactly.

The transform is `translate(px%, py%) scale(zoom)`, and the percentages resolve against the
image's own border box, which is the frame. Scaling by Z about the centre makes the element
overhang each edge by (Z - 1) / 2 of the frame. Panning further than that drags an edge
into view and the reader sees a band of bare --paper-2 under the picture.

    safe pan on either axis, in percent  =  (zoom - 1) * 50

CropTool clamps to this, so hand-tuned values are always inside it. Values typed straight
into the data file are not checked by anything, which is what this script is for: every
crop written by hand is a chance to ask for a frame the picture cannot fill.

    python scripts/check_crops.py          list violations
    python scripts/check_crops.py --all    list every figure with its margin
"""
import io
import re
import sys

SRC = "src/data/fieldReports.js"
FIG = re.compile(
    r"name: '([a-z0-9-]+)',\s*at: \d+[^}]*?"
    r"crop: '(\d+)\s*/\s*(\d+)',\s*pan: \[\s*(-?[\d.]+),\s*(-?[\d.]+)\s*\],\s*zoom: ([\d.]+)",
    re.S,
)

s = io.open(SRC, encoding="utf-8").read()
slugs = [(m.start(), m.group(1)) for m in re.finditer(r"\n    slug: '([a-z0-9-]+)'", s)]


def slug_at(pos):
    found = "?"
    for start, name in slugs:
        if start <= pos:
            found = name
        else:
            break
    return found


show_all = "--all" in sys.argv
bad = 0
rows = []
for m in FIG.finditer(s):
    name, cw, ch, px, py, z = m.group(1), int(m.group(2)), int(m.group(3)), float(m.group(4)), float(m.group(5)), float(m.group(6))
    limit = (z - 1) * 50
    worst = max(abs(px), abs(py))
    slack = limit - worst
    ok = slack >= -0.001
    if not ok:
        bad += 1
    if show_all or not ok:
        rows.append((ok, slug_at(m.start()), name, "%d/%d" % (cw, ch), z, px, py, limit, slack))

if rows:
    print("%-4s %-34s %-22s %-6s %5s %7s %7s %7s %7s"
          % ("", "report", "figure", "crop", "zoom", "panX", "panY", "limit", "slack"))
    for ok, slug, name, crop, z, px, py, limit, slack in rows:
        print("%-4s %-34s %-22s %-6s %5.2f %7.1f %7.1f %7.1f %7.1f"
              % ("ok" if ok else "BAD", slug[:34], name[:22], crop, z, px, py, limit, slack))
    print()

print("%d figure(s) panned further than their zoom can cover" % bad)
sys.exit(1 if bad else 0)
