import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

/* An unknown URL used to render the home page — same content, wrong address, no tab lit.
   That is worse than an error: a stale link, a typo or a crawler got an endless supply of
   duplicate front pages, and a reader who mistyped had no way of knowing they had. */
export default function NotFound() {
  const { pathname } = useLocation()
  return (
    <div className="page">
      <div className="page__scroll">
        <div className="wrap">
          <div className="notfound">
            <p className="notfound__kicker">Nothing here</p>
            <h1>There is no {pathname} on this site.</h1>
            <p className="notfound__line">
              Either it never existed or I have moved it, and I would not rule out the second.
              Everything on this site is reachable from one of these three:
            </p>
            <p className="notfound__doors">
              <Link to="/">The reports</Link>
              <Link to="/recipes">The dishes</Link>
              <Link to="/market">The market</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
