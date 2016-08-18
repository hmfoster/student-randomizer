const r = require('rethinkdb');

const cohorts = r.table('Cohorts');

const getStick = (connection, cohortName, list) => {
  const chosen = list.pop();
  cohorts.get(cohortName).update({
    toPickFrom: list,
    lastChosen: chosen,
  })
  .run(connection);
};

const shuffleNames = list => {
  const newList = list.splice();
  let index;
  let temp;
  let i;
  for (i = 0; i < newList.length; i++) {
    index = Math.floor((Math.random() * (newList.length - i)) + i);
    temp = newList[i];
    newList[i] = newList[index];
    newList[index] = temp;
  }
  return newList;
};

module.exports = {
  pickName: (connection, cohortName) => {
    const cohort = cohorts.get(cohortName);
    cohort('toPickFrom').run(connection)
    .then(list => {
    // if toPickFrom is empty, create it from shuffleNames
      if (!list.length) {
        cohort('students').run(connection)
        .then(students => {
          cohort('lastChosen').run(connection)
          .then(lastChosen => {
            const shuffled = shuffleNames(Object.keys(students));
            if (shuffled[shuffled.length - 1] === lastChosen) {
              shuffled.unshift(shuffled.pop());
            }
            getStick(connection, cohortName, shuffled);
          });
        });
      } else {
        cohort('toPickFrom').run(connection)
        .then(list => {
          getStick(connection, cohortName, list);
        });
      }
    });
  },

  skip: (connection, cohortName) => {
    const cohort = cohorts.get(cohortName);
    cohort('toPickFrom').run(connection)
    .then(list => {
      cohort('lastChosen').run(connection)
      .then(lastChosen => {
        let newList = list.splice();
        newList.unshift(lastChosen);
        newList = shuffleNames(newList);
        cohort.update({
          toPickFrom: newList,
          lastChosen: '',
        })
        .run(connection)
        .then(() => {
          module.exports.pickName(connection, cohortName);
        });
      });
    });
  },

  createGroups: (connection, cohortName, groupSize) => {
    cohorts.get(cohortName)('students').run(connection)
    .then((students) => {
      const studentsArray = Object.keys(students);
      let numStudents = studentsArray.length;
      const numGroups = Math.floor(numStudents / groupSize);
      const groups = (new Array(numGroups)).fill(null).map(() => []);
      let currentGroup = 0;
      const shuffled = shuffleNames(studentsArray);
      while (numStudents > 0) {
        while (currentGroup < numGroups && numStudents > 0) {
          groups[currentGroup++].push(shuffled[--numStudents]);
        }
        currentGroup = 0;
      }
      cohorts.get(cohortName).update({
        groups,
      }).run(connection);
    });
  },
};
