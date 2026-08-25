// The dishes. Every one carries a siglum and a plain statement of where the
// source stops and the cooking begins.
//
// Standing note on quantities: no Bronze Age culinary text states a measure.
// Every quantity in this file is a working proportion arrived at in the test
// kitchen — not a reading of the source.

export const CATEGORIES = [
  {
    group: 'THE POT',
    names: ['Stews & Broths', 'Pulses & Vegetables'],
  },
  {
    group: 'THE FIRE',
    names: ['Roasts & Hearth', 'Fish'],
  },
  {
    group: 'THE OVEN',
    names: ['Breads & Grain', 'Sweets & Confections'],
  },
  {
    group: 'THE JAR',
    names: ['Drink & Ferment', 'Preserves'],
  },
]

export const recipes = [
  // ───────────────────────────── MESOPOTAMIA ─────────────────────────────
  {
    slug: 'lamb-and-beet-stew-tuhu',
    title: 'Lamb and Beet Stew',
    ancient: "TUḪ'U",
    translit: "tuḫ'u",
    language: 'Akkadian',
    region: 'mesopotamia',
    category: 'Stews & Broths',
    siglum: 'YBC 4644',
    provenance: 'Southern Mesopotamia · Yale Babylonian Collection',
    period: 'Old Babylonian',
    date: 'c. 1730 BC',
    serves: 'Serves 6',
    time: '2 hr 30 min',
    grade: 'attested',
    featured: true,
    summary: 'The most complete dish on the best-preserved culinary tablet in existence, and the closest thing the Bronze Age has to a recipe you can simply follow.',
    intro:
      'Leg of lamb seared in its own fat, stewed with beer and alliums and a deep red root, then hit twice with coriander at the close — the seed sprinkled over, the fresh leaf folded in. Fourteen ingredients, given in the order they enter the pot, and not one measurement anywhere. That absence is not damage to the tablet. It is a working note between professionals, written by someone who assumed the reader already knew how much, which is why every quantity below is ours rather than his.',
    sourceText: {
      kind: 'quotation',
      text: "Tuh'u. Leg meat is used. You prepare water. You add fat. You sear. You fold in salt, beer, onion, arugula, cilantro, Persian shallot, cumin and red beet, and you crush leek and garlic. You sprinkle coriander on top. You add kurrat and fresh cilantro.",
      attribution: 'YBC 4644, in the edition of Bottéro; identifications following the Yale reconstruction of 2018–19',
      note: 'Restorations in the published edition are accepted here. The root is read as beet; chard is the rival reading and the dish works either way.',
    },
    ingredientGroups: [
      {
        name: 'The stew',
        items: [
          { ancient: 'UZU.Ì.SAG / leg meat', modern: 'Leg of lamb, on the bone, cut into large pieces', qty: '1.5 kg', grade: 'attested' },
          { ancient: 'lipû', modern: 'Sheep-tail fat, or lamb fat trimmed from the leg', qty: '80 g', grade: 'attested' },
          { ancient: 'mû', modern: 'Water', qty: 'to cover', grade: 'attested' },
          { ancient: 'ṭābtu', modern: 'Salt', qty: '2 tsp', grade: 'attested' },
          { ancient: 'šikaru', modern: 'Barley beer, unhopped and cloudy', qty: '400 ml', grade: 'attested', note: 'beer' },
          { ancient: 'šamaškillu', modern: 'Onion, sliced', qty: '2 large', grade: 'attested' },
          { ancient: 'egengiru (?)', modern: 'Rocket / arugula, roughly chopped', qty: '2 handfuls', grade: 'attested' },
          { ancient: 'kisibirru', modern: 'Fresh coriander leaf', qty: '1 bunch', grade: 'attested' },
          { ancient: 'šuḫutinnû', modern: 'Persian shallot', qty: '4 bulbs', grade: 'unidentified', note: 'suhutinnu' },
          { ancient: 'kamūnu', modern: 'Cumin seed, whole', qty: '2 tsp', grade: 'attested' },
          { ancient: 'silqu', modern: 'Beetroot, peeled and cut in wedges', qty: '400 g', grade: 'unidentified', note: 'silqu' },
          { ancient: 'karašu', modern: 'Leek, crushed to a paste', qty: '2', grade: 'attested' },
          { ancient: 'šūmū', modern: 'Garlic, crushed to a paste', qty: '1 head', grade: 'attested' },
          { ancient: 'kisibirru (ZÀ.ḪI.LI)', modern: 'Coriander seed, ground, to finish', qty: '1 tbsp', grade: 'attested' },
          { ancient: 'karašu ṣeḫru', modern: 'Kurrat, or the green tops of young leeks', qty: '1 bunch', grade: 'attested', note: 'kurrat' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The stew',
        steps: [
          { text: 'Render the tail fat in a heavy pot over a low fire until you have a shallow pool of clear fat and the solids have coloured. Leave the solids in.', grade: 'inferred' },
          { text: 'Raise the fire. Sear the lamb in the fat, in batches, until every face has taken colour. The tablet gives this its own verb and it is not a step to hurry — it is the only browning the dish gets.', grade: 'attested' },
          { text: 'Pour in water to barely cover, and the beer with it. Bring to a bare tremble.', grade: 'attested' },
          { text: 'Fold in, in this order: salt, onion, rocket, fresh coriander leaf, Persian shallot, cumin, and the beetroot. The tablet is explicit that these go in together, folded rather than stirred.', grade: 'attested' },
          { text: 'Crush the leek and garlic to a wet paste — a mortar, not a knife — and work it into the pot.', grade: 'attested' },
          { text: 'Cover and hold at a tremble for two hours, until the lamb gives at the bone and the liquid has gone the colour of old brick.', grade: 'reconstructed' },
          { text: 'Off the fire, sprinkle the ground coriander seed over the surface. Scatter the kurrat and a second handful of fresh coriander leaf. Serve at once, with barley bread to take up the liquid.', grade: 'attested' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'silqu',
        text: 'Rendered here as beetroot on Bottéro’s reading. The word is also a plausible candidate for chard, which is the same species domesticated for leaf rather than root, and some editors prefer it. The dish works either way; it does not taste the same either way. We cook it as beet and say so.',
      },
      {
        term: 'šuḫutinnû',
        text: 'An allium of some description, generally identified with Persian shallot (Allium stipitatum), whose dried bulbs are still sold across Iran and Iraq. The identification is reasonable and it is unproven.',
      },
      {
        term: 'kurrat',
        text: 'A perennial leek grown for its cut greens rather than its shank, still cultivated in Egypt and the Levant. Where it cannot be had, the green tops of young leeks are the nearest living thing.',
      },
      {
        term: 'beer',
        text: 'Barley beer, unhopped — hops are a medieval intervention and have no business here. A cloudy unfiltered wheat or barley beer with no bitterness is the closest supermarket approximation.',
      },
    ],
    substitutions: [
      { from: 'Persian shallot', to: 'Two banana shallots and one clove of garlic', text: 'Nobody has identified the word, so this is a stand-in for a stand-in. Say so when you serve it.' },
      { from: 'Sheep-tail fat', to: 'Lamb fat, or clarified butter', text: 'Fat-tailed sheep are still farmed across the region but rarely reach western butchers. Fat trimmed from the leg itself is the honest fallback.' },
      { from: 'Kurrat', to: 'Green tops of young leeks' },
    ],
    sources: ['YBC 4644 (Yale Babylonian Collection)', 'Bottéro, Textes culinaires Mésopotamiens (1995)', 'Barjamovic, Jurado Gonzalez, Graham, Lassen, Nasrallah & Sörensen, in Ancient Mesopotamia Speaks (2019)'],
  },

  {
    slug: 'unwinding-broth-pasrutum',
    title: 'Unwinding Pottage',
    ancient: 'PAŠRŪTUM',
    translit: 'pašrūtum',
    language: 'Akkadian',
    region: 'mesopotamia',
    category: 'Pulses & Vegetables',
    siglum: 'YBC 4644',
    provenance: 'Southern Mesopotamia · Yale Babylonian Collection',
    period: 'Old Babylonian',
    date: 'c. 1730 BC',
    serves: 'Serves 4',
    time: '50 min',
    grade: 'attested',
    summary:
      'One of the four meatless entries on the tablet, thickened at the last moment with pounded beer-bread — and the recipe that opens with the words “meat is not used.”',
    intro:
      '“Meat is not used.” The entry announces what it is not before it says anything else, which on a tablet where twenty-one of the twenty-five recipes are built on meat counts as a statement of intent. What is left is barley, alliums and green herbs — and one move at the very end that makes the whole dish. Dried beer-bread pounded, sifted, scattered over the pot just before it comes off the fire. It thickens, it seasons, and it pulls a faintly sour, yeasty note through everything. The name plausibly comes from pašāru, the verb for loosening, releasing, undoing a knot.',
    sourceText: {
      kind: 'quotation',
      text: 'Pašrūtum. Meat is not used. You prepare water. You add fat. (You add) kurrat, cilantro, salt as desired, leek, garlic. You pound up dried sourdough, you sift (it) and you scatter (it) over the pot before removing it.',
      attribution: 'YBC 4644, recipe 4 — one of the four vegetable entries on the tablet',
    },
    ingredientGroups: [
      {
        name: 'The pot',
        items: [
          { ancient: 'mû', modern: 'Water', qty: '1.2 L', grade: 'attested' },
          {
            ancient: 'ì-giš',
            modern: 'Sesame oil, or sheep fat',
            qty: '4 tbsp',
            grade: 'attested',
            note: 'fat',
          },
          { ancient: 'ŠE', modern: 'Pearl barley', qty: '150 g', grade: 'inferred' },
          {
            ancient: 'karašu',
            modern: 'Kurrat, or the green tops of young leeks, sliced',
            qty: '2 large handfuls',
            grade: 'attested',
          },
          { ancient: 'karašu', modern: 'Leek, sliced', qty: '3', grade: 'attested' },
          { ancient: 'šamaškillu', modern: 'Spring onions, sliced', qty: '1 bunch', grade: 'attested' },
          { ancient: 'ḫazannu', modern: 'Garlic, crushed', qty: '1 head', grade: 'attested' },
          { ancient: 'kisibirru', modern: 'Fresh coriander leaf, chopped', qty: '1 large bunch', grade: 'attested' },
          { ancient: 'ṭābtu', modern: 'Salt, to taste', qty: '2 tsp', grade: 'attested' },
          {
            ancient: 'bappiru',
            modern: 'Dried sourdough bread, pounded to crumbs and sifted — beer-bread',
            qty: '120 g',
            grade: 'attested',
            note: 'bappiru',
          },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The pot',
        steps: [
          {
            text: 'Warm the oil or fat in a heavy pot. This is the whole of the fat in the dish and there is no meat behind it, so do not be shy with it.',
            grade: 'attested',
          },
          {
            text: 'Soften the leeks, the kurrat tops and the spring onions in the fat with the salt, without browning, for ten minutes. Everything the dish tastes of comes from this step.',
            grade: 'inferred',
          },
          { text: 'Add the water and the barley. Simmer for thirty minutes, until the barley is tender.', grade: 'inferred' },
          { text: 'Stir in the crushed garlic and most of the coriander leaf and give it two minutes more.', grade: 'attested' },
          {
            text: 'Off the fire, scatter the sifted bread crumb across the surface — the tablet says over the pot, before removing it — and stir it through. It will thicken as it stands.',
            grade: 'attested',
          },
          { text: 'Finish with the rest of the coriander leaf, raw.', grade: 'attested' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'Meat is not used',
        text: 'The tablet says so in its first line, and it is worth taking seriously: four of the twenty-five entries are meatless, and this is the clearest of them. An earlier version of this page built the dish on lamb. That was wrong, and the correction is the tablet’s own opening clause.',
      },
      {
        term: 'bappiru',
        text: 'A dried, twice-baked barley bread that doubled as the base for beer. Nothing modern is quite it: a dense sourdough rye or barley loaf, dried hard in a low oven and then pounded and sieved, is close enough in behaviour — it thickens, and it carries a sour yeasty note that a fresh crumb will not.',
      },
    ],
    substitutions: [
      {
        from: 'bappiru',
        to: 'Dense sourdough, dried hard and pounded, 120 g',
        text: 'Dry it properly. Fresh crumb turns to paste and gives you none of the sourness.',
      },
      { from: 'kurrat', to: 'Green tops of young leeks, or garlic chives', text: 'A perennial leek grown for its leaf. The tops of ordinary leeks are the nearest thing in a shop.' },
    ],
    sources: [
      'YBC 4644 (Yale Babylonian Collection)',
      'Bottéro, Textes culinaires Mésopotamiens (1995)',
      'Barjamovic, Jurado Gonzalez, Graham, Lassen, Nasrallah & Sörensen, in Ancient Mesopotamia Speaks (2019)',
    ],
  },
  {
    slug: 'elamite-broth-me-elamutim',
    title: 'Elamite Broth',
    ancient: 'MÊ ELAMÛTIM',
    translit: 'mê elamûtim',
    language: 'Akkadian',
    region: 'mesopotamia',
    category: 'Stews & Broths',
    siglum: 'YBC 4644',
    provenance: 'Southern Mesopotamia · Yale Babylonian Collection',
    period: 'Old Babylonian',
    date: 'c. 1730 BC',
    serves: 'Serves 4',
    time: '45 min',
    grade: 'attested',
    summary:
      'A foreign dish, named for Elam, thickened with blood and soured milk and built on dill — the only entry on the tablet that uses it.',
    intro:
      'Dill appears exactly once in the whole corpus, and it appears here, in one of two entries the tablet itself marks as foreign. Elam lay east, in what is now south-western Iran, and dill remains a signature of Iranian cooking rather than Iraqi — a small piece of evidence pointing the same way the label does. No meat, then; a great deal of dill; and a body built from blood and soured milk rather than a joint, thick and tart and deeply savoury. This is what a scribe writes down when the food is not his own.',
    sourceText: {
      kind: 'paraphrase',
      text: 'Meat is not used. Water and fat are prepared. Dill, kurrat, cilantro, leek and garlic go in, bound with blood and a corresponding quantity of soured milk, and more garlic at the close.',
      attribution: 'YBC 4644 — one of two entries the tablet marks as foreign',
    },
    ingredientGroups: [
      {
        name: 'The broth',
        items: [
          { ancient: 'mû', modern: 'Water', qty: '1 L', grade: 'attested' },
          { ancient: 'lipû', modern: 'Sheep fat, or sesame oil', qty: '4 tbsp', grade: 'attested' },
          { ancient: 'šibittu', modern: 'Fresh dill, a great quantity, chopped', qty: '2 large bunches', grade: 'attested' },
          { ancient: 'karašu', modern: 'Kurrat, or green leek tops, sliced', qty: '2 handfuls', grade: 'attested' },
          { ancient: 'karašu', modern: 'Leek, sliced', qty: '3', grade: 'attested' },
          { ancient: 'kisibirru', modern: 'Fresh coriander leaf, chopped', qty: '1 bunch', grade: 'attested' },
          { ancient: 'ḫazannu', modern: 'Garlic, crushed', qty: '1 head', grade: 'attested' },
          { ancient: 'ṭābtu', modern: 'Salt', qty: '2 tsp', grade: 'inferred' },
          {
            ancient: 'dāmu',
            modern: 'Blood — or, in a modern kitchen, black pudding crumbled in',
            qty: '200 ml / 150 g',
            grade: 'attested',
            note: 'blood',
          },
          { ancient: 'kisimmu', modern: 'Soured milk, or thin live yoghurt', qty: '300 ml', grade: 'attested' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The broth',
        steps: [
          { text: 'Bring the water to a boil and add the fat.', grade: 'attested' },
          {
            text: 'Add the leek, the kurrat tops and the salt, and simmer for fifteen minutes until they are entirely soft.',
            grade: 'inferred',
          },
          {
            text: 'Add the dill and the coriander leaf. There should be far more dill than looks sensible; it is the point of the dish.',
            grade: 'attested',
          },
          {
            text: 'Pull the pot off the fire and let the boil die completely. Both of the things that go in next will split in a boiling pot.',
            grade: 'inferred',
          },
          {
            text: 'Temper the blood with a ladle of the hot broth, then stir it back through. Return to a bare heat and stir until it thickens — it must never boil again.',
            grade: 'reconstructed',
          },
          {
            text: 'Temper the soured milk the same way and stir it in. The tablet asks for a quantity matching the blood.',
            grade: 'attested',
          },
          { text: 'Crush the last garlic raw and stir it in at the table.', grade: 'attested' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'Meat is not used',
        text: 'Stated on the tablet. An earlier version of this page built the dish on mutton, which was wrong: the body of the broth comes from the blood and the soured milk, not from a joint. Blood is a food, and treating it as one is the whole character of the recipe.',
      },
      {
        term: 'Blood',
        text: 'Genuinely awkward for a modern shopper, and genuinely what the tablet says. Fresh blood is a butcher’s order in most places. Black pudding — which is blood, fat and grain already set — crumbled into the pot off the heat gets you most of the way and is on any supermarket shelf. Declared as a substitution rather than quietly swapped.',
      },
      {
        term: 'Why dill',
        text: 'Dill appears in this entry and nowhere else in the corpus, and the entry is flagged as foreign. It remains a signature of Iranian cooking and is uncommon in Iraqi cooking — which is a small, precise piece of evidence that the tablet meant what it said about where the dish came from.',
      },
    ],
    substitutions: [
      {
        from: 'Blood',
        to: 'Black pudding, 150 g, crumbled in off the heat',
        text: 'Not identical — the pudding brings its own fat and oats — but it is the version most people can actually cook.',
      },
      { from: 'Soured milk', to: 'Thin live yoghurt, or kefir', text: 'It wants to be pourable, not spoonable.' },
    ],
    sources: [
      'YBC 4644 (Yale Babylonian Collection)',
      'Bottéro, Textes culinaires Mésopotamiens (1995)',
      'Barjamovic, Jurado Gonzalez, Graham, Lassen, Nasrallah & Sörensen, in Ancient Mesopotamia Speaks (2019)',
    ],
  },
  {
    slug: 'caravan-pot-with-dried-curd',
    title: 'The Road Pot: Emmer, Dried Curd and Onion',
    ancient: 'URUDU',
    translit: 'urudu',
    language: 'Sumerian logogram, as used in Akkadian',
    region: 'mesopotamia',
    category: 'Stews & Broths',
    siglum: 'Caravan and merchant correspondence',
    provenance: 'A donkey caravan on the Euphrates road, out of Ugarit',
    period: 'Late Bronze Age',
    date: 'c. 1250 BC',
    serves: 'Serves 6',
    time: '1 hr',
    grade: 'reconstructed',
    summary:
      'Everything in it survives three weeks on a donkey. That is not a stylistic choice, it is the entire design brief.',
    intro:
      'Food on a road is a logistics problem before it is a cooking problem. A donkey carries something like eighty kilos and eats a good part of its own value on a long haul, so every item in a caravan’s stores has to justify its weight and then survive heat, dust and three weeks of being jolted. That rules out nearly everything fresh and rules in a short, strange list: hard grain, dried pulses, oil in a sealed jar, dried fruit, salt, and dried sour curd — milk turned into a rock so that it can be turned back into food a month later and four hundred kilometres away. This is the pot those things make. It is better than it has any right to be.',
    sourceText: {
      kind: 'paraphrase',
      text: 'Merchant correspondence across the second millennium records donkey caravans, their loads, their fodder costs, the tolls and escorts they paid for, and their losses to robbery. Dried and soured dairy products are recorded as commodities in Mesopotamian administrative texts. No text records what a caravan cooked at the end of a day.',
      attribution: 'Second-millennium merchant and administrative correspondence',
    },
    ingredientGroups: [
      {
        name: 'What comes off the donkey',
        items: [
          { ancient: 'ZÍZ', modern: 'Cracked emmer, or coarse bulgur', qty: '250 g', grade: 'attested' },
          { ancient: 'GA', modern: 'Dried sour curd — kashk, or dried fermented yoghurt', qty: '80 g', grade: 'attested', note: 'kashk' },
          { ancient: 'SUM', modern: 'Onions, sliced thick', qty: '3 large', grade: 'attested' },
          { ancient: 'Ì', modern: 'Sesame or olive oil', qty: '4 tbsp', grade: 'attested' },
          { ancient: '—', modern: 'Cumin seed', qty: '2 tsp', grade: 'attested' },
          { ancient: '—', modern: 'Dried apricots or dates, torn', qty: '8', grade: 'attested' },
          { ancient: '—', modern: 'Salt', qty: 'to taste', grade: 'inferred' },
          { ancient: '—', modern: 'Water', qty: '1.2 litres', grade: 'inferred' },
        ],
      },
      {
        name: 'If the road has been kind',
        items: [
          { ancient: '—', modern: 'Fresh herbs — whatever is growing where you stopped', qty: 'a handful', grade: 'inferred' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The pot',
        steps: [
          { text: 'Break the dried curd into a cup of warm water and leave it while you do everything else. It will go from rubble to a thick sour cream in about twenty minutes, and it is the most important thing in the pot.', grade: 'reconstructed' },
          { text: 'Cook the onions slowly in the oil with the cumin until they are properly soft and starting to colour. On a road this is done while the animals are being watered, which is roughly the right length of time.', grade: 'reconstructed' },
          { text: 'Add the cracked grain, turn it in the oil for a minute, then pour in the water. Simmer it uncovered for twenty-five minutes until the grain is soft and the pot has thickened.', grade: 'reconstructed' },
          { text: 'Take it OFF the heat, then stir the soaked curd through. Sour dairy splits if it boils, and a split pot at the end of a day on the road is a genuine misfortune.', grade: 'reconstructed' },
          { text: 'Stir in the torn dried fruit, salt it properly, and let it sit five minutes. Herbs over the top if there are any.', grade: 'reconstructed' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'Standing',
        text: 'Caravan letters record loads, costs, tolls and robberies in great detail and never once mention supper. This pot is reconstructed from the shipping list: it contains only things that demonstrably travelled, cooked in the only way one fire and one vessel allow.',
      },
      {
        term: 'kashk',
        text: 'Dried soured curd: milk fermented, drained, salted, shaped and dried hard, so that it keeps for months without a cellar and rehydrates into something between yoghurt and cheese. It is still made across the region under a family of related names, and it is the single cleverest ingredient in this world — a way of carrying a dairy herd in a saddlebag. Buy it as kashk or dried qurut; failing that, see the substitutions.',
      },
      {
        term: 'The donkey is the technology',
        text: 'It is easy to read a trade route as a line on a map and miss that the line is made of animals. A donkey carries perhaps eighty kilos, walks maybe twenty-five kilometres a day, and must be fed and watered whether or not it is carrying anything. That arithmetic decides what is worth moving overland at all — which is why copper and tin and textiles go by donkey and grain does not, and why the sea always wins when the sea is an option.',
      },
    ],
    substitutions: [
      { from: 'Dried sour curd (kashk)', to: '150 g thick yoghurt beaten with 50 g crumbled feta', text: 'Not the same thing and close enough in the pot: you want sour, salt and body. Add it off the heat exactly as you would the real thing.' },
      { from: 'Cracked emmer', to: 'Coarse bulgur, or pearl barley', text: 'Bulgur is quickest. Barley wants an extra fifteen minutes and gives a thicker, stickier pot.' },
    ],
    sources: ['Second-millennium merchant correspondence', 'Mesopotamian administrative records of dairy commodities', 'Overland route studies of the Late Bronze Age'],
  },
  {
    slug: 'pigeon-in-broth-amursanu',
    title: 'Pigeon in Broth, with Bread Baked into the Pot',
    ancient: 'AMURSĀNU',
    translit: 'amursānu',
    language: 'Akkadian',
    region: 'mesopotamia',
    category: 'Roasts & Hearth',
    siglum: 'YBC 8958',
    provenance: 'Southern Mesopotamia · Yale Babylonian Collection',
    period: 'Old Babylonian',
    date: 'c. 1730 BC',
    serves: 'Serves 4',
    time: '3 hr',
    grade: 'reconstructed',
    summary: 'The most elaborate cooking instruction to survive from the ancient world — long, technical, and broken in the worst places.',
    intro:
      'Four lines is what YBC 4644 gives a stew. YBC 8958 spends dozens on a handful of bird dishes: the broth, the dough, the lining of the vessel, the order of assembly, what the finished thing should look like when it reaches the table. It is a recipe in the modern sense, written a thousand years before Homer — and it is broken in precisely the places you would most want it whole. Long stretches of the method are simply gone. That the dough encloses the birds is a reading, the one that makes sense of the surviving instructions, and what follows is a working reconstruction rather than a translation.',
    sourceText: {
      kind: 'paraphrase',
      text: 'The entry directs the cook to prepare the birds and a seasoned broth, to make a dough, to line and cover a vessel with it, and to assemble the birds within — with further instruction on garnish and on presentation. Substantial passages are lost.',
      attribution: 'YBC 8958 — summarised. The tablet is the most detailed and the most damaged of the three.',
    },
    ingredientGroups: [
      {
        name: 'The birds and their broth',
        items: [
          { ancient: 'amursānu', modern: 'Pigeon, or squab', qty: '4', grade: 'attested', note: 'amursanu' },
          { ancient: 'mû', modern: 'Water', qty: '1.5 L', grade: 'attested' },
          { ancient: 'lipû', modern: 'Sheep fat', qty: '60 g', grade: 'attested' },
          { ancient: 'ṭābtu', modern: 'Salt', qty: '2 tsp', grade: 'attested' },
          { ancient: 'karašu', modern: 'Leek, sliced', qty: '2', grade: 'attested' },
          { ancient: 'šūmū', modern: 'Garlic', qty: '6 cloves', grade: 'attested' },
          { ancient: 'nanâ (?)', modern: 'Mint, fresh', qty: '1 bunch', grade: 'reconstructed' },
          { ancient: 'kisimmu', modern: 'Soured milk', qty: '150 ml', grade: 'attested' },
        ],
      },
      {
        name: 'The dough that lines the pot',
        items: [
          { ancient: 'qēmu', modern: 'Barley flour', qty: '400 g', grade: 'attested' },
          { ancient: 'qēmu (arsuppu)', modern: 'Emmer flour', qty: '200 g', grade: 'attested' },
          { ancient: 'mû', modern: 'Water, warm', qty: '350 ml', grade: 'inferred' },
          { ancient: 'lipû', modern: 'Fat, for the dough and for greasing', qty: '80 g', grade: 'attested' },
          { ancient: 'ṭābtu', modern: 'Salt', qty: '1 tsp', grade: 'inferred' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The broth',
        steps: [
          { text: 'Draw and singe the birds. Split them or leave them whole as the vessel allows.', grade: 'inferred' },
          { text: 'Simmer the birds in water with the fat, salt, leek and garlic until just short of tender — three quarters of an hour for squab. Lift them out and reserve the broth.', grade: 'reconstructed' },
          { text: 'Reduce the broth hard, until it is a scant few ladles and tastes of more than it looks. Off the heat, temper in the soured milk and the mint.', grade: 'reconstructed' },
        ],
      },
      {
        name: 'The pot',
        steps: [
          { text: 'Work the two flours, salt, fat and warm water into a firm dough. Rest it, covered, for half an hour.', grade: 'inferred' },
          { text: 'Grease a deep earthenware pot. Roll out two thirds of the dough and line the pot with it, floor and walls, leaving an overhang.', grade: 'reconstructed' },
          { text: 'Settle the birds inside. Pour the thickened broth over them. Roll the remaining dough into a lid, lay it on, and pinch it to the overhang to seal the pot shut.', grade: 'reconstructed' },
          { text: 'Bake in a hot oven, or bury in the ashes of a raked hearth, for an hour, until the crust is hard and dark and sounds hollow.', grade: 'reconstructed' },
          { text: 'Bring it to the table sealed. Break the lid in front of whoever is eating — the tablet cares about presentation, and this is the only part of that instruction we can still read.', grade: 'attested' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'amursanu',
        text: 'A bird, generally taken as a pigeon or dove. Other bird terms on the same tablet are less secure. Squab gives the right size and the right fat.',
      },
      {
        term: 'The seal',
        text: 'That the dough encloses the birds is a reading, not a certainty. It is the reading that makes sense of a dough prepared alongside a broth and of a vessel described as lined, and it produces a dish that works. It is a guess. Cook it knowing that.',
      },
    ],
    substitutions: [
      { from: 'Pigeon', to: 'Quail, six of them, or poussin', text: 'Both are attested categories of table bird in Mesopotamia in general terms; neither is what this entry names.' },
    ],
    sources: ['YBC 8958', 'Bottéro (1995)', 'Barjamovic et al. (2019)'],
  },

  {
    slug: 'date-and-sesame-confection-mersu',
    title: 'Date and Sesame Confection',
    ancient: 'MERSU',
    translit: 'mersu',
    language: 'Akkadian',
    region: 'mesopotamia',
    category: 'Sweets & Confections',
    siglum: 'Ur III & Old Babylonian administrative texts',
    provenance: 'Ur, Nippur, Mari · various archives',
    period: 'Old Babylonian',
    date: 'c. 1750 – 1600 BC',
    serves: 'Makes about 30',
    time: '40 min',
    grade: 'inferred',
    summary: 'Not from a recipe tablet at all — reconstructed from the ration and offering lists that issued its ingredients together, by name, for centuries.',
    intro:
      'Five hundred years of paperwork and not one line on how to make it. Mersu is allocated to temples, issued to officials, listed at feasts, and never described, because everyone receiving it already knew. What the archives give instead is the issue list — dates, fat, flour, and often nuts, booked out together under the one heading, again and again. That is a different kind of evidence from a recipe, and it stops well short of a method.',
    sourceText: {
      kind: 'paraphrase',
      text: 'Mersu is named in issue and offering lists rather than described. The commodities booked against it are consistently dates, fat or butter, flour, and frequently pistachio or other nuts.',
      attribution: 'Composite from published Ur III and Old Babylonian administrative material',
    },
    ingredientGroups: [
      {
        name: 'The confection',
        items: [
          { ancient: 'suluppū', modern: 'Dates, soft, stoned', qty: '500 g', grade: 'attested' },
          { ancient: 'ḫimētu', modern: 'Clarified butter, or sheep fat', qty: '80 g', grade: 'attested' },
          { ancient: 'qēmu', modern: 'Barley or emmer flour, toasted', qty: '120 g', grade: 'attested' },
          { ancient: 'buṭumtu', modern: 'Pistachios, coarsely broken', qty: '100 g', grade: 'attested' },
          { ancient: 'šamaššammū', modern: 'Sesame seed, toasted', qty: '40 g', grade: 'reconstructed' },
          { ancient: 'ṭābtu', modern: 'Salt', qty: 'a pinch', grade: 'inferred' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The confection',
        steps: [
          { text: 'Toast the flour dry in a pan over a low fire until it smells of biscuit and has gone one shade darker. Tip it out.', grade: 'inferred' },
          { text: 'Toast the sesame in the same pan until it begins to jump. Tip it out with the flour.', grade: 'inferred' },
          { text: 'Warm the clarified butter, add the stoned dates, and work them over a low fire to a coarse paste. They will resist and then give all at once.', grade: 'reconstructed' },
          { text: 'Off the fire, beat in the toasted flour, the pistachios, most of the sesame and the salt. The mass should hold its shape when pressed.', grade: 'reconstructed' },
          { text: 'Roll into small balls or press into a slab and cut. Roll the outsides through the remaining sesame. Keeps a fortnight in a cool jar — which is very likely the point of it.', grade: 'reconstructed' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'Mari',
        text: 'The Mari archives are one of the places this dish is issued by name, and the palace there booked out dates, fat and pistachios together for it. That is why the nut in the list below is pistachio rather than almond: Mari sits inside the pistachio zone, and the middle Euphrates is where the archive evidence for nuts in mersu is thickest.',
      },
      {
        term: 'Standing',
        text: 'Every ingredient is attested as being issued under the name. The method is inferred from what those ingredients can be made to do, and from the keeping quality implied by how mersu was handed out. No source describes the making.',
      },
    ],
    substitutions: [
      { from: 'Clarified butter', to: 'Ghee', text: 'The same thing under a later name.' },
    ],
    sources: ['Ur III and Old Babylonian administrative corpora', 'Chicago Assyrian Dictionary, s.v. mersu'],
  },

  // ── three more from YBC 4644 ──────────────────────────────────────────
  //
  // The tablet carries twenty-five entries. The site had four. These three widen the
  // Mesopotamian shelf without pretending to more precision than the corpus allows:
  // every one of them is graded line by line, and where the identification is genuinely
  // open the entry says so in the ingredient list rather than in a footnote nobody reads.
  {
    slug: 'kanasu-broth-me-kanasi',
    title: 'Kanašu Pot',
    ancient: 'MÊ KANĀŠÎ',
    translit: 'mê kanāšî',
    language: 'Akkadian',
    region: 'mesopotamia',
    category: 'Stews & Broths',
    siglum: 'YBC 4644',
    provenance: 'Southern Mesopotamia · Yale Babylonian Collection',
    period: 'Old Babylonian',
    date: 'c. 1730 BC',
    serves: 'Serves 4',
    time: '1 hr 20 min',
    grade: 'reconstructed',
    summary:
      'A pulse-and-mint pot named after a plant still argued over — and the most honest dish on the tablet about how much of this cuisine is still open.',
    intro:
      'Kanāšu is a plant name that recurs across Old Babylonian texts and has never been pinned down, and the rival readings are not close to the same dish — which is a problem when something has to actually go in the pot. Published editions gloss it as a legume, and one summary of the tablet renders this entry as lamb with grain and mint, so a pulse is what goes in here, labelled as a choice rather than buried as a fact. Everything else about it is plain and good: beans gone soft, lamb backing them rather than leading them, mint torn in at the end. The name stays open.',
    sourceText: {
      kind: 'paraphrase',
      text: 'A short entry in the tablet’s standard broth formula: water and fat are prepared, salt goes in, then the kanāšu with alliums and herbs, and the pot is held at a simmer. The sequence is legible; the plant is not.',
      attribution: 'YBC 4644 — summarised. The identification of kanāšu is unresolved and the reading here is one of several.',
    },
    ingredientGroups: [
      {
        name: 'The broth',
        items: [
          {
            ancient: 'kanāšu',
            modern: 'Kanašu — read as a legume; use dried broad beans or chickpeas, soaked',
            qty: '250 g',
            grade: 'unidentified',
            note: 'kanasu',
          },
          { ancient: 'šīru', modern: 'Lamb shoulder, on the bone, cut into pieces', qty: '600 g', grade: 'attested' },
          { ancient: 'lipû', modern: 'Lamb or sheep fat', qty: '50 g', grade: 'attested' },
          { ancient: 'mû', modern: 'Water', qty: '1.2 L', grade: 'attested' },
          { ancient: 'ṭābtu', modern: 'Salt', qty: '2 tsp', grade: 'attested' },
          { ancient: 'šamaškillu', modern: 'Onion, sliced', qty: '2', grade: 'attested' },
          { ancient: 'karašu', modern: 'Leek, sliced', qty: '2', grade: 'attested' },
          { ancient: 'ḫazannu', modern: 'Garlic, crushed', qty: '1 head', grade: 'attested' },
          { ancient: 'kisibirru', modern: 'Fresh coriander leaf, torn', qty: '1 large bunch', grade: 'attested' },
          { ancient: 'kamūnu', modern: 'Cumin seed, whole', qty: '1 tsp', grade: 'inferred' },
          { ancient: 'nānaʾu', modern: 'Fresh mint, torn', qty: '1 large bunch', grade: 'attested' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The broth',
        steps: [
          {
            text: 'Put the lamb, the fat and the water in the pot cold and bring slowly to a tremble. Skim until the surface runs clear.',
            grade: 'inferred',
          },
          { text: 'Add the salt, the onion and the leek. Hold at a bare tremble for forty minutes.', grade: 'attested' },
          {
            text: 'Add the soaked pulse and the cumin, and cook until it is tender — forty minutes for broad beans, a little less for chickpeas. Top up with water if the pot goes dry.',
            grade: 'inferred',
          },
          {
            text: 'Off the fire, stir through the crushed garlic, the coriander leaf and the mint. All three go in raw, as they do throughout this tablet, and the mint is what makes this entry distinctive.',
            grade: 'attested',
          },
        ],
      },
    ],
    apparatus: [
      {
        term: 'kanāšu',
        text: 'An unresolved plant name, and the reason this entry is graded reconstructed rather than attested. The published readings gloss it as a LEGUME, and one summary of the tablet renders the entry as lamb with grain and mint — so this page treats it as a pulse. An earlier version of this page guessed a leafy green instead. That was the wrong branch of a genuinely open question, and the correction is recorded here rather than quietly made.',
      },
    ],
    substitutions: [
      {
        from: 'kanāšu',
        to: 'Dried broad beans or chickpeas, 250 g, soaked overnight',
        text: 'Declared, not hidden. The readings point to a legume without settling which one, so take your pick of the two the region actually grew.',
      },
    ],
    sources: [
      'YBC 4644 (Yale Babylonian Collection)',
      'Bottéro, Textes culinaires Mésopotamiens (1995)',
      'Barjamovic, Jurado Gonzalez, Graham, Lassen, Nasrallah & Sörensen, in Ancient Mesopotamia Speaks (2019)',
    ],
  },
  {
    slug: 'francolin-broth-me-tarri',
    title: 'Francolin Broth',
    ancient: 'MÊ TARRÎ',
    translit: 'mê tarrî',
    language: 'Akkadian',
    region: 'mesopotamia',
    category: 'Stews & Broths',
    siglum: 'YBC 4644',
    provenance: 'Southern Mesopotamia · Yale Babylonian Collection',
    period: 'Old Babylonian',
    date: 'c. 1730 BC',
    serves: 'Serves 4',
    time: '1 hr 10 min',
    grade: 'reconstructed',
    summary:
      'Game bird poached in milk thickened with malt cake, then jointed and plunged back into its own stock to finish.',
    intro:
      'Boil the water, throw in fat, drop in the dressed bird, add a hulled cake of malt. Squeeze onions, leek and garlic into the pot with milk; when the tarru is cooked, joint it and plunge the pieces back into their own stock. The tarru is taken to be the francolin, a partridge-sized ground bird still found across the region. Beside the ceremonial bird dish of YBC 8958 this is the plain version, and the corpus is mostly this.',
    sourceText: {
      kind: 'quotation',
      text: 'Boil the water, throw fat in. Dress the tarru [and place in pot]. Add coarse salt as needed. [Add] hulled cake of malt. Squeeze onions, samîdu, leek, garlic [together] and add to pot along with milk. After [cooking and] cutting up the tarru, plunge them [to braise] in stock [from the pot].',
      attribution: 'YBC 4644, the tarru entry — bracketed matter is the editor’s',
    },
    ingredientGroups: [
      {
        name: 'The broth',
        items: [
          {
            ancient: 'tarru',
            modern: 'Poussin or guinea fowl, whole — standing in for francolin',
            qty: '2 birds',
            grade: 'inferred',
            note: 'tarru',
          },
          { ancient: 'lipû', modern: 'Lamb or sheep fat', qty: '50 g', grade: 'attested' },
          { ancient: 'mû', modern: 'Water', qty: '1.2 L', grade: 'attested' },
          { ancient: 'ṭābtu', modern: 'Salt', qty: '2 tsp', grade: 'attested' },
          { ancient: 'bappiru', modern: 'Hulled malt cake — dried malt loaf, or malted barley flour', qty: '80 g', grade: 'attested', note: 'maltcake' },
          { ancient: 'šamaškillu', modern: 'Onion, squeezed to a pulp', qty: '2', grade: 'attested' },
          { ancient: 'samīdu', modern: 'Samidu — unidentified; leave it out, or use a little fine semolina', qty: '2 tbsp', grade: 'unidentified', note: 'samidu' },
          { ancient: 'karašu', modern: 'Leek, squeezed to a pulp', qty: '2', grade: 'attested' },
          { ancient: 'ḫazannu', modern: 'Garlic, crushed', qty: '1 head', grade: 'attested' },
          { ancient: 'šizbu', modern: 'Milk', qty: '250 ml', grade: 'attested' },
          { ancient: 'kamūnu', modern: 'Cumin seed, whole', qty: '2 tsp', grade: 'attested' },
          { ancient: 'kisibirru', modern: 'Coriander seed, ground', qty: '2 tsp', grade: 'attested' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The broth',
        steps: [
          {
            text: 'Boil the water and throw in the fat. Nothing is browned first — the tablet has a verb for searing and does not use it here.',
            grade: 'attested',
          },
          {
            text: 'Dress the birds and put them in the pot whole. Add coarse salt as needed.',
            grade: 'attested',
          },
          {
            text: 'Crumble in the malt cake. Squeeze the onion, the leek and the garlic together to their juices and add them with the milk. Bring to a bare tremble.',
            grade: 'attested',
          },
          {
            text: 'Hold at a tremble for forty-five minutes, until the leg gives. A pot with milk in it must never boil hard, and a lean bird boiled hard goes stringy and does not come back.',
            grade: 'inferred',
          },
          {
            text: 'Lift the birds out, joint them, and plunge the pieces back into the stock to braise for a few minutes more. The tablet is specific about this two-stage move and it is what separates the dish from a plain boiled bird.',
            grade: 'attested',
          },
        ],
      },
    ],
    apparatus: [
      {
        term: 'tarru',
        text: 'Read as the francolin, a ground-dwelling game bird of the partridge family. Nothing in a modern shop is the same bird; a poussin is the closest for size and cooking time, guinea fowl the closest for flavour. Either is a stand-in and neither is the thing.',
      },
    ],
    substitutions: [
      { from: 'francolin', to: 'Two poussins, or one guinea fowl jointed', text: 'Size and cooking time matter more here than species.' },
      { from: 'Barley beer', to: 'Any unhopped, cloudy wheat beer', text: 'Hops did not exist in this kitchen and a hopped beer will make the broth bitter.' },
    ],
    sources: [
      'YBC 4644 (Yale Babylonian Collection)',
      'Bottéro, Textes culinaires Mésopotamiens (1995)',
      'Barjamovic, Jurado Gonzalez, Graham, Lassen, Nasrallah & Sörensen, in Ancient Mesopotamia Speaks (2019)',
    ],
  },
  {
    slug: 'beet-greens-silqu',
    title: 'Beet Greens in Broth',
    ancient: 'SILQU',
    translit: 'silqu',
    language: 'Akkadian',
    region: 'mesopotamia',
    category: 'Pulses & Vegetables',
    siglum: 'YBC 4644',
    provenance: 'Southern Mesopotamia · Yale Babylonian Collection',
    period: 'Old Babylonian',
    date: 'c. 1730 BC',
    serves: 'Serves 4',
    time: '35 min',
    grade: 'reconstructed',
    summary:
      'The vegetable the tablet names most confidently, cooked on its own — the quickest thing in the Mesopotamian shelf and the one you will actually make on a weeknight.',
    intro:
      'Nobody is seriously fighting over silqu, which makes it a rarity here: the word is beet, one of the safer plant identifications in the corpus. Whether a given entry means the root, the leaf or both is usually past recovering, so this uses the whole plant — which is what a cook with a bunch of it in front of them would have done anyway. Inside tuḫ’u it is one ingredient among fourteen. Here it is dinner: greens, alliums, fat, a little souring at the close, thirty-five minutes.',
    sourceText: {
      kind: 'paraphrase',
      text: 'A brief vegetable entry. Water and fat; salt; the silqu with onion, leek and garlic; herbs at the close.',
      attribution: 'YBC 4644 — summarised. Short entries like this one carry no method beyond the order of the ingredients.',
    },
    ingredientGroups: [
      {
        name: 'The pot',
        items: [
          { ancient: 'silqu', modern: 'Beetroot leaves and stems, or chard — the same plant', qty: '600 g', grade: 'attested' },
          { ancient: 'silqu', modern: 'Beetroot, peeled and cut small', qty: '250 g', grade: 'attested' },
          { ancient: 'lipû', modern: 'Sheep fat, or olive oil', qty: '40 g', grade: 'attested' },
          { ancient: 'mû', modern: 'Water', qty: '400 ml', grade: 'attested' },
          { ancient: 'ṭābtu', modern: 'Salt', qty: '1½ tsp', grade: 'attested' },
          { ancient: 'šamaškillu', modern: 'Onion, sliced thin', qty: '1 large', grade: 'attested' },
          { ancient: 'karašu', modern: 'Leek, sliced', qty: '2', grade: 'attested' },
          { ancient: 'ḫazannu', modern: 'Garlic, crushed', qty: '4 cloves', grade: 'attested' },
          { ancient: 'kisibirru', modern: 'Fresh coriander leaf, torn', qty: '1 bunch', grade: 'attested' },
          { ancient: 'kisimmu', modern: 'Strained sheep or goat yoghurt, to finish', qty: '150 g', grade: 'inferred' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The pot',
        steps: [
          {
            text: 'Warm the fat in a wide pot and soften the onion and leek in it with the salt, without colouring them, for eight minutes.',
            grade: 'inferred',
          },
          {
            text: 'Add the diced beetroot and the water. Cover and cook at a low tremble for fifteen minutes, until the root is nearly tender.',
            grade: 'inferred',
          },
          {
            text: 'Stack the leaves and stems in on top, cover again, and give them six or seven minutes — the stems should still have a little bite.',
            grade: 'inferred',
          },
          {
            text: 'Off the fire, stir through the raw crushed garlic and the coriander leaf.',
            grade: 'attested',
          },
          {
            text: 'Spoon the strained yoghurt over at the table rather than stirring it into the pot. The dish is deep red and the white on top is half the pleasure of it.',
            grade: 'reconstructed',
          },
        ],
      },
    ],
    apparatus: [
      {
        term: 'silqu',
        text: 'One of the safer plant identifications in the corpus: beet. Whether a given entry means the root, the leaf or both is usually not recoverable, and in practice a Babylonian cook would have had the whole plant in front of them and used all of it — which is what this does.',
      },
    ],
    substitutions: [
      { from: 'Beet leaves', to: 'Chard, or the tops sold on bunched beetroot', text: 'Botanically the same species. Chard is simply beet bred for leaf.' },
      { from: 'Sheep fat', to: 'Olive oil', text: 'Changes the dish toward the coast, and is no less period-correct for it.' },
    ],
    sources: [
      'YBC 4644 (Yale Babylonian Collection)',
      'Bottéro, Textes culinaires Mésopotamiens (1995)',
      'Barjamovic, Jurado Gonzalez, Graham, Lassen, Nasrallah & Sörensen, in Ancient Mesopotamia Speaks (2019)',
    ],
  },

  // ── Mari ──────────────────────────────────────────────────────────────
  //
  // Mari is not a recipe archive. It is a PALACE archive — letters, receipts, ration
  // lists — and what it gives the kitchen is not method but seasonality, prestige and
  // supply: what arrived, from whom, at what time of year, and who was pleased to get it.
  // The truffles are the clearest case in the whole corpus of a food we can date to a
  // month and place in a specific king's hands, and know nothing whatever about the
  // cooking of.
  {
    slug: 'desert-truffles-mari',
    title: 'Desert Truffles for the Palace',
    ancient: 'KAMʾATU',
    translit: 'kamʾatu',
    language: 'Akkadian',
    region: 'mesopotamia',
    category: 'Pulses & Vegetables',
    siglum: 'ARM · Mari palace archives',
    provenance: 'Mari (Tell Hariri), middle Euphrates · Royal Archives',
    period: 'Old Babylonian',
    date: 'c. 1770 BC',
    serves: 'Serves 4',
    time: '40 min',
    grade: 'reconstructed',
    summary:
      'A spring delicacy gathered off the steppe and sent to the king by letter — the best-dated food in the corpus, and one nobody wrote a method for.',
    intro:
      'Somebody at Mari was in trouble for sending poor truffles. The palace letters record the consignments as they came in off the steppe — how many, in what condition, who was slow, who sent bad ones. So here is a food we can place inside a season and a reign, Zimri-Lim’s, in the decades before Hammurabi burned the palace, and about whose cooking not one line ever reached you. What follows is the treatment they still get across Syria and Iraq: cleaned hard, cooked in fat with an allium, otherwise left alone. Their whole quality is a mild earthy sweetness and anything assertive buries it.',
    sourceText: {
      kind: 'paraphrase',
      text: 'The archive records consignments of truffles reaching the palace, with remarks on quantity and quality and on the conduct of those responsible for sending them. Nothing in the letters describes how they were prepared.',
      attribution: 'Mari royal correspondence — attests the food, its season and its standing, not its cooking',
    },
    ingredientGroups: [
      {
        name: 'The pot',
        items: [
          {
            ancient: 'kamʾatu',
            modern: 'Desert truffles, or a mix of chestnut and king oyster mushrooms',
            qty: '500 g',
            grade: 'attested',
            note: 'truffles',
          },
          { ancient: 'lipû', modern: 'Clarified butter, or sheep fat', qty: '50 g', grade: 'inferred' },
          { ancient: 'šamaškillu', modern: 'Onion, sliced thin', qty: '1 large', grade: 'inferred' },
          { ancient: 'ṭābtu', modern: 'Salt', qty: '1 tsp', grade: 'inferred' },
          { ancient: 'kamūnu', modern: 'Cumin seed, whole', qty: '1 tsp', grade: 'inferred' },
          { ancient: 'kisibirru', modern: 'Fresh coriander leaf, torn', qty: '1 small bunch', grade: 'inferred' },
          { ancient: 'mû', modern: 'Water', qty: '150 ml', grade: 'inferred' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The pot',
        steps: [
          {
            text: 'Clean them properly. Desert truffles come out of sand and hold it; scrub under running water, and if they are gritty, halve and rinse the cut faces. Grit is the one fault that ruins the dish and it cannot be corrected later.',
            grade: 'reconstructed',
          },
          {
            text: 'Halve or quarter them so every piece has a cut face, and pat them dry.',
            grade: 'reconstructed',
          },
          {
            text: 'Melt the fat in a wide pan and soften the onion in it with the salt, without colouring, for six or seven minutes.',
            grade: 'inferred',
          },
          {
            text: 'Turn the heat up, lay the truffles cut face down and leave them alone until they take colour. Move them too early and they weep and stew instead.',
            grade: 'reconstructed',
          },
          {
            text: 'Add the cumin and the water, cover, and let them steam for twelve to fifteen minutes until a knife goes in without resistance.',
            grade: 'reconstructed',
          },
          {
            text: 'Off the heat, scatter the coriander leaf. Serve with bread, as a dish in its own right rather than beside meat — which is what its standing in the letters implies.',
            grade: 'inferred',
          },
        ],
      },
    ],
    apparatus: [
      {
        term: 'What the archive proves',
        text: 'That this food existed, mattered enough to write letters about, arrived in spring, and was worth a king’s displeasure when it came late or poor. That is genuinely more than you know about most dishes here. It is also not a recipe, and the method below is a modern steppe treatment rather than a reconstruction of a Babylonian one — hence the grading.',
      },
      {
        term: 'kamʾatu',
        text: 'Desert truffles, of the family that fruits under the sand of the Syrian and Iraqi steppe after the spring rains. Nothing like the European black or white truffle: far milder, meatier, closer to a firm mushroom than to anything aromatic. They are still gathered and sold across the region in spring under the name kamaa.',
      },
    ],
    substitutions: [
      {
        from: 'Desert truffles',
        to: 'Chestnut mushrooms and king oyster, halved, 500 g',
        text: 'Not the same thing and not pretending to be. Aim for firm texture and mildness — a European truffle is the one substitution that would be actively wrong, because its whole character is an aroma these do not have.',
      },
      {
        from: 'Clarified butter',
        to: 'Sheep fat, or olive oil',
        text: 'All three are period-correct. Butter is the richest and suits the mildness best.',
      },
    ],
    sources: [
      'Mari royal correspondence (Archives Royales de Mari)',
      'Chicago Assyrian Dictionary, s.v. kamʾatu',
    ],
  },

  {
    slug: 'roast-barley-pilaf-ybc25',
    title: 'Roasted Barley with Greens',
    ancient: 'ŠE.SA.A',
    translit: 'še.sa.a',
    language: 'Akkadian',
    region: 'mesopotamia',
    category: 'Breads & Grain',
    siglum: 'YBC 4644 · recipe 25',
    provenance: 'Southern Mesopotamia · Yale Babylonian Collection',
    period: 'Old Babylonian',
    date: 'c. 1730 BC',
    serves: 'Serves 4',
    time: '45 min',
    grade: 'attested',
    summary:
      'The last entry on the tablet, and the only grain dish among the twenty-five — barley roasted dry before it ever meets liquid.',
    intro:
      'Toast the grain before it ever meets liquid and you have a pilaf; skip that and you have porridge. Entry twenty-five, the last on the tablet and the only grain-led one among the twenty-five, puts that step at the front. Finding the technique written down in the eighteenth century BC is more interesting than any single ingredient here. The entry also calls for blood, as several do. It stays in the list and is optional in the method, because pretending the line is not there would be the wrong kind of tidying.',
    sourceText: {
      kind: 'paraphrase',
      text: 'A grain and herb dish using roasted barley, with shallots, arugula, coriander, semolina, blood, leeks and garlic.',
      attribution: 'YBC 4644, recipe 25 — the final entry, summarised from the published ingredient sequence',
    },
    ingredientGroups: [
      {
        name: 'The pot',
        items: [
          { ancient: 'ŠE.SA.A', modern: 'Pearl barley', qty: '250 g', grade: 'attested' },
          { ancient: 'lipû', modern: 'Sheep fat, or sesame oil', qty: '3 tbsp', grade: 'attested' },
          { ancient: 'šamaškillu', modern: 'Persian shallots, or banana shallots, sliced', qty: '4', grade: 'attested' },
          { ancient: 'karašu', modern: 'Leek, sliced', qty: '2', grade: 'attested' },
          { ancient: 'ḫazannu', modern: 'Garlic, crushed', qty: '6 cloves', grade: 'attested' },
          { ancient: 'egengiru', modern: 'Rocket / arugula, roughly chopped', qty: '2 handfuls', grade: 'attested' },
          { ancient: 'kisibirru', modern: 'Fresh coriander leaf, chopped', qty: '1 bunch', grade: 'attested' },
          {
            ancient: 'samīdu',
            modern: 'Samidu — unidentified; a little fine semolina, or leave it out',
            qty: '2 tbsp',
            grade: 'unidentified',
            note: 'samidu',
          },
          { ancient: 'mû', modern: 'Water', qty: '700 ml', grade: 'inferred' },
          { ancient: 'ṭābtu', modern: 'Salt', qty: '2 tsp', grade: 'inferred' },
          {
            ancient: 'dāmu',
            modern: 'Blood, to bind — optional, and easily left out',
            qty: '100 ml',
            grade: 'attested',
            note: 'blood',
          },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The pot',
        steps: [
          {
            text: 'Toast the dry barley in a heavy pot over a medium fire, moving it, until it colours and smells of bread. Six or seven minutes. This is the step the whole dish is named for and it cannot be hurried or skipped.',
            grade: 'attested',
          },
          { text: 'Tip the barley out and set it aside. Warm the fat in the same pot.', grade: 'inferred' },
          {
            text: 'Soften the shallots and leek in the fat with the salt for eight minutes, without colouring them.',
            grade: 'inferred',
          },
          {
            text: 'Return the barley, add the water, and simmer covered for twenty-five minutes until the grain is tender and the liquid nearly gone.',
            grade: 'inferred',
          },
          {
            text: 'Stir in the rocket and let it wilt into the hot grain off the heat — it should keep its pepper.',
            grade: 'attested',
          },
          {
            text: 'If you are using the blood, temper it with a ladle of the hot liquid and stir it through now, off the fire. It will bind and darken the dish. Left out, the pot is looser and paler and still good.',
            grade: 'reconstructed',
          },
          { text: 'Finish with the raw garlic and the coriander leaf.', grade: 'attested' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'Why this one matters',
        text: 'It is the only grain-led entry among the twenty-five, and it puts a dry-roasting step at the front. That technique is the difference between a pilaf and a porridge, and finding it written down in the eighteenth century BC is more interesting than any single ingredient on the tablet.',
      },
      {
        term: 'Blood',
        text: 'In the entry, and optional here. Several recipes on this tablet bind with blood; it darkens and thickens without tasting strongly of itself. Left out, nothing else changes.',
      },
    ],
    substitutions: [
      { from: 'Persian shallot', to: 'Banana shallots, or two ordinary onions', text: 'A stand-in for a stand-in — the ancient term is not securely identified either.' },
      { from: 'Blood', to: 'Leave it out', text: 'The one ingredient here most people will skip, and the dish survives it.' },
    ],
    sources: [
      'YBC 4644 (Yale Babylonian Collection)',
      'Bottéro, Textes culinaires Mésopotamiens (1995)',
      'Barjamovic, Jurado Gonzalez, Graham, Lassen, Nasrallah & Sörensen, in Ancient Mesopotamia Speaks (2019)',
    ],
  },
  {
    slug: 'kid-stew-with-soured-milk',
    title: 'Kid in Blood and Soured Milk',
    ancient: 'MÊ UNIQI',
    translit: 'mê uniqi',
    language: 'Akkadian',
    region: 'mesopotamia',
    category: 'Stews & Broths',
    siglum: 'YBC 4644',
    provenance: 'Southern Mesopotamia · Yale Babylonian Collection',
    period: 'Old Babylonian',
    date: 'c. 1730 BC',
    serves: 'Serves 4',
    time: '2 hr',
    grade: 'attested',
    summary:
      'Kid strengthened with mutton, in a sauce bound with blood and soured milk — and the entry begins by telling you to singe the head, legs and tail over the flame.',
    intro:
      'Singe the head, the legs and the tail over an open flame before any of it goes near the pot. That is the first thing the entry says, and it is not ceremony: singeing takes off the hair and firms the skin so the extremities hold together through hours in liquid. It is still done across the region wherever heads and trotters are cooked. The second instruction is stranger to a modern ear — the entry wants mutton in with the kid, an older and stronger meat put in deliberately to sharpen a mild young one. The sauce is bound the way several dishes on this tablet are, with blood and soured milk together.',
    sourceText: {
      kind: 'quotation',
      text: 'Singe head, legs and tail over flame [before putting in pot]. Meat [in addition to kid] is needed, [preferably mutton to sharpen the flavor]. Bring water to boil. Throw in fat. Squeeze onion, samîdu [a plant probably of the onion family, and] garlic [to extract juices, add to pot with] blood and soured milk.',
      attribution: 'YBC 4644 — bracketed matter is the editor’s',
    },
    ingredientGroups: [
      {
        name: 'The pot',
        items: [
          { ancient: 'unīqu', modern: 'Kid, on the bone, cut into pieces', qty: '1 kg', grade: 'attested' },
          {
            ancient: 'šīru',
            modern: 'Mutton or older lamb, on the bone — added to sharpen the kid',
            qty: '400 g',
            grade: 'attested',
          },
          { ancient: 'lipû', modern: 'Sheep fat', qty: '60 g', grade: 'attested' },
          { ancient: 'mû', modern: 'Water', qty: '1.5 L', grade: 'attested' },
          { ancient: 'šamaškillu', modern: 'Onion, squeezed to a pulp', qty: '3', grade: 'attested' },
          {
            ancient: 'samīdu',
            modern: 'Samidu — unidentified, probably an allium; use a few more shallots',
            qty: '3',
            grade: 'unidentified',
            note: 'samidu',
          },
          { ancient: 'ḫazannu', modern: 'Garlic, crushed to a paste', qty: '1 head', grade: 'attested' },
          { ancient: 'ṭābtu', modern: 'Salt', qty: '2 tsp', grade: 'inferred' },
          {
            ancient: 'dāmu',
            modern: 'Blood — or black pudding, crumbled in',
            qty: '200 ml / 150 g',
            grade: 'attested',
            note: 'blood',
          },
          { ancient: 'kisimmu', modern: 'Soured milk, or thin live yoghurt', qty: '300 ml', grade: 'attested' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The pot',
        steps: [
          {
            text: 'If you have the extremities, singe them over an open flame until the hair is gone and the skin tightens. If you are working from jointed shoulder, skip this — it is the one step a supermarket has already done for you, badly.',
            grade: 'attested',
          },
          { text: 'Bring the water to a boil and throw in the fat.', grade: 'attested' },
          {
            text: 'Add the kid and the mutton together. The older meat is not filler; it is there to give the young meat a backbone, and leaving it out makes a blander dish.',
            grade: 'attested',
          },
          { text: 'Skim until the surface runs clear, then hold at a bare tremble for an hour and a half.', grade: 'inferred' },
          {
            text: 'Squeeze the onion, the shallots and the garlic to their juices and add them with the salt. Give it fifteen minutes more.',
            grade: 'attested',
          },
          { text: 'Draw the pot off the fire and let the boil fall away completely.', grade: 'inferred' },
          {
            text: 'Temper the blood with a ladle of hot broth, stir it back, and return to a low heat without boiling until it thickens.',
            grade: 'reconstructed',
          },
          {
            text: 'Temper the soured milk the same way and stir it in last. Serve at once; it does not sit well.',
            grade: 'attested',
          },
        ],
      },
    ],
    apparatus: [
      {
        term: 'Two meats',
        text: 'Adding mutton to kid is a deliberate seasoning decision, not economy. Young goat is mild to the point of being characterless in a long braise; a smaller quantity of older, stronger meat gives the pot something to be. The same logic runs through the tablet, which repeatedly builds flavour by combination rather than by spice.',
      },
      {
        term: 'Singeing',
        text: 'Still done across the eastern Mediterranean and the Near East wherever heads and trotters are cooked. It removes hair and firms the skin so the extremities survive hours in liquid. Almost nobody buying meat in a supermarket will need it, which is itself worth noticing about how much of this cuisine assumed a whole animal.',
      },
    ],
    substitutions: [
      { from: 'Kid', to: 'Goat shoulder, or lamb shoulder', text: 'Goat is increasingly on supermarket shelves; lamb changes the dish least of the alternatives.' },
      { from: 'Blood', to: 'Black pudding, 150 g, crumbled in off the heat', text: 'Declared rather than quietly dropped.' },
      { from: 'samidu', to: 'Three more shallots', text: 'A guess wearing a label, as everywhere else this word appears.' },
    ],
    sources: [
      'YBC 4644 (Yale Babylonian Collection)',
      'Bottéro, Textes culinaires Mésopotamiens (1995)',
      'Barjamovic, Jurado Gonzalez, Graham, Lassen, Nasrallah & Sörensen, in Ancient Mesopotamia Speaks (2019)',
    ],
  },

  // ─────────────────────────────── EGYPT ───────────────────────────────
  {
    slug: 'emmer-loaves-in-conical-moulds',
    title: 'Emmer Loaves Baked in Conical Moulds',
    ancient: 'T · BEDJA MOULDS',
    translit: 'ta',
    language: 'Egyptian',
    region: 'egypt',
    category: 'Breads & Grain',
    siglum: 'TT100 (Rekhmire) · TT8 (Kha and Merit)',
    provenance: 'Theban necropolis · tomb relief and preserved grave provisions',
    period: 'New Kingdom, 18th Dynasty',
    date: 'c. 1450 – 1400 BC',
    serves: 'Makes 8 loaves',
    time: '5 hr, mostly waiting',
    grade: 'attested',
    featured: true,
    summary: 'The best-evidenced bread in the ancient world: you have the moulds, the wall paintings of the bakery, and the loaves themselves.',
    intro:
      'You have the moulds by the thousand. You have the bakery painted in register on the tomb wall — grinding, sieving, mixing, heating the moulds, filling, baking, turning out. And from the tomb of the architect Kha and his wife Merit you have the loaves themselves, dry and intact. What no source anywhere gives you is a method, because bread was the least remarkable thing in Egypt and nobody troubles to write down the obvious.',
    sourceText: {
      kind: 'paraphrase',
      text: 'The bakery sequence is depicted in register on the tomb walls: grain ground on a saddle quern, dough mixed in bulk, tall conical ceramic moulds pre-heated in the fire, filled with dough, closed, and baked. Loaves of comparable form survive as grave provisions.',
      attribution: 'Theban tomb reliefs, with the physical loaves from TT8',
    },
    ingredientGroups: [
      {
        name: 'The dough',
        items: [
          { ancient: 'bdt', modern: 'Wholemeal emmer flour', qty: '1 kg', grade: 'attested', note: 'emmer' },
          { ancient: 'mw', modern: 'Water, blood-warm', qty: '650 ml', grade: 'inferred' },
          { ancient: '—', modern: 'A live sourdough starter of emmer, or a portion of the previous day’s dough', qty: '200 g', grade: 'inferred', note: 'leaven' },
          { ancient: 'ḥmꜣt', modern: 'Salt', qty: '18 g', grade: 'reconstructed' },
        ],
      },
      {
        name: 'The moulds',
        items: [
          { ancient: 'bḏꜣ', modern: 'Tall conical unglazed clay moulds, or unglazed terracotta flower pots', qty: '8', grade: 'attested', note: 'bedja' },
          { ancient: '—', modern: 'Fat or oil, for the moulds', qty: 'as needed', grade: 'inferred' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The dough',
        steps: [
          { text: 'If you are working from whole emmer grain, parch it briefly in a dry pan before pounding. Emmer is a hulled wheat and will not release its grain otherwise. No Egyptian source states this because no Egyptian baker needed telling — it is the single most important unwritten fact about Bronze Age grain.', grade: 'inferred' },
          { text: 'Mix flour, water and starter to a slack, sticky dough. Emmer is low in gluten and will never come smooth and elastic; stop expecting it to.', grade: 'inferred' },
          { text: 'Add the salt, work it through, and leave the dough covered for three to four hours in a warm place until risen and visibly bubbled.', grade: 'reconstructed' },
        ],
      },
      {
        name: 'The bake',
        steps: [
          { text: 'Heat the oven as hot as it will go, with the empty moulds inside it. The moulds must be hot before the dough meets them — this is the step the tomb painters show most clearly, and it is what gives the loaf its crust.', grade: 'attested' },
          { text: 'Take the moulds out, wipe them with fat, and fill each about two thirds with dough.', grade: 'attested' },
          { text: 'Return to the oven and bake 35 to 40 minutes, until the loaves have pulled from the sides and sound hollow.', grade: 'reconstructed' },
          { text: 'Turn out and cool on the mould. Eat within the day; emmer bread goes to stone by the second, which is why Egypt ate it fresh and turned the rest into beer.', grade: 'inferred' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'emmer',
        text: 'Triticum dicoccum, and not interchangeable with modern bread wheat. It is hulled, lower in gluten, and behaves quite differently in the hand. Substituting modern wheat produces a good loaf and not this loaf.',
      },
      {
        term: 'leaven',
        text: 'Leavened bread is universally accepted for New Kingdom Egypt on the evidence of the loaves themselves and of the brewing industry beside the bakery, but no text describes keeping a starter. A wild-caught emmer starter is the closest reconstruction available.',
      },
      {
        term: 'bedja',
        text: 'The tall conical mould. Fired unglazed and used repeatedly; found in enormous quantity at bakery sites. An unglazed terracotta flower pot, plugged at the drain hole, is a functional stand-in and behaves correctly in the oven.',
      },
    ],
    substitutions: [
      { from: 'Emmer flour', to: 'Spelt flour', text: 'The nearest hulled wheat in common supply. Closer than modern bread wheat by a wide margin, and still not emmer.' },
    ],
    sources: ['TT100, tomb of Rekhmire', 'TT8, tomb of Kha and Merit (preserved loaves)', 'Samuel, on ancient Egyptian bread and beer technology'],
  },

  {
    slug: 'emmer-porridge-with-curds-delta',
    title: 'Morning Emmer with Curds and Greens',
    ancient: 'Kmt',
    translit: 'kmt',
    language: 'Egyptian',
    region: 'egypt',
    category: 'Breads & Grain',
    siglum: 'Ration texts · Delta settlement archaeobotany',
    provenance: 'A village in the Nile Delta',
    period: 'New Kingdom',
    date: 'c. 1250 BC',
    serves: 'Serves 4',
    time: '40 min',
    grade: 'reconstructed',
    summary:
      'The other thing Egyptians did with grain. Bread gets all the attention; this is what the same emmer becomes when nobody is baking.',
    intro:
      'Egypt is described, over and over, as a civilisation of bread and beer, and that is true and it is also the end of most accounts. But grain does not only become bread. It becomes this: cracked, boiled soft, eaten with whatever the household has — curds if the goat is giving, green onion tops, a few dates, oil if there is oil. There is no temple in this dish and no scribe recorded it. It is what a family in a Delta village eats in the morning before the day starts, and the reason we can be confident it existed is that cracked grain and a pot are older than Egypt.',
    sourceText: {
      kind: 'paraphrase',
      text: 'Ration texts issue grain and beer by the person and by the day. Emmer is the dominant Egyptian wheat throughout the pharaonic period, recovered in bulk from settlement sites. Dairying, onions, dates and leafy greens are all attested in settlement deposits and tomb painting. No text records a porridge.',
      attribution: 'New Kingdom ration texts and Delta settlement archaeobotany',
    },
    ingredientGroups: [
      {
        name: 'The pot',
        items: [
          { ancient: 't', modern: 'Cracked emmer wheat, or coarse bulgur or spelt', qty: '250 g', grade: 'attested', note: 'emmer' },
          { ancient: '—', modern: 'Water', qty: '900 ml', grade: 'inferred' },
          { ancient: 'ḥmꜣt', modern: 'Salt', qty: '1 tsp, plus more at the end', grade: 'attested' },
        ],
      },
      {
        name: 'Over the top',
        items: [
          { ancient: '—', modern: 'Fresh curd cheese, or thick yoghurt', qty: '200 g', grade: 'attested' },
          { ancient: '—', modern: 'Spring onions, green tops included, sliced', qty: '4', grade: 'attested' },
          { ancient: '—', modern: 'Fresh coriander and celery leaf, chopped', qty: '2 handfuls', grade: 'attested' },
          { ancient: '—', modern: 'Dates, stoned and torn', qty: '6', grade: 'attested' },
          { ancient: '—', modern: 'Oil — sesame, or olive', qty: '3 tbsp', grade: 'attested' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The pot',
        steps: [
          { text: 'Toast the cracked grain dry in the pot for two or three minutes, until it smells of biscuit. This is the step people skip and it is the one that makes the difference.', grade: 'reconstructed' },
          { text: 'Add the water and the salt, bring it up, then drop it to the barest simmer and cover. Twenty-five to thirty minutes, until the grain is soft and has drunk nearly everything.', grade: 'reconstructed' },
          { text: 'Beat it hard with a spoon for half a minute. It goes from grain in water to something creamy, and no extra ingredient does that.', grade: 'reconstructed' },
        ],
      },
      {
        name: 'The table',
        steps: [
          { text: 'Spoon it into bowls while it is loose — it thickens as it stands, and thick is the failure state.', grade: 'reconstructed' },
          { text: 'Put the curd on in a soft heap, not stirred through. Scatter the onion, the herbs and the torn dates over it.', grade: 'reconstructed' },
          { text: 'Pour the oil over the lot and salt it again at the table. Everyone stirs their own.', grade: 'reconstructed' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'Standing',
        text: 'No Egyptian text describes a porridge. What the texts describe is grain, issued by volume, to people, daily — and your archaeology gives you the grain, the pots and the querns. A dish this simple does not need a recipe to have existed; it needs a pot and somebody hungry, and Egypt had both in enormous quantity. This is a reconstruction with a very high prior.',
      },
      {
        term: 'emmer',
        text: 'Emmer, not bread wheat. It is a hulled wheat — the grain does not thresh free of its husk — which makes it a nuisance to process and is exactly why the modern world abandoned it. Egypt grew it for three thousand years anyway. Spelt is its closest supermarket relative; coarse bulgur is the easiest substitute and is cracked durum, which is not the same wheat but behaves like it.',
      },
      {
        term: 'What a ration actually was',
        text: 'The best-documented Egyptian food is not a meal, it is an issue: so many measures of grain and so many jugs of beer, per man, per month, written down because somebody had to account for it. That is why you know what workmen were GIVEN and almost nothing about what they made with it. The gap between the two is where every dish here lives.',
      },
    ],
    substitutions: [
      { from: 'Cracked emmer', to: 'Coarse bulgur, spelt, or pearl barley', text: 'Bulgur is quickest and closest in texture. Barley is period-correct and takes longer and goes stickier, which is not a fault.' },
      { from: 'Fresh curd', to: 'Thick Greek yoghurt, or ricotta', text: 'Wants to be mild and cool against the hot grain.' },
    ],
    sources: ['New Kingdom ration texts', 'Delta settlement archaeobotany', 'Tomb paintings of grain processing'],
  },
  {
    slug: 'tiger-nut-and-honey-cones',
    title: 'Tiger Nut and Honey Cones',
    ancient: "WꜤḤ",
    translit: "wa'ah",
    language: 'Egyptian',
    region: 'egypt',
    category: 'Sweets & Confections',
    siglum: 'TT100 (Rekhmire)',
    provenance: 'Theban necropolis · tomb relief',
    period: 'New Kingdom, 18th Dynasty',
    date: 'c. 1450 BC',
    serves: 'Makes about 20',
    time: '1 hr, plus overnight soak',
    grade: 'inferred',
    summary: 'A sweet made from a tuber, shown being formed into cones on the wall of a vizier’s tomb.',
    intro:
      'Tiger nut is not a nut. It is the tuber of a sedge, Cyperus esculentus, sweet and dense and oily, and Egyptians ate it from the Predynastic onward — found in graves, listed in offerings, and held in the hands of confectioners on the wall of Rekhmire’s tomb, where the sequence appears to run from grinding to mixing with honey to forming into cones. Read that way, it is one of the oldest depicted sweets on earth. The painting carries no caption. Read is doing a great deal of work in that sentence, and the reading is not universally accepted.',
    sourceText: {
      kind: 'paraphrase',
      text: 'A register of the tomb shows confectioners at work: a substance ground, combined, and shaped into conical forms. The identification of the substance as tiger nut and of the process as a honey confection is a scholarly reading of the image, not a caption.',
      attribution: 'TT100, tomb of Rekhmire, Thebes',
    },
    ingredientGroups: [
      {
        name: 'The cones',
        items: [
          { ancient: 'wꜥḥ', modern: 'Tiger nuts, dried', qty: '400 g', grade: 'attested' },
          { ancient: 'bı͗t', modern: 'Honey', qty: '150 g', grade: 'attested' },
          { ancient: 'ḥmꜣt', modern: 'Salt', qty: 'a good pinch', grade: 'inferred' },
          { ancient: 'bꜣq (?)', modern: 'Moringa oil, or a mild oil, for the hands', qty: '1 tbsp', grade: 'reconstructed' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The cones',
        steps: [
          { text: 'Soak the dried tiger nuts overnight in cold water. They rehydrate to something between a nut and a raw chestnut and stop being able to break your teeth.', grade: 'inferred' },
          { text: 'Drain well and grind to a coarse, damp meal — a mortar if you have the patience, a food processor if you do not.', grade: 'attested' },
          { text: 'Work in the honey and the salt. The mass should be heavy and just cohesive.', grade: 'reconstructed' },
          { text: 'Oil your hands. Form the mixture into cones about the length of a thumb, pressing firmly so they hold.', grade: 'attested' },
          { text: 'Set on a board in a warm dry place for several hours to firm. They are not baked in any reading of the image, and they do not need it.', grade: 'reconstructed' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'Standing',
        text: 'The ingredient is securely attested for Egypt over two thousand years. The confection is a reading of a painted sequence — a sound reading, and still a reading.',
      },
    ],
    substitutions: [
      { from: 'Tiger nuts', to: 'There is no substitute', text: 'They are sold widely, dried, for horchata de chufa. If you cannot get them, cook something else.' },
    ],
    sources: ['TT100, tomb of Rekhmire', 'Egyptian offering lists and grave provisions naming wꜥḥ'],
  },

  {
    slug: 'roast-duck-for-the-gods-table',
    title: 'A Duck for the God’s Table',
    ancient: 'mn-nfr',
    translit: 'mn-nfr',
    language: 'Egyptian',
    region: 'egypt',
    category: 'Roasts & Hearth',
    siglum: 'Offering lists · temple daily ritual texts',
    provenance: 'A temple kitchen at Mennefer, under the pyramids',
    period: 'New Kingdom',
    date: 'c. 1250 BC',
    serves: 'Serves 4, or one god and then four people',
    time: '1 hr 40 min',
    grade: 'reconstructed',
    summary:
      'Cooked to be looked at first and eaten second — which turns out to change how you cook it.',
    intro:
      'A temple served its god a meal every day: real food, carried in, set down, left, and taken away again. This is a bird for that table, and the constraint that shapes it is not flavour but appearance — an offering is presented before it is consumed, so it has to look like the best of its kind. That means whole, glazed, unbroken, and arranged rather than served. Then comes the part nobody expects: the god does not eat it, and the food does not go to waste. It is redistributed to the priests and the temple staff, which is how a large fraction of literate Egypt got lunch. Cook it for the look, and eat it anyway.',
    sourceText: {
      kind: 'paraphrase',
      text: 'Temple daily ritual texts describe presenting food and drink to the god, censing, and the withdrawal of the offering. Offering lists itemise bread, beer, wine, oxen, fowl, incense and cloth. The reversion of offerings — the redistribution of presented food to priests and temple personnel — is attested in temple administrative documents. No text gives a method of cooking.',
      attribution: 'Egyptian offering lists and temple ritual texts',
    },
    ingredientGroups: [
      {
        name: 'The bird',
        items: [
          { ancient: '—', modern: 'Whole duck', qty: '1, about 2 kg', grade: 'attested', note: 'fowl' },
          { ancient: 'ḥmꜣt', modern: 'Salt, coarse, for the skin and the cavity', qty: '2 tbsp', grade: 'attested' },
          { ancient: '—', modern: 'Coriander seed, cracked', qty: '1 tbsp', grade: 'attested' },
          { ancient: '—', modern: 'Onions, halved', qty: '3', grade: 'attested' },
          { ancient: '—', modern: 'Dates, stoned', qty: '10', grade: 'attested' },
        ],
      },
      {
        name: 'The glaze, and the table',
        items: [
          { ancient: 'bjt', modern: 'Honey', qty: '2 tbsp', grade: 'attested' },
          { ancient: 'jrp', modern: 'Wine, red', qty: '150 ml', grade: 'attested', note: 'offering' },
          { ancient: '—', modern: 'Rendered duck fat from the tin', qty: 'all of it', grade: 'inferred' },
          { ancient: '—', modern: 'Spring onions and fresh greens, to lay around it', qty: 'a bunch', grade: 'attested' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The bird',
        steps: [
          { text: 'Heat the oven to 160°C. Prick the duck’s skin all over with a fork — through the fat, not into the meat — and rub it hard with the coarse salt and half the coriander seed, inside and out.', grade: 'reconstructed' },
          { text: 'Put the onions and dates in the cavity. Set the bird breast up on a rack over a tin, and roast it for an hour and a quarter, pouring the fat out of the tin twice and keeping every drop.', grade: 'reconstructed' },
          { text: 'Warm the honey with the wine and the rest of the coriander until it is loose. Raise the oven to 210°C.', grade: 'reconstructed' },
          { text: 'Brush the bird with the honey and wine and give it ten minutes. Brush again, ten more. The skin should go dark and glassy, and this is the step the whole dish exists for.', grade: 'reconstructed' },
          { text: 'Rest it twenty minutes and present it WHOLE, on its dish, with the greens laid around it and the dates from the cavity spooned alongside. Carve at the table, and not before.', grade: 'reconstructed' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'Standing',
        text: 'Offering lists tell you what was presented and ritual texts tell you how it was presented. Neither tells you how any of it was cooked. The salt, the fat and the honey glaze here are inference from Egyptian ingredients and from the one requirement the texts DO make plain, which is that the thing had to look right.',
      },
      {
        term: 'The reversion of offerings',
        text: 'The god was served and then the food came back out, to be divided among priests and temple staff. This is attested administratively, not just assumed — a temple was among other things a very large catering operation, and its offering table was the point at which the economy turned back into dinner. It is also the least pious and most human fact in Egyptian religion, and my favourite.',
      },
      {
        term: 'Cooked to be looked at',
        text: 'This is the only dish on the site whose method is driven by appearance. Whole rather than jointed, glazed rather than sauced, arranged rather than served — because the first thing that happens to it is that somebody sets it down in front of a statue and steps back. Once you accept that constraint the cooking follows from it, and the odd thing is that it produces a better bird than aiming straight at flavour would.',
      },
      {
        term: 'fowl',
        text: 'Duck rather than goose deliberately: the goose is already on this site, roasted with figs, and it is the bird Egyptian tomb walls show most. Both were kept and both were offered; ducks appear in enormous numbers in fowling scenes and in the offering lists.',
      },
      {
        term: 'offering',
        text: 'Wine is on the offering lists as itself, poured for the god. Using it in the glaze rather than the cup is mine, not theirs.',
      },
    ],
    substitutions: [
      { from: 'Duck', to: 'Goose, or a large chicken', text: 'Goose is period-correct and fattier and wants longer. Chicken is not — chickens arrive in Egypt properly later — and it will still work, but it is the one substitution here that changes what the dish is claiming.' },
      { from: 'Honey', to: 'Date syrup', text: 'Also attested, slightly darker, slightly less floral. Behaves the same under heat.' },
    ],
    sources: ['Egyptian offering lists', 'Temple daily ritual texts', 'Fowling and offering scenes in New Kingdom tombs'],
  },
  {
    slug: 'split-and-salted-nile-fish',
    title: 'Split and Salted Nile Fish',
    ancient: 'RM',
    translit: 'remu',
    language: 'Egyptian',
    region: 'egypt',
    category: 'Preserves',
    siglum: 'Deir el-Medina ostraca · fish-processing reliefs',
    provenance: 'Nile valley · ration records and tomb scenes',
    period: 'New Kingdom',
    date: 'c. 1500 – 1100 BC',
    serves: 'Preserves 2 kg',
    time: '20 min, then 5–10 days',
    grade: 'attested',
    summary: 'The protein that fed the workmen who built the tombs, and one of Egypt’s reliable exports.',
    intro:
      'Nothing here is less glamorous, and nothing in Egypt was eaten more. The Deir el-Medina workmen were issued fish as a matter of routine and their foremen wrote it down; the reliefs show the whole line, from the catch to the splitting to the gutting to the drying racks. Egypt had a river full of tilapia and mullet, and it had natron, a salt crust that dries out of desert lake beds. Nile species turn up at inland Levantine sites, which means the cure worked and the cure travelled — one of the clearest food-trade signals in the Bronze Age eastern Mediterranean.',
    sourceText: {
      kind: 'paraphrase',
      text: 'Processing scenes show fish taken, split along the length, gutted, and laid out; ration records book fish to named workmen in regular quantities. Salt is a state-controlled commodity in the same records.',
      attribution: 'Deir el-Medina ostraca; Nile fish-processing reliefs',
    },
    ingredientGroups: [
      {
        name: 'The cure',
        items: [
          { ancient: 'rm', modern: 'Whole grey mullet, tilapia, or any firm oily fish', qty: '2 kg', grade: 'attested' },
          { ancient: 'ḥmꜣt', modern: 'Coarse sea salt', qty: '400 g', grade: 'attested' },
          { ancient: '—', modern: 'Ground coriander seed', qty: '2 tbsp', grade: 'reconstructed' },
          { ancient: '—', modern: 'Cumin seed', qty: '1 tbsp', grade: 'reconstructed' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The cure',
        steps: [
          { text: 'Scale the fish. Split each one down the back from head to tail, leaving it joined at the belly, so it opens flat like a book. This is the cut the reliefs show and it is not the cut a modern fishmonger will make unless you ask.', grade: 'attested' },
          { text: 'Gut, and take out the dark bloodline along the spine. It is the first thing to spoil.', grade: 'inferred' },
          { text: 'Rinse in clean water and pat completely dry.', grade: 'inferred' },
          { text: 'Pack salt into the flesh on both sides, heavily, working it right in. Add the coriander and cumin if you want the version we prefer. The salt is the attested part; the spices are ours.', grade: 'attested' },
          { text: 'Lay the fish flat, skin down, on a rack over a tray. Leave in a cold place 24 hours; a good deal of brine will run off. Pour it away.', grade: 'inferred' },
          { text: 'Hang or rack the fish somewhere cool, dry and moving with air for five to ten days, until the flesh is firm and translucent and gives no fingerprint. In Egypt this was the sun. In a northern climate it is a fridge with the door propped or a cold larder.', grade: 'reconstructed' },
          { text: 'Soak in several changes of cold water for a few hours before eating, then grill hard over coals.', grade: 'inferred' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'Method note',
        text: 'Fish preserved this way was traded well beyond Egypt; Nile species turn up at inland Levantine sites, which is direct evidence that the cure worked and that it travelled. It is one of the clearest food-trade signals in the Bronze Age eastern Mediterranean.',
      },
    ],
    substitutions: [
      { from: 'Grey mullet', to: 'Mackerel, sardine, or sea bass', text: 'Oily and firm is what matters. Flat white fish will not hold up.' },
    ],
    sources: ['Deir el-Medina ration ostraca', 'Nile fish-processing tomb reliefs', 'Zooarchaeological reports of Nile species at Levantine sites'],
  },

  {
    slug: 'emmer-beer-heneqet',
    title: 'Emmer Beer',
    ancient: 'ḤNQT',
    translit: 'heneqet',
    language: 'Egyptian',
    region: 'egypt',
    category: 'Drink & Ferment',
    siglum: 'Bakery-brewery sites · archaeobotanical residues',
    provenance: 'Amarna, Giza, Deir el-Medina',
    period: 'New Kingdom',
    date: 'c. 1550 – 1100 BC',
    serves: 'Makes about 4 litres',
    time: '4 days, plus malting',
    grade: 'inferred',
    summary: 'The other half of the Egyptian ration — and a dish whose textbook method was overturned by looking down a microscope.',
    intro:
      'For most of the twentieth century the story was settled: bake loaves, crumble them into water, let the mash ferment. Tidy, plausible, built on a reading of the tomb scenes, and printed in every older book on Egypt. Then the residues from the brewing installations went under a microscope and the grain structures did not match. What they showed was a two-part process — malted grain and unmalted, one part heated and one not — combined and fermented. Closer to brewing than to soaked bread. Bread and beer shared a bakery and a workforce; they did not share a loaf. Both methods are given below, because knowing that a reconstruction can be wrong is most of the point.',
    sourceText: {
      kind: 'paraphrase',
      text: 'Microscopic examination of desiccated residues from Egyptian brewing vessels shows two distinct grain fractions — one malted, one not, one heated, one not — combined and fermented. The crumbled-bread model is not supported by the residues.',
      attribution: 'Archaeobotanical analysis of New Kingdom brewing residues',
    },
    ingredientGroups: [
      {
        name: 'The brew',
        items: [
          { ancient: 'bdt', modern: 'Emmer or barley, malted — sprouted and dried', qty: '1 kg', grade: 'attested', note: 'malt' },
          { ancient: 'bdt', modern: 'Emmer or barley, unmalted, coarsely cracked', qty: '500 g', grade: 'attested' },
          { ancient: 'mw', modern: 'Water', qty: '5 L', grade: 'attested' },
          { ancient: 'ḥmꜣt', modern: 'Salt', qty: '1 tsp', grade: 'reconstructed' },
          { ancient: '—', modern: 'Dates, for a second fermentation', qty: '150 g', grade: 'reconstructed' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The brew',
        steps: [
          { text: 'To malt: steep the grain 24 hours, drain, and keep it damp and covered for two to three days, turning daily, until the shoots run about the length of the grain. Dry it hard in a low oven. This is the step the old model left out entirely.', grade: 'attested' },
          { text: 'Crack the malted grain coarsely. Set half of it aside cold and uncooked.', grade: 'attested' },
          { text: 'Cook the unmalted grain with three litres of water to a thick gruel, then let it cool to blood heat. Heat kills the enzymes, which is why only this half is cooked.', grade: 'attested' },
          { text: 'Stir the raw malted grain into the cooled gruel with the remaining water. Hold it warm for two hours. The uncooked malt converts the cooked starch — this two-part logic is the whole discovery.', grade: 'inferred' },
          { text: 'Strain through cloth, pressing hard. Add the salt.', grade: 'inferred' },
          { text: 'Leave the liquid in an open vessel in a warm room. It will take wild yeast within a day and work hard for two or three. Add crushed dates on the second day if you want it sweeter and stronger.', grade: 'reconstructed' },
          { text: 'Drink it cloudy, young and slightly sour, through a reed if you are being thorough. It does not keep and was never meant to.', grade: 'inferred' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'malt',
        text: 'The correction at the centre of this entry. If you brew this from crumbled bread you are reproducing a twentieth-century hypothesis, not a Bronze Age drink.',
      },
      {
        term: 'Safety',
        text: 'Wild fermentation in an open vessel is how this was done and carries the risks it has always carried. Use scrupulously clean equipment, ferment warm and fast, and discard anything that smells wrong rather than interesting.',
      },
    ],
    substitutions: [
      { from: 'Home-malted grain', to: 'Commercial pale malt, cracked', text: 'Loses the emmer and keeps the process. A reasonable first attempt.' },
    ],
    sources: ['Microscopic analysis of New Kingdom brewing residues', 'Amarna and Giza bakery-brewery excavations'],
  },

  // ─────────────────────────────── HATTI ───────────────────────────────
  {
    slug: 'thick-loaf-for-the-hearth-harsi',
    title: 'Thick Loaf for the Hearth',
    ancient: 'NINDA.GUR₄.RA · ḪARŠI',
    translit: 'ḫarši',
    language: 'Hittite',
    region: 'hatti',
    category: 'Breads & Grain',
    siglum: 'KUB / KBo festival corpus',
    provenance: 'Hattusa · temple and festival archives',
    period: 'Hittite Empire',
    date: 'c. 1400 – 1200 BC',
    serves: 'Makes 4 loaves',
    time: '3 hr',
    grade: 'inferred',
    summary: 'The standard thick offering loaf of the Hittite state cult — named on hundreds of tablets, described on none.',
    intro:
      'Hundreds of tablets tell you how many of these to break, who breaks them, and at which moment in the festival. Not one tells you how to make one. You have the name, the role, the ritual handling and roughly the shape of the thick loaf, and no formula at all. Whether it was even leavened is genuinely open. This version is, because leavened bread behaves the way the texts describe it being handled, and I would not defend that choice hard.',
    sourceText: {
      kind: 'paraphrase',
      text: 'Festival tablets prescribe the thick loaf by name and count, specify who breaks it and at which point in the sequence, and distinguish it from thin and wafer breads. No tablet gives a formula or a method.',
      attribution: 'Hittite festival texts, KUB and KBo series',
    },
    ingredientGroups: [
      {
        name: 'The loaf',
        items: [
          { ancient: 'ZÍZ', modern: 'Emmer flour, wholemeal', qty: '600 g', grade: 'attested' },
          { ancient: 'ŠE', modern: 'Barley flour', qty: '200 g', grade: 'attested' },
          { ancient: '—', modern: 'Water, warm', qty: '520 ml', grade: 'inferred' },
          { ancient: '—', modern: 'Sourdough starter', qty: '150 g', grade: 'reconstructed', note: 'leaven-hatti' },
          { ancient: 'Ì.NUN', modern: 'Butter or sheep fat, softened', qty: '60 g', grade: 'attested' },
          { ancient: 'MUN', modern: 'Salt', qty: '14 g', grade: 'attested' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The loaf',
        steps: [
          { text: 'Mix the two flours with the water and starter to a stiff dough. Emmer and barley together give a dense, close crumb and neither will build much structure — that is the correct outcome for a bread meant to be broken by hand.', grade: 'inferred' },
          { text: 'Work in the fat and the salt. Rest, covered, two hours.', grade: 'reconstructed' },
          { text: 'Divide into four. Shape each into a thick round disc, a good hand-span across and three fingers deep. Do not slash them; this loaf is broken, not cut, and it should not be encouraged to open where you chose.', grade: 'attested' },
          { text: 'Bake on a hot stone or in a heavy covered pot at high heat for 30 to 35 minutes, until the crust is dark and the base rings hollow.', grade: 'reconstructed' },
          { text: 'Cool on a rack. Break by hand at the table.', grade: 'attested' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'leaven-hatti',
        text: 'Whether the thick loaf was leavened is genuinely open. Hittite texts distinguish bread types by thickness and use but not, legibly, by leavening. We publish a leavened version because it produces a bread consistent with the described handling, and we would not defend the choice hard.',
      },
      {
        term: 'The count',
        text: 'Festival tablets specify how many loaves are broken and in what order. It is not culinary information and it is the most abundant food data the Hittites left us, which tells you something about what they thought worth writing down.',
      },
    ],
    substitutions: [
      { from: 'Emmer flour', to: 'Spelt flour' },
    ],
    sources: ['Hittite festival texts (KUB, KBo)', 'Hittite temple instruction texts'],
  },

  {
    slug: 'sheep-on-the-huprushi',
    title: 'Sheep Roasted on the Brazier',
    ancient: 'ḪUPRUŠḪI',
    translit: 'ḫuprušḫi',
    language: 'Hittite',
    region: 'hatti',
    category: 'Roasts & Hearth',
    siglum: 'KUB / KBo festival corpus · Hittite Laws',
    provenance: 'Hattusa · festival texts and legal price schedules',
    period: 'Hittite Empire',
    date: 'c. 1400 – 1200 BC',
    serves: 'Serves 6',
    time: '1 hr 15 min, plus salting',
    grade: 'reconstructed',
    summary: 'Mutton over a portable clay brazier — the vessel is attested by name, the animal by law, the seasoning by inference.',
    intro:
      'Three things hold this dish up: a hearth attested by name, an animal attested by law, and a seasoning attested by nothing whatever. The huprushi turns up repeatedly in Hittite ritual as a portable brazier for burning and heating offerings. Sheep and goat are priced in the Laws and eaten in quantity at the festivals. Putting the two together is our idea, not theirs — the most invented dish on this site, and better said out loud than allowed to pass as a translation.',
    sourceText: {
      kind: 'paraphrase',
      text: 'The huprushi appears in ritual texts as a portable hearth used for burning and heating offerings. Sheep, goat and cattle are priced in the Laws and consumed in quantity in festival texts. No text joins the two into a described dish.',
      attribution: 'Hittite festival and ritual corpus; Hittite Laws',
    },
    ingredientGroups: [
      {
        name: 'The meat',
        items: [
          { ancient: 'UDU', modern: 'Mutton or hogget shoulder, boned and butterflied', qty: '1.5 kg', grade: 'attested' },
          { ancient: 'MUN', modern: 'Salt', qty: '2 tbsp', grade: 'attested' },
          { ancient: 'Ì.NUN', modern: 'Butter or sheep fat, melted', qty: '60 g', grade: 'attested' },
          { ancient: 'GEŠTIN', modern: 'Wine, red', qty: '200 ml', grade: 'attested' },
          { ancient: 'LÀL', modern: 'Honey', qty: '2 tbsp', grade: 'attested' },
          { ancient: '—', modern: 'Coriander seed, cracked', qty: '1 tbsp', grade: 'reconstructed' },
          { ancient: '—', modern: 'Garlic, crushed', qty: '4 cloves', grade: 'reconstructed' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The meat',
        steps: [
          { text: 'Salt the butterflied shoulder heavily on both sides and leave it uncovered in a cold place overnight.', grade: 'inferred' },
          { text: 'Mix the melted fat, wine, honey, coriander and garlic to a thin baste.', grade: 'reconstructed' },
          { text: 'Build a bed of coals and let the flame die entirely. This is brazier cooking, not fire cooking — the huprushi holds embers, not logs.', grade: 'inferred' },
          { text: 'Lay the meat over the coals fat-side down. Turn every few minutes, brushing with the baste each turn, for about 45 minutes for pink, longer if you want it giving.', grade: 'reconstructed' },
          { text: 'Rest 15 minutes. Carve across the grain and spoon over whatever baste is left, warmed.', grade: 'inferred' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'Standing',
        text: 'The most invented dish here. Every material is attested for Hittite Anatolia; the combination is ours. Better to say so than to let it pass as a translation.',
      },
    ],
    substitutions: [
      { from: 'Mutton', to: 'Lamb shoulder', text: 'Easier to find and considerably milder. The Hittites were eating older animals.' },
    ],
    sources: ['Hittite festival and ritual corpus', 'The Hittite Laws (price schedules for livestock)'],
  },

  // ─────────────────────────────── LEVANT ───────────────────────────────
  {
    slug: 'seared-cheese-on-the-copper-pan',
    title: 'Cheese Seared on Copper, with Greens',
    ancient: 'ḥlb',
    translit: 'ḥlb',
    language: 'Northwest Semitic',
    region: 'levant',
    category: 'Roasts & Hearth',
    siglum: 'Alašiya metallurgical sites · Amarna correspondence',
    provenance: 'A harbour tavern on Alašiya',
    period: 'Late Cypriot',
    date: 'c. 1250 BC',
    serves: 'Serves 4, as one of several things',
    time: '15 min',
    grade: 'reconstructed',
    summary:
      'The only dish on this site cooked on metal rather than in clay — which is not an affectation, it is what an island that makes copper has lying about.',
    intro:
      'Everything else here is cooked in clay: a pot, a pan, a mould, a brazier. Alašiya is the exception, and for an entirely unromantic reason. This is an island whose main industry is smelting copper on a scale that reshaped the whole eastern Mediterranean, and where copper is the ordinary material a flat sheet of it is a cheap thing to own. That changes the cooking, because metal does something clay cannot: it gets savagely hot and it gets hot fast, so you can sear instead of stew. The whole dish is fifteen minutes and it is the closest thing on this site to a modern frying pan, three thousand years early.',
    sourceText: {
      kind: 'paraphrase',
      text: 'Alašiya appears in the Amarna correspondence as a kingdom sending copper to Egypt in quantity. Cypriot sites of the period are dominated by metallurgical remains — furnaces, tuyères and slag heaps on an industrial scale. Sheep and goat husbandry and dairying are attested throughout. The island’s own script, Cypro-Minoan, remains undeciphered.',
      attribution: 'Amarna letters and Late Cypriot excavation reports',
    },
    ingredientGroups: [
      {
        name: 'On the metal',
        items: [
          { ancient: 'ḥlb', modern: 'Firm fresh sheep or goat cheese, in thick slices', qty: '400 g', grade: 'attested', note: 'nothalloumi' },
          { ancient: 'šmn', modern: 'Olive oil', qty: '3 tbsp', grade: 'attested' },
          { ancient: '—', modern: 'Onion, sliced into rounds', qty: '1 large', grade: 'attested' },
          { ancient: '—', modern: 'Wild or bitter greens — chicory, dandelion, chard tops', qty: '400 g', grade: 'attested' },
          { ancient: '—', modern: 'Garlic, sliced thin', qty: '3 cloves', grade: 'inferred' },
          { ancient: '—', modern: 'Coriander seed, cracked', qty: '1 tsp', grade: 'attested' },
          { ancient: '—', modern: 'Salt', qty: 'to taste', grade: 'inferred' },
        ],
      },
      {
        name: 'To finish',
        items: [
          { ancient: '—', modern: 'Black olives', qty: 'a handful', grade: 'attested' },
          { ancient: 'šmn', modern: 'Olive oil, to pour over', qty: '2 tbsp', grade: 'attested' },
          { ancient: 'lḥm', modern: 'Flatbread, warmed', qty: '4', grade: 'attested' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The pan',
        steps: [
          { text: 'Get a heavy metal pan — cast iron, steel, anything but non-stick — as hot as you dare over the biggest burner. It wants to be too hot. This is the entire technique and everything else here is assembly.', grade: 'reconstructed' },
          { text: 'Dry the cheese slices properly on a cloth. Wet cheese steams instead of browning, and steamed cheese is a sad thing.', grade: 'reconstructed' },
          { text: 'Put the cheese straight onto the dry pan with no oil at all. Ninety seconds a side, and do not move it — you are waiting for a dark crust to build. Lift it off and set it aside; it will squeak and that is correct.', grade: 'reconstructed' },
        ],
      },
      {
        name: 'The greens',
        steps: [
          { text: 'Now the oil goes in, and the onion rounds, and they cook hard and fast in the fat and the browned bits the cheese left behind. Four or five minutes, and let them catch at the edges.', grade: 'reconstructed' },
          { text: 'Garlic and cracked coriander in for thirty seconds, then the greens by the handful, turning as they collapse. They want two minutes, not ten. Salt at the end.', grade: 'reconstructed' },
          { text: 'Pile the greens onto a warm dish, lay the seared cheese over them, scatter the olives and pour the last of the oil across. Eat it with bread, immediately and standing up if the tavern is busy.', grade: 'reconstructed' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'Standing',
        text: 'The ingredients are attested and the pan is inference — good inference, because the archaeology of this island is overwhelmingly metallurgical and a flat sheet of copper is a cheap object in a place that makes copper. What nobody wrote down is what a Cypriot cook did with one. This is a technique reconstructed from a material, which is a different kind of guess from the usual and I would rather say which kind it is.',
      },
      {
        term: 'This is not halloumi',
        text: 'This is not halloumi, and I want to be firm about that, because the temptation is enormous. Halloumi as a named, brined, mint-layered cheese is documented from the medieval period, not the Bronze Age, and claiming otherwise would be exactly the sort of thing this site exists to avoid. What IS attested here is sheep and goat dairying, fresh curd cheese, and a metal surface hot enough to brown it. Any firm fresh cheese that holds its shape in a hot pan does the same job — halloumi is simply the easiest one to buy, and there is no harm in using it as long as nobody claims it is three thousand years old.',
      },
      {
        term: 'Why metal changes the dish',
        text: 'Clay holds heat and gives it up slowly, which is why everything else on this site is a stew, a braise or a long bake. Metal takes heat fast and hands it over instantly, which buys you the Maillard reaction — the browning that clay cooking simply cannot reach. Every fried and seared dish in the world descends from somebody having a hot metal surface to hand. On Alašiya, that happened early, for industrial reasons that had nothing to do with dinner.',
      },
      {
        term: 'An undeciphered island',
        text: 'Cypro-Minoan, the script of this island, has never been read. There are a few hundred inscriptions, no bilingual of any use, and no agreement on what language is underneath. So of every kitchen on this site, this is the one whose own words for its own food are completely lost — we have the furnaces, the slag, the bones and the pots, and not one readable sentence.',
      },
    ],
    substitutions: [
      { from: 'Firm fresh sheep cheese', to: 'Halloumi, or a firm feta, or paneer', text: 'You want something that browns rather than melts. Anything that slumps in the pan is the wrong cheese, whatever it is called.' },
      { from: 'Wild bitter greens', to: 'Chard, spinach with a squeeze of bitterness, or cavolo nero', text: 'Bitter is doing a job against the salt and the fat. Spinach alone is too mild and goes watery; if it is all you have, cook it harder and salt it later.' },
    ],
    sources: ['Amarna letters (the Alašiya correspondence)', 'Late Cypriot metallurgical site reports', 'Cypro-Minoan inscription corpus'],
  },
  {
    slug: 'brazier-chickpeas-alashiya',
    title: 'Chickpeas from the Ship’s Brazier',
    ancient: 'ALAŠIYA',
    translit: 'alašiya',
    language: 'Akkadian, as written at Amarna',
    region: 'levant',
    category: 'Pulses & Vegetables',
    siglum: 'Uluburun wreck · Amarna correspondence',
    provenance: 'A ship working down the Cilician coast toward Ugarit and Alašiya',
    period: 'Late Bronze Age',
    date: 'c. 1300 BC',
    serves: 'Serves 4',
    time: '50 min, plus soaking',
    grade: 'reconstructed',
    summary:
      'Built from a cargo manifest and a firebox: what one pot can do on a wooden ship where an open flame is the thing that kills you.',
    intro:
      'You have an unusually good idea of what was on a Late Bronze Age merchant ship, because one of ours went down off Uluburun with everything still aboard — ten tonnes of copper in oxhide ingots, tin, glass, ebony, ivory, and a hold that also held almonds, pine nuts, figs, olives, pomegranates, coriander and a great deal of resin. What we do not have is a galley log. So this comes from the other direction: given that cargo, given a clay firebox that is the only fire allowed on a vessel made of wood and pitch, and given a crew that has to be fed twice a day for nine days down a coast and a crossing at the end of it — what can you actually cook? One pot, one heat, and everything else assembled cold on bread.',
    sourceText: {
      kind: 'paraphrase',
      text: 'The Uluburun wreck carried copper and tin ingots by the tonne, Canaanite jars of terebinth resin, glass, ivory, and foodstuffs including almonds, pine nuts, figs, olives, grapes, pomegranates, coriander and sumac. Amarna letters name Alašiya as a kingdom sending copper to Egypt. No text describes cooking aboard a ship.',
      attribution: 'Uluburun excavation reports and the Amarna letters',
    },
    ingredientGroups: [
      {
        name: 'The pot',
        items: [
          { ancient: '—', modern: 'Dried chickpeas, soaked overnight', qty: '300 g', grade: 'attested', note: 'cargo' },
          { ancient: 'šmn', modern: 'Olive oil', qty: '5 tbsp', grade: 'attested' },
          { ancient: '—', modern: 'Onion, chopped fine', qty: '1 large', grade: 'attested' },
          { ancient: '—', modern: 'Garlic, sliced', qty: '3 cloves', grade: 'inferred' },
          { ancient: '—', modern: 'Coriander seed, cracked', qty: '2 tsp', grade: 'attested' },
          { ancient: '—', modern: 'Water', qty: 'to cover', grade: 'inferred' },
          { ancient: '—', modern: 'Salt', qty: 'to taste', grade: 'inferred' },
        ],
      },
      {
        name: 'Assembled cold, on deck',
        items: [
          { ancient: 'lḥm', modern: 'Flatbread', qty: '4 large', grade: 'attested' },
          { ancient: '—', modern: 'Fresh curd cheese, or a soft sheep cheese', qty: '250 g', grade: 'attested' },
          { ancient: '—', modern: 'Black and green olives', qty: 'a bowl', grade: 'attested' },
          { ancient: '—', modern: 'Fresh coriander and thyme, torn', qty: '2 handfuls', grade: 'attested' },
          { ancient: 'šmn', modern: 'Olive oil, to pour over at the end', qty: '2 tbsp', grade: 'attested' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The one pot',
        steps: [
          { text: 'Drain the soaked chickpeas, cover them with fresh water, and cook them until they crush easily between finger and thumb — forty minutes or so. Salt them only once they are soft; salted early they stay stubborn.', grade: 'reconstructed' },
          { text: 'Pour off most of the water, keeping a cupful. Add the oil, the onion, the garlic and the cracked coriander seed, and cook it down until the onion has gone soft and the pot is thick rather than wet.', grade: 'reconstructed' },
          { text: 'Crush about half the chickpeas against the side of the pot and leave the rest whole. That contrast is the whole texture of the dish, and it costs nothing.', grade: 'reconstructed' },
        ],
      },
      {
        name: 'On deck',
        steps: [
          { text: 'Warm the flatbread on the edge of the fire, or not at all.', grade: 'reconstructed' },
          { text: 'Spread each bread with curd, spoon the hot chickpeas over it, and scatter the olives and torn herbs across the top.', grade: 'reconstructed' },
          { text: 'Pour the last of the oil over, salt again, and eat it standing up, which is how it was eaten.', grade: 'reconstructed' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'Standing',
        text: 'Nobody wrote down what a ship’s crew ate — least of all the crew. This is inference from a cargo hold and a firebox — good inference, I would argue, because the constraints are so tight that they leave very few possible answers. Cook it because it works on a small heat with almost no equipment, which is exactly why it would have.',
      },
      {
        term: 'Fire on a wooden ship',
        text: 'The one thing that will certainly kill everyone aboard a vessel of wood, linen and pitch is an open flame. So the galley is a contained clay firebox, sand-lined, holding a small charcoal fire — a single ring, essentially, and a hot one that cannot spread. Everything about this dish follows from that: one pot, nothing that needs two heats at once, and everything that can be served cold served cold.',
      },
      {
        term: 'cargo',
        text: 'Chickpeas are not on the Uluburun list, which recorded almonds, pine nuts, figs, olives, grapes, pomegranates, coriander and sumac among the food. They are, though, all over the Levant archaeobotanically and they travel dry and indefinitely, which is the quality that matters at sea. Marked attested for the region, not for the wreck.',
      },
      {
        term: 'Alašiya',
        text: 'The kingdom the Amarna letters name as the source of Egypt’s copper, and identified with Cyprus by nearly everyone — nearly. It is the single best-attested trade relationship in this world and its name is still, strictly, an argument.',
      },
    ],
    substitutions: [
      { from: 'Dried chickpeas', to: 'Two tins of chickpeas, drained', text: 'The dish loses nothing worth defending and gains forty minutes. Tinned pulses are the one modern shortcut on this site I would take myself.' },
      { from: 'Fresh curd cheese', to: 'Ricotta, or thick strained yoghurt', text: 'You want something mild and wet to sit under the hot chickpeas. Anything sharp fights the herbs.' },
    ],
    sources: ['Uluburun shipwreck excavation reports', 'Amarna letters (EA 33–40, the Alašiya correspondence)', 'Levantine archaeobotany'],
  },
  {
    slug: 'kabri-palace-wine',
    title: 'Spiced Palace Wine of Kabri',
    ancient: 'THE CELLAR JARS',
    translit: '',
    language: 'Canaanite (unwritten)',
    region: 'levant',
    category: 'Drink & Ferment',
    siglum: 'Tel Kabri, Room 2440',
    provenance: 'Western Galilee · Middle Bronze palace wine cellar',
    period: 'Middle Bronze II',
    date: 'c. 1700 BC',
    serves: 'Makes 1.5 litres',
    time: '30 min, plus 2 weeks',
    grade: 'attested',
    featured: true,
    summary: 'A recipe recovered without a single word of text, read out of forty storage jars by chemical analysis of what had soaked into the clay.',
    intro:
      'Forty large storage jars in a room off the palace courtyard, opened by excavators in 2013 and sampled for whatever had soaked into the clay, because porous pottery holds onto its contents for a very long time. Every jar had held wine. Beyond the wine the chemistry returned honey, storax resin, terebinth resin, cedar oil, cyperus and juniper, with possible mint, myrtle and cinnamon. Several of those are named in the Mari texts from Mesopotamia and in the Egyptian medical papyri — so a Canaanite cellar, a Babylonian archive and an Egyptian pharmacopoeia independently describe the same practice. The best-evidenced drink of the Bronze Age, and not one of us wrote a word of it down.',
    sourceText: {
      kind: 'paraphrase',
      text: 'Organic residue analysis of the Room 2440 jar assemblage returned markers consistent with wine in all sampled vessels, together with honey, storax resin, terebinth resin, cedar oil, cyperus and juniper, and possible mint, myrtle and cinnamon.',
      attribution: 'Kabri Archaeological Project, 2013 season; published residue study, 2014',
    },
    ingredientGroups: [
      {
        name: 'The wine',
        items: [
          { ancient: '—', modern: 'Red wine, dry, unoaked, low in tannin', qty: '1.5 L', grade: 'attested' },
          { ancient: '—', modern: 'Honey', qty: '80 g', grade: 'attested' },
          { ancient: '—', modern: 'Terebinth resin (mastic works, and is the same family)', qty: '4 g', grade: 'attested', note: 'terebinth' },
          { ancient: '—', modern: 'Storax, or styrax benzoin resin', qty: '2 g', grade: 'attested' },
          { ancient: '—', modern: 'Juniper berries, crushed', qty: '15', grade: 'attested' },
          { ancient: '—', modern: 'Cyperus root (galingale), or a small piece of dried galangal', qty: '5 g', grade: 'attested' },
          { ancient: '—', modern: 'Cedar oil — in the jars, and left out here: the modern distilled oil is not safe to drink', qty: 'omitted', grade: 'attested', note: 'cedar' },
          { ancient: '—', modern: 'Fresh mint', qty: '6 sprigs', grade: 'reconstructed' },
          { ancient: '—', modern: 'Myrtle leaves', qty: '6', grade: 'reconstructed' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The wine',
        steps: [
          { text: 'Warm a third of the wine gently — nowhere near a simmer — and dissolve the honey into it.', grade: 'inferred' },
          { text: 'Crush the resins to a coarse powder. They will not dissolve in wine; they need the honey and warmth to disperse, and they will still leave a haze. The haze is correct.', grade: 'inferred' },
          { text: 'Stir the resins into the warm honeyed wine until dispersed.', grade: 'reconstructed' },
          { text: 'Combine with the remaining wine in a jar. Add the juniper, cyperus, mint and myrtle.', grade: 'reconstructed' },
          { text: 'Seal and leave in a cool dark place for two weeks, turning the jar every few days.', grade: 'reconstructed' },
          { text: 'Strain through cloth. It will be resinous, faintly medicinal, sweet and strange — recognisably the ancestor of retsina, and much further from modern wine than that comparison suggests.', grade: 'reconstructed' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'cedar',
        text: 'Cedar oil is attested in the jars and is omitted from this formula deliberately. Modern cedarwood oil is a distilled essential oil, is not the ancient material, and is not safe to drink. Where an attested ingredient cannot be reproduced safely, we leave it out and say why, rather than dropping it from the list quietly.',
      },
      {
        term: 'terebinth',
        text: 'Pistacia terebinthus and Pistacia lentiscus are close relations and their resins behave similarly. Uluburun was carrying roughly a tonne of terebinth resin in Canaanite jars when it went down, which gives some sense of the scale of the trade in it.',
      },
    ],
    substitutions: [
      { from: 'Storax', to: 'Additional mastic', text: 'Storax is harder to source food-grade. Declaring the swap keeps the entry honest.' },
    ],
    sources: ['Tel Kabri Room 2440 jar assemblage', 'Published organic residue study of the Kabri cellar (2014)', 'Mari archives; Egyptian medical papyri'],
  },

  {
    slug: 'lentils-with-oil-and-cumin-ugarit',
    title: 'Lentils with Olive Oil and Cumin',
    ancient: 'THE UGARIT STORES',
    translit: '',
    language: 'Ugaritic',
    region: 'levant',
    category: 'Pulses & Vegetables',
    siglum: 'Ras Shamra archives · storeroom archaeobotany',
    provenance: 'Ugarit · palace and household stores',
    period: 'Late Bronze Age',
    date: 'c. 1300 – 1190 BC',
    serves: 'Serves 4',
    time: '1 hr',
    grade: 'reconstructed',
    summary: 'Built from a storeroom rather than a recipe — the everyday pulse dish of a city that wrote about everything except dinner.',
    intro:
      'Ugarit left an enormous archive — letters, treaties, ledgers, lawsuits, whole cycles of myth — and almost nothing about cooking. What reached you instead is the contents of its storerooms: lentils, chickpeas, bitter vetch, barley, olives and oil, in the quantities of a city feeding itself. This dish is assembled from that inventory and from what those materials plainly want to become. Honest food, and a reconstruction. There is no tablet behind it and we are not going to pretend there is.',
    sourceText: {
      kind: 'paraphrase',
      text: 'Ugaritic administrative texts and excavated storerooms attest lentils, chickpeas, bitter vetch, barley, olive oil, cumin and coriander in domestic and palatial quantity. You have no culinary text from the site.',
      attribution: 'Ras Shamra archives and storeroom archaeobotany',
    },
    ingredientGroups: [
      {
        name: 'The pot',
        items: [
          { ancient: '—', modern: 'Brown or green lentils', qty: '400 g', grade: 'attested' },
          { ancient: '—', modern: 'Water', qty: '1.2 L', grade: 'attested' },
          { ancient: '—', modern: 'Olive oil, unfiltered', qty: '100 ml', grade: 'attested' },
          { ancient: '—', modern: 'Onion, sliced thin', qty: '2 large', grade: 'attested' },
          { ancient: '—', modern: 'Garlic', qty: '6 cloves', grade: 'attested' },
          { ancient: '—', modern: 'Cumin seed', qty: '1 tbsp', grade: 'attested' },
          { ancient: '—', modern: 'Coriander seed, ground', qty: '2 tsp', grade: 'attested' },
          { ancient: '—', modern: 'Salt', qty: 'to taste', grade: 'attested' },
          { ancient: '—', modern: 'Barley bread, to serve', qty: '—', grade: 'attested' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The pot',
        steps: [
          { text: 'Warm half the oil in a heavy pot and cook the onion slowly, without hurry, until it collapses and goes sweet and brown at the edges. Twenty minutes at least.', grade: 'reconstructed' },
          { text: 'Add the garlic, cumin and coriander and cook until they catch and smell.', grade: 'reconstructed' },
          { text: 'Add the lentils and the water. Bring up, then hold at a tremble for 35 to 45 minutes, until the lentils are soft and the liquid has gone thick and muddy.', grade: 'reconstructed' },
          { text: 'Salt at the end, not the beginning. Beat in the remaining raw oil off the heat.', grade: 'inferred' },
          { text: 'Eat with barley bread, using the bread rather than a spoon.', grade: 'inferred' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'Standing',
        text: 'The pantry is attested to the last item; the dish is ours. Cooking only what reached you on tablets would give a wildly false picture of what we actually ate — which was mostly pulses and grain, and mostly unrecorded.',
      },
    ],
    substitutions: [],
    sources: ['Ras Shamra (Ugarit) administrative corpus', 'Levantine Late Bronze storeroom archaeobotany'],
  },

  // ─────────────────────────────── AEGEAN ───────────────────────────────
  {
    slug: 'kid-in-the-tripod-cauldron',
    title: 'Kid in the Tripod Cauldron, with Fennel and Coriander',
    ancient: 'TI-RI-PO',
    translit: 'ti-ri-po',
    language: 'Mycenaean Greek (Linear B)',
    region: 'aegean',
    category: 'Stews & Broths',
    siglum: 'PY Ta 641 · Knossos and Pylos spice tablets',
    provenance: 'Pylos and Knossos · palace inventories',
    period: 'Late Helladic / Late Minoan',
    date: 'c. 1250 BC',
    serves: 'Serves 6',
    time: '2 hr 30 min',
    grade: 'reconstructed',
    summary: 'Assembled entirely from inventory: the vessel from one tablet, the spices from another, the method from nowhere at all.',
    intro:
      'A scribe at Pylos took the trouble to record that one of his tripod cauldrons was of Cretan workmanship. That is the sort of thing Ta 641 preserves — cookware, itemised, sorted by condition and origin — and it is why the tablet is famous among the people who read Linear B, the syllabic script the Mycenaean palaces kept their accounts in. Other tablets count out coriander, cumin, fennel, celery, mint, sesame and cyperus by the unit; others count the goat flocks. Set them side by side and you get a dish the Mycenaeans certainly could have made, and that no evidence says they did. That gap is the entire Aegean problem.',
    sourceText: {
      kind: 'paraphrase',
      text: 'Ta 641 inventories tripod cauldrons, distinguishing them by condition and by workmanship. Separate tablets record coriander, cumin, fennel, celery, mint, sesame, safflower and cyperus as counted commodities. Livestock tablets record goat flocks by shepherd and location. No tablet records a method of cooking anything.',
      attribution: 'Linear B tablets, Pylos and Knossos',
    },
    ingredientGroups: [
      {
        name: 'The cauldron',
        items: [
          { ancient: 'AIZ (goat)', modern: 'Kid goat, shoulder and leg, on the bone', qty: '1.5 kg', grade: 'attested' },
          { ancient: 'e-ra-wo', modern: 'Olive oil', qty: '80 ml', grade: 'attested' },
          { ancient: 'wo-no', modern: 'Wine, white or light red', qty: '350 ml', grade: 'attested' },
          { ancient: 'ma-ra-tu-wo', modern: 'Fennel — bulb quartered, and the seed', qty: '2 bulbs, 1 tbsp seed', grade: 'attested', note: 'marathuwo' },
          { ancient: 'ko-ri-ja-da-na', modern: 'Coriander seed, cracked', qty: '1 tbsp', grade: 'attested' },
          { ancient: 'ku-mi-no', modern: 'Cumin seed', qty: '2 tsp', grade: 'attested' },
          { ancient: 'se-ri-no', modern: 'Celery, leaves and stalk', qty: '3 stalks', grade: 'attested' },
          { ancient: 'mi-ta', modern: 'Mint, fresh, to finish', qty: '1 small bunch', grade: 'attested' },
          { ancient: 'me-ri', modern: 'Honey', qty: '1 tbsp', grade: 'attested' },
          { ancient: '—', modern: 'Salt', qty: 'to taste', grade: 'inferred' },
          { ancient: 'tu-ro₂', modern: 'Hard sheep cheese, to grate over', qty: '60 g', grade: 'attested' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The cauldron',
        steps: [
          { text: 'Brown the kid in olive oil in a heavy pot — a tripod cauldron if you have one, which you do not.', grade: 'reconstructed' },
          { text: 'Add the wine and let it boil down by half, scraping the pot as it goes.', grade: 'reconstructed' },
          { text: 'Add the fennel bulb, celery, fennel seed, coriander, cumin and honey. Add water to come halfway up the meat.', grade: 'reconstructed' },
          { text: 'Cover and hold at a bare tremble for two hours, until the kid pulls from the bone.', grade: 'reconstructed' },
          { text: 'Salt at the end. Tear the mint over the top and grate the sheep cheese across it.', grade: 'reconstructed' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'Standing',
        text: 'The Aegean gives you a complete pantry and no dishes at all. Anyone who tells you they are cooking an authentic Mycenaean recipe is cooking an inventory.',
      },
      {
        term: 'marathuwo',
        text: 'The Linear B word for fennel. It is also, by a long and much-loved chain, the origin of the place name Marathon — the field of fennel.',
      },
    ],
    substitutions: [
      { from: 'Kid goat', to: 'Lamb shoulder', text: 'Both are attested in the flock tablets. Goat is the leaner and more likely everyday animal.' },
    ],
    sources: ['PY Ta 641', 'Knossos and Pylos spice and livestock tablets', 'Mycenaean cooking-vessel assemblages'],
  },

  {
    slug: 'fish-baked-on-fennel-amnisos',
    title: 'Whole Fish Baked on Fennel',
    ancient: 'A-MI-NI-SO',
    translit: 'a-mi-ni-so',
    language: 'Mycenaean Greek (Linear B)',
    region: 'aegean',
    category: 'Roasts & Hearth',
    siglum: 'Knossos spice tablets · Amnisos harbour tablets',
    provenance: 'Amnisos · the harbour below Knossos',
    period: 'Late Minoan',
    date: 'c. 1400 BC',
    serves: 'Serves 4',
    time: '45 min',
    grade: 'reconstructed',
    summary:
      'Every ingredient is on a Knossos tablet or in a Cretan midden. Nothing tells you they were ever put in the same dish.',
    intro:
      'Fennel is the surprise here, and it should not be. The Knossos scribes counted it out by the unit under the name ma-ra-tu-wo, alongside coriander, celery, cumin, mint and sesame — the Aegean kept the longest spice list of any kitchen on this site and left not one instruction for using it. The fish is not on a tablet at all. It is in the middens, in the fishing gear, and painted life-size on the wall at Akrotiri, held up by a boy in both hands. Put the two together over a fire and you get a dish the Cretans could certainly have made, on a coast where the fennel grows wild to the waterline and the fish is landed forty paces away. That it works this well is an argument. It is not evidence.',
    sourceText: {
      kind: 'paraphrase',
      text: 'Knossos tablets record coriander, fennel, celery, cumin, mint, sesame and cyperus as counted commodities, and olive oil in quantity. Amnisos appears as a-mi-ni-so, a harbour town of the Knossos administration. Fish are absent from the tablets and abundant in the archaeology: bones, hooks, net weights, and the fisherman fresco at Akrotiri. No tablet records a method of cooking anything.',
      attribution: 'Linear B tablets, Knossos',
    },
    ingredientGroups: [
      {
        name: 'The bed',
        items: [
          { ancient: 'ma-ra-tu-wo', modern: 'Fennel bulbs, sliced thick, fronds kept back', qty: '2 large', grade: 'attested', note: 'marathuwo' },
          { ancient: 'e-ra-wo', modern: 'Olive oil', qty: '4 tbsp', grade: 'attested' },
          { ancient: 'wo-no', modern: 'Wine, dry and white', qty: '150 ml', grade: 'attested' },
          { ancient: '—', modern: 'Salt', qty: 'to taste', grade: 'inferred' },
        ],
      },
      {
        name: 'The fish and its stuffing',
        items: [
          { ancient: '—', modern: 'Whole sea bream, gutted and scaled', qty: '2, about 500 g each', grade: 'attested', note: 'nofishword' },
          { ancient: 'ma-ra-tu-wo', modern: 'Fennel fronds, chopped fine', qty: 'all of them', grade: 'attested' },
          { ancient: 'ko-ri-ja-da-na', modern: 'Coriander leaf, chopped', qty: '1 small bunch', grade: 'attested' },
          { ancient: 'se-ri-no', modern: 'Celery leaf, chopped', qty: '1 small bunch', grade: 'attested' },
          { ancient: '—', modern: 'Garlic, crushed to a paste', qty: '3 cloves', grade: 'inferred', note: 'garlic' },
          { ancient: 'ko-ri-ja-da-na', modern: 'Coriander seed, cracked', qty: '1 tsp', grade: 'attested' },
        ],
      },
      {
        name: 'To finish',
        items: [
          { ancient: '—', modern: 'Black olives, stones in', qty: 'a good handful', grade: 'attested' },
          { ancient: 'mi-ta', modern: 'Mint, torn', qty: 'a few sprigs', grade: 'attested' },
          { ancient: 'e-ra-wo', modern: 'Olive oil, to pour over at the table', qty: '2 tbsp', grade: 'attested' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The bed',
        steps: [
          { text: 'Get a fire to steady embers, or an oven to 220°C. You want strong heat from below and no flame licking the dish.', grade: 'reconstructed' },
          { text: 'Toss the sliced fennel with half the oil and a good pinch of salt, and spread it in a wide shallow dish so it sits in one layer.', grade: 'reconstructed' },
        ],
      },
      {
        name: 'The fish',
        steps: [
          { text: 'Chop the fennel fronds together with the coriander leaf, celery leaf, garlic and cracked coriander seed. Salt it and work it with your hands until it smells green rather than grassy.', grade: 'reconstructed' },
          { text: 'Score each bream twice on each side, down to the bone. Pack the herb mixture into the belly cavity until it will not take any more, and push what is left into the scores.', grade: 'reconstructed' },
          { text: 'Lay the fish on the fennel. Pour the wine around them, not over them — you are steaming the bed, not washing the skin. Trickle the rest of the oil across the top and salt the skin.', grade: 'reconstructed' },
          { text: 'Cook for 25 to 30 minutes without turning. It is done when the flesh at the thickest part of the shoulder lifts cleanly off the bone and the fennel underneath has gone soft and slightly caught at the edges.', grade: 'reconstructed' },
          { text: 'Scatter the olives and the torn mint over the top. Pour the last of the oil over at the table. Let it stand five minutes before anyone touches it.', grade: 'reconstructed' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'Standing',
        text: 'The Aegean gives you a complete pantry and no dishes at all. Every ingredient here is counted on a tablet or dug out of a midden; the act of combining them is mine. Cook it because it is good, not because it is proven.',
      },
      {
        term: 'The word for fennel',
        text: 'Linear B writes it ma-ra-tu-wo — and, by a long and much-loved chain, that is the origin of the place name Marathon: the field of fennel. It grows wild along this coast down to the tideline, which is a large part of why this dish makes sense here and would make less sense inland.',
      },
      {
        term: 'Why no fish on the tablets',
        text: 'There is no fish on the Knossos tablets, which tells you about the scribes rather than the diet. Palace accounting recorded what the palace owned and moved. A fish landed at Amnisos in the morning and eaten there at noon passed through no storeroom and needed no clerk. The evidence is in the bones, the hooks and the net weights instead.',
      },
      {
        term: 'Why garlic is only inferred',
        text: 'Carbonised garlic has come out of Akrotiri on Thera, so it was certainly in Aegean kitchens. There is no secure Linear B word for it, which is why it is marked inferred rather than attested — the plant is proven, the paperwork is not.',
      },
      {
        term: 'Two songs',
        text: 'Idaia at Amnisos does not count minutes, because there is nothing to count them with. She plays until the fish is done, and the fish is done in two songs. Lyres are genuinely part of this world — a seven-stringed one is painted on the Hagia Triada sarcophagus and another is on the wall at Pylos. The timing is hers.',
      },
    ],
    substitutions: [
      { from: 'Sea bream', to: 'Sea bass, red mullet, or any whole round fish of about 500 g', text: 'All of these are Mediterranean and all of them cook in about the same time. Avoid oily fish here — mackerel and sardines fight the fennel rather than sitting under it.' },
      { from: 'Fennel bulb', to: 'Fennel bulb plus a teaspoon of fennel seed', text: 'Modern bulb fennel is a much later selection. The seed pushes it back toward what a wild plant would have given you.' },
    ],
    sources: ['Knossos spice tablets', 'Amnisos harbour tablets (a-mi-ni-so)', 'Akrotiri fisherman fresco and Aegean fish faunal assemblages', 'Hagia Triada sarcophagus'],
  },

  {
    slug: 'barley-and-fig-feast-porridge',
    title: 'Barley and Fig Porridge for a Feast',
    ancient: 'PA-KI-JA-NE',
    translit: 'pa-ki-ja-ne',
    language: 'Mycenaean Greek (Linear B)',
    region: 'aegean',
    category: 'Breads & Grain',
    siglum: 'PY Un 2',
    provenance: 'Pylos · palace provisioning record',
    period: 'Late Helladic IIIB',
    date: 'c. 1250 BC',
    serves: 'Serves 6',
    time: '50 min',
    grade: 'reconstructed',
    summary: 'Built from a single provisioning tablet — the shopping list for one occasion at one sanctuary, on one day.',
    intro:
      'Barley, flour, olives, figs, wine, honey, cyperus, and a counted tally of oxen, sheep, goats and pigs. That is PY Un 2 — everything gathered for one occasion at the sanctuary site of pa-ki-ja-ne, written down by a scribe with no reason on earth to record what the cooks did next. A menu with no dishes on it. This porridge takes the plant half of the list and does the obvious thing with it.',
    sourceText: {
      kind: 'paraphrase',
      text: 'The tablet records commodities assembled for an occasion at pa-ki-ja-ne, including barley, flour, olives, figs, wine, honey and cyperus, alongside a tally of livestock.',
      attribution: 'PY Un 2, Pylos',
    },
    ingredientGroups: [
      {
        name: 'The porridge',
        items: [
          { ancient: 'ki-ri-ta (barley)', modern: 'Pearl or pot barley', qty: '300 g', grade: 'attested' },
          { ancient: '—', modern: 'Water', qty: '1.2 L', grade: 'attested' },
          { ancient: '—', modern: 'Dried figs, quartered', qty: '200 g', grade: 'attested' },
          { ancient: 'me-ri', modern: 'Honey', qty: '3 tbsp', grade: 'attested' },
          { ancient: 'e-ra-wo', modern: 'Olive oil', qty: '4 tbsp', grade: 'attested' },
          { ancient: 'ku-pa-ro', modern: 'Cyperus (galingale), ground — or omit', qty: '1 tsp', grade: 'unidentified', note: 'kuparo' },
          { ancient: '—', modern: 'Salt', qty: 'to taste', grade: 'inferred' },
          { ancient: 'sa-sa-ma', modern: 'Sesame seed, toasted', qty: '2 tbsp', grade: 'attested' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The porridge',
        steps: [
          { text: 'Toast the barley dry in the pot until it smells nutty. This is not attested and it is much better.', grade: 'reconstructed' },
          { text: 'Add the water and a good pinch of salt. Simmer 35 minutes, until the barley is soft and the pot has gone thick.', grade: 'reconstructed' },
          { text: 'Stir in the figs and cook 10 minutes more, until they have gone to pulp and sweetened the whole pot.', grade: 'reconstructed' },
          { text: 'Off the heat, beat in the honey, the oil and the cyperus if you are using it.', grade: 'reconstructed' },
          { text: 'Scatter with toasted sesame. Serve warm, as the savoury-sweet grain dish it is — not as a pudding.', grade: 'reconstructed' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'kuparo',
        text: 'ku-pa-ro is generally identified with Cyperus, and whether the Mycenaeans used it as a flavouring, a perfume base or both is unresolved. Dried galangal is the usual modern stand-in and is a different plant in the same broad direction. Omitting it costs the dish nothing you can prove.',
      },
    ],
    substitutions: [
      { from: 'Cyperus', to: 'A small piece of dried galangal, or nothing' },
    ],
    sources: ['PY Un 2', 'Linear B commodity tablets, Pylos'],
  },

  // ────────────────────────────── PERIPHERY ──────────────────────────────
  {
    slug: 'egtved-grog',
    title: 'The Egtved Bucket',
    ancient: 'THE BIRCH BARK PAIL',
    translit: '',
    language: 'Unwritten',
    region: 'nordic',
    category: 'Drink & Ferment',
    siglum: 'Egtved burial, Jutland',
    provenance: 'Denmark · oak coffin burial, birch bark vessel',
    period: 'Nordic Bronze Age, Period II',
    date: 'c. 1370 BC',
    serves: 'Makes about 3 litres',
    time: '10 days',
    grade: 'attested',
    featured: true,
    summary: 'A drink recovered from the residue in a bucket set at the feet of a girl in an oak coffin, dated by the rings of the tree they buried her in.',
    intro:
      'They buried her in a hollowed oak, and the tree rings say it was felled in the summer of 1370 BC, which makes this one of the best-dated objects in European prehistory. At her feet stood a bucket of birch bark. The residue inside it has been analysed: malted wheat, bog myrtle, cranberries and cowberries, honey. No text, no recipe, no surviving tradition — just a bucket with the ingredients still in it, which beats all three.',
    sourceText: {
      kind: 'paraphrase',
      text: 'Residue and pollen analysis of the birch bark vessel from the Egtved coffin indicates a fermented drink made from malted wheat, sweet gale (bog myrtle), bog cranberry and cowberry, and honey.',
      attribution: 'Residue analysis of the Egtved birch bark bucket, Nationalmuseet',
    },
    ingredientGroups: [
      {
        name: 'The bucket',
        items: [
          { ancient: '—', modern: 'Wheat, malted and cracked', qty: '700 g', grade: 'attested' },
          { ancient: '—', modern: 'Water', qty: '3.5 L', grade: 'attested' },
          { ancient: '—', modern: 'Honey', qty: '400 g', grade: 'attested' },
          { ancient: '—', modern: 'Bog myrtle (sweet gale), dried', qty: '15 g', grade: 'attested', note: 'myrtle' },
          { ancient: '—', modern: 'Cranberries', qty: '200 g', grade: 'attested' },
          { ancient: '—', modern: 'Lingonberries (cowberries)', qty: '150 g', grade: 'attested' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The bucket',
        steps: [
          { text: 'Mash the cracked malted wheat in water held at about 65°C for an hour, then let it cool to blood heat.', grade: 'inferred' },
          { text: 'Strain off the liquid, pressing the grain. Do not boil it — there is no evidence for boiling here and the honey and berries carry the wild yeast.', grade: 'reconstructed' },
          { text: 'Stir in the honey until fully dissolved.', grade: 'attested' },
          { text: 'Crush the berries and add them with their juice. Add the bog myrtle.', grade: 'attested' },
          { text: 'Cover loosely and leave in a warm room. Fermentation should start within two days on the wild yeast of the honey and fruit; if it does not, the honey was pasteurised.', grade: 'reconstructed' },
          { text: 'Ferment 7 to 10 days, stirring daily, until the vigorous activity slows. Strain and drink young. It is tart, resinous, faintly bitter from the myrtle, and nothing at all like beer or mead as either is now understood.', grade: 'reconstructed' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'myrtle',
        text: 'Myrica gale, the bittering herb of northern Europe for millennia before hops arrived. It is not hops and does not taste like it. Use it sparingly; it is assertive and it was almost certainly doing preservative work as well as flavouring.',
      },
      {
        term: 'Safety',
        text: 'Bog myrtle should be avoided in pregnancy. Wild fermentation carries its usual risks — clean vessels, warm room, and discard anything that smells wrong.',
      },
    ],
    substitutions: [
      { from: 'Bog myrtle', to: 'Yarrow, in half the quantity', text: 'Another attested northern European bittering herb, though not the one in the bucket. Declared.' },
    ],
    sources: ['Egtved burial, Nationalmuseet, Copenhagen', 'Published residue and pollen analysis of the birch bark vessel'],
  },

  {
    slug: 'sorghum-flatbread-with-soured-milk',
    title: 'Sorghum Flatbread with Soured Milk',
    ancient: 'THE KERMA HEARTH',
    translit: '',
    language: 'Unwritten',
    region: 'nubia',
    category: 'Breads & Grain',
    siglum: 'Kerma · archaeobotany and ceramic residues',
    provenance: 'Upper Nubia · settlement and cemetery deposits',
    period: 'Classic Kerma',
    date: 'c. 1750 – 1550 BC',
    serves: 'Makes 8',
    time: '3 days, mostly waiting',
    grade: 'reconstructed',
    summary: 'Sorghum and dairy, the two things Kerma had that Egypt did not — reconstructed from grain deposits and pot residues.',
    intro:
      'Arcs of bull skulls running to thousands of animals curve behind the burials at Kerma, which was overwhelmingly a cattle kingdom and a cuisine in its own right rather than a southern annexe of Egypt. It grew sorghum, an African grain Egypt did not rely on, and the dairying turns up as residue inside its pots. This flatbread puts those two staples together the way sorghum-and-dairy cultures across the region still put them together. Reconstruction — but reconstruction built on the right materials.',
    sourceText: {
      kind: 'paraphrase',
      text: 'Archaeobotanical assemblages from Kerma attest sorghum alongside barley and emmer; lipid residues in ceramics attest dairy processing; the funerary record attests cattle on an extraordinary scale.',
      attribution: 'Kerma settlement and cemetery excavation reports',
    },
    ingredientGroups: [
      {
        name: 'The batter',
        items: [
          { ancient: '—', modern: 'Sorghum flour', qty: '400 g', grade: 'attested' },
          { ancient: '—', modern: 'Water, warm', qty: '600 ml', grade: 'inferred' },
          { ancient: '—', modern: 'A spoonful of a previous batch, to sour it', qty: '2 tbsp', grade: 'reconstructed' },
          { ancient: '—', modern: 'Salt', qty: '1 tsp', grade: 'inferred' },
        ],
      },
      {
        name: 'To serve',
        items: [
          { ancient: '—', modern: 'Soured milk, or thin live yoghurt', qty: '400 ml', grade: 'attested' },
          { ancient: '—', modern: 'Clarified butter', qty: '40 g', grade: 'attested' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The batter',
        steps: [
          { text: 'Whisk the sorghum flour with the warm water to a thin, pourable batter — thinner than you think, closer to cream than to pancake batter.', grade: 'reconstructed' },
          { text: 'Stir in the starter, cover, and leave in a warm place two to three days. It will sour, thin further, and develop a fine bubble across the top.', grade: 'reconstructed' },
          { text: 'Stir in the salt just before cooking.', grade: 'inferred' },
        ],
      },
      {
        name: 'The griddle',
        steps: [
          { text: 'Heat a flat clay griddle or a heavy dry pan until a drop of water skitters.', grade: 'inferred' },
          { text: 'Pour a ladle of batter and swirl it out thin. Cook on one side only — do not turn it. The surface should go from wet to matt and cover itself in small holes.', grade: 'reconstructed' },
          { text: 'Lift off when the edges release, about two minutes. Stack them as they come.', grade: 'reconstructed' },
          { text: 'Serve warm, torn, with soured milk poured over and melted clarified butter across the top.', grade: 'reconstructed' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'Standing',
        text: 'Sorghum, dairy and the griddle are all attested for Kerma. The souring method and the assembly are reconstructed from what these materials do and from the long continuity of sorghum-and-dairy cooking in the region — a continuity that is suggestive and is not evidence.',
      },
    ],
    substitutions: [
      { from: 'Sorghum flour', to: 'Millet flour', text: 'Also a Bronze Age African grain, and a different one. Say which you used.' },
    ],
    sources: ['Kerma excavation reports', 'Nubian archaeobotanical and ceramic residue studies'],
  },

  {
    slug: 'millet-porridge-with-hazelnut-and-pork-fat',
    title: 'Millet Porridge with Hazelnut and Pork Fat',
    ancient: 'THE GRAIN THAT CROSSED A CONTINENT',
    translit: '',
    language: 'Unwritten',
    region: 'central-europe',
    category: 'Breads & Grain',
    siglum: 'Urnfield settlement assemblages · isotope studies',
    provenance: 'Central Europe · charred grain, vessel residues, human bone',
    period: 'Middle to Late Bronze Age',
    date: 'c. 1500 – 900 BC',
    serves: 'Serves 4',
    time: '35 min',
    grade: 'inferred',
    summary: 'Broomcorn millet reached central Europe from east Asia around 1500 BC, and it shows up in the bones of the people who ate it.',
    intro:
      'Plainest food here, largest argument attached to it. Broomcorn millet is not native to Europe. It arrives in the central European record around 1500 BC, and because it photosynthesises differently from wheat and barley it leaves a distinct carbon signature in the skeletons of the people who ate it — so the moment a foreign grain became a staple is legible in human bone. The Uluburun wreck, a cargo ship that went down off southern Turkey, proves goods moved by sea across the eastern Mediterranean. Millet proves they moved overland across Eurasia. Neither of those is licence to cook the two worlds in one pot.',
    sourceText: {
      kind: 'paraphrase',
      text: 'Charred broomcorn millet appears in central European settlement assemblages from around 1500 BC. Stable carbon isotope values in human bone from the same period and region shift in a manner consistent with millet consumption. Vessel lipid residues attest dairy processing alongside.',
      attribution: 'Central European Bronze Age archaeobotany and stable isotope studies',
    },
    ingredientGroups: [
      {
        name: 'The pot',
        items: [
          { ancient: '—', modern: 'Broomcorn millet, whole', qty: '250 g', grade: 'attested' },
          { ancient: '—', modern: 'Water', qty: '750 ml', grade: 'attested' },
          { ancient: '—', modern: 'Milk, or the whey from cheesemaking', qty: '250 ml', grade: 'attested' },
          { ancient: '—', modern: 'Pork fat, or lard', qty: '50 g', grade: 'attested' },
          { ancient: '—', modern: 'Hazelnuts, toasted and chopped', qty: '80 g', grade: 'attested' },
          { ancient: '—', modern: 'Salt', qty: 'to taste', grade: 'attested', note: 'salt-ce' },
          { ancient: '—', modern: 'Fresh curd cheese, to finish', qty: '100 g', grade: 'attested' },
          { ancient: '—', modern: 'Wild apple, grated, or a sharp eating apple', qty: '1', grade: 'reconstructed' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The pot',
        steps: [
          { text: 'Rinse the millet and toast it dry in the pot until it smells of popcorn.', grade: 'inferred' },
          { text: 'Add the water and a good pinch of salt. Simmer covered for 20 minutes, until the grain has burst and taken up the liquid.', grade: 'reconstructed' },
          { text: 'Stir in the milk and cook 10 minutes more, loose and creamy.', grade: 'reconstructed' },
          { text: 'Melt the pork fat separately and toast the hazelnuts in it.', grade: 'reconstructed' },
          { text: 'Serve the millet with the hot fat and nuts poured over, the curd cheese broken across the top, and the grated apple on the side for sharpness.', grade: 'reconstructed' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'salt-ce',
        text: 'Central Europe had rock salt on an industrial scale — the Austrian workings at Hallstatt were being mined in the Bronze Age, centuries before the Iron Age culture that took its name from the site. The place most associated with the early Celts was a going concern long before there were any.',
      },
    ],
    substitutions: [
      { from: 'Broomcorn millet', to: 'Proso millet', text: 'The same plant, Panicum miliaceum, under its other name. Not foxtail millet, which is a different species.' },
    ],
    sources: ['Central European Bronze Age archaeobotany', 'Stable carbon isotope studies of Bronze Age populations', 'Hallstatt Bronze Age salt workings'],
  },
  // ───────── The cook's table: three dishes, cooked 23 August 2026 ─────────
  {
    slug: 'honeyed-pork-chops-with-dates',
    title: 'Honeyed Pork Chops with Dates',
    ancient: '',
    translit: '',
    language: 'Unwritten',
    region: 'levant',
    category: 'Roasts & Hearth',
    siglum: 'Levantine pantry · pig bone assemblages · palace stores',
    provenance: 'Levantine coast and inland tells · zooarchaeology and storeroom finds',
    period: 'Late Bronze Age',
    date: 'c. 1400 – 1200 BC',
    serves: 'Serves 2',
    time: '30 min',
    grade: 'reconstructed',
    featured: false,
    summary:
      'Pork over fierce heat with a honey, coriander and cumin glaze, and dates going sticky in the fat alongside.',
    intro:
      'Pig was eaten across the Late Bronze Levant — the bones are in the middens — and everything else in this pan came off the same shelf. Sear hard, glaze late, let the dates collapse in the fat. Put the honey in early and you get a black chop and a raw one.',
    sourceText: {
      kind: 'paraphrase',
      text: 'Pig bones are present in Late Bronze Levantine settlement deposits. Olive oil, honey, dates, coriander and cumin are attested in palace stores, administrative texts and residue work across the same region and period. No text describes this dish.',
      attribution: 'Levantine zooarchaeology and storeroom archaeobotany',
    },
    ingredientGroups: [
      {
        name: 'The chops',
        items: [
          { ancient: '', modern: 'Bone-in pork chops, thick cut', qty: '2, about 350 g each', grade: 'attested' },
          { ancient: '', modern: 'Sea salt', qty: '2 tsp', grade: 'attested' },
          { ancient: '', modern: 'Olive oil, unfiltered', qty: '3 tbsp', grade: 'attested' },
          { ancient: '', modern: 'Medjool dates, stoned and halved', qty: '8', grade: 'attested' },
        ],
      },
      {
        name: 'The glaze',
        items: [
          { ancient: '', modern: 'Honey', qty: '2 tbsp', grade: 'attested' },
          { ancient: '', modern: 'Coriander seed, cracked', qty: '1 tbsp', grade: 'attested' },
          { ancient: '', modern: 'Cumin seed, cracked', qty: '2 tsp', grade: 'attested' },
          { ancient: '', modern: 'Olive oil, unfiltered', qty: '1 tbsp', grade: 'attested' },
          { ancient: '', modern: 'Garlic, crushed', qty: '2 cloves', grade: 'attested' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The chops',
        steps: [
          { text: 'Salt the chops both sides and leave them out of the cold for half an hour. Dry the surface hard with a cloth before they go near the pan — a wet chop steams instead of searing.', grade: 'inferred' },
          { text: 'Crack the coriander and cumin in a mortar. Cracked, not ground, so they stay as bits you can find. Stir into the honey with the crushed garlic and a spoon of oil.', grade: 'reconstructed' },
          { text: 'Get the pan properly hot and add the oil. Stand the chops on their fat edge first and hold them there until the rind renders and colours, a couple of minutes, then lay them flat.', grade: 'inferred' },
          { text: 'Sear four to five minutes a side. Tip the dates into the fat at the halfway turn so they soften and take colour without burning.', grade: 'reconstructed' },
          { text: 'Take the pan off the heat before the glaze goes anywhere near it. Spoon the honey mixture over both sides and swirl the pan — residual heat is enough to melt it into the crust. Honey on a live pan is black in twenty seconds.', grade: 'inferred' },
          { text: 'Rest five minutes. Spoon the pan syrup and the dates back over to serve.', grade: 'inferred' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'The pan',
        text: 'Cast iron is the practical modern stand-in and it is not period — the Bronze Age had bronze pans, clay griddles and hot stones. Bronze conducts faster and holds less heat, so a Late Bronze cook would have worked hotter and quicker than you will. It is the one anachronism here, and it is a tool rather than an ingredient.',
      },
    ],
    substitutions: [],
    sources: ['Levantine Late Bronze zooarchaeology', 'Palace and household storeroom assemblages'],
  },

  {
    slug: 'leek-lentil-and-barley-pottage',
    title: 'Leek, Lentil and Barley Pottage',
    ancient: '',
    translit: '',
    language: 'Unwritten',
    region: 'aegean',
    category: 'Pulses & Vegetables',
    siglum: 'Linear B commodity tablets · Aegean storeroom archaeobotany',
    provenance: 'Pylos and Knossos · palace stores and settlement deposits',
    period: 'Late Helladic',
    date: 'c. 1300 – 1200 BC',
    serves: 'Serves 4',
    time: '1 hr 10 min',
    grade: 'reconstructed',
    featured: false,
    summary:
      'The most defensible everyday dish here — everything in the pot is attested, and this is what most people actually ate.',
    intro:
      'Leeks softened in oil, then coriander seed and garlic, then barley and lentils in broth until the pot goes thick and muddy. Mint and crumbled sheep cheese over the top at the table. Nothing here needed inventing. Grain, pulse, allium, herb and cheese are most of the Bronze Age diet, and on an ordinary evening this is what they became.',
    sourceText: {
      kind: 'paraphrase',
      text: 'Barley, lentils, coriander, mint and sheep cheese are attested in Linear B commodity tablets or in Aegean storeroom archaeobotany. Alliums are attested across the region. No tablet records a method.',
      attribution: 'Linear B tablets, Pylos and Knossos; Aegean settlement archaeobotany',
    },
    ingredientGroups: [
      {
        name: 'The pot',
        items: [
          { ancient: 'e-ra-wo', modern: 'Olive oil, unfiltered', qty: '4 tbsp', grade: 'attested' },
          { ancient: '', modern: 'Leeks, sliced', qty: '3 large', grade: 'attested' },
          { ancient: '', modern: 'Garlic, crushed', qty: '4 cloves', grade: 'attested' },
          { ancient: 'ko-ri-ja-da-na', modern: 'Coriander seed, crushed', qty: '1 tbsp', grade: 'attested' },
          { ancient: 'ki-ri-ta', modern: 'Pearl barley', qty: '200 g', grade: 'attested' },
          { ancient: '', modern: 'Brown or green lentils', qty: '200 g', grade: 'attested' },
          { ancient: '', modern: 'Lamb or mutton bone broth', qty: '1.5 L', grade: 'attested' },
          { ancient: '', modern: 'Sea salt', qty: 'to taste', grade: 'attested' },
        ],
      },
      {
        name: 'Over the top',
        items: [
          { ancient: 'mi-ta', modern: 'Mint, fresh, chopped', qty: '1 small bunch', grade: 'attested' },
          { ancient: 'tu-ro2', modern: 'Brined sheep cheese, crumbled', qty: '80 g', grade: 'attested' },
          { ancient: 'e-ra-wo', modern: 'Olive oil, raw, to finish', qty: '2 tbsp', grade: 'attested' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The pot',
        steps: [
          { text: 'Sweat the leeks slowly in the oil with a pinch of salt until they slump and go sweet — ten minutes at least. Do not colour them; this dish wants them soft, not caramelised.', grade: 'reconstructed' },
          { text: 'Add the garlic and the crushed coriander seed and cook until you can smell both.', grade: 'reconstructed' },
          { text: 'Add the barley and the broth. Bring up and simmer twenty minutes, lid on. Barley takes appreciably longer than lentils — putting both in together is how you end up with chalky grain in soft pulse.', grade: 'inferred' },
          { text: 'Add the lentils and simmer another thirty to thirty-five minutes, until the barley is tender and the lentils have begun to break down and thicken the pot. Top up with broth if it tightens too far.', grade: 'reconstructed' },
          { text: 'Salt only now. Salting pulses at the start slows them down.', grade: 'inferred' },
          { text: 'Off the heat, beat in the raw oil. Top each bowl with chopped mint and crumbled cheese. The mint and the salt of the cheese are doing the job a squeeze of lemon would do now, and neither is optional.', grade: 'reconstructed' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'The cheese',
        text: 'Feta as a protected name is modern; brined sheep cheese as a food is not. Aegean tablets count cheese as a palace commodity, and a salty brined sheep curd is entirely at home here. Use sheep feta rather than cow if you have the choice — closer in fat, and in funk.',
      },
    ],
    substitutions: [
      {
        from: 'Lamb or mutton bone broth',
        to: 'Water, or a broth made from the leek trimmings',
        text: 'Makes the pot meat-free. An everyday household would have used whatever liquid was to hand, and water is as period-plausible here as bone broth — you lose body, so be firmer with the salt and the raw oil at the end.',
      },
    ],
    sources: ['Linear B commodity tablets', 'Aegean Late Bronze storeroom archaeobotany'],
  },

  {
    slug: 'hot-pan-flatbread',
    title: 'Hot-Pan Flatbread',
    ancient: '',
    translit: '',
    language: 'Unwritten',
    region: 'levant',
    category: 'Breads & Grain',
    siglum: 'Griddle and tabun assemblages across the region',
    provenance: 'Levantine and Mesopotamian settlement deposits',
    period: 'Late Bronze Age',
    date: 'c. 1750 – 1150 BC',
    serves: 'Makes 6',
    time: '35 min',
    grade: 'inferred',
    featured: false,
    summary: 'Flour, water, salt, fierce dry heat. The bread every other dish here was eaten with.',
    intro:
      'Flour, water, salt, and a surface too hot to touch. Thirty seconds to a puff, a minute to done. Clay griddles and domed ovens turn up at settlement sites right across the region, because everybody ate this every day.',
    sourceText: {
      kind: 'paraphrase',
      text: 'Flat baking surfaces, domed clay ovens and griddle sherds are recovered across Levantine and Mesopotamian settlement deposits throughout the period. Grain, salt and water need no attesting.',
      attribution: 'Regional griddle and oven assemblages',
    },
    ingredientGroups: [
      {
        name: 'The dough',
        items: [
          { ancient: '', modern: 'Wholemeal emmer flour', qty: '300 g', grade: 'attested' },
          { ancient: '', modern: 'Water, warm', qty: '190 ml', grade: 'inferred' },
          { ancient: '', modern: 'Sea salt', qty: '1 tsp', grade: 'attested' },
          { ancient: '', modern: 'Olive oil, unfiltered', qty: '1 tbsp, optional', grade: 'attested' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The dough',
        steps: [
          { text: 'Mix flour and salt, add the water, bring it together into a firm dough. Knead two minutes — no more. This is not a bread that wants gluten development.', grade: 'inferred' },
          { text: 'Cover and rest twenty minutes. The rest does the work kneading would have done, and it is what lets you roll thin without the dough springing back.', grade: 'inferred' },
          { text: 'Divide into six. Roll each as thin as you can get it without tearing — thinner than feels right.', grade: 'reconstructed' },
          { text: 'Heat a dry pan or griddle until a flick of water skitters and vanishes. No oil in the pan.', grade: 'inferred' },
          { text: 'Lay one on. Thirty to sixty seconds, until the top goes from wet to matt and blisters lift. Flip. It should balloon — press the edge with a cloth if it needs encouraging.', grade: 'reconstructed' },
          { text: 'Stack them under a cloth as they come off; they steam each other soft. Eat within the hour. This bread is at its best about four minutes old.', grade: 'inferred' },
        ],
      },
    ],
    apparatus: [],
    substitutions: [],
    sources: ['Levantine and Mesopotamian griddle and oven assemblages'],
  },
  // ── Egypt: two more ───────────────────────────────────────────────────
  {
    slug: 'roast-goose-with-figs',
    title: 'Roast Goose with Figs',
    ancient: 'SMN',
    translit: 'smn',
    language: 'Egyptian',
    region: 'egypt',
    category: 'Roasts & Hearth',
    siglum: 'Theban tomb painting · Tutankhamun food boxes',
    provenance: 'Thebes · New Kingdom tombs',
    period: 'New Kingdom',
    date: 'c. 1550 – 1100 BC',
    serves: 'Serves 6',
    time: '2 hr 30 min',
    grade: 'reconstructed',
    summary:
      'The bird Egyptian tomb walls show more than any other, and one of the very few dishes you have actually recovered as food rather than as a picture of food.',
    intro:
      'Among the provisions sealed into Tutankhamun’s tomb were boxes of prepared poultry, one of them cut in the shape of a goose and containing a goose. That is unusual: most Egyptian food reaches us as a picture of food. Geese are also everywhere on the tomb walls — netted, herded, counted, plucked, spitted — and force-feeding to fatten the liver is depicted as far back as the Old Kingdom, so these were birds raised for richness rather than caught wild. The method is the part nobody recorded, which is why this is graded a reconstruction: a long slow roast to render the fat, figs and honey in the cavity because both are attested Egyptian flavourings.',
    sourceText: {
      kind: 'paraphrase',
      text: 'Tomb painting shows geese at every stage from netting to plucking to spitting. Sealed provision boxes from royal burials contained prepared poultry, including goose. Gavage — cramming grain into the birds to fatten the liver — is depicted from the Old Kingdom.',
      attribution: 'Composite from New Kingdom tomb painting and recovered funerary provisions',
    },
    ingredientGroups: [
      {
        name: 'The bird',
        items: [
          { ancient: 'smn', modern: 'Goose, or a large duck', qty: '1, about 4 kg', grade: 'attested' },
          { ancient: 'dꜣbw', modern: 'Dried figs, halved', qty: '250 g', grade: 'attested' },
          { ancient: 'bjt', modern: 'Honey', qty: '3 tbsp', grade: 'attested' },
          { ancient: 'ḥmꜣt', modern: 'Coarse salt', qty: '2 tbsp', grade: 'attested' },
          { ancient: 'kꜣ', modern: 'Onion, quartered', qty: '2', grade: 'attested' },
          { ancient: 'šꜣms', modern: 'Coriander seed, crushed', qty: '1 tbsp', grade: 'attested' },
          { ancient: 'jrṯt', modern: 'Cumin seed', qty: '2 tsp', grade: 'inferred' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The bird',
        steps: [
          {
            text: 'Prick the skin all over with a fork, keeping the point in the fat and out of the meat. A goose carries an enormous amount of fat and the whole roast is about getting it out.',
            grade: 'reconstructed',
          },
          { text: 'Rub the salt, crushed coriander and cumin over and inside the bird.', grade: 'inferred' },
          { text: 'Fill the cavity with the figs and the onion, and spoon in the honey.', grade: 'reconstructed' },
          {
            text: 'Set the bird on a rack over a deep tray and roast low — 150°C — for two hours, pouring off the rendered fat every forty minutes. Keep the fat; it is the best cooking fat in this entire pantry.',
            grade: 'reconstructed',
          },
          { text: 'Raise the heat hard for the last twenty minutes to crisp the skin.', grade: 'reconstructed' },
          { text: 'Rest it for twenty minutes. Serve the softened figs from the cavity alongside.', grade: 'inferred' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'What is actually attested',
        text: 'The bird, its importance, its deliberate fattening, and its presence as prepared food in a sealed tomb. Not the seasoning and not the method. Figs and honey are both attested Egyptian flavourings, so they are a reasonable choice rather than a documented one — which is the difference between this entry and the Babylonian ones.',
      },
    ],
    substitutions: [
      { from: 'Goose', to: 'Two large ducks', text: 'Easier to buy, cooks faster, renders nearly as much fat.' },
    ],
    sources: ['New Kingdom Theban tomb painting', 'Funerary provision boxes, tomb of Tutankhamun'],
  },
  {
    slug: 'shelled-beans-deir-el-medina',
    title: 'Shelled Beans for the Tomb-Builders',
    ancient: 'JWRYT',
    translit: 'jwryt',
    language: 'Egyptian',
    region: 'egypt',
    category: 'Pulses & Vegetables',
    siglum: 'Deir el-Medina ostraca and ration lists',
    provenance: 'Deir el-Medina, Thebes · workmen’s village',
    period: 'New Kingdom · Ramesside',
    date: 'c. 1250 BC',
    serves: 'Serves 4',
    time: '1 hr 30 min',
    grade: 'reconstructed',
    summary:
      'Issued by the hundred jars to the men who cut the royal tombs — the most ordinary food on this site, and the best documented as something people were actually given.',
    intro:
      'The men who cut the royal tombs could write, and what they mostly wrote down was what they were owed and when it failed to turn up. Deir el-Medina is the rarest thing in Egyptology for exactly that reason: a village that kept its own receipts. The ostraca record rations in detail, and under the Ramesside kings shelled beans went out by the hundred jars. This is not banquet food and it is not tomb-wall aspiration — every other Egyptian dish here comes from what somebody wanted to be seen eating for eternity. This one comes off a payroll.',
    sourceText: {
      kind: 'paraphrase',
      text: 'Ration accounts from the workmen’s village record regular issues of grain, bread, beer, fish, vegetables and oil, with shelled beans distributed in quantity under the Ramesside kings.',
      attribution: 'Deir el-Medina ostraca — a ration record, not a recipe',
    },
    ingredientGroups: [
      {
        name: 'The pot',
        items: [
          { ancient: 'jwryt', modern: 'Dried broad beans, shelled, soaked overnight', qty: '400 g', grade: 'attested' },
          { ancient: 'kꜣ', modern: 'Onion, chopped', qty: '2', grade: 'attested' },
          { ancient: 'ḥḏw', modern: 'Garlic, crushed', qty: '6 cloves', grade: 'attested' },
          { ancient: 'bꜣq', modern: 'Moringa or sesame oil', qty: '5 tbsp', grade: 'attested' },
          { ancient: 'šꜣms', modern: 'Coriander seed, ground', qty: '2 tsp', grade: 'attested' },
          { ancient: 'jrṯt', modern: 'Cumin seed, ground', qty: '2 tsp', grade: 'attested' },
          { ancient: 'ḥmꜣt', modern: 'Salt', qty: '2 tsp', grade: 'attested' },
          { ancient: 'smw', modern: 'Fresh coriander leaf, chopped', qty: '1 bunch', grade: 'inferred' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The pot',
        steps: [
          { text: 'Drain the soaked beans and cover with fresh water. Boil hard for ten minutes, then simmer for an hour until soft.', grade: 'reconstructed' },
          { text: 'Do not salt them until they are tender. Salted early, they stay leathery.', grade: 'reconstructed' },
          { text: 'Warm the oil in a pan and soften the onion in it, then add the garlic, cumin and ground coriander for a minute more.', grade: 'inferred' },
          { text: 'Stir the onion mixture through the drained beans, crushing about a third of them against the side of the pot to thicken it.', grade: 'reconstructed' },
          { text: 'Salt, and finish with the raw coriander leaf and a hard pour of oil over the top.', grade: 'inferred' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'Why this one is here',
        text: 'Every other Egyptian entry on this site comes from a tomb — which means it comes from what someone wanted to be seen eating for eternity. This comes from a payroll. It is the corrective the Egyptian shelf needs, and the reason it is worth cooking something this plain.',
      },
    ],
    substitutions: [
      { from: 'Moringa oil', to: 'Sesame oil, or olive oil', text: 'Moringa is attested and hard to buy; sesame is attested and easy.' },
      { from: 'Dried broad beans', to: 'Tinned broad beans, 2 × 400 g', text: 'Skip straight to the frying step. Nothing is lost but time.' },
    ],
    sources: ['Deir el-Medina ostraca and ration accounts', 'Published surveys of New Kingdom workmen’s provisioning'],
  },

  // ── Hatti: three more ─────────────────────────────────────────────────
  {
    slug: 'happena-meat-in-oil-and-honey',
    title: 'Happena',
    ancient: 'ḪAPPENA',
    translit: 'ḫappena',
    language: 'Hittite',
    region: 'hatti',
    category: 'Roasts & Hearth',
    siglum: 'Hittite cuneiform food texts · Boğazköy',
    provenance: 'Hattuša (Boğazköy), central Anatolia',
    period: 'Hittite Empire',
    date: 'c. 1400 – 1200 BC',
    serves: 'Serves 4',
    time: '2 hr 15 min',
    grade: 'reconstructed',
    summary:
      'Meat baked slowly in olive oil and honey — a named Hittite dish and the clearest evidence that this kitchen liked sweetness against meat.',
    intro:
      'Two kitchens a few hundred miles apart, disagreeing about sweetness. The Mesopotamian tablets sour their meat pots with beer and soured milk and never once sweeten them; the Hittite corpus names a dish that does. Happena is glossed as a casserole of meat, olive oil and honey — and three ingredients attached to a name is unusually generous by Hittite standards, where a great many foods are named and almost none described. Cooked slowly and covered, the honey goes dark and faintly resinous rather than sweet. The name and the three ingredients are attested. The method is ours.',
    sourceText: {
      kind: 'paraphrase',
      text: 'Named in the Hittite food texts and glossed as a casserole of meat, olive oil and honey.',
      attribution: 'Hittite cuneiform corpus, Boğazköy — the name and the three ingredients are attested; the method is not',
    },
    ingredientGroups: [
      {
        name: 'The pot',
        items: [
          { ancient: 'UZU', modern: 'Lamb or mutton shoulder, on the bone, cut large', qty: '1.5 kg', grade: 'attested' },
          { ancient: 'Ì.GIŠ', modern: 'Olive oil', qty: '150 ml', grade: 'attested' },
          { ancient: 'LÀL', modern: 'Honey', qty: '4 tbsp', grade: 'attested' },
          { ancient: 'SUM', modern: 'Onion, thickly sliced', qty: '3', grade: 'inferred' },
          { ancient: 'ŠE.LÚ.SAR', modern: 'Coriander seed, crushed', qty: '1 tbsp', grade: 'inferred' },
          { ancient: 'MUN', modern: 'Salt', qty: '2 tsp', grade: 'inferred' },
          { ancient: 'GEŠTIN', modern: 'Wine, or water', qty: '200 ml', grade: 'inferred' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The pot',
        steps: [
          { text: 'Salt the meat and let it sit for half an hour while the oven comes to 150°C.', grade: 'reconstructed' },
          { text: 'Lay the onion across the base of a heavy lidded pot and the meat on top of it, so the meat is lifted clear of the liquid.', grade: 'reconstructed' },
          { text: 'Pour over the oil, then the honey, then the wine. The oil should come at least a third of the way up the meat.', grade: 'attested' },
          { text: 'Cover tightly and bake for two hours without opening it. Nothing here needs turning or basting.', grade: 'reconstructed' },
          { text: 'Take the lid off for a final fifteen minutes to let the top colour and the honey catch.', grade: 'reconstructed' },
          { text: 'Skim the oil off the surface and keep it — it is now spiced, sweetened and worth more than the wine was.', grade: 'inferred' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'Sweet with meat',
        text: 'Worth noticing as a regional signature. The Mesopotamian tablets sour their meat pots with beer and soured milk and never sweeten them; the Hittite corpus names a dish that does. Whatever else the two kitchens shared, they disagreed about this.',
      },
    ],
    substitutions: [
      { from: 'Wine', to: 'Water', text: 'The dish carries enough from the oil and the honey. Wine deepens it and is not load-bearing.' },
    ],
    sources: ['Hittite cuneiform food texts, Boğazköy archive', 'Published surveys of Hittite foodways'],
  },
  {
    slug: 'neck-of-mutton-with-leeks-hattusa',
    title: 'Neck of Mutton with a Great Many Leeks',
    ancient: 'UDU',
    translit: 'udu',
    language: 'Hittite, written in cuneiform',
    region: 'hatti',
    category: 'Stews & Broths',
    siglum: 'Hittite Laws · Boğazköy archive',
    provenance: 'Ḫattuša · the market below the walls',
    period: 'Hittite Empire',
    date: 'c. 1250 BC',
    serves: 'Serves 6',
    time: '3 hr',
    grade: 'reconstructed',
    summary:
      'A market dish, not a festival one: the cheap end of the animal, buried in more allium than seems reasonable.',
    intro:
      'The Hittites left tens of thousands of tablets and almost no cooking. What they did leave is a law code that fixes what an animal is worth, ration lists that say who ate how much, and festival texts naming well over a hundred breads without explaining one of them. So this is built from the shape of the evidence rather than from a recipe: a sheep is the ordinary animal, the neck and shanks are what an ordinary household could afford, alliums are the vegetable the whole Near East cooks on, and the Hittite kitchen is the one that lets sweetness near meat. Three hours later you have something that tastes far better than the argument that produced it.',
    sourceText: {
      kind: 'paraphrase',
      text: 'The Hittite Laws set tariffs in silver for livestock, hides, grain and hired labour, listing a sheep among the cheapest animals a household would buy. Ration texts from Ḫattuša issue grain and beer by the person. Festival texts name well over a hundred breads and pastries. No Hittite tablet explains how to cook anything.',
      attribution: 'Hittite Laws and the Boğazköy archive',
    },
    ingredientGroups: [
      {
        name: 'The pot',
        items: [
          { ancient: 'UDU', modern: 'Mutton or lamb neck, on the bone, in thick slices', qty: '1.5 kg', grade: 'attested', note: 'sheepsign' },
          { ancient: 'Ì', modern: 'Sheep-tail fat, or lamb fat trimmed from the neck', qty: '3 tbsp', grade: 'attested' },
          { ancient: 'SUM', modern: 'Onions, sliced thick', qty: '3 large', grade: 'attested' },
          { ancient: 'SUM', modern: 'Leeks, white and green, in fat lengths', qty: '8 large', grade: 'inferred', note: 'whichallium' },
          { ancient: 'SUM', modern: 'Garlic, cloves left whole', qty: '1 head', grade: 'inferred' },
          { ancient: 'ŠE', modern: 'Pearl barley, to thicken', qty: '100 g', grade: 'attested' },
          { ancient: '—', modern: 'Water', qty: 'to cover', grade: 'inferred' },
          { ancient: '—', modern: 'Salt', qty: 'to taste', grade: 'inferred' },
        ],
      },
      {
        name: 'To finish',
        items: [
          { ancient: 'milit', modern: 'Honey', qty: '1 tbsp', grade: 'attested', note: 'sweetmeat' },
          { ancient: 'GA', modern: 'Hard sheep cheese, to grate over', qty: '60 g', grade: 'attested' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The pot',
        steps: [
          { text: 'Render the sheep fat slowly in a heavy pot until you have a shallow pool of it and the solids have gone golden. Lift the solids out and keep them.', grade: 'reconstructed' },
          { text: 'Brown the mutton hard on both sides, in batches, so the pot never cools enough to steam. Set the meat aside.', grade: 'reconstructed' },
          { text: 'Put the onions in with a good pinch of salt and cook them slowly until they collapse and sweeten — fifteen minutes at least, and longer will not hurt.', grade: 'reconstructed' },
          { text: 'Add the garlic and HALF the leeks, return the meat, and pour in water to come two thirds up. Bring it to a bare tremble, cover, and leave it for two hours.', grade: 'reconstructed' },
          { text: 'Stir in the barley and the SECOND half of the leeks. Cook uncovered for another forty minutes, until the barley is soft and the broth has thickened around it.', grade: 'reconstructed' },
          { text: 'Off the heat, stir the honey through — one spoon, so it rounds the pot rather than sweetening it. Salt properly now, not before.', grade: 'reconstructed' },
          { text: 'Grate the sheep cheese over, scatter the reserved fat solids, and let it sit ten minutes before serving.', grade: 'reconstructed' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'Standing',
        text: 'The Ḫattuša archive is the largest thing of ours you have ever recovered and there is not one recipe in it. Everything here is inference from what the tablets DO record — what animals cost, what people were issued, what was carried into a temple — plus the one thing the Hittite kitchen is genuinely known for, which is putting sweetness next to meat. Cook it because it works, not because it is proven.',
      },
      {
        term: 'Why the sheep is written in Sumerian',
        text: 'UDU is a Sumerian sign, and Hittite scribes used it constantly while writing Hittite — you read the sign as "sheep" and say your own word for it, the way we read & and say "and". A Hittite tablet is a mosaic of Sumerian logograms, Akkadian spellings and Hittite grammar, all at once. It is why the archive took so long to read and it is not a sign of borrowing: nobody at Ḫattuša thought they were writing Sumerian.',
      },
      {
        term: 'Which allium, exactly',
        text: 'Alliums are all over the Near Eastern texts and pinning them to species is another matter. The cuneiform writings cover onion, garlic, leek and several things in between, and specialists argue about which is which. Onion and garlic are secure enough; the leek here is marked inferred because the dish leans on it hardest and the identification is the shakiest part of it. If it turns out the Hittites were eating something else green and oniony, the pot will not mind.',
      },
      {
        term: 'One shekel for a sheep',
        text: 'The Hittite Laws fix prices in silver for livestock and labour, and a sheep sits among the cheapest animals on the list at about a shekel. Treat that as a legal reference value and not as a receipt: a code that sets a price is evidence of an argument, not a record of a transaction, and almost nobody in this economy was paying in silver anyway. Barley, cloth and oil did most of the actual buying.',
      },
      {
        term: 'Why the leeks go in twice',
        text: 'Leeks that cook for two hours dissolve into the broth and thicken it, which is what you want underneath. Leeks that go in at the end stay in pieces and taste of themselves, which is what you want on top. Putting them all in at once gives you neither.',
      },
    ],
    substitutions: [
      { from: 'Mutton neck', to: 'Lamb neck, or shoulder cut into large pieces', text: 'Neck is the right cut and the cheap one — plenty of bone and connective tissue, which is what makes the broth. Shoulder works and costs more. Leg does not: too lean, and it goes dry before it goes tender.' },
      { from: 'Sheep-tail fat', to: 'Fat trimmed from the meat, or olive oil', text: 'Tail fat is the period-correct cooking fat across most of this world and it is worth asking a butcher for. Failing that, trim the neck itself; oil is the last resort and the pot is a little thinner for it.' },
      { from: 'Hard sheep cheese', to: 'Pecorino, or a dry feta', text: 'You want salt and funk, not creaminess. Anything young and mild will disappear into the broth.' },
    ],
    sources: ['The Hittite Laws', 'Boğazköy (Ḫattuša) archive: ration and festival texts', 'Anatolian faunal assemblages'],
  },

  {
    slug: 'kariya-grilled-liver-and-heart',
    title: 'Kariya',
    ancient: 'KARIYA',
    translit: 'kariya',
    language: 'Hittite',
    region: 'hatti',
    category: 'Roasts & Hearth',
    siglum: 'Hittite cuneiform food texts · Boğazköy',
    provenance: 'Hattuša (Boğazköy), central Anatolia',
    period: 'Hittite Empire',
    date: 'c. 1400 – 1200 BC',
    serves: 'Serves 4',
    time: '30 min',
    grade: 'reconstructed',
    summary:
      'Lamb liver and heart, grilled — the fastest dish on the site, and the one that best explains what sacrifice actually smelled like.',
    intro:
      'The liver was read before it was eaten. Hittite and Babylonian priests both took omens from sheep livers — clay teaching models, marked up for instruction, survive from across the Near East — and then the organ went on the coals like anything else. Both things are true at once, and the second is the one people forget. Heart and liver appear together in the Hittite food texts under this name. Grilled hard and fast, both are excellent: liver wants to be pink inside and is ruined at any doneness past that, heart is lean and dense and behaves far more like a steak than most people expect.',
    sourceText: {
      kind: 'paraphrase',
      text: 'Named in the Hittite food texts and glossed as grilled lamb liver and heart.',
      attribution: 'Hittite cuneiform corpus, Boğazköy — the name and the cut are attested; the seasoning is not',
    },
    ingredientGroups: [
      {
        name: 'The skewers',
        items: [
          { ancient: 'UZU.NÍG.GIG', modern: 'Lamb liver, trimmed and cut into large cubes', qty: '400 g', grade: 'attested' },
          { ancient: 'UZU.ŠÀ', modern: 'Lamb hearts, trimmed and cut into cubes', qty: '400 g', grade: 'attested' },
          { ancient: 'Ì.GIŠ', modern: 'Olive oil', qty: '4 tbsp', grade: 'inferred' },
          { ancient: 'MUN', modern: 'Coarse salt', qty: '2 tsp', grade: 'inferred' },
          { ancient: 'ŠE.LÚ.SAR', modern: 'Coriander seed, coarsely crushed', qty: '1 tbsp', grade: 'inferred' },
          { ancient: 'SUM', modern: 'Onion, cut into thick petals', qty: '2', grade: 'inferred' },
          { ancient: 'GA.KIN.AG', modern: 'Fresh mint, torn, to finish', qty: '1 bunch', grade: 'inferred' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The skewers',
        steps: [
          { text: 'Trim the liver of its membrane and any tubes. Split the hearts, cut out the hard white sinew at the top, and cube both.', grade: 'reconstructed' },
          { text: 'Toss with the oil and the crushed coriander. Salt it now — this is a short cook and there is no time for salt to travel.', grade: 'reconstructed' },
          { text: 'Thread onto skewers, alternating with onion petals, and get the coals as hot as they will go.', grade: 'inferred' },
          { text: 'Grill three minutes a side and no more. Liver past pink turns to chalk and there is no recovering it.', grade: 'reconstructed' },
          { text: 'Rest two minutes, scatter the torn mint over, and eat straight off the skewer with bread.', grade: 'inferred' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'Liver and divination',
        text: 'Hittite and Babylonian priests both read sheep livers for omens, and clay models of livers marked up for teaching survive from across the Near East. The organ was inspected and then it was cooked. Both facts are true at once, and the second is easy to forget.',
      },
    ],
    substitutions: [
      { from: 'Lamb heart', to: 'More liver, or lamb kidney', text: 'Heart is the harder buy. A butcher will have it; a supermarket often will not.' },
    ],
    sources: ['Hittite cuneiform food texts, Boğazköy archive', 'Published surveys of Hittite foodways'],
  },
  {
    slug: 'beruwa-chickpea-and-cucumber',
    title: 'Beruwa',
    ancient: 'BERUWA',
    translit: 'beruwa',
    language: 'Hittite',
    region: 'hatti',
    category: 'Pulses & Vegetables',
    siglum: 'Hittite cuneiform food texts · Boğazköy',
    provenance: 'Hattuša (Boğazköy), central Anatolia',
    period: 'Hittite Empire',
    date: 'c. 1400 – 1200 BC',
    serves: 'Serves 4',
    time: '1 hr',
    grade: 'reconstructed',
    summary:
      'A mash — that is what the word means — of chickpeas, with raw cucumber over the top. The oldest ancestor of a very familiar thing.',
    intro:
      'You will think you know what this is. Put that down for a minute. Beruwa is the Hittite word for mashed food, and the texts name a version with chickpea and a version with cucumber; putting them in one bowl is our doing rather than theirs. There is no sesame paste in it and no citrus — no evidence for either here — and the texture stays deliberately coarse. What it is instead is a warm crushed chickpea dish with oil worked through it and cold cucumber over the top, and that cold-against-warm is both the part nobody expects and the part that makes it work.',
    sourceText: {
      kind: 'paraphrase',
      text: 'Beruwa is the term for mashed food; the texts record beruwa with chickpea and beruwa with cucumber among the named varieties.',
      attribution: 'Hittite cuneiform corpus, Boğazköy — the components are attested, the combination is ours',
    },
    ingredientGroups: [
      {
        name: 'The mash',
        items: [
          { ancient: 'GÚ.GAL', modern: 'Dried chickpeas, soaked overnight', qty: '350 g', grade: 'attested' },
          { ancient: 'Ì.GIŠ', modern: 'Olive oil', qty: '6 tbsp', grade: 'attested' },
          { ancient: 'SUM.SIKIL', modern: 'Garlic, crushed', qty: '4 cloves', grade: 'attested' },
          { ancient: 'MUN', modern: 'Salt', qty: '2 tsp', grade: 'attested' },
          { ancient: 'ŠE.LÚ.SAR', modern: 'Coriander seed, ground', qty: '2 tsp', grade: 'inferred' },
          { ancient: 'ÚKUŠ', modern: 'Cucumber, diced small', qty: '1 large', grade: 'attested' },
          { ancient: 'SUM', modern: 'Onion, diced very small', qty: '1 small', grade: 'inferred' },
          { ancient: 'GA.KIN.AG', modern: 'Fresh mint, torn', qty: '1 small bunch', grade: 'inferred' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The mash',
        steps: [
          { text: 'Simmer the drained chickpeas in fresh unsalted water for fifty minutes, until they crush easily between finger and thumb.', grade: 'reconstructed' },
          { text: 'Drain, keeping a mugful of the cooking water.', grade: 'reconstructed' },
          { text: 'Crush them in a mortar or with the back of a spoon — coarsely. This is a mash, not a purée, and a food processor makes the wrong thing.', grade: 'attested' },
          { text: 'Work in the oil, the raw garlic, the ground coriander and the salt, loosening with the cooking water until it is thick but soft.', grade: 'inferred' },
          { text: 'Spread it warm in a shallow bowl and scatter the raw diced cucumber, onion and mint over the top. Do not stir them in.', grade: 'reconstructed' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'Not hummus',
        text: 'Worth stating plainly, because the resemblance is strong enough to mislead. There is no sesame paste and no citrus here — neither is evidenced for this dish — and the texture is deliberately coarse. What the Hittites had was the chickpea, the oil, the garlic and the mortar. That is most of the way there, and it is not the same dish.',
      },
    ],
    substitutions: [
      { from: 'Dried chickpeas', to: 'Tinned chickpeas, 2 × 400 g, warmed', text: 'The texture suffers slightly. The dish survives.' },
    ],
    sources: ['Hittite cuneiform food texts, Boğazköy archive', 'Published surveys of Hittite foodways'],
  },

  // ── The Aegean: two more ──────────────────────────────────────────────
  {
    slug: 'skewers-on-the-firedog',
    title: 'Skewers on the Firedog',
    ancient: 'OBELOS',
    translit: 'obelos',
    language: 'Mycenaean Greek',
    region: 'aegean',
    category: 'Roasts & Hearth',
    siglum: 'Akrotiri firedogs · Mycenaean souvlaki trays',
    provenance: 'Akrotiri, Thera; Mycenae, Gla, Pylos',
    period: 'Late Bronze Age Aegean',
    date: 'c. 1700 – 1100 BC',
    serves: 'Serves 4',
    time: '45 min, plus marinating',
    grade: 'reconstructed',
    summary:
      'Grilled meat on skewers, cooked on a purpose-built portable grill — the best-evidenced cooking method in the Aegean, because the equipment survives.',
    intro:
      'Most Bronze Age cooking has to be inferred from ingredients. This one is inferred from hardware, which is better. At Akrotiri, excavators found ceramic firedogs with paired notches cut along the top to seat skewers and a line of holes through the base to feed the coals air. From Mycenae, Gla and Pylos come rectangular trays that sat beneath the skewers to catch the fat — and experimental work found they only performed properly with the coals inside them, which makes the whole assembly portable. You carried the fire with you. What went on the skewers, none of us wrote down.',
    sourceText: {
      kind: 'paraphrase',
      text: 'Ceramic firedogs from Akrotiri carry paired indentations for resting skewers and perforations to supply the coals with air. Rectangular grill trays from Mycenae, Gla and Pylos sat beneath the skewers. Replication showed the tray performed as a portable brazier, holding the coals rather than sitting in a fire.',
      attribution: 'Aegean cooking apparatus, c. 1700–1100 BC — the equipment is the evidence',
    },
    ingredientGroups: [
      {
        name: 'The skewers',
        items: [
          { ancient: 'aiks', modern: 'Kid or lamb shoulder, cut into 3 cm cubes', qty: '1 kg', grade: 'attested' },
          { ancient: 'e-ra-wo', modern: 'Olive oil', qty: '5 tbsp', grade: 'attested' },
          { ancient: 'ko-ri-ja-do-no', modern: 'Coriander seed, coarsely crushed', qty: '1 tbsp', grade: 'attested' },
          { ancient: 'ma-ra-tu-wo', modern: 'Fennel seed, crushed', qty: '2 tsp', grade: 'attested' },
          { ancient: 'ku-mi-no', modern: 'Cumin seed', qty: '2 tsp', grade: 'attested' },
          { ancient: 'sa-sa-ma', modern: 'Sesame seed, to finish', qty: '2 tbsp', grade: 'attested' },
          { ancient: 'ti-ri-po', modern: 'Salt', qty: '2 tsp', grade: 'attested' },
          { ancient: 'me-ri', modern: 'Honey, a spoonful in the marinade', qty: '1 tbsp', grade: 'inferred' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The skewers',
        steps: [
          { text: 'Toss the meat with the oil, the crushed seeds, the honey and the salt. Leave it an hour, or overnight if you can.', grade: 'reconstructed' },
          { text: 'Thread onto skewers, packed close rather than spaced — the pieces protect each other from drying.', grade: 'inferred' },
          { text: 'Get the coals grey-hot and, if you have a tray, put the coals IN it. The replication work found that is how the apparatus was meant to run.', grade: 'attested' },
          { text: 'Rest the skewers across the notches so the meat sits clear of the coals with the fat falling between. Turn every two minutes.', grade: 'attested' },
          { text: 'Twelve to fifteen minutes total for kid, less for lamb. It should be well coloured outside and pink at the centre.', grade: 'reconstructed' },
          { text: 'Scatter toasted sesame over and eat straight from the skewer.', grade: 'inferred' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'The firedog',
        text: 'A pair of ceramic supports with matched notches along the top, sitting either side of a bed of coals. The notches hold the skewers at a fixed height and let you turn them without touching the meat. Any two bricks and a bed of charcoal will reproduce the geometry; the point is that the meat is above the coals and the fat falls away, not into the fire.',
      },
      {
        term: 'What is not attested',
        text: 'The marinade. Every seasoning listed is a Linear B ingredient, and the palace tablets record all of them being issued — but the tablets are inventories, not recipes, and nobody wrote down what those people put on their meat. The equipment is the hard evidence; the flavouring is a reasonable guess from the pantry.',
      },
    ],
    substitutions: [
      { from: 'Kid', to: 'Lamb shoulder, or pork shoulder', text: 'All three are attested in Linear B livestock records.' },
      { from: 'A firedog', to: 'Two bricks and a charcoal grill', text: 'You are reproducing a geometry, not an artefact.' },
    ],
    sources: [
      'Akrotiri ceramic firedogs, Thera',
      'Mycenaean grill trays from Mycenae, Gla and Pylos',
      'Published replication study of Mycenaean grill trays',
    ],
  },
  {
    slug: 'kykeon-barley-and-cheese',
    title: 'Kykeon',
    ancient: 'ΚΥΚΕΩΝ',
    translit: 'kykeōn',
    language: 'Greek',
    region: 'aegean',
    category: 'Drink & Ferment',
    siglum: 'Iliad XI · Nestor’s cup',
    provenance: 'Homeric epic, describing an earlier world',
    period: 'Late Bronze Age tradition, written down later',
    date: 'described c. 1200 BC; recorded c. 750 BC',
    serves: 'Serves 2',
    time: '10 min',
    grade: 'reconstructed',
    summary:
      'Barley meal, grated goat cheese and wine, stirred together and drunk — restorative, strange, and the one recipe here that comes from a poem.',
    intro:
      'In the eleventh book of the Iliad a wounded man is handed a drink: Pramnian wine, goat cheese grated into it with a bronze rasp, white barley meal scattered over the top. It is offered as a restorative, and the same mixture surfaces later as the ritual drink of the Eleusinian Mysteries. Homer is the weakest evidence on this site and it is worth being blunt about why — the poems were fixed in writing centuries after the world they describe, and epic preserves objects and customs unevenly. What keeps it here is that every component is independently named on the Linear B tablets, the palace accounts kept four hundred years earlier, so the ingredients are period-correct even where the drink as described is not securely so.',
    sourceText: {
      kind: 'quotation',
      text: 'Therein she first mixed Pramnian wine, and grated over it goat’s-milk cheese with a bronze grater, and sprinkled thereon white barley meal.',
      attribution: 'Iliad XI — an epic composed centuries after the period it describes',
    },
    ingredientGroups: [
      {
        name: 'The cup',
        items: [
          { ancient: 'wo-no', modern: 'Strong red wine', qty: '400 ml', grade: 'attested' },
          { ancient: 'tu-ro₂', modern: 'Hard goat cheese, finely grated', qty: '60 g', grade: 'attested' },
          { ancient: 'ki-ri-ta', modern: 'Barley flour, lightly toasted', qty: '4 tbsp', grade: 'attested' },
          { ancient: 'me-ri', modern: 'Honey, to taste', qty: '1 tbsp', grade: 'inferred' },
          { ancient: 'ti-ri-po', modern: 'A pinch of salt', qty: '1 pinch', grade: 'inferred' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The cup',
        steps: [
          { text: 'Toast the barley flour in a dry pan until it smells of bread and darkens a shade. Let it cool.', grade: 'inferred' },
          { text: 'Grate the cheese as finely as you can. The bronze rasp in the poem is doing real work — coarse cheese will not disperse.', grade: 'attested' },
          { text: 'Stir the cheese into the wine until it breaks up and clouds it.', grade: 'attested' },
          { text: 'Scatter the barley meal over the surface and stir it through with the honey and salt.', grade: 'attested' },
          { text: 'Drink it while it is still moving. Left to stand it separates, and the poem does not say to strain it.', grade: 'reconstructed' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'How to take this one',
        text: 'The weakest evidence on the site, and flagged as such. Homer describes a world several centuries before the poems were fixed in writing, and epic preserves objects and customs unevenly. What makes it worth including is that every ingredient is independently attested in Linear B — wine, goat cheese, barley — so the components are period-correct even if the drink as described is not securely so.',
      },
      {
        term: 'What it tastes like',
        text: 'Genuinely strange the first time: sour, savoury, grainy and cold, closer to a thin salted porridge with wine in it than to anything now called a drink. It is also unmistakably restorative in the way a salted, fatty, carbohydrate-heavy thing is after hard exertion, which is exactly the context the poem gives it.',
      },
    ],
    substitutions: [
      { from: 'Pramnian wine', to: 'Any strong dry red', text: 'Nobody knows what Pramnian was. Strength is the recoverable part.' },
      { from: 'Barley flour', to: 'Fine oatmeal', text: 'Wrong grain, right behaviour, if barley flour defeats you.' },
    ],
    sources: ['Iliad XI', 'Linear B commodity records for wine, cheese and barley'],
  },

  // ── Canaan: two more ──────────────────────────────────────────────────
  {
    slug: 'marzeah-roast-mutton',
    title: 'Mutton for the Marzeaḥ',
    ancient: 'MRZḤ',
    translit: 'marziḥu',
    language: 'Ugaritic',
    region: 'levant',
    category: 'Roasts & Hearth',
    siglum: 'Ugaritic ritual texts · Hazor faunal remains',
    provenance: 'Ugarit and Hazor · Late Bronze Age Levant',
    period: 'Late Bronze Age',
    date: 'c. 1300 BC',
    serves: 'Serves 6',
    time: '3 hr',
    grade: 'reconstructed',
    summary:
      'The roast at the centre of a Canaanite drinking society — a feast you know the social shape of in detail and the cooking of not at all.',
    intro:
      'Membership roll, patron deity, leased houses and vineyards, a room kept for the banquets: the marzeaḥ was a drinking association with property. The Ugaritic texts lay it out as an institution — who belonged, what it owned, what it cost — and never once as a menu. The ground fills in a little. Temple precincts at Hazor and other Canaanite sites give up the burnt bones of cattle and sheep, and the pottery from them leans heavily toward bowls, chalices and goblets. So: the animal, the setting, the drinking vessels, the occasion. Nothing whatever about the seasoning. What follows is a Levantine roast built from that pantry and staged for the evening the texts describe.',
    sourceText: {
      kind: 'paraphrase',
      text: 'Ugaritic texts describe the marzeaḥ as a formal association with membership, property and a patron deity, meeting to feast and drink. Faunal remains from Canaanite temple precincts show slaughtered cattle and sheep, and the pottery is heavily weighted toward bowls, chalices and goblets.',
      attribution: 'Ugaritic ritual and legal texts, with the archaeology of Canaanite feasting',
    },
    ingredientGroups: [
      {
        name: 'The roast',
        items: [
          { ancient: 'ṣʾn', modern: 'Mutton or lamb shoulder, on the bone', qty: '2 kg', grade: 'attested' },
          { ancient: 'šmn', modern: 'Olive oil', qty: '6 tbsp', grade: 'attested' },
          { ancient: 'mlḥ', modern: 'Coarse salt', qty: '3 tbsp', grade: 'attested' },
          { ancient: 'ḥṭʾ', modern: 'Cumin seed, crushed', qty: '1 tbsp', grade: 'attested' },
          { ancient: 'kmn', modern: 'Coriander seed, crushed', qty: '1 tbsp', grade: 'attested' },
          { ancient: 'šḥlt', modern: 'Garlic, crushed', qty: '1 head', grade: 'attested' },
          { ancient: 'rmn', modern: 'Pomegranate, seeds and juice', qty: '2', grade: 'attested' },
          { ancient: 'yn', modern: 'Wine', qty: '300 ml', grade: 'attested' },
          { ancient: 'zt', modern: 'Green olives, cracked', qty: '150 g', grade: 'attested' },
        ],
      },
    ],
    directionGroups: [
      {
        name: 'The roast',
        steps: [
          { text: 'Crush the salt, cumin, coriander and garlic together to a paste with half the oil and rub it hard into the meat. Leave it an hour.', grade: 'reconstructed' },
          { text: 'Sear the shoulder on all sides in a heavy pot in the remaining oil.', grade: 'reconstructed' },
          { text: 'Pour in the wine and the juice of one pomegranate, cover, and cook at 150°C for two and a half hours until the meat gives at the bone.', grade: 'reconstructed' },
          { text: 'Take the lid off, add the olives, and give it twenty minutes to colour and for the liquid to fall to a glaze.', grade: 'inferred' },
          { text: 'Scatter the seeds of the second pomegranate over at the table, raw. Serve it with wine and let people tear at it — which, the texts are clear, is the entire point.', grade: 'inferred' },
        ],
      },
    ],
    apparatus: [
      {
        term: 'What the evidence actually is',
        text: 'Social, not culinary. You know the marzeaḥ existed, who joined it, what it owned and that it centred on drinking and eating meat together — I know because I was in one. You know from the bones which animals were killed and from the pottery how much of the assemblage was for drinking. Everything on the ingredient list beyond the meat, the oil and the salt is a Levantine pantry choice rather than an attested one — which is why this is a reconstruction and says so.',
      },
    ],
    substitutions: [
      { from: 'Pomegranate', to: 'A splash of wine vinegar and a handful of raisins', text: 'You want sour and sweet together against the fat.' },
    ],
    sources: ['Ugaritic ritual and legal texts', 'Published faunal and ceramic studies of Late Bronze Age Canaanite feasting'],
  },

]

export const recipeBySlug = Object.fromEntries(recipes.map((r) => [r.slug, r]))
export const featuredRecipes = recipes.filter((r) => r.featured)

export function recipesByCategory() {
  const map = {}
  for (const recipe of recipes) {
    ;(map[recipe.category] ||= []).push(recipe)
  }
  for (const list of Object.values(map)) list.sort((a, b) => a.title.localeCompare(b.title))
  return map
}
