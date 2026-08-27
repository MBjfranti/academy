import { Link } from 'react-router-dom'

export default function Breadcrumbs({ items, current }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item) => (
          <li key={item.to}>
            <Link to={item.to}>{item.label}</Link>
          </li>
        ))}
        <li aria-current="page">{current}</li>
      </ol>
    </nav>
  )
}
