import { useState } from 'react'
import { Link } from 'react-router-dom'
import IngredientList from './IngredientList'
import ScriptMark from './ScriptMark'
import { cardFor } from '../data/dishCards'
import { dishArt } from '../data/imagery'
import { kitchen } from '../data/kitchen'
import { provenance } from '../data/provenance'
import { isInvented } from '../data/dishes'

/* ONE DISH, ON ITS OWN PAGE.
 *
 * WHAT THIS HAS THAT THE MODAL DID NOT. An overlay is sized for a glance: it showed the
 * ingredients, the method, a flavour note and a source line, and that was already the most
 * it could hold without becoming a scroll-within-a-scroll. Meanwhile every recipe in
 * recipes.js also carries `apparatus` — the notes explaining what a word means, why an
 * ingredient is graded inferred rather than attested, what is guesswork — plus the sources
 * it rests on and the kitchen's steering notes. That is the material this site is actually
 * about, and none of it fitted.
 *
 * So the page shows the lot, in reading order: what it is, how to cook it, how to tell
 * whether you got it right, and then the honest apparatus about how much of it we really
 * know. The last section is deliberately last and deliberately not hidden.
 */
export default function DishDetail({ dish }) {
  const [sort, setSort] = useState('step')
  const { concept, tags } = { ...cardFor(dish.slug), ...dish }
  const art = dishArt[dish.slug]
  const r = dish.raw
  const notes = kitchen[dish.slug]
  const invented = isInvented(dish)

  // A step is coloured only when an ingredient actually enters at it. Colouring every step
  // would break the link the colour exists to show — an uncoloured step means "nothing new
  // goes in here", which is real information for a cook standing at the hob.
  const usesStep = (n) => dish.ingredients.some((i) => i.step === n)

  return (
    <article className="dish">
      <header className="dish__head">
        {art && (
          <img
            className="dish__art"
            src={art.card ?? art.src}
            alt=""
            width={art.cw ?? art.w}
            height={art.ch ?? art.h}
            loading="eager"
            decoding="async"
          />
        )}
        <div className="dish__id">
          <p className="dish__kicker">{invented ? 'Invented dish' : 'From the tablets'}</p>
          <h1>
            {dish.name}
            {dish.ancient && <span className="dish__anc">{dish.ancient}</span>}
          </h1>
          <p className="dish__meta">
            {dish.say && <>say {dish.say} · </>}
            {[concept, dish.serves, dish.time].filter(Boolean).join(' · ')}
          </p>
          {r?.region && <ScriptMark region={r.region} seed={dish.slug.length} slug={dish.slug} />}
          {tags?.length > 0 && (
            <p className="dish__tags">
              {tags.map((t) => (
                <span className="dtag" key={t}>
                  {t}
                </span>
              ))}
            </p>
          )}
        </div>
      </header>

      {dish.line && <p className="dish__lede">{dish.line}</p>}

      <div className="dish__cols">
        <section>
          <div className="dish__ih">
            <h2>Ingredients</h2>
            <div className="sortsw" role="group" aria-label="Sort ingredients">
              <button aria-pressed={sort === 'step'} onClick={() => setSort('step')}>
                By step
              </button>
              <button aria-pressed={sort === 'aisle'} onClick={() => setSort('aisle')}>
                By aisle
              </button>
            </div>
          </div>
          <IngredientList ingredients={dish.ingredients} sort={sort} />
        </section>

        <section>
          <h2>Method</h2>
          <ol className="dish__steps">
            {dish.steps.map((st, i) => (
              <li key={i} className={usesStep(i + 1) ? `st${i + 1}` : undefined}>
                {st}
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* THE TRIPTYCH. Three answers to the same question — is this going right? — so they
          belong side by side rather than stacked: what it should taste like, what it means
          if it does not, and what to do when the shop lets you down. Thirty of the
          thirty-two attested dishes carry all three, so the row is the normal case and not
          a special one; where a dish has only two, auto-fit simply widens them. */}
      {(notes?.flavour || notes?.steer?.length > 0 || r?.substitutions?.length > 0) && (
        <div className="advice">
          {notes?.flavour && (
            <section className="advice__card">
              <h2>How it should taste</h2>
              <p>{notes.flavour}</p>
            </section>
          )}

          {notes?.steer?.length > 0 && (
            <section className="advice__card">
              <h2>If it goes wrong</h2>
              <ul className="steer">
                {notes.steer.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </section>
          )}

          {r?.substitutions?.length > 0 && (
            <section className="advice__card">
              <h2>If you can’t get it</h2>
              <ul className="subs">
                {r.substitutions.map((sub, i) => (
                  <li key={i}>
                    <span className="subs__from">{sub.from}</span>
                    <span className="subs__arrow">→</span>
                    <span className="subs__to">{sub.to}</span>
                    {sub.text && <p>{sub.text}</p>}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}

      {(notes?.nutrition || notes?.serveWith) && (
        <section className="dish__note">
          <h2>At the table</h2>
          {notes.nutrition && <p>{notes.nutrition}</p>}
          {notes.serveWith && (
            <p className="dish__serve">
              <span>Serve with</span>
              {notes.serveWith}
            </p>
          )}
        </section>
      )}

      {invented ? (
        <section className="dish__apparatus">
          <h2>What this is</h2>
          {dish.swap && (
            <p className="dish__gloss">
              <b>What changed</b>
              {dish.swap}
            </p>
          )}
          {dish.note && (
            <p className="dish__gloss">
              <b>Worth knowing</b>
              {dish.note}
            </p>
          )}
          <p className="dish__gloss dish__gloss--warn">
            <b>Invented</b>
            Not a historical recipe. Nobody in the Bronze Age ate this. Every ingredient in it
            is something the Market says you may buy, which is the only rule it follows.
          </p>
        </section>
      ) : (
        <section className="dish__apparatus">
          <h2>How much of this do we actually know?</h2>

          {provenance[dish.slug] && (
            <p className="dish__gloss">
              <b>Where it comes from</b>
              {provenance[dish.slug]} {r.provenance}. {r.period}, {r.date}.
            </p>
          )}

          {r.sourceText?.text && (
            <>
              <h3>{r.sourceText.kind === 'quotation' ? 'The text itself' : 'The source'}</h3>
              <blockquote className="srcquote">{r.sourceText.text}</blockquote>
              <p className="dish__attr">{r.sourceText.attribution}</p>
            </>
          )}

          {/* The apparatus. These notes existed in the data from the beginning and had
              nowhere to appear — the overlay had no room and the card had less. They are
              the difference between a recipe and a claim. */}
          {r.apparatus?.length > 0 &&
            r.apparatus.map((a) => (
              <p className="dish__gloss" key={a.term}>
                <b>{a.term}</b>
                {a.text}
              </p>
            ))}

          {r.sources?.length > 0 && (
            <p className="dish__sources">
              <span>Sources</span>
              {r.sources.join(' · ')}
            </p>
          )}
        </section>
      )}

      <p className="dish__back">
        <Link to="/recipes">← All dishes</Link>
      </p>
    </article>
  )
}
