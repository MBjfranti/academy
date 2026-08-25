// The nutrient table behind the Minor Noble Day and the seven-day week.
//
// Hand-transcribed from USDA FoodData Central (US-government work, public domain) with a
// few values from UK CoFID where USDA has no close match. No API, no dependency.
//
// ── THREE KINDS OF REFERENCE VALUE, AND WHY IT MATTERS ────────────────────────────────
//
// Every row used to carry a `target` and get scored as a percentage of it. That is wrong
// for two of them, and wrong in a way that flatters the diet:
//
//   goal     A minimum to reach. Fibre, calcium, iron, the vitamins. More is better up to
//            a point, and "94% of target" means genuinely short.
//   limit    A ceiling not to cross. Sodium, saturated fat. 2,169 mg of sodium is NOT
//            "94% complete" — a day at 1,700 mg is not nutritionally worse. Scoring a
//            ceiling as a percentage invites exactly the wrong reading, and colouring it
//            green at 100% means "you are sitting exactly on the limit" while looking
//            like a win.
//   context  Not a target at all. Energy, carbohydrate, total fat, alcohol. Report the
//            number, score nothing.
//
// ── OMEGA-3 IS TWO NUTRIENTS, NOT ONE ─────────────────────────────────────────────────
//
// The single `omega3` row this replaces was a category error. It summed ALA (plant:
// walnuts, olive oil, sesame) with EPA and DHA (marine), then scored the total against
// ~500 mg — which is an EPA+DHA recommendation — and reported 424%. Nearly all of that
// total was walnut ALA.
//
// Conversion of ALA to EPA runs roughly 5-10%, and to DHA under 1%, so the two cannot be
// traded off. Splitting them is not a presentational nicety: it is the difference between
// "this diet is excellent on omega-3" and the truth, which is that the inland day is
// excellent on ALA and close to devoid of EPA+DHA. It also makes the fish question
// answerable, which is the interesting part.
//
//   ALA       target 1,600 mg — the adult Adequate Intake.
//   EPA+DHA   target  500 mg — the usual combined recommendation.
//
// ── TWO HONEST LIMITS ─────────────────────────────────────────────────────────────────
//   · IODINE is sparse in every food composition database. `null` means "nobody measured",
//     not "none", and the totals treat it as unmeasured rather than as zero.
//   · Values are RAW / AS-PURCHASED unless the name says otherwise. Cooking losses are not
//     modelled.

export const NUTRIENTS = [
  { key: 'kcal', label: 'Energy', unit: 'kcal', ref: 2200, basis: 'context', kind: 'energy' },
  { key: 'protein', label: 'Protein', unit: 'g', ref: 56, basis: 'goal', kind: 'macro' },
  { key: 'carb', label: 'Carbohydrate', unit: 'g', ref: null, basis: 'context', kind: 'macro' },
  { key: 'fibre', label: 'Fibre', unit: 'g', ref: 30, basis: 'goal', kind: 'macro' },
  { key: 'fat', label: 'Fat', unit: 'g', ref: null, basis: 'context', kind: 'macro' },
  { key: 'saturates', label: 'Saturates', unit: 'g', ref: 22, basis: 'limit', kind: 'macro' },
  { key: 'iron', label: 'Iron', unit: 'mg', ref: 8, basis: 'goal', kind: 'mineral', phytate: true },
  { key: 'zinc', label: 'Zinc', unit: 'mg', ref: 11, basis: 'goal', kind: 'mineral', phytate: true },
  { key: 'calcium', label: 'Calcium', unit: 'mg', ref: 1000, basis: 'goal', kind: 'mineral' },
  { key: 'magnesium', label: 'Magnesium', unit: 'mg', ref: 400, basis: 'goal', kind: 'mineral' },
  { key: 'potassium', label: 'Potassium', unit: 'mg', ref: 3400, basis: 'goal', kind: 'mineral' },
  { key: 'sodium', label: 'Sodium', unit: 'mg', ref: 2300, basis: 'limit', kind: 'mineral' },
  { key: 'iodine', label: 'Iodine', unit: 'µg', ref: 150, basis: 'goal', kind: 'mineral', sparse: true },
  { key: 'folate', label: 'Folate', unit: 'µg', ref: 400, basis: 'goal', kind: 'vitamin' },
  { key: 'vitC', label: 'Vitamin C', unit: 'mg', ref: 90, basis: 'goal', kind: 'vitamin' },
  { key: 'vitA', label: 'Vitamin A', unit: 'µg', ref: 900, basis: 'goal', kind: 'vitamin' },
  { key: 'vitD', label: 'Vitamin D', unit: 'µg', ref: 15, basis: 'goal', kind: 'vitamin' },
  { key: 'b12', label: 'Vitamin B12', unit: 'µg', ref: 2.4, basis: 'goal', kind: 'vitamin' },
  {
    key: 'ala',
    label: 'Omega-3 ALA',
    unit: 'mg',
    ref: 1600,
    basis: 'goal',
    kind: 'fat',
    note: 'Plant omega-3, from walnuts, olive oil and sesame. Converts to EPA at roughly 5–10% and to DHA at under 1%, so it does not substitute for the row below.',
  },
  {
    key: 'epaDha',
    label: 'Omega-3 EPA+DHA',
    unit: 'mg',
    ref: 500,
    basis: 'goal',
    kind: 'fat',
    note: 'Marine omega-3. Essentially only fish, with traces in ruminant meat, dairy and eggs. This is the row the coastal switch moves.',
  },
  { key: 'alcohol', label: 'Alcohol', unit: 'g', ref: null, basis: 'context', kind: 'other' },
]

