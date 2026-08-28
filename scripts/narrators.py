#!/usr/bin/env python3
"""
THE FOUR WRITERS, described the same way every time.

Supersedes scripts/yadinu.py, which described one man because there was one man. The prose
brief is docs/personas.md; this file is the image half, and the two must not drift apart.

WHAT THIS IS FOR. A narrator the reader cannot recognise is not a narrator. The failure mode
is never one bad picture — it is a set that quietly drifts. Hair a little longer, five years
older, and the woman on the Theban quay is plainly not the woman at the oven. So the FACE
and DRESS blocks below never change per frame. What changes is the PLACE, the LIGHT, and
what the person is DOING.

TWO PRIORITIES, and they are the same priority.

  PHOTOREALISM.  These are documentary photographs in the National Geographic register:
                 available light, real skin, real cloth, a person at work in their own
                 place. Not illustration, not painting, not a render, not a costume drama
                 still. Everything else on this site is drawn — the dish plates, the aisle
                 icons, the accent panels — and that contrast is deliberate. The drawings
                 are diagrams. The writers are people.

  ACCURACY.      Late Bronze Age, c. 1226 BC, and researched rather than assumed. Every
                 garment, tool, metal, fibre, animal and foodstuff below is either attested
                 for its region and century or marked INVENTED in the notes. The PERIOD
                 block carries the anachronisms that get past everybody, which is most of
                 what accuracy in this period actually consists of.

HOW TO GENERATE. This plugs into the existing OpenAI pipeline — subjects.py provides the
subjects, generate_images.py sends them.

    python scripts/generate_images.py --tier writers                    # plan, spend nothing
    python scripts/generate_images.py --show henut-face                 # one full prompt
    python scripts/generate_images.py --tier writers --execute --budget 5.00

CONSISTENCY IS NOT GUARANTEED BY TEXT ALONE. gpt-image-1 will hold a described face across a
set far better with absolutes than with adjectives, which is why every description below is
written in absolutes — "dark curly hair" fits a thousand people, "black gone grey at the
temples, in a single plait wound at the nape" fits one. It will still drift. The face frame
for each writer is generated FIRST and at high quality, and it is the reference a human
judges the rest of that writer's set against. Anything that does not match gets rerolled
with --force, which keeps the old raw in superseded/ for comparison.
"""

import json
from pathlib import Path

# =========================================================================================
# THE PHOTOGRAPHIC REGISTER — shared by all four
# =========================================================================================

# THE REGISTER AND THE FRAMING ARE TWO BLOCKS, and separating them was a bug fix rather
# than tidiness. They used to be one, which opened "an environmental portrait of a working
# person" and was prepended to EVERY frame. That instruction sits first and outranks
# everything after it, so all nine still lifes came back with a person inserted: the wide
# shot of the steppe was a woman holding a loaf, and the cut through the city mound was the
# same woman at a quern. The scene said "No people. Wide documentary landscape." and lost.
#
# So the shared half describes the CAMERA, and a second block describes what is in front of
# it. `writer_prompt` picks one, and they contradict each other on purpose.

PHOTOGRAPHY = (
    "A documentary photograph in the National Geographic tradition, shot on location in "
    "available light. PHOTOREALISTIC: a real photograph, never an illustration, painting, "
    "render or film still. Medium format, about f/2.8, the subject sharp and the background "
    "softly out of focus but legible as a real place. "
    "Available light only. No studio lighting, no rim light, no flare, no colour grade, no "
    "teal-and-orange. Colour natural and slightly muted. "
    "The PLACE and its OBJECTS are worn and real: dust, grease, chipped rims, hand-made "
    "edges. How clean and well dressed a PERSON is depends on who they are, and the "
    "description below settles that."
)

FRAMING_PERSON = (
    "An environmental portrait of the person described below, 50-85mm, filling a third to a "
    "half of the frame at three-quarter length. Never a small figure in a wide landscape. "
    "Where the scene names companions they share the frame, and the person below is still "
    "the subject. "
    "Real skin with visible pores and pigment variation, never plastic and never retouched. "
    "These are FIT, HEALTHY, GOOD-LOOKING PEOPLE by the standards of their own culture, in "
    "the prime of a working life: strong, upright, well made. Never gaunt, grimy, "
    "downtrodden or miserable. Hard work is not squalor. "
    "Aware of the camera, comfortable, not posing."
)

FRAMING_STILL = (
    "THERE IS NO PERSON IN THIS PHOTOGRAPH. No people, figures, faces, hands or arms, and "
    "nobody working or passing in the background, not even blurred, small or in silhouette. "
    "If the scene names a person, they have just left the frame. "
    "The subject is the place or the object itself, filling the frame the way a portrait "
    "subject would. Still life or landscape, 35-50mm."
)

# =========================================================================================
# THE PERIOD — what the researcher checks, and what everybody gets wrong
# =========================================================================================
#
# Most Bronze Age image error is not exotic. It is a first-millennium beard, an iron knife,
# a rotary quern or a camel, dropped in because the model has seen ten thousand pictures of
# "the ancient near east" and almost all of them are Assyrian reliefs from six hundred years
# later. So the constraints are stated as hard negatives, which is the only form a generator
# reliably obeys.

PERIOD = (
    "PERIOD: Late Bronze Age, about 1226 BC. Accuracy is required. "
    "Metal is BRONZE; iron appears on nobody. Gold and silver only as small ornament. "
    "Textiles are hand-spun, hand-woven wool and flax linen ONLY, with visible slubs and "
    "irregular selvedges. No cotton, silk, felt or knitting, and no machine-regular weave. "
    "Dyes are madder, weld, woad and indigo, ochre, saffron and walnut: RICH AND WARM, "
    "varying across a bolt, never neon and never drab. "
    "Vessels are fired clay, stone, wood, basketry, leather and bronze; glass only as beads. "
    "Light comes from the sun, oil lamps and open hearths."
)

