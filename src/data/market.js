// The shopping list. You are standing in an ordinary supermarket and you want
// to buy only what the Bronze Age eastern Mediterranean actually had.
//
// verdict: 'yes'     — buy it, it belongs
//          'careful' — real, but with a catch worth knowing
//          'no'      — leave it, and here is why
//
// Everything marked 'yes' is something a normal large grocery store stocks.
// Nothing here needs a specialist supplier.

export const AISLES = [
  {
    key: 'produce',
    label: 'Produce',
    blurb: 'More traps in here than in the rest of the shop put together. Half of what looks ancient sailed over from the Americas three thousand years too late.',
  },
  {
    key: 'drygoods',
    label: 'Dry goods',
    blurb: 'Grain and pulses are the floor everything else stands on. Every ration list that survives from this world is mostly barley. So is most of your basket.',
  },
  {
    key: 'meat',
    label: 'Meat & fish',
    blurb: 'Sheep and goat by default, and less of it than you are used to. The awkward gaps are all in the poultry section.',
  },
  { key: 'dairy', label: 'Dairy', blurb: 'Sheep and goat first, cow a distant second, and sour is the point rather than the problem.' },
  {
    key: 'fats',
    label: 'Oil, fat & sweet',
    blurb: 'A short list of oils, and no sugar anywhere in it. Sweetness comes from fruit and from bees.',
  },
  {
    key: 'seasoning',
    label: 'Herbs, spice & salt',
    blurb: 'A short list that works harder than it looks. Most of the rest of the spice rack is medieval or later.',
  },
  { key: 'drinks', label: 'Drinks', blurb: 'Wine and beer, both with conditions attached.' },
]

