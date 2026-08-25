import { useState, useMemo } from 'react'
import { AISLES, items, search } from '../data/market'
import { accentByKey } from '../data/accents'
import { aisleArt, moderns } from '../data/imagery'
import Modal from '../components/Modal'
import '../components/imagery.css'
import '../components/cards.css'

const VERDICT = {
  yes: { word: 'Yes', mark: '✓' },
  careful: { word: 'Careful', mark: '!' },
  no: { word: 'No', mark: '✕' },
}

const RANK = { no: 0, careful: 1, yes: 2 }

/* THE MARKET — "can I buy this?", answered.

   The search-to-verdict flow is the best-tested interaction on the site and is
   untouched: type, get a colour-coded verdict, get told what to buy instead.
   What changed is the furniture around it.

   · The aisle blurb now carries its aisle's carved sign. Seven of these have
     been sitting unused in /img; at 46px in the instruction row the ram's head
     and crossed knives actually read, which is 46px well spent and it is the
     one image on the site that tells you where you are.
   · Item detail and the never-buy list moved from a right-hand slide-over to
     the same centred modal every other openable thing on the site uses. The
     slide-over was also the least accessible surface here — Escape closed it
     but Tab walked straight out of it into the page behind.
   · The empty search result gets a picture. It is the only screen where the
     tool fails you and the only region on the site that is genuinely empty.

   One pantry, no culture filter. The five kitchens shared almost everything,
   so hiding two thirds of an aisle behind a culture setting was dividing
   something that is not really divided — and it made search lie. */