# =========================================================================================
# THE WORLD IS ALIVE, NOT EXCAVATED
# =========================================================================================
#
# THE SINGLE BIGGEST FAILURE IN THE FIRST BATCH. Every settlement came back brown, empty and
# half-ruined, because the training data for "ancient Mesopotamian city" is overwhelmingly
# photographs of archaeological sites and museum reconstructions. The model gives you the dig,
# not the town.
#
# These people are not standing in their own ruins. A Late Bronze Age city is plastered,
# limewashed and PAINTED, hung with dyed cloth, full of people and animals and noise, with
# green pushing in wherever water reaches. Mud brick is a warm living material when it is
# maintained, and every building in these pictures is maintained.
#
# A scene may override this by saying so — Yadinu's bleak Anatolian plateau does, and the
# dry Theban valley does. The default is life.

LIVING_WORLD = (
    "A LIVING PLACE AT THE HEIGHT OF ITS LIFE, not a ruin and not a dig site. Nothing "
    "abandoned, tumbled, roofless or overgrown. No excavation trenches, no rubble fields. "
    "Buildings are maintained: mud brick smoothly plastered and limewashed or ochre-washed, "
    "timber lintels, reed roofing, matting awnings, cloth hung in doorways, and PAINTED "
    "where the culture paints. "
    "Colour everywhere: dyed textiles, painted pottery, strung beads, onions and herbs hung "
    "to dry. "
    "POPULATED: people working and trading in the middle distance, children, donkeys, goats, "
    "dogs, smoke from cooking fires, washing out. "
    "GREEN wherever water reaches. Dry ground only where the scene calls for it."
)

ANACHRONISMS = (
    "NOT PRESENT, and these are the ones that slip through: no first-millennium Assyrian "
    "styling, so no tiered ringleted beards and no winged bulls; no rotary querns, because "
    "grain is ground kneeling on a flat SADDLE QUERN; no camels, because pack animals are "
    "DONKEYS; no ridden horses, saddles or stirrups; no chickens; no classical columns, "
    "marble or arches; no spinning wheels, scissors, forks or buttons. "
    "NO New World or later food: tomato, potato, chilli or sweet pepper, maize, common bean, "
    "squash, aubergine, citrus, cane sugar, rice, pasta, coffee, tea, chocolate, banana. No "
    "black peppercorns, no cinnamon quills. "
    "NOTHING MODERN of any kind. "
    "NO text, lettering, numerals, captions, subtitles or watermark anywhere in the image."
)

# =========================================================================================
# YADINU of Ugarit — the Levant and eastern Anatolia
# =========================================================================================
#
# RESEARCH. Syro-Canaanite male dress is known chiefly from Egyptian depictions of Retjenu
# and from Levantine ivories and cylinder seals: a long or knee-length tunic under a
# fringed, often patterned mantle worn over one shoulder. The fringe and the woven edge band
# are attested; a poor man's version of it is inference, and a reasonable one. Ugarit is the
# murex-purple city, which is exactly why a junior scribe does not wear purple — he wears
# the undyed version and one narrow stripe of madder and indigo.
# Beards: Levantine men appear bearded in Egyptian art throughout the period. Correct.
# INVENTED: nothing structural. The satchel and the specific stripe are choices, not claims.

YADINU_FACE = (
    "YADINU. A Levantine man of thirty-one. Warm olive-brown skin. Lean and wiry rather "
    "than muscular — the body of somebody who has walked for a living for five years and is "
    "not paid much for it: narrow through the shoulders, no spare flesh, forearms corded "
    "from carrying. He is caught mid-movement in most frames, because he does not hold "
    "still. "
    "Dark brown hair, nearly black, thick and loosely curled, collar length, tousled, "
    "falling forward over the brow. A SHORT dark beard, neatly kept, close along the jaw "
    "with the moustache joined to it — a young man's beard, never full, never bushy, never "
    "grey. Dark expressive brows, warm brown eyes, a straight nose. "
    "A wide easy smile is his resting expression, and it reaches the eyes. He is delighted "
    "by food and mildly amused by everything else. Quick, restless and energetic — never "
    "world-weary, never brooding, never a tired traveller."
)

YADINU_DRESS = (
    "HIS CLOTHES ARE IDENTICAL IN EVERY IMAGE. A knee-length undyed linen tunic, cream and "
    "oatmeal, soft with washing, frayed at the hem. "
    "OVER IT, THE ESSENTIAL ELEMENT: a pale loose-woven wool shawl draped over the LEFT "
    "shoulder and falling across the chest, its edge carrying one narrow woven stripe of "
    "faded indigo and rust and a short hand-twisted fringe. This is his silhouette. "
    "A wide belt of dark leather straps, or a heavy cloth sash wound several times, worn "
    "and darkened, with a small pouch hanging from it. A narrow satchel strap crossing the "
    "chest from the RIGHT shoulder. Plain leather sandals. "
    "No jewellery at all: no rings, no gold, nothing at the neck but a plain cord. "
    "HIS KIT SHOWS — at least one in every frame: a cut-reed stylus, a small clay tablet, a "
    "short bronze knife, a drawstring spice pouch, a stoppered leather waterskin."
)

