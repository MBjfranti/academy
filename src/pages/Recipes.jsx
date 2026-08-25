import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { accentByKey } from '../data/accents'
import { FACETS, facetByKey, applyFacet, countsFor } from '../data/facets'
import { attestedDishes as dishes, inventedDishes } from '../data/dishes'
import CardGrid from '../components/CardGrid'
import '../components/imagery.css'
import '../components/cards.css'

/* The dishes themselves. Everything else on this site is the pantry and the shopping trip;
   this is the part you cook from.

   BROWSE HERE, READ AT /recipes/:slug. This page is the index: filter, scan, choose. The
   dish itself has a page of its own, which is what lets it carry the apparatus — the notes
   on what is attested, what is inferred and what is plainly a guess — that an overlay
   never had room for.

   Scope filter: the collection also holds Nubian, central European and Nordic dishes. They
   are good and they are outside c. 1750–1150 BC in the eastern Mediterranean, so they are
   filtered out here rather than deleted. */

export default function Recipes() {
  /* ONE axis at a time. `facet` says what the tab row means; `value` is which tab is
     pressed. Switching axis always resets to All, because carrying a kitchen selection
     across to the Meal axis would silently filter twice and the second filter would be
     invisible. */
  /* Two pools, never mixed. `section` picks which one you are browsing; everything below
     operates on whichever it is. Merging them and filtering would be less code and would
     quietly put an invented dish into a count labelled "Babylonian". */
  /* THE FILTERS LIVE IN THE URL, not in component state.

     Two reasons, and the second one is the one that forced it. A filtered view is worth
     linking to — "here are the Hittite dishes" should be a URL somebody can send. And now
     that a dish has a page of its own, local state meant clicking a card and pressing back
     dropped the reader on an unfiltered grid scrolled to the top, having thrown away the
     choices that got them there. State in the URL is state the back button understands.

     `replace: true` on every filter change is deliberate: pressing a tab is refining a
     view, not navigating. Without it, ten tab presses become ten history entries and Back
     walks the reader out through every one of them. */
  const [params, setParams] = useSearchParams()
  const section = params.get('show') === 'invented' ? 'invented' : 'attested'
  const facet = params.get('by') ?? (section === 'invented' ? 'meal' : 'kitchen')
  const wanted = params.get('is') ?? 'all'

  // Defaults are never written, so a clean /recipes stays a clean /recipes.
  const setView = (next) => {
    const q = {}
    if (next.section === 'invented') q.show = 'invented'
    const defaultFacet = next.section === 'invented' ? 'meal' : 'kitchen'
    if (next.facet !== defaultFacet) q.by = next.facet
    if (next.value !== 'all') q.is = next.value
    setParams(q, { replace: true })
  }

  const isInvented = section === 'invented'
  const pool = isInvented ? inventedDishes : dishes
  // Kitchen is meaningless for invented dishes — none of them belongs to one.
  const axes = useMemo(() => FACETS.filter((f) => !(isInvented && f.key === 'kitchen')), [isInvented])
  const activeFacet = axes.some((f) => f.key === facet) ? facet : 'meal'

  const counts = useMemo(() => countsFor(pool, activeFacet), [pool, activeFacet])
  const options = useMemo(() => facetByKey[activeFacet].options(), [activeFacet])

  /* A value that is not on the current axis falls back to All. The URL is now editable and
     shareable, so it is also mistypeable — and an unknown `is` would otherwise render a
     silently empty grid with every tab looking unpressed, which reads as a broken page
     rather than as a bad link. Same guard `activeFacet` already applies to the axis. */
  const value = options.some((o) => o.key === wanted) ? wanted : 'all'

  const list = useMemo(() => applyFacet(pool, activeFacet, value), [pool, activeFacet, value])

  const pickFacet = (k) => setView({ section, facet: k, value: 'all' })

  const pickSection = (k) =>
    setView({ section: k, facet: k === 'invented' ? 'meal' : 'kitchen', value: 'all' })

  const pickValue = (v) => setView({ section, facet: activeFacet, value: v })

  // The line under the tabs: the accent's own blurb where we have one, else the axis note.
  const cult = activeFacet === 'kitchen' && value !== 'all' ? accentByKey[value] : null
  const chosen = options.find((o) => o.key === value)

  return (
    <div className="page">
      {/* The section switch. Deliberately the first and largest control on the page:
          everything below it changes meaning depending on which side you are on, and a
          reader must never be in any doubt which they are looking at. */}
      <nav className="sectionsw" aria-label="Which recipes">
        <div className="wrap sectionsw__in">
          <button
            aria-pressed={!isInvented}
            onClick={() => pickSection('attested')}
          >
            From the sources
            <i>{dishes.length}</i>
          </button>
          <button
            className="sectionsw__inv"
            aria-pressed={isInvented}
            onClick={() => pickSection('invented')}
          >
            Invented
            <i>{inventedDishes.length}</i>
          </button>
        </div>
      </nav>

      <nav className="subnav" aria-label={facetByKey[activeFacet].label}>
        <div className="wrap subnav__in">
          <button aria-pressed={value === 'all'} onClick={() => pickValue('all')}>
            All {pool.length}
          </button>
          {options.map((o) => (
            <button
              key={o.key}
              aria-pressed={value === o.key}
              onClick={() => pickValue(o.key)}
              /* An empty bucket is disabled rather than hidden, so the row does not
                 reflow under the cursor as you switch axes. */
              disabled={counts[o.key] === 0}
              title={counts[o.key] === 0 ? 'Nothing in this group yet' : undefined}
            >
              {o.label}
              {counts[o.key] > 0 && <i className="subnav__n">{counts[o.key]}</i>}
            </button>
          ))}
        </div>
      </nav>

      <div className="note">
        <div className="wrap note__in">
          <p>
            {isInvented
              ? `Modern meals rebuilt from this larder. Nothing here is ancient — but every ingredient passes the Market.`
              : cult
                ? `${cult.where}. ${cult.tagline}`
                : chosen
                  ? `${list.length} ${list.length === 1 ? 'dish' : 'dishes'}. ${facetByKey[activeFacet].note}`
                  : `${dishes.length} dishes. Pick one to see how it is made.`}
          </p>
          <div className="facetsw" role="group" aria-label="Group the dishes by">
            <span className="facetsw__l">Browse by</span>
            {axes.map((f) => (
              <button key={f.key} aria-pressed={activeFacet === f.key} onClick={() => pickFacet(f.key)}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="page__scroll">
        <div className={isInvented ? 'wrap is-invented' : 'wrap'}>
          <CardGrid items={list} hrefFor={(d) => `/recipes/${d.slug}`} label="Recipes" />
        </div>
      </div>

    </div>
  )
}


