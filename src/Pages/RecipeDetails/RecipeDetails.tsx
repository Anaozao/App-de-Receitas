import { useLocation, useParams } from 'react-router-dom';
import styles from './RecipeDetails.module.css';
import { useEffect, useState } from 'react';
import { DrinkType, MealType } from '../../types';
import { fetchDetails } from '../../Utils/API';

function RecipeDetails() {
  const { pathname } = useLocation();
  const { id } = useParams()
  const [recipe, setRecipe] = useState<DrinkType | MealType>()

  useEffect(() => {
    const getRecipe = async () => {
      const param = pathname.includes('comidas') ? 'themealdb' : 'thecocktaildb';
      const type = pathname.includes('comidas') ? 'meals' : 'drinks';
      const response = await fetchDetails(param, id!)
      setRecipe(response[type]);
    }
    getRecipe()
  }, [pathname])

  return (
    <section>
      
    </section>
  )
}

export default RecipeDetails;