import React from 'react';
import ReactDOM from 'react-dom';

import PopsicleStickApp from './components/PopsicleStickApp.js';

import { store } from './stores/stores.js';
import SocketListeners from './socket-events/socket-events.js';

SocketListeners(store);

const log = () => {
  console.log('Store', store.getState());
}

const render = () => {
  let current = store.getState().currentCohort;
  const allCohorts = Object.keys(store.getState().allCohorts);
  if (!current.cohortName){
    current = {
      cohortName: '',
      nextStudent: '',
      groups: []
    }
  }

  ReactDOM.render(
    <PopsicleStickApp current={current} allCohorts={allCohorts}/>,
    document.getElementById('app')
  );
}

store.subscribe(log);
store.subscribe(render);

