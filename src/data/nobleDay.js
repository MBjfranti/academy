// The Minor Noble Day.
//
// One representative 2,200 kcal day, built only from the site's ingredient
// corpus, for a modestly affluent Late Bronze Age household shopping in a
// modern supermarket. Not an aristocrat's banquet — the "minor noble" framing
// exists to set the assumed level of food *diversity*, which is justified
// because the surviving recipe corpus is itself disproportionately palace,
// temple and affluent cooking.
//
// Two switches, because the brief says both change the answer:
//   coastal — swaps the evening lamb for grilled oily fish. This is the single
//             biggest lever on omega-3 and iodine, and it is a real regional
//             difference, not a modern intervention.
//   wine    — alcohol is scored separately from food, so the day can be read
//             with it and without it.

export const meals = [
  {
    key: 'morning',
    name: 'Morning',
    dish: 'Bread, strained yoghurt, figs and honey',
    note: 'Bread and something soured is the morning across all five kitchens. The figs are the sweetener and the fruit at once.',
    items: [
      { food: 'wholemeal flatbread', g: 90, as: 'Emmer flatbread, one large' },
      { food: 'strained yoghurt', g: 120, as: 'Strained sheep yoghurt' },
      { food: 'figs, dried', g: 30, as: 'Dried figs, four' },
      { food: 'honey', g: 10, as: 'Honey, a spoonful' },
      { food: 'sesame seeds', g: 6, as: 'Toasted sesame, scattered' },
    ],
  },
  {
    key: 'midday',
    name: 'Midday',
    dish: 'Lentil and barley pottage, bread, cheese',
    note: 'The everyday meal of the entire region, and the thing the whole pantry is built around. Grain and pulse in one pot with an allium base.',
    items: [
      { food: 'barley, pearl, dry', g: 48, as: 'Pearl barley' },
      { food: 'lentils, dry', g: 55, as: 'Brown lentils' },
      { food: 'leek', g: 90, as: 'Leek, sliced' },
      { food: 'onion', g: 60, as: 'Onion' },
      { food: 'garlic', g: 6, as: 'Garlic, two cloves' },
      { food: 'olive oil', g: 14, as: 'Olive oil, in the pot and raw over' },
      { food: 'brined sheep cheese', g: 40, as: 'Brined sheep cheese, crumbled' },
      { food: 'fresh herbs', g: 8, as: 'Mint and dill, torn over' },
      { food: 'wholemeal flatbread', g: 60, as: 'Flatbread, to scoop' },
      { food: 'salt, sea', g: 0.8, as: 'Sea salt' },
    ],
  },
  {
    key: 'evening',
    name: 'Evening',
    dish: 'Roast lamb, greens, bread, pomegranate and walnuts',
    coastalDish: 'Grilled sardines, greens, bread, pomegranate and walnuts',
    note: 'The meal that marks the household as comfortable. Meat is the marker; everything around it is what everyone ate.',
    items: [
      { food: 'lamb shoulder, lean', g: 95, as: 'Lamb shoulder, roasted', swap: 'inland' },
      { food: 'sardines, grilled', g: 120, as: 'Sardines, grilled whole', swap: 'coastal' },
      { food: 'chard', g: 150, as: 'Chard, wilted in oil with garlic' },
      { food: 'onion', g: 50, as: 'Onion, cooked down' },
      { food: 'olive oil', g: 10, as: 'Olive oil' },
      { food: 'garlic', g: 5, as: 'Garlic' },
      { food: 'wholemeal flatbread', g: 60, as: 'Flatbread' },
      { food: 'pomegranate', g: 80, as: 'Pomegranate seeds' },
      { food: 'walnuts', g: 15, as: 'Walnuts, cracked' },
      { food: 'salt, sea', g: 0.7, as: 'Sea salt' },
    ],
  },
  {
    key: 'drink',
    name: 'With the meal',
    dish: 'Wine, cut with water',
    note: 'Scored separately. Historically frequent, and not a nutritional advantage — the day is worth reading both ways.',
    optional: 'wine',
    items: [{ food: 'wine, red', g: 180, as: 'Red wine, two small cups' }],
  },
]

/* Resolve the day under a given set of switches. */
export function dayItems({ coastal = false, wine = true } = {}) {
  const out = []
  for (const meal of meals) {
    if (meal.optional === 'wine' && !wine) continue
    for (const item of meal.items) {
      if (item.swap === 'inland' && coastal) continue
      if (item.swap === 'coastal' && !coastal) continue
      out.push({ ...item, meal: meal.key })
    }
  }
  return out
}

export function mealItems(meal, { coastal = false } = {}) {
  return meal.items.filter(
    (i) => !i.swap || (i.swap === 'coastal') === coastal,
  )
}

/* What the day is, and what it deliberately is not. */
export const ASSUMPTIONS = [
  'Modern food safety, refrigeration and clean water.',
  'Year-round supermarket availability — no seasonal gaps.',
  'Adequate calories. No scarcity, no failed harvest.',
  'Modern cooking equipment allowed.',
  'Ingredients restricted to what the region had, c. 1750–1150 BC.',
  'Quantities measured by modern methods, because theirs recorded none.',
]

export const NOT_THIS = [
  'Not a claim about how well Bronze Age people actually ate. Scarcity, spoilage, parasites and unequal access dominated that, and none of it is modelled here.',
  'Not a reconstruction of ancient nutrient values. Modern cultivars, modern soils, modern animals — we are testing the pantry, not the produce.',
  'Not an argument that older is better. A deliberately designed modern diet still wins; the interesting question is by how little.',
]
