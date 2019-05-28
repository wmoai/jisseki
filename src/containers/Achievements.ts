import {Dispatch, Action} from 'redux';
import {connect} from 'react-redux';
import {Achievement, Category} from '../reducers/achievements';
import {State} from '../reducers';

import Component from '../components/Achievements';
import {
  submitNewAchievement,
  submitToggleAchieved,
} from '../actions/achievements';
import {submitNewCategory} from '../actions/categories';

interface Dispatchers {
  onAddAchievement: (description: string, category?: Category) => void;
  toggleAchieved: (id: string) => void;
  addCategory: (name: string) => void;
}

export default connect(
  (state: State) => {
    const {achievedList, unachievedList, categorizedList} = state.achievements;
    return {
      achievedList,
      unachievedList,
      categorizedList,
    };
  },
  (dispatch: Dispatch<Action>) => {
    return {
      addAchievement: (description: string, category: Category) => {
        dispatch(submitNewAchievement(description, category));
      },
      toggleAchieved: (id: string) => {
        dispatch(submitToggleAchieved(id));
      },
      addCategory: (name: string) => {
        dispatch(submitNewCategory(name));
      },
    };
  },
)(Component);
