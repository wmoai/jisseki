import {Middleware, MiddlewareAPI, Dispatch} from 'redux';
import {v1 as uuidv1} from 'uuid';
import {State} from '../reducers';
import {db} from '../firebase';
import {Category} from '../reducers/achievements';
import {
  SUBMIT_NEW_CATEGORY,
  submitNewCategory,
  setCategory,
} from '../actions/categories';

const toData = (category: Category) => {
  const {name} = category;
  return {name};
};

type Actions = ReturnType<typeof submitNewCategory>;

const middleware: Middleware = (store: MiddlewareAPI<Dispatch, State>) => (
  next: Dispatch,
) => (action: Actions) => {
  const state = store.getState();
  const {user} = state;
  if (!user.isLogined) {
    return next(action);
  }

  switch (action.type) {
    case SUBMIT_NEW_CATEGORY: {
      const {name} = action.payload;
      const docRef = db
        .collection('user')
        .doc(user.uid)
        .collection('categories')
        .doc();
      const category: Category = {
        id: docRef.id,
        name,
      };
      docRef.set(toData(category));
      store.dispatch(setCategory(category));
      break;
    }
  }
  return next(action);
};

export default middleware;
