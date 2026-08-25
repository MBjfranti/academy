// What a cook actually needs: how the dish should taste, how to steer it if it
// doesn't, what it gives you to eat, and what completes the plate.
// Keyed by recipe slug.

// The name you'd actually say out loud, and how to say the old one.
export const names = {
  'roast-goose-with-figs': { common: 'Roast Goose with Figs', say: 'SEH-men' },
  'shelled-beans-deir-el-medina': { common: 'Tomb-Builders’ Beans', say: 'ee-oo-REET' },
  'happena-meat-in-oil-and-honey': { common: 'Honeyed Lamb Casserole', say: 'HAP-pen-ah' },
  'kariya-grilled-liver-and-heart': { common: 'Hittite Offal Skewers', say: 'KAR-ee-yah' },
  'beruwa-chickpea-and-cucumber': { common: 'Hittite Chickpea Mash', say: 'beh-ROO-wah' },
  'skewers-on-the-firedog': { common: 'Bronze Age Souvlaki', say: 'OB-el-oss' },
  'kykeon-barley-and-cheese': { common: 'Nestor’s Restorative Cup', say: 'koo-KAY-own' },
  'marzeah-roast-mutton': { common: 'Feast Mutton with Pomegranate', say: 'mar-ZEE-akh' },
  'roast-barley-pilaf-ybc25': { common: 'Toasted Barley & Rocket', say: 'shay-SAH-ah' },
  'kid-stew-with-soured-milk': { common: 'Kid in Blood & Yoghurt', say: 'may oo-NEE-kee' },
  'desert-truffles-mari': { common: 'Zimri-Lim’s Spring Truffles', say: 'kam-AH-too' },
  'kanasu-broth-me-kanasi': { common: 'Kanašu Pulse Pot', say: 'may kah-NAH-shee' },
  'francolin-broth-me-tarri': { common: 'Babylonian Game Bird Broth', say: 'may TAR-ree' },
  'beet-greens-silqu': { common: 'Beetroot Tops in Broth', say: 'SIL-koo' },
  'lamb-and-beet-stew-tuhu': { common: 'Babylonian Beet Lamb', say: 'TOO-khoo' },
  'unwinding-broth-pasrutum': { common: 'Unwinding Barley Pottage', say: 'pash-ROO-tum' },
  'elamite-broth-me-elamutim': { common: 'Dill & Soured Milk Broth', say: 'may el-a-MOO-tim' },
  'pigeon-in-broth-amursanu': { common: 'Babylonian Pigeon Pot Pie', say: 'ah-moor-SAH-noo' },
  'date-and-sesame-confection-mersu': { common: 'Babylonian Date Truffles', say: 'MER-soo' },
  'emmer-loaves-in-conical-moulds': { common: 'Flowerpot Emmer Loaves', say: 'BED-ja' },
  'tiger-nut-and-honey-cones': { common: 'Egyptian Honey Tiger-Nut Cones', say: 'wah' },
  'split-and-salted-nile-fish': { common: 'Nile Salt Fish', say: 'REM' },
  'emmer-beer-heneqet': { common: 'Tomb-Builders’ Beer', say: 'HEN-eh-ket' },
  'neck-of-mutton-with-leeks-hattusa': { common: 'Hittite Leek and Mutton Pot', say: 'HAT-too-sha' },
  'seared-cheese-on-the-copper-pan': { common: 'Alašiyan Seared Cheese', say: 'ha-LEB' },
  'brazier-chickpeas-alashiya': { common: 'Ship’s Brazier Chickpeas', say: 'ah-LASH-ee-ya' },
  'emmer-porridge-with-curds-delta': { common: 'Delta Emmer Porridge', say: 'KEH-met' },
  'roast-duck-for-the-gods-table': { common: 'Temple Roast Duck', say: 'men-NEF-er' },
  'caravan-pot-with-dried-curd': { common: 'Caravan Road Pot', say: 'oo-ROO-doo' },
  'thick-loaf-for-the-hearth-harsi': { common: 'Hittite Hearth Loaf', say: 'HAR-shee' },
  'sheep-on-the-huprushi': { common: 'Hittite Ember-Roast Lamb', say: 'hoo-PROOSH-hee' },
  'kabri-palace-wine': { common: 'Canaanite Resin Wine', say: 'KAB-ree' },
  'lentils-with-oil-and-cumin-ugarit': { common: 'Ugarit Lentils', say: 'OO-ga-reet' },
  'fish-baked-on-fennel-amnisos': { common: 'Cretan Fennel Fish', say: 'ah-mee-NEE-so' },
  'kid-in-the-tripod-cauldron': { common: 'Mycenaean Fennel Kid', say: 'TEE-ree-po' },
  'barley-and-fig-feast-porridge': { common: 'Pylos Barley & Fig Bowl', say: 'pa-kee-YA-nay' },
  'egtved-grog': { common: 'Bog Myrtle Berry Grog', say: 'EGT-vedh' },
  'sorghum-flatbread-with-soured-milk': { common: 'Kerma Sour Flatbread', say: 'KER-ma' },
  'millet-porridge-with-hazelnut-and-pork-fat': { common: 'Urnfield Millet Bowl', say: 'OO-neh-titse' },
  'honeyed-pork-chops-with-dates': { common: 'Honey & Coriander Pork with Dates', say: '' },
  'leek-lentil-and-barley-pottage': { common: 'Aegean Pottage with Mint and Cheese', say: '' },
  'hot-pan-flatbread': { common: 'Hot-Pan Flatbread', say: '' },
}

