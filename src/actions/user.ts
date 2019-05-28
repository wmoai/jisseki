export const CHANGE_LOGIN_STATE = 'CHANGE_LOGIN_STATE';
export const changeLoginState = (uid: string) => ({
  type: CHANGE_LOGIN_STATE as typeof CHANGE_LOGIN_STATE,
  payload: {uid},
});
