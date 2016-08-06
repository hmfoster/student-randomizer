import React from 'react';
import ReactDOM from 'react-dom';

import Cohorts from './components/Cohorts.jsx';

import { store } from './stores/stores.js';
import SocketListeners from './socket-events/socket-events.js';

SocketListeners(store);

socket.emit('CREATE_COHORT', 'Fromonsters');
console.log('here')

ReactDOM.render(<Cohorts />, document.getElementById('app'));
