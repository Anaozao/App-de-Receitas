import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setRecipesByName, setTitle, setUrl } from "../../Redux/Actions";
import { Dispatch, DrinkType, MealType, ReduxState } from "../../types";
import RecipeCard from "../../Components/RecipeCard/RecipeCard";
import styles from './RecipesPage.module.css';
import ReactLoading from "react-loading";

function RecipesPage() {
  const { pathname } = useLocation();
  const dispatch: Dispatch = useDispatch();
  const { recipes, loading } = useSelector((state: ReduxState) => state.recipesReducer)

  useEffect(() => {
    dispatch(setUrl(pathname))
    if (pathname === '/comidas') {
      dispatch(setTitle('Comidas'))
      dispatch(setRecipesByName('themealdb', ''))
    } else {
      dispatch(setTitle('Drinks'))
      dispatch(setRecipesByName('thecocktaildb', ''))
    }
  }, [pathname])


  return (
    <section className={styles.recipesPage}>
      {loading &&  <ReactLoading type={"spinningBubbles"} color={'black'} height={200} width={200} />}
      {!recipes && <p>Nenhuma receita encontrada!</p>}
      {pathname === '/comidas' && (
        recipes && (recipes as MealType[]).map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            thumbnail={recipe.strMealThumb}
            title={recipe.strMeal}
            id={recipe.idMeal}
          />
        ))
      )}
      {pathname === '/drinks' && (
        recipes && (recipes as DrinkType[]).map((recipe) => (
          <RecipeCard
            key={recipe.idDrink}
            thumbnail={recipe.strDrinkThumb}
            title={recipe.strDrink}
            id={recipe.idDrink}
          />
        ))
      )}
    </section>
  )
}

export default RecipesPage;