export const KEYS = NUTRIENTS.map((n) => n.key)

/* Per 100 g. Order matches KEYS. null = not measured, not zero. */
const F = (...v) => Object.fromEntries(KEYS.map((k, i) => [k, v[i] ?? 0]))

export const FOODS = {
  //                      kcal  prot  carb  fib   fat   sat   Fe    Zn    Ca   Mg   K     Na    I     Fol  C     A     D    B12   ALA   EPA+DHA alc
  'wholemeal flatbread':  F(275, 9.5, 52, 7.5, 3.5, 0.6, 2.8, 1.6, 40, 90, 220, 320, null, 30, 0, 0, 0, 0, 60, 0, 0),
  'barley, pearl, dry':   F(352, 9.9, 77.7, 15.6, 1.2, 0.24, 2.5, 2.1, 29, 79, 280, 9, null, 23, 0, 0, 0, 0, 50, 0, 0),
  'lentils, dry':         F(352, 24.6, 63.4, 10.7, 1.1, 0.15, 6.5, 3.3, 35, 47, 677, 6, null, 479, 4.5, 0, 0, 0, 109, 0, 0),
  'chickpeas, dry':       F(364, 19.3, 60.7, 17.4, 6, 0.6, 6.2, 3.4, 105, 115, 875, 24, null, 557, 4, 3, 0, 0, 101, 0, 0),
  'broad beans, dry':     F(341, 26.1, 58.3, 25, 1.5, 0.25, 6.7, 3.1, 103, 192, 1062, 13, null, 423, 1.4, 3, 0, 0, 71, 0, 0),
  leek:                   F(61, 1.5, 14.2, 1.8, 0.3, 0.04, 2.1, 0.12, 59, 28, 180, 20, null, 64, 12, 83, 0, 0, 0, 0, 0),
  onion:                  F(40, 1.1, 9.3, 1.7, 0.1, 0.04, 0.21, 0.17, 23, 10, 146, 4, null, 19, 7.4, 0, 0, 0, 0, 0, 0),
  garlic:                 F(149, 6.4, 33.1, 2.1, 0.5, 0.09, 1.7, 1.16, 181, 25, 401, 17, null, 3, 31, 0, 0, 0, 0, 0, 0),
  cucumber:               F(15, 0.65, 3.6, 0.5, 0.11, 0.04, 0.28, 0.2, 16, 13, 147, 2, null, 7, 2.8, 5, 0, 0, 5, 0, 0),
  'olive oil':            F(884, 0, 0, 0, 100, 13.8, 0.56, 0, 1, 0, 1, 2, null, 0, 0, 0, 0, 0, 761, 0, 0),
  'brined sheep cheese':  F(264, 14.2, 4.1, 0, 21.3, 14.9, 0.65, 2.88, 493, 19, 62, 1116, 15, 32, 0, 125, 0.4, 1.7, 175, 15, 0),
  'strained yoghurt':     F(97, 9, 4, 0, 5, 3.3, 0.04, 0.5, 100, 11, 141, 35, 35, 7, 0, 45, 0.1, 0.75, 35, 5, 0),
  'milk, sheep':          F(108, 5.98, 5.4, 0, 7, 4.6, 0.1, 0.57, 193, 18, 137, 44, 15, 5, 4.2, 68, 0.1, 0.71, 30, 5, 0),
  'figs, dried':          F(249, 3.3, 63.9, 9.8, 0.9, 0.14, 2, 0.55, 162, 68, 680, 10, null, 9, 1.2, 0, 0, 0, 0, 0, 0),
  grapes:                 F(69, 0.72, 18.1, 0.9, 0.16, 0.05, 0.36, 0.07, 10, 7, 191, 2, null, 2, 3.2, 3, 0, 0, 0, 0, 0),
  honey:                  F(304, 0.3, 82.4, 0.2, 0, 0, 0.42, 0.22, 6, 2, 52, 4, null, 2, 0.5, 0, 0, 0, 0, 0, 0),
  'lamb shoulder, lean':  F(235, 26, 0, 0, 14, 6, 1.9, 5.2, 15, 24, 290, 70, 3, 3, 0, 0, 0.3, 2.6, 180, 40, 0),
  'kid or goat, lean':    F(109, 20.6, 0, 0, 2.3, 0.7, 3.7, 4, 13, 23, 385, 82, 2, 5, 0, 0, 0.3, 1.1, 40, 20, 0),
  // The vitamin A outlier of the whole corpus, and the reason a week beats a day.
  'lamb liver':           F(139, 20.4, 1.8, 0, 5, 1.9, 7.4, 4, 7, 19, 313, 70, 14, 230, 4, 7391, 0.5, 65, 30, 90, 0),
  'egg, hen':             F(143, 12.6, 0.7, 0, 9.5, 3.1, 1.75, 1.29, 56, 12, 138, 142, 24, 47, 0, 160, 2, 0.89, 36, 74, 0),
  chard:                  F(19, 1.8, 3.7, 1.6, 0.2, 0.02, 1.8, 0.36, 51, 81, 379, 213, null, 14, 30, 306, 0, 0, 5, 0, 0),
  pomegranate:            F(83, 1.7, 18.7, 4, 1.2, 0.12, 0.3, 0.35, 10, 12, 236, 3, null, 38, 10.2, 0, 0, 0, 0, 0, 0),
  walnuts:                F(654, 15.2, 13.7, 6.7, 65.2, 6.1, 2.9, 3.1, 98, 158, 441, 2, null, 98, 1.3, 1, 0, 0, 9080, 0, 0),
  almonds:                F(579, 21.2, 21.6, 12.5, 49.9, 3.8, 3.7, 3.1, 269, 270, 733, 1, null, 44, 0, 0, 0, 0, 6, 0, 0),
  'fresh herbs':          F(50, 3.6, 9.5, 4.5, 1, 0.15, 5.8, 0.9, 220, 60, 500, 30, null, 100, 35, 350, 0, 0, 30, 0, 0),
  'sardines, grilled':    F(208, 24.6, 0, 0, 11.5, 1.5, 2.9, 1.3, 380, 39, 397, 505, 30, 10, 0, 32, 4.8, 8.9, 180, 1300, 0),
  'grey mullet, grilled': F(150, 24.8, 0, 0, 4.9, 1.5, 1.2, 0.6, 33, 33, 458, 75, 30, 10, 0, 36, 5, 2, 60, 480, 0),
  'sesame seeds':         F(573, 17.7, 23.4, 11.8, 49.7, 7, 14.6, 7.8, 975, 351, 468, 11, null, 97, 0, 0, 0, 0, 376, 0, 0),
  'wine, red':            F(85, 0.07, 2.6, 0, 0, 0, 0.46, 0.14, 8, 12, 127, 4, null, 1, 0, 0, 0, 0, 0, 0, 10.6),
  'emmer beer':           F(43, 0.5, 3.6, 0.2, 0, 0, 0.1, 0.05, 5, 6, 40, 4, null, 6, 0, 0, 0, 0, 0, 0, 3.5),
  'salt, sea':            F(0, 0, 0, 0, 0, 0, 0.33, 0.1, 24, 1, 8, 38758, 0, 0, 0, 0, 0, 0, 0, 0, 0),
}

