import { createContext, useContext, useEffect, useState } from 'react'
import { LEVELS, LEVEL_ORDER } from '../data/sourcing'

const KEY = 'oxhide.sourcing'
const SourcingContext = createContext(null)

export function SourcingProvider({ children }) {
  const [level, setLevel] = useState(() => {
    try {
      const stored = localStorage.getItem(KEY)
      return LEVEL_ORDER.includes(stored) ? stored : 'specialist'
    } catch {
      return 'specialist'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(KEY, level)
    } catch {
      /* private browsing, blocked storage — the setting just won't persist */
    }
  }, [level])

  return <SourcingContext.Provider value={{ level, setLevel }}>{children}</SourcingContext.Provider>
}

export function useSourcing() {
  const ctx = useContext(SourcingContext)
  if (!ctx) throw new Error('useSourcing must be used inside SourcingProvider')
  return ctx
}

/* The switch itself. Sits on every recipe, because that is where you need it. */
export function SourcingSwitch({ compact = false }) {
  const { level, setLevel } = useSourcing()

  return (
    <div className={compact ? 'srcswitch srcswitch--compact' : 'srcswitch'}>
      <div className="srcswitch__head">
        <span className="srcswitch__label">Shopping for</span>
        {!compact && <span className="srcswitch__hint">{LEVELS[level].blurb}</span>}
      </div>
      <div className="srcswitch__opts" role="group" aria-label="Ingredient sourcing level">
        {LEVEL_ORDER.map((key) => (
          <button key={key} aria-pressed={level === key} onClick={() => setLevel(key)}>
            {LEVELS[key].label}
          </button>
        ))}
      </div>
    </div>
  )
}
