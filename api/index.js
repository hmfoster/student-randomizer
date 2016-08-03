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
// var changefeedSocketEvents = require('./socket-events.js');

app.use(express.static('app'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname + '../app/index.html'));
});

r.connect({ db: 'Popsicle_Sticks' })
.then(function(connection) {
    io.on('connection', function (socket) {

        // insert new todos
        socket.on('new cohort', function(cohortName) {
            r.table('Cohorts').insert({name: cohortName}).run(connection);
        });

        // update todo
        socket.on('add students', function(cohortName, students) {
            r.table('Cohorts').filter(r.row('name').eq(cohortName)).
                                      update({students: students}).
                                      run(connection);
        });

        // delete todo
        socket.on('todo:client:delete', function(todo) {
            var id = todo.id;
            delete todo.id;
            r.table('Todo').get(id).delete().run(connection);
        });

        // emit events for changes to todos
        r.table('Cohorts').changes({ includeInitial: true, squash: true }).run(connection)
        .then(changefeedSocketEvents(socket, 'cohort'));
    });
    server.listen(9000);
})
.error(function(error) {
    console.log('Error connecting to RethinkDB!');
    console.log(error);
});