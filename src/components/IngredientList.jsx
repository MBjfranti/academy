import { SECTIONS } from '../data/fundamentals'
// The .ilist step-colour rules live in ingredients.css. Imported HERE rather than left
// to whichever page happens to pull it in, so this component carries its own styles
// wherever it is mounted.
import './ingredients.css'

/* Two ways to read the same list.
   By step  — mise en place. Everything you need before you light the hob,
              grouped and colour-keyed to the step that consumes it.
   By aisle — the shopping trip. Same ingredients, grouped by where in the
              shop they live, each keeping its step colour so you can still
              see when it gets used. */

/* Aisles that exist in the recipe data but have no SECTIONS entry, because they are not
   places in a shop. Named here rather than left to fall through: building the by-aisle
   view purely from SECTIONS DROPS anything it does not recognise, and a silently missing
   ingredient is the worst possible failure in a recipe — the list still looks complete. */
const EXTRA_LABELS = {
  drinks: 'Beer & wine',
  equipment: 'Equipment',
  other: 'Everything else',
}

export default function IngredientList({ ingredients, sort }) {
  if (sort === 'aisle') {
    const known = new Set(SECTIONS.map((s) => s.key))
    const groups = [
      ...SECTIONS.map((s) => ({
        key: s.key,
        label: s.label,
        items: ingredients.filter((i) => i.aisle === s.key),
      })),
      // Whatever is left, in first-seen order, so nothing can vanish.
      ...[...new Set(ingredients.map((i) => i.aisle))]
        .filter((k) => k && !known.has(k))
        .map((k) => ({
          key: k,
          label: EXTRA_LABELS[k] ?? k,
          items: ingredients.filter((i) => i.aisle === k),
        })),
    ].filter((g) => g.items.length)

    return (
      <div className="ilist">
        {groups.map((g) => (
          <section className="ilist__g" key={g.key}>
            <h5 className="ilist__h">{g.label}</h5>
            <ul>
              {g.items.map((ing, i) => (
                <li className={`ilist__i ilist__i--s${ing.step}`} key={i}>
                  <span className="ilist__step" title={`Used at step ${ing.step}`}>
                    {ing.step}
                  </span>
                  {ing.item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    )
  }

  const used = [...new Set(ingredients.map((i) => i.step))].sort((a, b) => a - b)

  /* No step text here — the method is sitting right beside it. The number and
     the colour are the whole link. */
  return (
    <div className="ilist ilist--bystep">
      {used.map((step) => (
        <section className={`ilist__g ilist__g--s${step}`} key={step}>
          <span className="ilist__step" title={`Step ${step}`}>
            {step}
          </span>
          <ul>
            {ingredients
              .filter((i) => i.step === step)
              .map((ing, i) => (
                <li className="ilist__i" key={i}>
                  {ing.item}
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
