import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AISLES, items, search } from '../data/market'
import { MARKET_GROUPS } from '../data/marketGroups'
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

const VERDICT_FILTERS = [
  { key: 'all', label: 'Yes + careful' },
  { key: 'yes', label: 'Yes only' },
  { key: 'careful', label: 'Careful only' },
]

const SORTS = [
  { key: 'shelf', label: 'Shelf order' },
  { key: 'az', label: 'A–Z' },
]

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
  const [panel, setPanel] = useState(false)
  const [detail, setDetail] = useState(null)
  const [params, setParams] = useSearchParams()

  const q = params.get('q') ?? ''
  const wantedAisle = params.get('aisle') ?? 'produce'
  const aisle = AISLES.some((a) => a.key === wantedAisle) ? wantedAisle : 'produce'
  const groups = MARKET_GROUPS[aisle] ?? []
  const wantedGroup = params.get('group') ?? 'all'
  const group = groups.some((g) => g.key === wantedGroup) ? wantedGroup : 'all'
  const wantedVerdict = params.get('show') ?? 'all'
  const verdict = VERDICT_FILTERS.some((v) => v.key === wantedVerdict) ? wantedVerdict : 'all'
  const sort = params.get('sort') === 'az' ? 'az' : 'shelf'

  /* Market is used with one hand and interrupted often. Put the whole browse state in the
     URL so returning from a recipe, a message or a locked phone restores the same shelf. */
  const setView = (patch) => {
    const next = { q, aisle, group, verdict, sort, ...patch }
    const query = {}
    if (next.q) query.q = next.q
    if (next.aisle !== 'produce') query.aisle = next.aisle
    if (next.group !== 'all') query.group = next.group
    if (next.verdict !== 'all') query.show = next.verdict
    if (next.sort !== 'shelf') query.sort = next.sort
    setParams(query, { replace: true })
  }

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

  const aisleItems = useMemo(
    () => items.filter((i) => i.aisle === aisle && i.verdict !== 'no'),
    [aisle],
  )

  const verdictItems = useMemo(
    () => aisleItems.filter((i) => verdict === 'all' || i.verdict === verdict),
    [aisleItems, verdict],
  )

  const groupCounts = useMemo(
    () =>
      Object.fromEntries(
        groups.map((g) => [g.key, verdictItems.filter((i) => g.names.includes(i.name)).length]),
      ),
    [groups, verdictItems],
  )

  const shown = useMemo(() => {
    const inGroup =
      group === 'all'
        ? verdictItems
        : verdictItems.filter((i) => groups.find((g) => g.key === group)?.names.includes(i.name))
    return sort === 'az' ? [...inGroup].sort((a, b) => a.name.localeCompare(b.name)) : inGroup
  }, [group, groups, sort, verdictItems])

  const sections = useMemo(() => {
    if (sort === 'az') return [{ key: 'az', label: group === 'all' ? 'A–Z' : groups.find((g) => g.key === group)?.label, items: shown }]

    if (group !== 'all') {
      return [{ key: group, label: groups.find((g) => g.key === group)?.label, items: shown }]
    }

    const byName = new Map(shown.map((item) => [item.name, item]))
    return groups
      .map((g) => ({ ...g, items: g.names.map((name) => byName.get(name)).filter(Boolean) }))
      .filter((section) => section.items.length > 0)
  }, [group, groups, shown, sort])

  const pickVerdict = (nextVerdict) => {
    if (group === 'all') return setView({ verdict: nextVerdict })
    const chosen = groups.find((g) => g.key === group)
    const survives = aisleItems.some(
      (item) => chosen?.names.includes(item.name) && (nextVerdict === 'all' || item.verdict === nextVerdict),
    )
    setView({ verdict: nextVerdict, group: survives ? group : 'all' })
  }

  const allAvoid = useMemo(() => items.filter((i) => i.verdict === 'no'), [])

  const current = AISLES.find((a) => a.key === aisle)
  const sign = aisleArt[aisle]
  const aisleCounts = useMemo(
    () =>
      Object.fromEntries(
        AISLES.map((a) => [a.key, items.filter((i) => i.aisle === a.key && i.verdict !== 'no').length]),
      ),
    [],
  )

  return (
    <div className="page">
      <h1 className="sr-only">Market</h1>
      <div className="seek">
        <div className="wrap">
          <label className="ask">
            <span className="ask__icon" aria-hidden="true">
              ⌕
            </span>
            <input
              type="text"
              value={q}
              onChange={(e) => setView({ q: e.target.value })}
              placeholder="Can I buy this?"
              aria-label="Search any ingredient"
              autoComplete="off"
            />
            {q && (
              <button className="ask__clear" onClick={() => setView({ q: '' })} aria-label="Clear search">
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
                  Nothing listed for “{q}”. Check anything absent from this list. Most things
                  in a modern shop are younger than they look.
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
          <nav className="subnav marketaisles" aria-label="Aisles">
            <div className="wrap subnav__in">
              {AISLES.map((a) => (
                <button
                  key={a.key}
                  aria-pressed={aisle === a.key}
                  onClick={() => setView({ aisle: a.key, group: 'all' })}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </nav>

          <div className="marketaisle">
            <div className="wrap">
              <label>
                <span className="sr-only">Aisle</span>
                <select
                  value={aisle}
                  onChange={(e) => setView({ aisle: e.target.value, group: 'all' })}
                >
                  {AISLES.map((a) => (
                    <option value={a.key} key={a.key}>
                      {a.label} · {aisleCounts[a.key]}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="note marketnote">
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

          <section className="markettools" aria-label="Filter and sort this aisle">
            <div className="wrap markettools__in">
              <div className="marketgroups" role="group" aria-label="Ingredient group">
                <button aria-pressed={group === 'all'} onClick={() => setView({ group: 'all' })}>
                  All <i>{verdictItems.length}</i>
                </button>
                {groups.map((g) => (
                  <button
                    key={g.key}
                    aria-pressed={group === g.key}
                    disabled={groupCounts[g.key] === 0}
                    onClick={() => setView({ group: g.key })}
                  >
                    {g.label} <i>{groupCounts[g.key]}</i>
                  </button>
                ))}
              </div>

              <div className="marketoptions">
                <label>
                  <span>Show</span>
                  <select value={verdict} onChange={(e) => pickVerdict(e.target.value)}>
                    {VERDICT_FILTERS.map((v) => (
                      <option value={v.key} key={v.key}>{v.label}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Sort</span>
                  <select value={sort} onChange={(e) => setView({ sort: e.target.value })}>
                    {SORTS.map((s) => (
                      <option value={s.key} key={s.key}>{s.label}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          </section>

          <div className="page__scroll">
            <div className="wrap">
              <p className="marketcount" aria-live="polite">
                Showing {shown.length} {shown.length === 1 ? 'ingredient' : 'ingredients'} in {current?.label}
              </p>
              {sections.length > 0 ? (
                <div className="marketledger">
                  {sections.map((section) => (
                    <section className="marketsection" key={section.key}>
                      <h2>{section.label}</h2>
                      <ul>
                        {section.items.map((item) => (
                          <MarketRow item={item} onOpen={setDetail} key={item.name} />
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              ) : (
                <div className="marketempty">
                  <p>No ingredients match these filters.</p>
                  <button onClick={() => setView({ group: 'all', verdict: 'all' })}>Show the whole aisle</button>
                </div>
              )}
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
                Everyone could get it. It reads most strongly as{' '}
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

function MarketRow({ item, onOpen }) {
  const cultures = Array.isArray(item.cultures)
    ? item.cultures.map((key) => accentByKey[key]?.name).filter(Boolean)
    : []

  return (
    <li className={`marketrow marketrow--${item.verdict}`}>
      <button
        onClick={() => onOpen(item)}
        aria-label={`${VERDICT[item.verdict].word}: ${item.name}. Open details`}
      >
        <span className="marketrow__mark" aria-hidden="true">
          {VERDICT[item.verdict].mark}
        </span>
        <span className="marketrow__body">
          <span className="marketrow__name">{item.name}</span>
          <span className="marketrow__note">{item.note}</span>
        </span>
        {(cultures.length > 0 || item.tier) && (
          <span className="marketrow__meta">
            {cultures.length > 0 ? cultures.join(' · ') : item.tier === 'elite' ? 'Feast food' : 'Everyday'}
          </span>
        )}
        <span className="marketrow__chev" aria-hidden="true">›</span>
      </button>
    </li>
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