YADINU_WORLD = (
    "HIS WORLD: the Levantine coast and the roads up off it. Working harbours with beached "
    "and moored ships, painted mud-brick harbour walls, stacked storage jars, donkey trains "
    "on stone hill roads, terraced olive and fig, and the high cold Anatolian plateau of "
    "cyclopean stone walls and thin grey light. Golden hour on the coast; flat grey light "
    "on the plateau. THERE IS FOOD IN FRAME in quantity: bread, onions, pulses in bowls, "
    "figs, olives, split dried fish, herbs."
)

# =========================================================================================
# HENUT of Set Maat — Egypt
# =========================================================================================
#
# RESEARCH. Deir el-Medina, 19th dynasty. Egyptian dress is LINEN, effectively without
# exception — wool is present in Egypt but marginal and ritually excluded from temples, so
# a village woman's clothing is linen and mostly undyed. The tight sheath dress of tomb
# painting is an artistic convention rather than a working garment; a real working woman
# wore a loose wrapped linen shift, often knotted at one shoulder, and went barefoot.
# Dyed linen is possible but uncommon, so her head-cloth is undyed with a coloured woven
# selvedge rather than a dyed blue cloth — the accurate version of the same silhouette.
# Kohl (galena) is universal across sex and class and is worn for sun and flies. Faience
# bead jewellery is the ordinary woman's ornament and Deir el-Medina is full of it; a plain
# copper alloy bangle is the other common piece. Her own hair, not a wig — wigs are for
# those who can afford them.
# BREAD: the New Kingdom bakery uses a cylindrical clay oven with dough slapped onto the
# inner wall, plus hand-shaped and moulded loaves. Conical bread moulds are securely Old and
# Middle Kingdom and more doubtful this late, so the oven leads and the moulds are secondary.
# INVENTED: Henut herself, and the apron.

HENUT_FACE = (
    "HENUT. An Egyptian woman of forty-six, HANDSOME, FIT AND FORMIDABLE. She is a woman in "
    "her prime who runs a working operation, and she should read that way: never downtrodden, "
    "never grim, never a beaten peasant. Cast her as a striking, good-looking woman of "
    "middle age. "
    "Warm deep reddish-brown skin with a healthy sheen, sun-darkened on the face, forearms "
    "and shins. STRONG AND WELL MADE rather than heavy: an upright carriage, square "
    "shoulders, and the real muscle in the arms, forearms and back that thirty years at a "
    "grinding stone and a brewing vat actually builds. She carries herself like somebody "
    "who is owed an answer. "
    "HER HEAD IS SHAVED, in the ordinary Egyptian way, close to the scalp. This is the "
    "first thing you notice about her and it is correct for her country, her century and "
    "her trade. It shows the fine shape of her skull, her long neck and her ears. NO WIG. "
    "Large dark almond eyes, high arched brows, strong cheekbones, a straight nose and a "
    "wide well-cut mouth. Black galena kohl drawn around both eyes and extended at the "
    "outer corner, put on every morning as a matter of course. "
    "HER DEMEANOUR IS WARM, FUNNY AND FULL OF APPETITE, and this matters more than any other "
    "single note about her. Her resting face is bright and openly amused, creased with deep "
    "laugh lines, permanently on the edge of laughing at something. She grins. She talks "
    "with her hands. She is delighted by her own bread. "
    "DO NOT render her solemn, stern, severe, mournful, pious, grim or scowling. Ancient "
    "Egypt was not a gloomy death cult, whatever the tomb paintings and the films have "
    "taught you to expect: these were people who threw enormous parties, wrote love poetry "
    "and drinking songs, kept cats, and lived in one of the greenest and most abundant "
    "places on earth. Henut is that country in one woman. She turns hard only when somebody "
    "is late with her grain. "
    "Her hands are strong and capable, the backs marked with old burn scars from oven "
    "mouths, the nails short."
)

HENUT_DRESS = (
    "HER CLOTHES ARE IDENTICAL IN EVERY IMAGE, and everything she wears is LINEN. "
    "A plain undyed linen shift to mid-calf, coarsely woven, much washed, grey and frayed "
    "at the hem, wrapped and knotted at the left shoulder. Over it, a second length of the "
    "same linen tied at the waist as a working apron, scorched brown in one place. "
    "HER SILHOUETTE IS THE SHAVED HEAD AND IT IS VISIBLE IN EVERY SINGLE FRAME, without "
    "exception. Her scalp is bare, closely shaved and catching the light. SHE HAS NO HAIR: "
    "no fringe, no strands at the temple, no hair at the nape, no hair escaping anywhere, "
    "and NO WIG. If a head covering appears at all it is a folded undyed linen cloth with "
    "two narrow woven stripes of faded blue and red, worn LOOSE AROUND THE NECK AND "
    "SHOULDERS or draped over one shoulder. IT NEVER COVERS, WRAPS OR TOUCHES THE CROWN OF "
    "HER HEAD. Do not wrap her head in a scarf, turban or veil. "
    "SECOND IDENTIFIER, ALSO IN EVERY FRAME: HER FOREARMS ARE WHITE WITH EMMER FLOUR TO THE "
    "ELBOW, dry and dusty, whatever she is doing. "
    "One heavy plain copper-alloy bangle on the right wrist — the only metal she owns. A "
    "short string of small blue-green faience disc beads at the throat. Barefoot in the "
    "yard, plain woven-palm sandals outside it. "
    "HER KIT SHOWS: a wooden dough scraper, a flat coiled reed basket, a fired-clay beer "
    "strainer, a tall clay beer jar, a fired-clay tally."
)

