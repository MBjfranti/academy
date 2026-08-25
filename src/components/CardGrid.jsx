import { Link } from 'react-router-dom'
import { dishArt } from '../data/imagery'
import { cardFor } from '../data/dishCards'

/* A browsable grid of dishes.
   Replaces the swipe deck. A deck shows you one thing and hides the other twenty, which is
   fine for four bases you already know and useless for browsing seventeen dishes you do
   not — you cannot compare, you cannot scan, and finding a specific dish means swiping
   past everything before it.

   The card carries only what you need to choose: a picture, a name, two or three words of
   concept, and the tags you would filter on. Everything else lives behind the click. */

/* `hrefFor` makes a card a LINK; `onOpen` makes it a button. Both are supported because
   the two are genuinely different affordances: a dish now has a page of its own, and a
   card that navigates should be a real anchor so it can be middle-clicked, opened in a new
   tab, copied, and read as a link by a screen reader. A button that calls navigate() looks
   identical and does none of that. */
export default function CardGrid({ items, onOpen, hrefFor, label }) {
  return (
    <ul className="cgrid" aria-label={label}>
      {items.map((it) => (
        <li key={it.slug}>
          <DishCard item={it} onOpen={onOpen} hrefFor={hrefFor} />
        </li>
      ))}
    </ul>
  )
}

function DishCard({ item, onOpen, hrefFor }) {
  /* Attested dishes keep concept and tags in dishCards.js; invented ones carry them on
     themselves. Read whichever exists so one grid serves both. */
  const { concept, tags } = { ...cardFor(item.slug), ...item }
  const art = dishArt[item.slug]

  const inner = (
    <>
      <span className="dcard__fig">
        {art ? (
          <img
            className="square"
            src={art.thumb ?? art.src}
            alt=""
            width={art.tw ?? art.w}
            height={art.th ?? art.h}
            loading="lazy"
            decoding="async"
          />
        ) : (
          /* No art yet for this dish. Hold the space rather than letting the grid go
             ragged — a missing picture should look like a gap, not like a bug. */
          <span className="dcard__noart" aria-hidden="true" />
        )}
      </span>

      <span className="dcard__body">
        <span className="dcard__name">{item.name}</span>
        {concept && <span className="dcard__concept">{concept}</span>}
        {tags.length > 0 && (
          <span className="dcard__tags">
            {tags.map((t) => (
              <span className="dtag" key={t}>
                {t}
              </span>
            ))}
          </span>
        )}
      </span>
    </>
  )

  return hrefFor ? (
    <Link className="dcard" to={hrefFor(item)}>
      {inner}
    </Link>
  ) : (
    <button className="dcard" onClick={() => onOpen(item)} aria-label={`Open ${item.name}`}>
      {inner}
    </button>
  )
}
