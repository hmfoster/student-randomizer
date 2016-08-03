var socket = io();
socket.on('cohort:insert', function(cohortName, students){
  console.log(cohortName, students);
});
socket.on('cohort:delete', function(cohortName, students){
  console.log('deleted from', cohortName, students)
})
socket.emit('delete cohort', 'Fromonsters')
socket.emit('new cohort','Fromonsters');
socket.emit('add students', 'Fromonsters', ['April', 'Hailey']);
socket.emit('add students', 'Fromonsters', ['April', 'Carlos']);
socket.emit('delete student', 'Fromonsters', 'April');
socket.emit('view students', 'Fromonsters');