export const items = [
  // ─────────────────────────── PRODUCE ───────────────────────────
  { name: 'Onions', aisle: 'produce', verdict: 'yes', note: 'Brown, white or red, whichever is cheapest. The Babylonians put onions in very nearly everything, and the pots here are built the same way: onions down first, cooked slowly until they go soft and sweet.', alias: 'onion' },
  { name: 'Garlic', aisle: 'produce', verdict: 'yes', note: 'It does two jobs. Cooked into the pot from the start it goes mild and round; crushed raw over the finished dish it bites. Plenty of these recipes want both.' },
  { name: 'Leeks', aisle: 'produce', verdict: 'yes', note: 'More important than onions in Mesopotamian cooking, which is saying something. Use the green tops as well as the white — this food wastes very little.', alias: 'leek' },
  { name: 'Shallots', aisle: 'produce', verdict: 'yes', note: 'The closest easy match for the Persian shallot named in the Babylonian recipe tablets. Buy them small and firm.' },
  { name: 'Spring onions', aisle: 'produce', verdict: 'yes', note: 'Your stand-in for kurrat: a thin Egyptian and Levantine leek grown for its leaves rather than its stem. Use the green as well as the white.', alias: 'scallion green onion' },
  { name: 'Beetroot', aisle: 'produce', verdict: 'yes', note: 'The root at the centre of the oldest written stew recipe there is. Buy it raw and whole — the vacuum-packed and pickled kinds bring vinegar you did not ask for.', alias: 'beet beets', cultures: ['babylonian'] },
  { name: 'Chard', aisle: 'produce', verdict: 'yes', note: 'The same plant as beetroot, bred for the leaf instead of the root. Both were eaten. Give the stalks a few minutes in the pot before the leaves go in.', alias: 'swiss chard silverbeet' },
  { name: 'Turnips', aisle: 'produce', verdict: 'yes', note: 'Old, plain and entirely legitimate. It wants long slow cooking in a pot rather than a quick boil; rushed, it stays woody and sullen.', alias: 'turnip' },
  { name: 'Radishes', aisle: 'produce', verdict: 'yes', note: 'An Egyptian field crop. Raw, with salt, is the whole of the preparation.', alias: 'radish', cultures: ['egyptian'] },
  { name: 'Cos lettuce', aisle: 'produce', verdict: 'yes', note: 'Painted on Egyptian walls, tall and narrow and unmistakable. Buy the romaine type, not the soft round ones.', alias: 'romaine lettuce', cultures: ['egyptian'] },
  { name: 'Cucumber', aisle: 'produce', verdict: 'yes', note: 'Grown across Egypt and the Near East. Its best use here is raw, sliced thin into soured milk, which is a dish that has needed no improvement since.', cultures: ['egyptian', 'canaanite'] },
  { name: 'Celery', aisle: 'produce', verdict: 'yes', note: 'Named on the Mycenaean palace lists, which are inventories rather than menus — it was there, but nobody wrote down what they did with it. Keep the leaves; they carry more flavour than the stalks.', cultures: ['aegean'] },
  { name: 'Fennel', aisle: 'produce', verdict: 'yes', note: 'Bulb and seed, both useful. The Greek word for fennel is what gave Marathon its name, which tells you how much of it grew there.', cultures: ['aegean'] },
  { name: 'Rocket', aisle: 'produce', verdict: 'yes', note: 'It goes into the Babylonian beet stew by the handful. Peppery raw, and the bite fades as it cooks.', alias: 'arugula', cultures: ['babylonian'] },
  { name: 'Watercress', aisle: 'produce', verdict: 'yes', note: 'Peppery, though it is no relation to any pepper plant. Use it raw and at the end — heat takes the bite straight out of it.', alias: 'cress' },
  { name: 'Broad beans', aisle: 'produce', verdict: 'yes', note: 'Fresh or frozen, both fine. One of the oldest cultivated pulses in the region. Pod them, and slip the grey skins off the big ones if you want them tender.', alias: 'fava beans' },
  { name: 'Peas', aisle: 'produce', verdict: 'yes', note: 'Fresh or frozen. Ancient right across the region, and the frozen ones are no betrayal.' },
  { name: 'Figs', aisle: 'produce', verdict: 'yes', note: 'Fresh or dried. Dried is the form that travelled in sacks and jars, and the form you will mostly use.', cultures: ['aegean', 'canaanite', 'hittite', 'egyptian'] },
  { name: 'Dates', aisle: 'produce', verdict: 'yes', note: 'Medjool or deglet, whichever your shop has. Sweetener, snack and thickener at once — mash a few into a pot and it tightens as they dissolve.', cultures: ['babylonian', 'egyptian', 'canaanite'] },
  { name: 'Grapes', aisle: 'produce', verdict: 'yes', note: 'Grapes and raisins both. Raisins are the more useful form once you start cooking, and hard unripe grapes are one of the few genuinely sour things in this pantry.', alias: 'raisins sultanas' },
  { name: 'Pomegranate', aisle: 'produce', verdict: 'yes', note: 'Levantine and Anatolian. The seeds go wherever a modern recipe would squeeze a lemon, and the juice does the same job with less picking.', cultures: ['canaanite', 'hittite', 'egyptian'] },
  { name: 'Apples', aisle: 'produce', verdict: 'yes', note: 'Buy small and sharp rather than big and sweet. Modern dessert apples have been bred a long way towards sugar.', alias: 'apple' },
  { name: 'Pears', aisle: 'produce', verdict: 'yes', note: 'Firm and less sweet is closer to the old ones. A pear hard enough that it needs cooking is exactly right.', alias: 'pear' },
  { name: 'Quince', aisle: 'produce', verdict: 'yes', note: 'If your shop has it, take it. Raw it is inedible; cooked long and slow with honey it turns rose-coloured and is superb.', cultures: ['aegean', 'hittite'] },
  { name: 'Plums', aisle: 'produce', verdict: 'yes', note: 'Fresh, or dried as prunes. Prunes are the form that keeps, and the form worth cooking with.', alias: 'plum prunes' },
  { name: 'Melon', aisle: 'produce', verdict: 'yes', note: 'Egyptian. Watermelon counts too — it is native to Africa and genuinely ancient, whatever it looks like sitting next to the rest of your basket.', alias: 'watermelon cantaloupe', cultures: ['egyptian'] },
  { name: 'Olives', aisle: 'produce', verdict: 'yes', note: 'Whole, in brine or in oil. Not stuffed with a pepper, which is American and a long way from the point.', alias: 'olive', cultures: ['aegean', 'canaanite', 'hittite'] },
  { name: 'Almonds', aisle: 'produce', verdict: 'yes', note: 'Recovered from the hold of a Bronze Age shipwreck, which is about as direct as evidence gets. Buy them plain and unsalted.', alias: 'almond', cultures: ['canaanite', 'aegean', 'egyptian'] },
  { name: 'Pistachios', aisle: 'produce', verdict: 'yes', note: 'Levantine and Anatolian. Plain and unsalted, and unroasted if the shop runs to it.', alias: 'pistachio', cultures: ['canaanite', 'babylonian'] },
  { name: 'Walnuts', aisle: 'produce', verdict: 'yes', note: 'Anatolian and Levantine. Crush them coarsely under the flat of a pan rather than chopping them; the ragged edges hold on to sauce.', alias: 'walnut' },
  { name: 'Hazelnuts', aisle: 'produce', verdict: 'yes', note: 'Native to Anatolia and the Black Sea coast and abundant there, so the Hittites had them in quantity. Toast them dry and rub the skins off in a tea towel.', alias: 'hazelnut cobnut', cultures: ['hittite'] },
  { name: 'Pine nuts', aisle: 'produce', verdict: 'yes', note: 'Traded by the shipload, and expensive then as now. Toast them in a dry pan and do not leave the room: they go from pale to burnt in about a minute.', alias: 'pine nut pignoli', cultures: ['canaanite', 'aegean'], tier: 'elite' },
  { name: 'Carrots', aisle: 'produce', verdict: 'careful', note: 'Wild carrot existed — thin, pale, and nowhere near sweet. The fat orange root in the shop is a much later breeding project. Use it sparingly, or not at all.', alias: 'carrot' },
  { name: 'Cabbage & kale', aisle: 'produce', verdict: 'careful', note: 'Wild brassicas were eaten. The tight cabbage head is a later development, so loose leafy kale is the safer of the two buys.', alias: 'cabbage kale brassica' },
  { name: 'Cranberries', aisle: 'produce', verdict: 'careful', note: 'The small European bog cranberry turns up in a genuine Bronze Age drink. The fat American cranberry on your shelf is a different plant doing an impression of it. Use it if you like, but call it a substitute.', alias: 'cranberry lingonberry' },
  { name: 'Tomatoes', aisle: 'produce', verdict: 'no', note: 'American. No tomato reaches Europe or the Near East until the 1500s AD, which is a very long time after the last of these kitchens went cold.', alias: 'tomato passata', instead: 'Onion cooked down slowly until it goes sweet and jammy, with honey and wine for depth. Then sumac or pomegranate for the sharpness a tomato would have brought.' },
  { name: 'Potatoes', aisle: 'produce', verdict: 'no', note: 'American, and it reaches this side of the world thousands of years later.', alias: 'potato', instead: 'Turnip for the body, barley for the thickening.' },
  { name: 'Peppers & chilli', aisle: 'produce', verdict: 'no', note: 'American, every one of them — bell, chilli, paprika, cayenne. There is no chilli heat anywhere in this food, and no amount of wanting it will put it there.', alias: 'pepper bell chili chilli capsicum paprika', instead: 'Nothing here is hot. Mustard seed, cress or rocket for the bite.' },
  { name: 'Courgette & squash', aisle: 'produce', verdict: 'no', note: 'American. So are pumpkins.', alias: 'zucchini courgette squash pumpkin marrow', instead: 'Cucumber if you want it raw, broad beans if you want it in the pot.' },
  { name: 'Green beans', aisle: 'produce', verdict: 'no', note: 'American. Broad beans and peas are the green pods you are allowed.', alias: 'green bean runner french bean', instead: 'Broad beans, or peas.' },
  { name: 'Sweetcorn', aisle: 'produce', verdict: 'no', note: 'American.', alias: 'corn maize sweetcorn', instead: 'Barley, or millet for a smaller grain.' },
  { name: 'Lemons & limes', aisle: 'produce', verdict: 'no', note: 'No citrus of any kind — not lemon, lime, orange or anything else in the family. Sourness here comes from soured milk, pomegranate, sumac, unripe grapes or wine, and it is a rounder sourness than lemon gives.', alias: 'lemon lime orange citrus', instead: 'Sumac, pomegranate molasses, soured milk, or a splash of wine.' },
  { name: 'Aubergine', aisle: 'produce', verdict: 'no', note: 'Indian, and it does not reach the Mediterranean until the medieval period.', alias: 'eggplant aubergine', instead: 'Turnip in a stew; cucumber if you want it raw.' },
  { name: 'Spinach', aisle: 'produce', verdict: 'no', note: 'Persian, and it arrives long after any of this.', instead: 'Chard, rocket or watercress.' },
  { name: 'Avocado', aisle: 'produce', verdict: 'no', note: 'American.', instead: 'Nothing stands in for it. Leave it out.' },
  { name: 'Broccoli & cauliflower', aisle: 'produce', verdict: 'no', note: 'Both are late-bred brassicas, coaxed out of a wild plant long after this. Neither existed.', alias: 'broccoli cauliflower', instead: 'Kale or chard.' },
  { name: 'Asparagus & artichoke', aisle: 'produce', verdict: 'no', note: 'Both come into cultivation later, in the classical world.', alias: 'asparagus artichoke', instead: 'Leeks, cooked long and slow.' },
  { name: 'Bananas & mango', aisle: 'produce', verdict: 'no', note: 'None of these grew anywhere near this sea, and none of them are anywhere near this early.', alias: 'banana mango pineapple papaya kiwi', instead: 'Dates, figs or melon.' },

  // ────────────────────────── DRY GOODS ──────────────────────────
   { name: 'Flatbread', aisle: 'drygoods', verdict: 'yes', note: 'Five recipes here assume a flatbread and none of them make you buy one — but you can, and a plain shop-bought flatbread or pita is a perfectly honest stand-in. The hot-pan flatbread on the Recipes page takes twenty minutes and is better, and that is the only argument for making it.', alias: 'flatbread pita bread' },
 { name: 'Pearl barley', aisle: 'drygoods', verdict: 'yes', note: 'Barley has spent three thousand years being treated as wheat’s unfortunate cousin. This is slander. It is the staple grain of this entire world, it is cheap, every shop has it, and it is the single most important thing in your basket.', alias: 'barley pot barley' },
  { name: 'Wholemeal wheat flour', aisle: 'drygoods', verdict: 'yes', note: 'Your stand-in for emmer — a hulled wheat, meaning the grain clings to its husk and has to be pounded free, and the wheat these kitchens actually milled. Modern wholemeal is lighter than the real thing, and a completely legitimate swap.', alias: 'whole wheat flour wholewheat atta' },
  { name: 'Spelt flour', aisle: 'drygoods', verdict: 'yes', note: 'Closer to emmer than modern bread wheat is, if your shop carries it. Useful, not essential.', alias: 'spelt', cultures: ['egyptian', 'hittite'] },
  { name: 'Farro', aisle: 'drygoods', verdict: 'yes', note: 'Often emmer itself, sold under an Italian name. Buy it when you see it.', alias: 'emmer farro', cultures: ['egyptian', 'hittite'] },
  { name: 'Bulgur', aisle: 'drygoods', verdict: 'yes', note: 'Wheat parboiled, dried and cracked. Old, plausible, and it cooks in a fraction of the time whole grain needs.', alias: 'bulgur burghul cracked wheat' },
  { name: 'Brown & green lentils', aisle: 'drygoods', verdict: 'yes', note: 'The other half of the foundation, with barley. They hold their shape where red lentils collapse.', alias: 'lentils lentil puy' },
  { name: 'Red lentils', aisle: 'drygoods', verdict: 'yes', note: 'The same lentil, split and skinned. They collapse into the liquid, which is sometimes exactly what you want and sometimes a disaster.', alias: 'red lentil split' },
  { name: 'Chickpeas', aisle: 'drygoods', verdict: 'yes', note: 'Dried or tinned, no shame in either. Ancient across the Levant and Anatolia.', alias: 'chickpea garbanzo' },
  { name: 'Dried broad beans', aisle: 'drygoods', verdict: 'yes', note: 'Sold as fava. One of the founding crops of the whole region, and they want a long soak before they want a pot.', alias: 'fava dried broad bean' },
  { name: 'Dried peas', aisle: 'drygoods', verdict: 'yes', note: 'Split or whole. Straightforward pottage material: pulses cooked down until they thicken into their own liquid.', alias: 'split pea' },
  { name: 'Millet', aisle: 'drygoods', verdict: 'careful', note: 'It crosses Asia and reaches Europe around 1500 BC, so it exists. But it is a northern grain rather than one of these five kitchens, and you should use it knowing that.', cultures: [] },
  { name: 'Sorghum', aisle: 'drygoods', verdict: 'careful', note: 'Right for Nubia, upriver and south of Egypt. Not a grain of the five kitchens here, so use it knowing what you are doing.', cultures: [] },
  { name: 'Sesame seeds', aisle: 'drygoods', verdict: 'yes', note: 'A Mesopotamian staple, grown mainly for its oil. Toast the seeds in a dry pan first: they go pale gold and start hopping about, and that is the moment to stop.', alias: 'sesame' },
  { name: 'Linseed', aisle: 'drygoods', verdict: 'yes', note: 'Egyptian, grown for oil and for the fibre that became linen. Both mattered; the oil is the part that concerns you.', alias: 'flaxseed flax' },
  { name: 'Rice', aisle: 'drygoods', verdict: 'no', note: 'Not west of the Indus at this date. Barley does every job you would give rice.', instead: 'Pearl barley, or bulgur when you want it quicker.' },
  { name: 'Pasta & couscous', aisle: 'drygoods', verdict: 'no', note: 'Both are far later. Dried durum pasta is medieval, and couscous likewise.', alias: 'pasta spaghetti couscous noodles', instead: 'Barley or bulgur.' },
  { name: 'Tinned beans', aisle: 'drygoods', verdict: 'no', note: 'Kidney, black, pinto, cannellini, borlotti, haricot: every one of them American. This is the easiest mistake in the whole shop, and the tins you can use are sitting on the same shelf.', alias: 'kidney black bean pinto cannellini borlotti haricot navy baked beans', instead: 'Chickpeas, lentils or dried broad beans.' },
  { name: 'Quinoa & amaranth', aisle: 'drygoods', verdict: 'no', note: 'South American, both.', alias: 'quinoa amaranth', instead: 'Barley or millet.' },
  { name: 'Oats & rye', aisle: 'drygoods', verdict: 'no', note: 'At this date both are weeds growing in somebody else’s wheat field, not crops in their own right. Domestication comes later.', alias: 'oats oatmeal rye', instead: 'Barley.' },
  { name: 'Buckwheat', aisle: 'drygoods', verdict: 'no', note: 'Arrives in Europe much later.', instead: 'Millet or barley.' },
  { name: 'Peanuts', aisle: 'drygoods', verdict: 'no', note: 'American.', alias: 'peanut groundnut', instead: 'Almonds, pistachios or walnuts.' },
  { name: 'Cornflour', aisle: 'drygoods', verdict: 'no', note: 'American, and in any case this cuisine has no thickening starch at all. Things here get thick by being cooked down.', alias: 'cornstarch cornflour', instead: 'Reduce the pot uncovered, or stir in a handful of red lentils and let them collapse into it.' },
  { name: 'Baking powder & soda', aisle: 'drygoods', verdict: 'no', note: 'Nineteenth-century chemistry. Bread in this world is either flat, or raised by a live culture kept back from the day before.', alias: 'baking powder soda bicarbonate', instead: 'Make it flat, or keep a sourdough starter.' },

  // ─────────────────────────── MEAT ───────────────────────────
  { name: 'Lamb', aisle: 'meat', verdict: 'yes', note: 'The default meat of the whole region. Buy shoulder or leg and stew it — both carry the fat and connective tissue a long pot needs, where a lean cut only goes grey.' },
  { name: 'Mutton or hogget', aisle: 'meat', verdict: 'yes', note: 'Older sheep, and closer to the real thing than young spring lamb. Ask at the butcher counter; the chiller cabinet will not have it.', alias: 'mutton hogget' },
  { name: 'Goat', aisle: 'meat', verdict: 'yes', note: 'The everyday animal in the Aegean. Leaner and stronger-tasting than lamb, which means it wants longer and wetter cooking. Worth asking for.', alias: 'goat kid', cultures: ['aegean', 'hittite', 'canaanite'] },
  { name: 'Pork', aisle: 'meat', verdict: 'yes', note: 'Eaten across Anatolia, the Levant and Europe. Chops and shoulder both work well.', cultures: ['hittite', 'canaanite', 'aegean'] },
  { name: 'Beef', aisle: 'meat', verdict: 'yes', note: 'Real, and expensive enough that a single ox turns up in palace records by name. Feast food rather than weeknight food, and worth cooking as though it were.', tier: 'elite' },
  { name: 'Duck & goose', aisle: 'meat', verdict: 'yes', note: 'The Egyptian birds. Tomb walls show geese being force-fed by hand to fatten them, so the practice is a good deal older than the modern argument about it.', alias: 'duck goose', cultures: ['egyptian'] },
  { name: 'Quail & pigeon', aisle: 'meat', verdict: 'yes', note: 'The birds of the Babylonian recipe tablets. Quail is the one an ordinary shop is likeliest to have; pigeon usually means a butcher.', alias: 'quail pigeon squab', cultures: ['babylonian', 'egyptian'] },
  { name: 'Offal', aisle: 'meat', verdict: 'yes', note: 'Liver, kidney, tongue, trotters. Nobody in this world threw a scrap of it away, and the butcher will still sell it to you for almost nothing.', alias: 'liver kidney tongue trotter tripe offal', tier: 'commoner' },
  { name: 'Bones for broth', aisle: 'meat', verdict: 'yes', note: 'Lamb or beef, and ask for them sawn across. Broth sits underneath half the pot cooking here, and it costs next to nothing to make.', alias: 'bones broth stock marrow', tier: 'commoner' },
  { name: 'Sea bass & bream', aisle: 'meat', verdict: 'yes', note: 'Mediterranean coastal fish. Grill them whole over fierce heat with the skin scored, and let the skin blister.', alias: 'bass bream fish', cultures: ['aegean', 'canaanite'] },
  { name: 'Grey mullet', aisle: 'meat', verdict: 'yes', note: 'The Nile fish, and a coastal one too. Salting and drying it is the form that actually travelled, if you want to go that far.', alias: 'mullet', cultures: ['egyptian', 'canaanite'] },
  { name: 'Mackerel & sardines', aisle: 'meat', verdict: 'yes', note: 'Oily, cheap, and exactly the kind of fish that was salted into jars and traded the length of the sea.', alias: 'mackerel sardine anchovy', cultures: ['aegean', 'canaanite', 'egyptian'] },
  { name: 'Tilapia', aisle: 'meat', verdict: 'yes', note: 'The Nile fish, still farmed and sold everywhere.', cultures: ['egyptian'] },
  { name: 'Mussels & clams', aisle: 'meat', verdict: 'yes', note: 'Coastal shellfish, eaten all along the shore. The rubbish heaps of these settlements are packed with the shells, which is the least ambiguous evidence archaeology ever hands anybody.', alias: 'mussels clams oysters cockles shellfish', cultures: ['aegean', 'canaanite'] },
  { name: 'Bacon & cured pork', aisle: 'meat', verdict: 'careful', note: 'Salting pork is entirely period. Modern bacon is also smoked, cured with nitrites and sweetened with sugar, and none of that is. Unsmoked salt pork is the closer buy.', alias: 'bacon ham pancetta' },
  { name: 'Chicken', aisle: 'meat', verdict: 'no', note: 'Jungle fowl were about as an exotic curiosity, but a chicken is not a food animal in this world. This is the swap people get wrong more often than any other.', alias: 'chicken poultry', instead: 'Quail, duck or pigeon.' },
  { name: 'Turkey', aisle: 'meat', verdict: 'no', note: 'American.', instead: 'Duck or goose.' },
  { name: 'Prawns & shrimp', aisle: 'meat', verdict: 'careful', note: 'Coastal people ate what they caught, and that will have included these. The record barely shows them, though. Not a mistake; not a highlight either.', alias: 'prawn shrimp' },

  // ─────────────────────────── DAIRY ───────────────────────────
  { name: 'Sheep or goat yoghurt', aisle: 'dairy', verdict: 'yes', note: 'The most useful thing in the dairy aisle. It is your acid, your sauce and your finishing spoonful all at once.', alias: 'yoghurt yogurt sheep goat' },
  { name: 'Plain full-fat yoghurt', aisle: 'dairy', verdict: 'yes', note: 'Cow yoghurt works. Buy the highest fat you can find, because it splits far less when it meets a hot pot — and stir it in off the heat anyway.', alias: 'yoghurt yogurt natural plain' },
  { name: 'Feta', aisle: 'dairy', verdict: 'yes', note: 'The name is modern; the food is not. Brined sheep cheese belongs here completely. Read the label and buy sheep, not cow.', alias: 'feta brined cheese', cultures: ['aegean', 'canaanite'] },
  { name: 'Pecorino & hard sheep cheese', aisle: 'dairy', verdict: 'yes', note: 'Hard sheep cheese was counted as palace treasure in the Aegean. Grate it over grain and pulses at the table rather than cooking it in.', alias: 'pecorino hard cheese sheep', cultures: ['aegean', 'hittite'] },
  { name: 'Ricotta & curd cheese', aisle: 'dairy', verdict: 'yes', note: 'Fresh unaged curd — about as old as dairying gets, and the easiest cheese there is to make by accident.', alias: 'ricotta curd cottage cheese quark' },
  { name: 'Butter', aisle: 'dairy', verdict: 'yes', note: 'Widely used, especially in Anatolia and the north. Buy it unsalted, so the salting stays your decision.', cultures: ['hittite', 'babylonian'] },
  { name: 'Ghee', aisle: 'dairy', verdict: 'yes', note: 'Butter with the milk solids cooked out. It keeps without a fridge, which is exactly why they made it.', alias: 'ghee clarified butter', cultures: ['hittite', 'babylonian'] },
  { name: 'Milk', aisle: 'dairy', verdict: 'yes', note: 'Sheep and goat first, cow after. Most of it was soured before anyone drank it — partly on purpose, and partly because in that heat it soured whether you meant it to or not.' },
  { name: 'Eggs', aisle: 'dairy', verdict: 'careful', note: 'Duck and goose eggs, yes. Hen eggs run straight into the chicken problem, so treat eggs here as an absence rather than a staple.', alias: 'egg eggs yolk yolks white whites' },
  { name: 'Cheddar, gouda & aged cow cheese', aisle: 'dairy', verdict: 'no', note: 'Later European techniques applied to a later European animal. The sheep cheeses a shelf over are what you actually want.', alias: 'cheddar gouda parmesan brie camembert', instead: 'Feta, halloumi or hard sheep cheese.' },
  { name: 'Blue cheese', aisle: 'dairy', verdict: 'no', note: 'A deliberate mould culture, and a much later one.', alias: 'blue stilton roquefort gorgonzola', instead: 'Brined sheep cheese.' },

  // ──────────────────── OIL, FAT & SWEET ────────────────────
  { name: 'Olive oil', aisle: 'fats', verdict: 'yes', note: 'The Aegean and Levantine fat. The Mycenaeans shipped it everywhere in jars, and then shipped some more. Buy unfiltered or extra virgin, and pour it over the finished food raw as well as cooking in it.', cultures: ['aegean', 'canaanite', 'hittite', 'egyptian'] },
  { name: 'Sesame oil', aisle: 'fats', verdict: 'yes', note: 'The Mesopotamian oil. Buy the pale untoasted kind for cooking — the dark East Asian sort is a finishing oil and will take over anything you put it in.', cultures: ['babylonian'] },
  { name: 'Lamb or beef dripping', aisle: 'fats', verdict: 'yes', note: 'Sheep-tail fat is the real thing here. Supermarket dripping is beef, so the closer route is cheap lamb breast, rendered down yourself over a low heat. It needs no attention while it does it.', alias: 'dripping tallow suet lamb fat', cultures: ['babylonian', 'hittite'] },
  { name: 'Lard', aisle: 'fats', verdict: 'yes', note: 'The northern and central European fat. Perfectly legal there.', alias: 'lard pork fat', cultures: ['hittite', 'canaanite'] },
  { name: 'Linseed oil', aisle: 'fats', verdict: 'careful', note: 'Egyptian, genuinely. Buy food-grade cold-pressed and read the bottle twice — the linseed oil in a hardware shop is for wood and is not food.', alias: 'flaxseed oil linseed', cultures: ['egyptian'] },
  { name: 'Honey', aisle: 'fats', verdict: 'yes', note: 'The main sweetener everywhere. Buy raw if you plan to ferment anything with it.' },
  { name: 'Date syrup', aisle: 'fats', verdict: 'yes', note: 'Sold as silan or date molasses. The Mesopotamian sweetener, and it brings acid and body as well as sweetness.', alias: 'silan date molasses', cultures: ['babylonian', 'egyptian'] },
  { name: 'Grape molasses', aisle: 'fats', verdict: 'yes', note: 'Grape must — the unfermented juice, straight off the press — boiled down to a syrup. Turkish shops sell it as pekmez, and some supermarkets carry it.', alias: 'pekmez vincotto grape must saba', cultures: ['aegean', 'hittite', 'canaanite'] },
  { name: 'Carob syrup', aisle: 'fats', verdict: 'yes', note: 'Levantine and old. Worth having if you come across it, though nothing here depends on it.', alias: 'carob', cultures: ['canaanite'] },
  { name: 'Sugar', aisle: 'fats', verdict: 'no', note: 'Cane and beet sugar are both far later. Honey, dates and reduced grape juice do all of it, and each brings flavour along with the sweetness.', alias: 'sugar caster granulated brown sugar', instead: 'Honey, date syrup, or grape molasses.' },
  { name: 'Sunflower & vegetable oil', aisle: 'fats', verdict: 'no', note: 'Sunflower is American; rapeseed, corn, peanut and soy oils are all modern industry.', alias: 'sunflower vegetable canola rapeseed corn oil', instead: 'Olive oil — or sesame oil if you are cooking Babylonian.' },
  { name: 'Coconut oil', aisle: 'fats', verdict: 'no', note: 'A tropical oil that never came near this sea.', alias: 'coconut', instead: 'Olive oil, butter or lamb fat.' },
  { name: 'Maple syrup & agave', aisle: 'fats', verdict: 'no', note: 'Both American.', alias: 'maple agave', instead: 'Honey or date syrup.' },

  // ──────────────────── HERBS, SPICE & SALT ────────────────────
  { name: 'Sea salt', aisle: 'seasoning', verdict: 'yes', note: 'Traded, taxed and fought over, and it turns up on the ration tablets as an issued commodity. Buy it coarse, and season harder than feels comfortable.', alias: 'salt' },
  { name: 'Cumin seed', aisle: 'seasoning', verdict: 'yes', note: 'Named on tablets from Babylon to Pylos. Buy it whole rather than ground and toast it in the hot fat before anything else goes in, until the smell comes up at you.', alias: 'cumin' },
  { name: 'Coriander seed', aisle: 'seasoning', verdict: 'yes', note: 'The workhorse spice of the era, and easy to overdo — one test pot here called for considerably more coriander than good judgment did, and good judgment won. Crack the seeds in a mortar rather than grinding them to dust, so you still meet them in the dish.', alias: 'coriander seed' },
  { name: 'Fresh coriander', aisle: 'seasoning', verdict: 'yes', note: 'The leaf, and it does a different job from the seed. Scatter it on raw at the very end.', alias: 'cilantro coriander leaf' },
  { name: 'Dill', aisle: 'seasoning', verdict: 'yes', note: 'Used in enormous quantity. A whole dish can be built on it, so buy more than one bunch.', cultures: ['babylonian'] },
  { name: 'Mint', aisle: 'seasoning', verdict: 'yes', note: 'Named on the Mycenaean tablets. It belongs at the table rather than in the pot, where long heat flattens it to nothing.', cultures: ['aegean', 'babylonian'] },
  { name: 'Thyme & oregano', aisle: 'seasoning', verdict: 'yes', note: 'Mediterranean hillside herbs. Dried is fine, and for these two often better than fresh.', alias: 'thyme oregano marjoram savory' },
  { name: 'Bay leaves', aisle: 'seasoning', verdict: 'yes', note: 'Native and ancient across the region. Two leaves in a pot of pulses, in from the start.', alias: 'bay laurel' },
  { name: 'Sage', aisle: 'seasoning', verdict: 'yes', note: 'Mediterranean and old. Strong enough that a couple of leaves is usually the whole of it.' },
  { name: 'Fenugreek', aisle: 'seasoning', verdict: 'yes', note: 'Egyptian. Seed or leaf, both bitter and savoury. A little goes a long way, and too much turns the whole pot soapy.', cultures: ['egyptian'] },
  { name: 'Nigella seed', aisle: 'seasoning', verdict: 'yes', note: 'Sold as black cumin or kalonji, though it is neither cumin nor pepper. Recovered from a Bronze Age shipwreck cargo.', alias: 'nigella black cumin kalonji', cultures: ['egyptian', 'canaanite'] },
  { name: 'Sumac', aisle: 'seasoning', verdict: 'yes', note: 'Also on that shipwreck. Dried crushed berries, sharp and faintly fruity, and the best lemon substitute a supermarket sells.', cultures: ['canaanite', 'hittite'] },
  { name: 'Juniper berries', aisle: 'seasoning', verdict: 'yes', note: 'Found in a Canaanite palace wine cellar. Crush them lightly before use, with pork or in a drink.', alias: 'juniper', cultures: ['canaanite', 'hittite'] },
  { name: 'Mustard seed', aisle: 'seasoning', verdict: 'yes', note: 'The seed is old across the region. The yellow paste in a jar is very much later.', alias: 'mustard' },
  { name: 'Saffron', aisle: 'seasoning', verdict: 'yes', note: 'Painted across the walls of Bronze Age Thera, being gathered. Expensive then, expensive now; a pinch is a portion.', cultures: ['aegean'], tier: 'elite' },
  { name: 'Poppy seed', aisle: 'seasoning', verdict: 'yes', note: 'Ancient in the eastern Mediterranean.', alias: 'poppy', cultures: ['aegean', 'hittite'] },
  { name: 'Cinnamon', aisle: 'seasoning', verdict: 'careful', note: 'Possibly detected in a Canaanite wine jar. If that holds, it means trade across an astonishing distance — and it is genuinely unresolved, argued over ever since. Use it knowing that, or not at all.', alias: 'cinnamon cassia', cultures: ['canaanite'], tier: 'elite' },
  { name: 'Black pepper', aisle: 'seasoning', verdict: 'careful', note: 'Peppercorns were reportedly found in the mummy of Ramesses II, and nobody has fully explained how. As a cooking spice here it is still an anachronism. Reach for cress or mustard seed instead.', alias: 'pepper peppercorn black pepper' },
  { name: 'Chilli, paprika & cayenne', aisle: 'seasoning', verdict: 'no', note: 'All American. There is no chilli heat anywhere in this cuisine.', alias: 'chilli chili paprika cayenne pepper flakes', instead: 'Nothing here is hot. Mustard seed or cress for bite.' },
  { name: 'Ginger', aisle: 'seasoning', verdict: 'no', note: 'East and South Asian, and it does not reach this region in time.', instead: 'Cumin and coriander seed do the warming work.' },
  { name: 'Cloves & nutmeg', aisle: 'seasoning', verdict: 'no', note: 'Indonesian, and thousands of miles and thousands of years away.', alias: 'clove nutmeg mace', instead: 'Coriander seed, nigella or juniper.' },
  { name: 'Vanilla & allspice', aisle: 'seasoning', verdict: 'no', note: 'Both American.', alias: 'vanilla allspice', instead: 'Honey and dates carry it.' },
  { name: 'Stock cubes', aisle: 'seasoning', verdict: 'no', note: 'Simmer bones instead. It costs next to nothing, and the broth is doing real work in these dishes rather than sitting in the background.', alias: 'stock cube bouillon', instead: 'Lamb or beef bones, simmered an hour.' },

  // ─────────────────────────── DRINKS ───────────────────────────
  { name: 'Red or white wine', aisle: 'drinks', verdict: 'yes', note: 'Buy it dry, light and unoaked. Oak barrels are a later idea, and the taste of them is wrong here.', alias: 'wine red white', cultures: ['aegean', 'canaanite', 'hittite'] },
  { name: 'Retsina', aisle: 'drinks', verdict: 'yes', note: 'Wine flavoured with pine resin, and the closest thing on a shop shelf to what was actually drunk. An acquired taste, acquired quickly.', cultures: ['aegean', 'canaanite'] },
  { name: 'Cloudy wheat beer', aisle: 'drinks', verdict: 'careful', note: 'Beer is a staple food here rather than a treat, and the Egyptians made much better beer than the Hittites did. Every modern beer is hopped and hops are medieval, so pick the cloudiest, least bitter thing on the shelf.', alias: 'beer wheat beer witbier', cultures: ['babylonian', 'egyptian', 'hittite'] },
  { name: 'Hoppy beer', aisle: 'drinks', verdict: 'no', note: 'IPA and anything bitter. Hops are a medieval addition, thousands of years after this.', alias: 'ipa pale ale lager hops', instead: 'Cloudy wheat beer, or retsina for the flavour of the period.' },
  { name: 'Spirits', aisle: 'drinks', verdict: 'no', note: 'Distillation for drink is far later. Nothing here is stronger than beer or wine.', alias: 'spirits vodka gin whisky brandy', instead: 'Wine or beer.' },
  { name: 'Coffee & tea', aisle: 'drinks', verdict: 'no', note: 'Neither exists in this world.', alias: 'coffee tea', instead: 'Water, soured milk thinned with water, or beer.' },
  { name: 'Fruit juice & soft drinks', aisle: 'drinks', verdict: 'no', note: 'Fresh juice would have been a rarity, and anything fizzy or citrus is out entirely.', alias: 'juice soda cola lemonade', instead: 'Water, wine cut with water, or soured milk.' },
  // ── added after the kitchen review: all ordinary supermarket stock ──
  { name: 'Vine leaves', aisle: 'produce', verdict: 'yes', note: 'In jars or brine. Rinse the brine off before you use them. Cooking food wrapped in leaves is about as old as cooking.', alias: 'vine leaf grape leaves dolma' },
  { name: 'Rosemary', aisle: 'seasoning', verdict: 'yes', note: 'Native Mediterranean scrub, growing wild all over the region then as now. Use the sprig whole and pull it out later.' },
  { name: 'Pomegranate molasses', aisle: 'fats', verdict: 'yes', note: 'The best acid a modern shop sells for this food. Check the label: reduced pomegranate juice and nothing else, no sugar or concentrate. Use it wherever you would want a lemon.', alias: 'pomegranate molasses syrup dibs rumman', cultures: ['canaanite', 'hittite'] },
  { name: 'Tahini', aisle: 'fats', verdict: 'yes', note: 'Ground sesame seed. Sesame was a Mesopotamian oil crop, so the paste is a fair extension rather than an attested food — a modern convenience standing on old ground.', alias: 'tahini sesame paste', cultures: ['babylonian', 'canaanite'] },
  { name: 'Halloumi', aisle: 'dairy', verdict: 'yes', note: 'Cypriot, brined, unripened, made from sheep and goat milk. Exactly the kind of cheese this world made.', alias: 'halloumi', cultures: ['canaanite', 'aegean'] },
  { name: 'Labneh', aisle: 'dairy', verdict: 'yes', note: 'Yoghurt strained until it is thick enough to hold a spoon upright. If your shop sells it, it saves you a day of straining your own.', alias: 'labneh strained yoghurt' },
  { name: 'Barley flour', aisle: 'drygoods', verdict: 'yes', note: 'The commoner’s loaf. Denser and sweeter than wheat, and it will not rise like wheat because it has almost no gluten. Closer to what most people actually ate.', alias: 'barley flour', tier: 'commoner' },
  { name: 'Freekeh', aisle: 'drygoods', verdict: 'yes', note: 'Wheat picked green and roasted while still damp, which leaves it smoky. An old Levantine way of rescuing a harvest caught by rain.', alias: 'freekeh frikeh green wheat' },
  { name: 'Salted anchovies', aisle: 'meat', verdict: 'yes', note: 'Salted fish was traded the length of the Mediterranean, and anchovies packed in salt are the closest thing on a modern shelf. Rinse them before use.', alias: 'anchovy anchovies salted fish' },
  { name: 'Vinegar', aisle: 'seasoning', verdict: 'careful', note: 'Wine and beer going sour is ancient and inevitable. A bottle of distilled white vinegar is not. Use a splash of ordinary wine vinegar if you must, and prefer soured milk or pomegranate.', alias: 'vinegar wine vinegar', instead: 'Soured milk, pomegranate molasses, sumac, or a splash of wine.' },
  { name: 'Mastic', aisle: 'seasoning', verdict: 'careful', note: 'Resin from the mastic tree, the same family as the terebinth resin shipped by the tonne in the Bronze Age. Greek and Middle Eastern shops carry it; not every supermarket does.', alias: 'mastic mastiha terebinth resin', cultures: ['canaanite', 'aegean'] },
  { name: 'Goose or duck fat', aisle: 'fats', verdict: 'yes', note: 'Egypt fattened ducks and geese deliberately and painted the process on tomb walls. Sold in jars almost everywhere, and it keeps for months.', alias: 'goose fat duck fat', cultures: ['egyptian'] },
  // ── added after the recipe expansion ──────────────────────────────────
  // Each of these is called for by a shipped recipe and returned nothing when searched.
  {
    name: 'Kurrat',
    aisle: 'produce',
    verdict: 'careful',
    note: 'The Egyptian leek, grown for its leaf rather than its stem, and named in the Babylonian recipes. A Middle Eastern grocer may have it. Otherwise the green tops of ordinary leeks do the same job and nobody will know.',
    instead: 'The dark green tops of young leeks, or garlic chives',
    alias: 'kurrat egyptian leek leek tops garlic chives',
    cultures: ['babylonian', 'egyptian'],
  },
  {
    name: 'Desert truffles',
    aisle: 'produce',
    verdict: 'careful',
    note: 'Kamʾatu: gathered off the Syrian steppe after the spring rains and sent up to the palace at Mari. Sold fresh in the region in spring, occasionally frozen elsewhere. Nothing at all like a European truffle — mild, meaty, closer to a firm mushroom.',
    instead: 'Chestnut and king oyster mushrooms, which are firm and mild. Not a European truffle, whose whole character is an aroma these do not have.',
    alias: 'desert truffle kamaa terfezia truffle mushroom',
    cultures: ['babylonian', 'canaanite'],
    tier: 'elite',
  },
  {
    name: 'Blood',
    aisle: 'meat',
    verdict: 'careful',
    note: 'Named outright in several Babylonian recipes, where it binds and thickens a broth. A butcher will order it; a supermarket will not stock it loose. Black pudding is blood, fat and grain already set, and crumbles into a pot off the heat.',
    instead: 'Black pudding, crumbled in off the heat — it brings its own oats and fat, so use a little less liquid',
    alias: 'blood black pudding boudin morcilla',
    cultures: ['babylonian', 'hittite'],
  },
  {
    name: 'Guinea fowl & poussin',
    aisle: 'meat',
    verdict: 'yes',
    note: 'Stand-ins for the tarru, read as francolin: a partridge-sized game bird still found across the region. Poussin matches it for size and cooking time, guinea fowl for flavour.',
    alias: 'guinea fowl poussin francolin partridge game bird spatchcock',
    cultures: ['babylonian', 'hittite', 'aegean'],
  },
  {
    name: 'Sheep-tail fat',
    aisle: 'fats',
    verdict: 'careful',
    note: 'The signature cooking fat of the Mesopotamian tablets, from the fat-tailed sheep of the region. A halal butcher will have it; nowhere else will. It renders clean and carries flavour in a way no vegetable oil manages.',
    instead: 'Lamb fat trimmed from a shoulder, or ghee',
    alias: 'sheep tail fat lipu tail fat lamb fat suet rendered fat',
    cultures: ['babylonian', 'hittite'],
  },
  {
    name: 'Moringa oil',
    aisle: 'fats',
    verdict: 'careful',
    note: 'Ben oil, pressed from moringa seed, and one of the everyday Egyptian oils. Sold now almost entirely for cosmetics, so buy a food-grade bottle or do not buy it.',
    instead: 'Sesame oil, which is equally attested and far easier to find',
    alias: 'moringa ben oil bak',
    cultures: ['egyptian'],
  },
  {
    name: 'Malted barley',
    aisle: 'drygoods',
    verdict: 'yes',
    note: 'Grain sprouted and then dried, which turns its starch sweet. The Babylonian bird broth thickens with a hulled cake of it, and Egyptian beer is built on it. Homebrew suppliers sell it by the kilo, and some health shops sell it as malt extract.',
    alias: 'malt malted barley bappiru malt extract brewing grain',
    cultures: ['babylonian', 'egyptian', 'hittite'],
  },
  {
    name: 'Sourdough starter',
    aisle: 'drygoods',
    verdict: 'yes',
    note: 'The only leavening in this entire pantry. Commercial yeast did not exist; a live culture kept back from the previous day’s dough did. Dried starter is sold in most supermarkets now, or beg a spoonful from anyone who bakes.',
    alias: 'sourdough starter levain leaven culture bappiru mother',
    cultures: ['egyptian', 'hittite', 'canaanite'],
  },
  {
    name: 'Semolina',
    aisle: 'drygoods',
    verdict: 'careful',
    note: 'Coarse durum flour. It stands in for samidu, an ingredient in the Babylonian tablets that nobody has identified — so this is a declared guess and not a match. Durum itself is plausible for the period; that samidu meant durum is not.',
    instead: 'Leave it out. The dishes that call for it work without it.',
    alias: 'semolina samidu durum coarse flour',
    cultures: ['babylonian'],
  },
  {
    name: 'Cyperus & galingale',
    aisle: 'seasoning',
    verdict: 'careful',
    note: 'A sedge root, named in the Kabri wine residues and in Mycenaean perfume records. Genuinely hard to buy. Galangal is sold as a substitute and is a different plant from a different continent — a stand-in, not an equivalent.',
    instead: 'A small piece of dried galangal, or omit it entirely',
    alias: 'cyperus galingale galangal sedge nutgrass tiger nut sedge',
    cultures: ['canaanite', 'aegean', 'egyptian'],
    tier: 'elite',
  },
  {
    name: 'Storax & aromatic resins',
    aisle: 'seasoning',
    verdict: 'careful',
    note: 'Storax, terebinth and cedar turn up in the Kabri wine jars, so Canaanites really did put resin in their wine. IMPORTANT: most resin and cedar oil sold today is for perfume or cleaning and is NOT food grade. Buy only a product explicitly sold as safe to eat or drink, or leave it out — the wine is good without it.',
    instead: 'Mastic, which is sold as food and does a similar job',
    alias: 'storax styrax benzoin resin terebinth cedar oil mastic aromatic',
    cultures: ['canaanite'],
    tier: 'elite',
  },
]

