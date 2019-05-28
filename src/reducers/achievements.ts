import {Action, Reducer} from 'redux';
import store from '../store';
import {
  INIT_ACHIEVEMENTS,
  initAchievements,
  SET_ACHIEVEMENT,
  setAchievement,
} from '../actions/achievements';
import {SET_CATEGORY, setCategory} from '../actions/categories';

export interface Achievement {
  id: string;
  description: string;
  isAchieved: boolean;
  achievedAt: Date;
  category: Category | null;
}

export interface Category {
  id: string;
  name: string;
}

export interface State {
  achievementsEntity: {[id: string]: Achievement};
  categoriesEntity: {[id: string]: Category};
  achievedList: Achievement[];
  unachievedList: Achievement[];
  categorizedList: {
    category?: Category;
    achievements: Achievement[];
  }[];
  initialization: {
    achievement: boolean;
    category: boolean;
  };
}

const initialState: State = {
  achievementsEntity: {},
  categoriesEntity: {},
  achievedList: [],
  unachievedList: [],
  categorizedList: [],
  initialization: {
    achievement: false,
    category: false,
  },
};

const isInitialized = (initialization: {
  achievement: boolean;
  category: boolean;
}): boolean => {
  return initialization.achievement && initialization.category;
};

const createLists = (
  achievementsEntity: {[id: string]: Achievement},
  categoriesEntity: {[id: string]: Category},
) => {
  const achievements = Object.values(achievementsEntity);
  const categories = Object.values(categoriesEntity);

  return {
    achievedList: achievements.filter(achievement => achievement.isAchieved),
    unachievedList: achievements.filter(achievement => !achievement.isAchieved),
    categorizedList: categories.map(category => ({
      category,
      achievements: achievements.filter(achievement => {
        return achievement.category && achievement.category.id === category.id;
      }),
    })),
  };
};

type Actions =
  | ReturnType<typeof initAchievements>
  | ReturnType<typeof setAchievement>
  | ReturnType<typeof setCategory>;

const reducer: Reducer<State, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case INIT_ACHIEVEMENTS: {
      const {achievements} = action.payload;
      const achievementsEntity: {[id: string]: Achievement} = {};
      achievements.forEach(achievement => {
        achievementsEntity[achievement.id] = achievement;
      });
      return {
        ...state,
        achievementsEntity,
        ...createLists(achievementsEntity, state.categoriesEntity),
      };
    }
    case SET_ACHIEVEMENT: {
      const {achievement} = action.payload;
      const newAchievementsEntity = {
        ...state.achievementsEntity,
        [achievement.id]: achievement,
      };
      return {
        ...state,
        achievementsEntity: newAchievementsEntity,
        ...createLists(newAchievementsEntity, state.categoriesEntity),
      };
    }
    case SET_CATEGORY: {
      const {category} = action.payload;
      const newCategoriesEntity = {
        ...state.categoriesEntity,
        [category.id]: category,
      };
      return {
        ...state,
        categoriesEntity: newCategoriesEntity,
        ...createLists(state.achievementsEntity, newCategoriesEntity),
      };
    }
    default:
      return state;
  }
};

export default reducer;
