import { useState } from 'react'
import { useDialog } from './useDialog'
import './gloss.css'

/* THE NOTE BEHIND A MARK.
 *
 * The site carries a lot of small things that need a sentence of explanation and do not
 * deserve a page: a sign in a dead script, a date in somebody else's calendar, a word whose
 * meaning is disputed. These were all `title` attributes, which is the worst possible home
 * for them. A native tooltip cannot be styled, cannot be read on a phone at all, waits a
 * second before it appears, vanishes when the pointer drifts, and clips a long note without
 * telling you it has.
 *
 * WHY A LEFT PANEL RATHER THAN THE EXISTING MODAL. `Modal.jsx` records a decision to
 * standardise on one centred overlay, on the grounds that a slide-over puts the content in
 * the narrowest column on a laptop. That reasoning is about a full recipe. This payload is
 * two sentences, and a centred modal with a backdrop is far too much furniture for a
 * footnote — it takes the whole screen to say what a sign means. A narrow panel is the right
 * weight, and it comes from the LEFT because every mark that opens one sits in centred body
 * copy or at the foot of the page, so the panel never lands on top of the thing you clicked.
 *
 * It is a button, not a hover target. Hover is unavailable on a phone and unreachable from a
 * keyboard, and this is content rather than decoration.
 */
export default function Gloss({ label, eyebrow, reading, note, children, className = '' }) {
  const [open, setOpen] = useState(false)
  const { wrapRef, closeRef } = useDialog(open, () => setOpen(false))

  return (
    <>
      <button
        type="button"
        className={`gloss__trigger ${className}`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {children}
        <span className="sr-only">{label}. Open the note.</span>
      </button>

      {open && (
        <>
          <div className="gloss__scrim" onClick={() => setOpen(false)} aria-hidden="true" />
          <aside
            className="gloss__panel"
            ref={wrapRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
          >
            <button
              type="button"
              className="gloss__close"
              ref={closeRef}
              onClick={() => setOpen(false)}
            >
              Close
            </button>

            {eyebrow && <p className="gloss__eyebrow">{eyebrow}</p>}
            {reading && <p className="gloss__reading">{reading}</p>}
            <p className="gloss__note">{note}</p>
          </aside>
        </>
      )}
    </>
  )
}
