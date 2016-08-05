export const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_COHORT':
      const newState = state;
      newState[action.name] = {};
      return newState;
    case 'DELETE_COHORT':
      return;
    case 'ADD_STUDENTS':
      return;
    case 'REMOVE_STUDENT':
      return;
    case 'PICK_STUDENT':
      return;
    case 'SKIP_STUDENT':
      return;
    case 'CREATE_GROUPS':
      return;
    default:
      return state;
  }
}

export default reducer;