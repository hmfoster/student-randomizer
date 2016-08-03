// Rethinkdb
var r = require('rethinkdb');

module.exports = {
  newCohort : function(connection, cohortName){
    r.table('Cohorts').
    insert({
      id: cohortName,
      students: {},
      toPickFrom: []
      }, {conflict: 'error'}).
    run(connection, function(err, result){
      if (err){
          console.log(err);
      } else if (result.errors) {
          console.log(result.first_error);
      }
    });
  },
  addStudents : function(connection, cohortName, students){
    var studentObj = {};
    students.forEach(function(student){
        studentObj[student] = true;
    })
    r.table('Cohorts').get(cohortName).update({
        'students': r.row('students').merge(studentObj)
    }).
    run(connection);

  },

  viewStudents : function(connection, cohortName){
    r.table('Cohorts').filter(r.row('id').eq(cohortName)).
    run(connection, function(err, cursor) {
      if (err) throw err;
      cursor.toArray(function(err, result) {
        if (err) throw err;
        console.log('Students', result[0].students);
      });
    });
  },

  deleteStudent : function(connection, cohortName, student){
    var obj = {};
    obj[student] = true;
    r.table('Cohorts').get(cohortName).
    replace(r.row.without({
        students: obj
    })).
    run(connection);
  },

  deleteCohort : function(connection, cohortName){
    r.table('Cohorts').get(cohortName).delete().run(connection);
  },

}