HENUT_WORLD = (
    "HER WORLD: a walled village on the Theban west bank and the river country below it. "
    "White limewash and mud brick, a cylindrical clay bread oven with dough slapped on its "
    "inner wall, brewing vats, stacked bread baskets, donkeys, and the bare limestone cliff "
    "behind. The VILLAGE ITSELF is dry, and that is the point of it, but it is busy and "
    "lived-in: children, cats, dogs, painted doorways, awnings, washing, and pots of herbs. "
    "EGYPT BEYOND THE VILLAGE IS A GREEN PARADISE and any frame that reaches the river must "
    "show it — dense date palms, sycomore figs, vines on frames, vegetable plots, reeds and "
    "lotus on the water, waterfowl, and cultivation running flat to the horizon. This is one "
    "of the most fertile places on earth and it should look it. "
    "Hard high sun and black-edged shade, or the red interior light of an oven mouth. "
    "FOOD IN FRAME: flat and domed emmer loaves, onions, garlic, leeks, lettuce, cucumbers, "
    "melons, dates, figs, split dried Nile fish, thick unfiltered beer in clay jars."
)

# =========================================================================================
# BALĀṬU of Babylon — Mesopotamia and Elam
# =========================================================================================
#
# RESEARCH, and this is the one with a trap in it. Kassite Babylonia and Middle Assyria,
# c. 1226 BC — NOT the Neo-Assyrian empire. The famous look everybody reaches for, the
# tiered ringleted beard and the fringed ziggurat-hem robe of the Nimrud reliefs, is ninth
# century and later. Six hundred years wrong. Kassite-period male dress, from kudurrus and
# seals, is a long tunic with a heavy fringed wrap; beards are full and combed, not
# sculpted into rows of ringlets.
# Silver is the money metal, so a heavy silver ring is a wearable shekel and entirely
# ordinary on a man with savings.
# INVENTED: Balāṭu himself, and the leather apron. No Mesopotamian image of a cook in an
# apron exists. It is a plausible piece of kit for a man who works over fire, it is the
# second half of his silhouette, and it is a choice rather than a claim.
# THE TABLETS ARE REAL: three Old Babylonian culinary tablets, about five hundred years old
# in his lifetime, with twenty-one broths and no quantities.

BALATU_FACE = (
    "BALĀṬU. A Mesopotamian man of fifty-four. Olive skin, weathered brown on the face, "
    "neck and forearms and noticeably paler where the apron covers him. SHORT and HEAVY: "
    "thick through the chest and shoulders, heavy-armed, with a solid gut he has made no "
    "attempt to argue with. "
    "Grey-black hair worn long, swept back off the forehead and tied at the nape. "
    "HIS BEARD: full, dense, oiled and combed straight downward, squared off flat below the "
    "chin, iron-grey through the black. IT IS COMBED, NOT SCULPTED — absolutely NO tiered "
    "rows of ringlets and no carved-relief curls, which belong to a much later century. "
    "Small deep-set brown eyes under heavy lids, a broad nose, and a mouth that turns down "
    "at rest so that he appears about to disagree with you. "
    "His forearms are a map of old burn scars and knife nicks, and the left thumbnail is "
    "permanently black."
)

BALATU_DRESS = (
    "HIS CLOTHES ARE IDENTICAL IN EVERY IMAGE. A plain undyed linen tunic to the calf, and "
    "over it a long heavy wool wrap in dull faded madder-red with a woven border and a deep "
    "hand-twisted fringe, passed over the LEFT shoulder and falling to the calf. "
    "HIS SILHOUETTE: a BROAD DARK LEATHER APRON from chest to knee, stiff, cracked and "
    "blackened with grease, worn over everything. "
    "SECOND IDENTIFIER: a short bronze knife hanging at his chest on a leather cord. "
    "One heavy plain silver ring. Bare feet indoors. "
    "HIS KIT SHOWS: the bronze knife, a long copper ladle, a heavy stone mortar and pestle, "
    "a horsehair strainer, a stack of small palm-sized clay tablets covered in wedge marks."
)

BALATU_WORLD = (
    "HIS WORLD: interiors, low and smoky. An institutional temple kitchen of mud brick — a "
    "domed bread oven with a red mouth, large tripod cauldrons over fire pits, plucked "
    "birds hanging in rows, ranks of storage jars sunk into the floor, palm-trunk roof "
    "beams. Rarely any sky, and no sea anywhere ever. Firelight and one shaft of daylight "
    "through a high opening. FOOD IN FRAME: barley and emmer in open baskets, dates in "
    "quantity, sesame oil in jars, onions and leeks and garlic, chickpeas and lentils, "
    "river fish, mutton on the bone, soured milk and hard curd, thick beer."
)

# =========================================================================================
# ANNIWIYA of Millawanda — the Aegean and western Anatolia
# =========================================================================================
#
# RESEARCH. The flounced skirt and open bodice of Minoan and Mycenaean art is elite and
# largely ritual iconography, and we do not know what a palace grinding woman wore. So her
# dress is the honest inference: a plain belted wool tunic, which is what the evidence
# supports and what the alternative would be inventing against.
# Her Anatolian veil is defensible — Hittite and western Anatolian women appear veiled on
# reliefs — and it is the point of her, since she is wearing it in a place where nobody does.
# THE BLUE GLASS BEAD IS THE BEST-ATTESTED OBJECT ON HER: the Uluburun wreck, off the
# south-west Anatolian coast, carried a cargo of raw cobalt-blue glass ingots. Glass beads
# are exactly the small precious thing that reaches a working woman in this world.
# Saffron: crocus dye is an Aegean prestige colour, the Thera frescoes are full of its
# harvest. A faded saffron hem on a worn tunic is right.
# Straight bronze dress pins throughout. Fibulae only appear at the very end of the age.
# SADDLE QUERN, kneeling, both hands — the rotary quern is Iron Age. The heavy shoulders
# and forearms are the real skeletal signature of years of grinding, and they do not
# soften when the grinding stops, which is why she still carries them at thirty-two.
# INVENTED: Anniwiya herself. The tablets record groups of women by origin and a ration,
# without personal names, which is precisely her point.

