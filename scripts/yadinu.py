#!/usr/bin/env python3
"""
THE YADINU STANDARD — one man, described the same way every time.

WHAT THIS IS. Yadinu's photographs are made by hand and dropped into images/_custom. This
file is not a generator; it is the WRITTEN-DOWN version of the man already in those
pictures, so the next batch matches the last one. Paste the blocks below into whatever is
making the image and change only the SCENE.

WHY IT MATTERS. A narrator the reader cannot recognise is not a narrator. The failure mode
is never one bad picture — it is a set that quietly drifts. Hair a little longer, beard a
little fuller, five years older, and the man on the Egyptian quay is plainly not the man in
the Ugarit storeroom. So nothing below changes per frame. What changes is the PLACE, the
LIGHT, and what he is DOING.

THE SHAWL IS THE SILHOUETTE. The pale draped wrap over the left shoulder is what makes him
identifiable at thumbnail size, where his face is forty pixels wide. It is in essentially
every existing frame and it should stay that way.

HOW TO PUT A PICTURE INTO THE SITE. Name the file after the slot and drop it anywhere under
images/_custom (subfolders are fine), then run:

    python scripts/process_yadinu.py --write

A file named `world-hatti.png` becomes `yadinu-world-hatti.webp`, which is the name the
article reaches for. Anything not named like a slot gets a sequence number by shape instead
— fine for a library, useless for a caption. See NAMED SLOTS in process_yadinu.py.
"""

# ── who he is ────────────────────────────────────────────────────────────────────────
# Absolutes, deliberately. Vague description is exactly what lets a set drift: "dark curly
# hair" fits a thousand men; "loose black waves falling forward over the brow" fits one.
FACE_AND_BUILD = (
    "THE SAME MAN APPEARS IN EVERY IMAGE AND MUST BE INSTANTLY RECOGNISABLE. "
    "Yadinu of Ugarit: a Levantine man in his late twenties, warm olive-brown skin, lean "
    "and wiry rather than muscular — the build of someone who walks all day and is not "
    "paid much for it. "
    "His hair is dark brown, nearly black, thick and loosely curled, collar length, "
    "tousled, falling forward over the brow. His beard is short, dark and neatly kept, "
    "close along the jaw with the moustache joined to it: a young man's beard, never full, "
    "never bushy, never grey. "
    "Dark expressive brows, warm brown eyes, a straight nose, and a wide easy smile that is "
    "his resting expression. He is delighted by food and mildly amused by everything else. "
    "Enthusiastic, not world-weary. Open, not guarded."
)

# ── what he wears ────────────────────────────────────────────────────────────────────
DRESS = (
    "HIS CLOTHES ARE THE SAME IN EVERY IMAGE. A knee-length undyed linen tunic in cream and "
    "oatmeal, soft with washing, frayed at the hem. "
    "OVER IT, AND THIS IS THE ESSENTIAL ELEMENT: a pale loose-woven shawl draped over the "
    "LEFT shoulder and falling across the chest, with a narrow woven stripe of faded indigo "
    "and rust along its edge. "
    "At the waist, a wide belt of dark leather straps or a heavy cloth sash wound several "
    "times, worn and darkened, with a small pouch hanging from it. A narrow satchel strap "
    "crossing the chest from the right shoulder. Plain leather sandals. "
    "No jewellery: no rings, no gold, nothing at the neck but a simple cord. He is "
    "well-travelled, not rich. "
    "HIS KIT SHOWS — at least one of these in every frame: a reed stylus, a small clay "
    "tablet, a short bronze knife, a drawstring spice pouch, a stoppered waterskin."
)

# ── how it is photographed ───────────────────────────────────────────────────────────
CAMERA = (
    "PHOTOGRAPHIC, not painted and not illustrated: warm, rich and highly detailed, with the "
    "depth of a large-format colour photograph. Golden natural light — low sun, or the glow "
    "of an oven and an open doorway. Shallow depth of field, the background falling softly "
    "out of focus and full of activity. "
    "He is in the near foreground at roughly three-quarter length, filling a third to a half "
    "of the frame — never a small figure in a wide scene. He is aware of the camera and "
    "comfortable with it. "
    "THERE IS ALWAYS FOOD IN FRAME, in the foreground and in quantity: bread, onions, pulses "
    "in bowls, figs, olives, fish, herbs, storage jars. "
    "Palette warm throughout — ochre, terracotta, dust, sun-bleached linen, olive green, sea "
    "blue. NO text, NO lettering, NO captions, NO watermark."
)

