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

/** Every codepoint the site will ever render in an ancient script, per script. */
export function codepointsFor(script) {
  const cps = new Set()
  for (const w of WORDS[script] ?? []) for (const ch of w.signs) cps.add(ch.codePointAt(0))
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
