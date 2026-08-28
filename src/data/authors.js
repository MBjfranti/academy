// THE FOUR WRITERS. The prose brief is docs/personas.md — backstories, physical
// descriptions, voice, and what each of them is wrong about. This file is only the part a
// machine needs: who wrote a post, what they are called on a byline, and which of the map
// they are allowed to write about.
//
// Every post in fieldReports.js carries `author: '<id>'`. Nothing here is optional and
// nothing falls back to Yadinu, because a silent fallback is exactly how thirteen articles
// ended up in one voice.
//
// `regions` is the beat, and it is enforced rather than decorative — see `check()` at the
// bottom. Yadinu holds two keys because the Levantine coast and the Anatolian plateau are
// one road to the man who walks it; the other three hold one each.

export const authors = [
  {
    id: 'yadinu',
    name: 'Yadinu',
    of: 'Ugarit',
    // Shown under a headline. Their trade, not their subject: a reader meeting a byline
    // cold wants to know why this person is worth listening to about dinner.
    trade: 'palace provisioning scribe',
    beat: 'The Levant and eastern Anatolia',
    regions: ['levant', 'hatti'],
    age: 31,
    // One line, for a card or a hover. The whole persona is in docs/personas.md.
    line: 'Eleven years counting jars into a store at Ugarit, and five walking the roads that filled it.',
    portrait: 'avatar',
    face: 'face',
    bio: [
      'Yadinu spent eleven years counting jars in the palace stores at Ugarit. Then he took to the roads and decks that supplied them. He knows cargo by weight, meals by stopping place, and distance by the next water jar.',
      'He writes as a traveller. Ports, mountain roads, weather, pack animals, and difficult captains keep his feet moving and his claims honest.',
    ],
    basis:
      'Ugaritic records, merchant letters, wreck cargoes, and the demands of Bronze Age travel support his working world. Yadinu himself is invented.',
  },
  {
    id: 'henut',
    name: 'Henut',
    of: 'Set Maat',
    trade: 'baker and brewer to the tomb crew',
    beat: 'Egypt, the Delta to the cataract',
    regions: ['egypt'],
    age: 46,
    line: 'Twenty-two years feeding a walled village in a dry valley that grows nothing at all.',
    portrait: 'avatar',
    face: 'face',
    bio: [
      'Henut has spent twenty-two years feeding the royal tomb crew at Set Maat. She runs bread moulds, beer jars, and ration days with the calm of a woman who has watched every grand plan arrive hungry.',
      'She is the funny one. Her jokes come from work: bad grain, proud officials, scorching ovens, and the endless human talent for being absent when something heavy needs lifting.',
    ],
    basis:
      'Records from Deir el-Medina preserve rations, absences, quarrels, and work stoppages in rare detail. Henut is invented; her workplace is richly attested.',
  },
  {
    id: 'balatu',
    name: 'Balāṭu',
    of: 'Babylon',
    trade: 'temple cook, nuḫatimmu',
    beat: 'Mesopotamia and Elam',
    regions: ['mesopotamia'],
    age: 54,
    line: 'The only writer here who can read a recipe, because his people are the only ones who wrote any.',
    portrait: 'avatar',
    face: 'face',
    bio: [
      'Balāṭu is a Babylonian temple cook and an antiquarian of the stove. He reads culinary tablets already ancient in his own lifetime, then tests their dead words with a knife, mortar, and boiling pot.',
      'He argues from method. A damaged sign interests him. A fashionable mistranslation irritates him. A successful broth can change his mind, though it seldom improves his temper.',
    ],
    basis:
      'Mesopotamian culinary tablets, lexical lists, and temple records supply his texts and techniques. Balāṭu and his career are invented.',
  },
  {
    id: 'anniwiya',
    name: 'Anniwiya',
    of: 'Millawanda',
    trade: 'a king’s daughter, then a grinder, then a weigher of oil',
    beat: 'The Aegean and western Anatolia',
    regions: ['aegean'],
    age: 28,
    line: 'Born a king’s daughter, married across the water, and eight years at a quern recorded as a number and a measure of grain.',
    portrait: 'avatar',
    face: 'face',
    bio: [
      'Anniwiya was born in a Mycenaean king’s house and married across the sea to Millawanda. War returned her to Pylos as property. Eight years at a grinding stone taught her to read palace grandeur from the floor.',
      'She now weighs and seals scented oil for export. Men once treated her beauty as diplomatic property. She writes about appetite, ceremony, and the price hidden inside an attractive story.',
    ],
    basis:
      'Linear B tablets record groups of Milesian women and children by origin and ration, without personal names. Anniwiya is invented among them.',
  },
]

export const byId = Object.fromEntries(authors.map((a) => [a.id, a]))

/** The byline. `Henut of Set Maat`. */
export const byline = (id) => {
  const a = byId[id]
  return a ? `${a.name} of ${a.of}` : ''
}

/* Beat enforcement, run at import in development.

   The point of splitting one narrator into four is that each piece is written by somebody
   who lives there. A post filed under `aegean` and attributed to the Babylonian cook is not
   a typo with a cosmetic consequence — it is the failure the split exists to prevent, and
   it is invisible on the rendered page because a byline and a region label sit in different
   corners of the layout. So it fails loudly here instead.

   Where two beats touch — Cyprus, the Cilician coast, the Aegean-Hittite border — the piece
   belongs to whoever lives on that side of the water. The other one writes a reply. */
export function check(posts) {
  const problems = []
  for (const p of posts) {
    const a = byId[p.author]
    if (!a) {
      problems.push(`${p.slug}: unknown author ${JSON.stringify(p.author)}`)
    } else if (!a.regions.includes(p.region)) {
      problems.push(
        `${p.slug}: ${a.name} does not write about ${p.region} (beat: ${a.regions.join(', ')})`,
      )
    }
  }
  return problems
}
