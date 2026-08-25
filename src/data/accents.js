// One Bronze Age kitchen, five accents.
//
// These cuisines were not five different systems. They were one system —
// grain, pulse, allium, fat, sour, bread — cooked with whatever the local
// hillside grew. What separates them is a handful of swaps you can make to
// any dish, at the moment of cooking. So they are written as swaps, not as
// separate cuisines.

export const shared = {
  line: 'Grain and pulse in one pot, an allium base softened in fat, whole seed toasted early, fresh herb thrown on late, something sour off the heat, and bread to eat it with.',
  always: [
    { k: 'Grain', v: 'Barley first. Wheat second, usually as flatbread.' },
    { k: 'Pulse', v: 'Lentils, chickpeas, broad beans. Every day, everywhere.' },
    { k: 'Base', v: 'Onion, leek or garlic, softened slowly in fat. Never rushed.' },
    { k: 'Spice', v: 'Cumin and coriander seed, whole, toasted in the fat at the start.' },
    { k: 'Herb', v: 'Mint, dill or coriander leaf, raw, at the very end.' },
    { k: 'Sour', v: 'Soured milk off the heat, or fruit. There is no lemon and no vinegar bottle.' },
    { k: 'Sweet', v: 'Honey or dried fruit, used in savoury food without apology.' },
    { k: 'Bread', v: 'Flat, unleavened, hot. It is the plate and the spoon.' },
  ],
  // Cyprus is deliberately not a sixth accent. It was the trade node the whole
  // system ran through — the bronze half of the site's name is Cypriot copper —
  // and it left very little culinary evidence of its own.
  connective:
    'Cyprus and the Levantine ports are why any of this is one world rather than five. Copper left Cyprus as oxhide ingots — flat slabs cast in the shape of a stretched hide, the standard trade unit of the age — and came back as everything else: Aegean oil, Egyptian grain, Canaanite resin, Mesopotamian sesame. Neither Cyprus nor the ports left much of a kitchen of their own in the record, which is exactly what you would expect of places that spent their time moving other people’s food. Stand on the quay at Ugarit and you can eat all five of these cuisines before the tide turns.',
}

