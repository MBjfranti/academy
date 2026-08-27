import { Link } from 'react-router-dom'
import { authors, byline } from '../data/authors'
import { img } from '../data/fieldReports'
import hideBroken from '../components/hideBroken'
import '../components/writers.css'

export default function Writers() {
  return (
    <div className="page">
      <div className="page__scroll">
        <div className="wrap writers">
          <header className="writers__head">
            <p className="writers__kicker">The bylines</p>
            <h1>Four writers, four parts of the Bronze Age</h1>
            <p>
              Each writer belongs to one region and one trade. Their work, food, places and
              constraints come from the record. Their lives belong to this site.
            </p>
          </header>

          <ul className="writer-grid">
            {authors.map((author) => (
              <li key={author.id}>
                <Link className="writer-card" to={`/writers/${author.id}`}>
                  <img
                    src={img(author.portrait, false, author.id)}
                    alt=""
                    loading="lazy"
                    onError={hideBroken}
                  />
                  <span className="writer-card__body">
                    <span className="writer-card__name">{byline(author.id)}</span>
                    <span className="writer-card__trade">{author.trade}</span>
                    <span className="writer-card__line">{author.line}</span>
                    <span className="writer-card__open">Profile and articles →</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
