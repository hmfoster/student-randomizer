import { combineReducers } from 'redux';


const allCohorts = (state = {}, action) => {
  let newState;
  switch (action.type) {

    case 'CREATE_COHORT':
      newState = {};
      newState[action.cohortName] = true;
      return Object.assign({}, state, newState);

    case 'DELETE_COHORT':
      newState = Object.assign({}, state);
      delete newState[action.cohortName];
      return newState;

    default:
      return state;
  }
};

const currentCohort = (state = {}, action) => {
  switch (action.type) {
    case 'SWITCH_COHORT':
      return Object.assign({}, state, {
        cohortName: action.cohortName,
        students: action.students,
        nextStudent: action.nextStudent,
        groups: action.groups,
      });

    case 'UPDATE_STUDENTS':
      return Object.assign({}, state, { students: action.students });

    case 'NEXT_STUDENT':
      return Object.assign({}, state, { nextStudent: action.nextStudent });

    case 'CREATE_GROUPS':
      return Object.assign({}, state, { groups: action.groups });

    default:
      return state;
  }
};

export const app = combineReducers({
  allCohorts,
  currentCohort,
});

export default app;
