import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import LoginForm from "./Components/LoginForm/LoginForm";

export type LoginForm = {
  email: string,
  password: string,
}

export type ReduxState = {
  loginReducer: {
    email: string,
    password: string
  }
}

export type Dispatch = ThunkDispatch<ReduxState, null, AnyAction>;