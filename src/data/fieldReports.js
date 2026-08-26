// Yadinu's posts. The home page is built from this file.
//
// TWO KINDS, and the page keeps them apart:
//   'letter'  orientation — who is writing, what this world is. A first-time reader
//             meets these before anything else.
//   'report'  the test kitchen and the sites. What was tried, what failed, what had
//             to be revised. These are the substance.
//
// `recipe` links a report to the dish it came out of. Letters have no recipe.
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
//   pulls     a lifted line, set large, breaking the column at `at`
//   related   other posts worth reading next, as {to, label}. Rendered as links under the
//             article: the body is plain strings so a link cannot live inside a paragraph,
//             and adding markup to the prose to get one there would be a poor trade.
// Every image carries its own alt AND its own caption. They are different jobs: alt
// describes the picture for someone who cannot see it, the caption says something the
// picture does not.

/* YADINU'S CALENDAR.

   He does not date things in our years, so the site does not show them. `date` is stored as
   an ISO string — sortable, unambiguous, and the thing a machine should hold — and rendered
   into his reckoning at the point of display.

   THE OFFSET: our 2026 is his 1226 BC. Both calendars run forward at the same rate, but BC
   years count down as CE years count up, so his year is 3252 minus ours: 2027 will be 1225
   BC, 2028 will be 1224 BC. Stated as arithmetic rather than as a lookup table so it keeps
   working without anybody remembering to extend it. */
const YADINU_EPOCH = 3252

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/** '2026-08-25' -> '25 August 1226 BC'. Parsed by hand: `new Date('2026-08-25')` is UTC
    midnight, which in any negative timezone renders as the day before. */
