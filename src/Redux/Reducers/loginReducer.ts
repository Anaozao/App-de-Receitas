import { AnyAction } from "redux"
import { LOGIN_ACTION } from "../Actions"

const INITIAL_STATE = {
  email: '',
  password: ''
}

const loginReducer = (state = INITIAL_STATE, action: AnyAction) => {
  switch(action.type) {
    case LOGIN_ACTION:
    return {
      ...state,
      email: action.payload.email
    }
    default:
    return state
  }
}

export default loginReducer;