// Seven representative days, and their daily average.
//
// WHY A WEEK. A single day is the wrong unit for judging a diet, and it is a particularly
// wrong unit for THIS diet. The foods that carry the scarce nutrients here are not eaten
// daily and never were: fish carries EPA+DHA, vitamin D and iodine; liver carries vitamin A
// in a quantity nothing else in the corpus approaches; dairy carries calcium and iodine.
// Score one lamb-and-lentils day and you conclude the pantry fails on vitamin A. Score a
// week that contains liver once — which is how offal was actually eaten — and it does not.
//
// So the week is not a way of flattering the numbers. It is a way of asking the question at
// the frequency the food was actually eaten at.
//
// NOTHING HERE CHANGES THE RECIPES. Every day is assembled from the same ingredient corpus
// the Market sells and the recipes cook from. The variation is in WHICH foods appear on
// WHICH day, which is the whole point.
//
// The seven days are meant to be plausible rather than optimal. In particular:
//   · Fish twice, not daily. Coastal households ate more; inland ones far less.
//   · Liver once. Offal was eaten, and it was not eaten every day.
//   · Two days with no meat at all, because most days in most households had none.
//   · Wine or beer most days, scored separately from food.

import { totalsFor, KEYS } from './nutrients.js'

export const days = [
  {
    key: 'mon',
    name: 'Monday',
    theme: 'Lentil and barley pottage',
    note: 'The everyday meal of the entire region. Grain and pulse in one pot, bread and cheese beside it.',
    items: [
      { food: 'wholemeal flatbread', g: 260, as: 'Emmer flatbread' },
      { food: 'strained yoghurt', g: 120, as: 'Strained sheep yoghurt' },
      { food: 'figs, dried', g: 30, as: 'Dried figs' },
      { food: 'barley, pearl, dry', g: 70, as: 'Pearl barley' },
      { food: 'lentils, dry', g: 75, as: 'Brown lentils' },
      { food: 'leek', g: 90, as: 'Leek' },
      { food: 'onion', g: 90, as: 'Onion' },
      { food: 'garlic', g: 8, as: 'Garlic' },
      { food: 'olive oil', g: 26, as: 'Olive oil' },
      { food: 'brined sheep cheese', g: 50, as: 'Brined sheep cheese' },
      { food: 'chard', g: 120, as: 'Chard' },
      { food: 'fresh herbs', g: 8, as: 'Mint and dill' },
      { food: 'sesame seeds', g: 10, as: 'Sesame' },
      { food: 'wine, red', g: 180, as: 'Wine, cut with water' },
      { food: 'salt, sea', g: 1.5, as: 'Sea salt' },
    ],
  },
  {
    key: 'tue',
    name: 'Tuesday',
    theme: 'Grilled sardines',
    note: 'The fish day, and the single most consequential day of the week. EPA+DHA, vitamin D and iodine all arrive here or not at all.',
    marks: ['fish'],
    items: [
      { food: 'wholemeal flatbread', g: 300, as: 'Emmer flatbread' },
      { food: 'strained yoghurt', g: 100, as: 'Strained sheep yoghurt' },
      { food: 'grapes', g: 100, as: 'Grapes' },
      { food: 'sardines, grilled', g: 140, as: 'Sardines, grilled whole' },
      { food: 'barley, pearl, dry', g: 70, as: 'Pearl barley' },
      { food: 'chard', g: 150, as: 'Chard, wilted with garlic' },
      { food: 'onion', g: 80, as: 'Onion' },
      { food: 'garlic', g: 8, as: 'Garlic' },
      { food: 'olive oil', g: 24, as: 'Olive oil' },
      { food: 'fresh herbs', g: 8, as: 'Herbs' },
      { food: 'pomegranate', g: 80, as: 'Pomegranate' },
      { food: 'wine, red', g: 180, as: 'Wine, cut with water' },
      { food: 'salt, sea', g: 1.4, as: 'Sea salt' },
    ],
  },
  {
    key: 'wed',
    name: 'Wednesday',
    theme: 'Chickpeas, greens and bread',
    note: 'A meatless day, which most days were. Pulses carry the protein and the fibre.',
    marks: ['meatless'],
    items: [
      { food: 'wholemeal flatbread', g: 250, as: 'Emmer flatbread' },
      { food: 'milk, sheep', g: 200, as: 'Sheep milk, soured' },
      { food: 'figs, dried', g: 40, as: 'Dried figs' },
      { food: 'chickpeas, dry', g: 105, as: 'Chickpeas' },
      { food: 'leek', g: 100, as: 'Leek' },
      { food: 'onion', g: 80, as: 'Onion' },
      { food: 'garlic', g: 8, as: 'Garlic' },
      { food: 'olive oil', g: 30, as: 'Olive oil' },
      { food: 'brined sheep cheese', g: 45, as: 'Brined sheep cheese' },
      { food: 'cucumber', g: 120, as: 'Cucumber' },
      { food: 'fresh herbs', g: 10, as: 'Herbs' },
      { food: 'sesame seeds', g: 12, as: 'Sesame' },
      { food: 'emmer beer', g: 400, as: 'Emmer beer' },
      { food: 'salt, sea', g: 1.5, as: 'Sea salt' },
    ],
  },
  {
    key: 'thu',
    name: 'Thursday',
    theme: 'Lamb liver with onions',
    note: 'Offal once a week. One 90 g portion supplies several weeks of vitamin A on its own, which is exactly why a single day is the wrong unit to judge this diet on.',
    marks: ['liver'],
    items: [
      { food: 'wholemeal flatbread', g: 290, as: 'Emmer flatbread' },
      { food: 'strained yoghurt', g: 120, as: 'Strained sheep yoghurt' },
      { food: 'lamb liver', g: 90, as: 'Lamb liver, quickly fried' },
      { food: 'onion', g: 150, as: 'Onion, cooked down' },
      { food: 'garlic', g: 8, as: 'Garlic' },
      { food: 'olive oil', g: 26, as: 'Olive oil' },
      { food: 'barley, pearl, dry', g: 80, as: 'Pearl barley' },
      { food: 'chard', g: 120, as: 'Chard' },
      { food: 'fresh herbs', g: 8, as: 'Herbs' },
      { food: 'figs, dried', g: 30, as: 'Dried figs' },
      { food: 'walnuts', g: 15, as: 'Walnuts' },
      { food: 'wine, red', g: 180, as: 'Wine, cut with water' },
      { food: 'salt, sea', g: 1.4, as: 'Sea salt' },
    ],
  },
  {
    key: 'fri',
    name: 'Friday',
    theme: 'Broad beans, eggs and cheese',
    note: 'The other meatless day. Eggs and dairy do the work meat does elsewhere in the week.',
    marks: ['meatless'],
    items: [
      { food: 'wholemeal flatbread', g: 260, as: 'Emmer flatbread' },
      { food: 'egg, hen', g: 110, as: 'Eggs, two' },
      { food: 'broad beans, dry', g: 100, as: 'Broad beans' },
      { food: 'leek', g: 90, as: 'Leek' },
      { food: 'onion', g: 70, as: 'Onion' },
      { food: 'garlic', g: 8, as: 'Garlic' },
      { food: 'olive oil', g: 28, as: 'Olive oil' },
      { food: 'brined sheep cheese', g: 60, as: 'Brined sheep cheese' },
      { food: 'strained yoghurt', g: 100, as: 'Strained yoghurt' },
      { food: 'cucumber', g: 100, as: 'Cucumber' },
      { food: 'fresh herbs', g: 10, as: 'Herbs' },
      { food: 'grapes', g: 100, as: 'Grapes' },
      { food: 'emmer beer', g: 400, as: 'Emmer beer' },
      { food: 'salt, sea', g: 1.5, as: 'Sea salt' },
    ],
  },
  {
    key: 'sat',
    name: 'Saturday',
    theme: 'Grey mullet, split and grilled',
    note: 'The second fish day. Two fish days a week is the assumption the whole week turns on — see the sensitivity note below.',
    marks: ['fish'],
    items: [
      { food: 'wholemeal flatbread', g: 290, as: 'Emmer flatbread' },
      { food: 'grey mullet, grilled', g: 150, as: 'Grey mullet, grilled' },
      { food: 'strained yoghurt', g: 100, as: 'Strained yoghurt' },
      { food: 'barley, pearl, dry', g: 75, as: 'Pearl barley' },
      { food: 'lentils, dry', g: 60, as: 'Lentils' },
      { food: 'chard', g: 140, as: 'Chard' },
      { food: 'onion', g: 80, as: 'Onion' },
      { food: 'garlic', g: 8, as: 'Garlic' },
      { food: 'olive oil', g: 26, as: 'Olive oil' },
      { food: 'fresh herbs', g: 8, as: 'Herbs' },
      { food: 'pomegranate', g: 80, as: 'Pomegranate' },
      { food: 'wine, red', g: 180, as: 'Wine, cut with water' },
      { food: 'salt, sea', g: 1.4, as: 'Sea salt' },
    ],
  },
  {
    key: 'sun',
    name: 'Sunday',
    theme: 'Roast kid, and mersu after',
    note: 'The feast. Meat, wine and something sweet — the day the surviving recipe corpus over-represents, which is why it is one day in seven here and not the model for all of them.',
    marks: ['feast'],
    items: [
      { food: 'wholemeal flatbread', g: 250, as: 'Emmer flatbread' },
      { food: 'kid or goat, lean', g: 160, as: 'Kid, roasted' },
      { food: 'barley, pearl, dry', g: 50, as: 'Barley, alongside' },
      { food: 'strained yoghurt', g: 100, as: 'Strained yoghurt' },
      { food: 'leek', g: 80, as: 'Leek' },
      { food: 'onion', g: 80, as: 'Onion' },
      { food: 'garlic', g: 8, as: 'Garlic' },
      { food: 'olive oil', g: 30, as: 'Olive oil' },
      { food: 'chard', g: 120, as: 'Chard' },
      { food: 'fresh herbs', g: 10, as: 'Herbs' },
      { food: 'figs, dried', g: 50, as: 'Dried figs, in the mersu' },
      { food: 'walnuts', g: 20, as: 'Walnuts, in the mersu' },
      { food: 'almonds', g: 15, as: 'Almonds' },
      { food: 'sesame seeds', g: 12, as: 'Sesame' },
      { food: 'honey', g: 15, as: 'Honey' },
      { food: 'pomegranate', g: 80, as: 'Pomegranate' },
      { food: 'wine, red', g: 260, as: 'Wine' },
      { food: 'salt, sea', g: 1.4, as: 'Sea salt' },
    ],
  },
]

