// Place names, in the forms the people of this world actually used for each other.
//
// WHY THIS EXISTS. Every place on this site has at least three names: what its own people
// called it, what their neighbours called it, and what it is called now. Crete is
// `ke-re-te` on a Linear B tablet, `Keftiu` to an Egyptian scribe, `Kaptara` to a
// Babylonian one, and Crete on a modern map. Those are not trivia — they are the shipping
// manifest of the Late Bronze Age. A name travelling from Knossos to Thebes to Babylon
// tells you the route the ships took.
//
// HOW TO READ AN ENTRY:
//   at         real longitude and latitude. Kept because it is true and cheap to keep,
//              though nothing draws from it now — see `tablet`.
//   tablet     where this place's MARK sits on the clay map, as a percentage of the image.
//              Not derived from `at`, and it could not be: the tablet is a schematic chart
//              scored by hand, so a pin has to point at the circle or island the scribe
//              actually cut, not at a longitude. Read off the image by eye; if the tablet
//              is regenerated these must all be read again.
//   modern     what to search for on a map today
//   local      what its own inhabitants called it, where we know
//   others     what other people in this world called it, tagged by whose word it is
//   note       one line on why the place matters here
//
// A CAUTION, because it is the honest thing. Ancient toponyms are argued over. The
// Alashiya = Cyprus identification is very widely accepted and not universal. Keftiu is
// generally read as Crete or the Aegean more broadly, and 'more broadly' is doing work.
// Linear B spellings are syllabic and cannot write final consonants or distinguish l from
// r, so `ke-re-te` is a spelling of a sound, not a sound. Entries marked `contested: true`
// are the ones where a specialist would want to argue.

