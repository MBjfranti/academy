import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { recipeBySlug, recipes } from '../data/recipes'
import { regionBySlug } from '../data/regions'
import { fieldReports } from '../data/fieldReports'
import { kitchen, names } from '../data/kitchen'
import { resolve, levelImpact, LEVELS, LEVEL_ORDER } from '../data/sourcing'
import { useSourcing } from '../components/Sourcing'
import NotFound from './NotFound'

/* The recipe is a console, not a document. One screen, no page scroll:
   ingredients on the left, method on the right, everything else behind the
   panel. If a column runs long it scrolls inside itself rather than pushing
   the page. Below 900px it stacks and scrolls normally — a phone has no
   other option. */

export default function Recipe() {
  const { slug } = useParams()
  const recipe = recipeBySlug[slug]
  const { level, setLevel } = useSourcing()
  const [panel, setPanel] = useState(null)

  if (!recipe) return <NotFound />

  const region = regionBySlug[recipe.region]
  const notes = kitchen[recipe.slug]
  const name = names[recipe.slug]
  const reports = fieldReports.filter((r) => r.recipe === recipe.slug)
  const impact = levelImpact(recipe, level)

  const PANELS = [
    { key: 'story', label: 'The story' },
    notes && { key: 'taste', label: 'How it should taste' },
    notes && { key: 'nutrition', label: 'What it gives you' },
    { key: 'source', label: 'Where it comes from' },
  ].filter(Boolean)

  return (
    <div className="cook">
      {/* ── bar ── */}
      <header className="cook__bar">
        <div className="cook__id">
          <h1>
            {name?.common || recipe.title}
            {recipe.ancient && <span className="cook__anc">{recipe.ancient}</span>}
          </h1>
          <p className="cook__meta">
            {name?.say && (
              <>
                <span className="cook__say">say {name.say}</span>
                <i>✦</i>
              </>
            )}
            {region?.name}
            <i>✦</i>
            {recipe.serves}
            <i>✦</i>
            {recipe.time}
          </p>
        </div>

        <div className="cook__src">
          <span className="cook__srclabel">Shopping for</span>
          <div className="cook__srcopts">
            {LEVEL_ORDER.map((key) => (
              <button
                key={key}
                aria-pressed={level === key}
                onClick={() => setLevel(key)}
                title={LEVELS[key].blurb}
              >
                {LEVELS[key].label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── the two working columns ── */}
      <div className="cook__grid">
        <section className="cook__col cook__col--ing">
          <h2 className="cook__h">
            Ingredients
            {(impact.swapped > 0 || impact.omitted > 0) && (
              <span className="cook__swaps">
                {[impact.swapped && `${impact.swapped} swapped`, impact.omitted && `${impact.omitted} out`]
                  .filter(Boolean)
                  .join(' · ')}
              </span>
            )}
          </h2>

          <div className="cook__scroll">
            {recipe.ingredientGroups.map((group, gi) => (
              <div key={group.name}>
                {recipe.ingredientGroups.length > 1 && <p className="cook__sub">{group.name}</p>}
                <ul className="ilist">
                  {group.items.map((item, i) => {
                    const r = resolve(item, level)
                    return (
                      <li key={i} className={r.omit ? 'is-out' : undefined}>
                        <span className="ilist__q">{r.omit ? '—' : r.qty}</span>
                        <span className="ilist__n">
                          {r.omit ? <s>{item.modern}</s> : r.name}
                          {r.swapped && <em>swapped</em>}
                          {r.omit && <em className="is-out">leave out</em>}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="cook__col cook__col--method">
          <h2 className="cook__h">Method</h2>
          <div className="cook__scroll">
            {recipe.directionGroups.map((group) => (
              <div key={group.name}>
                {recipe.directionGroups.length > 1 && <p className="cook__sub">{group.name}</p>}
                <ol className="mlist">
                  {group.steps.map((step, i) => (
                    <li key={i}>{step.text}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── everything that isn't cooking ── */}
      <nav className="cook__tabs">
        <Link className="cook__back" to="/recipes">
          ← All recipes
        </Link>
        {PANELS.map((p) => (
          <button
            key={p.key}
            aria-pressed={panel === p.key}
            onClick={() => setPanel(panel === p.key ? null : p.key)}
          >
            {p.label}
          </button>
        ))}
      </nav>

      {panel && (
        <div className="cookpanel" role="dialog" aria-label={PANELS.find((p) => p.key === panel)?.label}>
          <div className="cookpanel__head">
            <h3>{PANELS.find((p) => p.key === panel)?.label}</h3>
            <button onClick={() => setPanel(null)} aria-label="Close">
              Close ✕
            </button>
          </div>

          <div className="cookpanel__body">
            {panel === 'story' && (
              <>
                <p className="cookpanel__lede">{recipe.summary}</p>
                <p>{recipe.intro}</p>
                {reports.length > 0 && (
                  <p>
                    {reports.map((r) => (
                      <Link key={r.slug} to={`/field-reports/${r.slug}`} className="cookpanel__link">
                        Test kitchen: {r.title} →
                      </Link>
                    ))}
                  </p>
                )}
              </>
            )}

            {panel === 'taste' && notes && (
              <>
                <p className="cookpanel__lede">{notes.flavour}</p>
                {notes.steer?.length > 0 && (
                  <>
                    <h4>If it isn&rsquo;t right</h4>
                    <ul className="steer">
                      {notes.steer.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  </>
                )}
              </>
            )}

            {panel === 'nutrition' && notes && (
              <>
                <p className="cookpanel__lede">{notes.nutrition}</p>
                {notes.serveWith && (
                  <p className="servewith">
                    <span>Serve with</span> {notes.serveWith}
                  </p>
                )}
                {notes.caution && <p className="caution">{notes.caution}</p>}
              </>
            )}

            {panel === 'source' && (
              <>
                <blockquote>{recipe.sourceText.text}</blockquote>
                <p className="cookpanel__attr">{recipe.sourceText.attribution}</p>
                <dl className="backing__dl">
                  <dt>Siglum</dt>
                  <dd>{recipe.siglum}</dd>
                  <dt>Found</dt>
                  <dd>{recipe.provenance}</dd>
                  <dt>Period</dt>
                  <dd>
                    {recipe.period}, {recipe.date}
                  </dd>
                  <dt>Region</dt>
                  <dd>
                    <Link to={`/regions#${recipe.region}`}>{region?.name}</Link>
                  </dd>
                </dl>
                {recipe.apparatus.length > 0 && (
                  <>
                    <h4>Notes</h4>
                    {recipe.apparatus.map((n) => (
                      <p key={n.term}>
                        <strong>{n.term}.</strong> {n.text}
                      </p>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
