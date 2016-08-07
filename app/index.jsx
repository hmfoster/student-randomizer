import React from 'react';
import ReactDOM from 'react-dom';

import Cohorts from './components/Cohorts.jsx';

import { store } from './stores/stores.js';
import SocketListeners from './socket-events/socket-events.js';

SocketListeners(store);

const log = () => {
  console.log('Store', store.getState());
}

store.subscribe(log);

ReactDOM.render(<Cohorts />, document.getElementById('app'));
