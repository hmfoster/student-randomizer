export const reducer = (state = {}, action) => {
  let newState;

  switch (action.type) {

    case 'CREATE_COHORT':
      let newCohort = {};
      newCohort[action.name] = {
        students : action.students,
        nextStudent : action.nextStudent,
      };
      return Object.assign({}, state, newCohort);

    case 'DELETE_COHORT':
      newState = Object.assign({}, state);
      delete newState[action.name];
      return newState;

    case 'UPDATE_STUDENTS':
      newState =  Object.assign({}, state);
      newState[action.name].students = action.students;
      return newState;

    case 'NEXT_STUDENT':
      newState = Object.assign({}, state);
      newState[action.name].nextStudent = action.nextStudent;
      return newState;

    case 'CREATE_GROUPS':
      return;
    default:
      return state;
  }
}

export default reducer;