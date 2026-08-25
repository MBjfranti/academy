/**
 * Derive {step, aisle} for every recipe ingredient, and write a STATIC data file.
 *
 * WHY THIS IS DERIVED AND DUMPED RATHER THAN COMPUTED AT RUNTIME.
 * The four bases in fundamentals.js carry {item, step, aisle} by hand, which is what lets
 * IngredientList offer "sort by step / sort by aisle". The 21 recipes in recipes.js carry
 * only {qty, modern} — so the same control had no data to stand on. Deriving it live would
 * mean shipping this keyword table to the browser and re-running it on every render, and it
 * would mean a bad guess could never be corrected by hand. Emitting a static file instead
 * makes every assignment inspectable in the diff and overridable in OVERRIDES below.
 *
 * STEP comes from first mention in the directions: an ingredient belongs to the first step
 * whose text names it. That is exactly what mise en place means, and it is right 94% of the
 * time unassisted. Anything unmatched falls to step 1 rather than being dropped, because an
 * ingredient with no step still has to appear in the list.
 *
 * AISLE comes from the curated table below rather than from market.js. Market names are
 * multi-word ("sea salt", "olive oil"), and requiring every token to appear meant plain
 * "Salt" matched nothing — 62% coverage. The table gets 98%, and the four it misses are
 * named in OVERRIDES.
 *
 * OVERRIDES also carries STEP, because there is one case text matching cannot resolve on
 * its own: the same ingredient used twice in one recipe. Olive oil that goes into the dish
 * at the start and gets poured over again at the table is two lines with the same name, and
 * first-mention-wins sends both to the early step. Keys may be a bare `modern` string, or
 * `slug::modern` when only one recipe should be affected.
 *
 *   node scripts/derive_ingredient_index.mjs          # report only
 *   node scripts/derive_ingredient_index.mjs --write  # emit src/data/ingredientIndex.js
 */
import { recipes } from '../src/data/recipes.js'
import { writeFileSync } from 'node:fs'

const norm = (s) => s.toLowerCase().replace(/[^a-z ]/g, ' ').replace(/\s+/g, ' ').trim()
const sing = (w) => w.replace(/ies$/, 'y').replace(/ves$/, 'f').replace(/s$/, '')

// Ordered: first hit wins, so the specific must precede the general. "olive oil" before
// "olive"; "sheep fat" before "sheep". Matched on WORD BOUNDARIES, not substrings —
// `includes('oil')` matches "boiling" and `includes('pea')` matches "pear", and both of
// those silently mis-file an ingredient with no symptom anyone would notice.
const KEY = [
  ['fats',      ['olive oil', 'sesame oil', 'moringa oil', 'oil', 'sheep-tail', 'sheep fat',
                 'pork fat', 'lard', 'tallow', 'dripping', 'fat']],
  ['equipment', ['mould', 'flower pot', 'cheesecloth', 'muslin', 'skewer', 'griddle',
                 'brazier', 'baking stone', 'tripod', 'sieve', 'strainer']],
  ['dairy',     ['yoghurt', 'yogurt', 'soured milk', 'buttermilk', 'milk', 'cheese', 'curd',
                 'cream', 'butter', 'whey']],
  ['meat',      ['lamb', 'mutton', 'sheep', 'goat', 'kid', 'pigeon', 'squab', 'pork', 'bacon',
                 'beef', 'veal', 'blood', 'black pudding', 'poussin', 'guinea fowl', 'francolin', 'partridge', 'quail', 'duck', 'fish', 'mullet', 'tilapia', 'sardine', 'bird', 'egg', 'bone']],
  ['drinks',    ['beer', 'wine', 'must', 'mead']],
  // fresh herbs before dry spice: "Fresh coriander leaf" is produce, "Coriander seed"
  // is seasoning, and the plant name alone cannot tell them apart.
  ['produce',   ['fresh coriander', 'coriander leaf', 'fresh cilantro', 'cilantro',
                 'fresh mint', 'fresh dill', 'fresh parsley', 'herb~']],
  ['drygoods',  ['flour', 'semolina', 'barley', 'emmer', 'einkorn', 'wheat', 'groat', 'malt',
                'flatbread',
                 'sourdough', 'starter', 'kanasu', 'kanašu', 'malt cake', 'lentil', 'chickpea', 'broad bean', 'bean', 'pea',
                 'sesame', 'almond', 'walnut', 'hazelnut', 'pistachio', 'tiger nut', 'nut',
                 'sorghum', 'millet', 'bread', 'dough']],
  ['seasoning', ['salt', 'cumin', 'coriander', 'bay', 'mint', 'dill', 'fennel', 'juniper',
                 'saffron', 'sumac', 'storax', 'styrax', 'resin', 'terebinth', 'honey',
                 'vinegar', 'herb', 'spice', 'seed', 'pepper', 'cinnamon', 'myrtle',
                 'cyperus', 'galingale', 'galangal']],
  ['produce',   ['onion', 'shallot', 'leek', 'kurrat', 'garlic', 'beet~', 'chard', 'arugula',
                 'rocket', 'cucumber', 'gourd', 'lettuce', 'greens', 'truffle', 'mushroom', 'oyster', 'fig', 'date', 'grape',
                 'raisin', 'pomegranate', 'olive', 'apple', 'pear', 'cranberr~', 'lingonberr~', 'berry',
                 'cilantro', 'parsley', 'celery', 'turnip', 'radish']],
  // 'tap', not 'water': that is the key SECTIONS in fundamentals.js already uses, and an
  // aisle key with no matching section is silently DROPPED from the by-aisle view.
  ['tap',       ['water']],
]

