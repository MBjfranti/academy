import { markForAuthor } from '../data/scripts'
import { byline } from '../data/authors'

/* THE SIGN-OFF AT THE FOOT OF A PIECE.
 *
 * The opening sign large, a deliberate gap, then the writer's name and their place in the
 * script of that place, and last the same in ours. It does the job a printer's end mark
 * does: it says the argument is over, so the standing box below reads as apparatus rather
 * than as the article carrying on more quietly.
 *
 * Each name is reconstructed rather than transliterated letter for letter. What each script
 * can and cannot carry is recorded in its `gloss` in scripts.js, and hovering gives it.
 *
 * TWO WRITERS' WORTH OF SPECIAL CASES, both of them meaningful rather than fiddly:
 *
 * ANNIWIYA HAS TWO SCRIPTS. She was born in Millawanda and works inside a Greek palace
 * administration, so her name exists in Luwian hieroglyphic, which her own country wrote,
 * and in Linear B, which the people counting her wrote. Both initials are the same sound.
 *
 * HENUT'S IS SET IN QUADRATS. Egyptian groups its signs into roughly square blocks read
 * left to right, with the signs inside a block stacked. A column of one sign per line looked
 * Egyptian and was a rotated transcription; this is the grouping itself. The blocks are
 * declared in the data rather than composed by the browser, which is why it can be done here
 * and not in the general case.
 *
 * The signs are aria-hidden and the reading is given as text, because a screen reader
 * announcing bare cuneiform codepoints helps nobody.
 */
function Signs({ mark, className }) {
  if (!mark) return null
  const title = `${mark.t} — ${mark.gloss}. ${mark.meta.label}.`

  /* QUADRATS, WHERE A NAME DECLARES THEM. Egyptian groups its signs into roughly square
     blocks read left to right, with the signs inside a block stacked. No browser composes
     these — the format controls at U+13430 are unimplemented — so the grouping is stated in
     the data and drawn here as a row of small grids. Nothing is being asked of the shaper. */
  if (mark.quadrats) {
    return (
      <span className={`${className} endmark--quadrats`} style={{ fontFamily: mark.meta.font }}
            title={title} aria-hidden="true">
        {mark.quadrats.map((q, i) => (
          <span className={`quadrat quadrat--${[...q].length}`} key={i}>
            {[...q].map((s, j) => <span key={j}>{s}</span>)}
          </span>
        ))}
      </span>
    )
  }

  return (
    <span className={className} style={{ fontFamily: mark.meta.font }} title={title} aria-hidden="true">
      {mark.signs}
    </span>
  )
}

export default function EndMark({ author }) {
  const mark = markForAuthor(author)
  if (!mark) return null

  const initials = [mark.origin, mark.name].filter(Boolean)
  const reading = [mark.origin, mark.name, mark.place].filter(Boolean)

  return (
    <div className="endmark" role="separator">
      <span className="endmark__initials">
        {initials.map((m) => (
          <span
            key={m.script}
            className="endmark__initial"
            style={{ fontFamily: m.meta.font }}
            title={`${m.meta.label}`}
            aria-hidden="true"
          >
            {[...m.signs][0]}
          </span>
        ))}
      </span>

      <span className="endmark__lines">
        {mark.origin && <Signs mark={mark.origin} className="endmark__name endmark__name--origin" />}
        <Signs mark={mark.name} className="endmark__name" />
        <Signs mark={mark.place} className="endmark__place" />
      </span>

      <span className="endmark__roman" aria-hidden="true">{byline(author)}</span>

      <span className="sr-only">
        End of the report by {byline(author)}.{' '}
        {reading.map((m) => `${m.meta.label}: ${m.t}. ${m.gloss}.`).join(' ')}
      </span>
    </div>
  )
}
