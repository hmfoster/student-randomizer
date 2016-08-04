
// students reducer
const students = (state = [], action) => {
    // return index of action's student within state
    const studentIndex = () => {
        return state.findIndex(thisStudent => {
            return thisStudent && thisStudent.id === action.student.id;
        });
    };

    switch(action.type) {
        case 'student:new':
            // append student at end if not already found in state
            return studentIndex() < 0 ? [...state, action.student] : state;

        case 'student:update':
            // Merge props to update student if matching id
            var index = studentIndex();
            if (index > -1) {
                var updatedstudent = Object.assign({}, state[index], action.student);
                return [...state.slice(0, index), updatedstudent, ...state.slice(index + 1)]
            }
            else {
                return state;
            }

        case 'student:delete':
            // remove matching student
            var index = studentIndex();
            if (index > -1) {
                return [...state.slice(0, index), ...state.slice(index + 1)];
            }
            else {
                return state;
            }

        default:
            return state;
    }
};

export default students;