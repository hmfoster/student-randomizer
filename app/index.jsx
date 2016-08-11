import React from 'react';
import ReactDOM from 'react-dom';

import Sticks from './components/Sticks.jsx';
import CohortSelector from './components/CohortSelector.jsx';

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
  } //else {
    ReactDOM.render(
      <div>
      <CohortSelector allCohorts={allCohorts} currentName={current.cohortName}/>, 
      <Sticks
        current={current.cohortName} 
        nextStudent={current.nextStudent}
        groups={current.groups}
        allCohorts={allCohorts}
      />
      </div>,
      document.getElementById('app')
    );
    
  //}
}

store.subscribe(log);
store.subscribe(render);

