import { Routes, Route } from "react-router-dom"
import Login from "./Pages/Login/Login"
import RecipesPage from "./Pages/RecipesPage/RecipesPage"
import Layout from "./Components/Layout/Layout"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/comidas" element={<Layout />}>
        <Route index element={ <RecipesPage /> }/>
      </Route>
      <Route path="/drinks" element={<Layout />} >
        <Route index element={<RecipesPage />}/>
      </Route>
    </Routes>
  )
}

export default App
