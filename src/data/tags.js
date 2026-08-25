// Culture and table. Five kitchens, two tables — set once, and both pages obey.
//
// Most of the pantry is shared: grain, pulse, allium, salt. That is the point
// of the building blocks. What actually separates these kitchens is a short
// list — which fat, which sour, which sweet, which drink — so that is what
// the signature below shows, and it is why only some market items carry
// culture tags at all. An untagged item belongs to everyone.

export const CULTURES = [
  {
    key: 'babylonian',
    name: 'Babylonian',
    short: 'Babylon',
    where: 'Southern Mesopotamia',
    when: 'c. 1800–1150 BC',
    signature: {
      Grain: 'Barley, first and always',
      Fat: 'Sheep-tail fat and sesame oil',
      Sour: 'Soured milk, stirred in off the heat',
      Sweet: 'Dates and date syrup',
      Drink: 'Barley beer',
      Meat: 'Mutton, and small birds',
      Seasoning: 'Leek, garlic, cumin, coriander — used hard',
    },
    line: 'The only kitchen of the era that wrote its recipes down. Sour, allium-heavy, built on beer and sheep fat.',
  },
  {
    key: 'egyptian',
    name: 'Egyptian',
    short: 'Egypt',
    where: 'Nile valley, New Kingdom',
    when: 'c. 1550–1070 BC',
    signature: {
      Grain: 'Emmer wheat and barley',
      Fat: 'Moringa and linseed oil, goose fat',
      Sour: 'Soured milk',
      Sweet: 'Honey, dates, figs',
      Drink: 'Emmer beer, morning to night',
      Meat: 'Nile fish, duck and goose; beef for the rich',
      Seasoning: 'Coriander, cumin, fenugreek, nigella, dill',
    },
    line: 'Bread and beer as wages. Fish, waterfowl and an enormous amount of dried fruit.',
  },
  {
    key: 'mycenaean',
    name: 'Mycenaean Greek',
    short: 'Mycenae',
    where: 'Mainland Greece, Crete, the islands',
    when: 'c. 1600–1100 BC',
    signature: {
      Grain: 'Barley above wheat',
      Fat: 'Olive oil',
      Sour: 'Wine, and brined cheese',
      Sweet: 'Honey and figs',
      Drink: 'Wine',
      Meat: 'Goat and sheep; sea fish and shellfish',
      Seasoning: 'Coriander, cumin, fennel, celery, mint, saffron',
    },
    line: 'Olive oil, wine and sheep cheese, and the widest spice list of the five.',
  },
  {
    key: 'hittite',
    name: 'Hittite',
    short: 'Hatti',
    where: 'Central Anatolia',
    when: 'c. 1650–1180 BC',
    signature: {
      Grain: 'Emmer and barley, and a great many named breads',
      Fat: 'Butter and sheep fat',
      Sour: 'Soured milk and cheese',
      Sweet: 'Honey, figs, grapes',
      Drink: 'Wine and grain beer',
      Meat: 'Sheep, goat, cattle and pig',
      Seasoning: 'Coriander, cumin, juniper, garlic',
    },
    line: 'A bread culture above all. Butter rather than oil, roasted meat, fruit with everything.',
  },
  {
    key: 'canaanite',
    name: 'Canaanite & Sea Peoples',
    short: 'Canaan',
    where: 'The Levantine coast',
    when: 'c. 1550–1150 BC',
    signature: {
      Grain: 'Barley and wheat',
      Fat: 'Olive oil',
      Sour: 'Pomegranate, sumac, soured milk',
      Sweet: 'Honey, dates, carob',
      Drink: 'Wine, often resinated and spiced',
      Meat: 'Sheep, goat, pork; coastal fish',
      Seasoning: 'Cumin, coriander, sumac, juniper, mastic',
    },
    line: 'The junction of the whole trade world. Olive oil, resinated wine, and everyone else’s ingredients passing through.',
  },
]

export const TIERS = [
  {
    key: 'commoner',
    name: 'Commoner',
    line: 'Grain, pulse, allium, oil, sour milk. Meat is occasional and small; the pot does the work.',
  },
  {
    key: 'elite',
    name: 'Elite',
    line: 'Everything above, plus beef, whole roasted animals, imported spice, wine and quantity.',
  },
]

export const cultureByKey = Object.fromEntries(CULTURES.map((c) => [c.key, c]))
export const tierByKey = Object.fromEntries(TIERS.map((t) => [t.key, t]))
