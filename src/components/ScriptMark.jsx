import { SCRIPTS, wordForRegion } from '../data/scripts'

/* A word in its own script, beside the dish it belongs to.

   Decorative in the sense that nobody is expected to read it — and NOT decorative in the
   sense of being made up. Each is a real word with a real gloss, so the thing a curious
   reader finds when they hover is true.

   Deliberately not the dish name: "Babylonian Beet Lamb" has no cuneiform spelling, and
   inventing a transcription of a modern English title would be the exact kind of
   plausible-looking nonsense this site exists to avoid. It shows the ingredient word. */

export default function ScriptMark({ region, seed = 0, slug = '', showGloss = true }) {
  const word = wordForRegion(region, seed, slug)
  if (!word) return null
  const meta = SCRIPTS[word.script]

  return (
    <span
      className="smark"
      title={`${word.t} — ${word.gloss}. ${meta.label}. ${meta.note}`}
    >
      <span className="smark__signs" style={{ fontFamily: meta.font }} aria-hidden="true">
        {word.signs}
      </span>
      {showGloss && (
        <span className="smark__gloss">
          {word.t} · {word.gloss}
        </span>
      )}
      {/* The signs are aria-hidden and the reading is given in text, because a screen
          reader announcing raw cuneiform codepoints helps nobody. */}
      <span className="sr-only">
        {meta.label}: {word.t}, meaning {word.gloss}
      </span>
    </span>
  )
}
