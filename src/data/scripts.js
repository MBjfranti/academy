// Ancient scripts, for mood.
//
// ── WHAT THESE ARE, AND WHAT THEY ARE NOT ────────────────────────────────────────────
//
// Each entry is a REAL WORD in a real script, with its transliteration and its meaning.
// They are NOT phonetic spellings of the site's English dish names, and they are not
// decorative squiggles. "Babylonian Beet Lamb" has no cuneiform spelling; ŠE, the sign for
// barley, does — so the site shows the ingredient word, glossed, rather than inventing a
// transcription of a modern title.
//
// Every codepoint below was resolved through `unicodedata.lookup()` by the sign's official
// Unicode name, not typed from a chart, and `scripts/font/build_scripts.py` re-verifies
// each one against the shipped font's cmap. A sign the font cannot draw is a tofu box, and
// a tofu box on a page about accuracy is worse than no sign at all.
//
// ── THE ONE CORRECTNESS TRAP ─────────────────────────────────────────────────────────
//
// HITTITE IS WRITTEN IN CUNEIFORM. Anatolian hieroglyphs are a different script, used for
// Luwian and for monumental and seal inscriptions — not for the Hittite kitchen tablets
// this site draws on. Tagging the Hittite dishes with Anatolian hieroglyphs would look
// plausible and be wrong, so `hatti` maps to cuneiform here and the Anatolian font is not
// shipped at all.
//
// ── AND ONE TYPOGRAPHIC ONE ──────────────────────────────────────────────────────────
//
// No browser composes Egyptian quadrats: HarfBuzz does not implement the format controls
// (U+13430–U+1343F), so Noto renders them as tofu and NewGardiner as blank ems. Everything
// here is therefore written LINEARLY, sign after sign, which is how Egyptological
// transliteration is printed anyway.
//
// THE WRITER'S MARK IS THE EXCEPTION, AND IT IS SET IN REAL QUADRATS. The two Egyptian names
// there carry an explicit `quadrats` array: one string per block, its signs stacked inside.
// The browser composes nothing — the grouping is stated in the data and drawn with a grid, so
// the format controls are never needed. That is why it works where the general case cannot.
//
// The grouping itself is a judgement. Which signs share a block is governed by their shapes:
// a tall sign takes a block alone, a flat loaf tucks under the sign it follows. The
// arrangements below are plausible and idiomatic rather than copied from a specific
// inscription, and each gloss says which blocks were chosen.

/** Which script each region in provenance.js is written in. */
export const REGION_SCRIPT = {
  mesopotamia: 'cuneiform',
  hatti: 'cuneiform', // cuneiform, NOT Anatolian hieroglyphs — see above
  egypt: 'egyptian',
  aegean: 'linearb',
  levant: 'ugaritic',
}

export const SCRIPTS = {
  cuneiform: {
    label: 'Cuneiform',
    note: 'Sumerian logograms, as used in Akkadian and Hittite scribal practice. Read left to right.',
    font: 'var(--script-cuneiform)',
  },
  egyptian: {
    label: 'Egyptian hieroglyphs',
    note: 'Written linearly rather than in quadrats, because no browser composes quadrats.',
    font: 'var(--script-egyptian)',
  },
  linearb: {
    label: 'Linear B',
    note: 'Mycenaean Greek syllabary. Each sign is a syllable, and the spellings below are attested on the tablets.',
    font: 'var(--script-linearb)',
  },
  anatolian: {
    label: 'Anatolian hieroglyphs',
    note: 'The script of Luwian, written in Anatolia on seals and monuments. Used here for one name only.',
    font: 'var(--script-anatolian)',
  },
  ugaritic: {
    label: 'Ugaritic',
    note: 'The alphabetic cuneiform of Ugarit — a true alphabet, unlike the Mesopotamian signs above.',
    font: 'var(--script-ugaritic)',
  },
}

/* The words themselves.
   `signs`  the string as it will render
   `t`      transliteration
   `gloss`  what it means
   `of`     the Unicode sign names, so a reader can check the spelling and so the build
            script can re-derive `signs` rather than trusting a pasted literal */
