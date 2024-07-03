import { fetchByCategory, fetchByFirstLetter, fetchByIngredient, fetchByName } from "../../Utils/API"
import { Recipe } from "../../Utils/functions";
import { Dispatch, DrinkType, MealType } from "../../types"

export const LOGIN_ACTION = 'LOGIN_ACTION';
export const HEADER_TITLE = 'HEADER_TITLE';
export const SET_RECIPES = 'SET_RECIPES';
export const SET_LOADING = 'SET_LOADING';
export const SET_URL = 'SET_URL';
export const SET_FAVORITES = 'SET_FAVORITES';


export const setLoginInfos = (payload: string) => {
  return {
    type: LOGIN_ACTION,
    payload,
  }
}


export const setTitle = (payload: string) => {
  return {
    type: HEADER_TITLE,
    payload,
  }
}

const setRecipes = (payload: MealType[] | DrinkType[]) => {
  return {
    type: SET_RECIPES,
    payload,
  }
}

const setLoading = (payload: boolean) => {
  return {
    type: SET_LOADING,
    payload,
  }
}

export const setUrl = (payload: string) => {
  return {
    type: SET_URL,
    payload,
  }
}

export const setFavorites = (payload: Recipe[]) => {
  return {
    type: SET_FAVORITES,
    payload,
  }
}

export const setRecipesByCategories = (param: string, cat: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(setRecipes([]))
    dispatch(setLoading(true));
    const response = await fetchByCategory(param, cat);
    const type = param === 'themealdb' ? 'meals' : 'drinks';
    dispatch(setRecipes(response[type]))
    dispatch(setLoading(false));
  }
}

export const setRecipesByName = (param: string, name: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(setRecipes([]))
    dispatch(setLoading(true));
    const response = await fetchByName(param, name);
    console.log(response)
    const type = param === 'themealdb' ? 'meals' : 'drinks'
    dispatch(setRecipes(response[type]))
    dispatch(setLoading(false));
  }
}

export const setRecipesByIngredient = (param: string, ingredient: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(setRecipes([]))
    dispatch(setLoading(true));
    const response = await fetchByIngredient(param, ingredient);
    const type = param === 'themealdb' ? 'meals' : 'drinks'
    dispatch(setRecipes(response[type]))
    dispatch(setLoading(false));
  }
}

export const setRecipesByLetter = (param: string, letter: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(setRecipes([]))
    dispatch(setLoading(true));
    const response = await fetchByFirstLetter(param, letter);
    const type = param === 'themealdb' ? 'meals' : 'drinks'
    dispatch(setRecipes(response[type]))
    dispatch(setLoading(false));
  }
}