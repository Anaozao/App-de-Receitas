import { AnyAction } from "redux"
import { HEADER_TITLE } from "../Actions";

const INITIAL_STATE = {
  title: 'Comidas'
}

const headerTitleReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case HEADER_TITLE:
      return {
        ...state,
        title: action.payload
      }
    default:
      return state;  
  }
}

export default headerTitleReducer;