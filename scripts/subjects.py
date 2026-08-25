#!/usr/bin/env python3
"""
Barley & Bronze - what we want art OF, and the house style it is drawn in.

This is the data half of the generator; scripts/generate_images.py is the engine.
Split the way Undici splits `clubs.py` from `build.py`: the machinery never changes,
the subject list changes constantly, and one should not force a re-read of the other.

WHY THE SUBJECTS ARE WRITTEN OUT HERE RATHER THAN PARSED OUT OF src/data/*.js.
The slugs come from the data, but the art direction does not and cannot: nothing in
recipes.js says whether a dish is photographed in a tripod cauldron or a shallow bowl,
or which two ingredients have to be visible for it to be identifiable at 300px. That is
a judgement per subject, and it belongs next to the subject.

The slugs ARE checked against the data, though - `generate_images.py --audit` regexes
every slug out of the JS and reports anything that has drifted in either direction. Run
it after touching either side.

STYLE WAS DERIVED BY LOOKING AT THE SHIPPED ASSETS, not from a brief. See STYLE_NOTES.
"""

# NOTE: the narrator is NOT generated here. Yadinu's photographs are made by hand and
# dropped into images/_custom; scripts/yadinu.py holds the written standard describing him
# and the list of slots the articles need, and scripts/process_yadinu.py ingests them. There
# was a generation tier here briefly and it is gone on purpose — one source for that man.

# =========================================================================
# THE HOUSE STYLE
# =========================================================================

STYLE_NOTES = """
Read off public/img/, not invented:

  accent-egyptian.webp   - New Kingdom tomb painting. Matte limewash ground the
                           colour of unbleached linen, visible plaster tooth. Figures
                           in strict profile, one flat skin tone per person (dark
                           terracotta for the man, pale ochre for the woman), no
                           modelling, no cast shadow anywhere. Outline is a thin dry
                           brown-black brush line, not ink. Palette is ochre, terracotta,
                           bone white, charcoal, with ONE cool note (a slate-blue bowl).
  accent-babylonian.webp - Same flat register, but the ground is glazed brick: a
                           desaturated lapis blue field with a rosette frieze band across
                           the top. Everything on top of it is still the same ochre/gold
                           range. So: one cool ground, warm subject.
  accent-aegean-cut.png  - The cutout register. Same flat fills and dry contour line,
                           no ground at all, no drop shadow. Terracotta, cream, a red-brown
                           and a single blue-black. Objects (jars, jugs) carry their
                           painted banding as flat pattern, which is what makes them
                           readable small.
  kitchen-shared.png     - The OTHER register: shallow carved sandstone relief. One
                           colour, no paint, depth read entirely from a soft top-left
                           bevel and a warm occlusion in the undercuts. Reads perfectly
                           at 40px because it is pure silhouette plus bevel.

So there are two registers in the shipped set, and they are used for different jobs.
The new work keeps that split rather than blurring it:

  PAINTED  - staples, dishes, the Canaanite panel. Colour is load-bearing (barley gold
             vs lentil brown vs date black), so these have to be painted.
  RELIEF   - aisle icons. Navigational, tiny, monochrome, must not compete with the
             painted art around them, and kitchen-shared.png already proves the register
             survives being shrunk.

What is NOT in the shipped set, and must stay out: gradients, airbrushing, cast shadows,
specular highlights, depth of field, perspective recession, photographic texture,
lettering of any kind, and anything post-1150 BC.
"""

# The painted register. Every clause here corresponds to something visible in
# accent-egyptian.webp / accent-aegean-cut.png.
STYLE_PAINTED = (
    "A fragment of painted lime plaster prised from the wall of an Eighteenth Dynasty "
    "Theban tomb chapel and photographed flat under even museum lighting. This is an "
    "ANCIENT PAINTED SURFACE, not a drawing of one: the lime ground is chalky and slightly "
    "uneven, the pigment sits thin and dry on it and has flaked to bare plaster in small "
    "patches, and a fine craquelure runs through the whole surface. The paint is matte, "
    "dusty and slightly faded, as three thousand year old pigment is. "
    "Every form is filled with ONE flat opaque earth colour, laid down like distemper, and "
    "bounded by a dry reed-brush contour in red ochre or soot black that thickens and thins "
    "and occasionally breaks where the brush ran dry. "
    "Everything is drawn as a FLAT ELEVATION, pressed against the picture plane the way "
    "Egyptian painting always is: each object shown from its most recognisable side, "
    "vessels in strict profile against the surface, contents shown as if tipped up toward "
    "the viewer. Depth is expressed only by placing one flat shape above another. "
    "The whole surface is lit identically everywhere, as a flat wall is. "
    "Palette, strictly: yellow ochre, wheat gold, terracotta, red ochre, bone white, warm "
    "cream, soot black, plus at most ONE cool note - Egyptian blue or a muted malachite green. "
    "Everything else is warm earth."
)

# The relief register. Corresponds to kitchen-shared.png.
STYLE_RELIEF = (
    "A carved element that has BROKEN FREE from a Late Bronze Age stone relief block - a "
    "Hittite orthostat or a Neo-Assyrian palace panel - and is photographed on its own in a "
    "museum. This is a piece of HARD ANCIENT STONE, three thousand years old: coarse grey-buff "
    "limestone with a visibly granular, pitted, faintly crystalline surface, weathered and "
    "abraded, with small chips and losses along the edges, shallow chisel and point marks "
    "still legible across every carved plane, and dark mineral staining settled into the "
    "hollows. "
    "The cutting is CRISP AND HARD. Flat carved planes meet at sharp arrises. Undercuts are "
    "deep and read as narrow bands of true shadow. The stone is dense and dry, and the light "
    "grazes it from the upper left, catching the grain. "
    "ONE stone colour throughout, with NO paint and NO pigment of any kind on the carving. "
    "Simple, bold, generous forms with no fine detail and no thin lines - it must read as a "
    "pure silhouette at 40 pixels."
)

# WHY STYLE_RELIEF READS THE WAY IT DOES. The first pass at these icons came back as
# decorative SOAP - soft doughy forms, rounded corners, a waxy sheen - and two clauses were
# doing it. "Soft bevel catching a diffuse light" plus "chunky, generous forms" describes a
# moulded object, not a chiselled one, so the medium has to be asserted as hard and the
# cutting as crisp. And "a raised silhouette standing 1-2 cm proud of a flat ground" is a
# contradiction against a chroma key: a relief BY DEFINITION sits in a panel, so asking for
# one and then asking for it to be cut free made the model invent a physical tile with
# rounded corners and float it on the magenta - complete with a drop shadow, which is
# precisely what leaves a grey fringe when the key runs. Naming the subject as an element
# that has broken free of its block resolves it: there is no panel left to draw.
NO_PLINTH = (
    "The carved element is shown ALONE, cut free of any block. There is NO backing panel, "
    "NO tile, NO plaque, NO slab, NO tablet, NO frame, NO border, NO rounded corners and NO "
    "flat ground behind it - only the carved shape itself, ending at its own broken stone "
    "edge. It floats with NO plinth, NO stand, NO surface beneath it and NO cast shadow of "
    "any kind."
)

