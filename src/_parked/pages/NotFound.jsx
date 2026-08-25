import { Link } from 'react-router-dom'
import { Eyebrow } from '../components/Apparatus'

export default function NotFound() {
  return (
    <div className="shell-narrow" style={{ paddingBlock: '6rem 8rem' }}>
      <div className="rule-short" />
      <Eyebrow tone="dim">Lacuna</Eyebrow>
      <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1.25rem' }}>
        The tablet breaks off here
      </h1>
      <p className="prose" style={{ color: 'var(--clay-2)' }}>
        Nothing is published at this address. This is, at least, the most authentic page on the site —
        most of the Bronze Age is a gap exactly like this one.
      </p>
      <p style={{ marginTop: '2rem' }}>
        <Link className="btn btn--ghost" to="/recipes">
          The collection
        </Link>
      </p>
    </div>
  )
}
