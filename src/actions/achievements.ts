import {Achievement, Category} from '../reducers/achievements';

export const INIT_ACHIEVEMENTS = 'INIT_ACHIEVEMENTS';
export const initAchievements = (achievements: Achievement[]) => ({
  type: INIT_ACHIEVEMENTS as typeof INIT_ACHIEVEMENTS,
  payload: {achievements},
});

export const SUBMIT_NEW_ACHIEVEMENT = 'SUBMIT_NEW_ACHIEVEMENT';
export const submitNewAchievement = (
  description: string,
  category: Category = null,
) => ({
  type: SUBMIT_NEW_ACHIEVEMENT as typeof SUBMIT_NEW_ACHIEVEMENT,
  payload: {description, category},
});

export const SUBMIT_TOGGLE_ACHIEVED = 'SUBMIT_TOGGLE_ACHIEVED';
export const submitToggleAchieved = (id: string) => ({
  type: SUBMIT_TOGGLE_ACHIEVED as typeof SUBMIT_TOGGLE_ACHIEVED,
  payload: {id},
});

export const SET_ACHIEVEMENT = 'SET_ACHIEVEMENT';
export const setAchievement = (achievement: Achievement) => ({
  type: SET_ACHIEVEMENT as typeof SET_ACHIEVEMENT,
  payload: {achievement},
});
