import { createStore } from 'redux';
import { app } from '../reducers/reducer.js';

export const store = createStore(app);

export default store;