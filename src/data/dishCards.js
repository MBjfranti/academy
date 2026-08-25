// What a dish looks like BEFORE you open it.
//
// The grid has to answer "what is this, roughly?" in about a second, from a picture, a
// name and two or three words. That is a different job from `summary` in recipes.js, which
// is a full sentence written to be read once you are already interested — put a summary on
// a card and the grid becomes a wall of prose you have to actually read, which is the thing
// the old swipe deck got wrong.
//
// concept  Two to four words. What you would say if a friend asked what you were making.
//          Not a description, not a boast, no adjectives that do not narrow anything.
// tags     Short, factual, scannable. The kitchen tag comes free from the region, so it is
//          NOT listed here — Recipes derives it. These are the ones a cook filters on:
//          what protein, what form, and the two dietary facts worth knowing at a glance.
//
// Keyed on the exact slug in recipes.js / fundamentals.js. Same string-join pattern as
// sourcing.js and nutrition.js: no rewrite of the big data file, and a missing key is
// survivable rather than fatal.

export const dishCards = {
  'roast-goose-with-figs': {
    meal: 'feast',
    mins: 150, concept: 'Fat goose, slow roast', tags: ['Poultry', 'Roast', 'Feast'] },
  'shelled-beans-deir-el-medina': {
    meal: 'midday',
    mins: 90, concept: 'Garlicky broad beans', tags: ['Pulses', 'Vegetarian', 'Everyday'] },
  'happena-meat-in-oil-and-honey': {
    meal: 'evening',
    mins: 135, concept: 'Lamb baked in honey', tags: ['Lamb', 'Roast', 'Sweet'] },
  'neck-of-mutton-with-leeks-hattusa': {
    meal: 'evening',
    mins: 180, concept: 'Mutton buried in leeks', tags: ['Lamb', 'Stew', 'Slow', 'One pot'] },
  'kariya-grilled-liver-and-heart': {
    meal: 'midday',
    mins: 30, concept: 'Grilled offal skewers', tags: ['Offal', 'Grill', 'Quick'] },
  'beruwa-chickpea-and-cucumber': {
    meal: 'midday',
    mins: 60, concept: 'Chickpea mash, raw cucumber', tags: ['Pulses', 'Vegetarian', 'Quick'] },
  'skewers-on-the-firedog': {
    meal: 'evening',
    mins: 45, concept: 'Grilled meat skewers', tags: ['Lamb', 'Grill', 'Quick'] },
  'kykeon-barley-and-cheese': {
    meal: 'morning',
    mins: 10, concept: 'Barley, cheese and wine', tags: ['Drink', 'No cooking', 'Homeric'] },
  'marzeah-roast-mutton': {
    meal: 'feast',
    mins: 180, concept: 'Feast mutton, pomegranate', tags: ['Lamb', 'Roast', 'Feast'] },
  // ── Mesopotamia ──────────────────────────────────────────────────────────
  'lamb-and-beet-stew-tuhu': {
    meal: 'evening',
    mins: 150,
    concept: 'Red lamb stew',
    tags: ['Lamb', 'Stew', 'One pot'],
  },
  'unwinding-broth-pasrutum': {
    meal: 'midday',
    mins: 50,
    concept: 'Barley and herb pottage',
    tags: ['Vegetarian', 'Grain', 'One pot'],
  },
  'elamite-broth-me-elamutim': {
    meal: 'evening',
    mins: 45,
    concept: 'Dill and blood broth',
    tags: ['Broth', 'Sour', 'Rich'],
  },
  'pigeon-in-broth-amursanu': {
    meal: 'feast',
    mins: 180,
    concept: 'Pot-roast pigeon',
    tags: ['Poultry', 'One pot', 'Bread-lined'],
  },
  'date-and-sesame-confection-mersu': {
    meal: 'sweet',
    mins: 40,
    concept: 'Date and sesame sweet',
    tags: ['Sweet', 'No cooking', 'Vegetarian'],
  },

  'kanasu-broth-me-kanasi': {
    meal: 'evening',
    mins: 80,
    concept: 'Pulses, lamb and mint',
    tags: ['Lamb', 'Pulses', 'One pot'],
  },
  'francolin-broth-me-tarri': {
    meal: 'evening',
    mins: 70,
    concept: 'Game bird broth',
    tags: ['Poultry', 'Broth', 'Lean'],
  },
  'beet-greens-silqu': {
    meal: 'midday',
    mins: 35,
    concept: 'Beetroot tops in broth',
    tags: ['Vegetarian', 'Quick', 'Greens'],
  },

  'desert-truffles-mari': {
    meal: 'midday',
    mins: 40,
    concept: 'Truffles in butter',
    tags: ['Vegetarian', 'Quick', 'Spring'],
  },

  'roast-barley-pilaf-ybc25': {
    meal: 'midday',
    mins: 45,
    concept: 'Toasted barley pilaf',
    tags: ['Grain', 'One pot', 'Blood optional'],
  },
  'kid-stew-with-soured-milk': {
    meal: 'evening',
    mins: 120,
    concept: 'Kid braised in blood',
    tags: ['Goat', 'Stew', 'Rich'],
  },

  // ── Egypt ────────────────────────────────────────────────────────────────
  'emmer-loaves-in-conical-moulds': {
    meal: 'morning',
    mins: 300,
    concept: 'Tall emmer loaves',
    tags: ['Bread', 'Sourdough', 'Vegetarian'],
  },
  'tiger-nut-and-honey-cones': {
    meal: 'sweet',
    mins: 60,
    concept: 'Honeyed nut sweets',
    tags: ['Sweet', 'No cooking', 'Vegetarian'],
  },
  'split-and-salted-nile-fish': {
    meal: 'midday',
    mins: 28800,
    concept: 'Salt-cured whole fish',
    tags: ['Fish', 'Preserve', 'Slow'],
  },
  'emmer-beer-heneqet': {
    meal: 'drink',
    mins: 5760,
    concept: 'Thick emmer beer',
    tags: ['Drink', 'Ferment', 'Slow'],
  },

  // ── Hatti ────────────────────────────────────────────────────────────────
  'thick-loaf-for-the-hearth-harsi': {
    meal: 'morning',
    mins: 180,
    concept: 'Thick hearth loaf',
    tags: ['Bread', 'Vegetarian'],
  },
  'sheep-on-the-huprushi': {
    meal: 'evening',
    mins: 75,
    concept: 'Mutton on the brazier',
    tags: ['Lamb', 'Grill'],
  },

  // ── Canaan and the coast ─────────────────────────────────────────────────
  'seared-cheese-on-the-copper-pan': {
    meal: 'evening',
    mins: 15, concept: 'Fried cheese and greens', tags: ['Dairy', 'Vegetarian', 'Quick', 'Greens'] },
  'brazier-chickpeas-alashiya': {
    meal: 'midday',
    mins: 50, concept: 'Hot chickpeas on bread', tags: ['Pulses', 'Vegetarian', 'One pot', 'Quick'] },
  'emmer-porridge-with-curds-delta': {
    meal: 'morning',
    mins: 40, concept: 'Savoury grain porridge', tags: ['Grain', 'Vegetarian', 'Everyday', 'Quick'] },
  'roast-duck-for-the-gods-table': {
    meal: 'feast',
    mins: 100, concept: 'Whole glazed duck', tags: ['Poultry', 'Roast', 'Feast', 'Sweet'] },
  'caravan-pot-with-dried-curd': {
    meal: 'evening',
    mins: 60, concept: 'Sour grain road pot', tags: ['Grain', 'Vegetarian', 'One pot', 'Sour'] },
  'kabri-palace-wine': {
    meal: 'drink',
    mins: 30,
    concept: 'Spiced palace wine',
    tags: ['Drink', 'Spiced', 'No cooking'],
  },
  'lentils-with-oil-and-cumin-ugarit': {
    meal: 'midday',
    mins: 60,
    concept: 'Cumin lentils in oil',
    tags: ['Pulses', 'Vegetarian', 'Quick'],
  },

  // ── The Aegean ───────────────────────────────────────────────────────────
  'kid-in-the-tripod-cauldron': {
    meal: 'evening',
    mins: 150,
    concept: 'Kid with fennel',
    tags: ['Goat', 'Stew', 'One pot'],
  },
  'fish-baked-on-fennel-amnisos': {
    meal: 'evening',
    mins: 45, concept: 'Whole fish on fennel', tags: ['Fish', 'Roast', 'Quick', 'Lean'] },
  'barley-and-fig-feast-porridge': {
    meal: 'morning',
    mins: 50,
    concept: 'Sweet barley porridge',
    tags: ['Grain', 'Sweet', 'Vegetarian'],
  },
  'honeyed-pork-chops-with-dates': {
    meal: 'evening',
    mins: 30,
    concept: 'Honeyed pork chops',
    tags: ['Pork', 'Roast', 'Quick'],
  },
  'leek-lentil-and-barley-pottage': {
    meal: 'midday',
    mins: 70,
    concept: 'Leek and lentil pottage',
    tags: ['Pulses', 'One pot', 'Meat-free option'],
  },

  // ── Outside the period scope, kept so the map is total ───────────────────
  'egtved-grog': { concept: 'Berry and honey grog', tags: ['Drink', 'Ferment'] },
  'sorghum-flatbread-with-soured-milk': {
    concept: 'Soured sorghum flatbread',
    tags: ['Bread', 'Vegetarian'],
  },
  'millet-porridge-with-hazelnut-and-pork-fat': {
    concept: 'Millet and hazelnut porridge',
    tags: ['Grain', 'Pork'],
  },

  // ── The four bases (fundamentals.js) ─────────────────────────────────────
  'lentil-and-barley-pottage': {
    concept: 'Grain and pulse pot',
    tags: ['Pulses', 'Vegetarian', 'One pot'],
  },
  'hot-pan-flatbread': {
    meal: 'morning',
    mins: 35,
    concept: 'Flatbread in a pan',
    tags: ['Bread', 'Vegetarian', 'Quick'],
  },
  'allium-and-seed-base': {
    concept: 'The flavour base',
    tags: ['Vegetarian', 'Quick', 'Make ahead'],
  },
  'strained-yoghurt': {
    concept: 'Thick strained yoghurt',
    tags: ['Dairy', 'Vegetarian', 'No cooking'],
  },
}

/* Never return undefined. A dish with no card entry still has to render a card, and a
   blank concept line is a better failure than a crash or a hole in the grid. */
export function cardFor(slug) {
  return dishCards[slug] ?? { concept: '', tags: [] }
}
