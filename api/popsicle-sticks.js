const r = require('rethinkdb');
const _ = require('lodash');
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
  //shuffle array of names
  let index, temp;
  for (var i = 0; i < list.length; i++) {
    index = Math.floor(Math.random()*(list.length-i)+i);
    temp = list[i];
    list[i] = list[index];
    list[index] = temp;
  };
  return list;
};

module.exports = {
  pickName : (connection, cohortName) => {
    const cohort = cohorts.get(cohortName)
    cohort('toPickFrom').run(connection).
    then(list => {
    //if toPickFrom is empty, create it from shuffleNames
      if(!list.length){
        cohort('students').run(connection).
        then(students => {
          cohort('lastChosen').run(connection).
          then(lastChosen => {
            let shuffled = shuffleNames(Object.keys(students));
            if (shuffled[shuffled.length-1] === lastChosen){
              shuffled.unshift(shuffled.pop());
            }
            getStick(connection, cohortName, shuffled);
          })
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
  }, 

  createGroups : (connection, cohortName, groupSize) => {
    cohorts.get(cohortName)('students').run(connection).
    then((students) => {
      students = Object.keys(students);
      let numStudents = students.length;
      const numGroups = Math.floor(numStudents/groupSize);
      let groups = (new Array(numGroups)).fill(null).map(group => {
        return [];
      });
      let currentGroup = 0;
      let shuffled = shuffleNames(students);
      while (numStudents > 0){
        while (currentGroup < numGroups && numStudents > 0){
          groups[currentGroup++].push(shuffled[--numStudents]);
        }
        currentGroup = 0;
      }
      cohorts.get(cohortName).update({
        groups : groups
      }).run(connection);
    });
  }
}