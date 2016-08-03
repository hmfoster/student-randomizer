const r = require('rethinkdb');
const cohorts = r.table('Cohorts');

function getStick (connection, cohortName, list){
  //pop off and return the last name from toPickFrom
  const chosen = list.pop();
  cohorts.get(cohortName).update({
    'toPickFrom': list,
    lastChosen : chosen
  }).
  run(connection)
};

function shuffleNames (list){
  //shuffle array of names,
  for (var i = 0; i < list.length; i++) {
    var index = Math.floor(Math.random()*(list.length-i)+i);
    var temp = list[i];
    list[i] = list[index];
    list[index] = temp;
  };
  return list;
};

module.exports = {
  pickName : (connection, cohortName) => {
    const cohort = cohorts.get(cohortName)
    //if toPickFrom is empty, create it from shuffleNames
    cohort('toPickFrom').run(connection).
    then(list => {
      if(!list.length){
        cohort('students').run(connection).
        then(students => {
          var shuffled = shuffleNames(Object.keys(students));
          getStick(connection, cohortName, shuffled);
        });
      } else {
        cohort('toPickFrom').run(connection).
        then(list => {
          getStick(connection, cohortName, list)
        });
      }
    });
  },

  skip : (connection, cohortName) => {
    const cohort = cohorts.get(cohortName)
    cohort('toPickFrom').run(connection).
    then(list => {
      cohort('lastChosen').run(connection).
      then(lastChosen => {
        list.unshift(lastChosen);
        list = shuffleNames(list);
        cohort.update({
          'toPickFrom': list,
          lastChosen : ''
        }).
        run(connection).
        then(() => {
          module.exports.pickName(connection, cohortName);
        });
      });
    });
  }
}