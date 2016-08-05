export const reducer = (state = {}, action) => {
  switch (action.type) {

    case 'CREATE_COHORT':
      console.log('created ', action.name)
      const newState = state;
      newState[action.name] = {};
      return newState;

    case 'DELETE_COHORT':
      console.log('deleted ', action.name);
      return;

    case 'UPDATE_STUDENTS':
      console.log('updated students: ', action.students);
      return;

    case 'PICK_STUDENT':
      console.log('Next student: ', action.student);
      return;

    case 'SKIP_STUDENT':
      console.log('Skipped student. Next student: ', action.student);
      return;

    case 'CREATE_GROUPS':
      return;
    default:
      return state;
  }
}

export default reducer;