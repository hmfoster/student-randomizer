export const reducer = (state = {}, action) => {
  let newState;

  switch (action.type) {

    case 'CREATE_COHORT':
      return Object.assign({}, state, action.data);

    case 'DELETE_COHORT':
      console.log('old state', state)
      newState = Object.assign({}, state);
      console.log('new state', newState)
      delete newState[action.name];
      console.log('deleted', newState);
      return newState;

    case 'UPDATE_STUDENTS':
      newState =  Object.assign({}, state);
      newState[action.name].students = action.students;
      return newState;

    case 'PICK_STUDENT':
      return Object.assign({}, state, {
        nextStudent : action.student
      });

    case 'CREATE_GROUPS':
      return;
    default:
      return state;
  }
}

export default reducer;