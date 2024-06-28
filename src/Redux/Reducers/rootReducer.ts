import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import generalReducer from "./generalReducer";
import recipesReducer from "./recipesReducer";


const rootReducer = combineReducers({
  loginReducer,
  generalReducer,
  recipesReducer,
})

export default rootReducer;