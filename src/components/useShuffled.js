import { useMemo } from 'react'

/* Shuffle once per mount, never per render.
   Randomising inside render would reshuffle on every state change — the
   pictures would jump every time you hit a sort toggle. This picks an order
   when the component mounts and then holds it, so a reload varies the
   pairing and interacting with the page does not. */
export function useShuffled(items) {
  return useMemo(() => {
    const a = [...items]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }, [items])
}

/* Deal one item per slot, wrapping if there are more slots than items. */
export function useDealt(items, count) {
  const shuffled = useShuffled(items)
  return useMemo(
    () => Array.from({ length: count }, (_, i) => shuffled[i % shuffled.length]),
    [shuffled, count],
  )
}
