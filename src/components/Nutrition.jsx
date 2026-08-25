import { nutritionFor, fmt, FIELD_ORDER, LABELS, UNITS, CAVEAT } from '../data/nutrition'

/* Numbers only where we can actually weigh the recipe. Anything under
   three-quarters weighed returns null and renders nothing at all, because a
   partial total reads as a full one. */
export default function Nutrition({ recipe }) {
  const n = nutritionFor(recipe)
  if (!n) return null

  return (
    <section className="nut">
      <h4>
        {n.basis === 'serving' ? `Per serving, of ${n.portions}` : 'For the whole batch'}
      </h4>
      <dl className="nut__grid">
        {FIELD_ORDER.map((f) => (
          <div key={f}>
            <dt>{LABELS[f]}</dt>
            <dd>
              {fmt(f, n.per[f])}
              <i>{UNITS[f]}</i>
            </dd>
          </div>
        ))}
      </dl>
      <p className="nut__caveat">{CAVEAT}</p>
    </section>
  )
}
