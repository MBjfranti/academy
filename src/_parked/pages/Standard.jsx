import { Link } from 'react-router-dom'
import { GRADES, GRADE_ORDER } from '../data/grades'
import { Grade, Eyebrow } from '../components/Apparatus'

/* The chronology is the argument. Positions are computed from real dates on a
   single linear scale so the gap is drawn to scale rather than asserted. */
const T0 = 3200
const T1 = 400
const SPAN = T0 - T1
const at = (year) => ((T0 - year) / SPAN) * 100
const wide = (from, to) => ((from - to) / SPAN) * 100

const BARS = [
  { row: 0, from: 3000, to: 1150, label: 'The Bronze Age — Aegean & Near East', tone: 'bronze' },
  { row: 1, from: 1650, to: 1180, label: 'The Hittite Empire', tone: 'bronze' },
  { row: 2, from: 800, to: 400, label: 'Celtic — Iron Age', tone: 'celtic' },
]

const TICKS = [
  { year: 3000, label: '3000 BC' },
  { year: 2000, label: '2000 BC' },
  { year: 1180, label: '1180 BC' },
  { year: 800, label: '800 BC' },
]

export default function Standard() {
  return (
    <>
      <div className="page-head">
        <div className="shell">
          <div className="rule-short" />
          <Eyebrow>The Standard</Eyebrow>
          <h1>What this Academy will and will not publish</h1>
          <p className="page-head__lede">
            The editorial policy, the grading system, and the one interdiction that governs everything in
            the collection.
          </p>
        </div>
      </div>

      <div className="shell-narrow" style={{ paddingBlock: '3.5rem 5rem' }}>
        <div className="prose">
          <h2>The interdiction</h2>
          <p>
            The Bronze Age eastern Mediterranean was a connected world. Copper from Cyprus, tin from central
            Asia, resin from the Levant, grain from Egypt and pottery from the Aegean turn up in each
            other&rsquo;s ports, and the Uluburun ship went down carrying all of it at once. Foodstuffs moved
            with everything else. A Levantine cook using Aegean oil, a Hittite table with Egyptian honey, a
            Babylonian scribe writing down an Elamite broth and naming it as Elamite — these are attested,
            and this Academy teaches them.
          </p>

          <div className="interdiction">
            <p className="interdiction__label">The rule</p>
            <p className="interdiction__rule">
              No dish may combine the materials or methods of two regions unless contact between those
              regions is materially attested, in the same period, in the ground or in the archives.
            </p>
          </div>

          <p>
            This is not a stylistic preference. It is the difference between reconstruction and invention.
            Where two cultures demonstrably traded, a dish that reflects that trade is a historical claim
            that can be checked. Where they did not, it is a modern restaurant concept wearing a costume.
          </p>

          <h2>The case that names itself</h2>
          <p>
            The clearest violation is also the most frequently proposed: a Celtic and Hittite fusion. It
            fails the rule twice over. There is no geographical contact to attest — and, more decisively,
            there is no period in which both parties existed.
          </p>
          <p>
            The Hittite empire collapsed around 1180 BC. Celtic material culture does not appear in the
            record until Hallstatt C, around 800 BC, and the Celts are an Iron Age phenomenon throughout.
            Nearly four centuries separate the last Hittite king from the first thing anyone would call
            Celtic. There is no fusion to reconstruct because there was never a day on which both cuisines
            were being cooked.
          </p>

          <div className="chron breakout">
            <div className="chron__track">
              <div className="chron__ticks">
                {TICKS.map((tick) => (
                  <span className="chron__tick" style={{ left: `${at(tick.year)}%` }} key={tick.year}>
                    {tick.label}
                  </span>
                ))}
              </div>

              {BARS.map((bar) => (
                <div className="chron__row" key={bar.label}>
                  <span
                    className={`chron__span chron__span--${bar.tone}`}
                    style={{ left: `${at(bar.from)}%`, width: `${wide(bar.from, bar.to)}%` }}
                  >
                    {bar.label}
                  </span>
                </div>
              ))}

              <div className="chron__row chron__row--gap">
                <span
                  className="chron__gap"
                  style={{ left: `${at(1180)}%`, width: `${wide(1180, 800)}%` }}
                >
                  <span>380 years of neither</span>
                </span>
              </div>
            </div>
            <p className="chron__caption">
              Drawn to scale, 3200–400 BC ✦ 1180: the fall of Hattusa ✦ 800: the earliest Celtic material
              culture ✦ The two traditions never overlap
            </p>
          </div>

          <p>
            Central Europe is nevertheless admitted to this Academy — on Bronze Age evidence, under its own
            Bronze Age names. The salt workings at Hallstatt were a going concern centuries before the Iron
            Age culture that took the site&rsquo;s name existed. What we will not do is let the later label
            reach backwards and collect a cuisine it has no claim on.
          </p>

          <h2 id="grades">The four grades</h2>
          <p>
            Every ingredient, every step and every dish carries one. They appear on the page beside the
            thing they describe, not gathered into a disclaimer at the back where nobody reads them.
          </p>

          {GRADE_ORDER.map((key) => (
            <div className="appnote" key={key} style={{ marginBottom: '1.75rem' }}>
              <p className="appnote__term">
                <Grade grade={key} showMark />
              </p>
              <p>
                <strong>{GRADES[key].short}</strong> {GRADES[key].long}
              </p>
            </div>
          ))}

          <h2>Standing rules of the collection</h2>
          <ol>
            <li>
              <strong>No quantity is ancient.</strong> Not one Bronze Age culinary text states a measure.
              Every weight and volume in this archive is editorial and graded accordingly.
            </li>
            <li>
              <strong>Where a dish turns on an unidentified word, we cook it twice</strong> — once with the
              leading candidate, once with the term omitted — and publish the difference instead of the
              guess.
            </li>
            <li>
              <strong>Substitutions are declared on the page.</strong> A modern stand-in never gets written
              silently into an ingredient list.
            </li>
            <li>
              <strong>Attested does not mean safe.</strong> Where an ingredient is genuinely attested and
              cannot be reproduced safely — cedar oil in the Kabri wine is the standing example — we omit it
              and say why, rather than dropping it quietly.
            </li>
            <li>
              <strong>An anachronism is a defect, not a liberty.</strong> No tomato, chilli, potato, maize,
              citrus, cane sugar, distilled spirit, hop or roux appears anywhere in this collection.
            </li>
            <li>
              <strong>A picture is not a caption.</strong> Dishes read out of tomb imagery are graded on the
              reading, never on the confidence of the person doing the reading.
            </li>
          </ol>

          <h2 id="corrections">Corrections</h2>
          <p>
            This archive publishes contested identifications as contested. Where a reading here has been
            superseded, or where an entry has quietly hardened a debate into a fact, we would rather correct
            it than defend it. Every entry names its sources so that the disagreement has somewhere to
            start.
          </p>
          <p>
            <Link className="btn btn--ghost" to="/corpus">
              The corpus this rests on
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
