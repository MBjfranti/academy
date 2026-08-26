import { Link, useParams } from 'react-router-dom'
import { byId, byline } from '../data/authors'
import { fieldReports, img } from '../data/fieldReports'
import BackLink from '../components/BackLink'
import hideBroken from '../components/hideBroken'
import '../components/writers.css'

export default function Writer() {
  const { id } = useParams()
  const author = byId[id]

  if (!author) {
    return (
      <div className="page">
        <div className="page__scroll">
          <div className="wrap writers">
            <BackLink to="/writers">Writers</BackLink>
            <p className="missing">No such writer. <Link to="/writers">Meet the four writers</Link>.</p>
          </div>
        </div>
      </div>
    )
  }

  const articles = fieldReports
    .filter((report) => report.author === author.id)
    .sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="page">
      <div className="page__scroll">
        <div className="wrap writers">
          <BackLink to="/writers">Writers</BackLink>

          <article className="writer-profile">
            <figure className="writer-profile__portrait">
              <img
                src={img(author.face, false, author.id)}
                alt={`Portrait of ${byline(author.id)}`}
                onError={hideBroken}
              />
            </figure>

            <div className="writer-profile__copy">
              <p className="writers__kicker">{author.beat}</p>
              <h1>{byline(author.id)}</h1>
              <p className="writer-profile__trade">{author.trade}</p>
              <p className="writer-profile__line">{author.line}</p>
              {author.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

              <dl className="writer-profile__facts">
                <div><dt>Age</dt><dd>{author.age}</dd></div>
                <div><dt>Beat</dt><dd>{author.beat}</dd></div>
              </dl>

              <aside className="writer-profile__basis">
                <h2>Historical basis</h2>
                <p>{author.basis}</p>
              </aside>
            </div>
          </article>

          <section className="writer-work" aria-labelledby="writer-work-title">
            <h2 id="writer-work-title">Articles by {author.name}</h2>
            <ul>
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link to={`/reports/${article.slug}`}>
                    <span>{article.title}</span>
                    <small>{article.standfirst}</small>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
