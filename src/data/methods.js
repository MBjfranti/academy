// The workstation. Techniques that sit underneath many dishes, and the
// material facts that make Bronze Age cooking behave differently from ours.

export const methods = [
  {
    slug: 'hulled-grain',
    title: 'Hulled grain, and why it changes everything',
    kicker: 'The most important unwritten fact in the collection',
    grade: 'inferred',
    body: [
      'Emmer and einkorn — the wheats of the Bronze Age Near East and Mediterranean — are hulled. The grain does not thresh free of its husk the way modern bread wheat does. It has to be parched over a fire and then pounded before it will release, and only then can it be milled.',
      'No ancient text records this, because it was the most obvious thing in the world to everyone who had ever handled grain. It is exactly the kind of knowledge that vanishes: too basic to write, too fundamental to guess at later.',
      'The consequence is that every loaf in this collection carries an extra step, that milled flour was a processed good rather than a raw one, and that the fire and the mill were connected in a way modern baking has entirely forgotten.',
    ],
    appliesTo: ['emmer-loaves-in-conical-moulds', 'thick-loaf-for-the-hearth-harsi', 'barley-and-fig-feast-porridge'],
  },
  {
    slug: 'fat',
    title: 'Fat, and the absence of a neutral one',
    kicker: 'There is no such thing as an unflavoured cooking medium',
    grade: 'attested',
    body: [
      'The Bronze Age cook chose between sheep-tail fat, butter and clarified butter, olive oil in the west and south, sesame oil in Mesopotamia, moringa and linseed oil in Egypt, and pig fat in the north. Every one of them tastes of something, and the choice of fat is the single largest regional marker in this whole collection.',
      'Sheep-tail fat in particular has almost no modern equivalent in western kitchens. It is soft, it renders clean, it carries the smell of the animal, and it is the default in Mesopotamian cooking in a way that no substitution really reproduces.',
      'Where a recipe here calls for a fat, the fat is the regional signature. Swapping it out is the fastest way to make an attested dish stop tasting like itself.',
    ],
    appliesTo: ['lamb-and-beet-stew-tuhu', 'millet-porridge-with-hazelnut-and-pork-fat', 'lentils-with-oil-and-cumin-ugarit'],
  },
  {
    slug: 'sour',
    title: 'Souring, before there was anything to sour with',
    kicker: 'No citrus, no vinegar industry, no distillation',
    grade: 'attested',
    body: [
      'Acidity in a Bronze Age kitchen came from soured milk, from wine and beer and what they turned into, from pomegranate and sumac and unripe grape, and from deliberate fermentation. It did not come from lemons, which had not arrived, and it did not come from a bottle.',
      'Soured milk — kisimmu in Akkadian — does a great deal of work across the Mesopotamian corpus, and it is added at the end, off the boil, for the plain reason that it splits otherwise. Where a recipe here tempers dairy into a broth, that instruction is doing real chemistry, whether or not the scribe knew why.',
    ],
    appliesTo: ['unwinding-broth-pasrutum', 'elamite-broth-me-elamutim', 'sorghum-flatbread-with-soured-milk'],
  },
  {
    slug: 'sweet',
    title: 'Sweetness without sugar',
    kicker: 'Cane sugar is not a Bronze Age ingredient anywhere in this Academy',
    grade: 'attested',
    body: [
      'Sweetening came from honey, from dates and date syrup, from reduced grape must, from figs, and from carob. Each brings acid, colour and body along with the sugar, which is why substituting refined sugar into any dish here flattens it.',
      'Date syrup in Mesopotamia and honey in the Aegean and the north do broadly the same structural job and taste nothing alike. The regional split in sweeteners tracks the regional split in everything else.',
    ],
    appliesTo: ['date-and-sesame-confection-mersu', 'tiger-nut-and-honey-cones', 'egtved-grog'],
  },
  {
    slug: 'fire',
    title: 'Fire, and the three vessels',
    kicker: 'Open hearth, enclosed oven, portable brazier',
    grade: 'attested',
    body: [
      'Bronze Age cooking happens in three heat regimes and the vessels are diagnostic. The open hearth with a pot standing over it — the Aegean tripod cauldron is the aristocratic version of this. The enclosed clay oven, the tannur or tabun of the Levant and the Egyptian bread oven, which bakes by radiant heat from its own walls. And the portable brazier holding embers, of which the Hittite huprushi is the named example.',
      'None of them does what a modern hob does. The hearth gives fierce heat from below and nothing from the sides; the clay oven gives even radiant heat and no control; the brazier gives a bed of embers that dies slowly and predictably. Recipes here specify which, because the vessel is the technique.',
    ],
    appliesTo: ['sheep-on-the-huprushi', 'emmer-loaves-in-conical-moulds', 'kid-in-the-tripod-cauldron'],
  },
  {
    slug: 'preserving',
    title: 'Keeping food alive through a year',
    kicker: 'Salt, sun, smoke, oil, honey, and controlled rot',
    grade: 'attested',
    body: [
      'Salting and sun-drying carried fish and meat; immersion in oil carried cheese and vegetables; honey carried fruit; and deliberate fermentation carried everything else. Mesopotamian siqqu — a brined fermented fish product — belongs to the same family as every fish sauce made since, and was a staple condiment rather than a curiosity.',
      'Salt itself was a strategic commodity. Egypt had natron; central Europe had rock salt mined at Hallstatt on an industrial scale centuries before the Iron Age culture named after that site existed. Where a region had salt, it had a food economy that could travel.',
    ],
    appliesTo: ['split-and-salted-nile-fish', 'emmer-beer-heneqet'],
  },
  {
    slug: 'not-available',
    title: 'The pantry that does not exist',
    kicker: 'What no Bronze Age kitchen in this Academy ever saw',
    grade: 'attested',
    body: [
      'Nothing from the Americas: no tomato, potato, chilli, maize, vanilla, common bean, squash or turkey. Nothing distilled: no spirits, and no essential oils as we understand them. No cane sugar. No citrus. No rice west of the Indus in any quantity. No hops in beer. No chicken as a staple bird. No hard-wheat pasta. No butter-and-flour roux.',
      'The most common failure in Bronze Age cooking is not getting a technique wrong. It is reaching, without noticing, for something that had not arrived yet.',
    ],
    appliesTo: [],
  },
]

export const methodBySlug = Object.fromEntries(methods.map((m) => [m.slug, m]))
