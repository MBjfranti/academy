import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Reports from './pages/Reports'
import Pantry from './pages/Pantry'
import Market from './pages/Market'
import Recipes from './pages/Recipes'
import Dish from './pages/Dish'
import Article from './pages/Article'
import NotFound from './pages/NotFound'
import Nutrition from './pages/Nutrition'
import Writers from './pages/Writers'
import Writer from './pages/Writer'

/* `/` is the front door: the latest report, and a rail carrying the day's recipe and two
   of the day's ingredients. The reports index moved to `/reports`, which is where the back
   link on every report already pointed and where it had been 404ing.

   The order still holds: someone arriving cold meets the writing first and the tools
   second. */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="reports" element={<Reports />} />
        <Route path="pantry" element={<Pantry />} />
        <Route path="market" element={<Market />} />
        <Route path="recipes" element={<Recipes />} />
        {/* Dishes and posts get URLs of their own. They were overlays, which meant they
            could not be linked to, opened in a new tab, or reached by the back button —
            and the recipe apparatus had nowhere to fit. */}
        <Route path="recipes/:slug" element={<Dish />} />
        <Route path="reports/:slug" element={<Article />} />
        <Route path="writers" element={<Writers />} />
        <Route path="writers/:id" element={<Writer />} />
        <Route path="nutrition" element={<Nutrition />} />
        {/* A real not-found, not a second copy of the home page. */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
