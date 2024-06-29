import { AnyAction } from "redux"
import { SET_LOADING, SET_RECIPES } from "../Actions"

const INITIAL_STATE = {
  recipes: [],
  loading: false
}

const recipesReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case SET_RECIPES:
      return {
        ...state,
        recipes: action.payload
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }  
    default:
      return state;  
  }
}

export default recipesReducer;