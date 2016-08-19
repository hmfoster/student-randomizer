export default function (store) {
  socket.on('CREATE_COHORT', (cohortName, students, nextStudent, groups) => {
    store.dispatch({
      type: 'CREATE_COHORT',
      cohortName,
      students,
      nextStudent,
      groups,
    });
  });

  socket.on('DELETE_COHORT', cohortName => {
    store.dispatch({
      type: 'DELETE_COHORT',
      cohortName,
    });
  });

  socket.on('UPDATE_STUDENTS', students => {
    store.dispatch({
      type: 'UPDATE_STUDENTS',
      students,
    });
  });

  socket.on('NEXT_STUDENT', nextStudent => {
    store.dispatch({
      type: 'NEXT_STUDENT',
      nextStudent,
    });
  });

  socket.on('CREATE_GROUPS', groups => {
    store.dispatch({
      type: 'CREATE_GROUPS',
      groups,
    });
  });

  socket.on('SWITCH_COHORT', (name, cohortData) => {
    let cohortName = name;
    if (cohortName === 'Please select a cohort') {
      cohortName = 'Select';
    } else if (cohortName === 'Create New Cohort') {
      cohortName = 'Create';
    }
    if (cohortData === null) {
      store.dispatch({
        type: 'SWITCH_COHORT',
        cohortName,
      });
    } else {
      store.dispatch({
        type: 'SWITCH_COHORT',
        cohortName: cohortData.id,
        students: cohortData.students,
        nextStudent: cohortData.lastChosen,
        groups: cohortData.groups,
      });
    }
  });
}