# The Minoan register. A deliberate contrast with STYLE_PAINTED, which is Egyptian and
# stiff. Minoan wall painting is the opposite temperament - buon fresco laid into wet lime,
# so the line is fluid and confident rather than measured, the figures move, and blue and
# red are used freely instead of being rationed to one cool note. Having both registers
# means the anachronism panels can alternate and not read as one joke told six times.
STYLE_MINOAN = (
    "A Minoan buon fresco from a Late Bronze Age palace at Knossos or Akrotiri, painted "
    "into wet lime plaster and photographed flat under even museum lighting. This is an "
    "ANCIENT PAINTED WALL, not a drawing of one: the plaster is chalky and undulating, the "
    "pigment has sunk into it, patches have flaked away to bare ground, and a fine "
    "craquelure runs through everything. "
    "The drawing is FLUID and CONFIDENT - long sweeping curvilinear contours in soot black "
    "and red ochre, laid in wet with a loaded brush, swelling and tapering, never mechanical "
    "and never uniform in width. Forms are filled with flat unmodelled colour inside those "
    "contours. "
    "Minoan figure convention throughout: narrow waists and broad shoulders, figures caught "
    "mid-movement with a springing energy, faces in strict profile but the eye drawn large "
    "and almond-shaped as if seen from the front, long black hair falling in heavy curls. "
    "Men are painted red-brown, women are painted pale cream-white - this convention is "
    "strict. Women wear flounced tiered skirts and open bodices; men wear patterned kilts "
    "with a belted waist. "
    "Depth is expressed by flat overlap and by an undulating rocky groundline, never by "
    "perspective or shading. Lit identically everywhere, as a flat wall is. "
    "Palette: saffron yellow, red ochre, terracotta, cream white, soot black, and - unlike "
    "Egyptian painting - GENEROUS Egyptian blue and muted malachite green, used freely for "
    "water, cloth and plants."
)

# The painted register's ground contract. NOT a key field - these ship as opaque plates.
#
# Two observed failures, one cause. gen-lamb-and-beet-stew-tuhu came back as a plaster tile
# photographed ON a magenta field, complete with a drop shadow; an earlier pearl-barley came
# back with the plaster ground itself painted magenta. Both happened while the painted
# prompt still contained the word "magenta" - once as a field instruction, once inside the
# NO_MAGENTA warning. A diffusion model cannot reliably treat a named colour as forbidden
# rather than as subject matter, so the only safe move is not to name it here at all.
#
# Stated positively instead: the plaster IS the background, it runs off every edge, and the
# crop sits inside the fragment so no edge of the fragment is ever in shot.
PLASTER_GROUND = (
    "THE BACKGROUND IS THE PLASTER ITSELF. The photograph is cropped INSIDE the fragment, "
    "so ancient painted lime plaster fills the entire frame edge to edge and corner to "
    "corner and runs off all four sides of the picture. No edge of the fragment is visible "
    "anywhere in shot. "
    "The plaster ground is its own natural chalky off-white - warm bone, cream and pale "
    "buff, faintly mottled and unevenly aged, with the craquelure running right out to the "
    "four edges. "
    "Behind and around the subject there is ONLY this plaster: no coloured field, no flat "
    "backdrop, no studio sweep, no table, no ground plane, no horizon, no sky, no border, "
    "no mat, no margin, no vignette and no drop shadow. The subject is PAINTED ONTO the "
    "plaster, not an object resting in front of it, so it casts no shadow of any kind."
)

# The warm-colour guard for the painted register. Same job as NO_MAGENTA below, with every
# mention of the field colour removed for the reason given above - it asserts what the
# colour IS and stops there.
WARM_TRUE = (
    "CRITICAL: {what} must be a true warm {colour} - the colour of {ref}, mixed from earth "
    "pigment. Keep it firmly on the warm earth side, never cool and never a synthetic hue."
)

# The Mesopotamian register. Deliberately NOT a third painted style - Assyrian palace art
# is carved gypsum with the pigment long gone, so the whole reading comes from the cutting.
# Putting it next to two painted registers gives the set a genuine third texture rather
# than a third palette.
#
# It reuses the lesson from STYLE_RELIEF: assert the stone as hard and the cutting as crisp,
# and ask for the medium's defects positively. The difference is scale - an aisle icon has
# to read at 40px so it gets bold chunky forms, whereas a full panel can carry the dense
# ornamental detail Assyrian relief is actually known for.
STYLE_MESOPOTAMIAN = (
    "A carved gypsum wall panel from a Neo-Assyrian palace at Nimrud or Nineveh, "
    "photographed flat under raking museum light. This is CARVED STONE, not a drawing and "
    "not a painting: pale honey-grey alabaster, three thousand years old, with a faintly "
    "translucent waxy depth to the stone, fine granular weathering across the flat ground, "
    "chips and losses along the edges, hairline fractures, and dark mineral staining "
    "settled into the deepest hollows. THERE IS NO PAINT AND NO PIGMENT ANYWHERE - the "
    "entire picture is ONE stone colour. "
    "The carving is SHALLOW and CRISP: figures stand only a centimetre or two proud of a "
    "flat ground, their edges cut square and sharp, undercuts reading as narrow bands of "
    "true shadow, interior detail incised as fine grooved line. A low raking light from "
    "the upper left grazes every raised surface and darkens every hollow, and that "
    "light-and-shadow IS the picture. "
    "Assyrian figure convention throughout, rendered with obsessive ornamental precision: "
    "the body powerfully muscled with the calves and forearms modelled, the head in strict "
    "profile, hair and beard carved as dense stacked rows of tight snail-shell curls, "
    "garments deeply fringed and covered in fine incised rosette and guilloche pattern. "
    "Figures stand on a flat groundline with no landscape behind them."
)

# The Hittite register. Related to STYLE_MESOPOTAMIAN and deliberately NOT the same: an
# Assyrian gypsum panel is pale, fine-grained and virtuosic, while a Hittite orthostat is
# hard dark basalt worked by a blunter hand. Stockier figures, shallower cutting, less
# ornament, more weathering. Putting them side by side should read as two different
# workshops in two different stones, not one style with the labels swapped.
STYLE_HITTITE = (
    "A carved basalt orthostat block from a Late Bronze Age Hittite city gate at Hattusa or "
    "Alaca Hoyuk, photographed under raking light. This is HARD DARK VOLCANIC STONE, not "
    "alabaster: cool grey-brown basalt, dense and coarse-grained, its surface pocked with "
    "small vesicles, worn smooth in the high places by three thousand years of weather and "
    "rough in the sheltered hollows, chipped along every edge, with pale mineral crusting in "
    "the deepest cuts. THERE IS NO PAINT AND NO PIGMENT ANYWHERE - the entire picture is ONE "
    "stone colour. "
    "The carving is BLUNT, SHALLOW and POWERFUL, cut by a confident but unrefined hand: "
    "figures barely a centimetre proud of the ground, their outlines broad and simplified, "
    "interior detail reduced to a few deep grooves. There is no fine ornament and no "
    "virtuoso surface. A low raking light picks out every raised edge and pools in every "
    "hollow, and that light-and-shadow IS the picture. "
    "Hittite figure convention: heads in strict profile with a large eye, prominent nose and "
    "a heavy jaw; bodies short, thickset and broad-shouldered, with none of the elongation "
    "of Egyptian art; plain belted tunics falling to the knee; and boots with sharply "
    "upturned pointed toes. Figures stand on a plain groundline with nothing behind them."
)

# The carved register's ground contract - the exact counterpart of PLASTER_GROUND, for the
# same reason. Never name a background colour to a model that is about to paint one. Shared
# by the Assyrian and Hittite registers; it deliberately says "stone" and not "gypsum" so
# both can use it without contradicting their own material.
GYPSUM_GROUND = (
    "THE BACKGROUND IS THE CARVED STONE ITSELF. The photograph is cropped INSIDE the slab, "
    "so the flat chiselled ground of the panel fills the entire frame edge to edge and "
    "corner to corner and runs off all four sides of the picture. No edge of the slab is "
    "visible anywhere in shot. "
    "Behind and around the figures there is ONLY this flat carved ground: no coloured "
    "field, no backdrop, no sky, no landscape, no border, no mat, no margin and no "
    "vignette. Nothing rests in front of the panel, so nothing casts a shadow onto it "
    "except the shallow relief carving itself."
)