# What must never appear, whatever the scene.
FORBIDDEN = (
    "Nothing modern anywhere in frame, and no post-Bronze-Age food: no tomatoes, peppers, "
    "potatoes, maize, chillies, citrus, sugar, rice, coffee or chocolate."
)


def yadinu(scene: str) -> str:
    """One prompt. `scene` is the only thing that changes between frames."""
    return "\n\n".join([CAMERA, FACE_AND_BUILD, DRESS, f"SCENE: {scene}", FORBIDDEN])


# ── the slots the articles ask for ───────────────────────────────────────────────────
# `slot`  the filename to save as: `<slot>.png` into images/_custom.
# `using` the existing hand-supplied photograph currently standing in.
# `gap`   True where the stand-in is only adequate and a purpose-made frame would be better.
#         Those three are the only ones actually worth shooting.
SLOTS = [
    # ── "Hello. I am Yadinu, and I used to count jars for a living." ──
    dict(slot="hello-hero", shape="portrait", using="portrait-11",
         scene="Yadinu grinning straight at the camera at a busy quayside market, a bowl of "
               "grain in one hand and a reed stylus in the other, moored ships and a "
               "painted harbour wall behind him."),
    dict(slot="hello-tablet", shape="portrait", using="portrait-13",
         scene="Yadinu frowning slightly in concentration over a small clay tablet held in "
               "both hands, a large pot steaming on the fire in front of him, bowls of "
               "grain and pulses along the table."),
    dict(slot="hello-port", shape="portrait", using="portrait-06",
         scene="Yadinu walking through a working port carrying a bowl, beached boats and a "
               "sail behind him, wide bowls of soup and bread set out on barrels in front."),
    dict(slot="hello-cooks", shape="landscape", using="portrait-08", gap=True,
         scene="Yadinu leaning in a doorway with his arms folded, WATCHING two cooks work a "
               "fire in a cramped kitchen — out of the way, not helping, entirely absorbed. "
               "He is a guest here, not the cook. Landscape, so the kitchen shows."),

    # ── "The world, as far as I have eaten it" ──
    dict(slot="world-hero", shape="portrait", using="portrait-03",
         scene="Yadinu sitting cross-legged on the deck of a merchant ship under sail, "
               "eating grilled fish and greens from a shallow dish, open sea and the sail "
               "behind him, crew working in the background."),
    dict(slot="world-babylon", shape="portrait", using="portrait-12", gap=True,
         scene="Yadinu in an INLAND Mesopotamian courtyard — mudbrick walls, palm-trunk roof "
               "beams, NO SEA and no harbour anywhere — seated on a low stool beside a large "
               "cooking pot, an older woman cook opposite him mid-argument with her hand "
               "raised. Barley, onions and a jug of beer on the ground between them."),
    dict(slot="world-egypt", shape="portrait", using="portrait-14",
         scene="Yadinu holding a cup and a piece of bread on a Nile quay, a brightly painted "
               "temple wall and an obelisk behind him, palms and river boats with broad "
               "sails on the water beyond."),
    dict(slot="world-hatti", shape="portrait", using="portrait-07", gap=True,
         scene="Yadinu on a COLD high Anatolian plateau, a heavy dull-red wool mantle pulled "
               "over the usual shawl, breath faintly visible, holding a round flat loaf. "
               "Massive cyclopean stone walls and thin grey mountain light behind him. "
               "Bleak and high: no sea, no palms, no golden hour, none of the usual warmth."),
    dict(slot="world-aegean", shape="landscape", using="landscape-13",
         scene="Yadinu on an Aegean terrace high above the sea, working dough at a long "
               "table with two women, a domed oven alight beside them, olives and greens in "
               "bowls, deep blue water and headlands behind."),
]
