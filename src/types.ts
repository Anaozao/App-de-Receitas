import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import LoginForm from "./Components/LoginForm/LoginForm";
import { Recipe } from "./Utils/functions";

export type LoginForm = {
  email: string,
  password: string,
}

export type ReduxState = {
  loginReducer: {
    email: string,
    password: string
  }
  generalReducer: {
    title: string
    url: string
  }
  recipesReducer: {
    recipes: MealType[] | DrinkType[]
    loading: boolean
    favorites: Recipe[]
  }
}

export type Dispatch = ThunkDispatch<ReduxState, null, AnyAction>;

export type MealType = {
  idMeal: string,
  strMeal: string,
  strMealAlternate: string,
  strTags: string,
  strVideo: string,
  strCategory: string,
  strIBA: string,
  strAlcoholic: string,
  strGlass: string,
  strInstructions: string,
  strInstructionsFR: string,
  strInstructionsIT: string,
  'strInstructionsZH-HANS': string,
  'strInstructionsZH-HANT': string,
  strMealThumb: string,
  strIngredient1: string,
  strIngredient2: string,
  strIngredient3: string,
  strIngredient4: string,
  strIngredient5: string,
  strIngredient6: string,
  strIngredient7: string,
  strIngredient8: string,
  strIngredient9: string,
  strIngredient10: string,
  strIngredient11: string,
  strIngredient12: string,
  strIngredient13: string,
  strIngredient14: string,
  strIngredient15: string,
  strIngredient16: string,
  strIngredient17: string,
  strIngredient18: string,
  strIngredient19: string,
  strIngredient20: string,
  strMeasure1: string,
  strMeasure2: string,
  strMeasure3: string,
  strMeasure4: string,
  strMeasure5: string,
  strMeasure6: string,
  strMeasure7: string,
  strMeasure8: string,
  strMeasure9: string,
  strMeasure10: string,
  strMeasure11: string,
  strMeasure12: string,
  strMeasure13: string,
  strMeasure14: string,
  strMeasure15: string,
  strMeasure16: string,
  strMeasure17: string,
  strMeasure18: string,
  strMeasure19: string,
  strMeasure20: string,
  strImageSource: string,
  strImageAttribution: string,
  strCreativeCommonsConfirmed: string,
  dateModified: string
  [key: string]: string
};

export type DrinkType = {
  idDrink: string,
  strDrink: string,
  strDrinkAlternate: string,
  strTags: string,
  strVideo: string,
  strCategory: string,
  strIBA: string,
  strAlcoholic: string,
  strGlass: string,
  strInstructions: string,
  strInstructionsFR: string,
  strInstructionsIT: string,
  'strInstructionsZH-HANS': string,
  'strInstructionsZH-HANT': string,
  strDrinkThumb: string,
  strIngredient1: string,
  strIngredient2: string,
  strIngredient3: string,
  strIngredient4: string,
  strIngredient5: string,
  strIngredient6: string,
  strIngredient7: string,
  strIngredient8: string,
  strIngredient9: string,
  strIngredient10: string,
  strIngredient11: string,
  strIngredient12: string,
  strIngredient13: string,
  strIngredient14: string,
  strIngredient15: string,
  strMeasure1: string,
  strMeasure2: string,
  strMeasure3: string,
  strMeasure4: string,
  strMeasure5: string,
  strMeasure6: string,
  strMeasure7: string,
  strMeasure8: string,
  strMeasure9: string,
  strMeasure10: string,
  strMeasure11: string,
  strMeasure12: string,
  strMeasure13: string,
  strMeasure14: string,
  strMeasure15: string,
  strImageSource: string,
  strImageAttribution: string,
  strCreativeCommonsConfirmed: string,
  dateModified: string
  [key: string]: string
};

export type RecType = {
  title: string,
  image: string,
  id: string
}