# The keying contract. process_images.py::cut_out() detects the background from the four
# corner medians and takes a second HUE vote at 30 degrees tolerance / 0.30 saturation
# floor, so the field has to be flat AND far from every colour in the art. Magenta is the
# right key here for exactly the reason the shipped sheets used it: none of this artwork is
# anywhere near it - it is ochre, terracotta, teal, bone and black.
KEY_FIELD = (
    "The subject sits alone on a COMPLETELY FLAT SOLID BRIGHT MAGENTA #FF00FF background - "
    "one perfectly even magenta filling the entire frame edge to edge behind and around the "
    "subject. NO scenery, NO table, NO ground plane, NO horizon, NO vignette, NO gradient, "
    "NO texture and NO shadow of any kind on the magenta. The magenta must be a clean single "
    "colour so it can be chroma-keyed away."
)

# WHY THIS CLAUSE EXISTS. Undici's ART_STYLE.md records the same failure four times: the
# model drags a small warm accent toward whatever large field sits behind it, and against a
# magenta field a red subject comes back magenta - after which the key deletes the subject
# itself and the damage shows up as holes with nothing pointing at the cause. Naming the
# enemy is the cheap first move. If it fails ONCE, do not repeat it: repaint the element in
# a hue far from the field instead (deep red beet -> beetroot purple-brown; wine -> amber),
# and if the element is thin, make it broad, because thin details contaminate first.
NO_MAGENTA = (
    "CRITICAL: {what} must be a true warm {colour} - the colour of {ref}. It must NEVER be "
    "pink, magenta, rose, fuchsia or violet, and must never pick up any tint from the "
    "background. Keep it clearly separated in hue from the magenta field."
)

NEGATIVE = (
    "NO text, NO letters, NO hieroglyphs, NO cuneiform, NO numerals, NO captions, NO labels, "
    "NO signature, NO watermark, NO border, NO frame, NO decorative cartouche. "
    "NOTHING modern or post-Bronze-Age anywhere in the frame: no tomatoes, no peppers, no "
    "potatoes, no maize, no chillies, no citrus, no sugar, no chocolate, no coffee, no rice, "
    "no glass jars, no metal cans, no printed packaging, no cutlery, no stainless steel, no "
    "plastic, no gas hob, no matches, no paper. Only earthenware, basketry, wood, cloth, "
    "bronze and stone."
)


def painted_fragment(subject, *, warm_red=None):
    """One painted object on full-bleed plaster. -> opaque square plate, no keying.

    Named `fragment` and not `cutout` on purpose: this register is NOT chroma-keyed. A
    painted plaster fragment is already a self-contained rectangular asset, and the two
    magenta failures both came from pretending otherwise. process_images.py ships these
    through the PLATE path at ratio 1.0.
    """
    parts = [
        STYLE_PAINTED,
        f"SUBJECT: {subject}",
        "The fragment shows this one subject and nothing else, occupying most of the "
        "painted surface. No other objects, no figures, no scene around it.",
        PLASTER_GROUND,
    ]
    if warm_red:
        parts.append(WARM_TRUE.format(**warm_red))
    parts.append(NEGATIVE)
    return "\n\n".join(parts)


def relief_icon(subject):
    """One carved object, alone, on the key field. -> small transparent PNG."""
    return "\n\n".join([
        STYLE_RELIEF,
        f"SUBJECT: {subject}",
        "A single carved emblem, centred, filling about 85 percent of the frame, seen "
        "straight on. One subject only - not a scene, not a group, not a montage.",
        NO_PLINTH,
        KEY_FIELD,
        NEGATIVE,
    ])


def painted_plate(subject):
    """A full painted scene that carries its own ground. -> opaque WebP plate.

    No key field: process_images.py treats these as PLATES, trims the mat and crops to
    16:10, so the picture must fill the frame with no border of its own.
    """
    return "\n\n".join([
        STYLE_PAINTED,
        f"SCENE: {subject}",
        PLASTER_GROUND,
        "A horizontal wall-painting panel. The painting fills the entire frame edge to "
        "edge with NO mat, NO margin, NO paper border and NO frame around it. Figures at "
        "roughly two-thirds the panel height, arranged frieze-like across the picture "
        "with no overlap that hides what they are holding.",
        NEGATIVE,
    ])


# The invented register. Modern food drawing, not an artefact.
#
# Deliberately a DRAWING and deliberately CONTEMPORARY: the invented dishes are modern
# meals, and dressing them as excavated plaster would make the site's clearest honesty
# signal into its most confusing one. Same paper, same palette, different hand.
STYLE_MODERN = (
    "A contemporary cookbook illustration, brush and ink with a loose watercolour wash, on "
    "warm cream paper. This is a DRAWING made today, not an ancient object: the paper is "
    "clean and evenly toned, and there is NO craquelure, NO flaking, NO cracking, NO "
    "weathering and NO texture of age anywhere. "
    "The line is a live, confident brush-and-ink contour that varies in weight, breaks where "
    "the hand lifted, and does not close every shape. Inside it, transparent watercolour "
    "washes sit slightly loose of the line and pool at their edges the way real washes do, "
    "with the paper left bare for every highlight. "
    "One subject, seen from a natural three-quarter angle at table height, in a plain "
    "earthenware bowl or on a plain board, with a soft shadow grounding it. "
    "Palette: warm cream paper, ochre, terracotta, olive green, muted teal, walnut brown "
    "and a soft charcoal line. Appetising, generous, unfussy. "
    "NO text, NO lettering, NO labels, NO borders, NO frame. Nothing modern in the "
    "TABLEWARE - plain undecorated earthenware, wood and cloth only, no cutlery, no glass, "
    "no printed packaging."
)


def modern_dish(subject):
    """One invented dish, drawn rather than excavated. -> opaque square plate."""
    return "\n\n".join([
        STYLE_MODERN,
        f"SUBJECT: {subject}",
        "The drawing fills the frame, edge to edge, with no margin and no border. Just the "
        "food and the surface it sits on.",
    ])



# The map register. NOT painted plaster, and not a map in the modern sense at all.
#
# WHY CLAY. Two painted attempts and one drawn SVG all failed the same test in different
# ways: they were maps ABOUT this world rather than maps FROM it. The brief now is diegetic
# — an object Yadinu could own — and the real precedent is unambiguous. The Babylonian Map
# of the World is a clay tablet with the coasts scored into it by a stylus. That is what a
# map IS in this world: not a document, a thing.
#
# It also solves the accuracy problem by dissolving it. A scored clay coastline is expected
# to be schematic, so simplification reads as the medium doing its job rather than as the
# draughtsman failing. Errors are fine here in a way they were never fine on a painted map.
#
# STILL NO WRITING. Not even cuneiform: this site ships real cuneiform, real Linear B and
# real Ugaritic with sign-by-sign verification, and decorating a map with plausible-looking
# nonsense in a script we take that seriously elsewhere would be the one dishonest asset in
# the collection. The names go on top as HTML, as they always have.
STYLE_CLAY = (
    "A small rectangular tablet of fired clay, photographed flat from directly overhead "
    "under hard RAKING light from the upper left, so that every incised line throws a "
    "visible shadow along one edge and catches the light along the other. This is the "
    "single most important quality of the image: the marks are CUT INTO the surface, not "
    "drawn on it, and the relief must be obvious. "
    "The clay is unglazed and warm buff-tan, slightly uneven in colour, with darker "
    "scorching toward one edge from the firing, fine grit in the body, a chipped corner, "
    "and worn rounded edges. Faint traces of the potter's fingers survive along the sides. "
    "Every mark is made with a reed stylus in soft clay: grooves that are wider and deeper "
    "where the tool went in and taper as it lifted, occasionally overshooting a junction. "
    "Palette strictly monochrome: the tan of the clay, the darker tan inside the grooves, "
    "and the shadow. No pigment, no paint, no colour of any kind, no ink, no gilding."
)


