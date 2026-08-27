import { Link } from 'react-router-dom'
import { posts, reportImg, bcDate } from '../data/fieldReports'
import { byline } from '../data/authors'
import { recipeOfTheDay, ingredientsOfTheDay } from '../data/daily'
import { dishArt, aisleArt } from '../data/imagery'
import { AISLES } from '../data/market'
import hideBroken from '../components/hideBroken'
import '../components/reports.css'
import '../components/imagery.css'
import '../components/home.css'

/* THE FRONT DOOR.

   Until now `/` was the reports index, which meant the front page answered "what else have
   you written?" before it had answered "what is this?". The index is still the right page
   for browsing and it now lives at `/reports`, where the back link on a report has always
   pointed.

   THE SHAPE IS ONE PIECE OF WRITING AND TWO THINGS TO DO. The latest report takes the left
   and most of the width, because the writing is the product. The rail on the right carries
   the two things a reader can act on today: a dish to cook and a couple of items to put in
   a basket. Three panels, not a dashboard — a fourth would turn the rail into a list and
   the page into a portal.

   THE RAIL IS SECOND IN THE MARKUP so that a screen reader and a narrow viewport both get
   the article before the sidebar. Below 900px the grid collapses to one column and the rail
   falls underneath, which is the right order on a phone. */

const href = (post) => `/reports/${post.slug}`
const facePic = (post) => post.card ?? post.hero?.name

/* THE PLAQUE, NOT THE PLATE. `stapleArt` has a photograph-like square for twelve staples,
   which matched five of the 156 market items by name — so most ingredients would have shown
   up bare beside the few that did not. `aisleArt` is keyed by aisle instead, and every item
   has one, so every ingredient carries the carved stone plaque of its aisle. Full coverage,
   and it is the site's own visual language: the drawings are diagrams, the photographs are
   people. */
const aisleLabel = Object.fromEntries(AISLES.map((a) => [a.key, a.label]))

export default function Home() {
  const latest = posts[0]
  /* Three, not four: a fourth makes a second row at every width the rail is beside, and a
     row of one reads as a mistake. */
  const recent = posts.slice(1, 4)
  const recipe = recipeOfTheDay()
  const ingredients = ingredientsOfTheDay()

  return (
    <div className="page">
      <h1 className="sr-only">Barley &amp; Bronze</h1>
      <div className="page__scroll">
        <div className="wrap">
          <div className="home">
            <div className="home__main">
              {latest && <Latest post={latest} />}

              {recent.length > 0 && (
                <section className="more">
                  <h2 className="more__head">More reports</h2>
                  <ul className="cards cards--home">
                    {recent.map((p) => (
                      <li key={p.slug}><Card post={p} /></li>
                    ))}
                  </ul>
                  <p className="more__all">
                    <Link to="/reports">All {posts.length} reports</Link>
                  </p>
                </section>
              )}
            </div>

            <aside className="rail" aria-label="Today">
              {recipe && <RecipePanel recipe={recipe} />}
              <IngredientPanel items={ingredients} />
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

/* The lead borrows `reports.css` rather than restating it. The one difference from the
   index page is the footer link: on the front page the newest report needs a way through
   to everything else, and that way is not in the tab strip on a phone. */
function Latest({ post }) {
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
          {post.kind === 'letter' ? 'Introduction' : 'Field report'} <span>Latest</span>
        </p>
        <h2 className="lead__title">
          <Link className="lead__open" to={href(post)}>{post.title}</Link>
        </h2>
        <p className="lead__stand">{post.standfirst}</p>
        <p className="lead__excerpt">{post.body[0]}</p>
        <p className="lead__meta">
          <strong>{byline(post.author)}</strong> · {post.place} · {bcDate(post.date)}
        </p>
      </div>
    </article>
  )
}

function RecipePanel({ recipe }) {
  const art = dishArt[recipe.slug]
  return (
    <section className="panel">
      <h2 className="panel__head">Recipe of the day</h2>
      <Link className="panel__body" to={`/recipes/${recipe.slug}`}>
        {art && (
          <span className="panel__plate">
            <img className="panel__pic" src={art.card ?? art.thumb ?? art.src} alt=""
                 loading="lazy" decoding="async" onError={hideBroken} />
          </span>
        )}
        <span className="panel__name">{recipe.title}</span>
        {recipe.ancient && <span className="panel__anc">{recipe.ancient}</span>}
        <span className="panel__line">{recipe.summary}</span>
        <span className="panel__meta">
          <span className="tag">{recipe.category}</span>
          {recipe.serves} · {recipe.time}
        </span>
      </Link>
    </section>
  )
}

function IngredientPanel({ items }) {
  if (!items?.length) return null
  return (
    <section className="panel">
      <h2 className="panel__head">
        {items.length === 1 ? 'Ingredient of the day' : 'Two ingredients of the day'}
      </h2>
      <ul className="ings">
        {items.map((it) => {
          const art = aisleArt[it.aisle]
          return (
            <li className="ing" key={it.name}>
              <Link className="ing__link" to={`/market?aisle=${it.aisle}`}>
                <span className="ing__plaque" aria-hidden="true">
                  {art && (
                    <img className="cutout" src={art.src} alt="" width={art.w} height={art.h}
                         loading="lazy" decoding="async" onError={hideBroken} />
                  )}
                </span>
                <span className="ing__txt">
                  <span className="ing__aisle">{aisleLabel[it.aisle] ?? it.aisle}</span>
                  <span className="ing__name">{it.name}</span>
                  <span className="ing__note">{it.note}</span>
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

/* The same card the index uses, so a post looks the same wherever it is met. */
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
        <span className="card__kicker">
          {post.kind === 'letter' ? 'Introduction' : 'Field report'}
        </span>
        <span className="card__title">{post.title}</span>
        <span className="card__stand">{post.standfirst}</span>
        <span className="card__meta">
          <strong>{byline(post.author)}</strong> · {post.place} · {bcDate(post.date)}
        </span>
      </span>
    </Link>
  )
}
