import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';

import './firebase';
import Dashboard from './pages/Dashboard';

render(
  <Provider store={store}>
    <Dashboard />
  </Provider>,
  document.getElementById('content'),
);
