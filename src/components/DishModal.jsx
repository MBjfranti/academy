import IngredientList from './IngredientList'
import { useDialog } from './useDialog'
import { cardFor } from '../data/dishCards'
import { dishArt } from '../data/imagery'
import ScriptMark from './ScriptMark'

/* One dish, opened. Everything a cook needs in a single view.

   WHY A MODAL AND NOT A PAGE. The site's rule is one screen, no page scroll. A dish does
   not fit that — a full ingredient list plus method is simply taller than a viewport. An
   overlay is the honest resolution: the PAGE still never scrolls, and the thing that
   genuinely needs height gets its own scroll region without dragging the layout with it.

   The sort control is the same one the Four bases have. It works here because
   ingredientIndex.js supplies the {step, aisle} that recipes.js never carried. */

// A step only carries a colour when an ingredient actually enters at it.
const usesStep = (dish, n) => dish.ingredients.some((i) => i.step === n)

export default function DishModal({ dish, sort, setSort, onClose, extra }) {
  /* Escape, the focus trap and focus restoration all live in useDialog now,
     so this modal and the generic one cannot drift apart. */
  const { wrapRef, closeRef } = useDialog(dish, onClose)

  if (!dish) return null

  // Same fallback as the grid: invented dishes carry their own concept and tags.
  const { concept, tags } = { ...cardFor(dish.slug), ...dish }
  const art = dishArt[dish.slug]

  return (
    <>
      <div className="scrim" onClick={onClose} />
      <div
        className="dmodal"
        role="dialog"
        aria-modal="true"
        aria-label={dish.name}
        ref={wrapRef}
      >
        <header className="dmodal__top">
          <div className="dmodal__id">
            <h2>
              {dish.name}
              {dish.ancient && <span className="dmodal__anc">{dish.ancient}</span>}
            </h2>
            <p className="dmodal__meta">
              {dish.say && <>say {dish.say} · </>}
              {[concept, dish.serves, dish.time].filter(Boolean).join(' · ')}
            </p>
            {/* The region's own script, as a quiet third line. seed keeps a given dish on
                the same word every time rather than shuffling on each open. */}
            {dish.raw?.region && (
              <ScriptMark region={dish.raw.region} seed={dish.slug.length} slug={dish.slug} />
            )}
          </div>
          <button ref={closeRef} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>

        <div className="dmodal__body">
          <div className="dmodal__lede">
            {art && (
              <img
                className="square dmodal__art"
                /* `card` (420px), not `src` (880px). This box is 132px — serving the full
                   plate here was 40–110 KB to fill a thumbnail, and the visible pop-in
                   when a dish opened. CardGrid and PlateGrid already do this; the modal
                   was the one place still reaching for the big file. */
                src={art.card ?? art.src}
                alt=""
                width={art.cw ?? art.w}
                height={art.ch ?? art.h}
                loading="lazy"
                decoding="async"
              />
            )}
            <div>
              {dish.line && <p className="dmodal__line">{dish.line}</p>}
              {tags.length > 0 && (
                <p className="dmodal__tags">
                  {tags.map((t) => (
                    <span className="dtag" key={t}>
                      {t}
                    </span>
                  ))}
                </p>
              )}
            </div>
          </div>

          <div className="dmodal__cols">
            <section>
              <div className="dmodal__ih">
                <h3>Ingredients</h3>
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
              <h3>Method</h3>
              <ol className="dmodal__steps">
                {dish.steps.map((st, i) => (
                  /* A step is coloured only when an ingredient actually enters at it.
                     Colouring every step would break the link the colour exists to show —
                     an uncoloured step means "nothing new goes in here", which is real
                     information for a cook standing at the hob. */
                  <li key={i} className={usesStep(dish, i + 1) ? `st${i + 1}` : undefined}>
                    {st}
                  </li>
                ))}
              </ol>
              {extra}
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