/* What an average US adult actually eats, for the third comparator. Rounded, from
   NHANES-derived reporting — indicative, not precise.

   Note the two omega-3 rows. US ALA intake is roughly at its Adequate Intake; US EPA+DHA
   intake is around 100 mg, well under the 500 mg recommendation. Summing them, as the old
   single row did, hid the fact that both diets have the same shortfall. */
export const TYPICAL_US = {
  kcal: 2100, protein: 82, carb: 250, fibre: 16, fat: 84, saturates: 27,
  iron: 15, zinc: 12, calcium: 950, magnesium: 310, potassium: 2500,
  sodium: 3400, iodine: 200, folate: 550, vitC: 80, vitA: 640, vitD: 5,
  b12: 4.8, ala: 1600, epaDha: 110, alcohol: 10,
}

export const TYPICAL_US_NOTES = [
  'Roughly 53% of calories come from ultra-processed foods.',
  '83% of adults fall below the recommendation for beans, peas and lentils.',
  'About 22% meet the recommendation for total vegetables.',
  'Added sugar runs near 70 g a day — the Bronze Age pantry has no equivalent.',
]

/* The footnote behind the ◆ on iron and zinc.
   Deliberately does NOT discount the number. Applying a phytate coefficient would stack a
   second layer of uncertain modelling on top of the first and produce a figure that looks
   more precise than anything we know. State the caveat, leave the arithmetic alone. */