ANNIWIYA_FACE = (
    "ANNIWIYA. A woman of TWENTY-EIGHT, young and unmistakably in her late twenties, and she "
    "is BEAUTIFUL: the kind of face a city argues over and a poem gets written about. This "
    "is the single most important thing about her appearance and it must be obvious in "
    "every frame. Cast her as a genuinely beautiful woman. "
    "SHE IS XANTHE, the fair, golden colouring the old poems give their heroes, and it is "
    "the first thing to get right. Her HAIR IS TAWNY GOLD: honey and dark bronze at the "
    "root, lightened to pale wheat and amber where the sun and the salt have worked on "
    "it. Thick and heavy, never flat, never platinum, never bleached-looking. "
    "Her COMPLEXION IS FAIR AND WARM, noticeably lighter than the people around her, "
    "cream and honey rather than olive, with high colour on the cheek and a scatter of "
    "sun freckles across the nose and shoulders. She catches the sun rather than tanning "
    "into it. "
    "THIS IS THE FAIR END OF THE AEGEAN AND WESTERN ANATOLIAN RANGE, a real colouring of "
    "that coast, and NOT a modern northern European look. Her features stay entirely of "
    "the place: a long straight nose running in an unbroken line from the brow, high wide "
    "cheekbones, a clean jaw, a full and beautifully cut mouth. "
    "HER EYES ARE PALE and they are the thing people remember: large, wide-set, clear "
    "green-hazel, striking against the olive skin and the strong dark brows. Long dark "
    "lashes. "
    "She wears it in one heavy plait over the shoulder, with loose strands escaping at the "
    "temple. "
    "SHE CARRIES HERSELF LIKE A KING'S DAUGHTER, because she is one, and this is the tell "
    "that must survive into every frame. Chin level, shoulders back, neck long, weight even, "
    "entirely still. She was raised in a palace and it never left her posture. Her "
    "expression is level, direct and faintly amused. She looks straight down the lens as an "
    "equal and she does not smile to be agreeable, which is most of the effect. "
    "Her hair and her clothes are CLEAN AND WELL KEPT. She is groomed, in the way a woman "
    "with a position and a good name is groomed. "
    "SHE IS FIT AND HEALTHY, not weathered, not haggard and not careworn. Ground her in her "
    "life with a light hand and nothing more: sun on the nose and cheekbones, and a fine "
    "white seam of old scar through the left eyebrow. "
    "HER BODY CARRIES THE OTHER HALF OF HER STORY, and the contrast with her face is the "
    "point of the picture. Small, lithe and very upright, athletic rather than thin, with "
    "notably strong shoulders, upper arms and forearms on a slight frame, built by ten "
    "years kneeling at a saddle quern. Capable hands, broad across the palm. She was born a "
    "king's daughter and she has ground grain for a decade, and a viewer should be able to "
    "read both off her at a glance."
)

ANNIWIYA_DRESS = (
    "SHE IS NOT A PEASANT AND MUST NEVER BE DRESSED AS ONE. She was raised in a king's "
    "house and she now holds a position of real trust in a palace, weighing and sealing "
    "perfumed oil for export and travelling with it. She dresses like a woman of standing "
    "who works. NO sacking, NO shapeless undyed smock, NO coarse rag, NO rope belt. "
    "HER CLOTHES ARE IDENTICAL IN EVERY IMAGE. A well-made ankle-length gown of FINELY "
    "WOVEN wool, dyed a soft warm SAFFRON-GOLD, cut close through the body and falling in "
    "proper folds, with WOVEN DECORATIVE BANDS in madder red and dark blue at the hem, the "
    "short sleeve and the neck. The weave is even and good. The cloth has been washed many "
    "times and is the better for it. "
    "A wide woven girdle in madder red wound twice at the waist and knotted, with short "
    "tasselled ends. "
    "HER SILHOUETTE: a long scarf of deep indigo wool, soft and good, wound over the head "
    "and thrown back across the LEFT shoulder — an Anatolian way of wearing cloth that "
    "nobody around her wears, and she has not given it up in twenty years. "
    "SECOND IDENTIFIER, AND THE ONLY THING AT HER THROAT IN ANY FRAME: a strung line of "
    "small pierced white cockle shells with ONE ROUND COBALT-BLUE GLASS BEAD hanging at "
    "the centre, the last surviving piece of a bride-gift. She wears NO other necklace, "
    "no bead collar and no pendant. The blue bead must be visible. "
    "JEWELLERY, worn plainly and without display: a pair of straight bronze dress pins with "
    "decorated heads at the shoulders, a spiral bronze bracelet on the right wrist, and "
    "small bronze rings in her ears. NOT a fibula, NOT a brooch. Good hide sandals. "
    "HER KIT SHOWS: a small polished stone weight, a bronze balance, a stoppered "
    "narrow-necked oil flask, a stone seal on a cord, a shallow two-handled cup."
)

