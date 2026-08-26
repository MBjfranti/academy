import { useState } from 'react'
import { intro, specimens, outro } from '../data/voices'
import BackLink from '../components/BackLink'
import '../components/reports.css'
import './voices.css'

/* FOUR CANDIDATE VOICES, ON THE SITE RATHER THAN IN A DOCUMENT.
 *
 * This is a working page, not a published one — it is deliberately absent from the top bar
 * and reachable only by typing /voices. It exists because a voice cannot be judged in a
 * text file. The measure of a voice here is what it does in THIS column, at THIS measure,
 * in Newsreader at this size, with a standfirst above it and a plate beside it. So the
 * specimens borrow `.prose` and `--measure` from the article stylesheet and get no styling
 * of their own beyond the furniture that frames them.
 *
 * EVERY SPECIMEN IS SET IDENTICALLY, which is the whole method. If the four were
 * typeset differently the reader would be comparing settings rather than sentences.
 *
 * BLIND READ hides the names and the influence notes. Being told a passage is "the
 * Patience Gray one" before reading it settles the question in advance, and the point of
 * the exercise is to find out which one actually reads better. */

// Minimal inline markdown, because the source is a working document.
function rich(t) {
  const out = []
  const re = /\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`/g
  let last = 0
  let m
  while ((m = re.exec(t)) !== null) {
    if (m.index > last) out.push(t.slice(last, m.index))
    if (m[1]) out.push(<strong key={m.index}>{m[1]}</strong>)
    else if (m[2]) out.push(<em key={m.index}>{m[2]}</em>)
    else out.push(<code key={m.index}>{m[3]}</code>)
    last = re.lastIndex
  }
  if (last < t.length) out.push(t.slice(last))
  return out
}

function Blocks({ blocks }) {
  return blocks.map((b, i) =>
    b.t === 'ul' ? (
      <ul key={i}>
        {b.x.map((li) => (
          <li key={li}>{rich(li)}</li>
        ))}
      </ul>
    ) : (
      <p key={i}>{rich(b.x)}</p>
    ),
  )
}

export default function Voices() {
  const [blind, setBlind] = useState(false)

  return (
    <div className="page">
      <div className="page__scroll">
        <div className={`wrap voices${blind ? ' voices--blind' : ''}`}>
          <BackLink to="/">Reports</BackLink>

          <header className="voices__head">
            <p className="voices__kicker">Voice test</p>
            <h1 className="voices__title">Four voices for Yadinu</h1>
            <div className="voices__intro">
              <Blocks blocks={intro} />
            </div>
          </header>

          <div className="voices__bar">
            <nav aria-label="Jump to a voice">
              {specimens.map((s) => (
                <a href={`#v-${s.letter}`} key={s.letter}>
                  <span className="voices__navletter">{s.letter}</span>
                  <span className="voices__navname">{s.name}</span>
                </a>
              ))}
            </nav>
            <label className="voices__toggle">
              <input type="checkbox" checked={blind} onChange={(e) => setBlind(e.target.checked)} />
              Blind read
            </label>
          </div>

          {specimens.map((s) => (
            <section className="voices__spec" id={`v-${s.letter}`} key={s.letter}>
              <div className="voices__spechead">
                <span className="voices__letter" aria-hidden="true">
                  {s.letter}
                </span>
                <h2 className="voices__name">{s.name}</h2>
              </div>

              {/* The article stylesheet, unmodified. This is the point of the page. */}
              <div className="prose">
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <aside className="voices__note" aria-label={`About voice ${s.letter}`}>
                <p className="voices__notelabel">The voice</p>
                <Blocks blocks={s.note} />
              </aside>
            </section>
          ))}

          <section className="voices__outro">
            <h2>Notes for the evaluation</h2>
            <Blocks blocks={outro} />
          </section>
        </div>
      </div>
    </div>
  )
}
