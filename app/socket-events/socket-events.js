export default function(store) {

  socket.on('CREATE_COHORT', (cohortName, students, nextStudent, groups) => {
    store.dispatch({
      type: 'CREATE_COHORT',
      cohortName: cohortName,
      students: students,
      nextStudent: nextStudent, 
      groups: groups
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

  socket.on('CREATE_GROUPS', (cohortName, groups) => {
    store.dispatch({
      type: 'CREATE_GROUPS',
      name: cohortName, 
      groups: groups
    });
  });

  socket.on('SWITCH_COHORT', (cohortName, cohortData) => {
    if (cohortName === 'Please select a cohort'){
      cohortName = 'Select'
    } else if (cohortName === 'Create New Cohort'){
      cohortName = 'Create';
    }
    if (cohortData === null){
      store.dispatch({
        type: 'SWITCH_COHORT', 
        cohortName: cohortName,
      });
    } else {
      store.dispatch({
        type: 'SWITCH_COHORT', 
        cohortName: cohortData.id, 
        students: cohortData.students,
        nextStudent: cohortData.lastChosen, 
        groups: cohortData.groups
      });
    }
  });
};