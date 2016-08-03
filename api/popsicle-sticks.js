var r = require('rethinkdb');

var getStick = function(connection, cohortName, list){
  //pop off and return the last name from toPickFrom
  var chosen = list.pop();
  r.table('Cohorts').get(cohortName).update({
    'toPickFrom': list,
    lastChosen : chosen
  }).
  run(connection)
};

var shuffleNames = function(list){
  //shuffle array of names,
  for (var i = 0; i < list.length; i++) {
    var index = Math.floor(Math.random()*(list.length-i)+i);
    var temp = list[i];
    list[i] = list[index];
    list[index] = temp;
  };
  return list;
};
var pickName = function(connection, cohortName){
  //if toPickFrom is empty, create it from shuffleNames
  r.table('Cohorts').get(cohortName)('toPickFrom').run(connection).
  then(function(list){
    if(!list.length){
      r.table('Cohorts').get(cohortName)('students').run(connection).
      then(function(students){
        var shuffled = shuffleNames(Object.keys(students));
        getStick(connection, cohortName, shuffled);
      });
    } else {
      r.table('Cohorts').get(cohortName)('toPickFrom').run(connection).
      then(function(list){
        getStick(connection, cohortName, list)
      })
    }

  });


};

var skip = function(connection, cohortName){
  console.log('skip')
  r.table('Cohorts').get(cohortName)('toPickFrom').run(connection).
  then(function(list){
    r.table('Cohorts').get(cohortName)('lastChosen').run(connection).
    then(function(lastChosen){
      list.unshift(lastChosen);
      list = shuffleNames(list);
      r.table('Cohorts').get(cohortName).update({
        'toPickFrom': list,
        lastChosen : ''
      }).
      run(connection).
      then(function(){
        pickName(connection, cohortName);
      })

    })

  })
}

module.exports = {
  pickName : pickName,
  skip : skip
}