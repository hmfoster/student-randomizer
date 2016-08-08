import { combineReducers } from 'redux';

const allCohorts = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case 'CREATE_COHORT':
      let newCohort = {};
      newCohort[action.name] = {
        students : action.students, 
        nextStudent : action.nextStudent,
        groups : action.groups
      };
      return Object.assign({}, state, newCohort);

    case 'DELETE_COHORT':
      newState = Object.assign({}, state);
      delete newState[action.name];
      return newState;

    case 'UPDATE_STUDENTS':
      return Object.assign({}, state, students(state[action.name], action));

    case 'NEXT_STUDENT':
      return Object.assign({}, state, students(state[action.name], action));

    case 'CREATE_GROUPS':
      return Object.assign({}, state, students(state[action.name], action));

    default:
      return state;
  }
}

const students = (state = {}, action) => {
  let newState;
  switch (action.type) {
    case 'UPDATE_STUDENTS':
      newState =  {};
      newState[action.name] = Object.assign({}, state, {
        students : action.students
      });
      return newState;
    
    case 'NEXT_STUDENT' :
      newState = {};
      newState[action.name] = Object.assign({}, state, {
        nextStudent : action.nextStudent
      });
      return newState;
    
    case 'CREATE_GROUPS':
      newState = {};
      newState[action.name] = Object.assign({}, state, {
        groups : action.groups
      });
    return newState;    
    default:
      return state;

  }
}

const currentCohort = (state = 'Fromonsters', action) => {
  switch (action.type){
    case 'SWITCH_COHORT':
      return action.cohortName;
    default:
      return state;
  }

}

export const app = combineReducers({
  allCohorts,
  currentCohort
});

export default app;