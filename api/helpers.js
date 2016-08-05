// Rethinkdb
const r = require('rethinkdb');

module.exports = {
  newCohort : (connection, cohortName) => {
    r.table('Cohorts').
    insert({
      id: cohortName,
      students: {},
      toPickFrom: []
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
    var studentObj = {};
    students.forEach(student => {
        studentObj[student] = true;
    })
    r.table('Cohorts').get(cohortName).update({
        'students': r.row('students').merge(studentObj)
    }).
    run(connection);

  },

  viewStudents : (connection, cohortName) => {
    r.table('Cohorts').filter(r.row('id').eq(cohortName)).
    run(connection, (err, cursor) => {
      if (err) throw err;
      cursor.toArray((err, result) => {
        if (err) throw err;
        console.log('Students', result[0].students);
      });
    });
  },

  deleteStudent : (connection, cohortName, student) => {
    var obj = {};
    obj[student] = student;
    r.table('Cohorts').get(cohortName).
    replace(r.row.without({
        students: obj
    })).
    run(connection);
  },

  deleteCohort : (connection, cohortName) => {
    console.log('deleting cohort now');
    r.table('Cohorts').get(cohortName).delete().run(connection);
  },

}
