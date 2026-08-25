// Barley & Bronze — image manifest.
//
// Nothing in the JSX should ever hardcode a path under /img. Everything that
// ships lives here, with its intrinsic size so a component can set width and
// height and reserve the space before the file arrives.
//
// Built by scripts/process_images.py from images/_raw. Re-run that script if
// new raws land; the slugs below are stable.
//
// `kind` tells a component how the asset wants to be treated:
//
//   'plate'   a full illustrated scene, 4:3, opaque. It carries its own
//             background, so it needs a 1px --line border to sit against the
//             page rather than bleed into it. Heavy-ish: load it lazily.
//   'cutout'  keyed to transparency. No background of its own, which is why
//             these are the assets that are safe anywhere in either theme —
//             there is nothing to be the wrong colour. Never put one on a
//             coloured chip; let the page show through.
//   'icon'    small, transparent, decorative. (None yet.)
//
// Alt text: the plates and cutouts all carry real information about what a
// Bronze Age pantry held, so they get described rather than dismissed. If any
// of these is ever placed purely as decoration next to text that already says
// the same thing, pass alt="" at the call site instead of using `alt` here.

/**
 * One 4:3 scene plate per accent, keyed by the accent `key` in accents.js.
 * A matched set — same illustrator, same palette, same framing — so they
 * should be used together or not at all.
 *
 * 4:3 rather than the 16:10 they were commissioned at, and the filenames of
 * the raws still say 16x10. Three of the five sources turned out to be
 * near-square panels inside a mat; held at 16:10 they lost a quarter of their
 * height, which in a standing-figure scene is the heads and the feet. The
 * reasoning, and the per-plate crop anchors, live in scripts/process_images.py.
 */
export const accentImages = {
  babylonian: {
    src: '/img/accent-babylonian.webp',
    alt: 'A Babylonian storeroom against a blue glazed-brick wall: a scribe with a clay tablet checks off jars of grain and oil as a woman hands him a bowl, with a heifer and rows of storage jars behind.',
    w: 880,
    h: 660,
    kind: 'plate',
  },
  egyptian: {
    src: '/img/accent-egyptian.webp',
    alt: 'An Egyptian granary scene under a band of hieroglyphs: a man pours grain into a tall painted storage jar while a woman holds out a bowl of it, shelves of loaves and jars behind them.',
    w: 880,
    h: 660,
    kind: 'plate',
  },
  aegean: {
    src: '/img/accent-aegean.webp',
    alt: 'A Minoan-style fresco of a storeroom: two figures lift a decorated stirrup jar between them, surrounded by shelves of oil jars, a wine jug and a basket of fruit.',
    w: 880,
    h: 660,
    kind: 'plate',
  },
  hittite: {
    src: '/img/accent-hittite.webp',
    alt: 'A Hittite pantry scene beside a stylised tree: a bearded man passes a large painted jar to a woman across a bowl heaped with grain, with ranks of storage jars stacked behind.',
    w: 880,
    h: 660,
    kind: 'plate',
  },
  canaanite: {
    src: '/img/accent-canaanite.webp',
    alt: 'A Canaanite coastal storeroom: a man carries a basket of fruit past a tall unglazed jar while a woman reaches for a shelf of pots, baskets and small amphorae.',
    w: 880,
    h: 660,
    kind: 'plate',
  },
}

/**
 * The same five accents as keyed transparent cutouts — two figures at their
 * pantry shelves, background removed. Small, and correct on both the light
 * paper and the dark ground, so these are the ones to use at tile size.
 *
 * Deliberately a parallel map rather than a nested field on `accentImages`,
 * so a component can pick a register (`plate` or `cutout`) once and then index
 * either map by the same accent key.
 */
export const accentCutouts = {
  babylonian: {
    src: '/img/accent-babylonian-cut.png',
    alt: 'A Babylonian couple at their pantry shelves: he reads a clay tablet, she holds a wide basket of grain, a star frieze above and stacked jars and bowls between them.',
    w: 247,
    h: 340,
    kind: 'cutout',
  },
  egyptian: {
    src: '/img/accent-egyptian-cut.png',
    alt: 'An Egyptian couple at their pantry shelves: he carries a round-bellied jar, she reaches toward a shelf of loaves and lidded pots.',
    w: 232,
    h: 340,
    kind: 'cutout',
  },
  aegean: {
    src: '/img/accent-aegean-cut.png',
    alt: 'An Aegean couple handling a large painted amphora between them, a low table of cups and a jug at their feet.',
    w: 241,
    h: 340,
    kind: 'cutout',
  },
  hittite: {
    src: '/img/accent-hittite-cut.png',
    alt: 'A Hittite couple passing a storage jar between them beneath a carved lion-and-rosette frieze, a basket of fruit and a tall jar beside them.',
    w: 213,
    h: 340,
    kind: 'cutout',
  },
  canaanite: {
    src: '/img/accent-canaanite-cut.png',
    alt: 'A Canaanite couple at their stores: he lifts a large woven basket, she reaches for it across a table of covered bowls and a painted jar.',
    w: 273,
    h: 340,
    kind: 'cutout',
  },
}