def clay_map(subject):
    """A map incised into a clay tablet. NO WRITING — labels go over the top as HTML."""
    return "\n\n".join([
        STYLE_CLAY,
        f"WHAT IS INCISED: {subject}",
        "THE TABLET CARRIES NO WRITING WHATSOEVER. No letters, no cuneiform, no signs, no "
        "place names, no labels, no legend, no numbers, no scale, no compass and no "
        "inscription of any kind, in any script. Coast, water, hill and settlement are "
        "shown by incised MARK alone — line, hatching, triangle, dot. Nothing that could be "
        "mistaken for a character.",
        "The tablet fills the frame edge to edge with no background, no table, no hand, no "
        "stand and no border around it.",
        NEGATIVE,
    ])

# =========================================================================
# THE ANACHRONISM PANELS
# =========================================================================
#
# Deliberately funny, and deliberately the ONE place on the site where the period rule is
# broken - so it is worth being precise about which half of it breaks.
#
# The FIXTURES are modern: trolleys, wire shelving, chill cabinets, checkout counters.
# The FOOD is not. Every item in every basket has to be something the Market would sell
# you, because the joke only works if the shopping is right - a fresco family loading up
# on tomatoes and maize would quietly contradict the whole rest of the site.
#
# NEGATIVE cannot be used here: it forbids exactly the modern furniture these panels are
# about. NEGATIVE_MODERN keeps the two clauses that still matter (no lettering, no
# New World produce) and drops the rest.
NEGATIVE_MODERN = (
    "NO text, NO letters, NO hieroglyphs, NO cuneiform, NO numerals, NO captions, NO "
    "labels, NO signage, NO price tags, NO printed packaging, NO brand marks, NO "
    "signature, NO watermark, NO border and NO frame. Every surface is blank. "
    "The FOOD must stay strictly Bronze Age eastern Mediterranean: barley, emmer wheat, "
    "lentils, chickpeas, broad beans, onions, leeks, garlic, cucumbers, leafy greens, "
    "figs, dates, grapes, pomegranates, apples, olives, olive oil, sesame, almonds, "
    "walnuts, honey, sheep and goat cheese, yoghurt, lamb, goat, fish, eggs, wine, beer. "
    "ABSOLUTELY NO New World or post-Bronze-Age food anywhere in the picture: no tomatoes, "
    "no peppers, no potatoes, no maize, no chillies, no citrus, no bananas, no pineapple, "
    "no avocado, no coffee, no chocolate, no sugar, no rice, no pasta, no bread loaves in "
    "plastic, no tins, no bottles, no cartons, no jars."
)

# The recurring cast. Repeated verbatim in every panel so the same people are recognisable
# across the whole set rather than a dozen unrelated strangers. The solo panels use the
# mother and the father from the family group, described identically, so a viewer reads the
# set as one household going about its week.
FAMILY = (
    "THE SAME FAMILY APPEARS IN EVERY PANEL, drawn identically each time: a bearded father "
    "with red-brown skin and shoulder-length black hair, a mother with pale cream skin and "
    "long black hair bound with a fillet, a boy of about ten with a shaved head and one "
    "long sidelock, and a small girl of about six with short black curls. All four are "
    "barefoot and in Bronze Age dress."
)

WOMAN = (
    "ONE WOMAN ALONE - the mother of the family that appears across this set, drawn "
    "identically to her other appearances: pale cream skin, long black hair falling in "
    "heavy curls and bound with a fillet, a flounced tiered skirt and fitted bodice, "
    "barefoot. She is the only person in the picture."
)

MAN = (
    "ONE MAN ALONE - the father of the family that appears across this set, drawn "
    "identically to his other appearances: red-brown skin, a full black beard, "
    "shoulder-length black hair, a belted kilt, barefoot. He is the only person in the "
    "picture."
)

CAST = {"family": FAMILY, "woman": WOMAN, "man": MAN}


def anachronism(scene, *, register="egyptian", cast="family"):
    """A modern errand recorded as an ancient wall. -> 16:10 plate.

    `register` picks the temperament, and the three are genuinely different mediums rather
    than three coats of paint on one idea:
      egyptian     - painted plaster, stiff, measured, frieze-like
      minoan       - buon fresco, fluid, figures in movement, blue and red used freely
      mesopotamian - CARVED gypsum, no paint at all, the reading comes from the cutting

    `cast` picks who is in it, from CAST. Solo panels reuse the family's mother or father
    verbatim so the whole set reads as one household rather than a dozen strangers.
    """
    style, ground, panel = {
        "minoan": (
            STYLE_MINOAN, PLASTER_GROUND,
            "A horizontal wall-painting panel, filling the entire frame edge to edge, "
            "figures at roughly two-thirds the panel height.",
        ),
        "mesopotamian": (
            STYLE_MESOPOTAMIAN, GYPSUM_GROUND,
            "A horizontal carved panel, filling the entire frame edge to edge, figures at "
            "roughly two-thirds the panel height.",
        ),
        "hittite": (
            STYLE_HITTITE, GYPSUM_GROUND,
            "A horizontal carved orthostat block, filling the entire frame edge to edge, "
            "figures at roughly two-thirds the block height.",
        ),
    }.get(register, (
        STYLE_PAINTED, PLASTER_GROUND,
        "A horizontal wall-painting panel, filling the entire frame edge to edge, figures "
        "at roughly two-thirds the panel height.",
    ))
    return "\n\n".join([
        style,
        f"SCENE: {scene}",
        CAST[cast],
        "The comedy is in the CONTRAST, and it only works if the picture plays it "
        "completely straight: the ancient craftsmen are recording an ordinary modern "
        "errand with exactly the solemn ceremonial dignity they would give a harvest "
        "procession, a royal hunt or an offering scene. Nobody in the picture finds it "
        "odd. Do not caricature, do not exaggerate, do not make it cartoonish.",
        ground,
        panel + " Arranged frieze-like across the picture so that every face and every "
        "object being handled stays clearly visible and nothing important is overlapped.",
        NEGATIVE_MODERN,
    ])


# =========================================================================
# THE SUBJECTS
# =========================================================================
#
# tier      which priority batch (--tier)
# slug      MUST match the slug in the data file named in `source`
# out       the output slug process_images.py will ship it under
# kind      cutout | plate     (how process_images.py handles the raw)
# height    final tall dimension for a cutout, in px
# art       the art direction that goes into the prompt

