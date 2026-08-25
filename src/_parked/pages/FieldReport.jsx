import { Link, useParams } from 'react-router-dom'
import { reportBySlug } from '../data/fieldReports'
import { recipeBySlug } from '../data/recipes'
import { regionBySlug } from '../data/regions'
import { Eyebrow, Diamond, Grade } from '../components/Apparatus'
import NotFound from './NotFound'

export default function FieldReport() {
  const { slug } = useParams()
  const report = reportBySlug[slug]
  if (!report) return <NotFound />

  const region = regionBySlug[report.region]
  const recipe = report.recipe ? recipeBySlug[report.recipe] : null

  return (
    <div className="shell-narrow" style={{ paddingBlock: '3.5rem 5rem' }}>
      <div className="rule-short" />
      <Eyebrow>
        Field Report <Diamond /> {region?.name} <Diamond /> {report.place}
      </Eyebrow>

      <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1.25rem' }}>{report.title}</h1>

      <p className="recipe__meta">{report.date}</p>

      <div className="prose">
        <p style={{ fontSize: '1.18rem', color: 'var(--clay)' }}>{report.standfirst}</p>
        <hr className="hair" style={{ margin: '2rem 0' }} />
        {report.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {recipe && (
        <div className="rside__box" style={{ marginTop: '3rem' }}>
          <h4>The dish under test</h4>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.6rem' }}>
            <Link to={`/recipes/${recipe.slug}`} style={{ color: 'var(--clay)', textDecoration: 'none' }}>
              {recipe.title}
            </Link>
          </h3>
          <p className="card__meta" style={{ marginBottom: '1rem' }}>
            <span className="siglum">{recipe.siglum}</span>
            <Diamond />
            <Grade grade={recipe.grade} />
          </p>
          <Link className="btn btn--ghost" to={`/recipes/${recipe.slug}`}>
            Read the recipe
          </Link>
        </div>
      )}

      <p style={{ marginTop: '3rem' }}>
        <Link className="backlink" to="/field-reports">
          ← All field reports
        </Link>
      </p>
    </div>
  )
}