export const kitchen = {
  'roast-goose-with-figs': {
    flavour:
      'Very rich. The figs are not a garnish: they cut the fat and soak up the rendered juices. The skin should shatter when you press a spoon to it.',
    steer: [
      'Greasy — not enough fat was poured off during the roast. Drain it every forty minutes.',
      'Dry breast — the heat was too high too early. Low and long, then a hard finish.',
    ],
    nutrition:
      'The fattiest dish here by a distance, and the jar of fat you pour off is worth more than the meat. High in iron and B12. A feast dish, and a feast is not a Tuesday.',
  },
  'shelled-beans-deir-el-medina': {
    flavour:
      'Plain, savoury and deeply satisfying, carried entirely by oil, garlic and cumin. Salt at the end, and be reckless with the raw oil over the top.',
    steer: [
      'Leathery — the beans were salted before they were tender. Salt at the end.',
      'Flat — more oil, more raw garlic. There is nothing else in it to hide behind.',
    ],
    nutrition:
      'Very high in fibre, folate and plant protein, and the cheapest filling meal on the site — which is exactly why it was issued to workmen by the jar.',
  },
  'happena-meat-in-oil-and-honey': {
    flavour:
      'Dark, savoury-sweet and faintly resinous. Cooked long and covered, the honey stops reading as sweetness and turns into depth.',
    steer: [
      'Cloying — too much honey, or the lid came off early and it reduced to syrup.',
      'Dry — the oil did not come far enough up the meat.',
    ],
    nutrition:
      'Rich, with a good deal of monounsaturated fat from the olive oil alongside the saturated fat of the lamb. High in iron, zinc and B12.',
  },
  'kariya-grilled-liver-and-heart': {
    flavour:
      'Mineral and iron-forward from the liver, dense and steak-like from the heart, with mint cutting across both. Fast, hot and direct — this is street food, and it should taste like it.',
    steer: [
      'Chalky — the liver went past pink. Three minutes a side, no more.',
      'Chewy heart — the white sinew at the top was left in. Cut it out.',
    ],
    nutrition:
      'Extraordinarily nutrient-dense: one portion of liver carries several weeks of vitamin A, plus very large amounts of iron, B12 and folate. Genuinely a once-a-week food rather than a habit.',
  },
  'beruwa-chickpea-and-cucumber': {
    flavour:
      'Warm, coarse and garlicky underneath, cold and crunchy on top. The temperature contrast is the dish, and it vanishes the moment you stir the cucumber in.',
    steer: [
      'Pasty — a food processor was used. Crush it coarsely by hand instead.',
      'Bland — salt it properly, and add the garlic raw at the end rather than during cooking.',
    ],
    nutrition:
      'High in fibre and plant protein, with most of the energy coming from the olive oil. The raw cucumber and onion put back the vitamin C the cooked pulse has lost.',
  },
  'skewers-on-the-firedog': {
    flavour:
      'Charred outside, pink inside, with fennel and coriander doing most of the work and sesame for texture at the end. Simple, and very good.',
    steer: [
      'Dry — the pieces were spaced along the skewer. Pack them close so they shield each other.',
      'Steamed rather than charred — the coals were not hot enough. Get them grey and fierce.',
    ],
    nutrition:
      'Straightforward protein, iron and zinc, with the olive oil supplying the fat. Lighter than any of the braised meat dishes here.',
  },
  'kykeon-barley-and-cheese': {
    flavour:
      'Genuinely strange the first time: sour, savoury, grainy and cold, closer to a thin salted porridge with wine in it than to anything now called a drink. Unmistakably restorative after hard work, which is the whole of its reputation.',
    steer: [
      'Lumpy — the cheese was grated too coarsely to disperse.',
      'Separated — it was left standing. Drink it while it is still moving.',
    ],
    nutrition:
      'Carbohydrate, salt, fat and protein together in a cold liquid, which is close to what a modern recovery drink is designed to be. The alcohol is the part that has not aged well.',
  },
  'marzeah-roast-mutton': {
    flavour:
      'Deep and fatty, cut hard by pomegranate and olive. The sourness at the end is what stops three hours of mutton becoming heavy going.',
    steer: [
      'Heavy — more pomegranate at the table, raw.',
      'Tough — it needed longer. Mutton shoulder gives at the bone or it is not done.',
    ],
    nutrition:
      'A feast dish, and it eats like one: high in iron, zinc and B12, and high in saturated fat. The pomegranate and olives bring plant compounds and very little else.',
  },
  'roast-barley-pilaf-ybc25': {
    flavour:
      'Nutty and bready from the toasting, peppery from the rocket, with raw garlic cutting across the top. Skip the toasting and it is just barley; do it, and the dish tastes deliberate.',
    steer: [
      'Bland — the barley was not toasted far enough. It should smell of bread before any liquid goes near it.',
      'Sludgy — too much water, or the rocket went in while the pot was still on the heat.',
    ],
    nutrition:
      'The most fibre of any single dish here, and a good deal of magnesium. Without the blood it is entirely plant-based; with it, it carries a substantial amount of iron in the form the body absorbs most easily.',
  },
  'kid-stew-with-soured-milk': {
    flavour:
      'Deep, gamey and tart at once. The blood gives body rather than a flavour of its own; the soured milk is what you actually taste against the meat. Rich, and not remotely subtle.',
    steer: [
      'Split and grainy — the pot was still boiling when the milk or the blood went in.',
      'Flat — the mutton was left out. Kid alone cannot carry a two-hour braise.',
    ],
    nutrition:
      'Very high in iron, zinc and B12 — the blood alone supplies several days of iron, in the form the body takes up most readily. Also the highest saturated fat on the site, so it belongs somewhere in a week rather than in a day.',
  },
  'desert-truffles-mari': {
    flavour:
      'Mild, meaty and faintly sweet, closer to a firm mushroom than to anything you would call truffled. The browning is where the flavour is, so give them colour and then leave them alone. Cumin and coriander are the only seasoning that will not bury them.',
    steer: [
      'Gritty — they were not cleaned hard enough, and nothing downstream fixes it.',
      'Watery and grey — they were stirred too soon and stewed instead of browning.',
    ],
    nutrition:
      'Very low in calories for the volume, with useful protein for a fungus and a good deal of potassium. The fat they are cooked in supplies most of the energy.',
  },
  'kanasu-broth-me-kanasi': {
    flavour:
      'Earthy and allium-forward from the pulse, with the mint cutting across it at the end. The raw garlic, coriander and mint stirred in off the heat are what lift it out of being plain boiled beans. Do not skip them, and do not cook them.',
    steer: [
      'Flat — the mint went in hot and cooked out. It belongs off the heat, raw, at the very end.',
      'Chalky — the pulse was not soaked long enough, or the pot was salted too early.',
    ],
    nutrition:
      'A pulse dish carrying a modest amount of meat, which is far closer to how this food was actually eaten than the banquet entries suggest. Very high in fibre and folate from the legume, with the lamb supplying iron, zinc and B12.',
  },
  'francolin-broth-me-tarri': {
    flavour:
      'Lighter than the lamb broths and noticeably sweeter, because game bird is. The milk and the malt cake — sprouted, dried barley pressed into a hulled cake — together give it a soft, faintly sweet body quite unlike anything else on the tablet, and ground coriander at the end is the finishing note.',
    steer: [
      'Stringy — the pot boiled instead of trembling. Lean birds do not forgive it, and neither does a pot with milk in it.',
      'Thin — the malt cake was skipped. It is what carries the body here.',
    ],
    nutrition:
      'Lean protein with very little saturated fat, which makes it the lightest meat dish on the site. Most of the mineral content comes from the alliums and from the bread you eat with it.',
  },
  'beet-greens-silqu': {
    flavour:
      'Earthy and sweet from the root, mineral and slightly bitter from the leaf, cut by sour yoghurt at the table. Those three together are the whole dish.',
    steer: [
      'Muddy — the yoghurt was stirred in instead of spooned over. Keep them separate.',
      'Sweet without an edge — more salt, and more raw garlic at the finish.',
    ],
    nutrition:
      'Very high in folate, potassium and vitamin K, and one of the few dishes here that is substantially a vegetable rather than a vehicle for grain or meat. The yoghurt adds the calcium the greens cannot.',
  },
  'lamb-and-beet-stew-tuhu': {
    flavour:
      'Deep, sweet-earthy and faintly sour, with the beer doing the work a stock would do now. The two doses of coriander are the whole trick: the ground seed goes in hot and turns nutty, the fresh leaf goes on at the table and stays green and citrus. If it tastes flat it needs salt and more raw allium, not more spice.',
    steer: [
      'Too sweet — more raw crushed garlic at the end, and a squeeze more sourness from the beer.',
      'Too thin — take the lid off for the last twenty minutes and let it fall.',
      'Too heavy — a bigger handful of fresh coriander and rocket over the top.',
    ],
    nutrition:
      'Protein- and fat-dense from the leg and tail fat, with a real load of fibre and nitrate from the beet. The beer contributes B vitamins and a little residual sugar. A complete main, once there is bread alongside.',
    serveWith: 'Barley flatbread, and something raw and sharp — more rocket, or thin-sliced onion in salt.',
  },

  'unwinding-broth-pasrutum': {
    flavour:
      'Green, savoury and faintly sour from the bread crumb. With no meat behind it the alliums carry everything, so soften them properly and be generous with the fat. The raw garlic and coriander at the end are the top note the whole bowl is built to hold up.',
    steer: [
      'Too bland — it was under-salted before the milk went in. Salt the broth, not the finished bowl.',
      'Split — the pot was still moving when the milk went in. Take it fully off the heat next time.',
      'Too sour — loosen with more broth rather than adding fat.',
    ],
    nutrition:
      'Light on fat for a lamb dish and high in protein, with live cultures from the soured milk if you add it off the heat and eat it soon. Easy on the stomach, which may be exactly what the name is about.',
    serveWith: 'Bread, and nothing else. This is a dish that wants to be the only thing on the table.',
  },

  'elamite-broth-me-elamutim': {
    flavour:
      'Overwhelmingly green, then unexpectedly rich. Two bunches of dill is not a misprint — the herb is the dish. The blood gives body without tasting of itself, and the soured milk is what you actually taste against it. Thick, tart, and much lighter on the palate than the ingredient list suggests.',
    steer: [
      'Not green enough — you were timid with the dill. Double it.',
      'Muddy — the dill went in too early and cooked out. It belongs in the last ten minutes.',
    ],
    nutrition:
      'Very high in vitamin K and folate from the sheer volume of dill, and exceptionally high in iron — blood is the most absorbable dietary iron there is. Calcium and live cultures from the soured milk. No meat in it, and lighter than it reads.',
    serveWith: 'Flatbread, and a bowl of the soured milk on the side for people to add more.',
  },

  'pigeon-in-broth-amursanu': {
    flavour:
      'Rich and concentrated. The broth is reduced hard before it goes back over the birds, so what sits under the crust is closer to a sauce than a soup. The crust takes on the fat and the steam and goes savoury and dense — more dumpling than bread.',
    steer: [
      'Dry inside — not enough reduced broth went in, or the seal leaked. Pinch the lid on properly.',
      'Pale crust — brush the top with fat before it goes in.',
      'Soggy crust base — the birds went in too wet. Drain them before they go into the lined pot.',
    ],
    nutrition:
      'Very rich. Squab — a young pigeon — is dark, iron-heavy meat, and the enclosing crust means none of the fat escapes. A small portion goes a long way, and it wants something sharp beside it.',
    serveWith: 'Something raw and acidic — cucumber in soured milk, or sharp leaves.',
  },

  'date-and-sesame-confection-mersu': {
    flavour:
      'Dense, fudgy and toasty rather than sugary. Toasting the flour is what stops it tasting like a raw date ball; it gives the whole thing a biscuity backbone. The salt is not optional — without it the dates flatten out.',
    steer: [
      'Cloying — more salt, and more toasted sesame on the outside.',
      'Too soft to shape — a little more toasted flour, or chill it before rolling.',
      'Grainy — the dates were too dry. Soak them in warm water first and drain them well.',
    ],
    nutrition:
      'Very energy-dense: sugar from the dates, fat from the butter and nuts, and a good deal of fibre, iron and magnesium alongside. Built for keeping and for carrying, which is almost certainly why it was issued to travelling officials.',
    serveWith: 'On its own, with something bitter to drink.',
  },

  'emmer-loaves-in-conical-moulds': {
    flavour:
      'Nutty, faintly sweet and considerably denser than modern bread. Emmer — the hulled wheat these kitchens milled — has a chestnut note modern wheat does not, and the hot-mould crust is thin, dark and blistered where the dough met the clay.',
    steer: [
      'Gummy crumb — underbaked. Emmer needs longer than the colour suggests.',
      'Stuck in the mould — the mould was not hot enough. This is the single most common failure.',
      'Bland — increase the salt and give it a longer, cooler rise.',
    ],
    nutrition:
      'Wholegrain and high in fibre, with more protein than modern white wheat, and it raises blood sugar more slowly than its lightness suggests. The long sourdough rise also breaks down phytate, the compound in whole grain that locks up iron and zinc, so more of both reaches you.',
    serveWith: 'Everything here. This is the plate, the spoon and the side dish.',
  },

  'tiger-nut-and-honey-cones': {
    flavour:
      'Sweet, milky and nutty, with a texture like coarse marzipan. Tiger nut has a coconut-and-almond character nothing else quite reproduces, which is why there is no substitute listed for it.',
    steer: [
      'Falling apart — grind finer, or add a spoonful more honey.',
      'Too sweet — more salt, and let them dry longer so the flavour concentrates.',
    ],
    nutrition:
      'Exceptionally high in fibre and in resistant starch — starch that passes through undigested and feeds your gut bacteria instead of you — plus useful fats, iron and magnesium. That is a large part of why tiger nuts stayed in Egyptian diets for millennia.',
    serveWith: 'Dates, and something bitter — beer, or strong tea if you are not being strict.',
  },

  'split-and-salted-nile-fish': {
    flavour:
      'Concentrated, savoury and firm — closer to a good anchovy than to fresh fish. The cure drives out water and leaves the oil behind, so what you taste is intensified fish plus whatever aromatics you packed it with. Grilling it over coals afterwards is what makes it worth eating.',
    steer: [
      'Too salty — soak it longer, in more changes of water.',
      'Soft or slippery — it needs more air and less humidity. A finished fillet should take no fingerprint.',
      'Off smell — throw it away. Salt fish either works or it does not.',
    ],
    nutrition:
      'Dense protein, high in omega-3 from the oily flesh, and very high in sodium by design. Calcium too, if you eat the small bones. This is the protein that built the tombs, and it kept without a cold chain.',
    serveWith: 'Bread, raw onion, and beer. This is workmen’s food and it does not want refinement.',
  },

  'emmer-beer-heneqet': {
    flavour:
      'Cloudy, tart, bready and low in alcohol, with a distinct sourness from the wild fermentation. Nothing like modern beer: no bitterness at all, because there are no hops. Closer to a sour grain drink than to anything on a bar.',
    steer: [
      'Too sour — ferment it cooler and drink it younger.',
      'Thin and weak — add the dates on day two, or use more malt.',
      'No fermentation — the honey or grain was pasteurised. Add a handful of raw crushed dates, or unwashed fruit skins.',
    ],
    nutrition:
      'Genuinely nutritious rather than merely alcoholic: B vitamins, amino acids, live cultures from the wild ferment, and real calories from unfiltered grain. Egyptian labour rations paired it with bread for good reason.',
    serveWith: 'Bread and salt fish. The three of them together are essentially the Egyptian working diet.',
  },

  'thick-loaf-for-the-hearth-harsi': {
    flavour:
      'Close, dense and mildly sour, with the barley bringing a malty sweetness emmer alone does not. Fat in the dough makes the crumb tender in a way a lean bread never is, and it keeps a day longer for the same reason.',
    steer: [
      'Too dense — the barley proportion is high by design, but you can push it towards emmer for more lift.',
      'Pale — bake it hotter and let it go properly dark. This bread should look serious.',
    ],
    nutrition:
      'Wholegrain, high fibre, and notably high in beta-glucan from the barley — the soluble fibre that slows sugar release. A more sustaining loaf than the Egyptian emmer bread, and a heavier one. The Hittites made better bread than they ever admitted in writing.',
    serveWith: 'Torn by hand into any of the stews. It is built for breaking, not for slicing.',
  },

  'sheep-on-the-huprushi': {
    flavour:
      'Smoky, sweet-savoury and lacquered, from repeated basting with honey and wine. The overnight salting is what makes it taste seasoned all the way through rather than only on the surface. Older meat carries this treatment far better than young lamb does.',
    steer: [
      'Burnt outside, raw inside — the fire still had flame in it. Wait for embers.',
      'Not lacquered — you did not baste often enough. Every turn, without exception.',
      'Tough — it needed longer and lower, or a younger animal.',
    ],
    nutrition:
      'High protein and high fat, with iron and zinc from the mutton. The honey glaze adds little nutritionally and a great deal of flavour. Serve it with grain and something green.',
    serveWith: 'Thick barley bread and a sharp raw allium salad.',
  },

  'kabri-palace-wine': {
    flavour:
      'Resinous, honeyed and faintly medicinal, with pine at the front, juniper arriving late, and honey holding the middle together. Recognisably the ancestor of retsina, and a good deal stranger. It needs two weeks to stop tasting like wine with a problem.',
    steer: [
      'Gritty — the resin went into cold wine. It must go into warm honey first.',
      'Harsh — give it another week. Time is doing most of the work here.',
      'Too sweet — use less honey next time. The resin needs some, but not that much.',
    ],
    nutrition:
      'A drink, not a food. The resins were almost certainly doing preservative work as well as flavouring — mastic in particular has genuine antimicrobial properties, which is likely why every jar in that cellar had some in it.',
    serveWith: 'Roast meat and salty cheese. It cuts fat better than modern wine does.',
  },

  'lentils-with-oil-and-cumin-ugarit': {
    flavour:
      'Deeply savoury and earthy, and it lives or dies on two things: how far you take the onions, and how much raw oil goes in at the end. Twenty minutes of slow onion is the difference between a pleasant lentil pot and one people remember.',
    steer: [
      'Flat — the onions were rushed. There is no shortcut for this.',
      'Dull — beat in more raw oil off the heat, and toast the cumin harder.',
      'Sludgy — more water, and salt only at the end.',
    ],
    nutrition:
      'Lentils and barley bread cover each other’s weak amino acids, so between them you get a complete protein. Very high in fibre, folate, iron and potassium. This is what the Bronze Age actually ate most days, and it is better than the banquets.',
    serveWith: 'Barley bread, and olives if you have them.',
  },

  'fish-baked-on-fennel-amnisos': {
    flavour:
      'Clean and green rather than rich. The fennel does two things at once — the bulb underneath goes sweet and silky and catches at the edges, while the raw fronds in the belly stay sharp and anise-bright and perfume the flesh from the inside. The wine keeps the bed from frying. Olives and a hard pour of oil at the table are what stop it being polite.',
    steer: [
      'Dry — you cooked it too long, or the fish was too small for the time. Go by the shoulder lifting off the bone, never by the clock.',
      'Flat — under-salted, and the herb stuffing was not worked hard enough with salt before it went in.',
      'Watery — too much wine, or the fennel was sliced too thin and collapsed. Thick slices, in one layer.',
      'Bland skin — you did not salt the outside. The skin is a separate seasoning job from the stuffing.',
    ],
    nutrition:
      'About as lean as a cooked dinner gets: high-quality protein, a useful hit of the long-chain omega-3s that almost nothing else on this site provides, and iodine and selenium from the fish. The fat is nearly all olive oil. Fennel adds potassium and fibre. It wants bread alongside to become a full meal.',
    serveWith: 'Barley bread to mop the dish, and more olives.',
  },

  'neck-of-mutton-with-leeks-hattusa': {
    flavour:
      'Deep and sweet rather than sharp — an allium dish more than a meat one. Two hours of onion and leek collapse into something almost jammy, the barley thickens it to the point where a spoon stands up in it, and the late leeks sit on top still tasting green. The honey is not detectable as honey; take it out and the pot goes flat, which is the whole Hittite argument in one spoonful.',
    steer: [
      'Thin — the barley went in too late, or there was too much water. Cook it down uncovered; it thickens fast at the end.',
      'Harsh and oniony — the onions were rushed. They need fifteen slow minutes before anything else joins them.',
      'Sweet — you used more than a spoon of honey. It is a rounding agent, not a flavour.',
      'Tough meat — it is not done. Neck goes through a stubborn phase and comes out the other side; give it another half hour.',
    ],
    nutrition:
      'Substantial: a full meal in one pot, with the barley and the meat between them covering protein and slow carbohydrate. Fattier than most things on this site, because neck and tail fat are the point — skim it if that bothers you, though the broth is poorer for it. Leeks and onions bring a serious amount of fibre and potassium.',
    serveWith: 'Hittite hearth loaf, and nothing else.',
  },

  'seared-cheese-on-the-copper-pan': {
    flavour:
      'Salt, char and bitterness, and almost nothing else — which is why it works. The crust on the cheese is the whole dish: savoury, faintly sweet where the milk sugars caught, and squeaking against the teeth. The greens underneath are deliberately bitter and deliberately underdressed, because they are there to cut fifteen minutes of fried cheese and nothing more.',
    steer: [
      'Cheese went pale and rubbery — the pan was not hot enough, or you moved it. Too hot, and left alone.',
      'It stuck and tore — you oiled the pan. Do not; the cheese has fat enough and the oil comes after.',
      'Watery — the cheese was wet going in, or the greens went in too early. Dry the cheese properly on a cloth.',
      'Bland — salt at the end, not the start, and use greens with some actual bitterness in them.',
    ],
    nutrition:
      'Very high in protein and calcium and unapologetically salty and fatty — this is bar food from a working port and it tastes like it. The greens bring iron, folate and fibre, and they are doing real nutritional work rather than sitting there as a garnish. One of the few dishes here you would eat as a portion of something rather than as a meal.',
    serveWith: 'Flatbread, olives, and something to drink.',
  },

  'brazier-chickpeas-alashiya': {
    flavour:
      'Warm chickpeas against cold curd is the whole idea, and it is a better idea than it sounds — the heat slackens the cheese where they touch and you get a third texture between the two. Coriander seed carries it, olives salt it, and the hard pour of oil at the end is doing the job a sauce would do in a kitchen with more than one pot.',
    steer: [
      'Dull — under-salted, and salt only goes in once the chickpeas are soft.',
      'Dry — you poured off too much of the cooking water. Keep a cupful and put it back.',
      'All one texture — you crushed everything. Half whole, half crushed, always.',
      'Bread going soggy — assemble at the last second, not in advance.',
    ],
    nutrition:
      'Very good protein for a meatless dish, and the pulse and the bread cover each other’s weak amino acids between them. High in fibre and folate. The fat is olive oil and cheese; it is the cheese that decides how rich this ends up.',
    serveWith: 'More bread, and olives.',
  },

  'emmer-porridge-with-curds-delta': {
    flavour:
      'Nutty and savoury, much closer to a grain risotto than to anything sweet. Toasting the grain first is what makes it taste of something; skip it and you get wallpaper paste. The curd cools it, the green onion cuts it, and two torn dates do more than a spoonful of honey would.',
    steer: [
      'Bland — you did not toast the grain, or did not salt it twice.',
      'Stiff and gluey — it thickens hard as it stands. Loosen it with hot water and serve it looser than looks right.',
      'Sweet — too many dates. They are punctuation, not a flavour.',
    ],
    nutrition:
      'Slow-releasing wholegrain carbohydrate with a serious amount of fibre, plus calcium and protein from the dairy. About as sustaining a breakfast as exists on this site, and the cheapest thing in the collection by a wide margin.',
    serveWith: 'Nothing. This is the whole meal.',
  },

  'roast-duck-for-the-gods-table': {
    flavour:
      'Dark, sticky, faintly winey skin over meat that has had an hour and a quarter to give up its fat. The dates in the cavity go jammy and salty and are the best thing on the plate. It is a sweet-savoury bird and it stays the right side of the line because the salt goes on hard at the start.',
    steer: [
      'Flabby skin — the oven never went up at the end, or the bird was not dry before it went in.',
      'Burnt glaze — the honey went on too early. It gets ten minutes at a time, no more.',
      'Greasy — you left the fat in the tin. Pour it off twice and keep it; it is worth more than the bird.',
      'Dry breast — over an hour and a half at temperature. Go by a thigh joint moving freely.',
    ],
    nutrition:
      'Rich, and unapologetically. Duck is a fatty bird and the glaze adds sugar. Very high in iron and B vitamins. This is a feast dish and it is priced accordingly in every sense.',
    serveWith: 'Flatbread, greens, and the rendered fat for the next thing you cook.',
  },

  'caravan-pot-with-dried-curd': {
    flavour:
      'Sour, savoury and surprisingly deep for something made entirely out of dry goods. The rehydrated curd is the whole trick — it arrives like a cross between yoghurt and parmesan and gives the pot a tang and a body that nothing else in the bag could. The dried fruit stops the sourness running away with it.',
    steer: [
      'Split and grainy — the curd went in over heat. Off the flame, always.',
      'Flat — more salt and more cumin. Dry-goods cooking needs seasoning with a heavier hand.',
      'Too sour — hold back a third of the curd, and add another piece of dried fruit.',
      'Claggy — it sets as it cools. Serve it straight away or loosen it with hot water.',
    ],
    nutrition:
      'Wholegrain and dairy together: complete protein, high fibre, high calcium, and enough salt to matter after a day of walking, which is what it was for. Nothing fresh in it and nutritionally none the worse.',
    serveWith: 'Flatbread if you have it, and nothing if you do not.',
  },

  'kid-in-the-tripod-cauldron': {
    flavour:
      'Aromatic and slightly sweet, dominated by fennel in two forms — the bulb going soft and mild, the seed staying sharp. The honey is there to round the wine, not to sweeten the dish. Sheep cheese grated over at the end brings salt and funk the pot cannot make on its own.',
    steer: [
      'Sharp and thin — the wine was not reduced far enough before the liquid went in.',
      'Muted — more fennel seed, and add the celery leaf late rather than early.',
      'Greasy — skim it before the mint goes on.',
    ],
    nutrition:
      'Kid is very lean, so this is a high-protein and comparatively low-fat braise. Fennel and celery add potassium and fibre; the cheese brings the calcium. It wants a starch alongside to be a full meal.',
    serveWith: 'Barley porridge, or bread and olives.',
  },

  'barley-and-fig-feast-porridge': {
    flavour:
      'Savoury-sweet rather than a pudding, and much better for the barley being toasted first. The figs collapse and sweeten the whole pot; the oil beaten in at the end keeps it from cloying. Sesame on top is the textural point.',
    steer: [
      'Bland — you skipped the toasting, or under-salted.',
      'Too sweet — more salt and more oil, not less honey.',
      'Stodgy — loosen it with hot water. It thickens hard as it stands.',
    ],
    nutrition:
      'High in soluble fibre from the barley, and in potassium, calcium and iron from the figs. Slow-releasing and very sustaining — a sensible thing to put in front of a large number of people who have work to do.',
    serveWith: 'Roast meat, or on its own as a first course.',
  },

  'egtved-grog': {
    flavour:
      'Tart, cloudy and resinous, with cranberry sharpness up front and a bitter herbal finish from the bog myrtle. Sweeter than beer, drier than mead, and genuinely unlike either. Go lighter on the myrtle than you think you should — it is assertive.',
    steer: [
      'Harshly bitter — too much bog myrtle. Ten grams, not fifteen.',
      'No fermentation — the honey was pasteurised. Use raw honey.',
      'Too sweet — let it run longer. It is not finished until the activity properly slows.',
    ],
    nutrition:
      'Low in alcohol and high in vitamin C and plant polyphenols from the berries, with live cultures from the wild ferment. Bog myrtle is a genuine preservative as well as a bittering agent.',
    serveWith: 'Smoked or salted meat, and hazelnuts.',
    caution: 'Bog myrtle should be avoided in pregnancy.',
  },

  'sorghum-flatbread-with-soured-milk': {
    flavour:
      'Sour, spongy and faintly nutty, with a crumb full of small holes from the long ferment. The soured milk and hot butter poured over are not accompaniments — they are what turns a plain flatbread into the dish.',
    steer: [
      'No holes — the batter was too thick, or under-fermented. Thinner, and another day.',
      'Too sour — shorten the ferment, or keep it cooler.',
      'Tearing — the griddle was not hot enough.',
    ],
    nutrition:
      'Sorghum is naturally gluten-free, high in fibre and rich in antioxidants, and the long ferment makes its iron and zinc far more available. The soured milk alongside fills in the amino acids the grain is short of.',
    serveWith: 'Anything braised, or simply the milk and butter as written.',
  },

  'millet-porridge-with-hazelnut-and-pork-fat': {
    flavour:
      'Mild, creamy and faintly popcorn-like from the toasted grain, then transformed by the hot pork fat and hazelnuts poured over. Without that final pour it is plain; with it, it is very good. The grated apple is there for acid.',
    steer: [
      'Bland — you did not toast the millet, or you skipped the fat.',
      'Claggy — more milk. Millet stiffens hard as it cools.',
      'Flat — more salt and more apple.',
    ],
    nutrition:
      'Millet is gluten-free and high in magnesium and phosphorus. With the dairy and the nuts this is a well-balanced bowl: protein, fat and slow carbohydrate together.',
    serveWith: 'On its own, hot, as it was almost certainly eaten.',
  },

  'honeyed-pork-chops-with-dates': {
    flavour:
      'Sweet, savoury and aromatic, with cracked coriander seed giving little bursts of citrus and earth against the fat. The dates are not a garnish: they melt into the pan and turn the fat into a syrup. Salt is what stops the whole thing tipping into dessert, so be firmer with it than feels comfortable.',
    steer: [
      'Bitter or acrid — the honey hit a live pan. Off the heat first, every time.',
      'Cloying — more salt, and crack the coriander coarser so it cuts through.',
      'Pale, grey crust — the chop was wet, or the pan was not hot enough. Dry it and wait.',
    ],
    nutrition:
      'High protein and high fat from a bone-in chop, with fast sugar and a real hit of potassium, magnesium and fibre from the dates. Rich enough that it wants a grain and something sharp alongside rather than more fat.',
    serveWith: 'Hot-pan flatbread and the leek, lentil and barley pottage. That is a full Bronze Age table.',
  },

  'leek-lentil-and-barley-pottage': {
    flavour:
      'Deep, sweet and savoury from the slow leeks, with coriander seed running underneath the whole bowl. It should be thick enough that a spoon stands up in it slowly. The mint and the brined cheese at the end are the entire top register: without them it is worthy and dull, with them it is a real dish.',
    steer: [
      'Chalky grain in soft pulse — the barley and lentils went in together. Stagger them.',
      'Flat — the leeks were rushed, or you salted too early. Both are fixable next time; for now, salt harder and add more raw oil.',
      'Stodgy the next day — it sets solid. Loosen it with broth, not water.',
    ],
    nutrition:
      'The best-balanced bowl on the site. Barley and lentils cover each other’s weak amino acids, and the pot carries very high soluble fibre, folate, iron, potassium and beta-glucan. The cheese adds calcium and the salt that makes the rest of it legible.',
    serveWith: 'Flatbread, and it is a meal on its own. Alongside a chop it feeds four comfortably.',
  },

  'hot-pan-flatbread': {
    flavour:
      'Nutty, faintly sweet, with charred blisters that taste of the pan. Wholemeal gives it more chew and more flavour than white flour ever will. A finished flatbread should be soft and foldable, not crisp — crisp means it was rolled too thick or cooked too slow.',
    steer: [
      'No puff — the pan was not hot enough, or the dough was rolled too thick.',
      'Leathery — overcooked. A minute a side is genuinely all it takes.',
      'Cracking as you roll — the dough needed a longer rest, or a splash more water.',
    ],
    nutrition:
      'Wholegrain, high fibre, and about as simple as food gets. No fat unless you add it, which means it does the job of the plate without competing with what is on it.',
    serveWith: 'Everything. This is the spoon, the plate and the side dish.',
  },
}
