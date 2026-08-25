import { Link } from 'react-router-dom'
import { LEVELS, LEVEL_ORDER, resolve, levelImpact } from '../data/sourcing'
import { recipeBySlug } from '../data/recipes'
import { useSourcing } from '../components/Sourcing'
import { Eyebrow } from '../components/Apparatus'

const DEMO = 'lamb-and-beet-stew-tuhu'

export default function Kitchen() {
  const { level, setLevel } = useSourcing()
  const demo = recipeBySlug[DEMO]
  const items = demo.ingredientGroups[0].items

  return (
    <>
      <div className="page-head">
        <div className="shell">
          <div className="rule-short" />
          <Eyebrow>Your kitchen</Eyebrow>
          <h1>Set what your shop actually stocks</h1>
          <p className="page-head__lede">
            Every recipe on this site rewrites its own ingredient list to match. Pick the level once and it
            follows you around — no account, no login, it just remembers.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="shell">
          <div className="grid grid--3">
            {LEVEL_ORDER.map((key) => (
              <button
                className={level === key ? 'levelcard is-active' : 'levelcard'}
                key={key}
                onClick={() => setLevel(key)}
                aria-pressed={level === key}
              >
                <span className="levelcard__tick" aria-hidden="true">
                  {level === key ? '●' : '○'}
                </span>
                <h3>{LEVELS[key].label}</h3>
                <p className="levelcard__blurb">{LEVELS[key].blurb}</p>
                <p>{LEVELS[key].detail}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* The rule that makes this different from "use whatever you like" */}
      <section className="section section--sunk">
        <div className="shell-narrow">
          <div className="interdiction">
            <p className="interdiction__label">The one rule this obeys</p>
            <p className="interdiction__rule">
              A substitute has to be something the same region grew, herded or traded in the same period.
              We will send you to a supermarket. We will not send you out of the Bronze Age.
            </p>
          </div>

          <div className="prose">
            <p>
              That means barley for barley, lentils for lentils and wholemeal wheat where emmer is
              unobtainable — all fine, all attested. It also means we will never offer you a tomato, a
              chilli, a potato, a lemon, a spoon of sugar or a hopped beer, however convenient it would be.
            </p>
            <p>
              And where an ordinary shop genuinely has nothing legal — bog myrtle, mastic, tiger nuts — the
              recipe says <strong>leave it out</strong> and tells you what that costs the dish, rather than
              inventing a swap that quietly ruins it.
            </p>
            <p>
              <Link className="backlink" to="/standard">
                The full standard →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Live proof, on a real ingredient list */}
      <section className="section">
        <div className="shell-narrow">
          <div className="section__head">
            <Eyebrow tone="blue">Watch it work</Eyebrow>
            <h2>{demo.title}, as your shop would have it</h2>
            <p>
              This is the real ingredient list from the recipe. Change the setting above and it changes
              here.
            </p>
          </div>

          <table className="ing">
            <tbody>
              {items.map((item, i) => {
                const r = resolve(item, level)
                return (
                  <tr key={i} className={r.omit ? 'ing--omit' : undefined}>
                    <td className="ing__qty">{r.omit ? '—' : r.qty}</td>
                    <td className="ing__mod">
                      {r.omit ? <s>{item.modern}</s> : r.name}
                      {r.swapped && <span className="ing__swap">swapped</span>}
                      {r.omit && <span className="ing__swap ing__swap--omit">leave out</span>}
                      {r.note && <span className="ing__anc">{r.note}</span>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <p className="rsec__foot">
            {(() => {
              const { swapped, omitted } = levelImpact(demo, level)
              if (!swapped && !omitted) return 'At this level nothing changes — cook it exactly as written.'
              const parts = []
              if (swapped) parts.push(`${swapped} ingredient${swapped === 1 ? '' : 's'} swapped`)
              if (omitted) parts.push(`${omitted} left out`)
              return `${parts.join(', ')}. Everything still inside the region and the period.`
            })()}
          </p>

          <p style={{ marginTop: '2rem' }}>
            <Link className="btn btn--solid" to={`/recipes/${DEMO}`}>
              Cook this one
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