/** One day's totals. */
export function dayTotals(day) {
  return totalsFor(day.items).totals
}

/** The seven-day daily average — the number the panel should actually report. */
export function weekAverage() {
  const sum = Object.fromEntries(KEYS.map((k) => [k, 0]))
  for (const d of days) {
    const t = dayTotals(d)
    for (const k of KEYS) sum[k] += t[k]
  }
  return Object.fromEntries(KEYS.map((k) => [k, sum[k] / days.length]))
}

/* Swap the fish back to inland lamb on all but the first N days.
   Two fish days is the assumption the whole week rests on, and it is the one we are least
   sure of, so it is worth being able to show what happens if it is wrong rather than
   defending it in a footnote. The answer is that it is not a small effect: EPA+DHA runs
   from 11% of target at zero fish days to 80% at two. */
const FISH_SWAP = {
  'sardines, grilled': 'lamb shoulder, lean',
  'grey mullet, grilled': 'lamb shoulder, lean',
}

export function weekWithFishDays(n) {
  const fishDays = days.filter((d) => d.marks?.includes('fish')).map((d) => d.key)
  const keep = new Set(fishDays.slice(0, n))
  const sum = Object.fromEntries(KEYS.map((k) => [k, 0]))
  for (const d of days) {
    const items = d.items.map((i) =>
      FISH_SWAP[i.food] && !keep.has(d.key) ? { ...i, food: FISH_SWAP[i.food] } : i,
    )
    const t = totalsFor(items).totals
    for (const k of KEYS) sum[k] += t[k]
  }
  return Object.fromEntries(KEYS.map((k) => [k, sum[k] / days.length]))
}

export const FISH_SENSITIVITY_ROWS = ['epaDha', 'vitD', 'iodine', 'calcium']

/** Per-day series for one nutrient, for a sparkline or a bar row. */
export function seriesFor(key) {
  return days.map((d) => ({ key: d.key, name: d.name, value: dayTotals(d)[key] }))
}

/* The assumptions the week rests on, stated where they can be argued with. The fish
   frequency is the one that matters most and the one we are least sure of. */
export const WEEK_ASSUMPTIONS = [
  'Fish twice in seven days. A coastal household would eat more, an inland one far less — this is the assumption the EPA+DHA, vitamin D and iodine rows are most sensitive to.',
  'Liver once in seven days. Offal was eaten and was not a daily food; one portion carries most of the week’s vitamin A.',
  'Two days with no meat at all, which is conservative rather than generous — most days in most households had none.',
  'Dairy every day, in some form. Fermented milk is the one animal product that was genuinely daily.',
  'Wine or beer on most days, scored separately from food and not treated as a nutritional benefit.',
  'Portions are for one adult with an active day. Nothing here models scarcity, spoilage or a failed harvest.',
]
