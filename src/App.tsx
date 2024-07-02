import { Routes, Route } from "react-router-dom"
import Login from "./Pages/Login/Login"
import RecipesPage from "./Pages/RecipesPage/RecipesPage"
import Layout from "./Components/Layout/Layout"
import RecipeDetails from "./Pages/RecipeDetails/RecipeDetails"
import InProgress from "./Pages/InProgress/InProgress"
import DoneRecipes from "./Pages/DoneRecipes/DoneRecipes"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/comidas" element={<Layout />}>
        <Route index element={ <RecipesPage /> }/>
        <Route path="/comidas/:id" element={<RecipeDetails />}/>
        <Route path="/comidas/:id/em-progresso" element={<InProgress />}/>
      </Route>
      <Route path="/drinks" element={<Layout />} >
        <Route index element={<RecipesPage />}/>
        <Route path="/drinks/:id" element={<RecipeDetails />}/>
        <Route path="/drinks/:id/em-progresso" element={<InProgress />}/>
      </Route>
      <Route path="/receitas-finalizadas" element={<Layout />}>
        <Route index element={<DoneRecipes />}/>
      </Route>
    </Routes>
  )
}

export default App
