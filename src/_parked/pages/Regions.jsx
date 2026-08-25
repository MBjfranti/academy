import { Link } from 'react-router-dom'
import { coreRegions, admittedRegions } from '../data/regions'
import { recipes } from '../data/recipes'
import { names } from '../data/kitchen'
import { Eyebrow, Diamond } from '../components/Apparatus'

export default function Regions() {
  return (
    <>
      <div className="page-head">
        <div className="shell">
          <div className="rule-short" />
          <Eyebrow>Regions</Eyebrow>
          <h1>Five core regions, and three admitted on their own evidence</h1>
          <p className="page-head__lede">
            A region enters this Academy when it has an attested cooking tradition of its own and documented
            contact with the world the collection studies. Interest is not a qualification.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="shell">
          <div className="section__head">
            <Eyebrow tone="blue">The core</Eyebrow>
            <h2>The connected world</h2>
            <p>
              These five traded with each other, wrote to each other, fought each other and buried each
              other&rsquo;s goods. Cross-regional work between them is admissible under the Standard because
              the contact is in the ground.
            </p>
          </div>
          {coreRegions.map((region) => (
            <RegionBlock region={region} key={region.slug} />
          ))}
        </div>
      </section>

      <section className="section section--sunk">
        <div className="shell">
          <div className="section__head">
            <Eyebrow>Admitted</Eyebrow>
            <h2>Peripheries with a case of their own</h2>
            <p>
              Each of these is admitted on a specific piece of evidence — a grain, a burial, a bucket — and
              is taught in its own right rather than as an annexe to a larger neighbour. None of them is
              licensed to be blended with the core.
            </p>
          </div>
          {admittedRegions.map((region) => (
            <RegionBlock region={region} key={region.slug} />
          ))}
        </div>
      </section>
    </>
  )
}

function RegionBlock({ region }) {
  const dishes = recipes.filter((r) => r.region === region.slug)

  return (
    <article className="region" id={region.slug}>
      <div className="region__grid">
        <div>
          <span className={`standing standing--${region.standing}`}>{region.standing}</span>
          <h2 className="region__name" style={{ marginTop: '0.9rem' }}>
            {region.name}
          </h2>
          <p className="region__line">{region.line}</p>
          <p className="card__meta" style={{ marginTop: '1.1rem' }}>
            {region.span}
            <Diamond />
            {region.seat}
          </p>
        </div>

        <div>
          <p>{region.body}</p>

          <p className="rsub" style={{ marginTop: '1.5rem' }}>
            Evidence
          </p>
          <p style={{ color: 'var(--clay-2)', fontSize: '0.94rem' }}>{region.evidence}</p>

          <p className="rsub">The pantry</p>
          <div className="taglist">
            {region.pantry.map((item) => (
              <span className="tag" key={item}>
                {item}
              </span>
            ))}
          </div>

          <p className="rsub">Not available here</p>
          <div className="taglist">
            {region.absent.map((item) => (
              <span className="tag tag--absent" key={item}>
                {item}
              </span>
            ))}
          </div>

          {dishes.length > 0 && (
            <>
              <p className="rsub">In the collection</p>
              <ul className="index-list">
                {dishes.map((dish) => (
                  <li key={dish.slug}>
                    <Link to={`/recipes/${dish.slug}`}>
                      <span className="index-list__name">{names[dish.slug]?.common || dish.title}</span>
                      {dish.ancient && <span className="index-list__ancient">{dish.ancient}</span>}
                      <span className="index-list__siglum">{dish.siglum}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </article>
  )
}
