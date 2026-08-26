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
    slug: 'he-does-not-know-which-king',
    kind: 'report',
    card: 'soldier-spread',
    title: 'He does not know which king',
    region: 'mesopotamia',
    place: 'Terqa, and the road south to Mari',
    date: '2026-09-18',
    access: 'open',
    recipe: 'shoulder-for-the-road',
    related: [
      { to: '/reports/the-field-decides-when-supper-is', label: 'The fields he is marching to defend' },
    ],
    standfirst:
      'A man is walking south in the morning to fight somebody who is burning farms. He cannot tell me whose farms, or which king, and he does not think the question is a useful one.',
    hero: {
      name: 'soldier-table',
      alt: 'Yadinu and a bearded soldier at a riverside table of pulses, onions, garlic, herbs, dates, curd and a raw joint of meat, a copper pot on a fire beside them and a round shield and spear leaning on the wall behind.',
      caption: 'The shield has been leaning against that wall for three days. Tomorrow it goes south.',
    },
    figures: [
      {
        name: 'soldier-mortar', at: 2, size: 'inset',
        crop: '4 / 5', pan: [0.5, 0.2], zoom: 1.022,
        alt: 'Yadinu and the soldier working cumin and garlic together in a stone mortar, four hands on the job.',
        caption: 'Cumin, garlic and salt. He does this well and quickly and has clearly done it many times.',
      },
      {
        name: 'soldier-pot', at: 4, size: 'col',
        alt: 'The soldier stirring a copper pot over an open fire while Yadinu chops greens at the table beside him, shield and spear against the wall.',
        caption: 'Chickpeas in the copper pot, and the shoulder in the coals underneath it. One fire, two dishes.',
      },
      {
        name: 'soldier-spread', at: 6, size: 'col',
        alt: 'The finished meal: a wide bowl of chickpeas and greens, a dark roasted joint of mutton on the bone, white curd, dates, coarse salt and a large jug.',
        caption: 'The pot is what he eats. The joint is because he is leaving.',
      },
      {
        name: 'soldier-net', at: 8, size: 'inset',
        crop: '4 / 5', pan: [-0.5, 0.5], zoom: 1.054,
        alt: 'The soldier sitting alone by the river mending a net with his shield and spear propped beside him.',
        caption: 'Not a fishing net. It goes over the load on a mule, and he had been meaning to fix it for a month.',
      },
    ],
    body: [
      'Iddin-Sîn is about forty, missing the top joint of one finger, and has been a soldier for nineteen years in the way a man is a farmer for nineteen years, which is to say seasonally and without much ceremony about it. He is going south with a column in the morning. I am going with them as far as Mari, where I intend to find a boat and go north again. Mari is a name that still does work in conversation and has not been a city for five hundred years; what is there now is a village on a great deal of fallen brick, and a crossing. It is enough for a boat. Iddin-Sîn thinks this is a very sound plan.',
      'What he could tell me about where he is going: south, along the river, about eleven days. That there is a campaign, and that it is with Babylon, so the Babylonians will be somewhere in the same country doing something related. That the man they are going against has been burning farms.',
      'What he could not tell me: which man. Whose farms. Why. Whether the burning was the cause of the campaign or a response to it. Whether Terqa had asked for this or been told. I put all of that to him over the course of an afternoon, from several directions, and got the same shrug each time, delivered without any impatience at all.',
      '“It would not move me one pace,” he said, eventually. He was crushing garlic at the time. “Knowing it, I mean. I would stand where they put me either way.”',
      'I have been turning that over since and I cannot make it into ignorance, which is what I wanted it to be. He knows what he needs for the thing he has to do, and he has been doing it long enough to know exactly what that is. The why belongs to somebody in a room with a tablet, and if he were told he would not be able to check it, and it would not change the eleven days or the standing.',
      'The cooking was his and it was better than mine. A mutton shoulder, scored, salted, rubbed hard with cumin and garlic and oil, set on halved onions in a covered dish and left in the coals for three hours while a pot of chickpeas and barley went on the fire above it. One fire, two dishes, no attention required by either for most of the afternoon. He has cooked for men on the move for two decades and everything about the way he works is arranged around not being interrupted.',
      'The pot is what he actually eats. The shoulder is because he is leaving in the morning, and nobody at that fire said so, and there was a great deal more of it than two men needed. Three of the neighbours came by while it was resting and none of them mentioned the column either. I ate with two women in a field kitchen two days ago and there was no meat on that table at all, which is the ordinary state of affairs. An animal is wool and milk and lambs and years of feed, so eating one is a decision about the future. It appears at festivals, at sacrifices, and when somebody is going away.',
      'I asked what he would be eating in eleven days. Parched barley, he said, and hard curd, and whatever the country gives up, and he said it the way you would describe weather.',
      'Afterwards he sat by the water and mended a net he had been meaning to mend for a month. It is not for fish. It goes over a load on a mule and one corner of it had gone, and he worked at it until it was too dark to see, with the shield leaning against the wall behind him where it has been all week.',
      'We leave at first light. Eleven days for him and four for me, and then a boat north.',
    ],
    standing:
      'Sheep and goat dominate the faunal record here and are priced and issued throughout the administrative material. Cumin, garlic and sesame oil are documented commodities. Military musters and their provisioning appear in correspondence, and so do complaints about burned fields, though never with enough context attached to know whose or why. Iddin-Sîn is invented. What is not invented is how little an ordinary soldier is told, which the correspondence makes plain by never once addressing him. As for the campaign itself: Assyria and Babylonia were at war across these decades and this stretch of river lay between them. When the decisive year fell is disputed by about ten years, depending on which chronology you follow, and I cannot settle it from where I am standing any better than you can from where you are. That is not modesty. Iddin-Sîn’s shrug is the most accurate sentence in this report, and I have left it in his mouth rather than improving on it in mine.',
  },
  {
    slug: 'the-field-decides-when-supper-is',
    kind: 'report',
    card: 'harvest-spread',
    title: 'The field decides when supper is',
    region: 'mesopotamia',
    place: 'Below Terqa, on the Euphrates',
    date: '2026-09-16',
    access: 'open',
    recipe: 'field-pot-for-thirty',
    related: [
      { to: '/reports/the-wall-and-the-canal', label: 'The city these fields belong to' },
    ],
    standfirst:
      'Two women, one pot and thirty people cutting sesame. The cooking is easy and the timing is not, because the field decides when it stops and the field does not consult anybody.',
    hero: {
      name: 'harvest-table',
      alt: 'Yadinu working at a long riverside table loaded with greens, cucumbers, pulses, dates and curd, with two women beside him and a domed bread oven behind, the Euphrates and a mudbrick town beyond.',
      caption: 'Everything on that table came out of the ground within an hour of where it is standing.',
    },
    figures: [
      {
        name: 'harvest-showing', at: 2, size: 'inset',
        crop: '4 / 5', pan: [-30.6, 10.2], zoom: 1.774,
        alt: 'Bēltum holding out a handful of grain across the cauldron for Yadinu to look at, both of them laughing.',
        caption: 'Bēltum, explaining why this year’s grain wants five minutes longer than last year’s.',
      },
      {
        name: 'harvest-stirring', at: 4, size: 'col',
        crop: '16 / 9', pan: [-1.9, 3.4], zoom: 1.266,
        alt: 'Yadinu stirring a very large cauldron with a wooden paddle while Bēltum watches and Iltani works at greens behind.',
        caption: 'The paddle is not for show. A pot this size catches on the bottom if you stir it like a saucepan.',
      },
      {
        name: 'harvest-spread', at: 6, size: 'col',
        crop: '3 / 2', pan: [-21.8, -44.9], zoom: 1.904,
        alt: 'The finished meal laid out: a very large bowl of chickpeas and barley strewn with green herbs, stacks of flatbread, bowls of dates, figs, white curd, onions and garlic.',
        caption: 'One pot, and everything else on the table is cold and needed no fire at all.',
      },
      {
        name: 'harvest-geese', at: 8, size: 'inset',
        crop: '4 / 5', pan: [0, 4], zoom: 1.3,
        alt: 'Bēltum at dusk by the river, arms out, driving a pair of geese away from the house, a crescent moon above the palms.',
        caption: 'She has hit one before. She was keen that I understood the difference.',
      },
    ],
    body: [
      'Two days downriver from the city the fields start, and in the middle of September they are full of people cutting sesame. Sesame will not wait. Leave it standing a few days too long and the capsules open on their own and the crop is on the ground, so everyone who can hold a sickle is out from first light, and thirty of them have to be fed at the end of it. That job belongs to Bēltum, who is nearer seventy than sixty and has done it for most of them, and to Iltani, who is her niece and is quicker with a knife than anybody I have watched this year.',
      'Their kitchen is a table under a vine by the water, a bread oven, and a cauldron I could sit in. There is no roof over any of it. Bēltum said the roof was the point, because a fire under a roof in September is how you lose a house, and then she said it a second time in case I was the sort of man who needed telling twice. I have been that sort of man before now.',
      'What goes in the pot is chickpeas, cracked barley, leeks, onions, a whole head of garlic and a great deal of cumin, and none of that is the interesting part. The interesting part is the clock, which does not exist. Nobody in that field knows what time they will stop. They stop when the light goes or when the barley in front of them runs out, and the pot has to be ready before that and then capable of waiting an hour without turning to paste.',
      'So the whole design is about holding. Pulses and grain, because they sit. Half the leeks in early to dissolve into the body of it and half in late so there is still something to bite. The greens not in it at all until the last three minutes. And no salt to speak of until the end, because a pot that sits keeps reducing, and a pot seasoned correctly at noon is a mouthful of brine by dusk. Bēltum salts it hard at the last moment, in front of everybody, and it is the only part of the process she will not let anyone else do.',
      'I said, meaning it as praise, that it was a simple way to feed thirty people.',
      '“It is not simple.” She had the paddle in both hands and did not stop moving it. “It is cheap. You keep saying simple.” Iltani laughed at that without looking up. I have used the word about a dozen dishes on this journey and I have stopped using it since.',
      'They came in a little after the light went. Everyone ate standing or sitting on the ground with a bowl on their knees, bread torn from the stack, cold curd spooned on top of hot grain, dates going round in a bowl that came back empty twice. It took about twenty minutes. Then most of them went home and four of them went to sleep where they were.',
      'There is a rumour running along this stretch of river that farms are being burned somewhere south. I asked about it twice and got a different answer each time, neither of them from anybody who had seen anything. Bēltum has heard it. What she said about it was that the sesame still has to come in.',
      'After dark she went out and drove a pair of geese off the bank with her arms out and a good deal of noise. I told her I had met a woman on Alašiya who spent an entire evening throwing stones at geese and never once hit one, on purpose, because hitting one would have meant plucking it and she was working. Bēltum thought about this for a moment. Then she said that she had hit one in the spring, that it had taken her most of an afternoon to deal with, and that it had been worth it. Two women, one bird, and completely different arithmetic.',
      'I go south with a column in two days. Bēltum has given me a cloth of bread and dates for it, which I did not ask for and which she handed over as though it were part of the arrangement.',
    ],
    standing:
      'Chickpeas, barley, leeks, onions, cumin and sesame oil are all documented commodities in Middle Euphrates and Babylonian material, issued in bulk and often issued together. Harvest labour with provisioning attached is recorded as a seasonal obligation. What no text describes is the cooking of it, because a meal handed to thirty field workers passed through no storeroom and needed no clerk. Bēltum and Iltani are invented, and so, for these years, is the settled countryside they are working in: nothing from Terqa can be securely dated to my own decade, and what you have of the place is centuries older. The pot is reconstructed from the constraint it had to satisfy.',
  },
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
      { to: '/reports/the-field-decides-when-supper-is', label: 'Downriver, two days later' },
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
        name: 'terqa-market', at: 6, size: 'col',
        alt: 'A crowded market street with baskets of grain, pulses and dried fruit, split dried fish laid out on a table, stacked pottery, and traders and shoppers among the awnings.',
        caption: 'Three streets and part of a fourth. Almost nobody here grew what they are standing behind.',
      },
      {
        name: 'terqa-talk', at: 5, size: 'inset',
        crop: '4 / 5', pan: [-6, 2], zoom: 1.5,
        alt: 'Yadinu standing among a group of market people seated around baskets of dates, olives and flatbreads in low evening light, one man talking with both hands raised.',
        caption: 'Hammi-Dagan, a gugallu, which is the office that decides whose sluice opens on which day. An hour of this, mostly with his hands.',
      },
      {
        name: 'terqa-evening', at: 10, size: 'col',
        alt: 'A lamplit interior at night: a bearded man standing mid-story with his arms spread, a crowd of adults and children sitting on rugs around him, food set out on the floor.',
        caption: 'Thirty people on rugs, the food going round twice, and nobody taking a fee at the end of it.',
      },
    ],
    standing:
      'A gugallu is a real office: canal inspector is an attested title, and the water schedule, the corvée obligation and the disputes over both are documented across Mesopotamian administrative and legal material. Hammi-Dagan is invented. Nobody recorded what a canal inspector said to a stranger in a market. The salt is real too, and the wheat-to-barley shift in the southern records is real, though how much of that shift to lay at the door of salinisation rather than politics or climate is genuinely argued over by the people who work on it, and I have tried to say so rather than pick a side. The house that burned is Terqa’s, the jar is Terqa’s, and the thing in the jar is a fight I am staying out of. The market list comes from commodity texts and not from anybody’s shopping basket. One more thing, and it is about this page rather than about dinner. If you go looking for Terqa in my own century you will not find it. There is no king of Hana on any list for these years, no archive, no tablet anybody can date to the decade I am standing in. The house I mention above, the one that burned five hundred years before I was born, is the opposite: excavated, published, argued over. This stretch of river is far better known half a millennium before my visit than during it, which is exactly the thing this site keeps saying about food and is stranger when it happens to a city.',
    body: [
      'The ridge above Terqa carries a path worn a hand’s depth into the limestone. From it the city appears all at once: mud brick on the west bank, the river behind it carrying a great deal of afternoon light, and between the two a band of cultivation about an hour’s walk across. The band ends without gradation. Past its edge the ground is thorn and stone, and it continues in that condition for as far as the eye can follow it.',
      'Inside the band there is barley, date palms in rows, and small fields of onions divided by low earth walls. Water reaches them along channels that leave the river above the town and run beside it, dropping slightly as they go, so that in several places the channel runs higher than the field it serves. Men were working in one of them as I came down. They stood knee-deep in wet silt, lifting it out in baskets and stacking it on the bank, where it dried grey. They do this every spring. If they stopped, the fields would be steppe inside two years.',
      'I entered at dusk behind a line of donkeys. At the gate a man in a striped mantle sat with a tablet on his knee, writing down the names of those coming in. He asked mine twice and got it wrong both times. Nineteen days earlier I had been robbed in the mountains, and had slept four nights afterwards on open ground. The street inside the gate was lit and crowded. I slept without waking.',
      'The same hand writes at the gate, in the granary, and on the canal roster. I know this because the hand was mine for twelve years, in a palace store at Ugarit, counting jars in and jars out. I thought of myself then as a man who was good with jars.',
      'What the granary is for is not obscure once you stand in front of it. Grain beyond what a household eats has to be put somewhere; what is put somewhere has to be guarded; the guards do not farm and so are fed from the store; and the store is therefore counted, and the counting is written down. The wall around this city and the channel above it are held up by the same tablets.',
      'The man who sets that order is called Hammi-Dagan, and he explained the whole of it to me in the market over the better part of an hour, mostly with his hands. Every field in the district is a line in his head, the lines are ranked, and every man in that market knows exactly where he sits and believes he should sit higher. I said something about the ranking being resented. He said the ranking was not the difficulty, that people argue about the order from one end of the year to the other and that this is what the arguing is for. Nobody, he said, argues about the digging. Then he asked where I had come from, and I told him, and he asked how the hills had been. “There is no order in the hills,” he said. I have not been able to get around that one.',
      'The market runs three streets and part of a fourth. Grain in open baskets, lentils, chickpeas, dates by the bushel off the downriver boats, sesame oil, wool, salt, onions plaited into ropes, stacked pots, and a long trestle of split dried fish going brown at the edges. A woman selling dates told me she had never seen the trees they came from. Almost nobody here grew what they are standing behind.',
      'A house in this city burned down some five hundred years before I was born. You excavated it, and in a jar in it you found something you have disagreed about ever since; if it is what one party says it is, it came four thousand miles from islands nobody in my world has heard of. The disagreement is unresolved and I am content to leave it there.',
      'The salt is harder to see than the silt and works the same way. Water spread on a field and left to evaporate leaves behind what it carried. In the south, where this has gone on longest, the wheat has given way to barley and the bread has gone darker. Here the river runs faster and the fields are younger and the change is slower. How much of the southern story is salt and how much is politics is argued over; that the ground grows saltier is not.',
      'Supper was dried fish off the trestle, soaked overnight, with four onions cooked slowly in sesame oil until they collapsed and went gold, cracked grain stirred through, and the fish folded in at the end in large flakes. Sumac over it, and bread. The onions go in at the beginning and take half an hour, and the dish does not work without them, the fish having salt and no sweetness of its own. A woman in Sippar told me that years ago and I did not believe her at the time.',
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
      'They took eleven donkeys, eleven donkeys’ worth of copper and every person in the caravan except me. The four days that followed were spent finding out what a hillside is worth.',
    hero: {
      name: 'robbed-raiders',
      alt: 'Four armed men on a mountain track, two carrying long spears and two carrying round shields of woven wicker and stretched hide, standing over baskets and packs that have been set down on the stones.',
      caption: 'Look at the shields. Men who have decided to rob somebody on the way past do not carry shields.',
    },
    figures: [
      {
        name: 'robbed-taken', at: 4, size: 'col',
        alt: 'Yadinu crouched low behind a rock in the foreground, watching a line of people and donkeys being walked away along a hillside track by men with spears.',
        caption: 'I followed for about an hour at a distance that would not get me noticed twice. Šimatum is the small dark shape near the front, still arguing.',
      },
      {
        name: 'robbed-foraging', at: 6, size: 'inset',
        crop: '4 / 5', pan: [-6, 1.5], zoom: 1.12,
        alt: 'Yadinu kneeling on a stony hillside with both hands working into a low thorny shrub, stripping small pale fruit from it, dry hills stretching away behind him.',
        caption: 'Two hours of this fills a basket once. Nobody gathers who has any alternative at all.',
      },
      {
        name: 'robbed-teaching', at: 10, size: 'col',
        alt: 'Yadinu sitting on the ground holding up a sprig of herb and talking to a young woman and an older man, with a jug, a basket of olives, greens and figs spread on the rock in front of them and sheep behind.',
        caption: 'The trade: they had milk and bread and a fire, and I had four days of very close attention to a hillside.',
      },
    ],
    standing:
      'Gathered food leaves almost no trace and no recipe. What you do have is that ship off Uluburun, which went down carrying sumac, terebinth, figs, olives, almonds, pine nuts, grapes and coriander — every one of which grows wild on the hill I was stuck on. So the ingredients are not a guess. The bowl is.',
    body: [
      '“Whose man are you?” The leader spoke better Akkadian than I do. I had not expected that, and it told me most of what was worth knowing about the afternoon: nobody had come down off that hillside in a rage.',
      'I told him I was nobody’s man, which was true and was also the least useful thing I could have said. He asked what I carried. Notes, I said, and he looked at the notes. Then: “Which city pays for you?” I stood in the sun and assembled the answer in front of him, and the answer was that no city would. He had already turned away before I finished, because the only purpose of the question was to arrive at that. Nothing about it was mercy. I was valued at nothing and put down like an ingot that had come out wrong.',
      'They had come off the slope on both sides at once, at the narrow part, and it was finished before I understood it had begun. Eight or nine men with long spears and not a raised voice among them. There was no charge and nobody resisted. Šimatum said a single sentence I did not catch and then held both hands out flat, palms towards the ground, and the two hired men did the same. They took eleven animals and the better part of a tonne of copper, and then they took the people, and the people are the part that matters. Nobody was harmed. A dead merchant is worth nothing to anyone; a living one is worth whatever will be paid to have her back. The copper was a windfall. The people were the trade.',
      'She had chosen those hills eleven days earlier and for good reasons, which I set down at the time: water she could rely on, against a steppe road whose wells she could not. What the hills also have is cover. She had been setting those two things against each other for twenty-two years, and on this occasion the answer came out wrong.',
      'I trailed them for an hour, low and a long way back, until the path dropped into a valley I did not recognise and it became clear that the only thing I was accomplishing was putting distance between myself and water. After that it went very quiet. I was on a mountain with a cloak, a knife, an empty skin, and no confident idea which side of the ridge I was standing on.',
      'A dry hillside at the end of August presents as nothing whatsoever. Brown, thorny, over. It is in fact the best-provisioned larder of the entire year, and the reason it looks bare is that every edible thing on it is small and sour and low down.',
      'The first day I found sumac, and sumac is what saved me. The red drupes ripen at exactly this point in fat velvet clusters and they are sourness with nothing else attached, and you can strip them into your mouth straight off the standing shrub. In a country containing no lemons that is not a minor discovery. My water had gone by the middle of that afternoon and sour is the next best thing to wet.',
      'The second day was purslane, which comes out of fissures in rock, holds its water through the one month when everything else has bolted and turned bitter, and carries a faint salinity. Terebinth after it, for a nut that is oily and resinous. I stood over a stand of capers for some time and walked away, because capers only repay you if you will draw the bitterness out across a full day, and on the second day I had other plans.',
      'By the third I was on wild figs, which come apart on trees nobody planted, and on mallow, which is uninteresting and faintly slippery and will keep you upright. The third day is also when I nearly made the mistake that matters. Bitter almonds and sweet almonds grow beside one another and cannot be told apart by looking; the only signal is the taste; and the correct response to a bitter one is to spit rather than press on out of politeness. I bit, it was bitter, and I spat. Oleander I left alone, as anybody should. It grows everywhere up there, it is lovely, and no part of it is safe in any state, the smoke included.',
      'On the fourth morning I crossed a saddle and found sheep, and behind the sheep a fire and two people: a girl of sixteen or so and her grandfather, three days from anywhere, working a flock over the high ground while the low pasture burned off. I had walked up there expecting to beg and discovered instead that I was the one arriving with something. They are herders and not gatherers. Their food comes off the animals, milk and curd and hard bread carried up from below, and they had gone past that sumac daily for their entire lives without it registering once.',
      'So I tipped the basket out across a rock and worked through it a heap at a time. The girl made me start again from the beginning and do the whole thing twice, and by the end of the second pass she was putting me right about which fig trees were worth walking to. “Not that one,” she said, of a tree I had been quietly pleased with. “That one is for the birds.” Which was entirely fair, since she lives up there and I do not. What we ended up with was raw purslane and mallow softened for a minute and wrung dry, both turned through their soured milk with salt and as much oil as I dared, sumac over the top until the surface went pink, cracked terebinth, figs pulled open, hard bread for scooping. Sour, then salt, then a brief sweetness wherever a fig had been. It cost no one anything. Four days earlier I had been eating out of the stores of a caravan hauling the better part of a tonne of copper, and this was better, and I intend to leave that statement standing.',
      'Word reached the shepherds on the sixth day, the way word does. The town below the pass had paid up, and not from kindness but from exposure. A city answers for whatever happens to merchants on ground it holds, and Šimatum was moving somebody else’s copper under somebody else’s seal, so her disappearance in their hills would have started the letters: her partners first, then her city, then a king. Claims of that shape end up settled in silver regardless of what the town concedes. The headman paid, and will spend two years recovering it from the road in tolls. It is not a moral arrangement. It is a functioning one, and it is the reason there is a copper road at all.',
      'They walked out yesterday, all five, minus animals and minus cargo, with Šimatum reportedly in a temper of some magnitude concerning the third pack-frame rather than the copper. Anyone who has spent eleven days behind her will recognise the priority immediately. She is going down to the coast to lodge the loss and begin again. What I have not managed to stop turning over is that a town produced good silver for five people and would not have produced a shekel for the sixth, who was standing directly in front of them at the time. I am going east on my own feet, and I am taking a basket with me.',
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
      'We made the one open crossing on the whole run and did not sink, so I arrived on Alašiya prepared to admire a slag heap. The woman who fed me that night had views about what I was writing down.',
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
        text: 'The word she used for plucking was the wrong one, the word for stripping bark off a branch, and she knew it was wrong and used it twice more that night.',
      },
    ],
    standing:
      'Alašiya appears in the Amarna correspondence as a kingdom shipping copper to Egypt in quantity, and Late Cypriot excavation is dominated by metallurgical remains: furnaces, tuyères, slag on an industrial scale. Sheep and goat dairying is attested throughout. The metal cooking surface is inference, and I want to be exact about which kind. A flat sheet of copper is a cheap object in a place that makes copper, which makes it likely and does not make it evidenced, and how common one was in an ordinary kitchen here is not something the archaeology can currently tell you. That frying descends from hot metal is a general truth and not a claim about this island in particular. Kuparra is invented, and so is her name, which is the joke: Cypro-Minoan has never been read, so nobody can correct my spelling of anything on this coast, including her.',
    body: [
      'We did not sink, which for a day and a half was the only thing anybody on that deck was thinking about and the one thing nobody said. You lose the land behind you somewhere in the middle of the morning and nothing appears ahead of you until the following afternoon. Nobody sang. Two of the crew slept the entire way, which I took at the time for indifference and now recognise as a decision. I ate cold chickpeas off cold bread and made a short private list of the people I would want told.',
      'The smoke stands in a line over the low hills inland and is visible long before the coast is. What meets you on landing is not a market but slag, in heaps, glassy and black and cold, tipped out of a furnace and never moved again. I thought it was beautiful. I am perfectly aware that this is the sort of judgement a man makes on the afternoon he does not drown, and I went back past those heaps twice more before dark anyway. This island makes copper for the whole of our world and it looks and smells exactly like a place that does.',
      'The tavern on the harbour appears never to close. I arrived late enough that the ships were lit and the drinkers had reached the hour of the evening when they explain things to you. The woman who runs it is called Kuparra, or near enough to it, and when I wrote the name down she read it over my shoulder and laughed at me for a considerable time. “That is not it,” she said. I asked what it was. “Not that.” She lifted the cup out of my hand, refilled it, and went back to work.',
      'We were both speaking Akkadian, which belongs to neither of us. Almost every conversation in this sea happens in a language nobody at the table grew up in, and the effect is to make everyone blunter with each other and, so far as I can judge, more honest, because the words you use for softening a thing are the first ones you never learned. Nobody on this island can read the island’s own writing either. A few hundred inscriptions, no key, no agreement about what language sits underneath. So it is unlikely anybody will ever be in a position to correct my spelling of her name, including her.',
      'She spent the evening throwing stones at geese.',
      'There is a flock that works the harbour, going through the baskets whenever everyone is occupied. Roughly every half hour Kuparra set down whatever she was holding, walked out into the dark with a stone, and threw it flat and hard into the middle of them. The birds went up in a shrieking heap and resettled forty paces along. She never hit one. I watched most of the evening and I do not believe she has ever hit one. I said something to her about there being an understanding between her and the geese. “It is not an understanding.” She was wiping down a board and did not look up. “If I hit one I have to pluck it. I am working.” The word she used for plucking was the wrong one, the word for stripping bark off a branch, and she knew it was wrong and used it twice more that night. I said this was considerably less romantic than what I had been thinking. “You have been thinking about geese,” she said. “I have been carrying plates.”',
      'She grew up two hours inland beside a smelter, which explains the rest of her kitchen. She does not cook in clay. She cooks on a flat sheet of metal laid straight over the flame, and on an island producing copper by the tonne that is the cheap option and not the luxurious one. Everybody here has one. It changes everything about the cooking. Clay lets its heat go slowly, which is why almost everything I have cooked this year has been a stew or a braise or a long bake, and metal hands it over all at once, so that you can ruin something deliberately in fifteen seconds. I put a version of that to her at some length. “It is a pan,” she said.',
      'What she does with it is cheese. Firm fresh sheep cheese in thick slices, dried off on a cloth, laid onto a dry screaming-hot sheet with no oil under it at all and left there ninety seconds a side while a dark crust builds. Then the oil goes in, then rounds of onion, then a heap of bitter greens turned through the fat until they give up, and the cheese goes back over the top with olives and a hard pour of oil. Bread. Fifteen minutes from cold metal to the table, which anywhere else on this journey would not have softened an onion.',
      'Salt, char, bitterness, and a squeak against the teeth. I have eaten a very great deal of patiently simmered food this year and a hot sheet of metal with four things on it beat most of it. Every fried thing you have ever put in your mouth descends from somebody having hot metal within reach, and on this island that happened early, for industrial reasons that had nothing to do with anybody’s dinner.',
      'Late on she asked what it was I kept writing. I said I wrote down what people eat, so that it would be known a long time from now. “By who?” I explained as well as I could manage. She stacked cups while she considered it, and then told me that if that was the work, I should not be writing about the pan. I asked what I should write instead. “That it was loud. That I was tired. That the food was good and there was enough of it.” She put the cups down. “Nobody remembers a pan.”',
      'I left in the morning. As we pushed off she was out on the stones with her arm already back, and the geese went up, and she went inside.',
    ],
  },
  {
    slug: 'the-road-is-made-of-donkeys',
    card: 'copper-share',
    kind: 'report',
    title: 'The road is made of donkeys',
    region: 'mesopotamia',
    place: 'The hill road, west of Emar',
    date: '2026-08-25',
    access: 'open',
    recipe: 'caravan-pot-with-dried-curd',
    related: [
      { to: '/reports/they-took-the-people-too', label: 'What happened to this caravan four days later' },
      { to: '/reports/never-out-of-sight-of-land', label: 'The sea leg of the same copper road' },
    ],
    standfirst:
      'Eleven days east with eleven donkeys. The arithmetic that decides what moves overland also decides what is in the pot, and by the end of it I was sick of both.',
    hero: {
      name: 'copper-ingots',
      alt: 'A group seated on a stony hillside around bowls of pulses, onions, olives and curds, with four grey oxhide-shaped copper ingots laid out on the ground beside them and laden donkeys behind.',
      caption: 'The grey slabs are the reason everyone is here. Everything else is logistics.',
    },
    figures: [
      {
        name: 'copper-leader', at: 1, size: 'inset',
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
        name: 'copper-share', at: 6, size: 'inset',
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
      'Twice a day Šimatum inspects the third pack-frame. Once in the dark before anything is loaded, running a thumb along the inner face of the near arm, and again at the far end of the day when it all comes off. She has done this on each of the eleven days I have been with her and she will not say what she expects to find. On the fourth morning I asked outright and was told the frame is fine, which answered a different question, and by the ninth I had given up.',
      'The outfit is eleven animals and five people. Šimatum has run it for twenty-two years, since her husband ran it and then could not any longer. She is somewhere past fifty, wrapped against the dust in a blue-grey mantle worth more than every object I own put together, and she can price an animal from across a field and tell you what is wrong with it into the bargain. The remaining four are a nephew of hers, two hired men and a boy. I make six, and I am freight, which nobody has said and everybody understands.',
      'We move before dawn and halt when the animals have had sufficient, which arrives well before the people have had sufficient, and that gap is not a matter for discussion. The route leaves the ports going inland and climbs, and the whole object of it is to reach the Euphrates at Emar, where anything moving between the sea and the rivers changes owner. We have not reached it. Eleven days in we are still up in hill country, which is Šimatum’s decision and not the short way: the direct road east runs over open steppe, and by August she does not trust the wells along it. Nothing about it was built. It is an agreement reached by a very large number of feet over a very long time. On the eleventh day my feet have stopped forgiving any of it.',
      'The exchange at the well on the sixth morning is the one I want written down. A man there had a price for fodder that Šimatum considered unrelated to what fodder is worth, and she stood in front of him and worked it through aloud. An animal carries eighty kilos. It covers twenty-five kilometres between sunrise and stopping. It eats the same whether it is carrying anything or not, so the feed either rides along and displaces paying weight, or it is purchased en route at whatever figure a man beside a well has settled on that morning. She told him which of those she intended to do and what that made his water worth to her, and then she stopped talking. He came down. Afterwards she remarked, without heat, that everything else on a road is conversation.',
      'What we are moving is copper. Oxhide ingots, the same four-cornered slabs I watched swung off a hull on the coast a fortnight ago, and it is tempting to describe a trade route as a single enterprise. It is two. There is a leg by sea and a leg by land with a town wedged between them whose entire reason for existing is the transfer, and the economics either side are so unalike they might as well be separate professions. Copper passes the test with room to spare. Tin passes. Cloth passes, which is why textiles crop up in merchant correspondence far more than a fabric has any right to. Grain fails and has always failed, because feeding the animals that carry grain three hundred kilometres consumes a serious portion of the grain. Hence the sea taking every route it can reach, and hence the inland cities wanting precisely the goods a hull cannot deliver to them.',
      'The list that comes off the animals in the evening is short and peculiar. Cracked grain. Dried pulses. Oil under a seal. Salt. Dried fruit. And a hard grey lump that took me three days to identify, which turns out to be milk: fermented, drained, salted, pressed to a shape and dried until you could injure somebody with it. Crumble a piece into warm water and in twenty minutes you have something between yoghurt and cheese. It is a dairy herd folded into a saddlebag, it is the most ingenious object I have met on this journey, and by the eleventh evening I had enough of everything to resent it for being so.',
      'The pot belongs to the boy and he is competent at it. Onions down slowly in oil with cumin while the animals drink, cracked grain turned through until every piece is slicked, water, twenty-five minutes. Then the pot comes off the fire altogether before the soaked curd goes anywhere near it, because sour dairy will split if it boils and a split pot after eleven hours on foot is a genuine calamity. Dried apricots torn in at the last. Salt. What you get is sour and deep and far better than a sack of dry goods ought to be capable of, and every person present held a view on it, no two views alike, all of them expressed forcefully.',
      'I mentioned my feet. Šimatum allowed a pause and then offered to lift eighty kilos of copper off the third animal so that I could ride, and waited to see whether I would arrive, unaided and in front of her, at what that would cost. I did arrive there. She watched me do it.',
      'So I asked her something else instead, which was whether she liked the road. She was looking at the frame on that third animal and did not turn her head. “My husband liked the road,” she said, and went back to running a thumb along the near arm.',
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
        name: 'mennefer-priest', at: 1, size: 'inset',
        crop: '1 / 1', pan: [-6.5, 3.2], zoom: 1.16,
        alt: 'Yadinu and a shaven-headed priest in white linen with a broad beaded collar working together to season a plucked bird on a dish.',
        caption: 'Nakht. Shaven everywhere, on principle, and the most precise cook I have watched.',
      },
      {
        name: 'mennefer-table', at: 2, size: 'inset',
        crop: '1 / 1', pan: [-1.3, -7.5], zoom: 1.15,
        alt: 'The two of them working at a long table of greens, dates, garlic and conical bread moulds, the pyramids framed in the doorway behind.',
        caption: 'The cones are bread moulds. Egypt has been baking in that exact shape for a thousand years already.',
      },
      {
        name: 'mennefer-offering', at: 4, size: 'col',
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
      'The god is served a hot meal every day and has never eaten one. It is carried in, set down, censed, spoken over, and left alone in a shut room. Later somebody comes back and clears the table. That is the day, every day, and it has been the day here for centuries.',
      'The cooking has to fit inside those hours, which is the first thing that struck me about Nakht’s kitchen and the reason nobody in it is ever hurrying. He is a wab-priest, a rank low enough that he does actual work and high enough that he is inside the wall, and he is shaved smooth over his whole head and body, which is a purity requirement and which he says is the best thing that ever happened to his cooking. He is the most precise cook I have watched anywhere. Not the best. Precise. He measures with his hands the way a scribe rules a line.',
      'What went on the table the day I was there: a roasted bird, a bowl of pulses with green herbs over them, bread in two shapes, dates, figs, onions, a jar of beer and a jar of wine. A good meal by any standard, and also, which took me most of the morning to see, arranged and not served. The bird whole and glazed dark, the loaves stacked, the greens laid round the edge. It is composed to be looked at, because the first thing that happens to it is that a man carries it in and steps backwards out of the room.',
      'That constraint changes the cooking, and I did not expect it to. The bird is salted hard and dry so the skin will crisp instead of sagging. It roasts low for an hour and a quarter and the fat is poured off twice. Then the heat goes right up and it is brushed with honey warmed in wine, twice, ten minutes apart, until the skin is dark and glassy. Every one of those decisions is about how it will look on the dish when it is set down. The annoying part, and I have been chewing on it since, is that aiming at appearance produces a better bird than aiming straight at flavour would.',
      'Then the reversion, which is my favourite fact in Egypt. The god does not consume the offering and the offering is not burnt or thrown away. It comes back out of the room and is divided: priests, singers, doorkeepers, the men who carried it in. A temple is a religious institution and it is also, in strictly practical terms, an extremely large catering operation with a very unusual first customer. The offering table is the point at which the whole economy of the place turns back into dinner.',
      'I ate some of it and it was excellent.',
      'I asked him whether it was not a great deal of care to take over a diner who would never taste any of it. He did not take offence and he did not reach for the answer about the reversion, which was there and which he could have had for nothing. He asked what I was doing in Mennefer. I told him I was writing down what people eat so that it would be known a long time from now. He turned the bird and thought about it for a while. Then he asked me who was going to eat the meals I wrote down. I have been four days on the river since and I have not thought of anything to say to that.',
      'Behind this town, on the desert edge, are the pyramids, and they are not new. They were already thirteen hundred years old on the day Nakht was born, and everybody here treats them the way you treat a mountain, as scenery with some history on it. He ate rather more of the bird than I did, then went and sat on a mat and played senet against himself, which is what the middle of the day is for. “I usually win,” he said.',
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
        name: 'alashiya-mortar', at: 1, size: 'inset',
        crop: '4 / 5', pan: [-14, 4], zoom: 1.7,
        alt: 'A young crewman grinding herbs in a stone mortar on deck while Yadinu works beside him, the firebox glowing behind them.',
        caption: 'Abdi, who does the cooking because he is the youngest and lost an argument about it years ago.',
      },
      {
        name: 'alashiya-mise', at: 5, size: 'col',
        alt: 'Ingredients laid out on a deck plank: flatbread, a bowl of fresh curd, an onion, garlic, dates, a bowl of chickpeas, olives, a large bundle of green herbs and a jug of oil, with tall storage jars behind.',
        caption: 'Bought this morning off a beach, which is a thing you can only do if you are never far from one.',
      },
      {
        name: 'alashiya-spread', at: 2, size: 'inset',
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
        at: 5,
        text: 'A coast is a handrail. Let go of it and every advantage a ship has over a donkey goes with it.',
      },
    ],
    standing:
      'Nobody wrote down what a ship’s crew ate. What you have is a hold. One of ours went down off Uluburun and lay on the seabed until you found her — ten tonnes of copper aboard, which tells you she was on the leg we have not done yet — and in among it almonds, pine nuts, figs, olives, grapes, pomegranates, coriander and sumac. That is a shopping list from a working ship. The method is mine.',
    body: [
      'This ship carries exactly one fire and it lives inside a box of sand. The box is fired clay, roughly stool-sized, open across the top with a feeding hole cut in one side, and it sits amidships in a bed deep enough that nothing beneath it ever warms up. That is the sum total of the galley on a hull made of timber, flax, cordage and pitch, every one of which will accept a spark and convert nine men into an anecdote other crews tell. It gets lit late in the day. Somebody stays beside it the entire time it burns. It is dead before dark.',
      'Every mouthful anybody swallows out here is dictated by that box. A single pot, because there is a single heat. Nothing requiring two temperatures together. Nothing requiring an hour at a rolling boil, since charcoal is cargo and cargo is why the voyage exists. Abdi handles it, on the grounds of being youngest and having lost an argument about it some years back, and what he produces is chickpeas: left in water overnight, simmered until they give, then oil and onion and cracked coriander worked through them and the whole lot cooked down until it holds its shape on a spoon. Half of it pressed against the pot wall, half left in one piece.',
      'It goes onto flatbread that has been spread with cold curd, with olives and torn herb scattered over and oil poured across, and every man eats it upright. The reason it outperforms that description is contact between hot and cold. Where the chickpeas land, the curd loosens, and between the two you get a third texture belonging to neither. Nobody arranged that. It is what happens when a man has one pot and no options whatsoever.',
      'I offered him some observation about the elegance of building a kitchen around a single source of heat. He kept stirring. “You get off at Ugarit,” he said. It was not a question. When I told him I was not getting off at Ugarit he looked at me for a second, returned to the pot, and was noticeably better company for the remainder of the run.',
      'We have been at sea nine days and the land has not once been out of view. I raise it because the word ship makes you picture open water and an empty horizon and somebody doing something ingenious with stars. We do almost none of that. This is a cart on a road: land off the left hand from dawn, a beach or a river mouth to duck into before dark, away again at first light. Nine days of that, and I could have walked the entire distance along the sand at a stroll and arrived.',
      'I put some of that to Abdi, who has done this run nine times. He said nine days of coast is nine days of the same beach, that the only sailing on the whole trip happens the day after tomorrow, and that he would sooner have it behind him than hear it admired. None of which makes the coast timid. A coast is a rail to hold. It fixes where you are, it offers somewhere to run when the weather turns, and it puts a market within reach every single evening, which is why we eat better than you would guess. Half of what went into that pot was bought off a beach the same morning. Let go of the coast and all three vanish together, along with every advantage a hull has over a donkey. The cargo, incidentally, is not copper but the money for copper, which is a different proposition, because nobody ships copper towards Alašiya. Sealed jars of oil, bales of cloth, a quantity of tin, and silver by weight in a chest the captain sleeps on and will not discuss. The loaded leg is the one coming home.',
      'Two more days brings us up to Ugarit, my own city, and the end of the rail. Alašiya lies out west with nothing between here and there: a day and a half of open water given a reasonable wind and appreciably longer without one. It is the only true crossing on the whole run, and for nine days everybody has been quieter about it than about anything else. Abdi is cooking tomorrow tonight. I asked whether the crossing bothered him. He said the box would not be lit out there, since there is no beach to run for, so it had to be done in advance. That was his entire reply and I did not raise it again.',
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
      'Four days in a Delta village with a family, a yard, one pot and a table that spent an afternoon being a boat. Nobody here has seen a pyramid.',
    hero: {
      name: 'delta-family',
      alt: 'Yadinu sitting at a low table with a woman and a small child, sorting bowls of pulses and grain, with spring onions and dates on the table, a domed oven behind and the river and a mudbrick village beyond.',
      caption: 'Ipuy, Merit, and a third party who contributed mainly by eating the dates.',
    },
    figures: [
      {
        name: 'delta-dough', at: 4, size: 'inset',
        crop: '4 / 5', pan: [0, 0], zoom: 1,
        alt: 'Close view of Yadinu and Merit working flour and dough at a low table, the child watching from below with his chin near the tabletop.',
        caption: 'The grain is the same grain that becomes bread. What happens next is the only difference.',
      },
      {
        name: 'delta-meal', at: 5, size: 'col',
        alt: 'A bowl of pale grain porridge scattered with green herbs held in two hands, beside a large round flatbread, a bowl of white curds, dates, spring onions and a clay jug.',
        caption: 'Emmer, curds, green onion, four dates, oil poured on at the table. No part of this required a scribe.',
      },
      {
        name: 'delta-table', at: 2, size: 'inset',
        crop: '16 / 9', pan: [-2.2, 3.2], zoom: 1.13,
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
        text: 'The flax is on record because the flax was taxed. The baskets are on no record anywhere.',
      },
    ],
    standing:
      'I would call this a confident reconstruction, which is not a phrase I use often. No Egyptian text you will ever dig up describes this dish. But cracked grain, a pot, salt and a fire are older than Egypt, and your archaeology gives you the grain and the pots and the querns in enormous quantity. This does not need a recipe to have existed. It needs a household, and Egypt was several million of them.',
    body: [
      'A plank across two piers of mud brick stands in the yard, and over four days I saw it serve as a bench for work, a surface for meals, somewhere to spread flax out, a bed for a sleeping child and, through most of one afternoon and with absolute seriousness, a boat. The boat was the achievement of a boy of about four whose name I never managed to fix, because it altered according to who was shouting it and how much trouble he was in at the time.',
      'The boy’s father is Ipuy, who raises flax and conducts some arrangement involving a neighbour’s cattle that I never fully grasped and was not intended to. His mother is Merit, who handles everything that is not flax or cattle, and who is why I stayed four days instead of one. There is a single room and nobody spends any time in it. Life happens in the yard, which holds a domed oven, a saddle quern, three storage jars, a mortar, and the plank.',
      'This is not the Egypt in your head. No cliffs, no line of desert a short walk off. Instead there is wet flat green running to every horizon, sliced into a thousand pieces by channels, and birdsong so constant that it takes a full day before you stop hearing it. Villages sit raised on generations of their own rubbish, a few feet clear of the flood, their mud brick going round at the corners. No one in this village has ever seen a pyramid. I was asked more than once what one is.',
      'Breakfast is cracked emmer and water and that is the entirety of it. Merit dries the grain in a pan first for two minutes or so, and that step is the whole distance between this dish and wallpaper paste: untoasted it tastes of nothing at all, toasted it tastes of biscuits and nuts. Water then, and salt, and twenty-five minutes at a simmer during which she gets four other things done. At the end she beats it hard with the spoon for half a minute and it stops being grain sitting in liquid and becomes something creamy, with not one thing added to it.',
      'She toasts with the pan tipped and her wrist working, her eyes on the doorway rather than the grain, and she takes it off at the right moment every single time without ever glancing down. I have given that more thought than the dish requires.',
      'Over the top goes a loose mound of fresh curd, left unstirred. Green onion sliced, tops as well. Whatever green herb is to hand. Two dates per bowl, torn rather than chopped, functioning as punctuation and not as sugar. Then oil, poured on with a heavy hand, across everything. Each person stirs their own. The boy’s is stirred for him, and he lodges an objection to this every morning as a matter of principle before eating the lot.',
      'You will have read that Egypt ran on bread and beer, which is true and which quietly misleads, because it implies those were the only destinations for grain. They were the two destinations WHEN SOMEONE WAS KEEPING COUNT. Bread and beer are what an institution hands out. They divide into portions, they can be tallied, they last long enough to be issued, and so they are what fills the accounts and the ration lists and the tomb walls where a man’s eternal provisioning is set down like a bill of lading. Nobody ever had to account for what a household ate at dawn. It is made from grain already in the house by somebody drawing no wage.',
      'Merit also makes baskets. Coiled reed, at speed, down by the water in the stretch of afternoon too hot for anything else, and a man passing through every few weeks takes them away. This is not pin money. Across a year it is a substantial share of what keeps this family fed, and precisely the same silence swallows it: the flax is on record because the flax was taxed, and the baskets are on no record anywhere. I said so to her. I said that the afternoons were going to leave no trace at all, and that three thousand years from now the flax would still be sitting on a list while the baskets sat on nothing. She took it for a joke to begin with. Then she saw that it was not one. “He knows,” she said, and tipped her chin at the boy, who was beneath the plank at the time, wrecking a basket.',
      'On the fifth morning I left carrying a basket I had not asked for and did not require, and which I have to this day. Ipuy came with me as far as the water and told me a long story about the cattle of which I followed perhaps half. Merit was toasting grain and did not look up, and there was no earthly reason why she should have.',
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
        name: 'hattusa-inspect', at: 0, size: 'inset',
        crop: '3 / 4', pan: [37, -11], zoom: 1.9,
        alt: 'Yadinu crouched beside a penned sheep with a hand in its fleece, looking it over, while a large grey-bearded man stands watching with the citadel walls behind.',
        caption: 'Hand in the fleece, over the loin. You are feeling for the animal under the wool, and the wool is there to stop you.',
      },
      {
        name: 'hattusa-haggle', at: 5, size: 'inset',
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
        text: 'Silver is for treaties and for palaces. What actually moves is barley and cloth and oil, in amounts no one records.',
      },
    ],
    standing:
      'The archive on that ridge is the biggest thing of ours you have ever recovered — tens of thousands of tablets, treaties and rituals and omens and laws, over a hundred named breads — and not one recipe in the whole of it. Not one. You know what a sheep was worth and not one thing about what anybody did with it. So this pot is inference: the cheap cut because that is what the price lists imply people could afford, the alliums because they are everywhere, the spoonful of honey because putting sweetness next to meat is the one thing this kitchen is genuinely known for. Three hours on a low fire, and it comes out far better than the argument that produced it.',
    body: [
      'A sheep standing in a pen is mostly wool, and wool is an excellent way of hiding an animal from whoever is about to buy it. What you do is drop onto your heels and push a hand in over the loin and across the shoulder, where the meat actually is, and read what is under the fleece instead of admiring what is on it. If the spine stands proud you are paying for bone and disappointment. The man watching me do this was called Zuwa, sixty or thereabouts, shaped like a storage jar and grey to the chest, and he was enjoying himself enormously.',
      'I had climbed to Ḫattuša for the archive and ended up staying for the pens. The road up takes two days out of the plain and the air gets thinner and harder as you go, and at the top there are walls along a ridge put there by people who had settled the question of whether anybody was coming in. Temples and tablets sit behind those walls. The market sits outside them in the dust below the gate, which is where markets sit everywhere, because inside is where things are recorded and outside is where things are bought.',
      'What is inside those walls is also what makes this kingdom unlike anywhere else I have shopped. Ḫatti writes its prices down. There is a real code on real tablets up that hill, and it states in flat unarguable sentences what an ox is worth, what a hide is worth, what a month of a hired man is worth. A sheep sits near the bottom of that list at roughly one shekel of silver.',
      'I quoted it at him. I knew what I was doing and I did it anyway.',
      'He laughed for some time before answering. Then he asked whether I had ever come across a law written about something nobody argued over. I said I had not. “There it is,” he said. And besides, he said, hardly anything in that market changes hands for silver in the first place. Silver is for treaties and for palaces. What actually moves is barley and cloth and oil, in amounts no one records, at rates that shift with the season and with how much the two of you happen to like one another. Then he said that the law was very welcome to come down and buy the sheep itself. He added something in Hittite that I do not have and did not offer to translate, and the men at the next pen found it very funny indeed.',
      'I paid in barley and I paid more than a shekel. He tried to sell me a goat twice. I declined twice. Both of us went away pleased with the morning.',
      'For anyone doing this in a shop rather than a pen, the principle survives the translation: buy whatever nobody else is competing for. That means neck. Not leg. Leg is what a confident shopper reaches for and it is precisely wrong here, too lean to last three hours and dry long before it surrenders. Neck carries bone and gristle and threads of fat, all three of which have work to do, and it costs about a third as much. Thick slices, on the bone. The rest of the dish cost me almost nothing, which is the real lesson of that market: the allium baskets are the ones nobody bothers to watch. Eight big leeks to a kilo and a half of meat, in two goes, for the reason Bēltum will give you at more length downriver. The sheep makes it rich. The leeks make it a dish.',
      'Zuwa keeps a lyre propped by his stool and plays it between customers, competently, and with full awareness that he is doing it competently. I asked him what he times with it. He looked at me the way you would look at a man asking how you weigh wind, and said that a sheep market is four fifths waiting and he had put some thought into how to spend it. Not everything is a method. I went back down that road with an armful of leeks I could barely see over.',
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
        name: 'cretan-fish-mise', at: 3, size: 'col',
        alt: 'Everything the dish needs laid out on a table: a whole fish on a shallow dish, thick bundles of fennel, bowls of dark olives and chopped green herbs, a jug of olive oil and heads of garlic.',
        caption: 'The whole dish, before anything happens to it. There is nothing here you cannot buy on a Tuesday.',
      },
      {
        name: 'cretan-fish-stuffing', at: 4, size: 'inset',
        crop: '4 / 5', pan: [0, 0], zoom: 1,
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
        name: 'idaia-lyre', at: 0, size: 'inset',
        crop: '3 / 4', pan: [0, 0], zoom: 1,
        alt: 'A Cretan woman seated on a stool on a terrace high above the sea, playing a small wooden lyre, olive trees and a dish of greens beside her.',
        caption: 'The timer. She keeps it on a hook by the door and plays with her back to the fire.',
      },
      {
        name: 'cretan-fish-plate', at: 7, size: 'col',
        alt: 'The finished dish: three whole fish on a bed of braised fennel in a wide ochre platter, scattered with green herbs and glistening with oil, a bowl of dark olives beside it.',
        caption: 'What comes off the fire. Olives at the end, and the oil going on last at the table.',
      },
    ],
    pulls: [
      {
        at: 6,
        text: '“And the fish is still good,” she said, and went to get the olives.',
      },
    ],
    standing:
      'You will not find an Aegean recipe. Not one, anywhere, ever — because we did not write them. Every ingredient here is either counted on a Knossos tablet from the palace years or dug out of a Cretan midden — the fennel, the coriander, the celery, the oil, the wine, the olives — and nothing anywhere records anybody putting them together. The fish is not even on the tablets, which tells you about the scribes rather than the diet: a bream landed at Amnisos in the morning and eaten there at noon passed through no storeroom and needed no clerk. So this is a reconstruction. Amnisos is in the archive. Idaia is not, and neither is the fish she cooked me under a palace nobody has run in a hundred and fifty years. That is the entire problem with this world, and it is why I am bothering to write any of it down.',
    body: [
      'Idaia owns no way of measuring time and has never wanted one. What she owns is a lyre that hangs on a peg beside the door, and she plays it seated with her back to the fire. A fish takes two songs. Not two songs give or take, but two specific songs, the same pair on every occasion, because she has been at this for years and knows to the note how long each of them runs.',
      'She cooks for boat crews at Amnisos, the port Knossos uses. Uses is generous. The palace on the hill burned before my grandfather was born and nobody has rebuilt it, so what sits up there is an extremely large ruin with households camped round its edges. The bottom of the hill is a different matter, because a beach that was good for pulling boats onto is still good for pulling boats onto after the accountants have gone. Sand, a row of houses turned the wrong way for the wind, and by mid-morning the smell of fish being opened at speed.',
      'She is perhaps thirty, has firm opinions concerning how other people manage their fires, and can take a bream apart faster than the sentence describing it. Her Akkadian runs to about forty words and I have not one word of her own language, so two days passed largely in gesture, which neither of us minded. When I put out a hand for a knife to butterfly one of the fish, she removed the knife from my reach without saying anything at all.',
      'She buys them whole and about as long as her forearm, half a kilo apiece near enough, choosing on a clear eye and red gills underneath, which is guidance that has not altered in three thousand years and is not about to. Two of that size will do four people. The whole virtue of the dish depends on the fish staying on its bones with its cavity packed.',
      'What packs it is fennel, which grows wild the length of this shore right down to where the sand begins, tall and feathery and giving off aniseed the instant it is bruised. She uses every part. The thick lower stalks, split down their length, make a single layer underneath. The fronds get chopped small along with coriander leaf, celery leaf and garlic worked to a paste, then salted and then worked again by hand for a good deal longer than looks necessary. I asked why. “Green,” she said. “Not grass.” When it became obvious that I had not followed, she took hold of my wrist, pushed my hand down into the bowl and kept it there until I had.',
      'Each fish is then scored twice on each side, right down to the bone, and stuffed until nothing more will go in. No oven is involved at any stage. It cooks on a broad shallow clay dish set straight onto the embers, and the single trick worth carrying home is what she does with the wine: it goes round the edge and never across the skin. Wine over the top steams the fish and the skin is finished. Wine underneath steams the fennel while the skin stays dry enough to blister. Oil across, salt on the outside, and then she reaches for the lyre.',
      'The clerks at Knossos counted fennel by the unit under the word ma-ra-tu-wo, which is the same word standing behind the name Marathon, meaning a field of the stuff. I told her this, clumsily and at excessive length, along with the fact that her harbour appears on those tablets as a-mi-ni-so and that tablets of that sort are how I know anything whatsoever about the ground I was standing on. She heard me out. Then she asked whether the palace had burned down. I said that it had, a long time ago. “And the fish is still good,” she said, and went to fetch the olives.',
      'It came off the embers cleaner than the list of ingredients would lead you to expect. Underneath, the bulb had turned sweet and silky and taken a little colour at the edges. Inside, the uncooked fronds had held their sharpness and scented the flesh from within. Olives at the last moment and a hard pour of oil once it was on the table, which is what keeps the whole thing from being merely polite.',
      'You can only really ruin it by trusting a clock instead of the fish. Watch for the shoulder coming away clean from the bone, and start watching sooner than you think you need to. Or acquire a lyre and learn two songs. She stood up at the end of the second one, laid a thumb on the shoulder, and did not need to look.',
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
        name: 'portrait-13', at: 1, size: 'inset',
        alt:
          'Yadinu frowning in concentration over a small clay tablet held in both hands, a large pot steaming on the fire in front of him and bowls of grain along the table.',
        caption: 'The tablet says how much went into the storeroom. It has nothing whatsoever to say about the pot.',
      },
      {
        name: 'portrait-06', at: 4, size: 'inset',
        alt:
          'Yadinu walking through a working port carrying a bowl, beached boats and a sail behind him, wide bowls of soup and bread set out on barrels in the foreground.',
        caption: 'Lunch on the quay. Sailors eat early, eat fast, and know exactly which stall is lying to you.',
      },
      {
        // Last figure in the post: nothing follows it to wrap past a float, so it runs
        // the full column instead of hanging off the end of the article.
        name: 'portrait-08', at: 6, size: 'col',
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
      'Somewhere under the ash at Ugarit there are tablets with my marks on them. Oil in and oil out, whose seal, which ship, what came up short. I did that for twelve years under two kings of my own city and one very old one in Egypt, who came to his throne so long before I was born that nobody in the storeroom had ever filed a shipment under anybody else’s name. I was good at it, and the result is that you can now state precisely how much sesame oil crossed one storeroom floor in one bad year and nothing whatever about what anybody ate.',
      'The fire that ended my city is the reason you have any of it. Clay bakes. That is the entire mechanism by which my working notes outlived every meal I ever sat down to, and if you want the argument for this site in one physical fact, that is the fact.',
      'It took me an embarrassing length of time to notice what was missing from my own work. Every jar I counted went somewhere. Somebody opened it, somebody cooked with it, somebody sat down. None of that was any of my business, so none of it was written, so none of it exists.',
      'I stopped counting and went to look instead. Ships to Alašiya and on west into the islands. South into Egypt, where the bread is better than anyone north of it will concede. North with the caravans up onto the Anatolian plateau. East, eventually, into Babylonian kitchens, where I was corrected about onions by a woman in Sippar who repeated herself for my benefit. “You put them in at the beginning,” she said. “They are not a decoration.”',
      'I have eaten with sailors, shepherds, soldiers, bakers and dock hands, for two reasons. They are the people who cook. And a palace will feed you magnificently exactly once, after which it would like a favour.',
      'An inscription lasts because stone is stubborn. A supper does not last at all. That is why every account of my world is crowded with temples and tribute and nearly empty of dinner, and it is a fact about what endures rather than a fact about what mattered to anybody living in it.',
      'So this is the missing half. Where a text exists I cook what it says. Where none does, I build something defensible out of what is proven and tell you in the recipe itself where the evidence ran out and I started. There is also advice on what to put in a modern basket and what to walk past, an account of what this food does to a body over a week, and a running objection to the idea that everybody before about 1500 AD lived on grey porridge and resignation.',
      'On the guessing, since you will want to know its size. You know we kept barley. You know we grew onions. You know we ate sheep. Anyone who tells you what a Babylonian had on a particular Tuesday is selling you something, and I say that as a man who was in the room and still could not tell you. Where a tablet reads clearly I say so. Where it is broken, where the plant has never been identified, where the method is mine in period clothing, that goes in the recipe and not in a note at the bottom, because it is information you can act on.',
      'The cooking is the point. Everything else here exists to get a decent pot of something onto your table.',
    ],
  },
  {
    slug: 'the-world-as-i-know-it',
    // The map sits under the paragraph about names and routes, because that is the
    // paragraph it illustrates. Index into `body`.
    showMapAfter: 2,
    hero: {
      name: 'portrait-03',
      alt:
          'Yadinu sitting cross-legged on the deck of a ship under sail, eating grilled fish and greens from a shallow dish, open sea and crew behind him.',
        caption: 'Two days out. The sea is the reason this is one world and not five — it is simply faster than the road.',
    },
    figures: [
      {
        name: 'portrait-12', at: 5, size: 'inset',
        alt:
          'Yadinu holding up a round dark loaf to the light in a market of tall storage jars, baskets of grain and bread heaped on the table in front of him.',
        caption: 'Barley country. Everything starts as grain here and most of it stays that way.',
      },
      {
        name: 'portrait-14', at: 6, size: 'inset',
        crop: '4 / 5', pan: [11.6, 17.9], zoom: 1.45,
        alt:
          'Yadinu holding a cup and a piece of bread on a Nile quay, a brightly painted temple wall and an obelisk behind him, palms and river boats on the water beyond.',
        caption: 'Egypt, and Egyptian bread. Better than ours. I have stopped arguing about it.',
      },
      {
        name: 'portrait-07', at: 7, size: 'inset',
        crop: '1 / 1', pan: [1.1, 42], zoom: 2.2,
        alt:
          'Yadinu holding up a large round loaf in a bakery, a domed oven alight behind him and another baker working at the table.',
        caption: 'A hundred named breads in the archive and instructions for almost none of them.',
      },
      {
        name: 'landscape-13', at: 8, size: 'inset',
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
      'The chart above is mine and you cannot read it, which is fair, since it was never meant for you. All the wavy scoring is water. The three circles with rings around them are the places I keep returning to: Ugarit on the coast, Mari up the first river, Bābili a long way down the second. That dashed line heading east out of Ugarit is the road, and somewhere on it in these pages there is a caravan. The clusters of little wedges are names.',
      'There is a short list of men entitled to call one another brother, and they do it in Akkadian, and none of them is my king. Egypt, Ḫatti, Assyria, Babylonia: four Great Kings, four courts, one shared language of address that belongs to none of them. Ugarit is not on that list. We answer to the Hittite viceroy at Carchemish, who answers to Ḫattuša, and the ships pay for the arrangement. I mention it because a list like that is the reason a cargo moves at all, and because of what once happened to it.',
      'A name was struck off it. Whoever kept the draft of one particular treaty listed the Great Kings, wrote the king of Ahhiyawa among them, and then drew a line through him. Nobody I have asked will tell me why, and Ahhiyawa has not been heard from since. I have never seen that tablet and I never will; what a man in my trade sees is a name that used to appear on a manifest and has stopped appearing. Both of those are the same event, arriving in different rooms.',
      'Names are the quickest way to see how far things moved. At home we call the city ủgrt; every scribe writing to us in Akkadian calls it Ugarit, Akkadian being the language business happens in whether or not anybody at the table speaks it at home. Crete is ke-re-te on a tablet at Knossos, Keftiu to an Egyptian painter putting tribute-bearers on a tomb wall, and Kaptara to a Babylonian who has in all likelihood never laid eyes on it. One island, four names, four scripts. A name does not travel that far unless ships carry it.',
      'And the ships are why five kitchens amount to one world. Leave Ugarit and you can be on Alašiya inside a day and a half, on Crete inside the week. Grain comes up out of Egypt. Copper comes across from Alašiya. Oil and wine go everywhere at once in quantities nobody has ever successfully counted. Water beats land for speed, so the ports are where recipes change hands along with everything else that changes hands.',
      'MESOPOTAMIA is the one kitchen of the five that left behind anything you could call a recipe, and what it left is three tablets written some five hundred years before my own time, the best of them carrying twenty-five entries, composed by professionals for other professionals and consequently listing no quantity and no cooking time anywhere in them. Barley country, east and downriver. The flavour runs sour: beer into the pot, soured milk stirred through once the heat is off, raw crushed garlic at the finish. Onions go into very nearly everything, and they will argue the point with you at length.',
      'EGYPT bakes better than any of us and is entirely aware of it. Emmer wheat in tall clay moulds, beer thick enough to count as a meal, and between them those two bracket the day from waking to dark. Protein comes off the water as fowl and river fish. Sweetness comes from dates and from tiger nuts. The country names itself Kmt, the black land, after the silt each flood lays down, in deliberate contrast to the red desert on either side; everybody else calls it something along the lines of Miṣru. Not one recipe of theirs reaches you. What reaches you instead is their kitchens, painted in sequence on tomb walls, which is a record of a different kind.',
      'ḪATTI thinks about bread more than anywhere else I have been and refuses to explain any of it. Their texts name well past a hundred varieties and describe almost none. It is high cold country up on the Anatolian plateau, with an archive at Ḫattuša running to tens of thousands of tablets. The distinguishing habit is sweetness set against meat, which nobody to the east of them will countenance: there is a dish that bakes lamb slowly in olive oil and honey together and it is far better than that description makes it sound. Excellent hazelnuts. And crushed chickpeas with raw cucumber over the top, which I have encountered nowhere else on earth.',
      'THE AEGEAN holds the longest list of seasonings of the five and never once records what was done with any of them. The palace accounts at Knossos are stock inventories, and so are the tablets from the merchants’ houses outside the walls at Mycenae, which is where the long lists of coriander and cumin and fennel and sesame and celery and mint actually come from. You can say precisely how much of each went into which storeroom and nothing at all about the dish it ended up in. Olive oil there is the ordinary fat rather than the expensive one, and the sheep cheese justifies the crossing on its own. Their script cannot write a final consonant and makes no distinction between l and r, so every name in Linear B is an approximate sketch of a sound. In place of instructions you get hardware: portable clay grills, notched along the top edge to seat skewers. Somebody was cooking meat on sticks over charcoal three thousand years ago and the equipment proves it even though nobody wrote it down.',
      'CANAAN AND THE COAST is home, and of the five it left the thinnest kitchen of its own, which is what happens to a place whose whole occupation is moving everybody else’s food. To ourselves we are knʿn. To a Babylonian clerk we are Kinaḫḫu, and in the letters that go down to Egypt we are Kinaḫni. Harbours, warehouses, other people’s cargo. Olive oil pressed at a scale that is hard to picture, wine with resin through it, a great deal of fish, and a drinking club called the marzeaḥ whose membership rolls and property holdings you can read in detail and whose menu is a blank.',
      'Put the five beside one another and they do not resolve into five cuisines. They resolve into a single pantry spoken with different accents. Grain, pulse, allium, oil, soured dairy, bread: that spine runs unbroken from Pylos to Nippur. The variations are real and they are seasonings on a shared frame. Which fat. Which sour thing. Whether sugar is permitted anywhere near a joint of meat. Learn to make a lentil and barley pot with onions through it and you can cook in any of the five, given a few swaps.',
      'The absences matter as much as the contents. Nothing here has a tomato in it, or a potato, or a chilli, or maize, or citrus, or sugar, or rice, or chocolate, or coffee. All of those turn up afterwards, most of them a great deal afterwards, and most of them off a landmass nobody in this story suspects. A good half of what a modern cook files under Mediterranean is five centuries old at the outside. The other half is three thousand, and it is the half sitting in the pot.',
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
