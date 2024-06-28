import { AnyAction } from "redux"
import { HEADER_TITLE, SET_URL } from "../Actions";

const INITIAL_STATE = {
  title: 'Comidas',
  url: '/comidas'
}

const generalReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case HEADER_TITLE:
      return {
        ...state,
        title: action.payload
      }
    case SET_URL:
      return {
        ...state,
        url: action.payload
      }
    default:
      return state;  
  }
}

export default generalReducer;