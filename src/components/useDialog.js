import { useEffect, useRef } from 'react'

/* Everything an overlay on this site has to do, in one place.

   There were three overlay behaviours before: the dish modal (focus-trapped,
   Escape-closable), the Market slide-over (Escape, no trap) and the Pantry
   slide-overs (neither — you could not close a staple with the keyboard at
   all, and Tab walked straight out of the open panel into the page behind
   it). One hook, so a new overlay cannot be born half-accessible.

   Returns two refs. Put `wrapRef` on the dialog element and `closeRef` on the
   close button. */
export function useDialog(open, onClose) {
  const wrapRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return

    // Where focus was before we took it, so it can go back. Without this a
    // keyboard user closes the overlay and lands at the top of the document.
    const returnTo = document.activeElement
    closeRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const f = wrapRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!f?.length) return
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      if (returnTo instanceof HTMLElement) returnTo.focus()
    }
  }, [open, onClose])

  return { wrapRef, closeRef }
}