export const WORDS = {
  cuneiform: [
    { signs: '\u{120FB}', t: 'NINDA', gloss: 'bread', of: ['GAR'] },
    { signs: '\u{122BA}', t: 'ŠE', gloss: 'barley', of: ['SHE'] },
    { signs: '\u{12369}', t: 'ZÍZ', gloss: 'emmer wheat', of: ['ZIZ2'] },
    { signs: '\u{1235C}', t: 'UZU', gloss: 'meat', of: ['UZU'] },
    { signs: '\u{12049}', t: 'KAŠ', gloss: 'beer', of: ['BI'] },
    { signs: '\u{120FE}', t: 'GEŠTIN', gloss: 'wine', of: ['GESHTIN'] },
    { signs: '\u{1224C}', t: 'Ì', gloss: 'oil, fat', of: ['NI'] },
    { signs: '\u{120B5}', t: 'GA', gloss: 'milk', of: ['GA'] },
    { signs: '\u{121FB}', t: 'UDU', gloss: 'sheep', of: ['LU'] },
    { signs: '\u{12081}', t: 'DUG', gloss: 'pot', of: ['DUG'] },
    // SAR is the garden sign, written after plant names as a determinative — the right
    // register for a dish named after a green. HU is read MUŠEN, "bird", and does the
    // same job after bird names.
    { signs: '\u{122AC}', t: 'SAR', gloss: 'garden vegetable', of: ['SAR'] },
    { signs: '\u{12137}', t: 'MUŠEN', gloss: 'bird', of: ['HU'] },
    { signs: '\u{122E7}', t: 'SUM', gloss: 'onion, allium', of: ['SUM'] },
    { signs: '\u{12129}', t: 'KU₆', gloss: 'fish', of: ['HA'] },
  ],

  /* Written linearly. Where a word ends in a determinative — a sign that classifies rather
     than sounds — it is noted in the gloss, because a reader counting signs against the
     transliteration will otherwise find one too many. */
  egyptian: [
    { signs: '\u{133CF}\u{133D0}', t: 't', gloss: 'bread (loaf determinative)', of: ['X001', 'X002'] },
    {
      signs: '\u{1339B}\u{13216}\u{1320E}\u{133CF}\u{133CA}',
      t: 'ḥnqt',
      gloss: 'beer (jar determinative)',
      of: ['V028', 'N035', 'N029', 'X001', 'W022'],
    },
    {
      signs: '\u{1339B}\u{13153}\u{1313F}\u{133CF}\u{13212}',
      t: 'ḥmꜣt',
      gloss: 'salt (grain determinative)',
      of: ['V028', 'G017', 'G001', 'X001', 'N033'],
    },
    {
      signs: '\u{13171}\u{1309D}\u{1339B}',
      t: 'wꜥḥ',
      gloss: 'tiger nut',
      of: ['G043', 'D036', 'V028'],
    },
    {
      signs: '\u{131CB}\u{1308B}\u{132AA}',
      t: 'jrp',
      gloss: 'wine',
      of: ['M017', 'D021', 'Q003'],
    },
    {
      signs: '\u{130C0}\u{131CB}\u{133CF}\u{131A4}',
      t: 'bjt',
      gloss: 'honey (bee determinative)',
      of: ['D058', 'M017', 'X001', 'L002'],
    },
    { signs: '\u{1319B}', t: 'rm', gloss: 'fish', of: ['K001'] },
  ],

  /* All six are attested on Linear B tablets — the Mycenaean palace records are largely
     inventories, so the surviving vocabulary is unusually food-heavy. */
  anatolian: [
    {
      signs: '\u{145F7}\u{145D0}\u{144BB}\u{144F1}',
      t: 'a-ni-wi-ia',
      of: ['A450', 'A411', 'A160', 'A210'],
      author: 'anniwiya', role: 'origin',
      gloss: 'a-ni-wi-ia in Luwian hieroglyphic, the script of the country she was taken from',
    },
  ],

  linearb: [
    { signs: '\u{10036}\u{1004A}', t: 'tu-ro₂', gloss: 'cheese', of: ['B069 TU', 'B068 RO2'] },
    { signs: '\u{10013}\u{10016}\u{1001C}', t: 'ku-mi-no', gloss: 'cumin', of: ['B081 KU', 'B073 MI', 'B052 NO'] },
    { signs: '\u{10015}\u{1002A}', t: 'me-ri', gloss: 'honey', of: ['B013 ME', 'B053 RI'] },
    { signs: '\u{1002E}\u{1002A}\u{1001C}', t: 'se-ri-no', gloss: 'celery', of: ['B009 SE', 'B053 RI', 'B052 NO'] },
    {
      signs: '\u{10014}\u{10028}\u{10036}\u{1003A}',
      t: 'ma-ra-tu-wo',
      gloss: 'fennel',
      of: ['B080 MA', 'B060 RA', 'B069 TU', 'B042 WO'],
    },
    {
      signs: '\u{10012}\u{1002A}\u{1000A}\u{10008}\u{1001C}',
      t: 'ko-ri-ja-do-no',
      gloss: 'coriander',
      of: ['B070 KO', 'B053 RI', 'B057 JA', 'B014 DO', 'B052 NO'],
    },
  ],

  /* Ugaritic is alphabetic and writes no vowels, so `yn` really is two signs for "wine". */
  ugaritic: [
    { signs: '\u{1038A}\u{10390}', t: 'yn', gloss: 'wine', of: ['YOD', 'NUN'] },
    { signs: '\u{1038D}\u{10388}\u{1038E}', t: 'lḥm', gloss: 'bread', of: ['LAMDA', 'HOTA', 'MEM'] },
    { signs: '\u{1038C}\u{1038E}\u{10390}', t: 'šmn', gloss: 'oil', of: ['SHIN', 'MEM', 'NUN'] },
    { signs: '\u{10390}\u{10381}\u{1039A}', t: 'nbt', gloss: 'honey', of: ['NUN', 'BETA', 'TO'] },
  ],
}

