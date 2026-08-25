import { recipes } from './recipes'
import { names } from './kitchen'
import { IN_SCOPE } from './provenance'
import { invented } from './invented'
import { basics } from './fundamentals'
import { indexFor } from './ingredientIndex'

/* ONE FLAT SHAPE FOR EVERY DISH, in one place.
 *
 * This used to live inside Recipes.jsx, which was fine while the grid was the only thing
 * that needed it. Now that a dish also has a page of its own at /recipes/:slug, two routes
 * need the identical object — and a flattening rule that exists twice is a flattening rule
 * that will disagree with itself.
 *
 * WHAT IT RECONCILES. Recipes carry ingredients GROUPED, with no step and no aisle. The
 * four bases and the invented dishes carry a FLAT list that already has both. The derived
 * index (ingredientIndex.js) supplies the missing halves so a single component can sort
 * either by step or by aisle without caring where the dish came from.
 */

// A couple of dishes are also among the Four bases. One dish, one home.
const alreadyABase = new Set(basics.map((b) => b.slug))
const inScope = recipes.filter((r) => IN_SCOPE.has(r.region) && !alreadyABase.has(r.slug))

function toDish(r) {
  const steps = r.directionGroups.flatMap((g) => g.steps.map((s) => s.text))
  const ingredients = r.ingredientGroups.flatMap((g) =>
    g.items.map((it) => {
      const ix = indexFor(r.slug, it.modern)
      return {
        // qty first: a cook reads the amount before the thing.
        item: it.qty ? `${it.modern}, ${it.qty}` : it.modern,
        step: ix.step,
        aisle: ix.aisle,
      }
    }),
  )
  return {
    slug: r.slug,
    name: names[r.slug]?.common || r.title,
    say: names[r.slug]?.say,
    ancient: r.ancient,
    // The intro, not the summary. `summary` is a one-line hook for a list; `intro` is the
    // paragraph written to be read once the dish is open, which is what this is.
    line: r.intro,
    serves: r.serves,
    time: r.time,
    ingredients,
    steps,
    raw: r,
  }
}

export const attestedDishes = inScope.map(toDish)

/* The invented dishes already carry the flat {item, step, aisle} shape — the same one the
   Four bases use — so they need no adapter. They are a SEPARATE POOL, never merged, so no
   count or filter on the attested side can ever include one. */
export const inventedDishes = invented

/* The two pools DO come together for exactly one purpose: resolving a URL. /recipes/:slug
   has to find a dish whichever pool it is in, and the page then tells the reader which one
   it found. This is a lookup table, not a merged collection — nothing counts or filters
   over it. */
export const dishBySlug = Object.fromEntries(
  [...attestedDishes, ...inventedDishes].map((d) => [d.slug, d]),
)

/** Is this dish a reconstruction from the tablets, or a modern invention? */
export const isInvented = (dish) => !dish?.raw
