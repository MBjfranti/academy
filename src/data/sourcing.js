// ── Sourcing levels ──────────────────────────────────────────────────────
//
// The hard rule: every substitute below is still attested for the region and
// the period. We will happily send you to a supermarket. We will not send you
// outside the Bronze Age. Where nothing in an ordinary shop is both legal and
// close, we say so and tell you to leave it out — we never quietly reach for
// a tomato.

export const LEVELS = {
  attested: {
    key: 'attested',
    label: 'As attested',
    blurb: 'The exact thing, as far as it can be identified.',
    detail:
      'Emmer, sheep-tail fat, kurrat, bog myrtle. Some of this means a specialist supplier or a farm; a little of it means growing something yourself. Cook at this level when the point is the dish exactly as it was.',
  },
  specialist: {
    key: 'specialist',
    label: 'Good deli',
    blurb: 'Obtainable with a bit of effort, from a decent shop or online.',
    detail:
      'Spelt for emmer, mastic for terebinth, sheep yoghurt for soured milk. Everything is close in behaviour and flavour, and everything is still period-legal. This is where most cooking here actually happens.',
  },
  everyday: {
    key: 'everyday',
    label: 'Ordinary shop',
    blurb: 'What a normal grocery has, without leaving the Bronze Age.',
    detail:
      'Wholemeal flour, barley, lentils, lamb, butter, plain yoghurt. Every swap at this level is still something the region grew, herded or traded in the period. Where an ordinary shop has nothing legal, we tell you to leave it out rather than fake it.',
  },
}

export const LEVEL_ORDER = ['attested', 'specialist', 'everyday']

