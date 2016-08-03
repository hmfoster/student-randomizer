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
            r.table('Cohorts').
            insert({
                    id: cohortName, 
                    students: []
                    }, {conflict: 'error'}).
            run(connection, function(err, result){
                if (err){
                    console.log(err);
                } else if (result.errors) {
                    console.log(result.first_error);
                } else {
                    console.log(result);
                }
            });
        });


        // add students
        socket.on('add students', function(cohortName, students) {
            r.table('Cohorts').get(cohortName)('students').
                toArray(function(err, arr){
                    console.log(arr);
                })
            // r.table('Cohorts').get(cohortName).update({
            //     'students': r.row('students').toArray(function(err, arr){
            //         arr.filter(function(student){
            //             return students.indexOf(student) === -1;
            //         })
            //     })
            // }).add(students)
            // .run(connection);
        });

        socket.on('view students', function(cohortName){
            r.table('Cohorts').filter(r.row('id').eq(cohortName)).
                run(connection, function(err, cursor) {
                    if (err) throw err;
                    cursor.toArray(function(err, result) {
                        if (err) throw err;
                        console.log(result[0].students);
                    });
                });
        })

        socket.on('delete cohort', function(cohortName){
            r.table('Cohorts').get(cohortName).delete().run(connection);
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