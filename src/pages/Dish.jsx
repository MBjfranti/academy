import { useParams, Link } from 'react-router-dom'
import { dishBySlug } from '../data/dishes'
import DishDetail from '../components/DishDetail'
import BackLink from '../components/BackLink'
import Breadcrumbs from '../components/Breadcrumbs'
import '../components/cards.css'
import '../components/imagery.css'
import '../components/dish.css'

/* ONE DISH, AT ITS OWN URL.
   Same reasoning as Article: a recipe you cannot link to is a recipe you cannot send to
   the person you are cooking with. The page also has room for the apparatus — the notes on
   what is attested, what is inferred and what is guesswork — which the overlay never did. */
export default function Dish() {
  const { slug } = useParams()
  const dish = dishBySlug[slug]

  return (
    <div className="page">
      <div className="page__scroll">
        <div className="wrap">
          <div className="detailnav">
            <BackLink to="/recipes">All recipes</BackLink>
            <Breadcrumbs
              items={[{ to: '/', label: 'Home' }, { to: '/recipes', label: 'Recipes' }]}
              current={dish?.name ?? 'Not found'}
            />
          </div>
          {dish ? (
            <DishDetail dish={dish} />
          ) : (
            <p className="missing">
              No such dish. <Link to="/recipes">Back to all dishes</Link>.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
