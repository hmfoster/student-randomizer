import { createStore } from 'redux';
import students from '../reducers/cohorts.js';
export default createStore(students)