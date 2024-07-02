import useLoacalStorage from "../Hooks/useLoacalStorage";
import { DrinkType, MealType, RecType } from "../types";
import { fetchByName } from "./API";


  type Id = string;
  type SetIsFav = React.Dispatch<React.SetStateAction<boolean>>;
  export type Recipe = {
    title: string | undefined;
    image: string | undefined;
    category: string;
    description: string | undefined;
    video: string | undefined;
    id: string | undefined;
    type: string;
    area: string;
    tags: string;
    doneDate?: string;
  }

export const newRecipe = (recipe: DrinkType | MealType, doneDate?: string) => {
  return {
    title: recipe?.strMeal || recipe?.strDrink,
    image: recipe?.strMealThumb || recipe?.strDrinkThumb,
    category: recipe?.strCategory || '',
    description: recipe?.strInstructions,
    video: recipe?.strYoutube ? `https://www.youtube.com/embed/${recipe?.strYoutube.split('=')[1]}` : undefined,
    id: recipe?.idDrink || recipe?.idMeal,
    type: recipe.idDrink ? 'drink' : 'comida',
    tags: recipe?.strTags || '',
    area: recipe?.strArea || '',
    doneDate,
  }
}  

export const handleFavorite = (id: Id, setIsFav: SetIsFav, recipe: Recipe ) => {
  const { getItem, setItem } = useLoacalStorage()
  const favorites: DrinkType[] | MealType[] = getItem('favorites')
  const isFavorite = favorites.find((fav) => fav.id === id);
  
  
  if (isFavorite) {
    setIsFav(false)
    const newFavs = favorites
      .filter((fav) => fav.id !== id)
    setItem('favorites', newFavs )
    return;
  }
  setIsFav(true)
  const item = recipe;
  setItem('favorites', [...favorites, item ])
}

export const getRecs = async (pathname: string, setRecomendations: React.Dispatch<React.SetStateAction<RecType[]>>) => {
  const param = pathname.includes('comidas') ? 'thecocktaildb' : 'themealdb';
  const type = pathname.includes('comidas') ? 'drinks' : 'meals';
  const response = await fetchByName(param, '')
  
  const recs = response[type].slice(0, 6)
  const newRecs = recs.map((rec: MealType | DrinkType) => (
    {
      title: rec.strMeal || rec.strDrink,
      image: rec.strMealThumb || rec.strDrinkThumb,
      id: rec.idMeal || rec.idDrink,
    }
  ))
  
  setRecomendations(newRecs)
}

export const handleShare = async (pathname: string, setCopyMessage: React.Dispatch<React.SetStateAction<string>>) => {
  navigator.clipboard.writeText(`${pathname}`)
  setCopyMessage('Link copiado')
  setTimeout(() => {
    setCopyMessage('')
  }, 3000)
}

export const setIsFavorite = (id: string, setIsFav: SetIsFav) => {
  const { getItem } = useLoacalStorage();
  const favorites: DrinkType[] | MealType[] = getItem('favorites');
  const isFavorite = favorites.find((fav) => fav.id === id);
  if (isFavorite) {
    setIsFav(true)
    return;
  }
  setIsFav(false)
}