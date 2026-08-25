import { useState, useMemo } from 'react'
import { corpus, SOURCE_KINDS } from '../data/corpus'
import { regionBySlug } from '../data/regions'
import { Eyebrow, Diamond } from '../components/Apparatus'

export default function Corpus() {
  const [kind, setKind] = useState('all')

  const filtered = useMemo(
    () => (kind === 'all' ? corpus : corpus.filter((s) => s.kind === kind)),
    [kind],
  )

  return (
    <>
      <div className="page-head">
        <div className="shell">
          <div className="rule-short rule-short--blue" />
          <Eyebrow tone="blue">The Corpus</Eyebrow>
          <h1>Everything this archive stands on</h1>
          <p className="page-head__lede">
            Each source is listed with what it gives us and what it withholds. The second column is the more
            important one, and it is the column that almost never gets published.
          </p>
        </div>
      </div>

      <div className="shell" style={{ paddingBlock: '2rem 5rem' }}>
        <div className="viewbar">
          <div className="viewbar__group">
            <span className="viewbar__label">Kind of evidence</span>
            <div className="viewbar__opts">
              <button aria-pressed={kind === 'all'} onClick={() => setKind('all')}>
                All
              </button>
              {Object.entries(SOURCE_KINDS).map(([key, label]) => (
                <button key={key} aria-pressed={kind === key} onClick={() => setKind(key)}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filtered.map((source) => {
          const region = regionBySlug[source.region]
          return (
            <article className="region" key={source.siglum}>
              <div className="region__grid">
                <div>
                  <span className="siglum siglum--block">{source.siglum}</span>
                  <h2 className="region__name" style={{ marginTop: '0.9rem', fontSize: '1.6rem' }}>
                    {source.name}
                  </h2>
                  <p className="card__meta" style={{ marginTop: '0.9rem' }}>
                    {SOURCE_KINDS[source.kind]}
                    <Diamond />
                    {region?.name}
                    <Diamond />
                    {source.date}
                  </p>
                  <p style={{ color: 'var(--clay-dim)', fontSize: '0.88rem', marginTop: '0.5rem' }}>
                    {source.holding}
                  </p>
                </div>

                <div>
                  <p className="rsub" style={{ marginTop: 0 }}>
                    What it gives
                  </p>
                  <p style={{ color: 'var(--clay)' }}>{source.gives}</p>

                  <p className="rsub">What it withholds</p>
                  <p style={{ color: 'var(--clay-mid)' }}>{source.withholds}</p>

                  <p className="rsub">Why it matters</p>
                  <p style={{ color: 'var(--clay-2)' }}>{source.weight}</p>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </>
  )
}
