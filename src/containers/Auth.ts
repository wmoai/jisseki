import {Dispatch, Action} from 'redux';
import {connect} from 'react-redux';
import {State} from '../reducers';

import Component from '../components/Auth';

export default connect((state: State) => {
  const {isLogined} = state.user;
  return {
    isLogined,
  };
})(Component);