STAPLES = [
    ("pearl-barley", "a low earthenware bowl heaped with whole pearl barley grains, a few "
     "loose grains and one bearded barley ear lying beside it, all in wheat gold and pale straw",
     None),
    ("brown-lentils", "a shallow earthenware dish mounded with small round brown-green "
     "lentils, a scatter of loose lentils in front of it, olive-brown and umber", None),
    ("wholemeal-flour", "a wide shallow bowl of coarse wholemeal flour with a hand-scooped "
     "hollow in the middle, a dusting of flour on the surface below it, warm bone and pale "
     "ochre", None),
    ("olive-oil", "a small round-bellied unglazed jug with two loop handles, tipped slightly, "
     "a thin steady ribbon of green-gold oil pouring from its lip into a tiny shallow saucer",
     None),
    ("onions-and-garlic", "three whole brown onions, one fat leek laid across them, and a "
     "single head of garlic with two loose cloves, grouped together as one still study",
     None),
    ("cumin-and-coriander-seed", "two small stacked saucers of whole seed side by side - "
     "slender ridged cumin seed in one, round pale coriander seed in the other - with a few "
     "seeds spilled between them", None),
    ("sheep-or-goat-yoghurt", "a wide unglazed bowl of thick white soured milk with a spoon "
     "hollow drawn through its surface and a thread of green-gold oil pooled in the hollow",
     None),
    ("brined-sheep-cheese", "a thick rectangular block of white brined sheep cheese with one "
     "crumbled corner, sitting in a shallow dish of pale brine", None),
    ("lamb-shoulder", "a whole raw lamb shoulder joint on the bone laid on a flat stone slab, "
     "the meat rendered as a flat field of muted brick-brown with cream fat and a pale bone end",
     dict(what="the meat", colour="brick-brown", ref="dry terracotta and dark ochre")),
    ("dates", "a small woven palm basket of whole dried dates, three loose dates in front of "
     "it and one split open to show the pale flesh and long stone, all deep amber and "
     "chestnut brown", None),
    ("honey", "a squat lidless earthenware pot of honey with a thick amber thread lifting "
     "from a stick laid across its mouth, a shallow pool of honey in a saucer beside it", None),
    ("salt", "a coarse pyramid of chunky white sea-salt crystals heaped in a shallow stone "
     "dish, a few large crystals scattered on the stone beside it", None),
]

# The four base recipes from fundamentals.js::basics, then the eighteen routed dishes from
# recipes.js filtered to mesopotamia / egypt / aegean / hatti / levant.
#
# NOTE: `hot-pan-flatbread` is BOTH a base recipe and a routed Levantine dish, under the
# same slug in both files. One image, listed once. That is why the dish count is 21 and not
# 22 - see --audit, which reports the overlap rather than hiding it.
DISHES = [
    # -- base recipes (fundamentals.js :: basics) --
    ("lentil-and-barley-pottage", "a deep unglazed bowl of thick beige barley-and-lentil "
     "pottage, a thread of green-gold oil poured across the top, white crumbled cheese and "
     "chopped green herb scattered over it"),
    ("hot-pan-flatbread", "a stack of four thin round wholemeal flatbreads, the top one "
     "blistered and speckled dark from a hot pan and folded back at one edge, on a flat "
     "stone"),
    ("allium-and-seed-base", "a wide shallow pan of softened golden onion, leek and garlic "
     "collapsed in oil, with whole cumin and coriander seed visible through it and two bay "
     "leaves on top"),
    ("strained-yoghurt", "a cloth-lined sieve set over a bowl with thick strained white "
     "yoghurt heaped in the cloth, and beside it a jar of the finished yoghurt sealed under "
     "a finger of green-gold oil"),

    # -- mesopotamia --
    ("lamb-and-beet-stew-tuhu", "a deep two-handled cooking bowl of dark lamb and beet stew, "
     "chunks of meat and beetroot showing above the surface, fresh green coriander leaf and "
     "sliced raw onion over the top"),
    ("unwinding-broth-pasrutum", "a thick pale-gold barley pottage in a wide shallow bowl, "
     "no meat of any kind, soft white leek and green herb worked through it, and a scattering "
     "of pale dry breadcrumb across the surface"),
    ("elamite-broth-me-elamutim", "a deep bowl of thick dark broth, no meat of any kind, the "
     "surface almost solid green with chopped dill, a pale swirl of soured milk stirred "
     "through the dark liquid beneath it"),
    ("kanasu-broth-me-kanasi", "a deep earthenware bowl of pale broad beans and barley in "
     "broth with pieces of lamb among them, torn green mint leaves scattered over the top"),
    ("francolin-broth-me-tarri", "a shallow earthenware dish holding the jointed pieces of a "
     "small game bird in a pale creamy broth, a torn barley loaf beside the dish"),
    ("beet-greens-silqu", "a wide bowl of deep red beetroot and dark green leaf stems, a "
     "spoonful of thick white yoghurt sitting on top, unstirred"),
    ("desert-truffles-mari", "five round sand-coloured desert truffles, one halved to show a "
     "pale marbled interior, in a shallow dish with a knob of butter melting among them"),
    ("roast-barley-pilaf-ybc25", "a mound of dark toasted barley grains in a shallow bowl, "
     "dressed with sliced shallot and scattered with peppery green rocket leaves"),
    ("kid-stew-with-soured-milk", "a deep earthenware pot of dark rich stew with pieces of "
     "goat on the bone showing at the surface, a white swirl of soured milk poured across it"),
    ("roast-goose-with-figs", "a whole plump roasted goose on a shallow oval dish, deep "
     "burnished brown, with halved dark figs tumbling from the cavity and piled beside it"),
    ("shelled-beans-deir-el-medina", "a wide shallow bowl of pale green-brown broad beans, "
     "some crushed and some whole, a bright pool of green oil in the middle and a scatter of "
     "chopped green herb"),
    ("happena-meat-in-oil-and-honey", "a lidded round earthenware casserole with the lid set "
     "aside, holding a dark glazed piece of lamb on the bone glistening in amber oil"),
    # Described from the pot as the Ḫattuša report cooks it: the alliums are the subject,
    # the meat is what they are cooked with. Green is the one cool note this palette allows,
    # and here it is doing the most work of any dish on the site.
    ("neck-of-mutton-with-leeks-hattusa", "a deep two-handled cooking pot of thick mutton "
     "stew, one bone standing proud of the surface, the broth heavy with pale barley, with "
     "fat green lengths of leek laid across the top and white crumbled sheep cheese "
     "scattered over them"),
    # Described from the four new reports. Each keeps to the register's one-cool-note rule:
    # green herb where a dish has it, and everything else warm earth.
    # The only dish on the site cooked on metal. The pan itself is the subject as much as
    # the food, so it is drawn as a vessel rather than a plate.
    ("seared-cheese-on-the-copper-pan", "a wide shallow copper pan seen from above holding "
     "thick slabs of pale cheese with dark scorched faces, laid over a bed of collapsed dark "
     "green bitter leaves, with black olives and pale onion rings scattered among them"),
    ("brazier-chickpeas-alashiya", "a round flatbread on a plain board, spread with white "
     "curd and heaped with whole and crushed chickpeas, black olives and torn green herbs "
     "scattered over it, olive oil pooling at the edge"),
    ("emmer-porridge-with-curds-delta", "a plain deep bowl of pale creamy cracked-wheat "
     "porridge, a soft white heap of fresh curd set on top of it, sliced green onion and "
     "torn dark dates scattered over, a thread of oil across the surface"),
    ("roast-duck-for-the-gods-table", "a whole roasted duck, its skin dark and glazed and "
     "glassy, lying on a shallow offering dish with whole dates and green onions laid "
     "around it in a deliberate ring"),
    ("caravan-pot-with-dried-curd", "a plain round-bellied cooking pot of thick pale "
     "cracked-wheat porridge streaked with white soured curd, sliced onion and torn dried "
     "apricots through it, a scatter of cumin seed on top"),
    ("kariya-grilled-liver-and-heart", "two bronze skewers laid across a shallow dish, "
     "threaded with dark red-brown cubes of liver and heart alternating with pale onion "
     "petals, torn green mint scattered over"),
    ("beruwa-chickpea-and-cucumber", "a shallow wide bowl of coarsely crushed pale gold "
     "chickpea mash, the surface strewn with small bright green cucumber dice and torn mint"),
    ("skewers-on-the-firedog", "two ceramic firedogs with notched tops supporting three "
     "bronze skewers of charred cubed meat over a bed of glowing coals, seen from the side"),
    ("kykeon-barley-and-cheese", "a two-handled Mycenaean cup of cloudy dark red liquid, a "
     "dusting of pale barley meal floating on the surface, a bronze grater and a wedge of "
     "white cheese beside it"),
    ("marzeah-roast-mutton", "a large browned mutton shoulder on the bone in a shallow "
     "footed dish, scattered with scarlet pomegranate seeds and green olives, a two-handled "
     "wine cup beside it"),
    ("pigeon-in-broth-amursanu", "a lidded earthenware pot with a browned bread crust baked "
     "over the top, broken open at one side to show a whole small bird and broth beneath it"),
    ("date-and-sesame-confection-mersu", "six small dark date-and-sesame balls piled on a "
     "flat stone dish, rolled in pale sesame seed, one broken open to show the sticky dark "
     "date paste inside"),

    # -- egypt --
    ("emmer-loaves-in-conical-moulds", "three tall conical bread loaves, still in their "
     "narrow unglazed clay moulds, one lifted out and standing beside them showing its dense "
     "browned crust"),
    ("tiger-nut-and-honey-cones", "four small pale cones of pounded tiger nut bound with "
     "honey, standing on a shallow reed tray, one drizzled with an amber honey thread"),
    ("split-and-salted-nile-fish", "a whole fish split flat along the back and laid open on "
     "a reed mat, heavily crusted with coarse white salt, its skin silver-grey against the "
     "pale flesh"),
    ("emmer-beer-heneqet", "a tall narrow-necked beer jar with a cloudy pale-gold pour going "
     "into a shallow drinking bowl beside it, a straining cloth draped over the jar's mouth"),

    # -- hatti --
    ("thick-loaf-for-the-hearth-harsi", "one thick round hearth loaf with a deeply cracked "
     "dark crust and ash still dusting its base, torn open at one side to show the dense "
     "crumb"),
    ("sheep-on-the-huprushi", "chunks of lamb threaded on two long bronze skewers resting "
     "across a squat clay brazier, the meat browned at the edges, glowing embers beneath",
     ),

    # -- levant --
    ("kabri-palace-wine", "a tall two-handled painted amphora tilted into a wide shallow "
     "drinking bowl of dark amber-red wine, with a sprig of resinous juniper and a broken "
     "cinnamon quill beside it"),
    ("lentils-with-oil-and-cumin-ugarit", "a wide flat dish of plain cooked brown lentils, "
     "olive oil pooled across the surface, whole toasted cumin seed and thin raw onion "
     "scattered over"),
    ("honeyed-pork-chops-with-dates", "two thick glazed chops on a flat stone platter, dark "
     "amber honey glaze on the meat, whole dates and cracked coriander seed around them"),

    # -- aegean --
    ("kid-in-the-tripod-cauldron", "a bronze three-legged tripod cauldron of stewed kid with "
     "whole fennel and coriander in the broth, one leg bone standing proud of the surface"),
    ("barley-and-fig-feast-porridge", "a wide painted bowl of pale barley porridge with "
     "halved purple-brown figs pressed into the surface and a thread of honey across it"),
    ("leek-lentil-and-barley-pottage", "a thick spoonable pottage of leek, lentil and barley "
     "in a two-handled painted bowl, sliced green leek rings visible on top, oil poured over"),
    # Described from the photographs of the real dish in the Amnisos report, then translated
    # into this register's terms: the palette allows exactly one cool note, so the fennel
    # takes it and the fish are carried in bone white against a soot-black contour.
    ("fish-baked-on-fennel-amnisos", "a wide shallow terracotta dish holding three whole fish "
     "laid side by side head to tail, their bodies bone white with a soot-black contour and "
     "marked gills and fins, resting on a bed of thick-sliced pale fennel with feathery "
     "malachite-green fennel fronds scattered over them, a few whole black olives among the "
     "fish, olive oil pooled and shining across the surface"),
]