ANNIWIYA_WORLD = (
    "HER WORLD: open, bright and high. Aegean terraces above deep blue sea, olive and fig "
    "and dry stone, painted plaster walls in soft ochre and red, a great hall with a round "
    "central hearth and a smoke hole, storerooms of tall pithoi taller than she is, and a "
    "grinding room of flat SADDLE QUERNS where women kneel and work two-handed rubbing "
    "stones. Clear Mediterranean light, either early or late. FOOD IN FRAME: barley, dried "
    "figs by the sackful, olive oil in narrow-necked jars, sheep and goat cheese, wine "
    "kraters, pulses, wild greens, fish and shellfish, honey."
)

# =========================================================================================
# SIGNATURES — the short brief, used when a reference photograph is attached
# =========================================================================================
#
# WHEN A REFERENCE IMAGE GOES WITH THE PROMPT, the long FACE and DRESS blocks stop being an
# asset and become a liability. They are six hundred words of adjectives competing with a
# photograph that already answers every one of those questions better. Worse, they cost
# prompt budget the SCENE needs, and a diluted scene is how a frame ends up generically
# right and specifically wrong.
#
# So a referenced frame swaps them for this: a sentence saying the attached picture IS the
# person, plus ONLY the handful of details that have actually drifted in practice. Every
# item on these lists is here because a real frame got it wrong at least once.

YADINU_SIGNATURE = (
    "The attached photograph IS this man. Same face, same build, same clothes. Yadinu, 31, "
    "lean, dark tousled hair and a short beard, quick and smiling. "
    "MUST NOT DRIFT: the pale shawl over his LEFT shoulder with its faded indigo-and-rust "
    "stripe; the cream linen tunic; the satchel strap across his chest; no jewellery."
)

HENUT_SIGNATURE = (
    "The attached photograph IS this woman. Same face, same strong upright build, same "
    "clothes. Henut, 46, handsome and formidable. "
    "MUST NOT DRIFT: her head is SHAVED and bare, no hair anywhere, no wig, and any linen "
    "cloth sits on her neck or shoulders and never covers the crown; forearms floured to the "
    "elbow; faience beads at the throat; copper bangle on the right wrist. "
    "She is warm and funny, close to laughing. Never solemn."
)

BALATU_SIGNATURE = (
    "The attached photograph IS this man. Same face, same heavy build, same clothes. "
    "Balāṭu, 54. "
    "MUST NOT DRIFT: the beard is full, combed and squared, NEVER in tiered ringlets; the "
    "broad dark leather apron; the bronze knife on a cord at his chest; the madder-red "
    "fringed wrap over his left shoulder."
)

ANNIWIYA_SIGNATURE = (
    "The attached photograph IS this woman. Same face, same colouring, same clothes. "
    "Anniwiya, 32, and strikingly beautiful. "
    "MUST NOT DRIFT: tawny gold sun-lightened hair in one plait, fair freckled complexion, "
    "pale green-hazel eyes, NOT dark-haired and NOT olive; the deep indigo scarf over her "
    "LEFT shoulder; the saffron-gold gown with woven madder-and-blue bands; the white cockle "
    "shell string with ONE blue glass bead, her only necklace. "
    "She was born a king's daughter and stands like one."
)

# =========================================================================================
# THE SHORT BRIEF — what a referenced frame actually gets
# =========================================================================================
#
# THE LONG PROMPTS WERE THE PROBLEM. Five thousand characters of rules produced averaged
# mush: every frame the same amber wash, every subject centred and posed, the whole set
# reading as costume drama rather than photography. Each constraint added to fight that made
# it worse, because a generator given fifty competing absolutes satisfies all of them
# weakly.
#
# A reference photograph removes the need for most of them. It already carries the face, the
# build, the clothes, the palette and half the period detail, and it carries them better
# than prose can. So a referenced frame now gets three things and nothing else: WHO (short),
# WHAT IS HAPPENING (the scene, which is the actual content), and a one-line tail for the
# handful of facts a photograph cannot assert.

REF_TAIL = (
    "A real photograph, not an illustration, painting or render. Late Bronze Age, about "
    "1226 BC: bronze rather than iron, hand-woven wool and linen, nothing modern in frame. "
    "No text or lettering anywhere in the image."
)

# =========================================================================================
# THE PORTRAIT BRIEFS — for the four face frames, which have nothing to reference
# =========================================================================================
#
# A face frame is the anchor the rest of a writer's set is generated against, so it is the
# one frame that must carry the whole person in words. It still gets a SHORT brief, because
# the long ones did not work: a thousand words of description averaged out into a generic
# costume-drama portrait, and the specific details drowned.
#
# About a hundred words each. Age, build, colouring, the one garment that makes the
# silhouette, the two or three identifiers that must never drift, and the demeanour.

YADINU_PORTRAIT = (
    "Yadinu of Ugarit, a Levantine man of 31. Warm olive-brown skin, lean and wiry, the "
    "build of a man who walks all day. Dark brown, nearly black hair, thick and loosely "
    "curled, collar length, falling forward over the brow. A short dark beard close along "
    "the jaw. Warm brown eyes and a wide easy smile that is his resting expression. Quick "
    "and restless. "
    "A pale loose-woven shawl over his LEFT shoulder with a narrow faded indigo-and-rust "
    "stripe, over a cream linen tunic frayed at the hem. A wide dark belt with a small "
    "pouch, a satchel strap crossing his chest from the right shoulder, leather sandals. "
    "No jewellery at all."
)

