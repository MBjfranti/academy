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
    portrait: 'yadinu-face',
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
    portrait: 'henut-face',
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
    portrait: 'balatu-face',
  },
  {
    id: 'anniwiya',
    name: 'Anniwiya',
    of: 'Millawanda',
    trade: 'a king’s daughter, then a grinder, then a weigher of oil',
    beat: 'The Aegean and western Anatolia',
    regions: ['aegean'],
    age: 32,
    line: 'Born a king’s daughter, married across the water, and ten years at a quern recorded as a number and a measure of grain.',
    portrait: 'anniwiya-face',
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