/* THE WRITER'S NAME, at the foot of an article.
 *
 * Each writer's name as a scribe of their own place would actually have written it, not a
 * letter-for-letter substitution. It closes the piece the way a colophon closes a tablet,
 * and it is the only place on the site where a script stands for a person rather than a
 * foodstuff.
 *
 * WHAT IS SOLID AND WHAT IS NOT, per writer, is carried in each `gloss`. Two of the four
 * names are ordinary words in their own language — balāṭu is "life", ḥnwt is "lady" — and
 * spell themselves. The other two lose information on the way in: Ugaritic writes no vowels,
 * so ydn fixes only the consonants, and Linear B writes no double consonants and no final
 * ones. None of that is a defect in the reconstruction; it is what those scripts do.
 *
 * Same shape as WORDS above, deliberately: `of` carries the Unicode sign NAMES so
 * `build_scripts.py` re-derives the literal rather than trusting it, and so the subsetter
 * keeps the glyph. Two of these four already shipped inside existing words — YOD inside
 * `yn`, V028 inside `hnqt` — and two are new.
 *
 * NOT stored in WORDS, because `wordForRegion` picks from there for the dish marks, and a
 * dish captioned "the letter Y" would be nonsense.
 *
 * ANNIWIYA CARRIES TWO SCRIPTS, and she is the only one who does. She was born in
 * Millawanda in western Anatolia and works inside a Greek palace administration, so her
 * name exists in cuneiform, the script her own country wrote, and in Linear B, the script
 * of the people who count her. Her place line is `mi-ra-ti-ja`, "the Milesian women",
 * because that is the only form in which the record holds her at all.
 *
 * ANATOLIAN HIEROGLYPHS CARRY A WEAKER GUARANTEE THAN EVERYTHING ELSE HERE, and the
 * difference is worth stating rather than burying.
 *
 * For every other script on this site the Unicode name encodes the reading — CUNEIFORM SIGN
 * BA, LINEAR B SYLLABLE B008 A — so `build_scripts.py` rebuilds the string from the names and
 * fails if a literal and its name disagree. The Anatolian block is numbered by Laroche sign
 * number alone: A450, A411, A160, A210. The name says which sign it is and says nothing at
 * all about what that sign says.
 *
 * So the four Luwian signs below are verified to be the signs named, and their PHONETIC
 * VALUES rest on the published sign list rather than on anything this repository can check.
 * a = L.450 and ni = L.411 are corroborated across sources; wi = L.160 and ia = L.210 are
 * taken from a single syllabary table. Treat the reading as sourced, not as proven.
 */
