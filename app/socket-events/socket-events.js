export default function(store) {

  socket.on('CREATE_COHORT', (cohortName, students, nextStudent) => {
    store.dispatch({
      type: 'CREATE_COHORT',
      name: cohortName,
      students: students,
      nextStudent: nextStudent
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

  socket.on('NEXT_STUDENT', (cohortName, student) => {
    store.dispatch({
      type: 'NEXT_STUDENT',
      name: cohortName,
      nextStudent: student
    });
  });
}