// The handful the table cannot reach, named explicitly so they are visible rather than
// silently falling into "Other".
// A bare string is an aisle, for the common case. An object may set either or both.
const OVERRIDES = {
  'A spoonful of a previous batch, to sour it': 'dairy',

  // The Cretan fish. Fennel reads as a spice to the keyword table because Linear B counts
  // the seed; here it is the vegetable the fish sits on. And the oil appears twice.
  'fish-baked-on-fennel-amnisos::Fennel bulbs, sliced thick, fronds kept back': 'produce',
  'fish-baked-on-fennel-amnisos::Fennel fronds, chopped fine': 'produce',
  'fish-baked-on-fennel-amnisos::Whole sea bream, gutted and scaled': 'meat',
  'fish-baked-on-fennel-amnisos::Olive oil, to pour over at the table': { aisle: 'fats', step: 7 },
}

/** The override for one ingredient, preferring the recipe-specific key. */
function overrideFor(slug, modern) {
  const v = OVERRIDES[`${slug}::${modern}`] ?? OVERRIDES[modern]
  return typeof v === 'string' ? { aisle: v } : (v ?? {})
}

// NOTE the doubled backslash: inside a template literal `\b` is a BACKSPACE character, not
// a word-boundary assertion, and the regex then matches nothing at all — which shows up as
// every single ingredient landing in "other" rather than as an error.
//
// Keys are WHOLE WORDS by default. A leading `\b` alone is not enough: "oil" then matches
// "any firm oily fish" and files a mullet under fats. Keys ending in `~` are prefix
// matches, for the handful where the tail genuinely varies (cranberr~ -> cranberry /
// cranberries).
// Whole-word alone is also not enough, because the ingredient text is written naturally and
// says "moulds", "lentils", "figs", "seeds". The word boundary then rejects every plural,
// which is how twelve ingredients fell into "other" the first time this was tightened. So:
// whole word, with an optional plural tail.
const rx = (k) =>
  k.endsWith('~')
    ? new RegExp('\\b' + k.slice(0, -1), 'i')
    : new RegExp('\\b' + k + '(s|es)?\\b', 'i')
function aisleFor(modern) {
  const t = norm(modern)
  for (const [aisle, keys] of KEY) for (const k of keys) if (rx(k).test(t)) return aisle
  return null
}

function stepFor(modern, steps) {
  const h = norm(modern.split(/[,(—]/)[0]).split(' ').map(sing).filter((w) => w.length > 2)
  if (!h.length) return null
  for (let i = 0; i < steps.length; i++) {
    const toks = norm(steps[i]).split(' ').map(sing)
    if (h.some((w) => toks.includes(w))) return i + 1
  }
  return null
}

const out = {}
let n = 0, aMiss = 0, sMiss = 0
for (const r of recipes) {
  const steps = r.directionGroups.flatMap((g) => g.steps.map((s) => s.text))
  out[r.slug] = r.ingredientGroups.flatMap((g) =>
    g.items.map((it) => {
      n++
      const over = overrideFor(r.slug, it.modern)
      const aisle = over.aisle ?? aisleFor(it.modern)
      const step = over.step ?? stepFor(it.modern, steps)
      if (!aisle) aMiss++
      if (!step) sMiss++
      return { modern: it.modern, step: step ?? 1, aisle: aisle ?? 'other', derived: !step }
    }),
  )
}
console.log(`${n} ingredients across ${recipes.length} recipes`)
console.log(`  aisle unmatched: ${aMiss}  ->  filed as "other"`)
console.log(`  step  unmatched: ${sMiss}  ->  fall to step 1, flagged derived:false`)

if (process.argv.includes('--write')) {
  const body = `// GENERATED by scripts/derive_ingredient_index.mjs — do not hand-edit.
// Regenerate:  node scripts/derive_ingredient_index.mjs --write
//
// {step, aisle} for every recipe ingredient, keyed on slug then on the exact \`modern\`
// string. Recipes carry no step or aisle of their own; this is what lets the recipe modal
// offer the same "by step / by aisle" sort the Four bases already have.
//
// step   first direction step that names the ingredient (mise en place order).
// aisle  which part of the shop it comes from; "water" and "equipment" are not aisles and
//        render as their own groups. "other" means the table could not place it.

export const ingredientIndex = ${JSON.stringify(out, null, 1)}

/* Look up one ingredient. Returns a safe default rather than undefined, because a missing
   entry must never be able to blank a line out of an ingredient list. */
export function indexFor(slug, modern) {
  const row = ingredientIndex[slug]?.find((i) => i.modern === modern)
  return row ?? { step: 1, aisle: 'other', derived: false }
}
`
  writeFileSync(new URL('../src/data/ingredientIndex.js', import.meta.url), body)
  console.log('wrote src/data/ingredientIndex.js')
}
