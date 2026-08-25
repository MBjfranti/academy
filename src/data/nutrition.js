// Per-serving nutrition, computed rather than asserted.
//
// Two tables and a reducer. No API, no runtime dependency, no licence
// exposure: the composition figures are hand-transcribed from USDA
// FoodData Central, which is US-government work in the public domain.
//
// The honest caveat is at the bottom of this file and is displayed with every
// figure. It is deliberately NOT "ancient cultivars may have differed", which
// is unfalsifiable throat-clearing. The real limitation is narrower and
// sharper: these numbers describe the recipe as written on this site.

/* Per 100 g. kcal · protein · carb · fibre · fat · saturates · iron mg · calcium mg */
const PER_100G = {
  'olive oil':        [884, 0, 0, 0, 100, 13.8, 0.56, 1],
  'leek':             [61, 1.5, 14.2, 1.8, 0.3, 0.04, 2.1, 59],
  'onion':            [40, 1.1, 9.3, 1.7, 0.1, 0.04, 0.21, 23],
  'garlic':           [149, 6.4, 33.1, 2.1, 0.5, 0.09, 1.7, 181],
  'cumin seed':       [375, 17.8, 44.2, 10.5, 22.3, 1.5, 66.4, 931],
  'coriander seed':   [298, 12.4, 55.0, 41.9, 17.8, 0.99, 16.3, 709],
  'pearl barley':     [352, 9.9, 77.7, 15.6, 1.2, 0.24, 2.5, 29],
  'lentils dry':      [352, 24.6, 63.4, 10.7, 1.1, 0.15, 6.5, 35],
  'bay leaf':         [313, 7.6, 75.0, 26.3, 8.4, 2.3, 43.0, 834],
  'fresh herbs':      [50, 3.6, 9.5, 4.5, 1.0, 0.15, 5.8, 220],
  'feta':             [264, 14.2, 4.1, 0, 21.3, 14.9, 0.65, 493],
  'wholemeal flour':  [340, 13.2, 72.0, 10.7, 2.5, 0.43, 3.6, 34],
  'yoghurt whole':    [61, 3.5, 4.7, 0, 3.3, 2.1, 0.05, 121],
  'salt':             [0, 0, 0, 0, 0, 0, 0.03, 24],
  'water':            [0, 0, 0, 0, 0, 0, 0, 0],
}

/* Each ingredient line, mapped to a food and a weight in grams.
   Keyed on the exact string in fundamentals.js, the same way sourcing.js keys
   on market.js — so no ingredient data had to be rewritten to support this. */
const WEIGHTS = {
  // lentil and barley pottage
  'Olive oil, 4 tbsp': ['olive oil', 54],
  'Leeks, 3 large, sliced thin': ['leek', 360],
  'Onion, 1 large, chopped': ['onion', 150],
  'Garlic, 4 cloves, sliced': ['garlic', 12],
  'Cumin seed, 2 tsp': ['cumin seed', 4],
  'Coriander seed, 2 tsp, roughly crushed': ['coriander seed', 4],
  'Pearl barley, 150 g': ['pearl barley', 150],
  'Brown or green lentils, 200 g': ['lentils dry', 200],
  'Water, 1.6 litres': ['water', 1600],
  'Bay leaves, 2': ['bay leaf', 0.5],
  'Salt, 2 tsp, plus more at the end': ['salt', 12],
  'Fresh dill and mint, a large handful, chopped': ['fresh herbs', 20],
  'Brined sheep cheese, 100 g, to crumble over': ['feta', 100],
  'Olive oil to finish, 2 tbsp': ['olive oil', 27],

  // hot-pan flatbread
  'Wholemeal flour, 300 g, plus more for rolling': ['wholemeal flour', 300],
  'Salt, 1 tsp': ['salt', 6],
  'Warm water, 200 ml': ['water', 200],
  'Olive oil, 1 tbsp': ['olive oil', 13.5],

  // allium and seed base
  'Olive oil, 150 ml': ['olive oil', 137],
  'Onions, 4 large, chopped fine': ['onion', 600],
  'Leeks, 2, sliced thin': ['leek', 240],
  'Garlic, 1 whole head, cloves sliced': ['garlic', 45],
  'Cumin seed, 1 tbsp': ['cumin seed', 6],
  'Coriander seed, 1 tbsp, crushed': ['coriander seed', 5],
  'Salt, 1.5 tsp': ['salt', 9],

  // strained yoghurt
  'Full-fat plain sheep, goat or cow yoghurt, 750 g': ['yoghurt whole', 750],
  'Olive oil, to cover': ['olive oil', 15],
}

const FIELDS = ['kcal', 'protein', 'carb', 'fibre', 'fat', 'saturates', 'iron', 'calcium']

export const UNITS = {
  kcal: '', protein: 'g', carb: 'g', fibre: 'g',
  fat: 'g', saturates: 'g', iron: 'mg', calcium: 'mg',
}

export const LABELS = {
  kcal: 'Calories', protein: 'Protein', carb: 'Carbs', fibre: 'Fibre',
  fat: 'Fat', saturates: 'Saturates', iron: 'Iron', calcium: 'Calcium',
}

/* "Serves 4" and "Makes 8" are counts. "Makes about 400 g" is a yield weight,
   not four hundred portions — those get reported for the whole batch instead,
   because a base or a condiment has no serving to divide by. */
function portions(serves = '') {
  if (/\d+\s*(g|kg|ml|l|litres?)\b/i.test(serves)) return { n: 1, basis: 'batch' }
  const m = serves.match(/(\d+)/)
  return { n: m ? Number(m[1]) : 1, basis: 'serving' }
}

/* Returns per-serving totals, or null if we cannot weigh enough of the
   recipe to be honest about it. */
export function nutritionFor(recipe) {
  const items = recipe.ingredients || []
  let known = 0
  const total = Object.fromEntries(FIELDS.map((f) => [f, 0]))

  for (const ing of items) {
    const hit = WEIGHTS[ing.item]
    if (!hit) continue
    const [food, grams] = hit
    const row = PER_100G[food]
    if (!row) continue
    known++
    const scale = grams / 100
    FIELDS.forEach((f, i) => {
      total[f] += row[i] * scale
    })
  }

  // Below three-quarters weighed, a total would mislead more than it informs.
  if (!items.length || known / items.length < 0.75) return null

  const { n, basis } = portions(recipe.serves)
  const per = Object.fromEntries(FIELDS.map((f) => [f, total[f] / n]))

  return { per, portions: n, basis, weighed: known, of: items.length }
}

export function fmt(field, value) {
  if (field === 'kcal') return String(Math.round(value / 5) * 5)
  if (field === 'calcium' || field === 'iron') {
    return value >= 10 ? String(Math.round(value)) : value.toFixed(1)
  }
  return value >= 10 ? String(Math.round(value)) : value.toFixed(1)
}

export const FIELD_ORDER = FIELDS

export const CAVEAT =
  'These are our numbers, not theirs. They describe this recipe as written here, cooked from a modern supermarket and divided by our own serving count — and no Bronze Age text records a quantity, so the amounts are ours to begin with.'
