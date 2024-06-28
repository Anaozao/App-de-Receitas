import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import headerTitleReducer from "./headerTitleReducer";
import recipesReducer from "./recipesReducer";


const rootReducer = combineReducers({
  loginReducer,
  headerTitleReducer,
  recipesReducer,
})

export default rootReducer;