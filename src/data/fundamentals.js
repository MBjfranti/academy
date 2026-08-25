// Barley & Bronze — Fundamentals.
// What to keep in the cupboard, what all of this cooking has in common,
// and the handful of base recipes everything else hangs off.
// Supermarket-only. Nothing here postdates the Bronze Age eastern Mediterranean.

export const staples = [
  {
    slug: 'pearl-barley',
    name: 'Pearl barley',
    buy: 'Any supermarket, dry goods aisle, in a bag or a box.',
    why: "The default grain of the whole era, and the cheapest thing in this cupboard. It thickens a pot as it cooks, so a handful turns thin broth into a meal without any other help.",
    used: 'Pottage, porridge, stuffing, bread, beer.',
    keeps: 'A year in a sealed jar.',
  },
  {
    slug: 'brown-lentils',
    name: 'Brown or green lentils',
    buy: 'Dry goods aisle. Whole brown or green, not red split.',
    why: "The everyday protein from Mesopotamia to the Aegean. Whole lentils hold their shape and give a pot body; red ones collapse into soup.",
    used: 'Pottage, cold oil-and-cumin salads, bread fillings.',
    keeps: 'A year dry. Older lentils simply need longer.',
  },
  {
    slug: 'wholemeal-flour',
    name: 'Wholemeal flour',
    buy: 'Baking aisle. Wholemeal, wholewheat, or plain stoneground.',
    why: "Your stand-in for emmer, the hulled wheat these kitchens milled. It behaves like the real thing on a hot pan: nutty, a little chewy, and quick to brown.",
    used: 'Flatbread, thick hearth loaves, dumplings, thickening.',
    keeps: 'Three months in the cupboard, a year in the freezer.',
  },
  {
    slug: 'olive-oil',
    name: 'Olive oil',
    buy: 'A big tin or bottle of ordinary extra virgin. Nothing fancy.',
    why: "Cooking fat, finishing fat and preserving medium all at once. Buy more than you think you need, because in this food you pour it rather than measure it.",
    used: 'Everything. Frying, dressing, bread, lamps.',
    keeps: 'A year in the dark. Heat and light kill it.',
  },
  {
    slug: 'onions-and-garlic',
    name: 'Onions, leeks and garlic',
    buy: 'Produce aisle. Brown onions, fat leeks, whole heads of garlic.',
    why: "The flavour base under nearly every dish on this site. Softened slowly in oil they turn sweet and become the stock you do not have.",
    used: 'Every stew, every pottage, every roast.',
    keeps: 'Onions and garlic a month cool and dry; leeks a week in the fridge.',
  },
  {
    slug: 'cumin-and-coriander-seed',
    name: 'Cumin and coriander seed',
    buy: 'Spice aisle. Whole seed rather than ground, if you can get it.',
    why: "The two seeds that carry this whole cuisine. Toasted in fat they turn warm and nutty and stop a pot of lentils tasting of nothing.",
    used: 'Spice bases, stews, breads, roast meat, pulses.',
    keeps: 'Whole seed a year. Ground goes dull in three months.',
  },
  {
    slug: 'sheep-or-goat-yoghurt',
    name: 'Sheep or goat yoghurt',
    buy: 'Chiller. Sheep or goat if stocked, otherwise full-fat plain natural.',
    why: "There are no lemons here. Sour dairy is your acid, stirred in off the heat to lift a heavy pot.",
    used: 'Finishing stews, dips, marinades, straining to cheese.',
    keeps: 'Two weeks in the fridge. It only gets sourer.',
  },
  {
    slug: 'brined-sheep-cheese',
    name: 'Brined sheep cheese',
    buy: 'Chiller or deli. Feta in brine, barrel-aged if you get the choice.',
    why: "Salt, fat and tang in one block. Crumbled over grain or pulses it finishes a plain bowl in seconds.",
    used: 'Over pottage, in bread, with figs, in salads.',
    keeps: 'Months in its brine. Change the brine if it clouds.',
  },
  {
    slug: 'lamb-shoulder',
    name: 'Lamb or mutton shoulder',
    buy: 'Butcher counter or meat aisle. Shoulder, neck, or shanks.',
    why: "The feast meat and the everyday meat both. Fatty, slow-cooking cuts give you the meat and the cooking fat in a single buy.",
    used: 'Stews, ember-roasts, skewers, rendered fat.',
    keeps: 'Three days in the fridge, six months in the freezer.',
  },
  {
    slug: 'dates',
    name: 'Dried dates',
    buy: 'Produce or baking aisle. Medjool, or the cheaper pressed blocks.',
    why: "Sweetness with body. Dates melt into a sauce and thicken it as they go, which is a job honey alone cannot do.",
    used: 'Meat stews, sweets, syrup, stuffing bread.',
    keeps: 'Six months in a tub. Chill them in summer.',
  },
  {
    slug: 'honey',
    name: 'Honey',
    buy: 'Any runny honey. Thyme or wildflower if the price is close.',
    why: "The only real sweetener on the site, and it lands in savoury food as often as sweet. It also glazes meat and browns it.",
    used: 'Meat glazes, sweets, drinks, bread.',
    keeps: 'Forever. Warm the jar if it sets.',
  },
  {
    slug: 'salt',
    name: 'Coarse salt',
    buy: 'A cheap box of coarse sea salt. Buy the big one.',
    why: "The one seasoning that is never optional. Coarse crystals let you salt by feel, which is how every dish here was cooked.",
    used: 'Everything. Cooking, curing, brining, the table.',
    keeps: 'Forever, provided it stays dry.',
  },
]

