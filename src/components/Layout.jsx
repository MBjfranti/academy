import { useEffect, useState } from 'react'
import { NavLink, Link, Outlet } from 'react-router-dom'

const THEME_KEY = 'barley-bronze.theme'
/* The site was called The Oxhide Kitchen and stored the theme under
   `oxhide.theme`. The key is renamed with the brand, but a returning visitor
   must not silently lose the dark mode they chose. So the old key is read once
   as a fallback and then cleared — after the first visit under the new name
   there is exactly one key and this branch never fires again. Safe to delete
   once you no longer care about visitors last seen under the old name. */
const LEGACY_THEME_KEY = 'oxhide.theme'

function readTheme() {
  try {
    const stored = localStorage.getItem(THEME_KEY)
    if (stored !== null) return stored === 'dark' ? 'dark' : 'light'
    const legacy = localStorage.getItem(LEGACY_THEME_KEY)
    if (legacy !== null) {
      localStorage.removeItem(LEGACY_THEME_KEY)
      return legacy === 'dark' ? 'dark' : 'light'
    }
    return 'light'
  } catch {
    return 'light'
  }
}

const TABS = [
  { to: '/', end: true, label: 'Reports' },
  { to: '/pantry', label: 'Pantry' },
  { to: '/market', label: 'Market' },
  { to: '/recipes', label: 'Recipes' },
  { to: '/nutrition', label: 'Nutrition' },
]

function Tabs({ where }) {
  return (
    <nav className={`tabs tabs--${where}`} aria-label="Main">
      {TABS.map((t) => (
        <NavLink
          key={t.to}
          to={t.to}
          end={t.end}
          className={({ isActive }) => (isActive ? 'on' : undefined)}
        >
          {t.label}
        </NavLink>
      ))}
    </nav>
  )
}

/* The frame. A 100dvh grid with `overflow: hidden`, so page-level scrolling is
   not something a route has to be careful about — it is structurally
   impossible. Each route fills `main` and owns exactly one internal scroller.

   The tab strip is rendered twice and shown once. Above 700px it is in the
   header row. Below, it is a bottom bar: the header physically could not hold
   wordmark + four tabs + toggle at 390px (471px of content in a 390px
   viewport, which is the horizontal overflow this site has always had), and a
   bar at the bottom of a phone is where the thumb already is. `display: none`
   takes the unused copy out of the accessibility tree too, so there is never
   more than one Main navigation announced. */
export default function Layout() {
  const [theme, setTheme] = useState(readTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      /* storage blocked — the choice just will not persist */
    }
  }, [theme])

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <div className="shell">
        <header className="top">
          <div className="wrap top__in">
            {/* A WORDMARK, not a pictorial logo. Two pictorial marks have now been drawn
                and killed for the same reason: at 16px a picture stops being the thing it
                depicts and becomes the nearest icon you already know. The clay tablet
                became a file icon; the copper ingot became an AI sparkle. The name is
                strong enough to carry itself, and the ampersand does the work an icon was
                being asked to do.

                THE AMPERSAND SITS BETWEEN THE TWO WORDS IN THE MARKUP so this link is
                announced as "Barley & Bronze"; the grid in index.css puts it in a second
                column spanning both lines. Do not reorder these three spans. */}
            <Link to="/" className="mark">
              <span className="mark__l1">Barley</span>
              <i className="mark__amp">&amp;</i>
              <span className="mark__l2">Bronze</span>
            </Link>

            <Tabs where="top" />

            <button
              className="theme"
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {theme === 'dark' ? '☀' : '☾'}
            </button>
          </div>
        </header>

        <main id="main">
          <Outlet />
        </main>

        <Tabs where="bottom" />

        <footer className="foot">
          <div className="wrap">
            {/* The byline lives inline at the head of the existing footer line.
                A second row would cost height the 100dvh grid does not have,
                and the header is already full at 390px. */}
            <p>
              <b className="foot__by">Notes from the Hungry Scribe.</b> The kitchens of the Late
              Bronze Age eastern Mediterranean and Near East, c. 1750–1150 BC. Nothing here is
              recommended that the region did not have.
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
