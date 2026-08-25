import { createContext, useContext, useEffect, useState } from 'react'
import { CULTURES, TIERS, cultureByKey, tierByKey } from '../data/tags'

/* One setting, behind one pill. The chips used to sit permanently across the
   top and ate ~145px of a phone screen for something you set once a month. */

const KEY = 'oxhide.profile'
const Ctx = createContext(null)

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || '{}')
      return {
        culture: CULTURES.some((c) => c.key === raw.culture) ? raw.culture : null,
        tier: TIERS.some((t) => t.key === raw.tier) ? raw.tier : null,
      }
    } catch {
      return { culture: null, tier: null }
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(profile))
    } catch {
      /* storage blocked — the choice just will not persist */
    }
  }, [profile])

  const setCulture = (culture) => setProfile((p) => ({ ...p, culture }))
  const setTier = (tier) => setProfile((p) => ({ ...p, tier }))
  const clear = () => setProfile({ culture: null, tier: null })

  return <Ctx.Provider value={{ ...profile, setCulture, setTier, clear }}>{children}</Ctx.Provider>
}

export function useProfile() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useProfile must be used inside ProfileProvider')
  return ctx
}

export function ProfilePill() {
  const { culture, tier, setCulture, setTier, clear } = useProfile()
  const [open, setOpen] = useState(false)
  const active = Boolean(culture || tier)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const label = active
    ? [culture && cultureByKey[culture].short, tier && tierByKey[tier].name].filter(Boolean).join(' · ')
    : 'All five kitchens'

  return (
    <>
      <span className={active ? 'pill pill--on' : 'pill'}>
        <button className="pill__main" onClick={() => setOpen(true)} aria-expanded={open}>
          <span className="pill__label">{label}</span>
          <span aria-hidden="true">▾</span>
        </button>
        {active && (
          <button className="pill__clear" onClick={clear} aria-label="Clear kitchen and table">
            ✕
          </button>
        )}
      </span>

      {open && <div className="scrim" onClick={() => setOpen(false)} />}
      <aside className={open ? 'panel is-open' : 'panel'} role="dialog" aria-label="Choose a kitchen">
        {open && (
          <>
            <header className="panel__top">
              <div>
                <h2>Whose kitchen?</h2>
                <p>Narrows the aisles to what that one actually cooked with.</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close">
                ✕
              </button>
            </header>

            <div className="panel__body">
              <h3 className="panel__aisle">Kitchen</h3>
              <div className="picks">
                <button aria-pressed={culture === null} onClick={() => setCulture(null)}>
                  <b>All five</b>
                  <span>Everything the whole world had</span>
                </button>
                {CULTURES.map((c) => (
                  <button
                    key={c.key}
                    aria-pressed={culture === c.key}
                    onClick={() => setCulture(culture === c.key ? null : c.key)}
                  >
                    <b>{c.name}</b>
                    <span>{c.line}</span>
                  </button>
                ))}
              </div>

              <h3 className="panel__aisle">Table</h3>
              <div className="picks">
                <button aria-pressed={tier === null} onClick={() => setTier(null)}>
                  <b>Either</b>
                  <span>Both ends of the scale</span>
                </button>
                {TIERS.map((t) => (
                  <button
                    key={t.key}
                    aria-pressed={tier === t.key}
                    onClick={() => setTier(tier === t.key ? null : t.key)}
                  >
                    <b>{t.name}</b>
                    <span>{t.line}</span>
                  </button>
                ))}
              </div>

              <p className="picks__note">
                Search always looks across all five kitchens — this only narrows the aisles you browse.
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  )
}

/* Does this item belong on the chosen table? Untagged means everyone. */
export function matches(item, culture, tier) {
  if (culture && Array.isArray(item.cultures) && !item.cultures.includes(culture)) return false
  if (tier && item.tier && item.tier !== tier) return false
  return true
}

export function isSignature(item, culture) {
  return Boolean(culture && Array.isArray(item.cultures) && item.cultures.includes(culture))
}
