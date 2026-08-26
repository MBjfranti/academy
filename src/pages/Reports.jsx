import { Link } from 'react-router-dom'
import { posts, reportImg, bcDate } from '../data/fieldReports'
import { byline } from '../data/authors'
import hideBroken from '../components/hideBroken'
import { items as marketItems } from '../data/market'
import { attestedDishes, inventedDishes } from '../data/dishes'
import '../components/reports.css'

/* THE HOME PAGE.

   A LEAD AND THEN A GRID OF CARDS. Two shapes have been tried and discarded here. A lead
   plus a column of equal sidebar rows worked at three posts and turned into a wall of
   identical lines at eight. Adding a third tier — featured, two secondaries, then a bare
   list — fixed the wall but demoted older pieces to a date and a title, which on a site
   where the writing IS the product buries the good ones the moment they age.

   So: every post is a card with a picture, a headline and a standfirst, and the newest one
   gets a bigger card. Nothing is demoted for being old. A reader scanning the page is
   choosing a SUBJECT, and a subject needs a picture and a sentence, not a filing date.

   THE LEAD IS SIDE BY SIDE, not a banner. A full-width hero above the grid pushed the cards
   off the bottom of the scroller entirely, so the picture takes the left and the words take
   the right, and the first row of cards stays in view underneath it.

   IMAGES ARE DELIBERATELY MODERATE. The reference that prompted this shape is a
   photographer's journal where the image is the content; here the image is the door and the
   writing is the room. Cards run 3:2 and capped, so a row of three reads as three choices
   rather than three posters.

   The three doors above are the way out to the tools. They are named for what you would DO —
   "shop", "cook" — because "Market" means nothing to somebody who has just arrived. */

const DOORS = [
  {
    to: '/writers',
    label: 'Meet the writers',
    line: 'Four bylined voices',
  },
  {
    to: '/market',
    label: 'Shop the market',
    // Counted, not typed. The hardcoded numbers went stale the first time each grew.
    line: `${marketItems.length} verdicts`,
  },
  {
    to: '/recipes',
    label: 'Cook a meal',
    line: `${attestedDishes.length + inventedDishes.length} dishes, graded`,
  },
  {
    to: '/nutrition',
    label: 'Nutrition guide',
    line: 'A week, measured honestly',
  },
]

/* EVERY POST IS IN THE GRID. There used to be a "New here?" strip above it holding the
   orientation pieces, pulled out of the grid on the grounds that they were a front door
   rather than news.

   That was right when one narrator had written two introductions and eleven reports. It
   stopped being right the moment there were four writers, because then the introductions
   ARE the substance: four people arriving through four subjects, which is the most
   interesting thing on the page. Pinning them into a strip of thumbnails demoted the best
   writing on the site to a row of chips, and left the grid underneath entirely empty.

   So the strip is gone and the bar carries the doors alone. A reader scanning the grid is
   choosing a SUBJECT, and the kicker on each card already says which of them is an
   introduction. */

const href = (post) => `/reports/${post.slug}`
const kicker = (post) => (post.kind === 'letter' ? 'Introduction' : 'Field report')

/* The front page shows the MEAL. See the `card` note in fieldReports.js. */
const facePic = (post) => post.card ?? post.hero?.name

export default function Reports() {
  const [featured, ...rest] = posts

  return (
    <div className="page">
      <div className="page__scroll">
        <div className="wrap">
          <div className="bar">
            <nav className="doors" aria-label="Where to go next">
              {DOORS.map((d) => (
                <Link className="door" key={d.to} to={d.to}>
                  <span className="door__label">{d.label}</span>
                  <span className="door__line">{d.line}</span>
                </Link>
              ))}
            </nav>
          </div>

          {featured && <Lead post={featured} />}

          <ul className="cards" aria-label="More posts">
            {rest.map((p) => (
              <li key={p.slug}>
                <Card post={p} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/* The newest post: picture on the left, words on the right. One paragraph of the body, not
   two — enough to prove there is writing behind the headline, short enough that the cards
   below it stay on screen. */
function Lead({ post }) {
  return (
    <article className={`lead${post.hero ? '' : ' lead--text'}`}>
      {post.hero && (
        <Link className="lead__fig" to={href(post)} tabIndex={-1} aria-hidden="true">
          <img src={reportImg(post, facePic(post))} alt="" loading="eager"
               decoding="async" onError={hideBroken} />
        </Link>
      )}

      <div className="lead__txt">
        <p className="lead__kicker">
          {kicker(post)} <span>Latest</span>
        </p>
        <h2 className="lead__title">
          <Link className="lead__open" to={href(post)}>
            {post.title}
          </Link>
        </h2>
        <p className="lead__stand">{post.standfirst}</p>
        <p className="lead__excerpt">{post.body[0]}</p>
        <p className="lead__meta">
          {/* THE WRITER LEADS THE META LINE. With one narrator a byline on a card was
              noise, because every card carried the same name. With four it is the first
              thing a returning reader scans for. */}
          <strong>{byline(post.author)}</strong> · {post.place} · {bcDate(post.date)}
        </p>
      </div>
    </article>
  )
}

/* One post, one card. The whole card is the link — a card with a separate "read more" gives
   a reader two targets for one destination and makes them choose between identical doors. */
function Card({ post }) {
  return (
    <Link className={`card${post.hero ? '' : ' card--text'}`} to={href(post)}>
      {post.hero && (
        <span className="card__fig">
          <img src={reportImg(post, facePic(post), true)} alt="" loading="lazy"
            decoding="async" onError={hideBroken} />
        </span>
      )}
      <span className="card__body">
        <span className="card__kicker">{kicker(post)}</span>
        <span className="card__title">{post.title}</span>
        <span className="card__stand">{post.standfirst}</span>
        <span className="card__meta">
          <strong>{byline(post.author)}</strong> · {post.place} · {bcDate(post.date)}
        </span>
      </span>
    </Link>
  )
}
