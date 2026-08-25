import { useDialog } from './useDialog'
import './cards.css'

/* One overlay, everywhere.

   Before this there were two: a right-hand slide-over (`.panel`) for staples,
   accents, Market items and the never-buy list, and a centred modal
   (`.dmodal`) for dishes. Two overlays means the reader has to learn where a
   thing will appear and how to get rid of it, twice, on a site whose whole
   brief is "I don't want to have to click around a ton".

   The centred one wins because it is the one that works for the biggest
   payload — a full recipe — and because a slide-over on a laptop puts the
   content you asked for in the narrowest column on the screen.

   Same shell as DishModal so the two are indistinguishable in use. DishModal
   keeps its own body markup, which is a two-column ingredients-and-method
   layout nothing else needs. */
/* `bare` strips the title out of the chrome bar and leaves only the close button. It is
   for content that carries its own headline — a field report is laid out as an article,
   with a kicker, a centred headline and a standfirst, and repeating the headline in the bar
   directly above it reads as a mistake. `title` is still required and still supplies the
   dialog's accessible name; it just is not drawn twice. */
export default function Modal({ open, onClose, eyebrow, title, sub, narrow, bare, children }) {
  const { wrapRef, closeRef } = useDialog(open, onClose)

  if (!open) return null

  return (
    <>
      <div className="scrim" onClick={onClose} />
      <div
        className={narrow ? 'dmodal dmodal--narrow' : 'dmodal'}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : undefined}
        ref={wrapRef}
      >
        <header className={bare ? 'dmodal__top dmodal__top--bare' : 'dmodal__top'}>
          {!bare && (
            <div className="dmodal__id">
              {eyebrow && <p className="dmodal__eyebrow">{eyebrow}</p>}
              <h2>{title}</h2>
              {sub && <p className="dmodal__meta">{sub}</p>}
            </div>
          )}
          <button ref={closeRef} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>

        <div className="dmodal__body">{children}</div>
      </div>
    </>
  )
}