export const AUTHOR_MARKS = {
  ugaritic: [
    {
      signs: '\u{1038A}\u{10384}\u{10390}',
      t: 'ydn',
      of: ['YOD', 'DELTA', 'NUN'],
      author: 'yadinu', role: 'name',
      gloss: 'ydn. Ugaritic writes no vowels, so the consonants are fixed and Yadinu is one reading of them among several',
    },
    {
      signs: '\u{1039C}\u{10382}\u{10397}\u{1039A}',
      t: 'ủgrt',
      of: ['U', 'GAMLA', 'RASHA', 'TO'],
      author: 'yadinu', role: 'place',
      gloss: 'ủgrt, the city writing its own name',
    },
  ],

  egyptian: [
    {
      signs: '\u{1339B}\u{13216}\u{13171}\u{133CF}\u{13050}',
      t: 'ḥnwt',
      of: ['V028', 'N035', 'G043', 'X001', 'B001'],
      author: 'henut', role: 'name',
      quadrats: ['\u{1339B}', '\u{13216}', '\u{13171}\u{133CF}', '\u{13050}'],
      gloss: 'ḥnwt, "lady, mistress", closed by the seated-woman sign that marks a woman’s name. Grouped into four quadrats, with the loaf tucked beneath the quail chick',
    },
    {
      signs: '\u{13283}\u{133CF}\u{13419}\u{1309D}\u{133CF}',
      t: 'st-mꜣꜥt',
      of: ['O034', 'X001', 'AA011', 'D036', 'X001'],
      author: 'henut', role: 'place',
      quadrats: ['\u{13283}\u{133CF}', '\u{13419}', '\u{1309D}\u{133CF}'],
      gloss: 'st-mꜣꜥt, the Place of Truth, which is what the workmen’s village called itself. Three quadrats: the bolt over its loaf, the plinth, then the arm over its loaf',
    },
  ],

  cuneiform: [
    {
      signs: '\u{12040}\u{121B7}\u{12305}',
      t: 'ba-la-ṭu',
      of: ['BA', 'LA', 'TU'],
      author: 'balatu', role: 'name',
      gloss: 'ba-la-ṭu, spelled out in syllables. The word balāṭu means "life"',
    },
    {
      signs: '\u{12157}\u{1202D}\u{1228F}',
      t: 'KÁ.DINGIR.RA',
      of: ['KA', 'AN', 'RA'],
      author: 'balatu', role: 'place',
      gloss: 'KÁ.DINGIR.RA, "gate of the god", the ordinary written form of Bābili',
    },
  ],

  anatolian: [
    {
      signs: '\u{145F7}\u{145D0}\u{144BB}\u{144F1}',
      t: 'a-ni-wi-ia',
      of: ['A450', 'A411', 'A160', 'A210'],
      author: 'anniwiya', role: 'origin',
      gloss: 'a-ni-wi-ia in Luwian hieroglyphic, the script of the country she was taken from',
    },
  ],

  linearb: [
    {
      signs: '\u{10000}\u{1001B}\u{10039}\u{1000A}',
      t: 'a-ni-wi-ja',
      of: ['B008 A', 'B030 NI', 'B040 WI', 'B057 JA'],
      author: 'anniwiya', role: 'name',
      gloss: 'a-ni-wi-ja. Linear B writes no double consonants, so Anniwiya and Aniwiya are the same four signs',
    },
    {
      signs: '\u{10016}\u{10028}\u{10034}\u{1000A}',
      t: 'mi-ra-ti-ja',
      of: ['B073 MI', 'B060 RA', 'B037 TI', 'B057 JA'],
      author: 'anniwiya', role: 'place',
      gloss: 'mi-ra-ti-ja, "the Milesian women", which is how the Pylos tablets name her group rather than her',
    },
  ],
}

/** Everything one writer signs off with: name, place, and any second script they own. */
export function markForAuthor(id) {
  const out = { name: null, place: null, origin: null }
  for (const [script, rows] of Object.entries(AUTHOR_MARKS)) {
    for (const r of rows) {
      if (r.author !== id) continue
      out[r.role] = { ...r, script, meta: SCRIPTS[script] }
    }
  }
  if (!out.name) return null
  out.initial = [...out.name.signs][0]
  out.script = out.name.script
  out.meta = out.name.meta
  return out
}

