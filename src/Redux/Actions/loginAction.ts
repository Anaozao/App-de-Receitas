export const LOGIN_ACTION = 'LOGIN_ACTION'


export const setLoginInfos = (payload: string) => {
  return {
    type: LOGIN_ACTION,
    payload,
  }
}