// Rethinkdb
const r = require('rethinkdb');

module.exports = {
  newCohort : (connection, cohortName) => {
    r.table('Cohorts').
    insert({
      id: cohortName,
      students: {},
      toPickFrom: [],
      lastChosen: ''
      }, {conflict: 'error'}).
    run(connection, (err, result) => {
      if (err){
          console.log(err);
      } else if (result.errors) {
          console.log(result.first_error);
      }
    });
  },
  addStudents : (connection, cohortName, students) => {
    students = students.split(/\n|,/).map(function(student){return student.trim()});
    var studentObj = {};
    students.forEach(student => {
        studentObj[student] = true;
    })
    r.table('Cohorts').get(cohortName).update({
        'students': r.row('students').merge(studentObj)
    }).
    run(connection);

  },

  deleteStudent : (connection, cohortName, student) => {
    r.table('Cohorts').get(cohortName).
    replace(r.row.without({
        students: student
    })).
    run(connection);
  },

  deleteCohort : (connection, cohortName) => {
    r.table('Cohorts').get(cohortName).delete().run(connection);
  },

  getCohortData : (socket, connection, cohortName) => {
    return r.table('Cohorts').get(cohortName).run(connection).then(result => {
      socket.emit('SWITCH_COHORT', cohortName, result);
    });
  }
}