/** Every codepoint the site will ever render in an ancient script, per script. */
export function codepointsFor(script) {
  const cps = new Set()
  for (const w of WORDS[script] ?? []) for (const ch of w.signs) cps.add(ch.codePointAt(0))
  for (const w of AUTHOR_MARKS[script] ?? []) for (const ch of w.signs) cps.add(ch.codePointAt(0))
  return [...cps].sort((a, b) => a - b)
}

/* Which word suits which dish.
   A seeded pick alone put "oil" beside the wine and "honey" beside the braised kid, which
   makes the mark read as decoration that happens to be in an old script — the opposite of
   the point. Where a dish has an obvious word, name it. Anything unlisted still falls back
   to the seeded pick, so adding a dish never leaves a hole. */
const WORD_FOR_DISH = {
  'roast-goose-with-figs': 'bjt',
  'shelled-beans-deir-el-medina': 't',
  'happena-meat-in-oil-and-honey': 'Ì',
  'kariya-grilled-liver-and-heart': 'UZU',
  'beruwa-chickpea-and-cucumber': 'SAR',
  'skewers-on-the-firedog': 'ku-mi-no',
  'kykeon-barley-and-cheese': 'tu-ro₂',
  'marzeah-roast-mutton': 'yn',
  // Mesopotamia + Hatti — cuneiform
  'lamb-and-beet-stew-tuhu': 'UZU',
  'pigeon-in-broth-amursanu': 'DUG',
  'date-and-sesame-confection-mersu': 'Ì',
  'thick-loaf-for-the-hearth-harsi': 'NINDA',
  'neck-of-mutton-with-leeks-hattusa': 'SUM',
  'caravan-pot-with-dried-curd': 'GA',
  'dried-river-fish-with-onions-terqa': 'KU₆',
  'field-pot-for-thirty': 'DUG',
  'shoulder-for-the-road': 'UZU',
  'sheep-on-the-huprushi': 'UDU',
  'lentil-and-barley-pottage': 'ŠE',
  'leek-lentil-and-barley-pottage': 'ŠE',
  'kanasu-broth-me-kanasi': 'SAR',
  'francolin-broth-me-tarri': 'MUŠEN',
  'beet-greens-silqu': 'SAR',
  'desert-truffles-mari': 'SAR',
  'roast-barley-pilaf-ybc25': 'ŠE',
  'kid-stew-with-soured-milk': 'UDU',
  'unwinding-broth-pasrutum': 'NINDA',
  'elamite-broth-me-elamutim': 'GA',

  // Egypt — hieroglyphs
  'emmer-loaves-in-conical-moulds': 't',
  'emmer-beer-heneqet': 'ḥnqt',
  'tiger-nut-and-honey-cones': 'wꜥḥ',
  'emmer-porridge-with-curds-delta': 't',
  'roast-duck-for-the-gods-table': 'jrp',
  'split-and-salted-nile-fish': 'rm',

  // The Aegean — Linear B
  'kid-in-the-tripod-cauldron': 'ma-ra-tu-wo',
  'fish-baked-on-fennel-amnisos': 'a-mi-ni-so',
  'barley-and-fig-feast-porridge': 'me-ri',
  'honeyed-pork-chops-with-dates': 'nbt',

  // Canaan — Ugaritic
  'seared-cheese-on-the-copper-pan': 'šmn',
  'brazier-chickpeas-alashiya': 'lḥm',
  'kabri-palace-wine': 'yn',
  'lentils-with-oil-and-cumin-ugarit': 'šmn',
  'hillside-greens-with-soured-milk': 'šmn',
}

/** A stable word for a dish: the fitting one where we have named it, a seeded one if not. */
export function wordForRegion(region, seed = 0, slug = '') {
  const script = REGION_SCRIPT[region]
  const list = WORDS[script]
  if (!list?.length) return null
  const named = WORD_FOR_DISH[slug]
  const hit = named && list.find((w) => w.t === named)
  return { script, ...(hit ?? list[seed % list.length]) }
}
