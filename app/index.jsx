import React from 'react';
import ReactDOM from 'react-dom';

import Cohorts from './components/Cohorts.jsx';

import { store } from './stores/stores.js';

const log = () => {
  console.log(store.getState());
}

store.subscribe(log);

store.dispatch({
  type: 'CREATE_COHORT',
  name: 'Fromonsters'
});

ReactDOM.render(<Cohorts />, document.getElementById('app'));
