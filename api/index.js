// index.js

// Express
var express = require('express');
var app = express();
var server = require('http').Server(app);
var path = require('path');

// Socket.io
var io = require('socket.io')(server);

// Rethinkdb
var r = require('rethinkdb');

var helpers = require('./helpers');
var popsicleSticks = require('./popsicle-sticks');

// Socket.io changefeed events
var changefeedSocketEvents = require('./socket-events.js');

app.use(express.static('app'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '../app/index.html'));
});

r.connect({ db: 'Popsicle_Sticks' })
.then(function(connection) {
    io.on('connection', function (socket) {

        // insert new cohort
        socket.on('new cohort', function(cohortName) {
            helpers.newCohort(connection, cohortName);
        });


        // add students
        socket.on('add students', function(cohortName, students) {
            helpers.addStudents(connection, cohortName, students);
        });

        socket.on('view students', function(cohortName){
            helpers.viewStudents(connection, cohortName);
        });

        socket.on('delete student', function(cohortName, student){
            helpers.deleteStudent(connection, cohortName, student);
        })

        socket.on('delete cohort', function(cohortName){
            helpers.deleteCohort(connection, cohortName);
        })

        socket.on('pick a student', function(cohortName){
            popsicleSticks.pickName(connection, cohortName);
        })

        socket.on('skip', function(cohortName){
            popsicleSticks.skip(connection, cohortName);
        })
        // emit events for changes to cohort
        r.table('Cohorts').changes({ includeInitial: true, squash: true }).run(connection)
        .then(changefeedSocketEvents(socket, 'cohort'));
    });
    server.listen(9000, function(){
        console.log('listening on 9000');
    });
})
.error(function(error) {
    console.log('Error connecting to RethinkDB!');
    console.log(error);
});