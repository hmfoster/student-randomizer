import React from 'react';
import ReactDOM from 'react-dom';

import Sticks from './components/Sticks.jsx';

import { store } from './stores/stores.js';
import SocketListeners from './socket-events/socket-events.js';

SocketListeners(store);

const log = () => {
  console.log('Store', store.getState());
}

const render = () => {
  const current = store.getState().currentCohort;
  const allCohorts = Object.keys(store.getState().allCohorts);
  ReactDOM.render(
    <Sticks
      current={current.cohortName} 
      nextStudent={current.nextStudent}
      groups={current.groups}
      allCohorts={allCohorts}
    />, 
    document.getElementById('app')
  );
}

store.subscribe(log);
store.subscribe(render);

