import {Middleware, MiddlewareAPI, Dispatch} from 'redux';
import {v1 as uuidv1} from 'uuid';
import {State} from '../reducers';
import {db} from '../firebase';
import {Achievement} from '../reducers/achievements';
import {CHANGE_LOGIN_STATE, changeLoginState} from '../actions/user';

import {
  initAchievements,
  setAchievement,
  SUBMIT_NEW_ACHIEVEMENT,
  submitNewAchievement,
  SUBMIT_TOGGLE_ACHIEVED,
  submitToggleAchieved,
} from '../actions/achievements';

const toData = (achievement: Achievement) => {
  const {description, isAchieved, achievedAt, category} = achievement;
  return {
    description,
    isAchieved,
    achievedAt,
    category: category ? category.id : null,
  };
};

type Actions =
  | ReturnType<typeof changeLoginState>
  | ReturnType<typeof submitNewAchievement>
  | ReturnType<typeof submitToggleAchieved>;

const middleware: Middleware = (store: MiddlewareAPI<Dispatch, State>) => (
  next: Dispatch,
) => (action: Actions) => {
  const state = store.getState();
  const {user} = state;
  switch (action.type) {
    case CHANGE_LOGIN_STATE:
      const {uid} = action.payload;
      if (uid) {
        db.collection('user')
          .doc(uid)
          .collection('achievements')
          .get()
          .then(querySnapshot => {
            store.dispatch(
              initAchievements(
                querySnapshot.docs.map(doc => {
                  const {
                    description,
                    isAchieved,
                    achievedAt,
                    category,
                  } = doc.data();
                  return {
                    id: doc.id,
                    description,
                    isAchieved,
                    achievedAt,
                    category,
                  };
                }),
              ),
            );
          });
      }
      break;
    case SUBMIT_NEW_ACHIEVEMENT: {
      if (!user.isLogined) {
        break;
      }
      const {description, category} = action.payload;
      const docRef = db
        .collection('user')
        .doc(user.uid)
        .collection('achievements')
        .doc();
      const achievement: Achievement = {
        id: docRef.id,
        description,
        isAchieved: false,
        achievedAt: null,
        category,
      };
      docRef.set(toData(achievement));
      store.dispatch(setAchievement(achievement));
      return;
    }
    case SUBMIT_TOGGLE_ACHIEVED: {
      if (!user.isLogined) {
        break;
      }
      const {id} = action.payload;
      const {achievementsEntity} = state.achievements;
      const achievement = achievementsEntity[id];
      achievement.isAchieved = !achievement.isAchieved;
      if (achievement.isAchieved) {
        achievement.achievedAt = new Date();
      } else {
        achievement.achievedAt = null;
      }

      db.collection('user')
        .doc(user.uid)
        .collection('achievements')
        .doc(achievement.id)
        .set(toData(achievement));
      store.dispatch(setAchievement(achievement));
      return;
    }
  }
  return next(action);
};

export default middleware;
