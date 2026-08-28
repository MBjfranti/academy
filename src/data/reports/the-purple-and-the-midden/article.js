const article = {
  slug: 'the-purple-and-the-midden',
  kind: 'report',
  author: 'anniwiya',
  region: 'aegean',
  place: 'The dye works on the shore below Pylos',
  date: '2026-09-02',
  access: 'open',
  recipe: 'fish-baked-on-fennel-amnisos',
  title: 'The Purple and the Midden',
  standfirst:
    'A heap of broken shells taller than a man, and a colour worth more than the ship that carries it. Both come out of the same animal, half a turn of the wrist apart.',
  hero: {
    name: 'hero',
    placeholder: true,
    ratio: '3 / 2',
  },
  figures: [
    { at: 9, name: 'shell-heap', size: 'wide', placeholder: true, ratio: '3 / 2' },
    { at: 12, name: 'kuwatta', size: 'col', placeholder: true, ratio: '4 / 5' },
    { at: 20, name: 'the-turn', size: 'wide', placeholder: true, ratio: '3 / 2' },
    { at: 27, name: 'vats', size: 'wide', placeholder: true, ratio: '3 / 2' },
    {
      /* THE PAIR IS THE ARGUMENT. The gland and the meal came out of one shell a half-turn
         apart, and it lands on the paragraph that says exactly that. At matched height the
         two frames make the point faster than the prose does. */
      at: 33,
      name: 'the-gland',
      placeholder: true,
      pair: [
        { name: 'the-gland', placeholder: true, ratio: '3 / 2' },
        { name: 'boiled-murex', placeholder: true, ratio: '4 / 5' },
      ],
    },
    { at: 42, name: 'the-tablet', size: 'col', placeholder: true, ratio: '4 / 5' },
    { at: 46, name: 'the-cloth', size: 'col', placeholder: true, ratio: '4 / 5' },
  ],
  pulls: [
    { at: 36, text: 'The dearest thing in the house and the cheapest meal in it come out of one shell.' },
  ],
  body: [
    'You smell the purple works before you see them. How much warning you get depends on the wind, and on the day I walked down it gave me about a quarter of a mile.',
    'I had gone down to seal oil. Twelve stirrup jars for a ship that wanted them before the weather turned. The sealing takes an hour and the walk takes half a day, so I had the afternoon.',
    'I have worn purple. I assumed that qualified me to watch it being made. The first thing I believed about it was wrong. Everything I had built on that fell over with it.',
    'The heap is the first thing you see. It stands higher than a man and runs the length of two houses, and all of it is broken shell. Every one of those shells was opened by hand. Every one held a single animal about the size of my thumb.',

    { h: 'Where the colour comes from' },
    'This is the thing I had wrong, and everything else here follows from it. I had assumed you open the snail and find purple inside, the way you open a pomegranate and find red. You do not. The animal carries no colour anywhere in it.',
    'Near the head it carries a gland about the size of a grain of wheat. Kuwatta cut one out and set it on a stone in front of me. It was cream going grey at the edge, wet, and entirely dull. Set beside the cloth it eventually becomes, it looks like a mistake.',
    'She told me to leave it there and went back to her bench. Over the next hour it turned yellow. Then it went green, and the green is strong enough that a stranger assumes the thing has spoiled. Then it passed through a blue. Then it arrived at purple and stayed there.',
    'Air and daylight do that. The gland carries something that becomes the colour once air reaches it, and until then it stays as dull as it looked on the stone.',
    'So the whole industry is a problem of delivery. Everything on this beach exists to get that gland out of a live snail and into open air without ruining it in between. Every strange arrangement I saw all afternoon turned out to be an answer to that one problem.',

    { h: 'Why the works sit on the shingle and smell so bad' },
    'Start with the animal. A snail out of the water begins to rot inside a day, and the gland rots with it. Kuwatta says a gland out of a snail that sat overnight gives a weak brown that washes out of the wool within a season.',
    'That means the women have to open them where the boats land them, on the same tide. You cannot cart them inland alive in any quantity and you cannot keep them until tomorrow.',
    'Which is why the works are here, on shingle, at the water, rather than up at the palace where the weaving is done. The building follows the animal. Boys and divers take the snails off the rocks at low water. The baskets come up the beach all morning. The benches work all morning to keep pace with them.',
    'A woman cracks the shell with a stone, lifts the gland out with a bronze pick, and drops it in a jar. Then she reaches for the next shell. Kuwatta has done this since she was nine. She is about my age. Her hands work while she talks to you and she keeps her eyes on your face throughout.',
    'The empty shell goes on the heap. They quarry the heap too. Crushed shell goes into floor plaster and into the beds of tracks, so the works end up paving the road that carries the cloth away.',
    'The smell has the same cause. One gland is far too small to dye with, so the women salt them and stand them in shallow open vats until there is enough to work. The salt stops them rotting outright. It does not stop them breaking down, and breaking down is what has to happen before the liquid will take to wool.',
    'So the vats hold salted animal tissue, softening, for days, under a roof, in summer. That is the smell. The works read it as a sign of a vat coming right, and a vat that smells of little is a vat in trouble.',
    'It smells like a beach after a bad tide, brought indoors and shut in. Familiarity does nothing to it. Kuwatta says you stop mentioning it. Noticing it is a separate matter.',
    'The village upwind pays less rent than the village across the headland. Everyone there can tell you why. The rent is the only place anybody writes it down.',

    { h: 'How much of this goes into a cloak' },
    'I asked how many snails a cloak takes. Kuwatta said nobody counts snails and went back to work.',
    'I weigh and seal goods for the palace, so counting is the one thing I can do here. I counted the benches, then I counted one woman for a while, and then I did the arithmetic on the walk back.',
    'Twenty women sit at the benches. Each of them cracks a shell, picks the gland out and drops it, then does it again. About four thousand times each, before the light goes. That is eighty thousand animals in a working day, out of one shed, on one beach.',
    'Then I asked what a day of that produces once it is through the vat and onto wool. She thought about it and said a hem. A band about the width of my hand, along one edge of one garment, and perhaps the start of a second if the vat had been strong.',
    'I made her say it twice, because I did not believe the first answer.',
    'Eighty thousand animals for a hem. A cloak carries many times that much cloth, and the dye has to reach all of it at the same strength or the garment comes out patchy. You can do the rest of the arithmetic yourself, and it is the reason kings are the only people who wear the stuff. The price is the animals. It has never been anything else.',
    'One more thing decides whether a day like that is worth having. Two kinds of snail live on these rocks and they do not give the same colour. One runs red, the other toward blue, and the difference survives the vat and shows in the finished cloth.',
    'Once the glands are out of the shells and into a jar together, nobody can separate them again, and a mixed jar makes a mixed vat. A mixed vat makes a garment that is two colours in the wrong way. So the sorting has to happen before anybody cracks a shell. That puts it underwater, on one breath, done by eye from the outside of the shell. A boy of eleven does it, and he is paid nothing extra for being the only person who can.',
    'He is the reason a cloak comes out one colour rather than two. As far as I could establish, nobody at the works has ever put it to him in those terms.',

    { h: 'Why the cloth is hung up, and what happens when it is' },
    'The dyeing works the same way the gland on the stone did, and watching it is the best hour I have spent in twelve years at Pylos.',
    'Wool goes down into the vat and comes out of it a dirty green. It looks ruined. A woman who had paid for purple would want her money back on the spot. I said so out loud, the yard enjoyed it, and Kuwatta told me to come back in an hour.',
    'Then they hang it, and the air finishes the work the vat only prepared. The line runs the length of the yard. The cloth turns as it hangs, starting at the outside of each fold and working inward as the air reaches deeper. A fold pressed hard against itself stays green until somebody shakes it loose, and then that patch turns too, several minutes behind the rest.',
    'I watched one full line come round. It takes about as long as a meal.',
    'This is why the sheds stand open to the water instead of shutting the weather out. Moving air and daylight are the last stage of manufacture, and they are the only stage the works do not have to pay for.',

    { h: 'What the women eat, and why it matters to the price' },
    'I asked what becomes of the animals themselves.',
    'Kuwatta looked at me the way you look at somebody who has asked what becomes of bread. “We eat them,” she said.',
    'The flesh comes out with the same pick that took the gland, a half turn of the wrist later. It goes into a pot of sea water and needs nothing added to it, because it arrives already salted.',
    'They want a short boil. Held longer than a few minutes they go to leather and stay there. Done properly they are chewy in a way that is the point rather than a fault, and they taste of iodine and rock and cold water.',
    'It took me until the walk home to understand why this matters beyond the pot. Eighty thousand animals a day is eighty thousand mouthfuls of meat a day, at no cost to anybody. The palace pays these women in grain and figs. It sends down no meat, and no oil to cook meat in. The work these women are already doing produces their protein as waste, at their elbow, before noon.',
    'A trade this expensive in labour can only run if the labour is cheap to keep alive. The most valuable substance in the building and the cheapest meal in it come out of the same shell, half a turn of the wrist apart. The second is what makes the first affordable. A workforce that feeds itself off the discard costs the palace grain and figs and nothing further.',
    'The rest of what they eat comes off the same water. Nets go out from this beach and whatever they land is what the works get. The fish come small, and they go split onto a bed of fennel over embers, because fennel grows behind the sheds and costs nothing.',
    'Kuwatta grinds nothing and bakes nothing. Her fire is small and she lights it late. A woman who has cracked shells since first light does not then want a long method.',

    { h: 'What the tablet says about her' },
    'The palace counts purple cloth apart from ordinary cloth. It has its own word and its own line in the accounts, and out of that word the scribes built a name for the trade. Kuwatta belongs to that trade. Her own name belongs nowhere in the record.',
    'The tablet that accounts for her gives four things: a number of women, a heading, a measure of grain and a measure of figs. The heading is the town they came from, on the Anatolian coast. Sixty miles down that same coast is the town I came from.',
    'So seven Knidian women stand at these vats and one Milesian woman weighs oil up at the palace. Between us we amount to two headings and no names. I know exactly how that entry reads. I have been inside one for twelve years.',

    { h: 'Who ends up wearing it' },
    'A purple cloak keeps you as warm as a brown one. It wears through on the same schedule and rain treats it no differently. The colour improves nothing about the garment and was never meant to.',
    'What it does is show everyone in the room what was spent. Eighty thousand animals a day. A boy holding his breath to sort shells. Twenty women at benches from first light, a shed nobody wants to live downwind of, and a line of cloth turning in the afternoon air. The cloak carries all of that on its surface, legibly, to anyone who knows what they are looking at.',
    'Most people do not know. They see that it is beautiful and expensive, and they assume something other than arithmetic joins those two facts.',
    'I was given purple twice. Once at my marriage, because a bride out of a king’s house arrives in it. Once afterwards, when the man who had received me wanted a room full of people to see what he had received.',
    'Both times I was told it was an honour. Both times somebody had done this counting first and decided I was worth that many animals.',
    'I have no quarrel with the cloth. It is beautiful. It holds its colour for years, and the people who make it are proud of it and say so before anybody asks.',
    'My quarrel is with the story they tell about it up the hill. Up there the colour is noble, and royal, and people speak of it as though it belonged to kings by some quality of its own. It comes out of a rock snail, through a vat of salted rot, in a shed on a beach. The weather finishes it. People who have never walked down here added the rest.',

    { h: 'Up the track' },
    'I sealed my twelve jars. By weight the oil in them is worth more than the cloth going out on the same ship. The cloth will fetch more, because a buyer can see cloth across a room and has to be told about oil.',
    'Kuwatta put a handful of the boiled snails in a fold of cloth for me to take up the track. She did it while talking about something else. Thanks would have embarrassed her, so I said nothing and took them.',
    'I ate them on the ridge, with the heap below me and the sea past it going the colour the vats were still working toward. They were very good. They cost nothing at all. No tablet anywhere records that they exist.',
  ],
  standing: [
    'Purple dye in the Bronze Age Aegean comes from the hypobranchial gland of rock snails. Hexaplex trunculus and Bolinus brandaris are the main species and they give different shades. The dye precursor is colourless and develops through yellow, green and blue to purple on exposure to light and air. Crushed-shell middens at Aegean coastal sites show the industry running here centuries before it became associated with the Levantine cities.',
    'Linear B records purple-worked textiles as a distinct category, and a designation of women workers is built from the same root. Scribes at Pylos often list women by their place of origin on the Anatolian coast rather than by name, and issue grain and figs against the group.',
    'The snails are edible, and shell middens at dye sites mix industrial waste with food waste. That the workers systematically ate the flesh is an inference from the economics rather than a documented practice. Kuwatta, the seven Knidian women, the works below Pylos and the twelve jars are invented.',
  ],
  glossary: [
    { term: 'The gland', gloss: 'A pale organ near the snail’s head, the size of a grain of wheat, holding the colourless stuff that becomes purple in sunlight.' },
    { term: 'The purple women', gloss: 'A trade on the tablets, recorded as a group with a ration. The group has an origin. It has no names.' },
    { term: 'Stirrup jar', gloss: 'The sealed export jar for scented oil, named for the loop over its false spout.' },
  ],
  related: [
    { to: '/reports/the-thousand-cups-of-pylos', label: 'Anniwiya, on what a feast is really counting' },
    { to: '/reports/the-iliad-and-the-honesty', label: 'Anniwiya, on the price inside an attractive story' },
  ],
}

export default article
