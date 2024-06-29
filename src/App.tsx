import { Routes, Route } from "react-router-dom"
import Login from "./Pages/Login/Login"
import RecipesPage from "./Pages/RecipesPage/RecipesPage"
import Layout from "./Components/Layout/Layout"
import RecipeDetails from "./Pages/RecipeDetails/RecipeDetails"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/comidas" element={<Layout />}>
        <Route index element={ <RecipesPage /> }/>
        <Route path="/comidas/:id" element={<RecipeDetails />}/>
      </Route>
      <Route path="/drinks" element={<Layout />} >
        <Route index element={<RecipesPage />}/>
        <Route path="/drinks/:id" element={<RecipeDetails />}/>
      </Route>
    </Routes>
  )
}

export default App