HENUT_PORTRAIT = (
    "Henut of Set Maat, an Egyptian woman of 46. Deep reddish-brown skin, strong and "
    "upright, with real muscle in the arms and back. HER HEAD IS SHAVED, bare and close to "
    "the scalp: no hair anywhere, no wig. Large dark almond eyes ringed with black kohl "
    "extended at the outer corner, high brows, a wide well-cut mouth. "
    "She is warm and funny and close to laughing. Never solemn, never grim. "
    "A plain undyed linen shift knotted at one shoulder with a linen apron over it. An "
    "undyed linen cloth with narrow blue and red woven stripes sits on her shoulders and "
    "NEVER covers her head. Her forearms are floured white to the elbow. Blue-green faience "
    "beads at the throat, a copper bangle on the right wrist."
)

BALATU_PORTRAIT = (
    "Balāṭu of Babylon, a Mesopotamian man of 54. Olive skin weathered brown, short and "
    "heavy through the chest and shoulders, with a solid gut. Grey-black hair swept back "
    "and tied at the nape. "
    "His beard is full, oiled and combed straight downward and squared off flat below the "
    "chin, iron-grey through the black. NEVER sculpted into tiered ringlets. "
    "Small deep-set brown eyes under heavy lids and a mouth that turns down at rest, so he "
    "looks about to disagree with you. "
    "A long fringed wool wrap in dull madder-red over his LEFT shoulder, a plain linen "
    "tunic beneath, and a broad dark leather apron from chest to knee, cracked and "
    "blackened with grease. A short bronze knife on a cord at his chest. Forearms marked "
    "with old burns."
)

ANNIWIYA_PORTRAIT = (
    "Anniwiya of Millawanda, a woman of 28, and strikingly beautiful. She is XANTHE: tawny "
    "gold hair, honey at the root and lightening to pale wheat where sun and salt have "
    "caught it, worn in one heavy plait over the shoulder. Her complexion is fair and warm, "
    "cream rather than olive, freckled across the nose. Large pale green-hazel eyes, a long "
    "straight nose, high wide cheekbones. "
    "Small, lithe and very upright. She was born a king's daughter and stands like one: "
    "chin level, shoulders back, looking straight down the lens without smiling to please. "
    "A saffron-gold gown of finely woven wool with woven madder-and-blue bands at hem, "
    "sleeve and neck, a madder girdle wound twice, and a deep indigo scarf thrown back over "
    "her LEFT shoulder. At her throat, white cockle shells with ONE cobalt-blue glass bead, "
    "her only necklace."
)

# The still-life brief. Same job as REF_TAIL: everything a photograph of a place or an
# object needs, and nothing that belongs to a person.
STILL_BRIEF = (
    "A real photograph with NO PEOPLE in it at all: no figures, faces, hands or arms, and "
    "nobody in the background, not even blurred or small. The subject is the place or the "
    "object itself, filling the frame. "
    "Late Bronze Age, about 1226 BC: bronze rather than iron, hand-woven wool and linen, "
    "fired clay, stone and basketry, nothing modern anywhere. Where a settlement shows, it "
    "is lived-in and maintained, plastered and painted and busy, never a ruin or a dig "
    "site. No text or lettering anywhere in the image."
)

# A THIRD MODE, because two was one short. `who` answers "is the writer in this frame", and
# it was doing double duty as "is anybody in this frame". So a crowded hall with no narrator
# in it had no way to be asked for: who=None stripped every human out of a feast.
#
#   who set          the writer is the subject          -> FRAMING_PERSON
#   who null         nothing alive in frame at all      -> FRAMING_STILL
#   people: true     a populated scene, no named subject -> FRAMING_SCENE
FRAMING_SCENE = (
    "A populated scene with NO single portrait subject. People fill it and the room or the "
    "event is the subject, not any one face. Nobody poses for the camera or looks at it. "
    "Shoot it wide, 28-40mm, from the edge of the room, the way a photographer standing in "
    "a doorway would. Faces in the middle distance are real and busy but none of them is "
    "the point."
)

# =========================================================================================
# PHOTO_REAL — the one block that goes in front of every single prompt
# =========================================================================================
#
# A REGRESSION I CAUSED. Cutting the prompts down was right, but I cut the camera out along
# with the padding, and no branch carried a photographic specification any more. Close-up
# food survived, because a still life of a bowl renders photographically by default. Wide
# populated scenes did not: a hall of forty small faces has nothing anchoring it, and the
# model falls back on the enormous pile of PAINTED historical scenes in its training. The
# Pylos hall came back looking like an oil painting of a feast.
#
# So this goes first, in every branch, always. It is short on purpose. The load is carried
# by naming a real photographic process and by the imperfections, which is what actually
# separates a photograph from an illustration: a painting is composed and evenly resolved,
# a photograph has a focal plane, motion, grain and things going wrong at the edges.

PHOTO_REAL = (
    "AN UNPOSED DOCUMENTARY PHOTOGRAPH, shot on 35mm colour film and scanned. Reportage, not "
    "illustration. "
    "THIS MUST NOT LOOK PAINTED. No painting, no oil painting, no digital painting, no "
    "concept art, no illustration, no 3D render, no CGI, no matte painting, no video game "
    "cinematic, no airbrushed skin. "
    "NOT A MODEL: no diorama, no miniature, no scale model, no tilt-shift, no toy-like figures. Everything is life size and the people are full-scale human beings. "
    "PHOTOGRAPHIC IMPERFECTION IS THE POINT: a true shallow focal plane with only one depth "
    "sharp and everything in front and behind genuinely soft, fine film grain, slight "
    "highlight blowout where the light is strongest, and motion blur on anyone moving. "
    "Somebody is half out of frame, somebody has their back to the lens, somebody is caught "
    "mid-blink. Nobody is arranged. "
    "Real skin with pores, oil and unevenness. Faces in the middle distance are soft, "
    "because a lens cannot hold them all."
)