export const accents = [
  {
    key: 'babylonian',
    name: 'Babylonian',
    where: 'Southern Mesopotamia',
    tagline: 'Sour, allium-heavy, built on beer and sheep fat.',
    inOneLine:
      'Cook it in sheep fat, wet it with beer, finish it with soured milk and a fistful of raw crushed garlic.',
    swaps: [
      { k: 'Fat', v: 'Sesame oil, or lamb fat, in place of olive oil' },
      { k: 'Liquid', v: 'A splash of cloudy wheat beer into the pot' },
      { k: 'Sour', v: 'Soured milk or yoghurt, stirred in off the heat' },
      { k: 'Sweet', v: 'Date syrup rather than honey' },
      { k: 'Aromatic', v: 'Leek and garlic crushed to a wet paste, not sliced' },
      { k: 'Finish', v: 'Raw crushed garlic and fresh coriander, at the table' },
    ],
    move: 'Use the same plant twice, in two states. Coriander seed toasted into the fat at the start, coriander leaf scattered raw at the end. The Babylonians did this deliberately and it is the most useful trick on this site.',
    tilt: 'Add a handful of raw rocket and a spoon of yoghurt to any lentil pot and it goes Babylonian immediately.',
  },
  {
    key: 'egyptian',
    name: 'Egyptian',
    where: 'The Nile valley',
    tagline: 'Bread and beer as the frame, fish and waterfowl as the protein.',
    inOneLine:
      'Cook it in duck fat, season it with fenugreek and nigella, and put raw cos lettuce and radish beside it.',
    swaps: [
      { k: 'Fat', v: 'Goose or duck fat' },
      { k: 'Protein', v: 'Salted or grilled fish, duck, goose — rarely red meat' },
      { k: 'Aromatic', v: 'Fenugreek and nigella alongside the cumin and coriander' },
      { k: 'Sweet', v: 'Dates and figs, cooked in rather than stirred through' },
      { k: 'Beside it', v: 'Raw cos lettuce, radish, cucumber, eaten with salt' },
      { k: 'Drink', v: 'Cloudy wheat beer, with the meal and not after it' },
    ],
    move: 'Salt your fish a day ahead rather than buying it fresh and cooking it the same night. Split, salted, dried and then grilled hard is the Egyptian default, and it tastes nothing like fresh fish.',
    tilt: 'Fenugreek is the giveaway. A teaspoon of the seed in a lentil pot reads as Egyptian and nothing else does it.',
  },
  {
    key: 'aegean',
    name: 'Aegean',
    where: 'Mainland Greece, Crete, the islands',
    tagline: 'Olive oil, wine and sheep cheese, and the longest spice list of the five.',
    inOneLine:
      'Olive oil hot at the start and raw at the end, wine instead of water, cheese grated over the top.',
    swaps: [
      { k: 'Fat', v: 'Olive oil — and a second slick of it raw, off the heat' },
      { k: 'Liquid', v: 'Wine reduced down before the water goes in' },
      { k: 'Aromatic', v: 'Fennel bulb and seed, celery leaf, mint' },
      { k: 'Sour', v: 'The wine, plus salty brined cheese' },
      { k: 'Finish', v: 'Hard sheep cheese grated over, torn mint, olives' },
      { k: 'Drink', v: 'Wine, dry and unoaked' },
    ],
    move: 'Treat cheese as a seasoning rather than a course. Brined or hard sheep cheese crumbled over a finished pot is doing the job of salt, fat and acid at once, which is why it turns up on palace inventories as a controlled commodity.',
    tilt: 'Fennel and olives. Either one tilts a dish Aegean; both together and there is no mistaking it.',
  },
  {
    key: 'hittite',
    name: 'Hittite',
    where: 'Central Anatolia',
    tagline: 'A bread culture. Butter rather than oil, fruit cooked into the meat.',
    inOneLine: 'Butter instead of oil, fruit in the pot rather than beside it, and a thick loaf to break.',
    swaps: [
      { k: 'Fat', v: 'Butter, and plenty of it' },
      { k: 'Sweet', v: 'Grape molasses, or whole figs and grapes cooked into the dish' },
      { k: 'Aromatic', v: 'Juniper berries with the cumin and coriander' },
      { k: 'Sour', v: 'Soured milk, and pomegranate where you can get it' },
      { k: 'Bread', v: 'Thick, close-crumbed, torn by hand rather than cut' },
      { k: 'Method', v: 'Over embers on a brazier, not in a pot, wherever the cut allows' },
    ],
    move: 'Put the fruit in the pot. Hittite cooking treats figs, grapes and pomegranate as savoury ingredients that go in with the meat, not as something served after. It is the most immediately unfamiliar thing about it and the most worth trying.',
    tilt: 'Juniper and butter. Crush four berries into melted butter and baste a shoulder of lamb with it.',
  },
  {
    key: 'canaanite',
    name: 'Canaanite',
    where: 'The Levantine coast',
    tagline: 'The junction of the whole trade world. Acid on top, resin in the wine.',
    inOneLine: 'Olive oil to cook, and pomegranate molasses or sumac dusted over the finished dish.',
    swaps: [
      { k: 'Fat', v: 'Olive oil' },
      { k: 'Sour', v: 'Pomegranate molasses or sumac — the best supermarket answer to no lemons' },
      { k: 'Sweet', v: 'Dates, carob, honey' },
      { k: 'Aromatic', v: 'Cumin and coriander, heavy on both' },
      { k: 'Finish', v: 'Sumac dusted over, pomegranate seeds scattered, a slick of raw oil' },
      { k: 'Drink', v: 'Resinated wine — retsina is the closest thing on a shelf' },
    ],
    move: 'Season twice: once in the pot, once on the plate. Everything on this coast finishes with an acid applied at the surface rather than cooked in, which is why sumac and pomegranate still work exactly that way in the same region today.',
    tilt: 'A teaspoon of pomegranate molasses stirred into any finished stew. It is the fastest tilt on this page.',
  },
]

// Not a sixth cuisine — a dial that runs across all of them.
export const tables = [
  {
    key: 'commoner',
    name: 'The commoner pot',
    line: 'Grain and pulse do the work. Meat is small, occasional and mostly there for fat and flavour — a bone in the pot rather than a joint on the plate. Bread, oil, onion, sour milk. This is what almost everyone ate almost every day, in all five places.',
  },
  {
    key: 'elite',
    name: 'The elite table',
    line: 'The same cooking, scaled up and shown off: whole animals roasted, beef rather than mutton, small birds, wine instead of beer, imported spice used visibly, and sheer quantity. The difference is rarely technique. It is almost always volume, and the price of what went in.',
  },
]

export const accentByKey = Object.fromEntries(accents.map((a) => [a.key, a]))
