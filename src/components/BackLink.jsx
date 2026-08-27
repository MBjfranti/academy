import { Link } from 'react-router-dom'

/* A labelled route, not browser history. The old control said "Reports" or "All dishes"
 * and then called navigate(-1), so its visible promise and its real destination could
 * disagree. This link always goes where its label says. The browser's own Back command
 * remains available when a reader wants the exact previous view. */
export default function BackLink({ to, children }) {
  return (
    <Link className="backlink" to={to}>
      <span className="backlink__arrow" aria-hidden="true">
        ←
      </span>
      {children}
    </Link>
  )
}