/** Everything that is not tied to a single accent. */
export const images = {
  /**
   * The one shared kitchen, as a carved stone relief with the background keyed
   * away: two cooks either side of a hearth, a pot on top, grain below. Reads
   * as an artefact rather than an illustration, which is why it suits the
   * "kitchen underneath all of them" block — it belongs to none of the five.
   */
  sharedKitchen: {
    src: '/img/kitchen-shared.png',
    alt: 'A carved stone relief of two cooks at a hearth: one stirs a pot with a long pestle, the other holds out a bowl, with a jar, a basket of grain and a mortar around them.',
    w: 418,
    h: 420,
    kind: 'cutout',
  },
}

/**
 * The seven aisle signs, as carved-relief cutouts keyed to transparency.
 * Keyed by `market.js :: AISLES[].key`.
 *
 * Cutouts rather than plates on purpose: these sit beside the aisle blurb in
 * the Market's instruction row, which is on the page ground in both themes.
 * A plate there would need a box, and a box in a 46px slot is a smudge with a
 * border round it.
 */
export const aisleArt = {
  produce: { src: '/img/aisle-produce.png', alt: 'A carved stone plaque: a leek laid across two round onions.', w: 154, h: 160, kind: 'cutout' },
  drygoods: { src: '/img/aisle-drygoods.png', alt: 'A carved stone plaque: an ear of grain standing in a wide-mouthed jar, with scattered pulses below.', w: 131, h: 160, kind: 'cutout' },
  meat: { src: '/img/aisle-meat.png', alt: "A carved stone plaque: a ram's head above two crossed knives.", w: 122, h: 160, kind: 'cutout' },
  dairy: { src: '/img/aisle-dairy.png', alt: 'A carved stone plaque: a horned goat standing beside a tall milk pail.', w: 153, h: 160, kind: 'cutout' },
  fats: { src: '/img/aisle-fats.png', alt: 'A carved stone plaque: an olive branch above a two-handled oil jar and a low pot.', w: 127, h: 160, kind: 'cutout' },
  seasoning: { src: '/img/aisle-seasoning.png', alt: 'A carved stone plaque: a mortar and pestle beside a tied bundle of seed heads.', w: 129, h: 160, kind: 'cutout' },
  drinks: { src: '/img/aisle-drinks.png', alt: 'A carved stone plaque: a tall wine amphora beside a squat beer jar with a drinking straw in it.', w: 136, h: 160, kind: 'cutout' },
}

/**
 * The moderns: Bronze Age fresco panels of modern supermarket life. 16:10,
 * opaque, painted on the same cream plaster as everything else.
 *
 * These are jokes, and a joke placed as furniture stops being funny by the
 * third visit. So they are used in exactly three places, all of them screens
 * where the tool has already finished talking and the space is going spare —
 * an empty search result, the foot of the never-buy list, and the foot of the
 * page that admits what the nutrition figures are not. Nothing here is on a
 * route's first paint, and nothing here costs a pixel of layout.
 *
 * The other nine are unplaced by choice, not by oversight. See the report.
 */
export const moderns = {
  hunting: {
    src: '/img/modern-a-man-hunting.webp',
    alt: 'An Egyptian tomb painting of a man striding through the reeds with a shopping basket on his hip, holding up a pomegranate, ducks flying off a supermarket shelf behind him.',
    w: 880,
    h: 550,
    kind: 'fresco',
  },
  checkout: {
    src: '/img/modern-at-the-checkout.webp',
    alt: 'An Egyptian fresco of a supermarket checkout: a bearded man works a till while a family with two children queue behind their baskets, sacks of grain, pomegranates, jars and a fish laid out along the front.',
    w: 880,
    h: 550,
    kind: 'fresco',
  },
  weighing: {
    src: '/img/modern-the-weighing-of-the-heart.webp',
    alt: "An Egyptian fresco of the weighing of the heart, reworked as a grocery haul: Anubis kneels at the balance, the feather of truth in one pan and a mountain of shopping bags being loaded into the other by ibis-headed Thoth, while a man stands to the left holding yet more bags.",
    w: 880,
    h: 550,
    kind: 'fresco',
  },
}

/* The 33 square painted plates — one per dish, one per staple — live in a generated file
   because there are 33 of them and they are mechanical. Re-exported here so that the rule
   at the top of this file still holds: nothing outside this module knows a path under
   /img. Regenerate with `python scripts/make_thumbs.py --emit`. */
export { dishArt, stapleArt } from './imagery.generated'

/** Flat lookup by slug, for anything that would rather not know the shape. */
export const byKey = {
  ...images,
  ...Object.fromEntries(Object.entries(accentImages).map(([k, v]) => [`accent-${k}`, v])),
  ...Object.fromEntries(Object.entries(accentCutouts).map(([k, v]) => [`accent-${k}-cut`, v])),
}
