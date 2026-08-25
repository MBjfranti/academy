import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Reports from './pages/Reports'
import Pantry from './pages/Pantry'
import Market from './pages/Market'
import Recipes from './pages/Recipes'
import Dish from './pages/Dish'
import Article from './pages/Article'
import NotFound from './pages/NotFound'
import Nutrition from './pages/Nutrition'

/* The home page is Yadinu's posts. The Pantry moved to /pantry to make room, which is
   the right way round: someone arriving cold should meet the writing first and the
   twelve-jar cupboard second. */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Reports />} />
        <Route path="pantry" element={<Pantry />} />
        <Route path="market" element={<Market />} />
        <Route path="recipes" element={<Recipes />} />
        {/* Dishes and posts get URLs of their own. They were overlays, which meant they
            could not be linked to, opened in a new tab, or reached by the back button —
            and the recipe apparatus had nowhere to fit. */}
        <Route path="recipes/:slug" element={<Dish />} />
        <Route path="reports/:slug" element={<Article />} />
        <Route path="nutrition" element={<Nutrition />} />
        {/* A real not-found, not a second copy of the home page. */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
