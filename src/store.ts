import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers';

import achievementsMiddleware from './middlewares/achievements';
import categoriesMiddleware from './middlewares/categories';

export default createStore(
  reducer,
  applyMiddleware(achievementsMiddleware, categoriesMiddleware),
);
