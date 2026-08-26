#!/usr/bin/env python3
"""
Write every assembled writer prompt to public/prompts.json, for generating by hand.

    npm run prompts

WHY. The API route is the fast one and it is not always open: Gemini image models have no
free-tier allocation, and a paid key is not always to hand. Generating a frame by hand in
whatever web UI is available is a perfectly good fallback, and the only thing standing in
the way is that the prompt does not exist anywhere a human can copy it. It is assembled in
Python out of eight blocks, and until now it only ever existed inside a request body.

So this dumps the finished text. In dev, `PostBody` fetches this file and renders the prompt
INTO THE GAP where the missing picture would be, with a copy button. The loop closes:

    npm run frames                     posts     -> frames.json
    npm run prompts                    frames    -> public/prompts.json
    (browse the article, copy the prompt out of the gap, generate it wherever)
    python scripts/fetch_frame.py <slug> <file>  -> images/_raw/generated/
    python scripts/process_writers.py --write    -> public/img/reports/<article>/

NOT SHIPPED TO PRODUCTION. It lands in public/ rather than src/ precisely so that it is
fetched at runtime in dev and never bundled. It is roughly 150 KB of prompt text and no
reader needs a byte of it. It is gitignored for the same reason: it is derived, it changes
whenever a brief changes, and regenerating it takes under a second.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import narrators  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "prompts.json"


def main() -> None:
    rows = narrators.subjects()
    if not rows:
        sys.exit("no frames. Run `npm run frames` first.")

    out = {}
    for s in rows:
        writer = s["writer"]
        # Keyed by the browser path beneath /img. The article slug owns the scene.
        out[s["out"].removeprefix("reports/")] = {
            "slug": s["slug"],
            "writer": writer,
            "who": s.get("who"),
            "shape": "portrait" if s["ratio"] < 1 else "landscape",
            "size": s["size"],
            "source": s["source"],
            # The reference face matters to a human too: generating a frame of a writer
            # without looking at their face frame is how a set drifts, whoever is driving.
            "reference": (f"public/img/writers/{s['who']}/face.webp" if s.get("who") else None),
            "prompt": s["prompt"],
        }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(out, indent=1, ensure_ascii=False) + "\n", encoding="utf-8")
    kb = OUT.stat().st_size // 1024
    withref = sum(1 for v in out.values() if v["reference"])
    print(f"wrote {OUT.relative_to(ROOT)}  ({len(out)} prompts, {kb} KB, "
          f"{withref} with a reference face)")
    print("dev only: PostBody fetches this to fill an empty figure. Not bundled, gitignored.")


if __name__ == "__main__":
    main()
