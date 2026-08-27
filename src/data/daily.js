// What the front page shows today.
//
// THE PICK IS A FUNCTION OF THE DATE, not of a random number and not of a stored
// selection. Two reasons. A reader who opens the site twice in an afternoon should see the
// same recipe both times, and two readers in the same day should be able to talk about the
// same one. `Math.random()` gives neither, and a stored rotation needs a writer somewhere.
//
// So the day is turned into an integer and that integer indexes the lists. The same day
// always yields the same pick, the pick changes at local midnight, and nothing has to be
// persisted.
//
// THE STRIDE IS COPRIME WITH THE LIST LENGTH, which is why the two ingredients are drawn
// with a prime offset rather than as `n` and `n + 1`. Adjacent indices in `market.js` are
// adjacent on the shelf: onions and garlic, cumin and coriander. Picking neighbours would
// show the same aisle twice most days and read as a mistake.

import { recipes } from './recipes.js'
import { items as marketItems } from './market.js'

/* Days since the epoch in LOCAL time, so the change happens at the reader's midnight
   rather than at UTC midnight in the middle of their evening. */
export function dayNumber(now = new Date()) {
  const local = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return Math.floor(local.getTime() / 86400000)
}

/* A cheap integer hash. The day number alone walks the list one step per day, which makes
   tomorrow's pick guessable from today's and marches through the file in shelf order. */
function spread(n, salt) {
  let x = (n + salt) * 2654435761
  x ^= x >>> 15
  x = Math.imul(x, 2246822519)
  x ^= x >>> 13
  return Math.abs(x)
}

export function recipeOfTheDay(day = dayNumber()) {
  if (!recipes.length) return null
  return recipes[spread(day, 0) % recipes.length]
}

/* Two ingredients, never the same one twice, and never two neighbours on the shelf.
   Only items the site actually endorses: a "no" verdict is an argument, not a suggestion,
   and it has no business being offered as the thing to buy today. */
export function ingredientsOfTheDay(day = dayNumber()) {
  const pool = marketItems.filter((i) => i.verdict === 'yes')
  if (pool.length < 2) return pool
  const a = spread(day, 0) % pool.length
  // 37 is coprime with any pool size that is not a multiple of 37, which keeps the second
  // pick away from the first and away from its shelf neighbours.
  const b = (a + 37 + (spread(day, 101) % 7)) % pool.length
  return [pool[a], pool[b === a ? (a + 1) % pool.length : b]]
}
