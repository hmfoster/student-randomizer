// index.js

// Express
const express = require('express');

const app = express();
const path = require('path');
const server = require('http').Server(app);

// Socket.io
const io = require('socket.io')(server);

// Rethinkdb
const r = require('rethinkdb');


const cohorts = require('./cohorts');
const popsicleSticks = require('./popsicle-sticks');

// Socket.io changefeed events
const changefeedSocketEvents = require('./socket-events');

app.use(express.static('app'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../app/index.html'));
});

r.connect({ db: 'Popsicle_Sticks' })
.then(connection => {
  io.on('connection', socket => {
    socket.on('CREATE_COHORT', cohortName => {
      cohorts.newCohort(socket, connection, cohortName);
    });

    socket.on('DELETE_COHORT', cohortName => {
      cohorts.deleteCohort(socket, connection, cohortName);
    });

    socket.on('ADD_STUDENTS', (cohortName, students) => {
      cohorts.addStudents(connection, cohortName, students);
    });

    socket.on('DELETE_STUDENT', (cohortName, student) => {
      cohorts.deleteStudent(connection, cohortName, student);
    });

    socket.on('PICK_STUDENT', cohortName => {
      popsicleSticks.pickName(connection, cohortName);
    });

    socket.on('SKIP_STUDENT', cohortName => {
      popsicleSticks.skip(connection, cohortName);
    });

    socket.on('CREATE_GROUPS', (cohortName, groupSize) => {
      popsicleSticks.createGroups(connection, cohortName, groupSize);
    });

    socket.on('SWITCH_COHORT', (cohortName) => {
      cohorts.getCohortData(socket, connection, cohortName);
    });

  // emit events for changes to cohort
    r.table('Cohorts').changes({ includeInitial: true, squash: true }).run(connection)
    .then(changefeedSocketEvents(socket, 'cohort'));
  });
  server.listen(9000, () => {
    console.log('listening on 9000');
  });
})
.error(error => {
  console.log('Error connecting to RethinkDB!');
  console.log(error);
});
