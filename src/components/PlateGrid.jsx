import './plates.css'

/* A grid of picture-forward cards. See plates.css for why this is a separate
   species from the dish card.

   Every card is one shape: an optional square (a painted plate, a keyed
   cutout, or a numeral), a name, and one line. Whatever a card is standing
   for — a staple, a rule, an accent — clicking it opens the same modal. */

export default function PlateGrid({ items, onOpen, label, wide, variant }) {
  const cls = ['pgrid', wide && 'pgrid--wide', variant && `pgrid--${variant}`]
    .filter(Boolean)
    .join(' ')
  return (
    <ul className={cls} aria-label={label}>
      {items.map((it) => (
        <li key={it.key}>
          <PlateCard item={it} onOpen={onOpen} />
        </li>
      ))}
    </ul>
  )
}

/* item: { key, name, line, art, cutout, num, kicker, copperLine, value }
   `art` and `cutout` are manifest entries from imagery.js; `value` is whatever
   the page wants handed back to its open handler. */
function PlateCard({ item, onOpen }) {
  const art = item.art ?? item.cutout
  const hasFig = Boolean(art) || item.num != null

  return (
    <button
      className={hasFig ? 'pcard' : 'pcard pcard--text'}
      onClick={() => onOpen(item.value ?? item)}
      aria-label={`Open ${item.name}`}
    >
      {item.num != null && <span className="pcard__num">{item.num}</span>}

      {art && (
        <span className={item.cutout ? 'pcard__fig pcard__fig--cut' : 'pcard__fig'}>
          <img
            /* alt="" throughout: the name of the thing is printed directly
               under the picture, so describing the painting as well makes a
               screen reader say it twice. */
            /* `card`, not `thumb`. These draw up to 150px tall on a card up to ~260px
               wide; the 176px thumb is sized for the 88px dish grid and was being
               upscaled here, which is why it looked soft. */
            src={art.card ?? art.src}
            alt=""
            width={art.cw ?? art.w}
            height={art.ch ?? art.h}
            loading="lazy"
            decoding="async"
          />
        </span>
      )}

      <span className="pcard__body">
        {item.kicker && <span className="pcard__kicker">{item.kicker}</span>}
        <span className="pcard__name">{item.name}</span>
        {item.line && (
          <span className={item.copperLine ? 'pcard__line pcard__line--copper' : 'pcard__line'}>
            {item.line}
          </span>
        )}
      </span>
    </button>
  )
}
