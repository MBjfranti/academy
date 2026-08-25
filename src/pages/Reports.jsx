import { Link } from 'react-router-dom'
import { posts, img, yadinuDate } from '../data/fieldReports'
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

/* The orientation pieces are pinned, not sorted.

   They are the oldest posts on the site, so a strict date sort put "Hello, I am Yadinu" —
   the one page that explains who is writing and why — at the bottom of the last row of
   cards. Sorting them as news was the mistake: they are not news, they are the front door.
   So they come out of the grid entirely and sit in the bar at the top, and the grid becomes
   what it should always have been, which is the field reports. */
const isLetter = (p) => p.kind === 'letter'

const href = (post) => `/reports/${post.slug}`
const kicker = (post) => (post.kind === 'letter' ? 'Introduction' : 'Field report')

/* The front page shows the MEAL. See the `card` note in fieldReports.js. */
const facePic = (post) => post.card ?? post.hero?.name

export default function Reports() {
  // Oldest first: these are a reading order, not a news feed. Newest-first put the
  // orientation piece ahead of the introduction it depends on.
  const letters = posts.filter(isLetter).slice().reverse()
  const [featured, ...rest] = posts.filter((p) => !isLetter(p))

  return (
    <div className="page">
      <div className="page__scroll">
        <div className="wrap">
          <div className="bar">
            {letters.length > 0 && (
              <p className="bar__start">
                <span>New here?</span>
                {letters.map((p) => (
                  <Link key={p.slug} to={href(p)}>
                    {/* A face, because the first question a new reader has is who is
                        writing this. A line of copper text does not answer it and a
                        photograph does it before they have finished reading. */}
                    {p.hero && <img src={img(p.hero.name, true)} alt="" loading="eager" />}
                    <span>{p.title.replace(/\.$/, "")}</span>
                  </Link>
                ))}
              </p>
            )}

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

          <ul className="cards" aria-label="More reports">
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
    <article className="lead">
      {post.hero && (
        <Link className="lead__fig" to={href(post)} tabIndex={-1} aria-hidden="true">
          <img src={img(facePic(post))} alt="" loading="eager" decoding="async" />
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
          {post.place} · {yadinuDate(post.date)}
        </p>
      </div>
    </article>
  )
}

/* One post, one card. The whole card is the link — a card with a separate "read more" gives
   a reader two targets for one destination and makes them choose between identical doors. */
function Card({ post }) {
  return (
    <Link className="card" to={href(post)}>
      {post.hero && (
        <span className="card__fig">
          <img src={img(facePic(post))} alt="" loading="lazy" decoding="async" />
        </span>
      )}
      <span className="card__body">
        <span className="card__kicker">{kicker(post)}</span>
        <span className="card__title">{post.title}</span>
        <span className="card__stand">{post.standfirst}</span>
        <span className="card__meta">
          {post.place} · {yadinuDate(post.date)}
        </span>
      </span>
    </Link>
  )
}
