import {Action, Reducer} from 'redux';
import {CHANGE_LOGIN_STATE, changeLoginState} from '../actions/user';

export interface State {
  isLogined: boolean;
  uid?: string;
}

const initialState: State = {
  isLogined: false,
};

type Actions = ReturnType<typeof changeLoginState>;

const reducer: Reducer<State, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LOGIN_STATE:
      const {uid} = action.payload;
      return {
        ...state,
        isLogined: !!uid,
        uid,
      };
    default:
      return state;
  }
};

export default reducer;
