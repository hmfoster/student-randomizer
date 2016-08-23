import React from 'react';
import ReactDOM from 'react-dom';
import PopsicleStickApp from './components/PopsicleStickApp.jsx';
import store from './stores/stores.js';
import SocketListeners from './socket-events/socket-events.js';

SocketListeners(store);
const log = () => {
  console.log('Store', store.getState());
};
ReactDOM.render(
  <PopsicleStickApp />,
  document.getElementById('app')
);

store.subscribe(log);