AISLES = [
    ("produce", "a single fat leek laid diagonally, crossed by a whole head of garlic and "
     "two round onions, carved as one compact group"),
    ("drygoods", "a wide open-mouthed storage jar with a bearded barley ear leaning out of "
     "it and a small heap of grain spilling at its foot"),
    ("meat", "a sheep's head in strict profile above two crossed bronze skewers"),
    ("dairy", "a standing goat in strict profile beside a tall narrow churning jar with a "
     "cloth tied over its mouth"),
    ("fats", "an olive branch with four fat olives arching over a small two-handled oil jug, "
     "a bee-skep beehive at its base"),
    ("seasoning", "a stone mortar with a pestle standing in it, a bundle of tied herbs "
     "leaning against one side and a scatter of seed at its foot"),
    ("drinks", "a tall two-handled wine amphora and a squat beer jar with a drinking straw "
     "leaning out of it, standing side by side"),
]

# The replacement Canaanite panel. The two newest source sheets were captioned Trojan /
# Ilion, which is not one of the five accents, and process_images.py::EXCLUDED already
# records them as rejected on exactly that ground. This regenerates the missing fifth
# panel so the set is five-for-five again.
#
# It must match the four shipped plates, so the direction below is written against them:
# two figures at a coastal storeroom, frieze arrangement, warm subject, and - like the
# Babylonian plate's lapis brick - ONE cool ground note, here the sea beyond the doorway.
PANELS = [
    ("canaanite", "A Canaanite coastal storeroom at Ugarit. A bearded man in a fringed "
     "ankle-length robe carries a large woven basket of figs and grapes on his shoulder; "
     "facing him, a woman in a flounced skirt reaches to a shelf of small round-bellied "
     "pots and covered bowls. Between them stands a tall pointed-base Canaanite storage "
     "amphora with two handles at the shoulder. Ranks of amphorae and stacked baskets fill "
     "the wall behind them. Through a doorway at one side, a narrow band of muted slate-blue "
     "sea - the only cool colour in the picture; everything else is ochre, terracotta and "
     "bone."),
]


