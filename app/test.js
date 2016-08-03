var socket = io();

socket.emit('delete cohort', 'Fromonsters')
socket.emit('new cohort','Fromonsters');
socket.emit('add students', 'Fromonsters', ['April', 'Hailey']);
socket.emit('add students', 'Fromonsters', ['April', 'Carlos']);
socket.emit('view students', 'Fromonsters');