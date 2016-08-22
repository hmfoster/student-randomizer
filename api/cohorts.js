const r = require('rethinkdb');

module.exports = {
  newCohort: (socket, connection, cohortName) => {
    return r.table('Cohorts')
    .insert({
      id: cohortName,
      students: {},
      toPickFrom: [],
      lastChosen: '',
      groups: [],
    }, { conflict: 'error' })
    .run(connection, (err, result) => {
      if (err) {
        throw err;
      } else if (result.errors) {
        throw result.first_error;
      }
      module.exports.getCohortData(socket, connection, cohortName);
    });
  },
  addStudents: (connection, cohortName, studentsList) => {
    const students = studentsList.split(/\n|,/).map(student => student.trim());
    const studentObj = {};
    students.forEach(student => {
      studentObj[student] = true;
    });
    return r.table('Cohorts').get(cohortName).update({
      students: r.row('students').merge(studentObj),
    })
    .run(connection);
  },

  deleteStudent: (connection, cohortName, student) =>
    r.table('Cohorts').get(cohortName)
    .replace(r.row.without({
      students: student,
    }))
    .run(connection),

  deleteCohort: (socket, connection, cohortName) =>
    r.table('Cohorts').get(cohortName).delete().run(connection, () => {
      module.exports.getCohortData(socket, connection, '');
    }),

  getCohortData: (socket, connection, cohortName) =>
    r.table('Cohorts').get(cohortName).run(connection).then(result => {
      socket.emit('SWITCH_COHORT', cohortName, result);
    }),
};