export const buildingBlocks = [
  {
    slug: 'grain-and-pulse',
    name: 'Grain plus pulse in one pot',
    idea: 'Barley and lentils cooked together in a single pot was the actual daily meal from Ur to Pylos.',
    detail:
      "Grains are short on lysine and pulses are short on methionine, so between them you get a far better amino acid spread than either alone — out of two cheap dry goods. The grain also thickens what the pulse loosens, so the pot ends up spoonable instead of soupy. This is why it is everywhere.",
    looks:
      'A thick beige bowl with oil poured over it. In Mesopotamia it comes with beer, in the Aegean with cheese and figs, in the Levant with flatbread.',
  },
  {
    slug: 'allium-in-fat',
    name: 'Alliums softened in fat',
    idea: 'Almost every savoury dish starts with onion, leek or garlic going soft and sweet in oil or rendered tail fat.',
    detail:
      "There is no stock cube here and no long-simmered brown stock. The sweetness and body come from alliums broken down slowly in fat until they collapse. Rushing this is the single most common way these dishes go flat. Give it fifteen minutes, not five.",
    looks:
      'Sliced leek gone limp and glossy in olive oil; a pile of onion turning gold in lamb fat; whole garlic cloves softening in a covered pan.',
  },
  {
    slug: 'sour-dairy-off-the-heat',
    name: 'Sour dairy off the heat',
    idea: 'With no citrus and no vinegar bottle on the counter, soured sheep and goat milk is the acid that finishes a dish.',
    detail:
      "Fat and starch need something sharp against them or the plate reads heavy. Yoghurt, soured milk and brined cheese all do that job. It must go in after the pot leaves the heat, or the proteins seize and split into grains. Stir a ladle of hot liquid into the yoghurt first, then the yoghurt into the pot.",
    looks:
      'A white swirl through a brown stew; crumbled brined cheese melting on hot barley; a bowl of soured milk poured over flatbread.',
  },
  {
    slug: 'bread-as-plate',
    name: 'Bread is the plate and the spoon',
    idea: 'Flatbread is not a side. It is the starch, the cutlery, and often the dish itself.',
    detail:
      "Once you cook this way you stop laying a table. Bread torn into pieces scoops the pot, soaks the oil, and carries the meat. That changes how wet you make things: a stew can stay loose because the bread will take up the liquid. Build the dish for the bread, not around it.",
    looks:
      'A stack of hot rounds beside a shared pot; a thick hearth loaf split and filled; a dry bread crust standing in for a bowl.',
  },
  {
    slug: 'sweet-with-savoury',
    name: 'Sweet in savoury as standard',
    idea: 'Honey, dates, figs and raisins go into meat dishes as a matter of course, not as a novelty.',
    detail:
      "Sugar was not a separate course here. Dried fruit sweetens and thickens at the same time, and honey browns meat into something a plain roast never gets. Treat sweetness as a seasoning that sits alongside salt. Add it early enough to cook down, and keep salt heavy enough to answer it.",
    looks:
      'Dates dissolving into lamb; a honey glaze going dark on pork; raisins plumping in a barley pot; pomegranate seeds thrown over at the end.',
  },
  {
    slug: 'two-register-seasoning',
    name: 'Toasted seed early, fresh green late',
    idea: 'Seed spice goes into the hot fat at the start; fresh herb goes on the plate at the end. Never the reverse.',
    detail:
      "Cumin, coriander seed, nigella and fenugreek need fat and heat to open up, and they turn nutty and deep. Mint, dill and coriander leaf lose everything if they meet heat, and they are what makes the dish taste alive. Using both registers is the difference between a competent pot and a good one.",
    looks:
      'Cumin seed crackling in oil before the onions go in, then a fistful of chopped dill and mint over the finished bowl.',
  },
]

