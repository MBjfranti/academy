// THE POSTS. The home page is built from this file.
//
// THIRTEEN ARTICLES BY ONE NARRATOR WERE SCRAPPED FROM HERE, because they had drifted into
// being a journal about him rather than a body of writing about places and what those places
// make people eat. The corpus is in git if a sentence is ever wanted back. What replaces it
// is four writers with four beats — see docs/personas.md for who they are, and docs/style.md
// for how they are allowed to write.
//
// WHAT IS HERE NOW is one introduction from each of the four. An introduction is not a
// biography: each of them arrives through a subject — the shape of the sea, a king, the
// depth of a country, a war you have a poem about — and introduces themselves inside it.
// Nobody gets a paragraph about how much they love food.
//
// EVERY POST NAMES ITS WRITER. `author` is one of the ids in authors.js, and the beat is
// checked, not trusted: a post filed under `aegean` and signed by the Babylonian cook fails
// at import in development. The whole reason for splitting one narrator into four is that
// each piece comes from somebody who lives there, and that guarantee is worth an assertion.
//
// TWO KINDS, and the page keeps them apart:
//   'letter'  orientation — who is writing, what this world is. A first-time reader
//             meets these before anything else. Each writer gets one.
//   'report'  a place, a trade or a season, arriving at a dish. These are the substance.
//
// `recipe` links a report to the dish it came out of, in recipes.js. Letters have no recipe.
// Every report has one: the recipe is the spine of the piece, not an appendix to it.
//
// HOW A POST IS LAID OUT. Three fields do the editorial work, and all three place things
// BY HAND rather than by formula:
//   hero      the one image above the headline, with its caption
//   figures   images set into the prose, each with `at` — the paragraph index it follows —
//             and a `size`: 'inset' floats at about half the column and lets the text wrap,
//             'col' fills the measure, 'wide' breaks out past it
//   card      which frame represents the post on the FRONT PAGE. A hero is chosen to open
//             a story and is often the people in it; a reader scanning a grid on a cooking
//             site is looking for the food. Falls back to the hero when absent.
//
//             THE FOUR INTRODUCTIONS BREAK THAT ON PURPOSE and card their writer's face.
//             The food rule holds for a report, where the dish IS the subject. An
//             introduction is somebody arriving, and the first question a new reader has is
//             who these four people are, which a bowl of broth cannot answer and a face
//             answers before they have finished reading the headline.
//   pulls     a lifted line, set large, breaking the column at `at`
//   glossary  proper nouns, as {term, gloss}, rendered as a lookup under the article. It
//             carries ONLY the flat modern equivalent, because the writers do the real
//             teaching themselves in the prose. See docs/personas.md, "What they explain".
//   related   other posts worth reading next, as {to, label}. Rendered as links under the
//             article: the body is plain strings so a link cannot live inside a paragraph,
//             and adding markup to the prose to get one there would be a poor trade.
// Every image carries its own alt AND its own caption. They are different jobs: alt
// describes the picture for someone who cannot see it, the caption says something the
// picture does not.
//
// `body` is an array of paragraphs, and the array is the paragraph discipline made
// structural — see docs/style.md. Three to five sentences each. A 200-word slab is a
// mistake the file cannot stop you making, but it makes it visible.

import { check } from './authors.js'

/* THE CALENDAR.

   Nobody here dates things in our years, so the site does not show them. `date` is stored as
   an ISO string — sortable, unambiguous, and the thing a machine should hold — and rendered
   into their reckoning at the point of display.

   THE OFFSET: our 2026 is their 1226 BC. Both calendars run forward at the same rate, but BC
   years count down as CE years count up, so their year is 3252 minus ours: 2027 will be 1225
   BC, 2028 will be 1224 BC. Stated as arithmetic rather than as a lookup table so it keeps
   working without anybody remembering to extend it. */
const EPOCH = 3252

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/** '2026-08-25' -> '25 August 1226 BC'. Parsed by hand: `new Date('2026-08-25')` is UTC
    midnight, which in any negative timezone renders as the day before. */
