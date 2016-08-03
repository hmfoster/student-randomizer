// index.js

// Express
const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');

// Socket.io
const io = require('socket.io')(server);

// Rethinkdb
const r = require('rethinkdb');


const helpers = require('./helpers');
const popsicleSticks = require('./popsicle-sticks');

// Socket.io changefeed events
const changefeedSocketEvents = require('./socket-events.js');

app.use(express.static('app'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '../app/index.html'));
});

r.connect({ db: 'Popsicle_Sticks' })
.then(connection => {
    io.on('connection', socket => {

        // insert new cohort
        socket.on('new cohort', cohortName => {
            helpers.newCohort(connection, cohortName);
        });


        // add students
        socket.on('add students', (cohortName, students) => {
            helpers.addStudents(connection, cohortName, students);
        });

        socket.on('view students', cohortName => {
            helpers.viewStudents(connection, cohortName);
        });

        socket.on('delete student', (cohortName, student) => {
            helpers.deleteStudent(connection, cohortName, student);
        })

        socket.on('delete cohort', cohortName =>{
            helpers.deleteCohort(connection, cohortName);
        })

        socket.on('pick a student', cohortName => {
            popsicleSticks.pickName(connection, cohortName);
        })

        socket.on('skip', cohortName => {
            popsicleSticks.skip(connection, cohortName);
        })
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