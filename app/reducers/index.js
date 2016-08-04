import { combineReducers } from 'redux';
import students from './students.js';

const studentApp = combineReducers({ students });

export default studentApp;