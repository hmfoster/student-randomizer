import { createStore } from 'redux';
import { app } from '../reducers/reducer.js';

const store = createStore(app);

export default store;
