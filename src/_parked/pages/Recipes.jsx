import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { recipes, CATEGORIES } from '../data/recipes'
import { regionBySlug, regions } from '../data/regions'
import { Eyebrow, Diamond } from '../components/Apparatus'
import { names } from '../data/kitchen'

export default function Recipes() {
  const [view, setView] = useState('index')
  const [region, setRegion] = useState('all')

  const filtered = useMemo(
    () => (region === 'all' ? recipes : recipes.filter((r) => r.region === region)),
    [region],
  )

  const byCategory = useMemo(() => {
    const map = {}
    for (const r of filtered) (map[r.category] ||= []).push(r)
    for (const list of Object.values(map)) list.sort((a, b) => a.title.localeCompare(b.title))
    return map
  }, [filtered])

  return (
    <>
      <div className="page-head">
        <div className="shell">
          <div className="rule-short" />
          <Eyebrow>The Collection</Eyebrow>
          <h1>Every dish carries a source and a grade</h1>
          <p className="page-head__lede">
            Eighteen dishes drawn from tablets, tomb walls, storerooms and residue chemistry. Sorted by
            what the fire does to them, because that is the only classification the Bronze Age would have
            recognised.
          </p>
        </div>
      </div>

      <div className="shell" style={{ paddingBlock: '2rem 5rem' }}>
        <div className="viewbar">
          <div className="viewbar__group">
            <span className="viewbar__label">View</span>
            <div className="viewbar__opts">
              <button aria-pressed={view === 'index'} onClick={() => setView('index')}>
                Index
              </button>
              <button aria-pressed={view === 'cards'} onClick={() => setView('cards')}>
                Cards
              </button>
            </div>
          </div>

          <div className="viewbar__group">
            <span className="viewbar__label">Region</span>
            <div className="viewbar__opts">
              <button aria-pressed={region === 'all'} onClick={() => setRegion('all')}>
                All
              </button>
              {regions.map((r) => (
                <button key={r.slug} aria-pressed={region === r.slug} onClick={() => setRegion(r.slug)}>
                  {r.name.replace('The ', '')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filtered.length === 0 && <p>No dishes published from this region yet.</p>}

        {view === 'index' ? (
          <IndexView byCategory={byCategory} />
        ) : (
          <div className="grid grid--3">
            {filtered.map((r) => (
              <RecipeCard recipe={r} key={r.slug} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

function IndexView({ byCategory }) {
  return (
    <>
      {CATEGORIES.map((group) => {
        const present = group.names.filter((name) => byCategory[name]?.length)
        if (!present.length) return null

        return (
          <div className="index-group" key={group.group}>
            <div className="index-group__title">{group.group}</div>
            {present.map((name) => (
              <div className="index-cat" key={name}>
                <h3 className="index-cat__title">{name}</h3>
                <ul className="index-list">
                  {byCategory[name].map((r) => (
                    <li key={r.slug}>
                      <Link to={`/recipes/${r.slug}`}>
                        <span className="index-list__name">{names[r.slug]?.common || r.title}</span>
                        {r.ancient && <span className="index-list__ancient">{r.ancient}</span>}
                        <span className="index-list__siglum">{r.siglum}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )
      })}
    </>
  )
}

function RecipeCard({ recipe }) {
  const region = regionBySlug[recipe.region]
  return (
    <Link className="card" to={`/recipes/${recipe.slug}`}>
      <p className="card__meta">
        {region?.name}
        <Diamond />
        {recipe.date}
      </p>
      <h3>{names[recipe.slug]?.common || recipe.title}</h3>
      {recipe.ancient && <p className="card__ancient">{recipe.ancient}</p>}
      <p>{recipe.summary}</p>
      <div className="card__foot">
        <p className="card__meta">
          {recipe.serves}
          <Diamond />
          {recipe.time}
        </p>
      </div>
    </Link>
  )
}
