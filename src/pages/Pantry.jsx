import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { staples, basics } from '../data/fundamentals'
import { rules } from '../data/rules'
import { counts } from '../data/market'
import { shared, accents, tables } from '../data/accents'
import PlateGrid from '../components/PlateGrid'
import CardGrid from '../components/CardGrid'
import DishModal from '../components/DishModal'
import Modal from '../components/Modal'
import Nutrition from '../components/Nutrition'
import { accentImages, accentCutouts, images, stapleArt } from '../data/imagery'
import { useDealt } from '../components/useShuffled'
import '../components/imagery.css'
import '../components/cards.css'

/* THE PANTRY — what to keep, what to do, what to make, and how to tilt it.

   Four views, one interaction. Every view is a grid of cards, and every card
   opens the same modal. That is the whole change: the page used to hold three
   different mechanisms — a grid of dashboard tiles that opened a right-hand
   slide-over, a horizontal swipe deck you could not scan, and a stack of three
   prose sections — and a reader had to work out which one they were in before
   they could use it.

   Browse as a grid, read as a modal. Nothing else. */

const VIEWS = [
  { key: 'stock', label: 'Keep in stock' },
  { key: 'rules', label: 'Six habits' },
  { key: 'make', label: 'Four bases' },
  { key: 'accents', label: 'Accents' },
]

const NOTE = {
  stock: 'Twelve staples carry most of the cooking on this site. Keep them in, then buy the fresh food.',
  rules: 'Six habits carry this cooking. Learn them once and use them everywhere.',
  make: 'Four bases recur across the kitchens. Pick one for the method.',
  accents:
    'One shared kitchen runs beneath all five regions. These swaps pull a dish towards one of them.',
}

// Every transparent cutout we have, as a pool to deal from for the rule modals.
const CUTOUTS = [...Object.values(accentCutouts), images.sharedKitchen].filter(Boolean)

const stapleCards = staples.map((s) => ({
  key: s.slug,
  name: s.name,
  line: s.why,
  art: stapleArt[s.slug],
  value: s,
}))

// The numeral IS the kicker here — a big copper 1 above the name says
// "rule one" without a mono label under it repeating the digit.
const ruleCards = rules.map((r) => ({
  key: r.slug,
  num: r.n,
  name: r.name,
  line: r.doThis,
  copperLine: true,
  value: r,
}))

// The shared kitchen, the five tilts and the two scales — one card species,
// three labelled groups, in the order the argument actually runs.
const sharedCard = {
  key: 'shared',
  name: 'The kitchen underneath all five',
  // The card said "Grain, pulse, allium, fat, sour, bread. Eight constants" —
  // six named, eight claimed. The eight are the `shared.always` list in
  // accents.js, so the sentence now names those and the count is true.
  line: 'Grain, pulse, allium, spice, herb, sour, sweet, bread. Eight constants, everywhere.',
  cutout: images.sharedKitchen,
  value: { kind: 'shared' },
}

const accentCards = accents.map((a) => ({
  key: a.key,
  kicker: a.where,
  name: a.name,
  line: a.inOneLine,
  cutout: accentCutouts[a.key],
  value: { kind: 'accent', a },
}))

const tableCards = tables.map((t) => ({
  key: t.key,
  name: t.name,
  line: t.line,
  value: { kind: 'table', t },
}))

