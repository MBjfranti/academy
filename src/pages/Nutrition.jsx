import { useState, useMemo } from 'react'
import {
  NUTRIENTS,
  totalsFor,
  fmtN,
  verdictFor,
  TYPICAL_US,
  TYPICAL_US_NOTES,
  PHYTATE_NOTE,
} from '../data/nutrients'
import { meals, mealItems, dayItems, ASSUMPTIONS, NOT_THIS } from '../data/nobleDay'
import {
  days,
  dayTotals,
  weekAverage,
  weekWithFishDays,
  FISH_SENSITIVITY_ROWS,
  WEEK_ASSUMPTIONS,
} from '../data/week'
import { moderns } from '../data/imagery'
import '../components/imagery.css'

/* NUTRITION — what this food actually does.

   FOUR VIEWS, and the week is not padding. A single day is the wrong unit for judging this
   diet in particular, because the foods carrying the scarce nutrients were never daily
   foods: fish carries EPA+DHA, vitamin D and iodine; liver carries vitamin A in a quantity
   nothing else in the corpus approaches. Score one lamb-and-lentils day and vitamin A looks
   like a failure at 74%. Score a week containing liver once — which is how offal was eaten
   — and it is 160%. The week is not a way of flattering the numbers; it is a way of asking
   the question at the frequency the food was actually eaten at.

   "The numbers" carries a day/week switch rather than being duplicated, so the same table
   answers both and the two can be compared without leaving the view. */

const VIEWS = [
  { key: 'day', label: 'The day' },
  { key: 'week', label: 'The week' },
  { key: 'numbers', label: 'The numbers' },
  { key: 'caveats', label: 'What this isn’t' },
]

/* Which nutrients get called out as short, in the instruction line. Only `goal` rows can
   be short — a `limit` cannot be "short" and a `context` row has nothing to be short of. */
const shortfallsIn = (totals) =>
  NUTRIENTS.filter((n) => n.basis === 'goal' && n.ref && totals[n.key] / n.ref < 0.8)