export function yadinuDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${MONTHS[m - 1]} ${YADINU_EPOCH - y} BC`
}

export const fieldReports = [
  {
    slug: 'the-wall-and-the-canal',
    kind: 'report',
    card: 'terqa-talk',
    title: 'The wall and the canal are the same thing',
    region: 'mesopotamia',
    place: 'Terqa, on the middle Euphrates',
    date: '2026-09-14',
    access: 'open',
    recipe: 'dried-river-fish-with-onions-terqa',
    related: [
      { to: '/reports/they-took-the-people-too', label: 'Why I was walking alone' },
      { to: '/reports/the-road-is-made-of-donkeys', label: 'The caravan that started this' },
    ],
    standfirst:
      'A band of green an hour wide, a wall around what it grows, and a channel that has to be dug out by hand every spring. A week in Terqa, watching the three of them hold each other up.',
    hero: {
      name: 'terqa-arrival',
      alt: 'Yadinu standing with a staff on a dry ridge above a river valley, looking down at a long mud-brick walled city with the Euphrates and a strip of green fields and palms behind it.',
      caption: 'The green ends without gradation. Past that edge it is thorn and stone for as far as the eye follows it.',
    },
    figures: [
      {
        name: 'terqa-gate', at: 2, size: 'col',
        alt: 'A high mud-brick city wall with a towered gateway, donkeys and people passing in and out along a dusty track, animal pens beside the road.',
        caption: 'A man in a striped mantle sat here with a tablet on his knee, writing down the names of those coming in. He asked mine twice.',
      },
      {
        name: 'terqa-market', at: 5, size: 'col',
        alt: 'A crowded market street with baskets of grain, pulses and dried fruit, split dried fish laid out on a table, stacked pottery, and traders and shoppers among the awnings.',
        caption: 'Three streets and part of a fourth. Almost nobody here grew what they are standing behind.',
      },
      {
        name: 'terqa-talk', at: 1, size: 'inset',
        crop: '4 / 5', pan: [-6, 2], zoom: 1.5,
        alt: 'Yadinu standing among a group of market people seated around baskets of dates, olives and flatbreads in low evening light, one man talking with both hands raised.',
        caption: 'An hour on the water schedule, of which I understood perhaps half. The argument was about the order, never about the digging.',
      },
      {
        name: 'terqa-evening', at: 9, size: 'col',
        alt: 'A lamplit interior at night: a bearded man standing mid-story with his arms spread, a crowd of adults and children sitting on rugs around him, food set out on the floor.',
        caption: 'Thirty people on rugs, the food going round twice, and nobody taking a fee at the end of it.',
      },
    ],
    body: [
      'The ridge above Terqa carries a path worn a hand’s depth into the limestone. From it the city appears all at once: mud brick on the west bank, the river behind it carrying a great deal of afternoon light, and between the two a band of cultivation about an hour’s walk across. The band ends without gradation. Past its edge the ground is thorn and stone, and it continues in that condition for as far as the eye can follow it.',
      'Inside the band there is barley, date palms in rows, and small fields of onions divided by low earth walls. Water reaches them along channels that leave the river above the town and run beside it, dropping slightly as they go, so that in several places the channel runs higher than the field it serves. Men were working in one of them as I came down. They stood knee-deep in wet silt, lifting it out in baskets and stacking it on the bank, where it dried grey. They do this every spring. If they stopped, the fields would be steppe inside two years.',
      'I entered at dusk behind a line of donkeys. At the gate a man in a striped mantle sat with a tablet on his knee, writing down the names of those coming in. He asked mine twice and got it wrong both times. Nineteen days earlier I had been robbed in the mountains, and had slept four nights afterwards on open ground. The street inside the gate was lit and crowded. I slept without waking.',
      'The same hand writes at the gate, in the granary, and on the canal roster. I know this because the hand was mine for eleven years, in a palace store at Ugarit, counting jars in and jars out. I thought of myself then as a man who was good with jars.',
      'What the granary is for is not obscure once you stand in front of it. Grain beyond what a household eats has to be put somewhere; what is put somewhere has to be guarded; the guards do not farm and so are fed from the store; and the store is therefore counted, and the counting is written down. The wall around this city and the channel above it are held up by the same tablets.',
      'The market runs three streets and part of a fourth. Grain in open baskets, lentils, chickpeas, dates by the bushel off the downriver boats, sesame oil, wool, salt, onions plaited into ropes, stacked pots, and a long trestle of split dried fish going brown at the edges. A woman selling dates told me she had never seen the trees they came from. Almost nobody here grew what they are standing behind.',
      'A house in this city burned down some five hundred years before I was born. You excavated it, and in a jar in it you found something you have disagreed about ever since; if it is what one party says it is, it came four thousand miles from islands nobody in my world has heard of. The disagreement is unresolved and I am content to leave it there.',
      'The salt is harder to see than the silt and works the same way. Water spread on a field and left to evaporate leaves behind what it carried. In the south, where this has gone on longest, the wheat has given way to barley and the bread has gone darker. Here the river runs faster and the fields are younger and the change is slower. How much of the southern story is salt and how much is politics is argued over; that the ground grows saltier is not.',
      'Supper was dried fish off the trestle, soaked overnight, with four onions cooked slowly in sesame oil until they collapsed and went gold, cracked grain stirred through, and the fish folded in at the end in large flakes. Sumac over it, and bread. The onions take half an hour and the dish does not work without them, the fish having salt and no sweetness of its own.',
      'Last night, in a courtyard off the third street, a man told a story to about thirty people sitting on rugs. Children slept against their mothers. Food went round twice. Nobody paid him and nothing was written down. He finished a little before midnight and everyone went home along a lit street, inside a wall, on ground watered by a channel that will need digging out again in the spring.',
    ],
  },
  {
    slug: 'they-took-the-people-too',
    kind: 'report',
    card: 'robbed-teaching',
    title: 'They took the people too',
    region: 'levant',
    place: 'The hills southeast of the Belan pass',
    date: '2026-08-26',
    access: 'open',
    recipe: 'hillside-greens-with-soured-milk',
    related: [
      { to: '/reports/the-wall-and-the-canal', label: 'Where I got to, nineteen days later' },
      { to: '/reports/the-road-is-made-of-donkeys', label: 'The caravan, four days before this' },
    ],
    standfirst:
      'They took eleven donkeys, four tonnes of copper and every person in the caravan except me. The four days that followed were spent finding out what a hillside is worth.',
    hero: {
      name: 'robbed-raiders',
      alt: 'Four armed men on a mountain track, two carrying long spears and two carrying round shields of woven wicker and stretched hide, standing over baskets and packs that have been set down on the stones.',
      caption: 'Look at the shields. Men who have decided to rob somebody on the way past do not carry shields.',
    },
    figures: [
      {
        name: 'robbed-taken', at: 2, size: 'col',
        alt: 'Yadinu crouched low behind a rock in the foreground, watching a line of people and donkeys being walked away along a hillside track by men with spears.',
        caption: 'I followed for about an hour at a distance that would not get me noticed twice. Šimatum is the small dark shape near the front, still arguing.',
      },
      {
        name: 'robbed-foraging', at: 6, size: 'inset',
        crop: '4 / 5', pan: [-6, 1.5], zoom: 1.1,
        alt: 'Yadinu kneeling on a stony hillside with both hands working into a low thorny shrub, stripping small pale fruit from it, dry hills stretching away behind him.',
        caption: 'Two hours of this fills a basket once. Nobody gathers who has any alternative at all.',
      },
      {
        name: 'robbed-teaching', at: 8, size: 'col',
        alt: 'Yadinu sitting on the ground holding up a sprig of herb and talking to a young woman and an older man, with a jug, a basket of olives, greens and figs spread on the rock in front of them and sheep behind.',
        caption: 'The trade: they had milk and bread and a fire, and I had four days of very close attention to a hillside.',
      },
    ],
    pulls: [
      {
        at: 5,
        text: 'They priced every person on that track. What they priced me at was nothing, and I have been turning that over ever since without settling whether it is an insult.',
      },
    ],
    standing:
      'Gathered food leaves almost no trace and no recipe. What you do have is that ship off Uluburun, which went down carrying sumac, terebinth, figs, olives, almonds, pine nuts, grapes and coriander — every one of which grows wild on the hill I was stuck on. So the ingredients are not a guess. The bowl is.',
    body: [
      'We had come up over the Belan pass and turned southeast into the hills, which is the whole reason for what happened next. The direct road east runs across steppe — flat, open, and in August dry enough that Šimatum did not trust the wells. You can lose animals on a dry road, and a dead donkey is eighty kilos of cargo that somebody else now has to carry. So she took the long way round through the hill country, where there is water. There is also cover, and she had been weighing those two things against each other for twenty-two years. This time the sum came out wrong.',
      'They came down off the slope on both sides of the track at once, where it narrows, and it was over before I had understood that it was starting. Eight or nine men with long spears, and no shouting from anybody. They did not charge and nobody fought them. Šimatum said one sentence I did not catch, then put her hands out flat with the palms down. The two hired men did the same. That was the robbery.',
      'They took the donkeys, and then they took the people, which is the part that surprised me and the part that matters. Nobody was hurt. A dead merchant is worth nothing to anybody; a live one is worth whatever somebody will pay to get her back. These men were not lunatics on a hillside but a business with a fee structure. The copper was a bonus. The people were the asset.',
      'They did not take me, and it took most of a week before I stopped being annoyed about that and started finding it interesting. Their leader asked whose man I was. I said I was nobody’s, which was true and was also the worst answer available. He asked what I was carrying and I said notes; he looked at the notes. Then he asked which city would pay for me, and I stood in the sun working out in front of him that the honest answer was none of them. He had moved on before I finished, having asked the question only in order to arrive there. I was not spared out of mercy. I was assessed at nothing and set down like a bad ingot.',
      'I followed them for an hour, keeping low and well back, until the track dropped into a valley I did not know and I understood that all I was achieving was getting further from water. After that it was very quiet. I was alone in the mountains with a cloak, a knife, an empty skin and no clear idea which side of the ridge I was on.',
      'What I learned over the four days that followed is the reason this is a food report rather than a complaint. A dry hillside in late August looks like nothing — brown, spiny, finished. It is in fact the best-stocked larder of the year, and it looks empty only because everything on it is small, sour and close to the ground.',
      'Sumac first, because sumac saved me. The red drupes are ripe now in fat velvety clusters and are pure sourness; you can chew them straight off the shrub, which in a landscape with no lemon in it is not a small thing. Purslane grows out of cracks in the rock, stays fat with water in the exact month everything else has gone to seed, and tastes faintly of salt. Terebinth gives an oily, resinous nut. Capers are worth having only if you will soak the bitterness out of them for a day, which on the first day I would not. Wild figs split open on trees nobody planted. Mallow is dull and slightly slimy and will keep you alive. Almonds are the ones that will hurt you: bitter and sweet grow on the same hillside and look identical, the only warning is the taste, and if it is bitter you spit it out rather than persevering. Oleander is everywhere, is beautiful, and must not be touched in any form whatever, including the smoke off it.',
      'On the fourth morning I came over a saddle and found sheep, and behind the sheep two people and a fire. They were a girl of about sixteen and her grandfather, three days from anywhere, working a flock across the high ground while the low pasture was burnt off. I have rarely been so pleased to see anyone.',
      'I had assumed I would be a beggar at that fire, and instead I turned out to be the one with something to give. They were shepherds rather than gatherers. Their food came off the flock — milk, curd, hard bread carried up from below — and they had walked past that sumac every day of their lives without thinking about it. So I emptied the basket out on the rock and went through it a pile at a time. The girl made me do the whole thing again from the beginning, and by the end she was correcting me about where the good fig trees were, which was fair enough, since she lives there and I do not.',
      'What came out of it was this. Purslane raw, mallow softened for a minute and wrung out, both folded through their soured milk with salt and a hard pour of oil; sumac over the top until the whole surface went pink; cracked terebinth; figs torn open; hard bread to scoop with. It goes sour, then salty, then briefly sweet wherever a fig is, and it cost nobody anything at all. Four days earlier I had been eating out of the stores of a caravan carrying four tonnes of copper. This was better. I am aware of how that sounds, and I am going to leave it where it is.',
      'Word came up to the shepherds on the sixth day, the way word does. The town below the pass had paid, not out of kindness but out of exposure. A city is answerable for what happens to merchants on its ground. Šimatum was carrying somebody else’s copper under somebody else’s seal, so if she vanished in their hills the letters would start — first from her partners, then from her city, then from a king — and a claim of that kind gets settled in silver whatever the town admits to. The headman paid, and will spend the next two years getting it back off the road in tolls. That is not a moral system. It is a working one, and it is why the copper road exists.',
      'They came out yesterday, all five of them, without donkeys or copper, and Šimatum reportedly in a temper of legendary proportions about one particular pack-frame rather than about the cargo. Everyone agrees that is very much her. She is going down to the coast to file the loss and start again. I have not stopped noticing that a town paid good silver for five people and would not have paid a shekel for the sixth, who was standing in front of them. I am going east on my own feet, and I am taking a basket.',
    ],
  },
  {
    slug: 'she-never-hits-the-geese',
    kind: 'report',
    card: 'tavern-spread',
    title: 'She never hits the geese',
    region: 'levant',
    place: 'A harbour on Alašiya',
    date: '2026-06-21',
    access: 'open',
    recipe: 'seared-cheese-on-the-copper-pan',
    related: [
      { to: '/reports/never-out-of-sight-of-land', label: 'The crossing that got me here' },
    ],
    standfirst:
      'Alašiya makes copper for the whole of our world and it looks and smells like it. The woman who fed me in the harbour had views about what I was writing down.',
    hero: {
      name: 'tavern-spread',
      alt: 'A tavern table at night loaded with bowls of chickpeas, olives, white cheese, red onions, garlic, nuts and dates, with drinkers behind and a harbour full of lit ships beyond.',
      caption: 'Kuparra’s table near midnight. She fed nine people in the time it took me to write this down.',
    },
    figures: [
      {
        name: 'tavern-geese', at: 4, size: 'col',
        alt: 'The tavern keeper mid-stride at night with her arm cocked, throwing something at a group of geese that are scattering with wings spread, the lit harbour behind her.',
        caption: 'Third time that evening. She has never missed and she has never hit one, and the second of those is deliberate.',
      },
      {
        name: 'tavern-pan', at: 6, size: 'inset',
        crop: '1 / 1', pan: [-3.1, -5], zoom: 1.1,
        alt: 'Yadinu cooking on a wide flat metal pan over an open flame while the tavern keeper pours from a jug, the night harbour behind them.',
        caption: 'Flat metal laid straight over the flame. On an island that makes copper by the tonne it is the cheap option, not the good one.',
      },
      {
        name: 'tavern-herbs', at: 7, size: 'inset',
        crop: '4 / 5', pan: [-0.3, -2], zoom: 1.04,
        alt: 'Close view of Yadinu scattering herbs into a copper pan over a flame while the tavern keeper watches with her chin on her hand.',
        caption: 'She let me cook once and watched the whole of it from that position without saying anything.',
      },
      {
        name: 'tavern-serve', at: 8, size: 'col',
        alt: 'Yadinu setting down a wide shallow bowl of greens and chickpeas on the tavern table beside bread, olives, white cheese and a large jug.',
        caption: 'Fifteen minutes from cold metal to this. Nine people were waiting for it.',
      },
    ],
    pulls: [
      {
        at: 8,
        text: '“You have been thinking about geese,” she said. “I have been carrying plates.”',
      },
    ],
    body: [
      'The crossing took a day and a half. You lose the land behind you in the middle of the morning and nothing appears in front of you until the following afternoon, and between those two moments there is a great deal of water and nothing to look at. Nobody sang. Two of the crew slept the whole way, which I took at the time for indifference and now think was a decision. I ate cold chickpeas on cold bread and thought about how much of what I have been calling seafaring is walking beside a very wet road.',
      'Alašiya is not what I had pictured and probably not what you have. The smoke shows from well out at sea, standing in a line over the low hills inland. What you meet on landing is not a market but slag: heaps of it, glassy black and cold, tipped out of a furnace and never moved again. This island makes copper for the whole of our world, and it looks and smells like what it is.',
      'The tavern stands on the harbour and does not appear to close. I got there late enough that the ships were lit and the drinkers had reached the stage of the evening where they explain things to you. The woman who runs it is called Kuparra, or near enough. I wrote the name down and she read it over my shoulder and laughed at me for some time.',
      '“That is not it,” she said. I asked what it was. “Not that.” She took the cup out of my hand, refilled it, and went back to work. We were both speaking Akkadian, which belongs to neither of us. Nearly all business in this sea is done in a language nobody at the table grew up in, and the effect is to make everyone shorter with each other and, as far as I can tell, more honest. You lose the words for softening a thing. Nobody on this island can read the writing of this island — a few hundred inscriptions, no key, and no agreement about what language sits underneath — so it is unlikely that anyone will ever correct me, including her.',
      'She spent the evening throwing stones at geese.',
      'A flock works the harbour, going through the baskets while everyone is busy. About every half hour Kuparra put down whatever she was holding, walked out into the dark with a stone, and threw it flat and hard into the middle of them. The geese went up in a shrieking mess and settled again forty paces off. She never hit one. I watched for most of the evening, and I do not believe she has ever hit one. I said something to her about it being a kind of understanding between her and the geese. “It is not an understanding.” She was wiping a board and did not look up. “If I hit one I have to pluck it. I am working.” The word she used for pluck was the wrong one — it is the word for stripping bark — and she knew it was wrong and used it anyway, twice more that evening. I said that was a good deal less romantic than what I had been thinking. “You have been thinking about geese,” she said. “I have been carrying plates.”',
      'She grew up two hours inland beside a smelter, which accounts for the other thing about her kitchen. She does not cook in clay. She cooks on a flat sheet of metal laid straight over the flame, and on an island that produces copper by the tonne that is not a luxury but the cheap option. Everyone here has one. It changes the cooking entirely. Clay gives up its heat slowly, which is why nearly everything I have cooked this year is a stew, a braise or a long bake; metal hands it over at once, and you can burn a thing on purpose in fifteen seconds. I put some of this to her, at length. “It is a pan,” she said.',
      'What she does with it is cheese. Firm fresh sheep cheese, sliced thick and dried on a cloth, laid onto a dry screaming-hot sheet with no oil at all and left alone for a minute and a half a side while a dark crust builds on it. Then the oil goes in, then onion rounds, then a heap of bitter greens turned through the fat until they collapse, and the cheese back on top with olives and a hard pour of oil. Bread. Fifteen minutes, which anywhere else on this journey would not get an onion soft.',
      'Salt, char, bitterness, and the squeak of the cheese against the teeth. I have eaten a great deal of carefully simmered food this year and a hot sheet of metal with four things on it beat most of it. Every fried thing you have ever eaten descends from somebody having hot metal to hand, and on this island that happened early, for reasons that had nothing to do with dinner.',
      'Late on she asked what I was writing. I said I was writing down what people eat, so that it would be known a long time from now. “By who?” I told her as well as I could. She stacked cups while she thought about it, and then said that if that was what I was doing, I should not write about the pan. I asked what I should write instead. “That it was loud. That I was tired. That the food was good and there was enough of it.” She put the cups down. “Nobody remembers a pan.”',
      'I left in the morning. As we pushed off she was out on the stones with her arm back, and the geese went up, and she went in.',
    ],
  },
  {
    slug: 'the-road-is-made-of-donkeys',
    card: 'copper-share',
    kind: 'report',
    title: 'The road is made of donkeys',
    region: 'mesopotamia',
    place: 'The Euphrates road, east of Emar',
    date: '2026-08-25',
    access: 'open',
    recipe: 'caravan-pot-with-dried-curd',
    related: [
      { to: '/reports/they-took-the-people-too', label: 'What happened to this caravan four days later' },
      { to: '/reports/never-out-of-sight-of-land', label: 'The sea leg of the same copper road' },
    ],
    standfirst:
      'A trade route on a map is a line. On the ground it is eleven animals, five people, and a great deal of arithmetic about fodder.',
    hero: {
      name: 'copper-ingots',
      alt: 'A group seated on a stony hillside around bowls of pulses, onions, olives and curds, with four grey oxhide-shaped copper ingots laid out on the ground beside them and laden donkeys behind.',
      caption: 'The grey slabs are the reason everyone is here. Everything else is logistics.',
    },
    figures: [
      {
        name: 'copper-leader', at: 2, size: 'inset',
        crop: '4 / 5', pan: [2.2, 7.5], zoom: 1.15,
        alt: 'Šimatum, an older woman in a heavy blue-grey mantle, standing beside a laden donkey with dry mountains behind her.',
        caption: 'Šimatum, who has done this run for twenty-two years and can price a donkey across a field.',
      },
      {
        name: 'copper-pot', at: 5, size: 'inset',
        crop: '1 / 1', pan: [1.4, 0], zoom: 1.15,
        alt: 'Yadinu and Šimatum crouched over a steaming cooking pot on the ground, her scattering something into it.',
        caption: 'The dried curd goes in off the heat. This is not a refinement; boil it and the pot splits.',
      },
      {
        name: 'copper-fire', at: 6, size: 'col',
        crop: '3 / 2', pan: [22.5, 0], zoom: 1.45,
        alt: 'Yadinu stirring a pot over a small fire on stony ground, the caravan seated around him with bowls of onions, pulses and olives, laden donkeys and a hillside behind.',
        caption: 'One fire, one pot, five people, and a great deal of opinion about the pot.',
      },
      {
        name: 'copper-share', at: 7, size: 'inset',
        crop: '1 / 1', pan: [-20.3, -22.5], zoom: 1.45,
        alt: 'Šimatum holding out a filled bowl across the fire, with more bowls of onions, olives and pulses set out on the ground and the donkeys behind.',
        caption: 'Served in the order people will be woken in. There is a logic to everything on a road.',
      },
    ],
    pulls: [
      {
        at: 4,
        text: 'A donkey eats a fraction of its own cargo every day it walks. That single sum decides what is worth carrying overland and what is not.',
      },
    ],
    standing:
      'The merchant letters you have from us are astonishingly detailed about caravans — the loads, the fodder costs, the tolls, the escorts, the arguments with partners at home, the ones that open by reporting a consignment robbed. Not one of them mentions what anybody ate. So this pot is reconstructed from the shipping list rather than from a recipe: it contains only things that demonstrably travelled, cooked the only way one fire and one vessel allow. That is a narrower kind of guess than usual, and I will take it.',
    body: [
      'I left the coast with a caravan and I have been walking east for eleven days. The road runs inland from the ports, picks up the Euphrates, and then simply follows it — down through Emar, where everything crossing between the sea and the rivers has to change hands, and on toward the cities. It is not a road in the sense of a built thing. It is a habit that a great many feet have agreed on.',
      'Eleven donkeys, five people. Šimatum runs it and has run it for twenty-two years, since her husband did it and then stopped being able to. She is somewhere past fifty, wrapped against dust in a blue-grey mantle that has cost more than everything I own, and she can look at a donkey across a field and tell you what it is worth and what is wrong with it. The other four are her nephew, two hired men and a boy.',
      'The load is copper. Oxhide ingots, the same four-horned slabs I watched come off a ship on the coast a fortnight ago. It is easy to talk about a trade route as though it were one thing. It is not. It is a sea leg and then a land leg, with a town in between whose entire purpose is the handover, and the cost structure of the two halves is so different that they may as well be different industries.',
      'Here is the arithmetic, which Šimatum explained to me twice with the patience of a woman who has explained it to a great many men. A donkey carries about eighty kilos. It walks perhaps twenty-five kilometres in a day. It must be fed and watered whether it is loaded or empty, and on a long haul through dry country the fodder either comes with you — taking up load — or gets bought along the way, at whatever the man beside the well decides today’s price is.',
      'So the sum that governs everything is the ratio of what the cargo is worth to what the animal costs to move. Copper clears it easily. Tin clears it. Textiles clear it, which is why cloth turns up in merchant letters far more than you would expect from something so unglamorous. Grain does not clear it, not overland, not ever — by the time you have fed the donkeys carrying grain across three hundred kilometres you have eaten a serious fraction of the grain. That is why the sea wins every time the sea is an option, and why the inland cities are hungry for exactly the things a ship cannot easily reach them with.',
      'Which brings me to supper, because supper is governed by the same sum.',
      'Nothing fresh travels. What comes off the donkeys at the end of the day is a strange, short list: cracked grain, dried pulses, oil in a sealed jar, salt, dried fruit, and dried sour curd — milk that has been fermented, drained, salted, shaped and dried until it is effectively a rock. Break a piece into warm water and twenty minutes later you have something between yoghurt and cheese. It is the single cleverest thing I have met on this journey. It is a way of carrying a dairy herd in a saddlebag.',
      'The pot: onions cooked slowly in oil with cumin while the animals are watered, cracked grain turned in the oil, water, twenty-five minutes. Then off the heat entirely, and the soaked curd stirred through — off the heat because sour dairy splits if it boils, and a split pot at the end of eleven hours is a real misfortune. Torn dried apricots at the end. Salt. It is sour and deep and much better than a bag of dry goods has any business producing, and everyone had opinions about it, all of them different, all delivered with force.',
    ],
  },
  {
    slug: 'a-meal-for-someone-who-does-not-eat',
    card: 'mennefer-offering',
    kind: 'report',
    title: 'A meal for someone who does not eat',
    region: 'egypt',
    place: 'Mennefer',
    date: '2026-08-01',
    access: 'open',
    recipe: 'roast-duck-for-the-gods-table',
    related: [
      { to: '/reports/egypt-without-the-temples', label: 'The same country, four days downriver' },
    ],
    standfirst:
      'Upriver from the Delta and into the exact postcard I spent last week avoiding: a temple kitchen under the pyramids, cooking dinner every day for a statue.',
    hero: {
      name: 'mennefer-kitchen',
      alt: 'A temple kitchen with baskets of grain, greens, garlic, dates, conical bread moulds and a plucked bird on a board, with the pyramids visible through the open doorway across the river.',
      caption: 'The doorway is not a metaphor. That is genuinely the view from the chopping board.',
    },
    figures: [
      {
        name: 'mennefer-priest', at: 2, size: 'inset',
        crop: '1 / 1', pan: [-6.5, 3.2], zoom: 1.16,
        alt: 'Yadinu and a shaven-headed priest in white linen with a broad beaded collar working together to season a plucked bird on a dish.',
        caption: 'Nakht. Shaven everywhere, on principle, and the most precise cook I have watched.',
      },
      {
        name: 'mennefer-table', at: 4, size: 'inset',
        crop: '1 / 1', pan: [-1.3, -7.5], zoom: 1.15,
        alt: 'The two of them working at a long table of greens, dates, garlic and conical bread moulds, the pyramids framed in the doorway behind.',
        caption: 'The cones are bread moulds. Egypt has been baking in that exact shape for a thousand years already.',
      },
      {
        name: 'mennefer-offering', at: 5, size: 'col',
        alt: 'An offering table laid with a glazed roast bird, a bowl of pulses scattered with green herbs, round and conical loaves, baskets of dates and figs, spring onions and sealed jars, with incense smoke rising and an oven glowing behind.',
        caption: 'The god’s portion, arranged and censed. Nobody will touch it for an hour.',
      },
      {
        name: 'mennefer-senet', at: 7, size: 'inset',
        crop: '4 / 5', pan: [0, -4], zoom: 1.3,
        alt: 'The priest sitting cross-legged on a reed mat playing a game of senet on an inlaid wooden board, palms and the pyramids behind him.',
        caption: 'The hour in the middle. He plays both sides and says he usually wins.',
      },
    ],
    pulls: [
      {
        at: 6,
        text: 'The god eats first. Then the god’s dinner is carried back out and divided among the staff, which is how a great deal of literate Egypt got lunch.',
      },
    ],
    standing:
      'Offering lists tell you exactly what was presented — bread by type, beer, wine, oxen, fowl, incense, cloth — and the ritual texts tell you how it was set down and taken away. Neither tells you how a single item was cooked, and neither was ever meant to. The salt, the poured-off fat and the honey glaze are mine, built out of Egyptian ingredients and the one requirement the texts do make unmistakable, which is that the thing had to look right. What is not mine, and what your own temple accounts spell out plainly, is the reversion. They really did feed the god first and eat it afterwards.',
    body: [
      'Four days upriver from the Delta and I am standing in the postcard. Mennefer is an old capital and an enormous working town, and behind it on the desert edge are the pyramids, which are not new. They are about twelve hundred years old. The people who built them are as far back from the priests I met this week as those priests are from you. Everyone here treats them the way you treat a mountain — as scenery with a bit of history on it.',
      'I came for the contrast and I got more of it than I bargained for. Last week I was in a one-room house watching a woman boil cracked grain for her family. This week I am in a temple kitchen watching four men prepare a meal, with great care and no hurry, for someone who is not going to eat it.',
      'Nakht is a wab-priest, which is a rank low enough that he does actual work and high enough that he is inside the wall. He is shaved smooth over his whole head and body, which is a purity requirement and, he points out, extremely practical in a kitchen. He is the most precise cook I have watched anywhere. Not the best — precise. He measures with his hands the way a scribe rules a line.',
      'The routine is a household routine performed at enormous expense. The god is woken in the morning, washed, dressed, and offered food. The offering is set down before him, incense is lit, a text is spoken, and then everyone withdraws and the god has his meal in private. Later the table is cleared. That is the day, every day, and it has been the day for centuries.',
      'What goes on the table on the day I am there: a roasted bird, a bowl of pulses with green herbs over them, bread in two shapes, dates, figs, onions, a jar of beer and a jar of wine. It is a good meal by any standard. It is also, and this is the part that took me a while to see, arranged rather than served — the bird whole and glazed dark, the loaves stacked, the greens laid around the edge. It is composed to be looked at, because the first thing that happens to it is that a man sets it down in front of a statue and steps backwards out of the room.',
      'That changes the cooking, and I did not expect it to. The bird is salted hard and dry so the skin will crisp rather than sag. It is roasted low for an hour and a quarter and the fat is poured off twice. Then the heat goes right up and it is brushed with honey warmed in wine, twice, ten minutes each, until the skin is dark and glassy. Every one of those decisions is about how it will look on the dish. And the annoying thing, the thing I have been chewing on since, is that it produces a better bird than aiming straight at flavour would.',
      'Then the reversion, which is my favourite fact in Egypt. The god does not consume the offering, and the offering is not thrown away or burnt. It comes back out and is divided — among the priests, the singers, the doorkeepers, the people who carried it in. A temple is a religious institution and it is also, in strictly practical terms, an extremely large catering operation with a very unusual first customer. The offering table is the point at which the whole economy of a temple turns back into dinner.',
      'I ate some of it. It was excellent. Nakht ate rather more of it than I did and then went and sat on a mat and played senet against himself, which is what the middle of the day is for, and told me he usually wins.',
    ],
  },
  {
    slug: 'never-out-of-sight-of-land',
    kind: 'report',
    card: 'alashiya-spread',
    title: 'We never lost sight of land',
    region: 'levant',
    place: 'The Cilician coast, working south',
    date: '2026-06-13',
    access: 'open',
    recipe: 'brazier-chickpeas-alashiya',
    standfirst:
      'Everyone pictures a Bronze Age ship crossing open water. Almost nobody did it who had any choice. We go down the coast like a cart goes down a road — and at the end of this one, we will have to let go of it.',
    hero: {
      name: 'alashiya-deck',
      alt: 'Yadinu and a young curly-haired crewman sitting on a ship’s deck beside a low table of olives, flatbread and herbs, with a clay firebox burning beside them and a headland close behind.',
      caption: 'The land in the background is the whole point of this piece.',
    },
    figures: [
      {
        name: 'alashiya-mortar', at: 3, size: 'inset',
        crop: '4 / 5', pan: [-14, 4], zoom: 1.7,
        alt: 'A young crewman grinding herbs in a stone mortar on deck while Yadinu works beside him, the firebox glowing behind them.',
        caption: 'Abdi, who does the cooking because he is the youngest and lost an argument about it years ago.',
      },
      {
        name: 'alashiya-mise', at: 4, size: 'col',
        alt: 'Ingredients laid out on a deck plank: flatbread, a bowl of fresh curd, an onion, garlic, dates, a bowl of chickpeas, olives, a large bundle of green herbs and a jug of oil, with tall storage jars behind.',
        caption: 'Bought this morning off a beach, which is a thing you can only do if you are never far from one.',
      },
      {
        name: 'alashiya-spread', at: 5, size: 'inset',
        crop: '4 / 5', pan: [8, 10], zoom: 1.6,
        alt: 'Flatbreads spread with curd and topped with chickpeas, olives, onion and herbs, laid out on a plank table with the crew working behind and the sea beyond.',
        caption: 'One hot thing and four cold ones. The cold ones are doing the work a sauce would do ashore.',
      },
      {
        name: 'alashiya-crewman', at: 6, size: 'inset',
        crop: '3 / 2', pan: [0.9, -0.9], zoom: 1.05,
        alt: 'The young crewman sitting on deck mending a net, looking out over bright blue open water with a headland beyond.',
        caption: 'He is not looking at the sea. He is looking at the last few days of having somewhere to stop.',
      },
    ],
    pulls: [
      {
        at: 1,
        text: 'A coast is a handrail. Let go of it and every advantage a ship has over a donkey goes with it.',
      },
    ],
    standing:
      'Nobody wrote down what a ship’s crew ate. What you have is a hold. One of ours went down off Uluburun and lay on the seabed until you found her — ten tonnes of copper aboard, which tells you she was on the leg we have not done yet — and in among it almonds, pine nuts, figs, olives, grapes, pomegranates, coriander and sumac. That is a shopping list from a working ship. The method is mine.',
    body: [
      'Nine days down the Cilician shore and we have not lost sight of land once. I mention it because when somebody says a ship you picture open water and no horizon, and a man staring at the sky doing something clever with stars. We do almost none of that. We go down the coast the way a cart goes down a road, with land on the left hand all day, a beach or a river mouth to put into before dark, and off again at first light. Nine days of it, and I could have walked the whole way along the beach, slowly, and got there.',
      'There is nothing timid about it. A coast is a handrail. It tells you where you are, it gives you somewhere to run to when the weather turns, and it puts a market within reach every single night. Let go of it and you lose all three at once, along with every advantage a ship has over a donkey. So you hold on to it for as long as the geography lets you, and you let go only where you must.',
      'What we are carrying is not copper. It is the price of copper, which is a different thing, because nobody puts copper on a ship going TO Alašiya, which is where it comes out of the ground. So we have jars of oil, bales of cloth, a quantity of tin, and silver by weight in a box the captain sleeps on top of and does not discuss. We are going to buy. The heavy leg is the one home, and on the way back this deck will be carrying ten times the weight it carries now and sitting a great deal lower in the water.',
      'Now the kitchen, which is a clay box. It sits amidships in a bed of sand, fired clay and roughly the size of a large stool, open at the top with a hole in the side to feed it and a small charcoal fire inside. That is the entire cooking apparatus of a vessel built from wood, linen, rope and pitch, any of which will take a spark and turn nine men into a story other sailors tell. Nobody aboard is relaxed about it. It is lit late, it is watched the whole time, and it goes out before dark.',
      'So the cooking is designed backwards from the box, and the design is severe. One pot, because there is one heat. Nothing needing two temperatures at once. Nothing needing a long boil, because charcoal is cargo too. Abdi does the cooking, because he is the youngest and lost the argument years ago, and what he makes is chickpeas, soaked overnight, cooked soft, then oil and onion and cracked coriander in and the whole thing reduced until it is thick rather than wet. Half of it crushed against the side of the pot, half left whole. Then it goes hot onto flatbread spread with cold curd, olives and torn herbs over the top, oil across the lot. You eat it standing. Everyone eats it standing.',
      'It is very good, and not because of any cleverness. It is that hot and cold are touching. The curd slackens where the chickpeas land on it and you get a third texture between the two that neither has alone. That was arrived at by people with no choice about anything else in the meal.',
      'Two more days and we raise Ugarit, which is my own city and where the handrail runs out. Alašiya lies off to the west with nothing in between, which means a day and a half of open water if the wind is reasonable and a good deal more if it is not. It is the one crossing on this whole run, and everybody has been quieter about it than about anything else in nine days. Abdi is already cooking what we will eat cold out there, because the box will not be lit with no beach to run to. That is the entire difference between coasting and crossing, and it turns out you can see it in what is for dinner.',
    ],
  },
  {
    slug: 'egypt-without-the-temples',
    card: 'delta-meal',
    kind: 'report',
    title: 'Egypt, without the temples',
    region: 'egypt',
    place: 'A village in the Nile Delta',
    date: '2026-07-11',
    access: 'open',
    recipe: 'emmer-porridge-with-curds-delta',
    standfirst:
      'Almost everything anyone knows about Egyptian food comes off a tomb wall. Here instead is a house, a family, a pot, and a Tuesday morning.',
    hero: {
      name: 'delta-family',
      alt: 'Yadinu sitting at a low table with a woman and a small child, sorting bowls of pulses and grain, with spring onions and dates on the table, a domed oven behind and the river and a mudbrick village beyond.',
      caption: 'Ipuy, Merit, and a third party who contributed mainly by eating the dates.',
    },
    figures: [
      {
        name: 'delta-dough', at: 2, size: 'inset',
        crop: '4 / 5', pan: [0.3, 0], zoom: 1,
        alt: 'Close view of Yadinu and Merit working flour and dough at a low table, the child watching from below with his chin near the tabletop.',
        caption: 'The grain is the same grain that becomes bread. What happens next is the only difference.',
      },
      {
        name: 'delta-meal', at: 4, size: 'col',
        alt: 'A bowl of pale grain porridge scattered with green herbs held in two hands, beside a large round flatbread, a bowl of white curds, dates, spring onions and a clay jug.',
        caption: 'Emmer, curds, green onion, four dates, a hard pour of oil. No part of this required a scribe.',
      },
      {
        name: 'delta-table', at: 6, size: 'inset',
        crop: '4 / 5', pan: [20, 4], zoom: 1.7,
        alt: 'A wider view of the same low table with flatbread, a mortar, bowls of pulses and greens, a woman standing in a doorway behind, and the Nile beyond.',
        caption: 'One room, one oven, one quern, and everything else portable.',
      },
      {
        name: 'delta-basket', at: 7, size: 'inset',
        crop: '4 / 5', pan: [-5.2, -9.1], zoom: 1.35,
        alt: 'Merit sitting by the river weaving a coiled reed basket, geese behind her and the mudbrick village and palms across the water.',
        caption: 'The baskets are the other half of the household economy, and she is faster at them than she is at the bread.',
      },
    ],
    pulls: [
      {
        at: 6,
        text: 'Almost everything you know about our food, you know because somebody was obliged to account for it. Nobody ever had to account for breakfast.',
      },
    ],
    body: [
      'The Delta is not the Egypt you have in your head. There are no cliffs and no desert edge a stone’s throw away; there is flat wet green in every direction, cut into a thousand pieces by water, and so many birds that the noise takes a day to stop registering. The villages sit up on their own rubbish, a few feet above the flood, mudbrick going soft at the corners. Nobody here has seen a pyramid. Several people asked me what one was.',
      'I stayed four days with Ipuy, who grows flax and does something complicated and semi-legal with a neighbour’s cattle, and with Merit, who runs everything else. There is a child of about four whose name I never reliably caught because it changed depending on who was calling him. The house is one room and a roof over the yard. In the yard: a domed oven, a saddle quern, three storage jars, a mortar, and a low table that is also the workbench, the dining table and, at one point, a boat.',
      'The morning meal is what most Egyptians were actually eating most of the time.',
      'Cracked emmer, and a pot of water. That is the whole of it. Merit toasts the grain dry first for a couple of minutes, which she does without thinking about it and which turns out to be the entire difference between this dish and paste — untoasted it tastes of nothing, toasted it tastes of biscuit and nuts. Then water, salt, and twenty-five minutes at a simmer while she does four other things. At the end she beats it hard with the spoon for half a minute and it goes from grain sitting in water to something creamy, with nothing added.',
      'On top: a soft heap of fresh curd, not stirred in. Sliced green onion, tops included. A handful of whatever green herb is going. Two dates, torn, per bowl — punctuation, not sweetness. And a hard pour of oil over the lot. Everyone stirs their own, and the child’s is stirred for him and he objects.',
      'You will have read that Egypt ran on bread and beer. It did, and the phrase does a lot of quiet damage, because it makes it sound as though those were the only two things grain became. They were the two things grain became WHEN SOMEBODY WAS COUNTING. Bread and beer are what an institution issues: they are portioned, they are countable, they keep long enough to hand out, and so they are what appears in the accounts, in the rations, on the tomb walls where a man’s provision for eternity is itemised like a delivery note.',
      'This is the gap I keep falling into. Almost everything you know about Egyptian food, you know because somebody was obliged to account for it — so many measures of grain per man per month, written down not out of interest but because a storehouse has to balance. Nobody ever had to account for breakfast. It is made from grain the household already has, by a person nobody is paying, and it leaves no record of any kind. The best-documented food in the ancient world and the most ordinary food in the ancient world are not the same food, and it is the accounting that decides which is which.',
      'The other thing I would put in the record: Merit makes baskets. Coiled reed, very fast, sitting by the water in the part of the afternoon that is too hot for anything else, and they go to a man who comes through every few weeks. It is not a sideline; over a year it is a serious part of what the household lives on. I mention it because the same silence covers it. You have the flax, because flax was taxed. You do not have the baskets.',
      'So: a reconstruction, and I would call this one a confident reconstruction, which is not a phrase I use often. No Egyptian text you will ever dig up describes this dish. But cracked grain, a pot, salt and a fire are older than Egypt, and your archaeology gives you the grain and the pots and the querns in enormous quantity. This does not need a recipe to have existed. It needs a household, and Egypt was several million of them.',
    ],
  },
  {
    slug: 'the-law-says-a-sheep-is-one-shekel',
    card: 'hattusa-tablet',
    kind: 'report',
    title: 'The law says a sheep is one shekel',
    region: 'hatti',
    place: 'Ḫattuša',
    date: '2026-05-16',
    access: 'open',
    recipe: 'neck-of-mutton-with-leeks-hattusa',
    related: [
      { to: '/reports/two-songs-and-the-fish-is-done', label: 'The other cook with an instrument by the fire' },
    ],
    standfirst:
      'Ḫatti fixes the price of an animal by statute. The man actually holding the animal has views of his own.',
    hero: {
      name: 'hattusa-tablet',
      alt: 'Yadinu holding a clay tablet at a market stall, laughing with a large grey-bearded man in a dark blue tunic who is holding up a pomegranate, over baskets of leeks, onions, garlic, pomegranates and grain.',
      caption: 'Zuwa, mid-argument, holding up a pomegranate I had not asked about and did not want.',
    },
    figures: [
      {
        name: 'hattusa-inspect', at: 1, size: 'inset',
        crop: '3 / 4', pan: [37, -11], zoom: 1.9,
        alt: 'Yadinu crouched beside a penned sheep with a hand in its fleece, looking it over, while a large grey-bearded man stands watching with the citadel walls behind.',
        caption: 'Hand in the fleece, over the loin. You are feeling for the animal under the wool, and the wool is there to stop you.',
      },
      {
        name: 'hattusa-haggle', at: 4, size: 'inset',
        crop: '1 / 1', pan: [21.1, 13.5], zoom: 1.45,
        alt: 'Yadinu gesturing with an open hand mid-argument while the grey-bearded seller stands with his hands on his hips looking amused, a third man holding a black and a white goat behind them.',
        caption: 'The goats were his opening move. I did not want a goat. He knew I did not want a goat.',
      },
      {
        name: 'hattusa-leeks', at: 6, size: 'inset',
        crop: '4 / 5', pan: [48.2, 4.6], zoom: 2,
        alt: 'Yadinu striding away from the market laughing, carrying an enormous armful of leeks and a sack, past a goat, with the citadel gate behind him.',
        caption: 'Nobody haggles over leeks. This is most of the reason the dish is built on them.',
      },
      {
        name: 'zuwa-lyre', at: 7, size: 'col',
        crop: '3 / 2', pan: [1.7, 7.5], zoom: 1.15,
        alt: 'The grey-bearded seller seated on a low stool playing a small wooden lyre, a sheep standing beside him, painted textiles hanging on the wall behind and a basket of onions at his feet.',
        caption: 'Between customers. A sheep market is mostly waiting, and he had thought about how to spend it.',
      },
    ],
    pulls: [
      {
        at: 3,
        text: 'A law that fixes the price of a sheep is not a record of what sheep cost. It is a record of an argument that kept happening.',
      },
    ],
    standing:
      'The archive on that ridge is the biggest thing of ours you have ever recovered — tens of thousands of tablets, treaties and rituals and omens and laws, over a hundred named breads — and not one recipe in the whole of it. Not one. You know what a sheep was worth and not one thing about what anybody did with it. So this pot is inference: the cheap cut because that is what the price lists imply people could afford, the alliums because they are everywhere, the spoonful of honey because putting sweetness next to meat is the one thing this kitchen is genuinely known for. Three hours on a low fire, and it comes out far better than the argument that produced it.',
    body: [
      'Ḫattuša is high, and you feel it before you see it. The road climbs for two days out of the plain and the air thins and sharpens as it goes, and then there are walls on a ridge that were built by people who had decided, very firmly, that nobody was coming in. The market sits outside them, in the dust below the gate, which is where markets always sit. Inside is the archive and the temples. Outside is where anything actually changes hands.',
      'I went for a sheep. This is not as simple as it sounds. A sheep in a pen is mostly wool, and wool is an excellent way of hiding an animal from the person buying it — so you get down on your heels and put a hand in over the loin and the shoulder, where the meat is, and you feel what is under there rather than looking at what is on top. Thin over the spine and you are buying bone and disappointment. The man selling this one was called Zuwa: about sixty, built like a storage jar, grey to the chest, and entirely delighted to watch a Ugaritic clerk fumble around in a fleece.',
      'Now, here is the thing that makes Ḫatti different from anywhere else I have bought food. This kingdom writes its prices down. The Hittite Laws — a real code, on real tablets, in the archive up the hill — fix what things are worth in silver, and they do it in flat declarative sentences. So much for an ox. So much for a hide. So much for a month of a hired man. And a sheep, among the cheapest animals on the list, at about a shekel.',
      'I quoted this at Zuwa. I knew exactly what I was doing and did it anyway.',
      'What I got back, once he had stopped laughing, was the correct answer, and I have been turning it over since. A law that sets the price of a sheep is not a report of what sheep cost. It is a report of an argument that kept happening often enough that somebody in authority got tired of it. Nobody legislates the price of a thing that everyone already agrees on. And in any case almost nothing here is bought with silver — silver is for treaties and for the palace. What actually moves is barley, cloth and oil, in quantities nobody writes down, at rates that shift with the season and with how much the two of you like each other. I paid in barley. I paid more than a shekel. He threw in the goats-are-also-available routine twice and I declined twice, and we both enjoyed ourselves.',
      'If you are buying this in a shop rather than out of a pen, the same principle applies in a different form: buy the part of the animal that nobody is competing for. Neck. Not leg — leg is what the confident shopper buys and it is exactly wrong here, too lean to survive three hours and dry long before it goes tender. Neck has bone and gristle and fat running through it, all three of which are doing work, and it costs about a third as much. Ask for it in thick slices, on the bone.',
      'The other half of the dish cost me nothing worth mentioning, which is the point. Leeks. Onions. A head of garlic. In every market between here and the sea the allium baskets are the ones nobody guards, and this pot is built on them rather than on the sheep — eight big leeks to a kilo and a half of meat, half of them going in early to dissolve into the broth and half going in late to stay green and taste of themselves. The meat makes it rich. The alliums make it a dish. I walked out of Ḫattuša with an armful I could barely see over.',
      'One more thing, and then the pot. Zuwa keeps a lyre by his stool and plays it between customers, which he does well and knows he does well. I have met exactly one other person in this trade who keeps an instrument within reach of the work — a cook at Amnisos who uses hers to time a fish, two songs to the finish, and swears by it. I asked Zuwa what he times with his. He looked at me as though I had asked what he weighs the wind with. He plays it because a sheep market is four fifths waiting and he had thought about how to spend that. Not everything is a method.',
    ],
  },
  {
    slug: 'two-songs-and-the-fish-is-done',
    card: 'cretan-fish-plate',
    kind: 'report',
    title: 'Two songs, and the fish is done',
    region: 'aegean',
    place: 'Amnisos, Crete',
    date: '2026-04-18',
    access: 'open',
    recipe: 'fish-baked-on-fennel-amnisos',
    standfirst:
      'A cook at the harbour below Knossos has no way to count minutes and no interest in acquiring one. She measures a fish in music, and she is right.',
    hero: {
      name: 'cretan-fish-table',
      alt: 'Yadinu and a Cretan woman working at a stone table on an open terrace, a whole fish on a platter between them, bowls of olives and chopped greens around it, frescoed columns and the sea behind.',
      caption: 'Amnisos, two days. I came for the harbour accounts and stayed for this.',
    },
    figures: [
      {
        name: 'cretan-fish-mise', at: 2, size: 'col',
        alt: 'Everything the dish needs laid out on a table: a whole fish on a shallow dish, thick bundles of fennel, bowls of dark olives and chopped green herbs, a jug of olive oil and heads of garlic.',
        caption: 'The whole dish, before anything happens to it. There is nothing here you cannot buy on a Tuesday.',
      },
      {
        name: 'cretan-fish-stuffing', at: 4, size: 'inset',
        crop: '4 / 5', pan: [-0.4, 0], zoom: 1,
        alt: 'Close on two pairs of hands packing chopped green herbs into the belly cavity of a whole fish, a bowl of the herb mixture in front of them.',
        caption: 'Pack it until it will not take any more, then push what is left into the cuts.',
      },
      {
        name: 'cretan-fish-smoke', at: 5, size: 'inset',
        crop: '1 / 1', pan: [-4, -17.2], zoom: 1.8,
        alt: 'Idaia turning a whole fish in a wide shallow clay dish set straight over an open fire, smoke rising off it, Yadinu leaning in across the table beside bowls of chopped herbs and olives.',
        caption: 'No oven. The dish goes straight over the embers, and the wine is poured around it rather than over it.',
      },
      {
        name: 'idaia-lyre', at: 6, size: 'inset',
        crop: '3 / 4', pan: [0, 0], zoom: 1,
        alt: 'A Cretan woman seated on a stool on a terrace high above the sea, playing a small wooden lyre, olive trees and a dish of greens beside her.',
        caption: 'The timer. She keeps it on a hook by the door and plays with her back to the fire.',
      },
      {
        name: 'cretan-fish-plate', at: 7, size: 'col',
        alt: 'The finished dish: three whole fish on a bed of braised fennel in a wide ochre platter, scattered with green herbs and glistening with oil, a bowl of dark olives beside it.',
        caption: 'What comes off the fire. Olives at the end, and a hard pour of oil at the table.',
      },
    ],
    pulls: [
      {
        at: 7,
        text: 'Not two songs approximately. Two particular songs, the same two, every time — because she has been doing this for years and knows exactly how long they take.',
      },
    ],
    standing:
      'You will not find an Aegean recipe. Not one, anywhere, ever — because we did not write them. Every ingredient here is either counted on a Knossos tablet from the palace years or dug out of a Cretan midden — the fennel, the coriander, the celery, the oil, the wine, the olives — and nothing anywhere records anybody putting them together. The fish is not even on the tablets, which tells you about the scribes rather than the diet: a bream landed at Amnisos in the morning and eaten there at noon passed through no storeroom and needed no clerk. So this is a reconstruction. Amnisos is in the archive. Idaia is not, and neither is the fish she cooked me under a palace nobody has run in a hundred and fifty years. That is the entire problem with this world, and it is why I am bothering to write any of it down.',
    body: [
      'Amnisos is the harbour Knossos uses — used, rather, which is the first thing to say about it. The great palace up the hill burned generations before I was born and nobody put it back. What stands there now is a very large ruin with people living around the edges of it. What stands at the bottom is a working harbour, because a good beach does not stop being a good beach when the accountants leave: a stretch of sand you can pull a boat onto, a row of houses facing the wrong way to catch the wind, and the smell of fish being gutted at speed by about nine in the morning. The scribes wrote it a-mi-ni-so, back when there were scribes. It is on their tablets because ships and cargo are on tablets. Nothing else about the place is.',
      'Idaia cooks here. I am not going to pretend I found her in an archive, because she is not in one, and neither is anybody else who has ever made a meal in this world. She is a woman of about thirty who feeds crews for a living, holds strong views about other people’s fires, and can gut a bream faster than I can describe it happening. I spent two days in her kitchen and came away with one dish and one idea. The idea is better than the dish, and the dish is very good.',
      'Start with the fish, because she does. She wants them whole and about the length of her forearm — half a kilo each, near enough — and she picks them with the eye clear and the gills red underneath, which is advice that has not changed in three thousand years and is not going to. Two of that size feed four people. If the counter offers to fillet them for you, say no. Everything good about this dish happens because the fish is cooked on the bone with its belly full of something.',
      'Then the fennel, which is the part I did not expect. It grows wild along this coast right down to where the sand starts — tall, feathery, and smelling of aniseed the moment you crush it — and Idaia uses all of it. The bulb goes underneath, sliced thick, in one layer. The green fronds are chopped fine and go inside the fish. The Knossos scribes counted fennel out by the unit under the name ma-ra-tu-wo, which is the same word that gave Marathon its name: the field of fennel. A clerk weighing it into a storeroom and a cook pulling an armful off the roadside are, for once, holding the same plant.',
      'She chops the fronds together with coriander leaf, celery leaf and garlic crushed to a paste, salts the heap, and then works it with her hands for noticeably longer than seems necessary. I asked why. Because it should smell green, she said, not grassy. That is the whole difference between herbs sitting inside a fish and herbs having done something to it. Then she scores each fish twice a side, down to the bone, and packs the belly until it will not take any more.',
      'There is no oven. The dish is a wide shallow clay platter that goes straight over the embers: fennel in one layer, fish laid on top, wine poured around the outside and never over the skin. That last part is the bit worth stealing. Liquid on top steams the fish and you lose the skin; liquid underneath steams the fennel while the skin stays dry enough to blister. Oil across the top, salt on the outside, and then you leave it alone.',
      'And here is the idea. Idaia has no way to count minutes and no interest in acquiring one. What she has is a lyre, which lives on a hook by the door, and she plays it sitting on a stool with her back to the fire. The fish is done in two songs. Not two songs approximately — two particular songs, the same two, every time, because she has been doing this for years and knows exactly how long they take. Then she gets up and checks the shoulder with her thumb, because she is a cook and not a mystic.',
      'What comes off the fire is cleaner than the ingredient list suggests. The bulb underneath has gone sweet and silky and caught a little at the edges; the raw fronds inside have stayed sharp and perfumed the flesh from within. Olives go over at the end and a hard pour of oil at the table, which is what stops the whole thing being polite. The single way to ruin it is to cook it by the clock instead of by the fish. Go by the shoulder lifting cleanly off the bone, and start looking earlier than you think you need to.',
    ],
  },
  {
    slug: 'hello-i-am-yadinu',
    hero: {
      name: 'portrait-11',
      alt:
          'Yadinu grinning straight at the camera at a quayside market, a bowl of grain in one hand and a reed stylus in the other, moored ships and a painted harbour wall behind him.',
        caption: 'Twelve years counting other people’s oil. The jars were the easy part.',
    },
    // Placed by hand, after the paragraph each one belongs to. The old page divided the
    // body length by the number of photographs and dropped them at the quotient, which is
    // why they never had anything to do with the words next to them.
    figures: [
      {
        name: 'portrait-13', at: 0, size: 'inset',
        alt:
          'Yadinu frowning in concentration over a small clay tablet held in both hands, a large pot steaming on the fire in front of him and bowls of grain along the table.',
        caption: 'The tablet says how much went into the storeroom. It has nothing whatsoever to say about the pot.',
      },
      {
        name: 'portrait-06', at: 2, size: 'inset',
        alt:
          'Yadinu walking through a working port carrying a bowl, beached boats and a sail behind him, wide bowls of soup and bread set out on barrels in the foreground.',
        caption: 'Lunch on the quay. Sailors eat early, eat fast, and know exactly which stall is lying to you.',
      },
      {
        // Last figure in the post: nothing follows it to wrap past a float, so it runs
        // the full column instead of hanging off the end of the article.
        name: 'portrait-08', at: 5, size: 'col',
        alt:
          'Yadinu leaning over an enormous shallow cauldron of meat and onions simmering on an open fire, steam rising into his face, baskets of dates and nuts in the foreground.',
        caption: 'The correct posture for a guest in a working kitchen: close enough to smell it, far enough not to be in the way.',
      },
    ],
    pulls: [
      { at: 4, text: 'Kings leave inscriptions. Cooks leave dinner. The inscriptions survive and the dinner does not.' },
    ],
    kind: 'letter',
    title: 'Hello. I am Yadinu, and I used to count jars for a living.',
    region: 'levant',
    place: 'Ugarit',
    date: '2026-03-07',
    access: 'open',
    standfirst:
      'An introduction, and an explanation of why a former provisioning clerk is writing about dinner.',
    body: [
      'I was trained to count. Palace stores at Ugarit, twelve years of it: so many jars of oil in, so many out, whose seal, whose ship, what was short. It is not glamorous work and I was good at it. The tablets I wrote went into the ground when the city burned, and where you have dug them up you have learned exactly how much sesame oil moved through one storeroom in one bad year, and nothing whatsoever about what anybody had for supper.',
      'That gap started to bother me. I could tell you the quantity of every commodity that passed through the port and not one thing about what happened to it after it left. Somebody was cooking all of it. Nobody was writing that part down.',
      'So I went and looked. Merchant ships to Cyprus and across to the Aegean. South into Egypt, where the bread is better than anyone north of it will admit. North with the caravans into Hatti. East, eventually, to sit in Babylonian kitchens and be told at length that I was wrong about onions. I ate with sailors, shepherds, soldiers, bakers and dockworkers, because those are the people who cook, and because a palace will feed you well exactly once and then want something.',
      'Kings leave inscriptions. Cooks leave dinner. The inscriptions survive and the dinner does not, which is why every account of this world is full of temples and tribute lists and almost empty of food. That is an accident of what lasts, not a description of what mattered.',
      'This site is my attempt at the other half. Real dishes where a text survives, and where it does not, an honest reconstruction that says so. What to buy in a modern shop and what to leave. What the food actually does to a person who eats it. And a standing objection to the idea that everyone before about 1500 AD lived on grey porridge and resignation.',
      'A warning about method, since you are entitled to it. You know we had barley. You know we had onions. You know we had sheep. Anyone who tells you precisely what a Babylonian ate on a given Tuesday is selling something — and I say that as somebody who was there and still could not tell you. Where a tablet is clear I will say so. Where it is broken, or the plant is one you have never managed to identify, or the method is my guess dressed in period clothes, I will say that too, in the recipe, not in a footnote. You can decide what to do with it.',
      'The cooking is the point. Everything else here is in service of getting a decent pot of something onto your table.',
    ],
  },
  {
    slug: 'the-world-as-i-know-it',
    // The map sits under the paragraph about names and routes, because that is the
    // paragraph it illustrates. Index into `body`.
    showMapAfter: 1,
    hero: {
      name: 'portrait-03',
      alt:
          'Yadinu sitting cross-legged on the deck of a ship under sail, eating grilled fish and greens from a shallow dish, open sea and crew behind him.',
        caption: 'Two days out. The sea is the reason this is one world and not five — it is simply faster than the road.',
    },
    figures: [
      {
        name: 'portrait-12', at: 3, size: 'inset',
        alt:
          'Yadinu holding up a round dark loaf to the light in a market of tall storage jars, baskets of grain and bread heaped on the table in front of him.',
        caption: 'Barley country. Everything starts as grain here and most of it stays that way.',
      },
      {
        name: 'portrait-14', at: 4, size: 'inset',
        crop: '4 / 5', pan: [11.6, 17.9], zoom: 1.45,
        alt:
          'Yadinu holding a cup and a piece of bread on a Nile quay, a brightly painted temple wall and an obelisk behind him, palms and river boats on the water beyond.',
        caption: 'Egypt, and Egyptian bread. Better than ours. I have stopped arguing about it.',
      },
      {
        name: 'portrait-07', at: 5, size: 'inset',
        crop: '1 / 1', pan: [1.1, 42], zoom: 2.2,
        alt:
          'Yadinu holding up a large round loaf in a bakery, a domed oven alight behind him and another baker working at the table.',
        caption: 'A hundred named breads in the archive and instructions for almost none of them.',
      },
      {
        name: 'landscape-13', at: 7, size: 'inset',
        crop: '4 / 5', pan: [-0.9, 0], zoom: 1.15,
        alt:
          'Yadinu working dough at a long table on a terrace above the sea with two women, a domed oven alight beside them, bowls of olives and greens along the table.',
        caption: 'The Aegean, where olive oil is not a luxury but the default, and the spice lists run longer than anyone expects.',
      },
    ],
    pulls: [
      { at: 6, text: 'Set the five side by side and they are not five cuisines. They are one pantry with regional accents.' },
    ],
    kind: 'letter',
    title: 'The world, as far as I have eaten it',
    region: 'levant',
    place: 'Ugarit',
    date: '2026-03-21',
    access: 'open',
    standfirst:
      'Five kitchens, one pantry, and a sea in the middle doing most of the work. What you are actually looking at.',
    body: [
      'Start with the sea, because everything else follows from it. A ship leaving Ugarit can be in Cyprus in a day and a half and on Crete inside a week. Grain comes north out of Egypt. Copper comes east off Cyprus. Oil and wine move in every direction at once and nobody can keep track. The reason this is one world rather than five is that the water is faster than the land, and the ports are where the food ideas change hands along with everything else.',
      'You can read the routes off the names. My city is ủgrt to the people who live in it and Ugarit to every scribe writing to us in Akkadian, which is the language everybody does business in whether they speak it at home or not. Crete is ke-re-te on a Linear B tablet at Knossos, Keftiu to an Egyptian painting tribute-bearers on a tomb wall, and Kaptara to a Babylonian who has almost certainly never seen it. Four names, four scripts, one island — and a name only travels that far if the ships do.',
      'That is my own chart above, cut in my own hand, and you will not be able to read a word of it — which is fair, because it was not drawn for you. The wavy scoring is water, all of it. The ringed circles are the three places I keep going back to: Ugarit on the coast, Mari up the first river, Bābili a long way down the second. The dashed line running east out of Ugarit is the road, and there is a caravan on it somewhere in these pages. What the little wedge marks say is the names — Alašiya for the copper island you call Cyprus, Miṣr for Egypt, Purattu and Idiglat for the two rivers that reached you as Euphrates and Tigris by way of Greek, as a great many of our words did.',
      'MESOPOTAMIA, east, down the two rivers, where Bābili — gate of the god, and KÁ.DINGIR.RA in the older Sumerian writing that means exactly the same thing — is still a few generations from running the region. Barley country, and the only place that left you anything resembling actual recipes — three tablets you keep at Yale, twenty-five entries on the best of them, written by professionals for professionals and therefore missing every measurement and every cooking time. Sour is the register: beer in the pot, soured milk stirred in off the heat, raw crushed garlic at the end. And onions in more or less everything, which they will defend at length.',
      'EGYPT, south, which calls itself Kmt, the black land, after the dark silt the flood leaves behind and against the red desert either side of it. Everyone else calls it something like Miṣru. Bread and beer as the frame of the day, and both better than the rest of us manage. Emmer wheat, baked in tall clay moulds, and a beer thick enough to be food. Waterfowl and Nile fish for the protein, dates and tiger nuts for the sweet. Nothing of theirs comes down to you as a recipe, but they painted their kitchens on their tomb walls, which is its own kind of record.',
      'ḪATTI, north, up onto the Anatolian plateau, with its archive at Ḫattuša. Cold, high, and obsessed with bread — their texts name well over a hundred kinds and explain how to make almost none of them. Sweetness with meat, which nobody east of them does: there is a dish that bakes lamb in olive oil and honey together and it is better than it sounds. Good hazelnuts. Chickpeas mashed with cucumber over the top, which I have never seen anywhere else.',
      'THE AEGEAN, west across the water, where the two great archives are ko-no-so on Crete and pu-ro on the mainland — Knossos and Pylos, written in a syllabary that cannot spell a final consonant and does not distinguish l from r, so every Linear B name is a rough sketch of a sound. Olive oil as the default fat rather than a luxury, sheep cheese, and the longest spice list of the five. Their palace records are inventories, not recipes, so you know exactly how much coriander went where and nothing about what was done with it. What you have instead is the equipment: portable clay grills with notches cut for skewers. Somebody was grilling meat on sticks over charcoal three thousand years ago and the hardware proves it.',
      'CANAAN AND THE COAST, which is mine — knʿn to us, Kinaḫḫu to a Babylonian clerk, Kinaḫni in the letters to Egypt. Ports, warehouses, and other people’s cargo. Olive oil at industrial scale, wine with resin in it, fish, and a drinking society called the marzeaḥ whose paperwork you have in detail while its menu you do not. We left less of a kitchen of our own than any of the others, which is exactly what you would expect of a place that spent its time moving everyone else’s food.',
      'Now the part that surprises people. Set the five side by side and they are not five cuisines. They are one pantry with regional accents. Grain, pulse, allium, oil, sour dairy, bread — that is the spine everywhere, from Pylos to Nippur. The differences are real but they are seasonings on a shared structure: which fat, which souring agent, whether sweetness is allowed near meat. If you can cook a lentil and barley pot with onions in it, you can cook in any of these five kitchens with a few substitutions.',
      'What is not here matters as much as what is. No tomatoes, no potatoes, no chillies, no maize, no citrus, no sugar, no rice, no chocolate, no coffee. Every one of those arrives later, most of them very much later, and most of them from a continent nobody in this story knows exists. Half of what a modern cook thinks of as Mediterranean cooking is five hundred years old at the outside. The other half is three thousand, and it is the half in the pot.',
    ],
  },
]

/** Where a Yadinu photograph lives. `thumb` picks the 420px derivative. */
export const img = (name, thumb) => `/img/yadinu/yadinu-${name}${thumb ? '-thumb' : ''}.webp`

/* NEWEST FIRST, BY DATE — not by position in the array above.

   The front page takes the first entry as its lead and the next two as secondaries, so
   array order was silently load-bearing: adding a post in the wrong place changed what
   the site led with. Sorting here means a new post can be appended anywhere and still
   lands in the right slot, and it means the ISO dates are doing a second job beyond
   being rendered into Yadinu's reckoning. */
export const posts = [...fieldReports].sort((a, b) => b.date.localeCompare(a.date))

export const reportBySlug = Object.fromEntries(fieldReports.map((r) => [r.slug, r]))

/* NOT CURRENTLY USED BY ANY PAGE, and kept on purpose.

   These describe the thirty-one hand-supplied photographs in public/img/yadinu/, which the
   articles no longer place: the frames they use now are the nine generated against the
   standard in scripts/yadinu.py, and those carry their own alt text next to their captions
   in the posts above. The catalogue stays because the photographs are still on disk and
   still good, and re-describing thirty-one images is an hour nobody should spend twice. */
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
