import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../stores/students.js';

import App from './app.jsx';

// Setup our socket events to dispatch
import CohortSocketListeners from '../socket-listeners/cohorts.js';
CohortSocketListeners(store);

// Needed for Material-UI
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Render our react app!
ReactDOM.render(<Provider store={store} ><App /></Provider>, document.getElementById('main'));
