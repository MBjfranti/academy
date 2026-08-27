/* Shelf groups for the Market browse view.

   Names are deliberate rather than inferred from keywords. "Olives" belong with fruit in
   a produce aisle, while "olive oil" belongs with plant oils. A keyword classifier would
   eventually put one of those on the wrong shelf. The validation script in the Market
   tests catches any purchasable item added without a group. */

export const MARKET_GROUPS = {
  produce: [
    {
      key: 'alliums',
      label: 'Alliums',
      names: ['Onions', 'Garlic', 'Leeks', 'Shallots', 'Spring onions', 'Kurrat'],
    },
    {
      key: 'greens',
      label: 'Greens & tender vegetables',
      names: [
        'Chard',
        'Cos lettuce',
        'Cucumber',
        'Celery',
        'Fennel',
        'Rocket',
        'Watercress',
        'Cabbage & kale',
        'Vine leaves',
      ],
    },
    {
      key: 'roots',
      label: 'Roots & field vegetables',
      names: ['Beetroot', 'Turnips', 'Radishes', 'Carrots', 'Desert truffles'],
    },
    {
      key: 'fresh-pulses',
      label: 'Fresh pulses',
      names: ['Broad beans', 'Peas'],
    },
    {
      key: 'fruit',
      label: 'Fruit',
      names: [
        'Figs',
        'Dates',
        'Grapes',
        'Pomegranate',
        'Apples',
        'Pears',
        'Quince',
        'Plums',
        'Melon',
        'Olives',
        'Cranberries',
      ],
    },
    {
      key: 'nuts',
      label: 'Nuts',
      names: ['Almonds', 'Pistachios', 'Walnuts', 'Hazelnuts', 'Pine nuts'],
    },
  ],
  drygoods: [
    {
      key: 'grain',
      label: 'Bread & grain',
      names: ['Flatbread', 'Pearl barley', 'Farro', 'Bulgur', 'Millet', 'Sorghum', 'Freekeh'],
    },
    {
      key: 'flour',
      label: 'Flour & breadmaking',
      names: [
        'Wholemeal wheat flour',
        'Spelt flour',
        'Barley flour',
        'Semolina',
        'Malted barley',
        'Sourdough starter',
      ],
    },
    {
      key: 'pulses',
      label: 'Dried pulses',
      names: [
        'Brown & green lentils',
        'Red lentils',
        'Chickpeas',
        'Dried broad beans',
        'Dried peas',
      ],
    },
    { key: 'seeds', label: 'Seeds', names: ['Sesame seeds', 'Linseed'] },
  ],
  meat: [
    { key: 'sheep-goat', label: 'Sheep & goat', names: ['Lamb', 'Mutton or hogget', 'Goat'] },
    {
      key: 'other-meat',
      label: 'Other meat',
      names: ['Pork', 'Beef', 'Bacon & cured pork'],
    },
    {
      key: 'poultry',
      label: 'Poultry',
      names: ['Duck & goose', 'Quail & pigeon', 'Guinea fowl & poussin'],
    },
    { key: 'offal', label: 'Offal & stock', names: ['Offal', 'Bones for broth', 'Blood'] },
    {
      key: 'fish',
      label: 'Fish',
      names: [
        'Sea bass & bream',
        'Grey mullet',
        'Mackerel & sardines',
        'Tilapia',
        'Salted anchovies',
      ],
    },
    {
      key: 'shellfish',
      label: 'Shellfish',
      names: ['Mussels & clams', 'Prawns & shrimp'],
    },
  ],
  dairy: [
    {
      key: 'cultured',
      label: 'Yoghurt & cultured milk',
      names: ['Sheep or goat yoghurt', 'Plain full-fat yoghurt', 'Labneh'],
    },
    {
      key: 'cheese',
      label: 'Cheese',
      names: ['Feta', 'Pecorino & hard sheep cheese', 'Ricotta & curd cheese', 'Halloumi'],
    },
    { key: 'butter', label: 'Butter & ghee', names: ['Butter', 'Ghee'] },
    { key: 'milk-eggs', label: 'Milk & eggs', names: ['Milk', 'Eggs'] },
  ],
  fats: [
    {
      key: 'plant-oils',
      label: 'Plant oils & sesame',
      names: ['Olive oil', 'Sesame oil', 'Linseed oil', 'Moringa oil', 'Tahini'],
    },
    {
      key: 'animal-fats',
      label: 'Animal fats',
      names: [
        'Lamb or beef dripping',
        'Lard',
        'Goose or duck fat',
        'Sheep-tail fat',
      ],
    },
    {
      key: 'sweet',
      label: 'Honey & fruit syrups',
      names: ['Honey', 'Date syrup', 'Grape molasses', 'Carob syrup', 'Pomegranate molasses'],
    },
  ],
  seasoning: [
    { key: 'salt', label: 'Salt', names: ['Sea salt'] },
    {
      key: 'seed-spices',
      label: 'Seed spices',
      names: [
        'Cumin seed',
        'Coriander seed',
        'Fenugreek',
        'Nigella seed',
        'Mustard seed',
        'Poppy seed',
      ],
    },
    {
      key: 'herbs',
      label: 'Fresh & dried herbs',
      names: [
        'Fresh coriander',
        'Dill',
        'Mint',
        'Thyme & oregano',
        'Bay leaves',
        'Sage',
        'Rosemary',
      ],
    },
    { key: 'sour', label: 'Sour agents', names: ['Sumac', 'Vinegar'] },
    {
      key: 'aromatics',
      label: 'Aromatics & resins',
      names: [
        'Juniper berries',
        'Saffron',
        'Cinnamon',
        'Black pepper',
        'Mastic',
        'Cyperus & galingale',
        'Storax & aromatic resins',
      ],
    },
  ],
  drinks: [
    { key: 'wine', label: 'Wine', names: ['Red or white wine', 'Retsina'] },
    { key: 'beer', label: 'Beer', names: ['Cloudy wheat beer'] },
  ],
}

