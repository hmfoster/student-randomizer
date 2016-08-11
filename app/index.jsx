import React from 'react';
import ReactDOM from 'react-dom';

import Sticks from './components/Sticks.jsx';
import CohortSelector from './components/CohortSelector.jsx';
import CurrentCohort from './components/CurrentCohort.jsx';
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
  console.log('CURRENT',current);
  ReactDOM.render(
    <div>
      <CohortSelector allCohorts={allCohorts} currentName={current.cohortName}/>, 
      <CurrentCohort current={current}/>
    </div>,
    document.getElementById('app')
  );
}

store.subscribe(log);
store.subscribe(render);

