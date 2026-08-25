import { Link } from 'react-router-dom'
import { methods } from '../data/methods'
import { recipeBySlug } from '../data/recipes'
import { names } from '../data/kitchen'
import { Grade, Eyebrow } from '../components/Apparatus'

export default function Workstation() {
  return (
    <>
      <div className="page-head">
        <div className="shell">
          <div className="rule-short" />
          <Eyebrow>Workstation</Eyebrow>
          <h1>The techniques that sit underneath everything else</h1>
          <p className="page-head__lede">
            Material facts that make Bronze Age cooking behave differently from ours. Most of them were
            never written down, for the same reason nobody writes down how to hold a knife.
          </p>
        </div>
      </div>

      <div className="shell" style={{ paddingBlock: '3rem 5rem' }}>
        {methods.map((method) => {
          const dishes = method.appliesTo.map((slug) => recipeBySlug[slug]).filter(Boolean)

          return (
            <article className="region" id={method.slug} key={method.slug}>
              <div className="region__grid">
                <div>
                  <Grade grade={method.grade} showMark />
                  <h2 className="region__name" style={{ marginTop: '0.9rem', fontSize: '1.75rem' }}>
                    {method.title}
                  </h2>
                  <p className="region__line">{method.kicker}</p>
                </div>

                <div>
                  {method.body.map((para, i) => (
                    <p key={i} style={{ color: 'var(--clay-2)' }}>
                      {para}
                    </p>
                  ))}

                  {dishes.length > 0 && (
                    <>
                      <p className="rsub">Where it bites</p>
                      <ul className="index-list">
                        {dishes.map((dish) => (
                          <li key={dish.slug}>
                            <Link to={`/recipes/${dish.slug}`}>
                              <span className="index-list__name">{names[dish.slug]?.common || dish.title}</span>
                              <span className="index-list__siglum">{dish.siglum}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </>
  )
}