export const places = [
  {
    key: 'ugarit',
    tablet: { x: 46.9, y: 46.3 },
    at: [35.60, 35.60],
    modern: 'Ras Shamra, Syria',
    local: { name: 'ủgrt', say: 'oo-ga-RIT', script: 'ugaritic', lang: 'Ugaritic' },
    others: [
      { name: 'Ugarit', lang: 'Akkadian', note: 'as written in the Amarna correspondence' },
    ],
    note: 'The port this site is written from. Burnt around 1190 BC and never reoccupied, which is why its archive survives.',
  },
  {
    key: 'crete',
    tablet: { x: 29.3, y: 17.9 },
    at: [24.80, 35.20],
    modern: 'Crete',
    local: { name: 'ke-re-te', say: 'keh-reh-teh', script: 'linearb', lang: 'Mycenaean Greek' },
    others: [
      { name: 'ke-re-si-jo', lang: 'Mycenaean Greek', note: 'the adjective — "Cretan", as in Cretan-style goods' },
      { name: 'Keftiu (Kftjw)', lang: 'Egyptian', note: 'painted in the Theban tombs, bringing tribute' },
      { name: 'Kaptara', lang: 'Akkadian', note: 'and Kaphtor in later West Semitic' },
    ],
    note: 'Four names in four scripts for one island, which is a fair measure of how much traffic went through it.',
    contested: true,
  },
  {
    key: 'cyprus',
    tablet: { x: 30.9, y: 37.1 },
    at: [33.20, 35.00],
    modern: 'Cyprus',
    local: null,
    others: [
      { name: 'Alašiya', lang: 'Akkadian', note: 'the name used in the Amarna letters, writing to a king who sent copper' },
      { name: 'Asy / Irs', lang: 'Egyptian' },
    ],
    note: 'Where the copper came from. The identification with Cyprus is widely held and not quite unanimous.',
    contested: true,
  },
  {
    key: 'egypt',
    tablet: { x: 35.2, y: 71.6 },
    at: [32.64, 25.70],
    modern: 'Egypt',
    local: { name: 'Kmt', say: 'KEH-met', script: 'egyptian', lang: 'Egyptian', gloss: 'the black land — the dark silt of the flood plain, as against the red desert' },
    others: [
      { name: 'Miṣru', lang: 'Akkadian' },
      { name: 'ai-ku-pi-ti-jo', lang: 'Mycenaean Greek', note: 'read as "Egyptian" on a Linear B tablet' },
    ],
    note: 'Grain, and the best beer in this world whatever the Hittites say.',
  },
  {
    key: 'hatti',
    tablet: { x: 68.2, y: 11.9 },
    at: [34.62, 40.02],
    modern: 'Central Anatolia, Türkiye',
    local: { name: 'Ḫatti', say: 'HAT-tee', lang: 'Hittite' },
    others: [{ name: 'Ḫatti', lang: 'Akkadian', note: 'the same name, in the diplomatic language everyone wrote in' }],
    note: 'The highland kingdom. Cold, bread-obsessed, and the only kitchen here that puts honey with meat on purpose.',
  },
  {
    key: 'hattusa',
    tablet: { x: 68.2, y: 11.9 },
    at: [34.62, 40.02],
    modern: 'Boğazkale, Türkiye',
    local: { name: 'Ḫattuša', say: 'hat-TOO-sha', lang: 'Hittite' },
    others: [],
    note: 'The Hittite capital and its archive. Tens of thousands of tablets, well over a hundred named breads, almost no instructions.',
  },
  {
    key: 'babylon',
    tablet: { x: 64.0, y: 78.0 },
    at: [44.42, 32.54],
    modern: 'near Hillah, Iraq',
    local: { name: 'Bābili', say: 'BAB-ih-lee', lang: 'Akkadian', gloss: 'gate of the god' },
    others: [{ name: 'KÁ.DINGIR.RA', lang: 'Sumerian', script: 'cuneiform', note: 'the same meaning, written in logograms' }],
    note: 'The Yale culinary tablets are Old Babylonian, from a few generations before the city became the regional power.',
  },
  {
    key: 'mari',
    tablet: { x: 69.5, y: 38.0 },
    at: [40.89, 34.55],
    modern: 'Tell Hariri, Syria',
    local: { name: 'Mari', lang: 'Akkadian' },
    others: [],
    note: 'A palace archive on the middle Euphrates. Letters about truffles arriving late, which is the best-dated food on this site.',
  },
  {
    key: 'pylos',
    at: [21.70, 37.03],
    modern: 'Pylos, Greece',
    local: { name: 'pu-ro', say: 'POO-ro', script: 'linearb', lang: 'Mycenaean Greek' },
    others: [],
    note: 'Burnt around 1200 BC. The fire baked its clay tablets hard and preserved the palace accounts by destroying the palace.',
  },
  {
    key: 'knossos',
    tablet: { x: 29.3, y: 17.9 },
    at: [25.16, 35.30],
    modern: 'Knossos, Crete',
    local: { name: 'ko-no-so', say: 'ko-NO-so', script: 'linearb', lang: 'Mycenaean Greek' },
    others: [],
    note: 'The other great Linear B archive, and the source of most of what we know about Aegean spice.',
  },
  {
    key: 'thebes-egypt',
    tablet: { x: 35.2, y: 71.6 },
    at: [32.64, 25.70],
    modern: 'Luxor, Egypt',
    local: { name: 'Wꜣst', say: 'WAH-set', script: 'egyptian', lang: 'Egyptian' },
    others: [{ name: 'Thebes', lang: 'Greek', note: 'a much later name, and confusingly also a Greek city' }],
    note: 'The tomb paintings that show Egyptian kitchens, and Deir el-Medina next door, where the workmen wrote down their rations.',
  },
  {
    key: 'canaan',
    at: [35.00, 32.30],
    modern: 'the Levantine coast',
    local: { name: 'knʿn', say: 'ka-NAH-an', lang: 'Northwest Semitic' },
    others: [{ name: 'Kinaḫḫu', lang: 'Akkadian', note: 'and Kinaḫni in the Amarna letters' }],
    note: 'Ports, warehouses and other people’s cargo. Left less of a kitchen of its own than anywhere else here.',
  },
]

export const placeByKey = Object.fromEntries(places.map((p) => [p.key, p]))

/** Every name a place goes by, in one line: local first, then the others, then modern. */
export function nameLine(key) {
  const p = placeByKey[key]
  if (!p) return ''
  const parts = []
  if (p.local) parts.push(p.local.name)
  parts.push(...(p.others || []).map((o) => o.name))
  parts.push(p.modern)
  return parts.join(' · ')
}