export const byAisle = (key) => items.filter((i) => i.aisle === key)

export const counts = () => ({
  yes: items.filter((i) => i.verdict === 'yes').length,
  careful: items.filter((i) => i.verdict === 'careful').length,
  no: items.filter((i) => i.verdict === 'no').length,
})

/* Search, with a relevance score attached.
   Matching aliases by bare substring is too loose in a way that actively misleads: `alias`
   is a space-separated word list, so searching "kid" matched "kidney" inside the tinned
   beans entry — and because the results are deliberately ranked worst-verdict-first, a
   legitimate ingredient returned a DO NOT BUY card at the top of the page.

   So each hit carries a `score`, and the caller sorts on that BEFORE the verdict rank:
     2  the term is a whole word in the name or the alias list, or the name starts with it
     1  the term is a prefix of some alias word
     0  a loose substring match somewhere
   The worst-verdict-first rule still holds, but only among results of equal relevance,
   which is what it was always meant to mean. */
export function search(q) {
  const term = q.trim().toLowerCase()
  if (!term) return null
  const out = []
  for (const i of items) {
    const name = i.name.toLowerCase()
    const words = (i.alias || '').toLowerCase().split(/\s+/).filter(Boolean)
    const nameWords = name.split(/[^a-z0-9]+/).filter(Boolean)

    let score = -1
    if (nameWords.includes(term) || words.includes(term) || name.startsWith(term)) score = 2
    else if (words.some((w) => w.startsWith(term)) || nameWords.some((w) => w.startsWith(term))) score = 1
    // ...and the other direction, so a plural on a shopping list finds the singular on the
    // shelf: "pomegranates" -> Pomegranate, "eggs" -> Egg. Guarded at 5 characters so short
    // words cannot drag in half the aisle.
    else if (term.length >= 5 && [...words, ...nameWords].some((w) => w.length >= 4 && term.startsWith(w))) score = 1
    else if (name.includes(term) || (i.alias || '').toLowerCase().includes(term)) score = 0

    if (score >= 0) out.push({ ...i, score })
  }
  return out
}