export const PHYTATE_NOTE =
  'High calculated intake; actual absorption varies. Whole grains and pulses carry phytate, ' +
  'which binds iron and zinc — while meat, soaking, sprouting and long fermentation all ' +
  'improve availability. Read this as what is in the food, not as what your body takes up.'

export function totalsFor(items) {
  const t = Object.fromEntries(KEYS.map((k) => [k, 0]))
  const missing = new Set()
  for (const it of items) {
    const food = FOODS[it.food]
    if (!food) {
      missing.add(it.food)
      continue
    }
    const scale = it.g / 100
    for (const k of KEYS) {
      const v = food[k]
      if (v === null) missing.add(k)
      else t[k] += v * scale
    }
  }
  return { totals: t, gaps: [...missing] }
}

/* How a value reads against its reference. Returns null for `context` rows, which are
   reported and not scored. `limit` rows invert: under is good, and the word is "within"
   rather than a percentage, because a percentage of a ceiling is a category error. */
export function verdictFor(n, value) {
  if (n.basis === 'context' || !n.ref) return null
  const pct = (value / n.ref) * 100
  if (n.basis === 'limit') {
    return pct > 100
      ? { pct, tone: 'over', word: 'over limit' }
      : { pct, tone: 'ok', word: 'within limit' }
  }
  if (pct >= 100) return { pct, tone: 'ok', word: 'met' }
  if (pct >= 80) return { pct, tone: 'near', word: 'near' }
  return { pct, tone: 'short', word: 'short' }
}

export const fmtN = (key, v) => {
  if (v == null) return '—'
  if (v >= 1000) return Math.round(v).toLocaleString('en-GB')
  if (v >= 100) return String(Math.round(v))
  if (v >= 10) return v.toFixed(0)
  if (v >= 1) return v.toFixed(1)
  return v.toFixed(2)
}