export default function Market() {
  const [q, setQ] = useState('')
  const [aisle, setAisle] = useState('produce')
  const [panel, setPanel] = useState(false)
  const [detail, setDetail] = useState(null)

  const results = useMemo(() => search(q), [q])

  const found = useMemo(() => {
    if (!results) return null
    return [...results].sort(
      // Relevance first, THEN worst-verdict-first. Ranking purely by verdict put a
      // "no" card above a genuinely better match for the thing the cook typed.
      (a, b) =>
        (b.score ?? 0) - (a.score ?? 0) ||
        RANK[a.verdict] - RANK[b.verdict] ||
        a.name.localeCompare(b.name),
    )
  }, [results])

  const shown = useMemo(() => items.filter((i) => i.aisle === aisle && i.verdict !== 'no'), [aisle])
  const allAvoid = useMemo(() => items.filter((i) => i.verdict === 'no'), [])

  const current = AISLES.find((a) => a.key === aisle)
  const sign = aisleArt[aisle]

  return (
    <div className="page">
      <div className="seek">
        <div className="wrap">
          <label className="ask">
            <span className="ask__icon" aria-hidden="true">
              ⌕
            </span>
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Can I buy this?"
              aria-label="Search any ingredient"
              autoComplete="off"
            />
            {q && (
              <button className="ask__clear" onClick={() => setQ('')} aria-label="Clear search">
                ✕
              </button>
            )}
          </label>

          <button
            className="avoidbtn"
            onClick={() => setPanel(true)}
            aria-label={`Never buy: ${allAvoid.length} things`}
          >
            <span aria-hidden="true">✕</span>
            <span className="avoidbtn__l">Never buy</span>
            <b>{allAvoid.length}</b>
          </button>
        </div>
      </div>

      {found ? (
        <div className="page__scroll">
          <div className="wrap">
            {found.length === 0 ? (
              <div className="empty">
                <p>
                  Nothing listed for “{q}”. If it is not here, assume it needs checking — most
                  things in a modern shop are younger than they look.
                </p>
                <img
                  className="fresco"
                  src={moderns.hunting.src}
                  alt={moderns.hunting.alt}
                  width={moderns.hunting.w}
                  height={moderns.hunting.h}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ) : (
              found.map((item) => <Verdict item={item} key={item.name} />)
            )}
          </div>
        </div>
      ) : (
        <>
          <nav className="subnav" aria-label="Aisles">
            <div className="wrap subnav__in">
              {AISLES.map((a) => (
                <button key={a.key} aria-pressed={aisle === a.key} onClick={() => setAisle(a.key)}>
                  {a.label}
                </button>
              ))}
            </div>
          </nav>

          <div className="note">
            <div className="wrap note__in">
              {sign && (
                <img
                  className="note__fig cutout"
                  src={sign.src}
                  /* The tab above it and the blurb beside it both say
                     "Produce". Describing the carving as well is noise. */
                  alt=""
                  width={sign.w}
                  height={sign.h}
                  decoding="async"
                />
              )}
              <p>{current?.blurb}</p>
            </div>
          </div>

          <div className="page__scroll">
            <div className="wrap">
              <ul className="tiles">
                {shown.map((item) => (
                  <li className={`tile tile--${item.verdict}`} key={item.name}>
                    <button className="tile__open" onClick={() => setDetail(item)}>
                      <h3>
                        {item.name}
                        {item.verdict === 'careful' && <span className="tile__flag">!</span>}
                      </h3>
                      <p>{item.note}</p>
                      {Array.isArray(item.cultures) && item.cultures.length > 0 && (
                        <span className="tile__tags">
                          {item.cultures.map((k) => (
                            <span className="tile__sig" key={k}>
                              {accentByKey[k]?.name}
                            </span>
                          ))}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}

      {/* ── everything you cannot buy ── */}
      <Modal
        open={panel}
        onClose={() => setPanel(false)}
        title="Never buy"
        sub={`${allAvoid.length} things that look ancient and are not`}
      >
        {AISLES.map((a) => {
          const group = allAvoid.filter((i) => i.aisle === a.key)
          if (!group.length) return null
          return (
            <section key={a.key}>
              <h3 className="panel__aisle">{a.label}</h3>
              <ul className="nolist">
                {group.map((item) => (
                  <li key={item.name}>
                    <b>{item.name}</b>
                    <span>{item.note}</span>
                    {item.instead && (
                      <span className="nolist__instead">Instead: {item.instead}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
        {/* A sign-off at the foot of the longest list on the site. It is inside
            a scroll region that is already there, so it costs nothing. */}
        <img
          className="fresco fresco--signoff"
          src={moderns.checkout.src}
          alt={moderns.checkout.alt}
          width={moderns.checkout.w}
          height={moderns.checkout.h}
          loading="lazy"
          decoding="async"
        />
      </Modal>

      {/* ── one ingredient ── */}
      <Modal
        open={Boolean(detail)}
        onClose={() => setDetail(null)}
        eyebrow={detail ? VERDICT[detail.verdict].word : null}
        title={detail?.name}
        narrow
      >
        {detail && (
          <>
            <p className="dmodal__line">{detail.note}</p>
            {detail.instead && (
              <p className="verdict__instead">
                <span>Buy instead</span>
                {detail.instead}
              </p>
            )}
            {Array.isArray(detail.cultures) && detail.cultures.length > 0 && (
              <p className="detail__meta">
                Everyone had access to it — but it reads most strongly as{' '}
                {detail.cultures
                  .map((k) => accentByKey[k]?.name)
                  .filter(Boolean)
                  .join(', ')}
                .
              </p>
            )}
            {detail.tier === 'elite' && (
              <p className="detail__meta">Feast food rather than weeknight food.</p>
            )}
            {detail.tier === 'commoner' && (
              <p className="detail__meta">Everyday food, in every one of these kitchens.</p>
            )}
          </>
        )}
      </Modal>
    </div>
  )
}

function Verdict({ item }) {
  return (
    <article className={`verdict verdict--${item.verdict}`}>
      <div className="verdict__head">
        <span className="verdict__mark" aria-hidden="true">
          {VERDICT[item.verdict].mark}
        </span>
        <div>
          <p className="verdict__word">{VERDICT[item.verdict].word}</p>
          <h2>{item.name}</h2>
        </div>
      </div>
      <p className="verdict__why">{item.note}</p>
      {item.instead && (
        <p className="verdict__instead">
          <span>Buy instead</span>
          {item.instead}
        </p>
      )}
      {Array.isArray(item.cultures) && item.cultures.length > 0 && (
        <p className="verdict__off">
          Reads most strongly as{' '}
          {item.cultures
            .map((k) => accentByKey[k]?.name)
            .filter(Boolean)
            .join(', ')}
          .
        </p>
      )}
    </article>
  )
}
