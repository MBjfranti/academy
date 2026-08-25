import { GRADES, GRADE_ORDER, gradeCounts, attestedShare } from '../data/grades'

/* A grade chip. The four grades are the spine of the whole archive —
   nothing is published without one.
   `quiet` is for use inside a recipe, where most lines are attested and
   spelling that out on every row buries the cooking. Attested collapses to a
   bare dot; the exceptions keep their label, so what you notice is what is
   actually in doubt. */
export function Grade({ grade, showMark = false, quiet = false }) {
  const g = GRADES[grade]
  if (!g) return null

  if (quiet && grade === 'attested') {
    return (
      <span className="grade grade--attested grade--quiet" title={`Attested — ${g.short}`}>
        <span className="grade__dot" aria-hidden="true" />
        <span className="grade__sr">Attested</span>
      </span>
    )
  }

  return (
    <span className={`grade grade--${grade}`} title={g.short}>
      <span className="grade__dot" aria-hidden="true" />
      {g.label}
      {showMark && <span className="grade__mark">{g.mark}</span>}
    </span>
  )
}

/* The signature element: how much of this dish is actually ancient, and how
   much of it is us. Proportions come straight from the ingredient grades. */
export function GradeBar({ recipe }) {
  const counts = gradeCounts(recipe)
  const total = GRADE_ORDER.reduce((sum, k) => sum + counts[k], 0)
  const pct = attestedShare(recipe)

  return (
    <div className="gradebar">
      <div className="gradebar__head">
        <span className="gradebar__label">Attested share</span>
        <span className="gradebar__pct">{pct}%</span>
      </div>
      <div
        className="gradebar__track"
        role="img"
        aria-label={`${pct} per cent of the ${total} listed ingredients are attested; the remainder are inferred, reconstructed or unidentified.`}
      >
        {GRADE_ORDER.map((key) =>
          counts[key] ? (
            <span
              key={key}
              className={`gradebar__seg gradebar__seg--${key}`}
              style={{ width: `${(counts[key] / total) * 100}%` }}
            />
          ) : null,
        )}
      </div>
      <div className="gradebar__key">
        {GRADE_ORDER.map((key) =>
          counts[key] ? (
            <span key={key} className={`grade grade--${key}`}>
              <span className="grade__dot" aria-hidden="true" />
              {GRADES[key].label} <span className="grade__mark">{counts[key]}</span>
            </span>
          ) : null,
        )}
      </div>
    </div>
  )
}

export function Siglum({ children, block = false }) {
  return <span className={block ? 'siglum siglum--block' : 'siglum'}>{children}</span>
}

export function Eyebrow({ children, tone = 'copper' }) {
  const cls = tone === 'blue' ? 'eyebrow eyebrow--blue' : tone === 'dim' ? 'eyebrow eyebrow--dim' : 'eyebrow'
  return <p className={cls}>{children}</p>
}

export const Diamond = () => (
  <span className="sep" aria-hidden="true">
    ✦
  </span>
)
