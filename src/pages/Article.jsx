import { useParams, Link } from 'react-router-dom'
import { reportBySlug } from '../data/fieldReports'
import PostBody from '../components/PostBody'
import BackLink from '../components/BackLink'
import Breadcrumbs from '../components/Breadcrumbs'
import '../components/reports.css'

/* ONE POST, AT ITS OWN URL.
   The front page used to open a post in an overlay, which meant it could not be linked to,
   could not be opened in a new tab, had no back button and never appeared in history. A
   piece of writing that cannot be sent to somebody is barely published. */
export default function Article() {
  const { slug } = useParams()
  const post = reportBySlug[slug]

  return (
    <div className="page">
      <div className="page__scroll">
        <div className="wrap">
          <div className="detailnav">
            <BackLink to="/reports">All reports</BackLink>
            <Breadcrumbs
              items={[{ to: '/', label: 'Home' }, { to: '/reports', label: 'Reports' }]}
              current={post?.title ?? 'Not found'}
            />
          </div>
          {post ? (
            <PostBody post={post} />
          ) : (
            <p className="missing">
              No such report. <Link to="/reports">See all reports</Link>.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