export default function Pantry() {
  const [params, setParams] = useSearchParams()
  const wantedView = params.get('view') ?? 'stock'
  const view = VIEWS.some((v) => v.key === wantedView) ? wantedView : 'stock'
  const setView = (next) => setParams(next === 'stock' ? {} : { view: next }, { replace: true })
  const [staple, setStaple] = useState(null)
  const [rule, setRule] = useState(null)
  const [accent, setAccent] = useState(null)
  const [sort, setSort] = useState('step')
  const [openBase, setOpenBase] = useState(null)
  // Reshuffled on load, held steady while you use the page.
  const ruleFigures = useDealt(CUTOUTS, rules.length)
  const c = counts()

  const ruleFig = rule ? ruleFigures[rules.findIndex((r) => r.slug === rule.slug)] : null

  return (
    <div className="page">
      <h1 className="sr-only">Pantry</h1>
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
          <p>
            {NOTE[view]}
            {view === 'stock' && (
              <>
                {' '}
                <Link to="/market">{c.yes} things to buy →</Link>
              </>
            )}
          </p>
        </div>
      </div>

      <div className="page__scroll">
        <div className="wrap">
          {view === 'stock' && (
            <PlateGrid items={stapleCards} onOpen={setStaple} label="Twelve staples" />
          )}

          {view === 'rules' && (
            <PlateGrid items={ruleCards} onOpen={setRule} label="Six rules" variant="rules" />
          )}

          {/* Four cards on a screen built for seventeen. Same component and the
              same modal as Recipes — only the card scale changes, because at
              dish-card size four of them read as a leftover row. */}
          {view === 'make' && (
            <div className="bases">
              <CardGrid items={basics} onOpen={setOpenBase} label="Four bases" />
            </div>
          )}

          {view === 'accents' && (
            <>
              <h2 className="grouph">One kitchen underneath</h2>
              <PlateGrid items={[sharedCard]} onOpen={setAccent} label="The shared kitchen" variant="banner" />

              <h2 className="grouph">Five ways to tilt it</h2>
              <PlateGrid items={accentCards} onOpen={setAccent} label="Five accents" wide />

              <h2 className="grouph">And one dial that runs across all five</h2>
              <PlateGrid
                items={tableCards}
                onOpen={setAccent}
                label="Commoner and elite"
                wide
                variant="text"
              />
            </>
          )}
        </div>
      </div>

      {/* ── one staple ── */}
      <Modal
        open={Boolean(staple)}
        onClose={() => setStaple(null)}
        title={staple?.name}
        narrow
      >
        {staple && (
          <div className="mfig">
            {stapleArt[staple.slug] && (
              <img
                className="square mfig__img"
                src={stapleArt[staple.slug].src}
                alt=""
                width={stapleArt[staple.slug].w}
                height={stapleArt[staple.slug].h}
                loading="lazy"
                decoding="async"
              />
            )}
            <div>
              <p className="dmodal__line">{staple.why}</p>
              <dl className="deflist deflist--one">
                <div>
                  <dt>Buy</dt>
                  <dd>{staple.buy}</dd>
                </div>
                <div>
                  <dt>Used in</dt>
                  <dd>{staple.used}</dd>
                </div>
                <div>
                  <dt>Keeps</dt>
                  <dd>{staple.keeps}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </Modal>

      {/* ── one rule ──
          Was a swipe deck: one card at a time, five hidden, and no way to get
          to rule 5 except through 2, 3 and 4. Six is a scannable number, so
          the six are a grid and the reasoning lives behind the click, like
          everything else on the site. */}
      <Modal
        open={Boolean(rule)}
        onClose={() => setRule(null)}
        eyebrow={rule ? `Rule ${rule.n} of 6` : null}
        title={rule?.name}
        narrow
      >
        {rule && (
          <div className="rulebody">
            <p className="rulebody__do">{rule.doThis}</p>
            <p className="rulebody__why">{rule.why}</p>
            <div className="rulebody__foot">
              <p className="rulebody__mistake">
                <b>The usual mistake</b>
                {rule.mistake}
              </p>
              <p className="rulebody__try">
                <b>Try it</b>
                {rule.tryIt}
              </p>
            </div>
            {ruleFig && (
              <img
                className="cutout rulebody__fig"
                src={ruleFig.src}
                alt=""
                width={ruleFig.w}
                height={ruleFig.h}
                loading="lazy"
              />
            )}
          </div>
        )}
      </Modal>

      {/* ── the shared kitchen, one accent, or one scale ── */}
      <Modal
        open={Boolean(accent)}
        onClose={() => setAccent(null)}
        eyebrow={accent?.kind === 'accent' ? accent.a.where : null}
        title={
          accent?.kind === 'accent'
            ? accent.a.name
            : accent?.kind === 'table'
              ? accent.t.name
              : 'The kitchen underneath all five'
        }
        sub={accent?.kind === 'accent' ? accent.a.tagline : null}
        narrow={accent?.kind === 'table'}
      >
        {accent?.kind === 'shared' && (
          <>
            <p className="dmodal__line">{shared.line}</p>
            <dl className="deflist">
              {shared.always.map((row) => (
                <div key={row.k}>
                  <dt>{row.k}</dt>
                  <dd>{row.v}</dd>
                </div>
              ))}
            </dl>
            <p className="dmodal__note">
              <span>Why it is one world and not five</span>
              {shared.connective}
            </p>
          </>
        )}

        {accent?.kind === 'accent' && (
          <>
            <div className="mfig">
              {accentImages[accent.a.key] && (
                <img
                  className="plate mfig__plate"
                  src={accentImages[accent.a.key].src}
                  alt={accentImages[accent.a.key].alt}
                  width={accentImages[accent.a.key].w}
                  height={accentImages[accent.a.key].h}
                  loading="lazy"
                />
              )}
              <div>
                <p className="verdict__instead">
                  <span>In one line</span>
                  {accent.a.inOneLine}
                </p>
                <h3 className="dmodal__subh">The swaps</h3>
                <dl className="deflist deflist--one">
                  {accent.a.swaps.map((s) => (
                    <div key={s.k}>
                      <dt>{s.k}</dt>
                      <dd>{s.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <h3 className="dmodal__subh">The move worth stealing</h3>
            <p className="dmodal__line">{accent.a.move}</p>

            <p className="dmodal__note">
              <span>Fastest tilt</span>
              {accent.a.tilt}
            </p>
          </>
        )}

        {accent?.kind === 'table' && <p className="dmodal__line">{accent.t.line}</p>}
      </Modal>

      {/* One of the Four bases, opened. Same component the Recipes grid uses, so a base
          and a dish read identically once you are inside one. */}
      <DishModal
        dish={openBase}
        sort={sort}
        setSort={setSort}
        onClose={() => setOpenBase(null)}
        extra={
          openBase && (
            <>
              {openBase.note && (
                <p className="dmodal__note">
                  <span>Worth knowing</span>
                  {openBase.note}
                </p>
              )}
              <Nutrition recipe={openBase} />
            </>
          )
        }
      />
    </div>
  )
}
