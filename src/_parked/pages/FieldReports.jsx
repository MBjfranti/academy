import { Link } from 'react-router-dom'
import { fieldReports } from '../data/fieldReports'
import { regionBySlug } from '../data/regions'
import { Eyebrow } from '../components/Apparatus'

export default function FieldReports() {
  return (
    <>
      <div className="page-head">
        <div className="shell">
          <div className="rule-short" />
          <Eyebrow>Field Reports</Eyebrow>
          <h1>What we cooked, and what went wrong</h1>
          <p className="page-head__lede">
            Notes from the test kitchen. Failed bakes, split broths, fermentation logs, and the places where
            a published reconstruction had to be revised. A reconstruction that cannot show its own history
            of being wrong is not a reconstruction — it is a claim.
          </p>
        </div>
      </div>

      <div className="shell" style={{ paddingBlock: '2.5rem 5rem' }}>
        {fieldReports.map((report) => {
          const region = regionBySlug[report.region]
          return (
            <Link className="report" to={`/field-reports/${report.slug}`} key={report.slug}>
              <div className="report__stamp">
                {report.date}
                <br />
                {region?.name}
                <br />
                {report.place}
              </div>
              <div>
                <h3>{report.title}</h3>
                <p>{report.standfirst}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}
