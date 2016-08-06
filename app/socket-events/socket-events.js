export default function(store) {
  socket.on('CREATE_COHORT', cohortName => {
    store.dispatch({
      type: 'CREATE_COHORT',
      name: cohortName
    });
  });

  socket.on('DELETE_COHORT', cohortName => {
    store.dispatch({
      type: 'DELETE_COHORT',
      name: cohortName
    });
  });

  socket.on('UPDATE_STUDENTS', (cohortName, students) => {
    store.dispatch({
      type: 'UPDATE_STUDENTS',
      name: cohortName,
      students: students
    });
  });

  socket.on('PICK_STUDENT', (student) => {
    store.dispatch({
      type: 'PICK_STUDENT',
      nextStudent: student
    });
  });

}