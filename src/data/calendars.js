// How each writer would actually have dated a piece.
//
// "27 August 1226 BC" is a modern convention: a Julian-derived month name, a year counted
// backwards from an event none of these people had heard of. None of the four would recognise
// any part of it. Each of them had a real way of saying when, and the four ways are not
// equivalent — which is the interesting part and the reason this file exists.
//
// ── WHAT IS SOLID, PER WRITER ────────────────────────────────────────────────────────────
//
// EGYPT is the firmest. The civil year ran twelve thirty-day months in three seasons of four
// — Akhet, the inundation; Peret, the emergence; Shemu, the harvest — plus five days over.
// Dates were written regnal year, then month within season, then day: "year 38, III Akhet,
// day 19". Henut's regnal year is fixed by the site itself, which has Ramesses II in his
// fifty-fourth.
//
// BABYLONIA is nearly as firm. Twelve lunar months beginning at the first sighting of the new
// crescent, so each runs 29 or 30 days, with a thirteenth intercalated to keep them against
// the sun. Years are counted by the reigning king.
//
// UGARIT borrowed. The earliest Babylonian month names in a Northwest Semitic text turn up at
// Ugarit at about this date, which makes Yadinu using them a real and rather pointed thing to
// have him do: a scribe of a trading port reaching for his largest trading partner's calendar.
//
// MYCENAEAN GREECE IS THE ODD ONE, AND IT IS SOLVED SIDEWAYS. Linear B gives month names,
// lunar and several of them named for gods, written as the name in the genitive followed by
// `me-no`, "of the month": `de-u-ki-jo-jo me-no`, `ra-pa-to me-no`. It gives no year-reckoning
// whatever. The tablets are a single administrative year of records nobody meant to keep, so
// there is no era, no regnal count, nothing to number a year against.
//
// So Anniwiya counts her own. She cannot cite a public year because her administration does
// not keep one, and she has an obvious private one: the years since she was landed here. That
// is not a workaround. It is exactly her position — inside an institution that counts her and
// does not date itself, she supplies the reckoning herself.
//
// TWO HONEST LIMITS. The month names below are attested individually; their ORDER is not
// established, so assigning them to a sequence of months is this file's invention and not a
// menology. And `me-no` follows a genitive, so the names carry their genitive endings.
//
// ── THE ALIGNMENT IS APPROXIMATE, DELIBERATELY ───────────────────────────────────────────
//
// The Egyptian civil year had no leap day and slid a full day against the sun every four
// years, so it was already months out of step with its own seasons by this date. The
// Babylonian year is lunar and moves against a solar one every year until an intercalation
// pulls it back. Aligning either to a modern month is therefore an approximation and cannot
// be anything else. What is offered below is a plausible reading, not a conversion, and no
// article's date should be treated as a real synchronism.

const EGYPT_SEASONS = ['Akhet', 'Peret', 'Shemu']
const ROMAN = ['I', 'II', 'III', 'IV']

/* Babylonian months, Nisannu first. The year opens near the spring equinox, so month one
   sits against late March. Ugarit uses the same list. */
const BABYLONIAN = [
  'Nisannu', 'Ayaru', 'Simanu', 'Duʾuzu', 'Abu', 'Ululu',
  'Tašritu', 'Arahsamnu', 'Kislimu', 'Tebetu', 'Šabatu', 'Addaru',
]

/* Month names attested in the Linear B tablets. Spelled as the tablets spell them, because
   the Greek behind several of them is uncertain and tidying them into classical forms would
   invent a confidence the evidence does not support. */
const MYCENAEAN = [
  'po-ro-wi-to-jo', 'de-u-ki-jo-jo', 'wo-de-wi-jo-jo', 'ka-ra-e-ri-jo',
  'di-wi-jo-jo', 'ra-pa-to', 'di-pi-si-jo', 'wa-na-se-wi-jo',
]

/* `me-tu-wo ne-wo`, "of new wine", is already a phrase and takes no `me-no`. */
const MYCENAEAN_BARE = new Set(['me-tu-wo ne-wo'])

/* HER OWN COUNT, and the one number in this file that belongs to a biography rather than to
   a calendar. Eight years at a quern and four weighing oil, per docs/personas.md. She was
   landed here at sixteen and is twenty-eight now, which is what the photographs of her
   show. It lives here as a constant so that realigning her age or her arrival changes one
   line. */
const ANNIWIYA_YEARS_AT_PYLOS = 12

const ORDINALS = [
  '', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth',
  'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth',
  'seventeenth', 'eighteenth', 'nineteenth', 'twentieth',
]

/** Ramesses II's regnal year, which the site fixes in `lifetimes-in-the-reign-of-ramesses-ii`. */
const RAMESSES_YEAR = 54

/* Kassite Babylon in the 1220s is a bad decade to name a king in: the dynasty is close to
   its end and the Assyrian conquest falls within a few years either side of this date. The
   article therefore counts a regnal year without naming whose it is, which is also what a
   working scribe far from the capital might reasonably do. */
const BABYLON_YEAR = 6

/** Which calendar each region keeps. */
const CALENDAR_FOR = {
  egypt: 'egyptian',
  mesopotamia: 'babylonian',
  levant: 'ugaritic',
  hatti: 'ugaritic',
  aegean: 'mycenaean',
}

function parts(iso) {
  const [, m, d] = iso.split('-').map(Number)
  return { m, d }
}

/**
 * How this writer would say when.
 * Returns `{ text, note }`: the dateline itself, and what it rests on.
 */
export function culturalDate(region, iso) {
  const { m, d } = parts(iso)
  const cal = CALENDAR_FOR[region]

  if (cal === 'egyptian') {
    // Akhet opens with the flood in high summer, so the civil year is offset from ours.
    const i = (m + 4) % 12
    const season = EGYPT_SEASONS[Math.floor(i / 4)]
    const month = ROMAN[i % 4]
    return {
      text: `Year ${RAMESSES_YEAR}, ${month} ${season}, day ${d}`,
      note: 'Regnal year of Ramesses II, month within the season, day. The Egyptian civil year carried no leap day and had long since slipped against its own seasons, so the alignment here is approximate.',
    }
  }

  if (cal === 'babylonian' || cal === 'ugaritic') {
    // Nisannu opens near the spring equinox.
    const name = BABYLONIAN[(m + 9) % 12]
    const where = cal === 'ugaritic'
      ? 'Babylonian month names, which reach Ugarit at about this date and are the earliest of their kind in a Northwest Semitic text.'
      : 'Babylonian lunar month and a regnal year. Months begin at the first sighting of the new crescent, so each runs twenty-nine or thirty days.'
    return {
      text: `${name}, day ${d}, year ${BABYLON_YEAR}`,
      note: `${where} The alignment to a modern month is approximate, because a lunar year moves against a solar one.`,
    }
  }

  if (cal === 'mycenaean') {
    const month = MYCENAEAN[(m - 1) % MYCENAEAN.length]
    const phrase = MYCENAEAN_BARE.has(month) ? month : `${month} me-no`
    const year = ORDINALS[ANNIWIYA_YEARS_AT_PYLOS] ?? `${ANNIWIYA_YEARS_AT_PYLOS}th`
    return {
      text: `${phrase}, my ${year} year at Pylos`,
      note: 'The month name in the genitive followed by me-no, "of the month", which is how Linear B writes a date. It records no year-reckoning of any kind, so the year here is her own count from the day she was landed rather than any public era. The order of the Mycenaean months is not established, so which month falls where is this site’s arrangement.',
    }
  }

  return null
}
