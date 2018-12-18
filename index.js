var express = require('express');
var socket = require('socket.io');

var app = express();

var server = app.listen(3030, function() {
    console.log('Listening to requests on port 3030');
});

app.use(express.static('public'));

//Socket setup
var io = socket(server);

io.on('connection', function(socket) {
    console.log('make socket connection', socket.id);

    socket.on('chat', function(data) {
        io.emit('chat', data);
    });

    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data)
    });
});
