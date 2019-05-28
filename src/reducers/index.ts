import {combineReducers} from 'redux';
import achievements, {State as AchievementsState} from './achievements';
import user, {State as UserState} from './user';

export interface State {
  achievements: AchievementsState;
  user: UserState;
}

export default combineReducers({achievements, user});