# The six anachronism panels. Registers alternate egyptian / minoan down the list.
#
# Each scene names the produce explicitly rather than saying "vegetables", because the
# model will happily reach for a tomato the moment it is left to improvise a grocery aisle,
# and one tomato undoes the site's only hard rule.
MODERNS = [
    ("family-at-the-produce-aisle", "minoan", "family",
     "The family stands before a modern supermarket produce display - tiered green wire "
     "shelving under a bank of ceiling lights, with a fine mist of water drifting over the "
     "greens. The mother reaches for a bunch of leeks; the father holds up a single "
     "pomegranate and examines it at eye level with great seriousness. The boy has both "
     "arms round a cucumber almost too big for him. The small girl is on tiptoe reaching "
     "into a crate of figs. The shelves hold onions, garlic, leeks, cucumbers, chard, "
     "broad beans, figs, dates, grapes, pomegranates and apples, each in its own bin."),

    ("pushing-the-trolley", "egyptian", "family",
     "A solemn procession across the panel, arranged exactly like a tomb offering scene: "
     "the father leads, pushing a modern wire shopping trolley with both hands, walking in "
     "strict profile with one foot advanced. The trolley is heaped with a sack of barley, "
     "a bundle of leeks, a netted bag of onions and two round sheep cheeses. The mother "
     "follows carrying a woven basket of figs on one shoulder. The boy walks behind holding "
     "a single enormous onion in both hands as if presenting an offering. The small girl "
     "rides seated in the child seat at the front of the trolley, facing backwards, holding "
     "a fig. Behind them, ranks of supermarket shelving recede flatly across the wall."),

    ("weighing-the-produce", "minoan", "family",
     "At a supermarket weighing station. The mother sets a heap of broad beans onto the "
     "flat pan of a modern digital scale mounted on a counter; the father leans in with one "
     "hand raised, watching the blank display with the intense concentration of a temple "
     "official. The boy holds the plastic produce bag open. The small girl has climbed onto "
     "the counter edge to see. Beside the scale sit piles of lentils, chickpeas, almonds "
     "and walnuts. The display face is completely blank - no numbers of any kind."),

    ("the-chill-cabinet", "egyptian", "family",
     "The family before a tall open refrigerated dairy cabinet, its shelves lit from within "
     "with a cool pale glow - the only cool colour in the picture. The mother lifts out a "
     "wide bowl of strained yoghurt. The father holds a large round brined sheep cheese in "
     "both hands at chest height, in strict profile. The boy reaches for a smaller cheese "
     "on a low shelf; the small girl stands with both palms flat against the cold glass "
     "door beside them, entranced. Cold air spills visibly from the cabinet as a pale wash "
     "across their feet."),

    ("at-the-checkout", "egyptian", "family",
     "The supermarket checkout, staged as a granary account. A seated cashier in a scribe's "
     "pose works a modern till with one hand while the other hand holds a stylus poised "
     "over a small clay tablet on the counter beside it. The family's shopping travels "
     "along a black conveyor belt in strict profile: a sack of barley, a bundle of leeks, "
     "onions, a round cheese, a jar of oil, a basket of figs and a whole fish. The father "
     "stands at the belt; the mother lifts the small girl up to see over the counter; the "
     "boy is at the very end of the belt, gravely stacking the shopping into a woven "
     "basket. The till display is blank."),

    ("carrying-it-home", "minoan", "family",
     "Outside, walking home across a rocky undulating groundline with crocuses and lilies "
     "growing between the stones, and a band of deep Egyptian blue sea beyond. The family "
     "moves in a line with the springing energy of a Minoan procession. The father carries "
     "a plastic shopping bag in each hand, the handles stretched taut. The mother balances "
     "a woven basket of pomegranates and grapes on her head, one hand steadying it. The boy "
     "drags a bulging bag with both hands, leaning back against the weight. The small girl "
     "runs ahead holding a single leek aloft like a standard. A modern supermarket trolley "
     "stands abandoned behind them among the rocks."),

    # -- the four solo panels -------------------------------------------------------
    ("a-woman-shopping", "minoan", "woman",
     "One woman alone doing the week's shop, moving down a supermarket aisle with the "
     "springing energy of a Minoan procession. She steers a modern wire trolley one-handed "
     "and reaches across herself to lift a round sheep cheese from the shelf, her whole "
     "body turning into the movement. The trolley already holds a sack of barley, a "
     "bundle of leeks, a netted bag of onions, a jar of oil and a basket of figs. Tall "
     "supermarket shelving runs away behind her holding lentils, chickpeas, almonds, "
     "walnuts, sesame, dates and figs. Crocuses and lilies grow improbably from a rocky "
     "undulating groundline along the bottom of the aisle."),

    ("a-woman-in-the-pantry", "minoan", "woman",
     "One woman alone taking stock of a full home pantry, standing before floor-to-ceiling "
     "modern kitchen shelving with her weight on one hip. She holds a wide shallow bowl "
     "against her waist with one arm and reaches up with the other to tilt a storage jar "
     "toward herself and look inside it, her head tipped back. The shelves are crowded and "
     "orderly: ranked storage jars, stacked round cheeses, hanging bundles of dried herbs, "
     "strings of onions and garlic, sacks of barley and emmer with their tops rolled down, "
     "baskets of lentils and chickpeas, flat cakes of dried figs, honey in a covered pot, "
     "and amphorae of oil and wine standing along the floor. A modern chest freezer stands "
     "closed against one wall, its lid shut."),

    ("a-man-hunting", "egyptian", "man",
     "A supermarket hunt staged exactly as a New Kingdom fowling scene, with all the "
     "ceremony of a nobleman hunting in the marshes. One man alone strides down the aisle "
     "in strict profile, one foot far advanced, his front arm flung out and rigid and his "
     "back arm drawn up behind him, his whole body locked in the moment before the throw. "
     "In the raised hand, held aloft exactly as a throwstick would be, is a single large "
     "onion. He is stalking one jar of olive oil, which stands alone and gleaming on an "
     "otherwise empty shelf at the far end of the aisle. A modern shopping basket hangs "
     "forgotten from his other elbow. Papyrus and reeds grow thickly up from the base of "
     "the supermarket shelving on both sides, and startled ducks burst upward out of the "
     "shelves above him."),

    ("too-many-bags", "mesopotamian", "man",
     "One man alone carrying the entire shop in a single trip, refusing to make two. He "
     "strides forward in strict profile with the braced, straining dignity of a tribute "
     "bearer approaching a king. Modern plastic shopping bag handles are looped over both "
     "forearms all the way to the elbow, eight or ten bags in all, hanging heavy and "
     "stretched taut and swinging against his legs; a bundle of leeks and a bearded barley "
     "ear stick up out of the topmost bags, and a round cheese and several pomegranates "
     "strain visibly against the plastic. He grips one further bag in his teeth. Under one "
     "arm he has clamped a large amphora of oil. His shoulders are set and his back is "
     "straight and his expression is one of complete composure."),

    ("too-many-bags-hittite", "hittite", "man",
     "One man alone carrying the entire shop in a single trip, refusing to make two, carved "
     "into a city-gate block. He strides forward in strict profile, short and thickset and "
     "braced against the weight, boots with upturned pointed toes planted wide. Modern "
     "plastic shopping bag handles are looped over both forearms to the elbow, eight or ten "
     "bags in all, hanging heavy and stretched taut against his legs; a bundle of leeks and "
     "a bearded barley ear stick up out of the topmost bags and a round cheese strains "
     "against the plastic. He grips one further bag in his teeth. Under one arm he has "
     "clamped a large amphora of oil. His expression is one of complete composure."),

    ("the-weighing-of-the-heart", "egyptian", "man",
     "THE WEIGHING OF THE HEART, from the Book of the Dead, painted across a tomb chapel "
     "wall - and the deceased has arrived at judgement still carrying the entire week's "
     "shop. "
     "At the centre stands the tall upright balance of Maat. In its left pan lies a single "
     "ostrich feather. Its right pan is piled high and overflowing with modern plastic "
     "shopping bags, dozens of them, so grossly overloaded that the pan has crashed all the "
     "way down to the ground and the whole balance beam is tilted at a violent angle - "
     "leeks, pomegranates, figs, onions and a round cheese spilling out of the split bags "
     "across the floor. "
     "Jackal-headed Anubis crouches at the foot of the balance with one hand on the plumb "
     "bob, studying the ruined mechanism with grave professional concern. Ibis-headed Thoth "
     "stands beyond it holding a scribe's palette, pausing before he records the result. "
     "Ammit the devourer - crocodile head, lion forequarters, hippopotamus hindquarters - "
     "waits at the far right, watching the bags rather than the man. "
     "The deceased himself stands at the left in strict profile, dignified and entirely "
     "unbothered, still holding four more bags in each hand and an amphora of oil clamped "
     "under one arm, waiting politely for his turn. Nobody in the picture is smiling and "
     "nobody finds any of it strange."),
]



