import { Link, useLocation, useNavigate } from 'react-router-dom'

/* BACK, meaning back to where you actually were.
 *
 * A detail page has two kinds of visitor and they want different things. Somebody who
 * clicked through from the filtered grid wants that filtered grid back, not a reset one —
 * `navigate(-1)` returns them to the exact query string they came from, which is why the
 * recipe filters were moved into the URL to meet it. Somebody who arrived on a shared link
 * has no history to go back to, and sending them to `history.back()` would throw them off
 * the site entirely, which is the bug that makes so many "back" buttons untrustworthy.
 *
 * (Scroll position is NOT restored: this site scrolls inside `.page__scroll` rather than
 * the window, and neither the browser nor the router restores an inner element's offset.
 * The filtered view comes back; the reader lands at the top of it.)
 *
 * React Router distinguishes the two for us: `location.key` is the string 'default' only
 * on the entry the app was loaded on. Anything else means we got here by navigating.
 *
 * IT IS A REAL ANCHOR either way. Rendering a <button> that calls navigate() would look
 * identical and quietly break middle-click, ctrl-click, right-click → open in new tab, the
 * status bar preview, and the screen-reader announcement that this is a link. So the
 * element is always a Link to a genuine destination, and the click handler only intercepts
 * the plain unmodified left click — the one case where "back" is better than "up".
 */
export default function BackLink({ to, children }) {
  const navigate = useNavigate()
  const { key } = useLocation()
  const arrivedByNavigating = key !== 'default'

  function onClick(e) {
    // Leave every modified click alone: those are deliberate new-tab/new-window gestures
    // and hijacking them is exactly what makes an in-app link feel broken.
    if (!arrivedByNavigating) return
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    navigate(-1)
  }

  return (
    <Link className="backlink" to={to} onClick={onClick}>
      <span className="backlink__arrow" aria-hidden="true">
        ←
      </span>
      {children}
    </Link>
  )
}
