import {Category} from '../reducers/achievements';

export const SUBMIT_NEW_CATEGORY = 'SUBMIT_NEW_CATEGORY';
export const submitNewCategory = (name: string) => ({
  type: SUBMIT_NEW_CATEGORY as typeof SUBMIT_NEW_CATEGORY,
  payload: {name},
});

export const SET_CATEGORY = 'SET_CATEGORY';
export const setCategory = (category: Category) => ({
  type: SET_CATEGORY as typeof SET_CATEGORY,
  payload: {category},
});