# The eighteen invented dishes. Drawn, not excavated - see STYLE_MODERN.
INVENTED = [
    ("inv-barley-porridge", "a deep bowl of thick pale barley porridge, torn dark dates "
     "collapsed into it, broken walnuts and a spoonful of white yoghurt on top, honey being "
     "drizzled over"),
    ("inv-emmer-pancakes", "a stack of five small thick brown emmer pancakes on a plain "
     "board, honey running down the side, torn purple figs beside them"),
    ("inv-eggs-on-flatbread", "two fried eggs with crisp frilled edges on a torn flatbread, "
     "crumbled white cheese and green herbs scattered over, olive oil pooling"),
    ("inv-lamb-flatbread-sandwich", "a folded flatbread wrap cut across to show sliced pink "
     "lamb, white yoghurt, thin red onion and green mint inside"),
    ("inv-caesar-salad", "a wide bowl of whole cos lettuce leaves standing upright, coated "
     "in pale dressing, with golden torn bread rusks and grated white cheese over them"),
    ("inv-chopped-salad", "a shallow bowl of chunky cucumber, thin red onion and green "
     "olives with a thick slab of white feta laid across the top, scattered with pomegranate "
     "seeds"),
    ("inv-lentil-salad", "a wide bowl of dark green lentils glossy with oil, scattered with "
     "chopped herbs, broken walnuts and crumbled white cheese"),
    ("inv-meat-and-roots", "a roasting tray with a browned lamb shoulder on the bone "
     "surrounded by wedges of purple beetroot, cream turnip and halved onions"),
    ("inv-barley-risotto", "a shallow bowl of creamy pale barley loosened flat, flecked with "
     "green leek and dill, grated white cheese melting on top"),
    ("inv-fish-supper", "a whole roasted fish on a bed of sliced fennel and onion in a "
     "shallow dish, scattered with dill and scarlet pomegranate seeds"),
    ("inv-honeyed-duck", "a lacquered dark-glazed roast duck on a board, scattered with "
     "walnuts, mint and bright pomegranate seeds, glaze pooling beneath it"),
    ("inv-curd-cheesecake", "a wedge cut from a pale baked cheesecake with a dark nutty "
     "crust, sesame on top, quartered purple figs beside it"),
    ("inv-parched-barley", "a wide shallow bowl heaped with toasted golden barley grains, "
     "some split and puffed, glossy with butter and flecked with sesame"),
    ("inv-salted-chickpeas", "a small bowl of golden roasted chickpeas dusted deep red with "
     "sumac, a few spilled onto the surface beside it"),
    ("inv-flatbread-crisps", "a board piled with golden blistered flatbread shards under "
     "melted white cheese, topped with red onion, pomegranate seeds and spoonfuls of yoghurt"),
    ("inv-honeyed-nut-clusters", "six rough amber clusters of whole nuts and chopped dates "
     "set hard in honey, piled on a plain board, one broken open"),
    ("inv-late-night-cheese-flatbread", "a folded flatbread toasted golden and pressed, cut "
     "in half to show melting white cheese inside, honey trickling over the top"),
    ("inv-late-night-lamb-and-yoghurt", "cold sliced lamb on a plain plate beside a bowl of "
     "white garlic yoghurt with olive oil poured over it, torn flatbread alongside"),
]


# The map behind the world post. One subject, its own tier, because it is neither a dish
# nor a scene and it is the only asset on the site that gets HTML laid over it.
MAPS = [
    ("eastern-mediterranean", "A sailor's chart of the sea and the lands around it, scored "
     "into the clay by someone who has made the journey rather than surveyed it. "
     "WEST IS AT THE TOP, because it is drawn from the home harbour facing out to sea. "
     "LAYOUT, top to bottom: the top third is OPEN WATER, filled edge to edge with long "
     "parallel wavy scored lines — the standard way water is shown, unmistakable at a "
     "glance. Two islands sit in that water: one long and narrow lying across the frame, "
     "one smaller and blunter nearer the middle. "
     "A single deep groove runs down the centre of the tablet: the coast. Land lies to "
     "either side of the water and is left as PLAIN SMOOTH CLAY, with no hatching at all, "
     "so that water and land are told apart instantly by texture alone. "
     "On the RIGHT, a broad landmass carrying rows of small incised triangles for the "
     "mountains of the high country. On the LEFT, a single long river running the length of "
     "the tablet and opening into a wide triangular fan at its mouth. At the BOTTOM, two "
     "long rivers running down and converging toward the lower edge. "
     "Settlements are small incised circles with a dot at the centre, a dozen at most, "
     "clustered along the coasts and the rivers where the harbours are. One of them, at the "
     "middle of the central coast, is cut deeper and ringed twice — the home port. "
     "Deliberately schematic and deliberately a little wrong: coasts simplified to a few "
     "long strokes, islands oversized because they matter, distances measured in sailing "
     "days rather than length. It is a working chart, not a survey."),
]

# =========================================================================
# assembled
# =========================================================================

def _staple(slug, art, warm):
    return dict(tier="staples", slug=slug, out=f"staple-{slug}", kind="plate", ratio=1.0,
                source="fundamentals.js::staples", art=art,
                prompt=painted_fragment(art, warm_red=warm))


def _dish(slug, art):
    return dict(tier="dishes", slug=slug, out=f"dish-{slug}", kind="plate", ratio=1.0,
                source="fundamentals.js::basics + recipes.js::recipes", art=art,
                prompt=painted_fragment(art))


def _aisle(key, art):
    return dict(tier="icons", slug=key, out=f"aisle-{key}", kind="cutout", height=160,
                source="market.js::AISLES", art=art, prompt=relief_icon(art))


def _panel(key, art):
    return dict(tier="panels", slug=key, out=f"accent-{key}", kind="plate", ratio=1.6,
                source="accents.js::accents", art=art, prompt=painted_plate(art))


def _map(slug, art):
    return dict(tier="maps", slug=slug, out=f"map-{slug}", kind="plate", ratio=1.5,
                source="places.js", art=art, prompt=clay_map(art))


def _invented(slug, art):
    return dict(tier="invented", slug=slug, out=f"dish-{slug}", kind="plate", ratio=1.0,
                source="invented.js", art=art, prompt=modern_dish(art))


def _modern(slug, register, cast, art):
    return dict(tier="moderns", slug=slug, out=f"modern-{slug}", kind="plate", ratio=1.6,
                source="decorative - no data file", art=art, register=register, cast=cast,
                prompt=anachronism(art, register=register, cast=cast))


SUBJECTS = (
    [_staple(s, a, w) for s, a, w in STAPLES]
    + [_dish(s, a) for s, a in DISHES]
    + [_panel(k, a) for k, a in PANELS]
    + [_aisle(k, a) for k, a in AISLES]
    + [_modern(s, r, c, a) for s, r, c, a in MODERNS]
    + [_invented(s, a) for s, a in INVENTED]
    + [_map(s, a) for s, a in MAPS]
)

TIERS = ["staples", "dishes", "panels", "icons", "moderns", "invented", "maps"]

assert len({s["slug"] for s in SUBJECTS}) == len(SUBJECTS), "duplicate slug in SUBJECTS"
