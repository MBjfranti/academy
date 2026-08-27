// How you can slice the recipe list.
//
// ONE AXIS AT A TIME, not three rows of filters stacked on top of each other. The site's
// standing instruction is "simple UI/UX" and "I don't want to have to click around a ton",
// and a browse page with a kitchen row, a meal row and a time row is three decisions
// before you have looked at a single dish. So there is one small control that says what
// the tab row means, and the tab row itself never changes shape.
//
// MEAL IS AN ANACHRONISM AND IS LABELLED AS ONE. Nobody in the Late Bronze Age ate
// breakfast, lunch and dinner in the modern sense, and the Babylonian tablets never
// mention time of day. But a cook browsing thirty-two dishes is asking "what am I making
// tonight", and that question deserves an answer. The buckets are named for how the food
// behaves — Morning, Midday, Evening, Feast — rather than for any claim about ancient
// timetables.

import { cardFor } from './dishCards'

/* Attested dishes keep their browse metadata in dishCards.js; invented ones carry it on
   themselves, because they have no entry there and never should. This reads whichever
   exists, so the facets work identically across both sections. */
const meta = (dish) => ({ ...cardFor(dish.slug), ...dish })
import { REGION_TO_ACCENT } from './provenance'
import { accents } from './accents'

/** The bands for the Time axis, in minutes of actual work. */
const TIME_BANDS = [
  { key: 'quick', label: 'Under 45 min', test: (m) => m <= 45 },
  { key: 'medium', label: '45 min – 2 hr', test: (m) => m > 45 && m <= 120 },
  { key: 'long', label: 'Over 2 hr', test: (m) => m > 120 && m < 1440 },
  { key: 'days', label: 'Days', test: (m) => m >= 1440 },
]

const MEALS = [
  { key: 'morning', label: 'Morning' },
  { key: 'midday', label: 'Midday' },
  { key: 'evening', label: 'Evening' },
  { key: 'feast', label: 'Feast' },
  { key: 'snack', label: 'Snacks' },
  { key: 'latenight', label: 'Late night' },
  { key: 'sweet', label: 'Something sweet' },
  { key: 'drink', label: 'To drink' },
]

/* Diet is derived from the tags rather than authored again, so it can never disagree with
   what the card already claims. */
const DIETS = [
  { key: 'veg', label: 'No meat', test: (t) => t.includes('Vegetarian') || t.includes('Meat-free option') },
  { key: 'meat', label: 'Meat', test: (t) => ['Lamb', 'Goat', 'Pork', 'Offal', 'Poultry'].some((x) => t.includes(x)) },
  { key: 'fish', label: 'Fish', test: (t) => t.includes('Fish') },
  { key: 'pulses', label: 'Pulses & grain', test: (t) => t.includes('Pulses') || t.includes('Grain') || t.includes('Bread') },
]

export const FACETS = [
  {
    key: 'kitchen',
    label: 'Kitchen',
    note: 'Five kitchens, one pantry. The differences are smaller than the names suggest.',
    options: () => accents.map((a) => ({ key: a.key, label: a.name })),
    match: (dish, key) => !!dish.raw && REGION_TO_ACCENT[dish.raw.region] === key,
  },
  {
    key: 'meal',
    label: 'Meal',
    note: 'The groups describe how the food behaves at the table: morning food, an evening pot, a feast.',
    options: () => MEALS,
    match: (dish, key) => meta(dish).meal === key,
  },
  {
    key: 'time',
    label: 'Time',
    note: 'Time at the hob. Soaking, salting and fermenting wait on their own.',
    options: () => TIME_BANDS.map((b) => ({ key: b.key, label: b.label })),
    match: (dish, key) => {
      const band = TIME_BANDS.find((b) => b.key === key)
      return band ? band.test(meta(dish).mins ?? 9999) : true
    },
  },
  {
    key: 'diet',
    label: 'Diet',
    note: 'The card tags supply these groups.',
    options: () => DIETS.map((d) => ({ key: d.key, label: d.label })),
    match: (dish, key) => {
      const d = DIETS.find((x) => x.key === key)
      return d ? d.test(meta(dish).tags ?? []) : true
    },
  },
]

export const facetByKey = Object.fromEntries(FACETS.map((f) => [f.key, f]))

/** Filter, and count how many land in each option so empty buckets can be hidden. */
export function applyFacet(dishes, facetKey, value) {
  const facet = facetByKey[facetKey]
  if (!facet || value === 'all') return dishes
  return dishes.filter((d) => facet.match(d, value))
}

export function countsFor(dishes, facetKey) {
  const facet = facetByKey[facetKey]
  if (!facet) return {}
  return Object.fromEntries(
    facet.options().map((o) => [o.key, dishes.filter((d) => facet.match(d, o.key)).length]),
  )
}