# =========================================================================================
# assembly
# =========================================================================================
WRITERS = {
    "yadinu":   dict(face=YADINU_FACE,   dress=YADINU_DRESS,   world=YADINU_WORLD,
                     signature=YADINU_SIGNATURE,   portrait=YADINU_PORTRAIT),
    "henut":    dict(face=HENUT_FACE,    dress=HENUT_DRESS,    world=HENUT_WORLD,
                     signature=HENUT_SIGNATURE,    portrait=HENUT_PORTRAIT),
    "balatu":   dict(face=BALATU_FACE,   dress=BALATU_DRESS,   world=BALATU_WORLD,
                     signature=BALATU_SIGNATURE,   portrait=BALATU_PORTRAIT),
    "anniwiya": dict(face=ANNIWIYA_FACE, dress=ANNIWIYA_DRESS, world=ANNIWIYA_WORLD,
                     signature=ANNIWIYA_SIGNATURE, portrait=ANNIWIYA_PORTRAIT),
}

# gpt-image-1 accepts only these three. Portrait for a standing figure, landscape where the
# place has to show.
SHAPE_SIZE = {"portrait": "1024x1536", "landscape": "1536x1024"}

# Written by `npm run frames` out of the posts themselves. See scripts/derive_frames.mjs:
# an image earns a row here by carrying a `scene` in the article that places it.
FRAMES = Path(__file__).resolve().parent / "frames.json"
ROOT = Path(__file__).resolve().parent.parent


def writer_prompt(world_of: str, scene: str, who: str | None, reference: bool = False,
                  people: bool = False) -> str:
    """One prompt.

    `world_of` is whose beat the picture is set in — it selects the WORLD block, and it is
    the post's author, always.

    `who` is the person standing in the frame, and it may be None. That distinction is the
    reason this takes two arguments instead of one. A bowl of broth, a storeroom of pithoi
    and a cut through a city mound are all Balāṭu's or Anniwiya's pictures and belong in
    their folders, but there is nobody in them, and pasting a face-and-dress block into a
    still life gets you a still life with a person awkwardly inserted. So a `who` of None
    drops both blocks and the scene stands on its own.

    ORDER MATTERS. The photographic register comes first because it decides what KIND of
    image this is, and everything after constrains that image rather than competing with it.
    The face precedes the clothes, because a wrong face ruins a frame and wrong clothes only
    spoil one. The negatives go last, where a generator weights them most heavily.
    """
    # A REFERENCED FRAME GETS ALMOST NOTHING. Signature, scene, tail. The photograph does
    # the rest, and every block left out is one fewer instruction diluting the scene.
    if who and reference:
        return "\n\n".join([PHOTO_REAL, WRITERS[who]["signature"], f"SCENE: {scene}", REF_TAIL])

    if who:
        # The face frame: no reference exists yet, so the person is carried in words. Still
        # about a hundred of them, not a thousand.
        return "\n\n".join([PHOTO_REAL, WRITERS[who]["portrait"], f"SCENE: {scene}", REF_TAIL])
    if people:
        return "\n\n".join([PHOTO_REAL, FRAMING_SCENE, STILL_BRIEF.replace(
            "A real photograph with NO PEOPLE in it at all: no figures, faces, hands or "
            "arms, and nobody in the background, not even blurred or small. The subject is "
            "the place or the object itself, filling the frame. ", "A real photograph. "),
            f"SCENE: {scene}"])
    return "\n\n".join([PHOTO_REAL, STILL_BRIEF, f"SCENE: {scene}"])
    # The no-person rule is repeated last, after the negatives, because that is the position
    # a generator weights most heavily and it is the instruction that kept losing.
    if not who:
        parts += ["FINAL CHECK: this frame contains NO people of any kind."]
    return "\n\n".join(parts)


def subjects() -> list[dict]:
    """The pipeline's subject rows, built from frames.json.

    Returns [] when frames.json is missing rather than failing, so that a checkout which has
    never run `npm run frames` can still plan every other tier. generate_images.py imports
    subjects.py at module scope, and a missing bridge file should not take the whole image
    pipeline down with it.
    """
    if not FRAMES.exists():
        return []
    rows = json.loads(FRAMES.read_text(encoding="utf-8"))
    out = []
    for f in rows:
        shape = f.get("shape", "landscape")
        # The writer's own face frame has nothing to reference: it IS the reference.
        who = f.get("who")
        ref = None
        if who and f["slug"] != f"{who}-face":
            cand = ROOT / "public" / "img" / "writers" / who / "face.webp"
            ref = cand if cand.exists() else None
        out.append(dict(
            tier="writers", slug=f["slug"], kind="plate",
            # Story frames belong to the article. Writer folders hold identity portraits.
            out=f"reports/{f['folder']}/{f['name']}",
            writer=f["writer"], who=f.get("who"),
            ratio=(0.667 if shape == "portrait" else 1.5),
            size=SHAPE_SIZE[shape],
            source=f"post: {f['post']}",
            art=f["scene"],
            reference=str(ref) if ref else None,
            people=bool(f.get("people")),
            prompt=writer_prompt(f["writer"], f["scene"], f.get("who"), bool(ref),
                                 people=bool(f.get("people"))),
        ))
    return out


if __name__ == "__main__":
    import sys
    rows = subjects()
    if not rows:
        sys.exit("no frames. Run `npm run frames` first.")
    which = sys.argv[1] if len(sys.argv) > 1 else rows[0]["slug"]
    row = next((s for s in rows if s["slug"] == which), None)
    if not row:
        sys.exit(f"no such frame: {which}\n  " + "\n  ".join(s["slug"] for s in rows))
    print(row["prompt"])