export default function Nutrition() {
  const [view, setView] = useState('day')
  const [coastal, setCoastal] = useState(false)
  const [wine, setWine] = useState(true)
  const [basis, setBasis] = useState('week')

  const { totals: dayT } = useMemo(
    () => totalsFor(dayItems({ coastal, wine })),
    [coastal, wine],
  )
  const weekT = useMemo(() => weekAverage(), [])
  const shown = basis === 'week' ? weekT : dayT
  /* Shortfalls are computed from whatever the reader is looking at. On the week view
     that is the week; on the numbers view it follows the basis switch. */
  const short = shortfallsIn(view === 'day' ? dayT : view === 'week' ? weekT : shown)

  return (
    <div className="page">
      <nav className="subnav" aria-label="Sections">
        <div className="wrap subnav__in">
          {VIEWS.map((v) => (
            <button key={v.key} aria-pressed={view === v.key} onClick={() => setView(v.key)}>
              {v.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="note">
        <div className="wrap note__in">
          {/* The line has to describe whatever the view is actually showing. On "The
              numbers" that is the basis switch, not the day — saying "one representative
              day" above a week-average table is the kind of mismatch nobody reads twice
              and everybody half-believes. */}
          <p>
            {view === 'week' || (view === 'numbers' && basis === 'week') ? (
              <>
                Seven days from the same pantry, {Math.round(weekT.kcal)} kcal a day on average.
              </>
            ) : (
              <>
                One representative day, {Math.round(dayT.kcal)} kcal, built only from this pantry.
              </>
            )}
            {short.length > 0 && (
              <b> Short on {short.map((n) => n.label).join(', ')}.</b>
            )}
          </p>
          {view === 'day' && (
            <div className="nutbar__switches">
              <button aria-pressed={coastal} onClick={() => setCoastal((v) => !v)}>
                {coastal ? 'Coastal · fish' : 'Inland · lamb'}
              </button>
              <button aria-pressed={wine} onClick={() => setWine((v) => !v)}>
                {wine ? 'With wine' : 'Water only'}
              </button>
            </div>
          )}
          {view === 'numbers' && (
            <div className="nutbar__switches">
              <button aria-pressed={basis === 'week'} onClick={() => setBasis('week')}>
                Week average
              </button>
              <button aria-pressed={basis === 'day'} onClick={() => setBasis('day')}>
                Single day
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="page__scroll">
        <div className="wrap">
          {view === 'day' && (
            <div className="daygrid">
              {meals.map((m) => {
                if (m.optional === 'wine' && !wine) return null
                const items = mealItems(m, { coastal })
                const sub = totalsFor(items).totals
                return (
                  <article className="meal" key={m.key}>
                    <h3>{m.name}</h3>
                    <p className="meal__dish">{coastal && m.coastalDish ? m.coastalDish : m.dish}</p>
                    <ul>
                      {items.map((i, k) => (
                        <li key={k}>
                          <span className="meal__g">{i.g} g</span>
                          {i.as}
                        </li>
                      ))}
                    </ul>
                    <p className="meal__sum">
                      {Math.round(sub.kcal)} kcal · {fmtN('protein', sub.protein)} g protein ·{' '}
                      {fmtN('fibre', sub.fibre)} g fibre
                    </p>
                    <p className="meal__note">{m.note}</p>
                  </article>
                )
              })}
            </div>
          )}

          {view === 'week' && <WeekView />}

          {view === 'numbers' && (
            <NumbersTable totals={shown} basis={basis} wine={wine} />
          )}

          {view === 'caveats' && <Caveats />}
        </div>
      </div>
    </div>
  )
}

/* ── the week ───────────────────────────────────────────────────────────── */

function WeekView() {
  const avg = weekAverage()
  const scenarios = [0, 1, 2].map((n) => ({ n, t: weekWithFishDays(n) }))

  return (
    <div className="week">
      <div className="week__days">
        {days.map((d) => {
          const t = dayTotals(d)
          return (
            <article className="wday" key={d.key}>
              <h3>
                {d.name}
                {d.marks?.map((m) => (
                  <span className={`wmark wmark--${m}`} key={m}>
                    {m}
                  </span>
                ))}
              </h3>
              <p className="wday__theme">{d.theme}</p>
              <p className="wday__sum">
                {Math.round(t.kcal)} kcal · {fmtN('fibre', t.fibre)} g fibre ·{' '}
                {fmtN('epaDha', t.epaDha)} mg EPA+DHA
              </p>
              <p className="wday__note">{d.note}</p>
            </article>
          )
        })}
      </div>

      <div className="week__side">
        <section>
          <h4>Does fish change the answer?</h4>
          <p className="nut__caveat">
            Two fish days is the assumption the whole week rests on, and the one we are least
            sure of — so here is what happens if it is wrong. It is not a small effect.
          </p>
          <table className="fishtbl">
            <thead>
              <tr>
                <th scope="col">Per week</th>
                {scenarios.map((s) => (
                  <th scope="col" key={s.n}>
                    {s.n} fish
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FISH_SENSITIVITY_ROWS.map((k) => {
                const n = NUTRIENTS.find((x) => x.key === k)
                return (
                  <tr key={k}>
                    <th scope="row">{n.label}</th>
                    {scenarios.map((s) => (
                      <td key={s.n}>{Math.round((s.t[k] / n.ref) * 100)}%</td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
          <p className="nut__caveat">
            Vitamin D stays low whichever way you run it. That one was sunlight then and is
            fortification now, and no amount of fish in this corpus fixes it.
          </p>
        </section>

        <section>
          <h4>What the week assumes</h4>
          <ul>
            {WEEK_ASSUMPTIONS.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
          {/* The figures stay flat. The line after them is allowed an opinion —
              it is the one place on this tab where a number wants a translation
              into something a reader can feel. */}
          <p className="nut__caveat">
            Average across seven days: {Math.round(avg.kcal)} kcal, {fmtN('fibre', avg.fibre)} g
            fibre, {fmtN('protein', avg.protein)} g protein. That fibre figure is not a
            triumph of ancient wisdom; it is what happens when nothing in the pantry has had
            the fibre taken out of it yet.
          </p>
        </section>
      </div>
    </div>
  )
}

/* ── the table ──────────────────────────────────────────────────────────── */

function NumbersTable({ totals, basis, wine }) {
  return (
    <div className="ntable">
      <table>
        <thead>
          <tr>
            <th scope="col">Nutrient</th>
            <th scope="col">{basis === 'week' ? 'Week average' : 'This day'}</th>
            <th scope="col">Typical US</th>
            <th scope="col">Reference</th>
            <th scope="col">Reading</th>
          </tr>
        </thead>
        <tbody>
          {NUTRIENTS.map((n) => {
            const mine = totals[n.key]
            const us = TYPICAL_US[n.key]
            const v = verdictFor(n, mine)
            /* "Better" only means anything where there is a direction. For a limit, lower
               wins; for a goal, higher wins; for context there is no winning. */
            const better =
              us == null || n.basis === 'context' ? false : n.basis === 'limit' ? mine < us : mine > us
            return (
              <tr key={n.key} className={v ? `is-${v.tone}` : 'is-context'}>
                <th scope="row">
                  {n.label}
                  {n.phytate && <i title={PHYTATE_NOTE}>◆</i>}
                  {n.sparse && <i title="Sparsely measured in food databases">?</i>}
                </th>
                <td className={better ? 'win' : undefined}>
                  {fmtN(n.key, mine)} {n.unit}
                </td>
                <td>{us == null ? '—' : `${fmtN(n.key, us)} ${n.unit}`}</td>
                <td className="tgt">
                  {n.basis === 'context'
                    ? '—'
                    : n.basis === 'limit'
                      ? `max ${fmtN(n.key, n.ref)} ${n.unit}`
                      : `${fmtN(n.key, n.ref)} ${n.unit}`}
                </td>
                {/* A ceiling is not a percentage. "94% of target" invites the reading that
                    a day at 1,700 mg of sodium is somehow less complete, when it is simply
                    further inside the limit. Limits get a word; goals get a number. */}
                <td className="pct">
                  {!v ? '—' : n.basis === 'limit' ? v.word : `${Math.round(v.pct)}%`}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="notes">
        <h4>How to read this</h4>
        <p className="nut__caveat">
          Three kinds of reference value, and they do not mean the same thing.{' '}
          <b>Goals</b> — fibre, calcium, the vitamins — are minimums to reach, and a percentage
          is meaningful. <b>Limits</b> — sodium and saturated fat — are ceilings, so they read
          &ldquo;within&rdquo; or &ldquo;over&rdquo; rather than as a percentage; being at 100%
          of a ceiling is sitting on it, not achieving it. <b>Energy, carbohydrate and total
          fat</b> are context and are not scored at all.
        </p>
        <p className="nut__caveat">
          <b>Omega-3 is two rows, not one.</b> ALA is the plant form, from walnuts, olive oil
          and sesame. EPA and DHA are the marine form. Conversion of ALA to EPA runs roughly
          5–10%, and to DHA under 1%, so a large ALA figure does not cover an EPA+DHA
          shortfall — which is exactly why they are scored separately here.
        </p>
        <p className="nut__caveat">
          ◆ {PHYTATE_NOTE} ? marks iodine, which most food databases barely measure, so its
          total is a floor rather than a reading.
          {wine && ` Alcohol: ${fmtN('alcohol', totals.alcohol)} g, scored separately from food.`}
        </p>
        <h4>What the middle column is</h4>
        <ul>
          {TYPICAL_US_NOTES.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
        <p className="nut__caveat">
          The honest ranking is three-way: a deliberately designed modern whole-food diet
          first, this pantry a close second, a typical ultra-processed pattern clearly third.
          &ldquo;Modern diet&rdquo; on its own is not a comparator — someone eating salmon,
          lentils and olive oil is also eating a modern diet.
        </p>
      </div>
    </div>
  )
}

/* ── caveats ────────────────────────────────────────────────────────────── */

function Caveats() {
  return (
    <div className="caveats">
      <section>
        <h4>What we assume</h4>
        <ul>
          {ASSUMPTIONS.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </section>
      <section>
        <h4>What this isn&rsquo;t</h4>
        <ul>
          {NOT_THIS.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </section>
      <section>
        <h4>Numbers not to trust</h4>
        <p>
          <b>Iron and zinc.</b> {PHYTATE_NOTE}
        </p>
        <p>
          <b>Iodine.</b> Barely measured in most food tables, so the total is a floor rather than
          a reading. Sea salt does not help — flake salt is under 1 µg a pinch against roughly
          70 µg for iodised. Fish and dairy do all the work, and even two fish days a week only
          reach about 39% of the target.
        </p>
        <p>
          <b>Vitamin D.</b> The one genuine, unfixable weakness. It stays near 18% of target
          across the whole week whatever we do with the fish, because in this period it came
          from sunlight rather than from food.
        </p>
        <img
          className="fresco"
          src={moderns.weighing.src}
          alt={moderns.weighing.alt}
          width={moderns.weighing.w}
          height={moderns.weighing.h}
          loading="lazy"
          decoding="async"
        />
      </section>
    </div>
  )
}