// Keyed by the exact ingredient text used in the collection.
// `null` at a level means: there is no legal substitute at that level.
export const SUBS = {
  // ── grain ──
  'Wholemeal emmer flour': {
    specialist: { name: 'Wholemeal spelt flour' },
    everyday: {
      name: 'Wholemeal wheat flour',
      note: 'Free-threshing, so it skips the parching and pounding. The crumb comes out lighter and softer than it should be — accept it, or hold back a tenth of the water.',
    },
  },
  'Emmer flour, wholemeal': {
    specialist: { name: 'Wholemeal spelt flour' },
    everyday: { name: 'Wholemeal wheat flour', note: 'Lighter crumb than emmer gives. Hold back a little water.' },
  },
  'Emmer or barley, malted — sprouted and dried': {
    specialist: { name: 'Barley, malted at home — sprouted and dried' },
    everyday: { name: 'Cracked pale malt from a brewshop, or malt extract' },
  },
  'Emmer or barley, unmalted, coarsely cracked': {
    specialist: { name: 'Pot barley, coarsely cracked' },
    everyday: { name: 'Pearl barley, coarsely cracked' },
  },
  'Barley flour': { everyday: { name: 'Pearl barley, ground fine in a blender' } },
  'Sorghum flour': {
    everyday: {
      name: 'Millet flour',
      note: 'Also an African Bronze Age grain, and a different one. Say which you used.',
    },
  },
  'Broomcorn millet, whole': { everyday: { name: 'Millet, whole' } },
  'Wheat, malted and cracked': {
    specialist: { name: 'Wheat, malted at home' },
    everyday: { name: 'Cracked pale wheat malt from a brewshop' },
  },

  // ── fat ──
  'Sheep-tail fat, or lamb fat trimmed from the leg': {
    specialist: { name: 'Lamb fat, trimmed from the leg' },
    everyday: {
      name: 'Butter, unsalted',
      note: 'Butter is thoroughly attested across the region. It is not what a Babylonian cook would have reached for first, and the dish loses some of its mutton depth.',
    },
  },
  'Sheep fat': { specialist: { name: 'Lamb fat' }, everyday: { name: 'Butter, unsalted' } },
  'Lamb or sheep fat': { everyday: { name: 'Butter, unsalted' } },
  'Clarified butter, or sheep fat': { everyday: { name: 'Ghee, or ordinary butter' } },
  'Butter or sheep fat, softened': { everyday: { name: 'Butter, softened' } },
  'Butter or sheep fat, melted': { everyday: { name: 'Butter, melted' } },
  'Pork fat, or lard': { everyday: { name: 'Lard, or butter' } },
  'Moringa oil, or a mild oil, for the hands': {
    specialist: { name: 'A mild olive oil' },
    everyday: { name: 'Any mild oil' },
  },

  // ── dairy & sour ──
  'Soured milk — thick, live, unsweetened': {
    specialist: { name: 'Strained sheep or goat yoghurt' },
    everyday: { name: 'Plain full-fat yoghurt, unsweetened' },
  },
  'Soured milk': {
    specialist: { name: 'Strained sheep or goat yoghurt' },
    everyday: { name: 'Plain full-fat yoghurt' },
  },
  'Soured milk, or thin live yoghurt': { everyday: { name: 'Plain yoghurt, loosened with water' } },
  'Milk, or the whey from cheesemaking': { everyday: { name: 'Whole milk' } },
  'Fresh curd cheese, to finish': { everyday: { name: 'Ricotta, or cottage cheese' } },
  'Hard sheep cheese, to grate over': { everyday: { name: 'Pecorino, or any hard sheep cheese' } },

  // ── alliums & herbs ──
  'Persian shallot': {
    specialist: { name: 'Persian shallot, dried — from an Iranian or Iraqi grocer' },
    everyday: {
      name: 'Banana shallots, plus an extra clove of garlic',
      note: 'The ancient word is unidentified anyway, so this is a stand-in for a guess. Declared rather than hidden.',
    },
  },
  'Kurrat, or the green tops of young leeks': {
    specialist: { name: 'Kurrat, from a Middle Eastern grocer' },
    everyday: { name: 'Green tops of young leeks, or spring onion greens' },
  },
  'Bog myrtle (sweet gale), dried': {
    specialist: { name: 'Bog myrtle (sweet gale), dried — from a herbalist' },
    everyday: {
      name: null,
      note: 'No ordinary shop carries a legal stand-in. Yarrow is the only other northern European bittering herb worth trying and it is not what was in the bucket. Better to wait until you can get bog myrtle.',
    },
  },
  'Cyperus (galingale), ground — or omit': {
    specialist: { name: 'Dried galangal, a small piece' },
    everyday: { name: null, note: 'Leave it out. The identification is unresolved and the dish does not depend on it.' },
  },
  'Cyperus root (galingale), or a small piece of dried galangal': {
    everyday: { name: null, note: 'Leave it out rather than reach for something the Levant never saw.' },
  },
  'Myrtle leaves': { everyday: { name: null, note: 'Omit. Bay is not the same plant and not the same period.' } },

  // ── resins ──
  'Terebinth resin (mastic works, and is the same family)': {
    specialist: { name: 'Mastic tears, from a Greek or Middle Eastern grocer' },
    everyday: {
      name: null,
      note: 'Nothing in a supermarket does this job legally. Mastic keeps for years, so it is worth ordering once — without a resin this is simply spiced wine, not the Kabri formula.',
    },
  },
  'Storax, or styrax benzoin resin': {
    specialist: { name: 'Additional mastic' },
    everyday: { name: null, note: 'Omit, and say you omitted it.' },
  },

  // ── meat & fish ──
  'Kid goat, shoulder and leg, on the bone': {
    specialist: { name: 'Kid goat, shoulder and leg, on the bone' },
    everyday: {
      name: 'Lamb shoulder, on the bone',
      note: 'Both are in the Linear B flock tablets. Goat was the everyday animal; lamb is the one your butcher has.',
    },
  },
  'Mutton or hogget shoulder, boned and butterflied': {
    specialist: { name: 'Hogget shoulder, boned and butterflied' },
    everyday: { name: 'Lamb shoulder, boned and butterflied', note: 'Milder. The Hittites were eating older animals.' },
  },
  'Mutton or older lamb, on the bone': { everyday: { name: 'Lamb shoulder, on the bone' } },
  'Pigeon, or squab': {
    specialist: { name: 'Squab, from a game butcher' },
    everyday: {
      name: 'Quail, six of them',
      note: 'Attested as a table bird in the region. Chicken is not — it is not a Bronze Age staple anywhere in this Academy, so we do not offer it.',
    },
  },
  'Whole grey mullet, tilapia, or any firm oily fish': {
    specialist: { name: 'Whole grey mullet or tilapia' },
    everyday: { name: 'Mackerel or sardines, whole' },
  },

  // ── produce ──
  'Tiger nuts, dried': {
    specialist: { name: 'Tiger nuts, dried — sold for horchata de chufa' },
    everyday: {
      name: null,
      note: 'There is no substitute and no point pretending otherwise. They keep for a year dry, so order once and make this whenever you like.',
    },
  },
  'Pistachios, coarsely broken': { everyday: { name: 'Pistachios, or almonds' } },
  'Wild apple, grated, or a sharp eating apple': { everyday: { name: 'A sharp eating apple, grated' } },
  'Lingonberries (cowberries)': {
    specialist: { name: 'Lingonberries, frozen or preserved' },
    everyday: { name: 'Redcurrants, or extra cranberries' },
  },
  'Rocket / arugula, roughly chopped': { everyday: { name: 'Rocket, roughly chopped' } },
  'Beetroot, peeled and cut in wedges': { everyday: { name: 'Beetroot, peeled and cut in wedges' } },

  // ── liquid ──
  'Barley beer, unhopped and cloudy': {
    specialist: { name: 'An unhopped gruit ale, or a home-brewed barley beer' },
    everyday: {
      name: 'Cloudy unfiltered wheat beer, the least bitter you can find',
      note: 'Hops are medieval and have no business here. Pick for absence of bitterness above all.',
    },
  },
  'Barley beer': { everyday: { name: 'Cloudy wheat beer, low in bitterness' } },
  'Red wine, dry, unoaked, low in tannin': { everyday: { name: 'Any dry, light, unoaked red' } },
  'Olive oil, unfiltered': { everyday: { name: 'Extra virgin olive oil' } },
}

/* Resolve one ingredient at a sourcing level. Falls back up the chain, so an
   ingredient with no entry simply stays as attested at every level. */
export function resolve(item, level) {
  const entry = SUBS[item.modern]
  if (!entry || level === 'attested') {
    return { name: item.modern, qty: item.qty, note: null, swapped: false, omit: false }
  }

  const chosen = level === 'everyday' ? entry.everyday || entry.specialist : entry.specialist
  if (!chosen) return { name: item.modern, qty: item.qty, note: null, swapped: false, omit: false }

  if (chosen.name === null) {
    return { name: item.modern, qty: item.qty, note: chosen.note, swapped: false, omit: true }
  }

  return {
    name: chosen.name,
    qty: chosen.qty || item.qty,
    note: chosen.note || null,
    swapped: chosen.name !== item.modern,
    omit: false,
  }
}

/* How many lines a level actually changes, and how many it makes impossible. */
export function levelImpact(recipe, level) {
  let swapped = 0
  let omitted = 0
  for (const group of recipe.ingredientGroups) {
    for (const item of group.items) {
      const r = resolve(item, level)
      if (r.omit) omitted++
      else if (r.swapped) swapped++
    }
  }
  return { swapped, omitted }
}