export const basics = [
  {
    slug: 'lentil-and-barley-pottage',
    name: 'Lentil and barley pottage',
    line: 'What a grain-and-pulse pot most likely looked like, and still a very good dinner.',
    serves: 'Serves 4',
    time: '55 min',
    ingredients: [
      { item: 'Olive oil, 4 tbsp', step: 1, aisle: 'fats' },
      { item: 'Cumin seed, 2 tsp', step: 1, aisle: 'seasoning' },
      { item: 'Coriander seed, 2 tsp, roughly crushed', step: 1, aisle: 'seasoning' },
      { item: 'Leeks, 3 large, sliced thin', step: 2, aisle: 'produce' },
      { item: 'Onion, 1 large, chopped', step: 2, aisle: 'produce' },
      { item: 'Garlic, 4 cloves, sliced', step: 2, aisle: 'produce' },
      { item: 'Salt, 2 tsp, plus more at the end', step: 2, aisle: 'seasoning' },
      { item: 'Pearl barley, 150 g', step: 3, aisle: 'drygoods' },
      { item: 'Bay leaves, 2', step: 3, aisle: 'seasoning' },
      { item: 'Water, 1.6 litres', step: 3, aisle: 'tap' },
      { item: 'Brown or green lentils, 200 g', step: 4, aisle: 'drygoods' },
      { item: 'Fresh dill and mint, a large handful, chopped', step: 6, aisle: 'produce' },
      { item: 'Brined sheep cheese, 100 g, to crumble over', step: 6, aisle: 'dairy' },
      { item: 'Olive oil to finish, 2 tbsp', step: 6, aisle: 'fats' },
    ],
    steps: [
      'Warm the oil in a heavy pot over medium heat. Add the cumin and coriander seed and let them sizzle for 30 seconds, until they smell nutty.',
      'Add the leeks, onion and garlic with 1 tsp of the salt. Cook gently for 15 minutes, stirring, until everything has collapsed and gone sweet. Do not rush this part; it is the whole flavour base.',
      'Add the barley, the bay leaves, the rest of the salt and 1.6 litres of water. Bring to a boil, then drop to a bare simmer and cook 10 minutes.',
      'Now add the lentils. Simmer another 25 to 30 minutes, stirring now and then so nothing catches, until both grain and pulse are soft and the pot has gone thick.',
      'Take the pot off the heat and fish out the bay. Taste, and add salt until it stops tasting flat — which usually means more than you expect.',
      'Ladle out, crumble cheese over each bowl, throw on the dill and mint, and pour a thread of raw olive oil across the top.',
    ],
    note: 'The barley goes in first for a reason, but only just: pearl barley is done in 35 to 40 minutes and lentils in 25 to 30, so ten minutes is the whole gap you need. Pot or hulled barley is another matter, and wants 25 minutes ahead of the lentils.',
  },
  {
    slug: 'hot-pan-flatbread',
    name: 'Hot-pan flatbread',
    line: 'Flour, water, salt. Ten minutes to the first hot round.',
    serves: 'Makes 8',
    time: '35 min',
    ingredients: [
      { item: 'Wholemeal flour, 300 g, plus more for rolling', step: 1, aisle: 'drygoods' },
      { item: 'Salt, 1 tsp', step: 1, aisle: 'seasoning' },
      { item: 'Warm water, 200 ml', step: 1, aisle: 'tap' },
      { item: 'Olive oil, 1 tbsp', step: 1, aisle: 'fats' },
    ],
    steps: [
      'Mix the flour and salt in a bowl. Pour in the water and oil and bring it together with your hand into a rough, slightly sticky dough.',
      'Knead on the counter for 5 minutes, until it stops tearing and feels smooth. Cover the bowl and leave it 20 minutes so it relaxes.',
      'Cut into 8 pieces. Roll each one thin, about 2 mm and roughly the size of a side plate. Keep them dusted so they do not stick.',
      'Get a dry heavy frying pan or griddle properly hot over a high flame. No oil in the pan.',
      'Lay a round in. Cook 40 to 60 seconds until it blisters and speckles, flip, and give it another 30 to 40 seconds. It should puff.',
      'Stack them under a cloth as they come off. The trapped steam keeps them soft.',
    ],
    note: 'If the bread comes out stiff and cracker-like, the pan was not hot enough. Wait for it to smoke faintly before the first round goes in.',
  },
  {
    slug: 'allium-and-seed-base',
    name: 'Allium and seed base',
    line: 'The foundation under half the dishes on this site. Make a batch and keep it in the fridge.',
    serves: 'Makes about 400 g',
    time: '40 min',
    ingredients: [
      { item: 'Olive oil, 150 ml', step: 1, aisle: 'fats' },
      { item: 'Cumin seed, 1 tbsp', step: 1, aisle: 'seasoning' },
      { item: 'Coriander seed, 1 tbsp, crushed', step: 1, aisle: 'seasoning' },
      { item: 'Onions, 4 large, chopped fine', step: 2, aisle: 'produce' },
      { item: 'Leeks, 2, sliced thin', step: 2, aisle: 'produce' },
      { item: 'Garlic, 1 whole head, cloves sliced', step: 2, aisle: 'produce' },
      { item: 'Salt, 1.5 tsp', step: 2, aisle: 'seasoning' },
      { item: 'Bay leaves, 2', step: 2, aisle: 'seasoning' },
    ],
    steps: [
      'Heat the oil in a wide pan over medium heat. Add the cumin and coriander seed and fry 30 seconds, until fragrant.',
      'Add the onions, leeks, garlic, salt and bay. Stir to coat everything in the oil.',
      'Turn the heat low. Cook 30 minutes, stirring every few minutes, until the whole lot is soft, golden and jammy. It should reduce to about a third of its starting volume.',
      'Pull out the bay. Let it cool, then pack it into a jar and pour a finger of olive oil over the top to seal it.',
    ],
    note: 'Keeps 10 days in the fridge under its oil layer, and freezes well in ice-cube trays. Two spoonfuls is the start of any stew or pottage on this site.',
  },
  {
    slug: 'strained-yoghurt',
    name: 'Strained yoghurt',
    line: 'Thick, sharp and stable. Your acid, your dip and your finishing spoon.',
    serves: 'Makes about 400 g',
    time: '10 min, plus 8 hrs straining',
    ingredients: [
      { item: 'Full-fat plain sheep, goat or cow yoghurt, 750 g', step: 1, aisle: 'dairy' },
      { item: 'Salt, 1 tsp', step: 1, aisle: 'seasoning' },
      { item: 'Olive oil, to cover', step: 4, aisle: 'fats' },
    ],
    steps: [
      'Stir the salt through the yoghurt. The salt draws out water and seasons it as it drains.',
      'Line a sieve with a clean tea towel or a double layer of muslin. Set it over a bowl with clearance underneath.',
      'Tip in the yoghurt, fold the cloth over the top, and put the whole thing in the fridge for 8 hours or overnight.',
      'Scrape the thickened yoghurt into a jar. Pour a little olive oil over the surface and keep it chilled.',
      'To finish a hot dish: spoon out what you need, slacken it with a ladle of the hot cooking liquid, then stir that back into the pot off the heat.',
    ],
    note: 'Do not throw away the whey left in the bowl. Use it in place of some of the water when you mix flatbread dough, or drink it cold with salt in it.',
  },
]

// Supermarket sections, in the order you actually walk a shop.
export const SECTIONS = [
  { key: 'produce', label: 'Produce' },
  { key: 'drygoods', label: 'Dry goods' },
  { key: 'meat', label: 'Meat & fish' },
  { key: 'dairy', label: 'Dairy' },
  { key: 'fats', label: 'Oil, fat & sweet' },
  { key: 'seasoning', label: 'Herbs, spice & salt' },
  { key: 'tap', label: 'From the tap' },
]
