export default {
  article: 'the-purple-and-the-midden',
  rule: 'Photograph an industry, not a treasure. Purple is made in a shed by women with cracked hands beside a heap of rubbish that smells. Anniwiya appears in none of these: the piece carries her in the first person and the only recurring body is Kuwatta.',
  frames: [
    {
      name: 'hero',
      mode: 'reportage',
      role: 'hero',
      claim: 'The most valuable colour in the world comes out of a shed on a beach.',
      preferredEvidence: 'Women seated on the shingle cracking shells with stones, baskets of live snails beside them, the shell heap rising behind, open sea beyond.',
      avoid: 'A dye vat as spectacle, a purple cloak on display, a palace, a museum, or anyone posing.',
    },
    {
      name: 'shell-heap',
      mode: 'landscape',
      role: 'body',
      claim: 'The heap is the only part of the business anybody outside can see.',
      preferredEvidence: 'A midden of crushed and bleached shell taller than a man running the length of two buildings, still growing at one end, low sheds and the shore behind it.',
      avoid: 'An archaeological section, a excavated trench, a tidy spoil heap, or a beauty shot of shells.',
    },
    {
      name: 'kuwatta',
      mode: 'portrait',
      role: 'body',
      claim: 'She has done this since she was nine, and she does not look at her hands.',
      preferredEvidence: 'A woman of about thirty at the cracking bench, stone in one hand and bronze pick in the other, looking level at whoever is talking to her rather than down at the work.',
      avoid: 'A smile at the camera, a picturesque labourer, pity, a clean apron, or hands held up for the lens.',
    },
    {
      /* The single best fact in the subject and the reason this frame exists: the dye is
         substantive, so the cloth leaves the vat green and turns on the line as the air
         reaches it. Shoot the turn, not the finished cloth. */
      name: 'the-turn',
      mode: 'reportage',
      role: 'body',
      claim: 'The sun makes the colour. The vat only holds it until the sun is ready.',
      preferredEvidence: 'A long line of hung wool caught mid-change, green at the folds and pressed edges, purple where the air has reached it, the whole line reading as a gradient along its length.',
      avoid: 'Uniformly purple cloth, a dyed-goods display, a market stall, or a colour chart.',
    },
    {
      name: 'vats',
      mode: 'reportage',
      role: 'body',
      claim: 'The days in the vat are what the smell is.',
      preferredEvidence: 'Shallow open vats of salted gland standing in a dim shed, a woman passing with her face turned away, flies, the sea light hard in the doorway behind.',
      avoid: 'A cauldron over a fire, a witch-brew, bubbling, dramatic steam, or a clean workshop.',
    },
    {
      /* PAIR, first half. Runs at matched height against `boiled-murex`. The two frames are
         one shell a half-turn apart, and they have to be read against each other. */
      name: 'the-gland',
      mode: 'specimen',
      role: 'body',
      claim: 'The colour lives in an organ the size of a grain of wheat.',
      preferredEvidence: 'A cracked shell open on a stone bench with the pale gland lifted clear on the tip of a bronze pick, the gland still colourless.',
      avoid: 'Anything already purple, a museum case, a display label, or a clean studio product shot.',
    },
    {
      /* PAIR, second half. */
      name: 'boiled-murex',
      mode: 'specimen',
      role: 'body',
      claim: 'The same animal, half a turn later, is the cheapest meal on the beach.',
      preferredEvidence: 'A coarse bowl of boiled snail flesh, grey and rubbery, no garnish and no arrangement, on a plank beside the working bench.',
      avoid: 'A styled food photograph, garnish, a restaurant plate, lemon, or clean studio light.',
    },
    {
      name: 'the-tablet',
      mode: 'specimen',
      role: 'body',
      claim: 'The entry gives a number, a heading, a measure of grain and a measure of figs. It gives no names.',
      preferredEvidence: 'A small clay tablet ruled into lines, each line carrying a short group of signs and a numeral, under raking light.',
      avoid: 'Legible real Linear B, a museum tablet under glass, a display label, or a scribe posing with it.',
    },
    {
      name: 'the-cloth',
      mode: 'specimen',
      role: 'body',
      claim: 'The finished thing is beautiful, and that is the whole of its function.',
      preferredEvidence: 'A folded length of deep purple wool on a plain board, the weave coarse and visible, one edge still showing the undyed selvedge.',
      avoid: 'Silk, sheen, gold thread, embroidery, a royal setting, or a fashion photograph.',
    },
  ],
}