export function bcDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${MONTHS[m - 1]} ${EPOCH - y} BC`
}

/* A worked example of the shape, kept as a comment rather than as a disabled entry, so that
   nothing here can be rendered by accident:

   {
     slug: 'the-water-donkeys-came-at-noon',
     kind: 'report',
     author: 'henut',              // an id from authors.js; the region must be on her beat
     region: 'egypt',
     place: 'Set Maat, on the Theban west bank',
     date: '2026-09-18',
     access: 'open',
     recipe: 'emmer-loaves-in-conical-moulds',
     card: 'henut-loaves',
     title: 'The water donkeys came at noon',
     standfirst: '...',
     hero:   { name, alt, caption },
     figures: [{ name, at, size, alt, caption }],
     pulls:  [{ at, x }],
     related: [{ to, label }],
     body:   ['...', '...'],
     standing: 'What is attested, what is invented, what is disputed.',
   } */
export const fieldReports = [
  {
    slug: 'the-two-kitchens-of-nippur',
    kind: 'report',
    author: 'balatu',
    region: 'mesopotamia',
    place: 'Nippur, on the old course of the Euphrates',
    date: '2026-09-04',
    access: 'open',
    recipe: 'pigeon-in-broth-amursanu',
    title: 'The Two Kitchens of Nippur',
    standfirst:
      'Enlil eats four times a day at Nippur, and he eats better than any man in the city. Four hundred labourers eat barley porridge and dried fish. The same clerks write down both.',
    hero: {
      name: 'ekur',
      who: null,
      scene:
        'The Ekur at Nippur at first light: a huge stepped mud-brick ziggurat and its walled temple precinct standing over a busy southern Mesopotamian city. The brickwork is smoothly plastered and freshly whitewashed on the terraces, with bands of colour at the stages. Around its foot a working precinct of courtyards, storerooms, bakeries and brewhouses with smoke going up, date palms, an irrigation channel bright with water, and crowds of pilgrims and porters moving through the gate. Wide documentary landscape, warm low sun.',
      alt: 'A great stepped mud-brick ziggurat and its walled precinct rising over a busy city of flat-roofed houses, palms and a bright irrigation channel at first light.',
      caption: 'The Ekur. Enlil lives here, and a king who has not been confirmed in that building is a man with an army.',
    },
    card: 'pigeon',
    figures: [
      {
        name: 'kitchen', at: 4, size: 'col',
        who: 'balatu',
        scene:
          'Balāṭu standing in the enormous temple kitchen of the Ekur with his arms folded, watching rather than working, plainly impressed and trying to hide it. Rows of tripod cauldrons over fire pits down a long vaulted mud-brick hall, a wall of domed bread ovens glowing at the far end, plucked pigeons and joints of lamb hanging in ranks, sacks of barley, great jars of sesame oil and butter, and a dozen cooks working at scrubbed benches. Smoke, steam, and one shaft of daylight from a high opening.',
        alt: 'Balāṭu with folded arms in a long vaulted temple kitchen, rows of tripod cauldrons over fire pits, domed ovens glowing at the end and plucked birds hanging in ranks.',
        caption: 'Thirty cooks, and none of them cooking for a person.',
      },
      {
        name: 'ration', at: 8, size: 'col',
        who: null,
        scene:
          'The ration line of a Mesopotamian temple estate: a wide shallow clay vat of thick barley porridge on a trestle in an open courtyard, a stack of coarse clay ration bowls beside it, a flat basket of split dried river fish going brown at the edges, and a scribe’s clay tablet and reed stylus laid at the end of the trestle. Hard morning sun and dust. No people.',
        alt: 'A wide clay vat of thick barley porridge on a trestle with a stack of ration bowls, a basket of split dried fish and a scribe’s tablet and stylus at the end.',
        caption: 'Two litres of barley a day and a fish. This is what four hundred men are actually running on.',
      },
      {
        name: 'offering', at: 12, size: 'inset',
        crop: '4 / 5',
        who: null,
        scene:
          'A god’s meal laid out on a low offering table before a curtained shrine: a covered bowl of rich dark stew, a stack of fine pale bread rounds, a dish of dates and nut confection, two narrow-necked jars of beer, a bowl of butter and a cup of wine, all on good painted and glazed ware. A linen curtain drawn most of the way across behind it. Lamplight and incense smoke. No people.',
        alt: 'A god’s meal on a low offering table before a drawn linen curtain: a covered bowl of dark stew, pale bread, dates and nuts, beer jars and butter, lit by lamps.',
        caption: 'Four of these a day. Nobody outside the curtain has ever watched him eat one.',
      },
      {
        name: 'pigeon', at: 18, size: 'col',
        who: null,
        scene:
          'A finished Mesopotamian pigeon broth in a wide glazed clay bowl on a scrubbed kitchen bench: whole small birds in a dark glossy broth thick with sliced leek, shallot and garlic, torn mint scattered over, a round of flatbread baked and browned into the rim of the pot, a dish of coarse salt and a bronze ladle beside it. Warm firelight from one side. Close still life, the bowl filling the frame.',
        alt: 'Whole pigeons in a dark glossy broth thick with leek, shallot and garlic, mint torn over the top, with bread baked into the rim of the pot.',
        caption: 'Pigeon, leek, shallot, garlic, mint, and a great deal of sheep fat. The bread bakes onto the pot as it cooks.',
      },
    ],
    pulls: [
      { at: 12, text: 'Anybody can cook well with unlimited butter.' },
    ],
    body: [
      'Nippur sits four days south of Babylon on a dead arm of the river, and you dig it under the name Nuffar, in southern Iraq. It has never been a capital and it has never wanted to be. It is the holy city of this country, and that is a post with more security in it than kingship.',
      'The god who lives here is Enlil, who is the wind, and who decides. A man becomes king of this land by being confirmed in Enlil’s house. Take Babylon by force and you hold Babylon. Come south, stand in the Ekur and have the priests say the words, and you hold the country. Every dynasty for six hundred years has made that journey, the Kassites who rule now included.',
      'The Ekur is the temple and the ziggurat together. A ziggurat is a solid stepped mountain of mud brick with a shrine on top, built high because a god comes down and should not have to come the whole way. Around its foot runs a walled precinct of courtyards, granaries, brewhouses, weaving rooms and stores. The whole of it is an estate, with fields, herds and several thousand dependants.',
      'You know an extraordinary amount about this place, and the reason is schoolboys. Nippur is where scribes were trained, and the training was copying. Thousands of practice tablets went into the walls and the rubbish once they had served. Most of what you can read of Sumerian literature came out of one town’s discarded homework.',
      'I came for the kitchens, and they are worth the four days.',
      'The god eats four times a day. Two meals in the morning and two in the evening, each with a main course and a second course, and it is a real dinner rather than a symbol. Bread, beer, wine, butter, fruit, and meat cooked properly. They carry it in, set it on the table before him, draw a linen curtain across so that nobody watches him eat, and wait.',
      'What happens behind that curtain is a mystery to men of my station. I asked twice. The answer both times was a look.',
      'When the curtain comes back the food is still there, because a statue does not chew. It then goes out to the king, or to the priests, or down the ladder of people with a claim on it. The god eats first and none of it is thrown away. Everyone in Nippur knows this and nobody finds it funny.',
      'Now the other kitchen, thirty paces away. The estate runs on labour, and the labour is fed by the day. Something close to two litres of barley a head. A portion of dried fish, oil in small quantities, and beer that is mostly barley arriving by another route. It comes out of a vat into coarse bowls. Four hundred men eat it standing up.',
      'The same clerks write down both kitchens, on the same kind of tablet, in the same hand. I have read the two lists side by side. It is the most honest document in this country.',
      'I said something about that to Enlil-nāṣir, who has cooked in the Ekur for thirty years and who was letting me watch. I told him the god’s kitchen was the finest work I had seen outside Babylon.',
      '“It is easy,” he said. “I have as much butter as I ask for.”',
      'I called that modesty. He called it arithmetic. Anybody can cook well with unlimited butter, he said. Then he walked me over to the vat and asked how I would feed four hundred men the same porridge every day for a year and keep it worth eating.',
      'Salt, he said. Beer dregs. Onion tops nobody counts. And the fish moved around the week so that it lands on the day the barley is worst.',
      'He has been solving that problem daily for three decades and no tablet records a word of it. The god’s dinner is written down to the last shekel of oil.',
      'I have argued for years that plain food is a symptom of poverty rather than a virtue, and I still think so. He did not contradict it. He said something narrower and harder. Skill in feeding people has almost nothing to do with the number of ingredients, and I have spent most of my life calling a supply problem a cooking problem.',
      'I have been turning that over since. He is at least half right, and the half he is right about is the half I built a career on.',
      'The dish I brought back is the god’s, and it comes off the same family of tablets I learned from. Small birds, cooked whole, in a broth built on sheep fat.',
      'Render the fat and soften leek, shallot and garlic in it. Put the birds in with water, salt and beer. It simmers slowly and never boils. Towards the end you press flatbread dough around the inside rim of the pot, so that it bakes in the steam and takes up the fat coming off the top. Mint goes over at the last moment, torn rather than chopped. The broth should be dark, glossy, and heavy enough to coat a spoon.',
      'It is very rich and it is meant to be. Nobody was ever expected to eat it daily except a god, and he has the constitution for it.',
    ],
    standing:
      'Nippur is Nuffar in Iraq, and its role as the seat of Enlil and the source of royal legitimacy is well established. Kassite-period administrative archives from the site are extensive, and the great mass of surviving Sumerian literary texts does come from Nippur scribal training. The four daily meals of the divine statue, the drawn curtain and the redistribution of the offering afterwards are attested for Mesopotamian temple practice. Much of the detailed evidence is later than 1226 BC and is read backwards onto this period. Ration lists issuing barley, fish and oil to dependent labour are abundant and specific. The pigeon broth comes from the Yale culinary tablets, which give ingredients and sequence and no quantities at all. Balāṭu and Enlil-nāṣir are invented, and so is the conversation between them. The gap between what a temple recorded about a god’s meal and what it recorded about a workman’s is real, and you can see it on the tablets.',
    glossary: [
      { term: 'Nippur', gloss: 'Nuffar, in southern Iraq. The religious centre of Sumer and Babylonia.' },
      { term: 'Ekur', gloss: 'The Mountain House. Enlil’s temple and ziggurat at Nippur.' },
      { term: 'Enlil', gloss: 'God of wind and command, and the one who confirms kings.' },
      { term: 'Ziggurat', gloss: 'A solid stepped tower of mud brick with a shrine on top.' },
      { term: 'Kassites', gloss: 'The dynasty ruling Babylonia in this century, from about 1595 BC.' },
      { term: 'Tu’u', gloss: 'A broth or stew. The commonest dish name on the culinary tablets.' },
      { term: 'Mersu', gloss: 'A confection of crushed dates, butter and nuts.' },
      { term: 'Amursanu', gloss: 'A kind of pigeon or small dove named in the recipes.' },
    ],
    related: [
      { to: '/reports/the-buried-kitchens-of-babylon', label: 'Balāṭu, on how old this country actually is' },
    ],
  },
  {
    slug: 'ugarit-from-warehouse-to-field',
    kind: 'letter',
    author: 'yadinu',
    region: 'levant',
    place: 'Ugarit, on the Syrian coast',
    date: '2026-08-20',
    access: 'open',
    title: 'Ugarit, from Warehouse to Field',
    standfirst:
      'I priced other people’s harvests for eleven years before I saw the ground any of them grew in. This is the shape of that world. It settles your dinner before you do.',
    // The map belongs to the paragraph that opens on the sea and says the rest follows
    // from it. It is the only post on the site that gets one.
    showMapAfter: 2,
    hero: {
      name: 'face',
      who: 'yadinu',
      scene:
        'Yadinu standing on a crowded Levantine quayside in late afternoon, half turned to the camera, a shallow bowl of barley in one hand and a cut-reed stylus in the other. Moored ships with furled sails and a painted mud-brick harbour wall behind him, baskets of figs and roped onions on the stones at his feet. THE REFERENCE FRAME: his face is clearly lit, unshadowed and fully visible.',
      alt: 'Yadinu on a crowded quayside holding a bowl of barley and a reed stylus, a pale striped shawl over his left shoulder, moored ships and a painted harbour wall behind him.',
      caption: 'Ugarit. Eleven years of my life came ashore on this quay. I could have told you the price of every jar on it.',
    },
    card: 'face',
    figures: [
      {
        name: 'deck', at: 1, size: 'col',
        who: 'yadinu',
        scene:
          'Yadinu sitting cross-legged on the planking of a Late Bronze Age merchant ship under sail in open water, eating grilled fish and greens from a shallow clay dish, a coil of rope and lashed storage jars beside him and two crew working the sail behind. Mid-morning, hard sea light, low camera at deck level.',
        alt: 'Yadinu sitting cross-legged on a ship’s deck eating grilled fish from a shallow dish, lashed storage jars beside him and crew working the sail behind.',
        caption: 'Four days out. To move a heavy thing in this world you put it on water and wait.',
      },
      {
        name: 'dryline', at: 3, size: 'col',
        who: null,
        scene:
          'The edge of cultivation on the Syrian steppe seen from a low ridge: a band of green barley and a few date palms following a watercourse across the bottom of the frame, and beyond it thorn scrub, stone and pale dust running unbroken to the horizon. The boundary between the two is abrupt, not gradual. Late afternoon raking light, no people. Wide documentary landscape.',
        alt: 'A single rectangular plot of green barley with a stand of date palms, isolated in thorn scrub and pale dust that runs unbroken to the horizon.',
        caption: 'You can stand with one foot either side of it.',
      },
      {
        name: 'flood', at: 4, size: 'inset',
        crop: '4 / 5',
        who: null,
        scene:
          'An Egyptian flood basin after the inundation has drained: flat black river mud cracked at the surface, low earth retaining banks dividing it into fields, green emmer coming up in one plot and a man with a wooden hoe far off. Palms along a distant levee. Hard morning light.',
        alt: 'A drained Egyptian flood basin of cracked black mud divided by low earth banks, green emmer coming up in one plot and palms on a distant levee.',
        caption: 'Egypt farms the mud a river left behind. The water arrives on a calendar.',
      },
      {
        name: 'canal', at: 4, size: 'inset',
        crop: '4 / 5',
        who: null,
        scene:
          'Men standing knee-deep in a drained irrigation channel in Mesopotamia, lifting wet grey silt out in reed baskets and stacking it along the bank where it is drying pale. Date palms and a mud-brick village behind, flat land in every direction. Spring, high sun, dust.',
        alt: 'Men knee-deep in a drained irrigation channel lifting wet silt out in reed baskets and stacking it on the bank to dry.',
        caption: 'Babylonia digs for its water and lifts the silt back out every spring, for ever.',
      },
      {
        name: 'plateau', at: 6, size: 'col',
        who: 'yadinu',
        scene:
          'Yadinu on a cold high Anatolian plateau with a heavy dull-red wool mantle pulled over his usual shawl, breath faintly visible, holding a round flat loaf broken in half and a bowl of soured milk. Massive cyclopean stone walls and thin grey mountain light behind him, dry grass and no trees. Bleak and high: no sea, no palms, no golden hour.',
        alt: 'Yadinu on a cold high plateau in a heavy red mantle over his shawl, holding a broken flat loaf and a bowl of soured milk, cyclopean stone walls behind him.',
        caption: 'This is above the olive line. Butter, soured milk and mutton, because the herds outlast the trees up here.',
      },
      {
        name: 'pot', at: 12, size: 'col',
        who: null,
        scene:
          'A wide clay cooking pot of cracked barley with sliced onions and olive oil on a scrubbed wooden table on a Levantine terrace, with a torn flatbread, a dish of split dried fish, a bowl of olives and a stoppered oil flask beside it. Evening light off the sea in the far background, softly out of focus. No people. Close three-quarter angle.',
        alt: 'A clay bowl of cracked barley topped with soft onion rings on a scrubbed wooden table, with torn flatbread, two dishes of olives, a dish of split dried fish and a stoppered oil flask around it, the sea behind.',
        caption: 'Barley, onions, oil, and whatever the boats brought. Five countries went into one pot.',
      },
    ],
    pulls: [{ at: 3, text: 'West of that line a farmer sows and waits. East of it he digs.' }],
    body: [
      'My name is Yadinu. For eleven years I sat in a storeroom at Ugarit and wrote down what came off the ships. Emmer arrived from the Delta. Copper came from Alašiya. The wine grew in hills an hour behind my own head. I could price all of it to the shekel. My picture of the Delta was a number and the shape of a jar.',
      'Five years ago I walked out and went to look. The ground explains almost everything the ledger could not. It does that work through water. Three things settle it: how much falls, when it falls, and how far somebody carries it.',
      'Before any of that, you need to know where you are standing and when. Ugarit is a mound above the sea in northern Syria. You call it Ras Shamra and you have been digging it since 1929. My year is the one you would write as 1226 BC.',
      'That number means very little on its own, so take it from the other end. The great pyramid at Giza is already thirteen hundred years old when I write this. Egyptians visit it the way you visit a cathedral. Rome is grass and a few huts. The Greeks whose names you learned at school are seven centuries away and have not been thought of.',
      'You call this the Bronze Age, and the name is doing more work than most people notice. Bronze is copper with a tenth part tin. Copper we have in quantity, out of Alašiya, which is the island you call Cyprus and which is more or less made of the stuff. Tin is the problem.',
      'Tin comes from a very long way east, through many hands, and it arrives as ingots with nobody attached to them. Where it is dug is a mystery to men of my station. I have asked. The men who sell it to me give an answer that changes with the price, so I have stopped believing any of it.',
      'Hold those two facts together and you have the reason my world exists. No kingdom here can arm itself alone. The metal that makes a sword and a ploughshare requires two ores that never occur in the same country. So the ships run. So do the roads. And a scribe in a storeroom writes down what came off them.',
      'Now the sea. Every place I have eaten in sits on a rim around it. Egypt holds the bottom and my own coast runs up the eastern edge. The Hittites are above us on a cold plateau, in the middle of what you call Turkey. The Aegean islands scatter away west. A ship leaving Ugarit touches all of it in one season. Walking, you would still be in the Amuq at harvest.',
      'Rain comes off that sea in winter. It thins as you walk inland. Somewhere out in the Syrian steppe it stops being enough to raise a crop. That line matters more than any border drawn across it. West of it a farmer sows and waits. East of it he digs a channel, or he keeps goats, or he gives up and comes to the coast for work.',
      'So we grow bread three ways. Egypt waits on a flood and farms the mud it leaves. Babylonia cuts channels and lifts the silt back out every spring. The rest of us take what falls and gamble on it. Almost every difference between our kitchens starts with which of the three a person was born into.',
      'Each way has a price. The canal pays you back at once and salts the field slowly. The far south has been sliding from wheat to barley for centuries because of it. The flood is generous and now and then it fails. Rain is worst for the nerves and best for flavour. A hillside that only just gets enough water grows a small hard grape and an excellent olive.',
      'Height settles the rest. Walk uphill from any coast and the olive gives out first. The vine goes a little higher. Above both you find barley, sheep and a great deal of weather. The Hittites live up there. Their food runs on butter, soured milk and meat. At that height the herds outlast the trees, and the kitchen follows the ground.',
      'At sea the wind decides. It comes down out of the north through the islands all summer. So a ship works from my coast to Alašiya and west along the Anatolian shore. From there it runs south past Crete, along the African coast, and up into Egypt. The circuit turns one way only. Going against it costs a season.',
      'Why the wind should behave like that is beyond me. Every sailor I know can tell you what it will do next week. Ask why and you get a shrug, or you get the priests, who have an answer I have never believed. You have a reason for it. I have read yours. It involves the whole earth turning, and I would have laughed at that in the storeroom.',
      'Weight against worth settles what travels. Grain is heavy and cheap, so it goes by water. A city more than a short donkey ride from a river eats what grows beside it. Oil and wine pay their own passage. Spice and resin go anywhere at all. A cook in Ḫattuša seasons with coriander from four countries away. She buys her fish salted, in a jar, once a year.',
      'I put some of this to Yarimmu. He has steered a coaster between here and Byblos since he was a boy. He let me finish.',
      '“You have drawn a picture of the sea,” he said. “I do not need a picture. I need to know where the water is on this run, what the wind did yesterday, and whether the man at Byblos still owes me.”',
      'He has run that coast for thirty years. I have been lost twice this year. Both times I was holding a very good idea about rainfall. A map is a thing you make afterwards out of other people’s walking. He worked that out long before I did.',
      'One more thing, because you should know how you come to be reading any of this. Thirty-six years after the date at the top of this page, my city burns, and it stays burnt. The harbour silts, the mound grows over, and Ugarit stops being a place and becomes a shape in a field.',
      'The fire is the reason you have us. We wrote on wet clay and let it dry, and dry clay softens back to mud in the first hard rain. Fire bakes it to pottery. So the archive I spent eleven years filling survived because the building came down on top of it and burned. Every ledger you have read of mine is a thing that was saved by being destroyed.',
      'All of it ends on a table. A pot on my coast holds cracked barley, onions, oil and whatever the boats brought. It tastes of five countries and cost somebody a voyage. The same pot behind Ḫattuša holds barley, soured milk and mutton. Every part of that came from within a day’s walk. Both are good. Both are exactly what the ground allowed.',
    ],
    glossary: [
      { term: 'Ugarit', gloss: 'Ras Shamra, on the coast of northern Syria. Excavated since 1929.' },
      { term: 'Alašiya', gloss: 'Cyprus, near certainly. The copper island of this world.' },
      { term: 'Ḫattuša', gloss: 'The Hittite capital, on the central Anatolian plateau. Boğazkale, Türkiye.' },
      { term: 'The Amuq', gloss: 'The plain inland of the Levantine coast, around modern Antakya.' },
      { term: 'Emmer', gloss: 'A hulled ancient wheat. The bread grain of Egypt.' },
      { term: 'Byblos', gloss: 'A Levantine port south of Ugarit. Jbeil, Lebanon.' },
    ],
    standing:
      'The rainfall boundary, the three farming systems and the summer wind circuit are well established. You can read the circuit straight off the Uluburun wreck’s cargo and route. Salinisation in southern Mesopotamia is real, and its severity is argued over. Yarimmu is invented. Coastal shipmasters running short hops between Levantine ports are attested throughout. The olive and vine altitude limits vary by slope and aspect, so take them as a shape rather than a measurement.',
    related: [
      { to: '/reports/lifetimes-in-the-reign-of-ramesses-ii', label: 'Henut, in the one country here that does not depend on rain' },
    ],
  },

  {
    slug: 'lifetimes-in-the-reign-of-ramesses-ii',
    kind: 'letter',
    author: 'henut',
    region: 'egypt',
    place: 'Set Maat, on the Theban west bank',
    date: '2026-08-22',
    access: 'open',
    title: 'Lifetimes in the Reign of Ramesses II',
    standfirst:
      'Ninety-one people eat what comes out of my yard, and Pharaoh pays for every loaf. He reaches this valley as a delivery schedule. When the schedule slips, the men come down off the hill and sit.',
    hero: {
      name: 'face',
      who: 'henut',
      scene:
        'Henut standing in a village bread yard in hard morning sun, half turned to the camera, one floured forearm resting on the rim of a cylindrical clay oven, the other hand holding a flat emmer loaf. Baskets of shaped loaves and a tall beer jar beside her, white limewashed wall and bare limestone cliff behind. THE REFERENCE FRAME: her face is clearly lit, unshadowed and fully visible.',
      alt: 'Henut at a cylindrical clay oven in a village yard, forearms white with flour to the elbow, holding a flat emmer loaf, limestone cliff behind her.',
      caption: 'Twenty-two years of this. Every grain of it walked into the valley on a donkey.',
    },
    card: 'face',
    figures: [
      {
        name: 'statue', at: 2, size: 'col',
        who: 'henut',
        scene:
          'Henut standing at the foot of a colossal seated statue of Ramesses II in a sunlit temple forecourt, looking up at it with her head tilted and an entirely irreverent grin, one floured hand resting on the stone. She is small against it and completely at ease. THE STATUE IS PAINTED, as Egyptian statuary always was: red-brown skin, a blue-and-gold striped nemes headcloth, a white pleated kilt, and a broad collar in red, blue and green. CRUCIALLY IT IS ALREADY OLD. The statue went up forty years ago and it shows: on the sun-facing side the paint is chalky, faded and flaking away to bare stone in patches, while under the chin, inside the elbow and in the shadow of the shoulder the original colour is still strong. Dust in the carved lines. Deeply cut hieroglyphic relief on the throne and the back pillar, kept soft and partly in shadow. IT IS CARVED STONE THROUGHOUT AND MUST READ AS STONE, above all in the HANDS. The fingers are blunt, stylised and squared off, carved in one mass with the knee they rest on, with tool marks and chipped edges and NO fingernails, NO knuckle creases, NO tendons, NO veins and NO skin texture. Nothing about the statue may look like living flesh. The only living human in this frame is Henut. Behind them a working temple forecourt with painted columns, offering tables, palms in the courtyard and people going about. Hard bright late-morning sun.',
        alt: 'Henut standing at the foot of a colossal painted seated statue of Ramesses II, looking up at it with a grin, the paint faded and flaking on the sunlit side and still strong in the shadows.',
        caption: 'This one went up before I was born. The paint on the sunny side has been going for forty years, and nobody has been sent to do it again.',
      },
      {
        name: 'loaves', at: 2, size: 'col',
        who: null,
        scene:
          'A flat coiled reed basket heaped with New Kingdom Egyptian emmer bread in several shapes — flat rounds, domed loaves, long twists — cooling on a limewashed mud-brick bench in hard morning sun, with a tall clay beer jar and a scatter of onions beside it. No people. Overhead three-quarter angle, hard shadow.',
        alt: 'A reed basket of emmer loaves in several shapes cooling on a mud-brick bench beside a tall beer jar and a scatter of onions.',
        caption: 'Bread and beer are one trade here, not two. Same grain, same yard, same women.',
      },
      {
        name: 'ration', at: 5, size: 'col',
        who: 'henut',
        scene:
          'Henut standing with her arms folded in front of a grain delivery — sacks lashed to two donkeys — at the gate of a walled desert village, facing a scribe who is writing on a potsherd. She is calm and she is staying exactly where she is. Midday, no shade, the tomb crew’s mud-brick houses and the limestone cliff behind.',
        alt: 'Henut standing with her arms folded in the open ground of the village, two donkeys waiting behind her and a scribe stooped over a potsherd further off, in flat midday sun.',
        caption: 'The grain has been four days late, and he is writing down that it arrived.',
      },
      {
        name: 'oven', at: 8, size: 'inset',
        crop: '4 / 5',
        who: 'henut',
        scene:
          'Henut reaching into the mouth of a cylindrical clay oven to slap a round of dough onto the hot inner wall, lit red from inside, her face turned away from the heat and her forearm shielded by a fold of linen. Dawn, before the sun clears the cliff.',
        alt: 'Henut slapping a round of dough onto the inner wall of a cylindrical clay oven, her face turned from the heat, the oven mouth glowing red.',
        caption: 'Before the sun comes over the cliff, because after that the yard is unusable.',
      },
    ],
    pulls: [
      { at: 1, text: 'We have had one weather all our lives.' },
    ],
    body: [
      'I am Henut. I bake the bread and brew the beer for the crew that cuts the royal tombs. I have done it twenty-two years. Ninety-one people eat what comes out of my yard, and the king pays for every loaf. I know him the way I know the flood: by what arrives.',
      'His name is Ramesses and he is Pharaoh. He has been Pharaoh fifty-three years. That is seven more than I have been alive. Everybody here under fifty has known one Pharaoh, one round of festivals, one way the grain comes. We have had one weather all our lives.',
      'You know him. You call him Ramesses the Great. You have more statues of him than of any other man out of Egypt, and half of them he took off somebody else and carved his own name into. That is the man. Out here he is a delivery schedule.',
      'Put me on your map before I go further. Our village is Set Maat, the Place of Truth, and you dig it under the name Deir el-Medina. The valley we walk over the hill to work in, you call the Valley of the Kings. The city across the river is Waset. You call it Luxor now. Your books call it Thebes, for reasons that have nothing to do with us.',
      'We live in that walled village in a dry valley, an hour over the hill from the river. The valley gives us stone, dust and a great deal of sun. Every loaf I bake starts as grain a donkey carried in. The water I mix it with arrived the same way, in jars, on a schedule somebody else keeps.',
      'The village exists because Pharaoh wants a tomb. A tomb takes sixty men with copper chisels most of a reign. So the state feeds us: grain twice a month by rank, fish, vegetables, firewood, pots, water. We grow nothing and we eat every day. Pharaoh is the reason for both.',
      'Everything in Egypt hangs off the river, and the river does one thing a year. It rises in summer, spreads across the fields, and goes down again leaving black mud. Plant into that mud and you get a crop. Miss it and you get nothing, and the country goes hungry in a way I have seen twice.',
      'Where the water comes from is a mystery to people of my station. It is a mystery to the priests as well, whatever they tell you about Hapi and the caverns at Abu. No traveller has gone upriver far enough to find out. I have read your answer. Rain on mountains a very long way south. I would have called that a traveller’s lie.',
      'I can read a delivery docket. That is the whole of my letters. Men keep trying to round it up into something grander on my behalf. What I can do is arithmetic, in my head, faster than the scribe holding the potsherd. I have spent twenty years watching that surprise people who ought to know better.',
      'You know more about this village than about any other village in the ancient world, and the reason is rubbish. Papyrus is expensive. Broken pottery and flakes of limestone are free, so we wrote the small business of a day on those and threw them away. Wages, absences, a man off work because his daughter was ill, a quarrel over a donkey, who owed beer to whom.',
      'We threw them in a pit. The desert kept them dry for three thousand years and you dug the pit out. So you have our arguments, our shopping and our sick notes, and almost nothing of what we thought we were doing. I find that funnier than I probably should.',
      'Ramesses holds a jubilee about every three years, which is more than any Pharaoh has business having. A jubilee is a festival for Pharaoh’s own body, proof he is still strong enough to rule. Out here it means an extra distribution, with meat in it. So the old man’s vanity reaches this valley as beef. I am glad of it.',
      'Four times since the flood the grain has come late. Four days late and the men still walk up the valley in the morning. Ten days late and they come back down, sit in front of the temple, and stay there. The scribe writes that they are absent. Somebody rides for Thebes. I bake what I have, and I bake it for them.',
      'Pashed cuts stone on the left-hand gang. He thinks I talk about Pharaoh too plainly.',
      '“He is a god,” he said. “You say ‘the old man’ as though he were your uncle.”',
      'I told him the god has been late with the barley four times since the flood. He said both things were true and I should be careful anyway. He is probably right. I said it again this morning.',
      'I have no idea what happens when he dies. You do. His son takes the throne as an old man and holds it, and within a hundred years the whole arrangement that feeds this valley comes apart. The crew stops being paid on time, then stops being paid, and somebody walks out of these houses for the last time and leaves the door open.',
      'That is a strange thing to be told about your own street. I have decided it changes nothing I do tomorrow, which is bake.',
      'What a jubilee puts in front of us: emmer loaves in more shapes than the festival has days. Beer thick enough to want chewing. Onions, cucumber, dried fish and dates. A piece of beef off a Delta estate ten days downriver. Every other week of the year it is bread, beer, onions and fish. The bread is very good. I make it.',
    ],
    glossary: [
      { term: 'Set Maat', gloss: 'The Place of Truth. Deir el-Medina, on the Theban west bank.' },
      { term: 'Waset', gloss: 'Thebes to your books, Luxor on a modern map. The city across the river.' },
      { term: 'Ramesses II', gloss: 'Reigned about 1279 to 1213 BC. Roughly sixty-seven years, and fourteen jubilees.' },
      { term: 'Jubilee', gloss: 'The sed festival. A renewal rite for the king’s body, and out here an extra ration.' },
      { term: 'Ostracon', gloss: 'A potsherd or limestone flake used as scrap paper. The village’s daily record.' },
      { term: 'Hapi', gloss: 'The god of the inundation. The official answer to where the flood comes from.' },
      { term: 'Emmer', gloss: 'The hulled wheat of Egypt. Bread and beer both start here.' },
    ],
    standing:
      'Set Maat is Deir el-Medina, the best-documented ordinary settlement in the ancient world. Thousands of ostraca record the rations, the delivery delays, the absences and the disputes. The village produced no food and drew everything from outside. Ramesses II reigned about sixty-seven years and held an unprecedented run of jubilees. Pharaoh is per-aa, the great house, and it shifts from meaning the palace to meaning the man during the New Kingdom, so it is current in Henut’s mouth by this reign. Work stoppages over late rations are attested here. The famous full strike falls under Ramesses III, some seventy years after Henut speaks, so she knows nothing of it and claims nothing. Henut and Pashed are invented. Pashed is an ordinary village name, chosen for that reason.',
    related: [
      { to: '/reports/the-buried-kitchens-of-babylon', label: 'Balāṭu, on a country that wrote its dinners down' },
    ],
  },

  {
    slug: 'the-buried-kitchens-of-babylon',
    kind: 'letter',
    author: 'balatu',
    region: 'mesopotamia',
    place: 'Assur, lately of Babylon',
    date: '2026-08-24',
    access: 'open',
    title: 'The Buried Kitchens of Babylon',
    standfirst:
      'You have three of our tablets, and they are the only cookery anybody in this world thought worth writing down. My master handed them to me as an exercise. Learning to read them took longer than learning to cook.',
    hero: {
      name: 'face',
      who: 'balatu',
      scene:
        'Balāṭu standing in a mud-brick temple kitchen with one hand on the rim of a large tripod cauldron, half turned to the camera, a domed bread oven glowing behind him and a shaft of daylight from a high opening falling across his face and beard. Onions, leeks and a stone mortar on the bench in front. THE REFERENCE FRAME: his face and beard are clearly lit and fully visible.',
      alt: 'Balāṭu in a smoky temple kitchen, one hand on a tripod cauldron, a leather apron over a fringed red wrap, daylight from a high opening across his combed grey-black beard.',
      caption: 'Assur, not Babylon. That was not my decision.',
    },
    card: 'face',
    figures: [
      {
        name: 'tablet', at: 1, size: 'col',
        who: 'balatu',
        scene:
          'Balāṭu seated on a low stool at a kitchen bench, holding a small palm-sized clay tablet at arm’s length in the light from a high opening, reading it with visible effort. A pot on the fire behind him and a young cook standing waiting for him to say something.',
        alt: 'Balāṭu holding a small cuneiform tablet at arm’s length in a shaft of daylight, a pot on the fire behind him and a young cook waiting.',
        caption: 'Half the kitchen words on it are in a language nobody has spoken in the street for six hundred years.',
      },
      {
        name: 'mound', at: 3, size: 'col',
        who: null,
        scene:
          'A busy, thriving Kassite Babylonian city standing high on the mound of its own older selves. In the foreground a steep cut bank at the edge of the town shows the stacked courses of earlier mud-brick walls and floors going down many metres. Above and behind it the living city: smooth mud-plastered houses washed in warm ochre and white, painted doorways, awnings of woven matting, date palms, a green irrigated garden plot, laundry and drying herbs on the roofs, smoke from cooking fires. Late afternoon raking light. Documentary, wide.',
        alt: 'A steep cut bank at the edge of a mud-brick town, its face showing the stacked courses of older walls, with the living city of plastered houses, painted doorways, palms and cooking smoke standing above it.',
        caption: 'Babylon stands on Babylon. The bank in front is the city they were living in four hundred years ago.',
      },
      {
        name: 'broth', at: 10, size: 'col',
        who: null,
        scene:
          'A wide clay bowl of dark Mesopotamian mutton broth on a scrubbed kitchen bench, thick with leek and onion, a dressing of milk and crushed garlic swirled across the top. Torn barley flatbread, a small dish of coarse salt, a bunch of fresh leeks and a bronze ladle beside it. Warm firelight from one side. Close still life, the bowl filling the frame.',
        alt: 'A wide clay bowl of dark mutton broth thick with leek and onion, milk and crushed garlic swirled over the top, with torn barley flatbread beside it.',
        caption: 'Tablet one, the fourth broth. The quantities are mine. The tablet does not give any.',
      },
    ],
    pulls: [
      { at: 4, text: 'A cook from Ur would walk into my kitchen and be useful inside an hour.' },
    ],
    body: [
      'You have three of our tablets. They are the only cookery anybody in this world thought worth writing down. One carries twenty-one broths. The other two carry birds, breads and pastries. My name is Balāṭu. I cook in a temple kitchen, and reading those tablets took me longer to learn than cooking did.',
      'They were already five hundred years old when my master set them in front of me. Reckon that against your own time. You are handing an apprentice a manuscript from five centuries back and telling him to get Tuesday’s dinner out of it.',
      'Find me on your map first. My country is the flat land between two rivers, the Tigris and the Euphrates, and you call almost all of it Iraq. Babylon is a ruin field near Hillah. Assur, where I am writing, is upriver in the north. Elam is over the eastern mountains, in the south-west of what you call Iran.',
      'A word about the tablets, because most people picture the wrong object. They are lumps of river clay the size of your palm, still damp. A scribe presses a cut reed into them. The reed leaves a wedge. Combinations of wedges make a sign. Several hundred signs exist. A sign can stand for a whole word or for one syllable, depending on where it sits.',
      'It takes years to learn. That is the point of it. Writing here is a profession rather than a skill, and the men who hold it are paid for holding it.',
      'Now the part I find hard to be calm about. That script died. It went out of use. For something like two thousand years the world held nobody who could read a word of it. Everything my country ever wrote sat in the ground saying nothing to anybody.',
      'Then men in your world worked it back out. They started from a cliff in Persia with the same royal proclamation carved in three languages, and they picked at it for decades until the wedges opened. I am told one of them hung off that rock face on a ladder to copy it. I would like to buy that man a drink.',
      'You then had my three tablets in a museum for the better part of a century and catalogued them as medicine. Some of the broths do read like a prescription, so I forgive it. One scholar sat down with them properly in the 1980s and worked out that they were dinner.',
      'That is the second thing I would want a stranger to understand about this country. It is old in a way that has physical thickness. Babylon stands on Babylon. Dig anywhere inside a city here and you go down through floor after floor of the same city, each raised on the flattened rubbish of the last. Keep going and you reach people who did all of this before anybody thought of writing it down.',
      'Three names get quoted at me in markets, so you should have them. Sargon put the whole land under one man for the first time, eleven hundred years before I was born. The kings of Ur came three centuries after him and ran the country like a granary with an army attached. They counted everything. I mean everything. Hammurabi cut his laws into a block of stone and stood it up in public where people could go and look.',
      'Hammurabi sits five hundred years back. That is the same distance as the tablets, and it is no coincidence. His century is when we started writing things down at that sort of length.',
      'Across all of it the food barely moved. The list runs barley, dates, sesame oil, onion, leek, garlic and beer. A cook out of Ur would walk into my kitchen and be useful inside an hour. The king would be strange to him. So would the language of the street, the gods on the wall, and the price of everything. He would know the pot at a glance.',
      'One thing did change, and it is the bane of my working life. Sumerian died in the street six hundred years ago. We still write half the kitchen in it. A single line of tablet gives me the word for a broth in a dead language and the word for searing it in a living one. A cook who wants these recipes has to learn a tongue that died before his great-grandfather was born.',
      'I write this from Assur. Two years ago the Assyrians came down the river and took the city. They took me with the door fittings, because a trained cook is property. They roast everything here and call it cooking. I have said so to their faces more than once.',
      'Ubru is nineteen. He grinds and fetches for me, and his letters stop at his own name. I was explaining the tablets to him for the third time.',
      '“How much barley?” he said. I told him the tablet does not say. “How much water?” It does not say that either. It gives no quantity anywhere across twenty-one recipes.',
      'He went back to the leeks. Then he said that a list of ingredients with no amounts is a shopping list. He said I learned to cook from my master rather than from a tablet. I have been turning that over for a month. He is right.',
      'One thing I never got to the bottom of. Goods come up the eastern road out of Elam and keep coming. Behind Elam lies more country. Behind that lies ground no man I ever met had walked. Tin arrives from out there. So does lapis, the blue stone in every temple in this land. Every piece of it walked a very long way to get here. Where from is a mystery to men of my station, and I suspect to the men who sold it to me.',
      'So this is what I would put in front of you first, off tablet one. Mutton in water, with fat, salt, beer, onion, samidu, coriander and cumin. Crush leek and garlic together. Work that in at the end. Finish with a dressing of milk and more crushed garlic. That is everything the tablet gives you, to the letter. The amounts are mine, and Ubru is right about what that makes them. Cook it anyway: it is the oldest dinner anybody can still put on a table.',
    ],
    glossary: [
      { term: 'Babylon', gloss: 'On the Euphrates near Hillah, Iraq. Kassite-ruled in this century.' },
      { term: 'Assur', gloss: 'The Assyrian capital on the Tigris, upriver in the north. Qalat Sherqat, Iraq.' },
      { term: 'Elam', gloss: 'The kingdom over the eastern mountains, in south-west Iran. Capital at Susa.' },
      { term: 'Cuneiform', gloss: 'Wedges pressed into wet clay with a cut reed. Several hundred signs, not an alphabet.' },
      { term: 'Sumerian', gloss: 'The older language of this land, dead in the street and alive on the page.' },
      { term: 'nuḫatimmu', gloss: 'A cook. An institutional trade here, not a household one.' },
      { term: 'Mersu', gloss: 'A confection of dates and nuts. The sweet of this country.' },
      { term: 'Samidu', gloss: 'An ingredient named in the broths and still unidentified. Possibly a flour, possibly a plant.' },
    ],
    standing:
      'The three tablets are YBC 4644, 8958 and 4648 at Yale, dated to around 1750 BC. They are the only substantial recipe collection surviving from the ancient Near East, and they give no quantities and no timings. Several ingredients, samidu among them, remain unidentified. Treat any translation as a proposal. Tukulti-Ninurta I of Assyria took Babylon in roughly these years. Deportation of skilled workers is well attested. The exact year is disputed by about a decade, depending on the chronology you follow. Sumerian survived as a written and scholarly language long after it stopped being spoken. Balāṭu and Ubru are invented.',
    related: [
      { to: '/reports/the-iliad-and-the-honesty', label: 'Anniwiya, on a war you have a poem about' },
    ],
  },

  {
    slug: 'the-iliad-and-the-honesty',
    kind: 'letter',
    author: 'anniwiya',
    region: 'aegean',
    place: 'Pylos, and the coast she came from',
    date: '2026-08-26',
    access: 'open',
    title: 'The Iliad and the Honesty',
    standfirst:
      'You have a poem about a war on my coast. It gives eleven hundred ships and ten years, which are a poet’s numbers. I have spent my life counting things people had to carry on their backs.',
    hero: {
      name: 'face',
      who: 'anniwiya',
      scene:
        'Anniwiya standing on an Aegean terrace in clear late light, half turned to the camera, a small bronze balance in one hand and a stone weight in the other. Tall pithoi and a stone wall behind her, deep blue sea and headlands beyond. THE REFERENCE FRAME: her face is clearly lit and fully visible and her pale hazel-green eyes read clearly.',
      alt: 'Anniwiya on a terrace above the sea holding a small bronze balance and a stone weight, a dark scarf thrown back over her left shoulder, tall storage jars behind her.',
      caption: 'I weigh and seal the oil now. Before that I ground the wheat, and before that I lived across the water.',
    },
    card: 'face',
    figures: [
      {
        name: 'straits', at: 3, size: 'col',
        who: null,
        scene:
          'A COMPACT Bronze Age citadel, alive and fully inhabited at first light, on a low flat-topped mound rising only about thirty metres above a wide river plain in north-west Anatolia. SCALE IS CRITICAL AND EASY TO GET WRONG: the walled citadel is SMALL, roughly two hundred metres across, a strong little fortress rather than a vast imperial city. It should read as compact and dense, and the walls should look tall only because the buildings inside them are modest. THE WALLS DOMINATE THE FRAME and their shape is the whole point: the outer face of the dressed pale limestone LEANS INWARD AS IT RISES, a smooth continuous BATTERED SLOPE like the side of a pyramid, several times the height of a person. Square projecting towers and one monumental gateway. Above the sloping stone the wall continues vertically in mud brick. NO crenellations, NO battlements, NO square merlons, NO medieval castle silhouette. INSIDE, large freestanding mud-brick houses on concentric terraces, plastered and washed in warm ochre and white, with FLAT MUD-AND-REED ROOFS. BELOW AND OUTSIDE the citadel, and MUCH LARGER THAN IT, a sprawling LOWER TOWN of packed flat-roofed mud-brick houses covers the slope and the flat ground beyond, holding most of the people, busy with people, carts, donkeys and goats, smoke from many hearths, dyed cloth and drying herbs on the roofs. BEYOND IT the wide green Scamander plain, cultivated in strips, a river winding through marshy ground, HORSES grazing loose in the plain because this is horse country. Far off, the pale line of the Dardanelles strait and the open sea, with one hazy island on the horizon. ABSOLUTELY NOT: no terracotta pantiled roofs, no whitewashed Greek island village, no classical columns, no Roman masonry, no ruins. AND NO TEXT OF ANY KIND ANYWHERE IN THE IMAGE: no caption bar, no title, no label, no date, no letters, no numerals, no subtitle strip along the bottom.',
        alt: 'The citadel of Wilusa at first light: a smooth inward-leaning limestone wall and square towers above a sprawling lower town of flat-roofed mud brick, busy with people and donkeys, with the green river plain and the distant water beyond.',
        caption: 'Wilusa on its mound, above the plain and the road to the crossing. That is the whole of why anybody has ever wanted it.',
      },
      {
        name: 'pithoi', at: 5, size: 'inset',
        crop: '4 / 5',
        who: null,
        scene:
          'A Mycenaean palace storeroom: two rows of pithoi taller than a person sunk into a beaten earth floor, painted plaster walls in soft ochre, narrow-necked stirrup jars stacked along one wall, one shaft of daylight from a high opening. No people. Dust in the air.',
        alt: 'A palace storeroom of pithoi taller than a person sunk into an earth floor, with stacked narrow-necked oil jars along a painted plaster wall.',
        caption: 'This is what a raid is for.',
      },
      {
        name: 'soldier', at: 12, size: 'col',
        who: 'anniwiya',
        scene:
          'Anniwiya laughing, genuinely and helplessly, leaning her shoulder into the shoulder of a young Anatolian soldier of Wilusa who is grinning back at her. They are old friends and it shows. He is in his twenties, dark, sunburnt and good-looking, in a knee-length wool tunic with a boiled-leather corselet over it and a bronze-pinned cloak, a bronze-tipped spear resting in the crook of his arm and his helmet held under the other. HIS KIT IS LATE BRONZE AGE AEGEAN AND ANATOLIAN, of the kind found at Dendra and painted on the Warrior Vase, and it must be right. HELMET: a conical bronze cap sitting close to the skull with small hinged cheek-pieces and a short flap over the neck, its low crest running front to back and lying close, or else a boar-tusk helmet of overlapping curved white tusk plates sewn to a leather cap. BODY: a corselet of thick boiled hide or layered linen, banded and reinforced, worn over a short-sleeved wool tunic, with a fringed or scalloped skirt of stiffened leather strips hanging from it. Bronze greaves on the shins, tied at the calf. ARMS: a long ashwood thrusting spear with a leaf-shaped bronze head. A round oxhide shield with a painted device, or a tall figure-of-eight body shield, slung on his back. PALETTE: bronze and gold, bleached linen white, ochre, red-brown. ABSOLUTELY NOT: no Greek Corinthian helmet with a face mask, no Roman legionary or centurion kit, no gladiator armour, no tall upright horsehair plume or transverse crest, no muscled classical breastplate, no iron of any kind, no chainmail. They stand at the edge of a busy lower-town street of flat-roofed mud brick, with awnings, dyed cloth, a laden donkey and other people passing behind. Warm late afternoon light. Both faces clearly visible and both delighted. This is a photograph of two people enjoying each other rather than a portrait of a warrior.',
        alt: 'Anniwiya laughing with her shoulder against the shoulder of a young grinning Anatolian soldier in a banded hide corselet and bronze greaves, his long spear in the crook of his arm and his conical bronze helmet under the other, in a busy mud-brick street.',
        caption: 'Your poem would call him a hero. He is twenty-four, he is good company, and he owes me for a jar of oil.',
      },
      {
        name: 'figs', at: 10, size: 'col',
        who: 'anniwiya',
        scene:
          'Anniwiya sitting on the stones of a western Anatolian beach in early morning with her scarf pulled forward against the wind, eating dried figs from a cloth in her lap with a piece of barley bread and a wedge of hard sheep cheese beside her. A small boat drawn up and a headland across the water. She is looking at the water, not at the camera.',
        alt: 'Anniwiya sitting on a stony beach in the wind, eating dried figs from a cloth in her lap with barley bread and hard cheese beside her, a boat drawn up behind.',
        caption: 'Figs, cheese, barley bread. A rower’s food, and I have never wanted anything better.',
      },
    ],
    pulls: [
      { at: 6, text: 'A poet five hundred years later did better by us than the clerk in the next room.' },
    ],
    body: [
      'You have a poem about a war on my coast. It gives eleven hundred and eighty-six ships and ten years of fighting. Those are a poet’s numbers. I have spent my life counting things somebody had to lift. Eleven hundred ships is more ships than this sea holds.',
      'My name is Anniwiya. I was born the fourth daughter of a Mycenaean king, which is high enough to eat well and far too low to matter. At fifteen they married me across the water to a lord at Millawanda, to keep a harbour friendly. He held one town and some ships. By the standards of the house I came from he was poor, and I have never pretended otherwise.',
      'Millawanda changed hands three years later, the way it always did. My husband’s house fell with it. I crossed the water a second time at eighteen, and that time I went as property. Then ten years at a grinding stone in the palace at Pylos.',
      'I weigh and seal perfumed oil there now, and I travel with the jars. That is the only reason I go anywhere at all.',
      'Take the map first. Millawanda is on the western coast of what you call Turkey, and you dig it as Miletos. Pylos is at the bottom left corner of Greece. The water between them is three days with a good wind and a fortnight with a bad one, and I have done it both ways.',
      'You call the people I work for Mycenaeans, after a town inland that I have visited twice and was not impressed by. They do not call themselves that. The name is yours, picked because that is where your diggers started.',
      'The place your poem calls Ilios, we call Wilusa. It is a real city on a real headland at the mouth of the straits. It holds the crossing. The Hittite king keeps a treaty with a man there. In the letters you have dug up, his name comes out very close to the one your poem gives the prince who starts the trouble.',
      'You also have a letter from a Hittite king to the king across the water. It mentions the business of Wilusa, over which the two of them went to war. It runs to one line. No year, no numbers, no dead. That is what a war of this kind looks like in a real archive: a clause in somebody else’s correspondence, filed under another subject.',
      'These wars run a season. Ships come in early summer with the wind behind them. They burn what they cannot carry. They take the storerooms and the people, and they leave before the weather turns. Millawanda has had it happen four times that anybody still remembers. Twice it was them from across the water and twice the Hittites. From the harbour the two look identical.',
      'Your poem gets one thing exactly right. It is honest that the fighting is about dividing the take. It is honest that the quarrel setting the whole thing going is two men arguing over a woman counted as somebody’s share. Your poets left that in. Your summaries of it, some of which I have read, tidy it back out.',
      'You should know what our writing is, because a poem is the last thing it resembles. We scratch signs into wet clay tablets the size of a hand, one syllable a sign. We use it to count. Sheep, wheel-pairs, bronze issued to smiths, oil going out, women and their children drawing rations.',
      'Not once did anybody write a story in it. In fourteen years I never saw a letter in it either. It is a stock list kept by a palace that wanted to know what it had. We threw it away and wrote it again every year. The whole of it was meant to last until the audit and no longer.',
      'Here is the part I still turn over. Your diggers found these tablets a hundred years ago and could not read a single sign for fifty years. A man cracked it in the middle of your last century. He was an architect, and he did it in his spare time. He died in a road accident a few years later.',
      'So you have known what my ration list says for about seventy years. Everything you understand about my working life arrived inside the memory of people still alive. Before that I was a pattern of scratches nobody could open.',
      'One difference between us surprised me. The poem gives those women names. Our tablets give a number and a place of origin. I appear in your archive at Pylos as thirteen Milesian women, with six girls and four boys, beside a quantity of wheat and figs. A king’s daughter, filed under the place she was caught in. For ten years that was my name in writing.',
      'Your heroes are ordinary here. A Pylos tablet carries a man called Hektor who holds a piece of land and owes the palace flax. The names in your poem were the names men had on this coast.',
      'Klymenos rows when the palace tells him to row. Last year that meant a month up the coast with thirty others. I asked him about it.',
      '“You keep calling it a war,” he said. “We went, we sat off a beach four days, somebody shot at us, and we came home. Nobody made a poem.”',
      'He is describing the real thing and I know it. Your poem holds the one voyage that got remembered. I hold the other four hundred, in the ration lists, because somebody had to feed the men who went.',
      'Whether anybody burned Wilusa in my lifetime, I could not tell you. It is eight days north of me and I have never been. You have cut the mound open and found nine cities stacked inside it. You argue about which layer your poem is remembering. You argue about whether it remembers anything at all. I have no vote in that and I enjoy watching.',
      'Your poet comes five centuries after me. Five centuries is the distance from you back to men in armour on horses. Whatever reached him about us crossed that gap in songs, one singer to the next, with nobody writing any of it down.',
      'An army on this sea eats barley, hard cheese, dried figs and olives. Those four travel and keep. After that it eats whatever it takes off the last beach. Figs are half of it. We issue them by the sackful and a rower lives on them.',
    ],
    glossary: [
      { term: 'Millawanda', gloss: 'Miletos, on the Aegean coast of Türkiye. Fought over by Hittites and Ahhiyawa.' },
      { term: 'Pylos', gloss: 'A palace in the south-west Peloponnese, Greece. Its tablet archive is the largest known.' },
      { term: 'Wilusa', gloss: 'Ilios, and near certainly Troy. On the headland at the mouth of the Dardanelles.' },
      { term: 'Ahhiyawa', gloss: 'The Hittite name for a power across the water. Widely read as the Achaeans.' },
      { term: 'Linear B', gloss: 'A syllabic accounting script. Deciphered by Michael Ventris in 1952.' },
      { term: 'Mycenaean', gloss: 'A modern label for these people, after Mycenae, where excavation began.' },
      { term: 'Pithos', gloss: 'A storage jar taller than a person, sunk into a storeroom floor. Plural pithoi.' },
    ],
    standing:
      'Wilusa and Ahhiyawa appear in Hittite records and are widely, though not universally, identified with Ilios and the Mycenaean Greeks. The Alaksandu treaty with Wilusa is real. The resemblance to Alexandros is real and is argued over. The Tawagalawa letter refers to a past war concerning Wilusa in one passing clause. Troy at this date is the settlement archaeologists call VIIa, burnt some decades after Anniwiya speaks. Linear B records groups of women by their place of origin, Miletos among them, with their children and their rations, and gives no personal names. The reading that these were captives or purchased labour is likely but inferred. Homeric names do occur on Linear B tablets as ordinary people. The Iliad was written down roughly five centuries later. Anniwiya and Klymenos are invented. Dynastic marriage between Aegean and Anatolian houses is the ordinary diplomacy of this world, and the fall of a lord’s house sending his household into somebody else’s workrooms is the ordinary consequence of losing one.',
    related: [
      { to: '/reports/ugarit-from-warehouse-to-field', label: 'Yadinu, on the shape of the sea all four of us live around' },
    ],
  },
]

/** Where a writer's photograph lives.

    ONE FOLDER PER WRITER, and the folder carries the identity so the filename does not have
    to: `/img/writers/henut/oven.webp` rather than `henut-oven.webp` in a shared pile. Slot
    names repeat across writers on purpose — every one of them has a `face`, and several
    will end up with a `market` — so a flat namespace would force a prefix onto every
    reference and buy nothing.

    `thumb` picks the 420px derivative, which is what the card strip uses. */
export const img = (name, thumb, writer = 'yadinu') =>
  `/img/writers/${writer}/${name}${thumb ? '-thumb' : ''}.webp`

/* NEWEST FIRST, BY DATE — not by position in the array above.

   The front page takes the first entry as its lead, so array order was silently
   load-bearing: adding a post in the wrong place changed what the site led with. Sorting
   here means a new post can be appended anywhere and still lands in the right slot, and it
   means the ISO dates are doing a second job beyond being rendered into BC. */
export const posts = [...fieldReports].sort((a, b) => b.date.localeCompare(a.date))

export const reportBySlug = Object.fromEntries(fieldReports.map((r) => [r.slug, r]))

/* The beat check, run once at import and only in development. A misattributed post is
   invisible on the rendered page — the byline and the region label sit in different corners
   of the layout — so it has to shout somewhere, and the console is where a writer will be
   standing when they have just added the post. */
if (import.meta.env?.DEV) {
  const problems = check(fieldReports)
  if (problems.length) console.error('Post attribution:\n  ' + problems.join('\n  '))
}

/* NOT CURRENTLY USED BY ANY PAGE, and kept on purpose.

   These describe the thirty-one hand-supplied photographs in public/img/yadinu/. They are
   all of Yadinu, from when he was the only writer, and they are still on disk and still
   good. Re-describing thirty-one images is an hour nobody should spend twice. */
export const photoAlt = {
  'landscape-01':
    'Three cooks in a frescoed kitchen, one grinding grain on a saddle quern, bowls of pulses and greens around them.',
  'landscape-02':
    'A kitchen in use: one cook stirring a pot over the fire, another sorting produce at the table.',
  'landscape-03':
    'Bread dough on a floured table beside a domed oven with the fire lit, baskets of onions in front.',
  'landscape-04':
    'An outdoor kitchen with a grinding stone, bowls of herbs and pulses, and a cook working at a low table.',
  'landscape-05':
    'A kitchen table laid with whole fish, pomegranates and herbs, an oven burning behind.',
  'landscape-06':
    'A kitchen with a domed oven, spring onions and root vegetables laid out, storage jars along the wall.',
  'landscape-07':
    'A cook lifting a bowl from a cauldron set over an open fire, another reaching in with a spoon.',
  'landscape-08':
    'Two cooks kneading dough at a long table in a frescoed room, bowls of grain and olives beside them.',
  'landscape-09':
    'A cook tasting from a spoon over a cauldron, the table in front covered with onions, herbs and jars.',
  'landscape-10':
    'Hands working a stone mortar and pestle, with olives, figs and greens in bowls around it.',
  'landscape-11':
    'Three cooks at a table of dough and bowls, a fire burning in the hearth behind them.',
  'landscape-12':
    'A cook tasting from a bowl beside a stone mortar, a wide spread of dishes and the sea beyond.',
  'landscape-13':
    'A kitchen terrace above the sea: dough being shaped, a quern in use, an oven alight.',
  'landscape-14':
    'An open terrace over the water, oil being poured into a dish, olives and onions on the table.',
  'landscape-15':
    'A colonnaded room with three people eating, bowls of spices and pulses spread across the table.',
  'portrait-01':
    'Yadinu eating from a bowl at a quayside table spread with figs, olives and bread, ships behind him.',
  'portrait-02':
    'Yadinu holding up a round loaf outside a bakery, baskets of bread at his feet and a baker watching.',
  'portrait-03':
    'Yadinu sitting on a ship’s deck eating from a plate, open sea and a sail behind him.',
  'portrait-04':
    'Yadinu tasting something in a market stall hung with painted jars, baskets of onions and greens beside him.',
  'portrait-05':
    'Yadinu leaning over a large cauldron in a smoky kitchen, spoon raised, a cook opposite him.',
  'portrait-06':
    'Yadinu standing in a busy port beside bowls of green herbs and cooked food, boats drawn up behind.',
  'portrait-07':
    'Yadinu holding a flatbread in a bakery courtyard, domed ovens and stacked rounds of bread around him.',
  'portrait-08':
    'Yadinu at a quayside kitchen with a wide cauldron, baskets of dates and onions in front.',
  'portrait-09':
    'Yadinu in a harbour market beside a slab of fish and a basket of bread.',
  'portrait-10':
    'Yadinu raising a cup in a street of wine jars, a woman carrying a tray behind him.',
  'portrait-11':
    'Yadinu holding a bowl on a busy waterfront, a ship with a red sail behind and figs in the foreground.',
  'portrait-12':
    'Yadinu holding up a round loaf in a grain storeroom, sacks and baskets of grain stacked around him.',
  'portrait-13':
    'Yadinu reading a clay tablet by a doorway, bowls of grain and storage jars beside him.',
  'portrait-14':
    'Yadinu holding a cup on the bank of the Nile, painted walls behind him and bread and fish on the table.',
  'portrait-15':
    'Yadinu seated among stone buildings with bread and figs in front of him.',
  'sheet-01':
    'A sheet of captioned portraits: Yadinu writing on a clay tablet, eating porridge aboard ship, holding up an onion in a crowded market, smelling a flatbread, drinking from a cup, and standing over a city with his arms spread.',
}
