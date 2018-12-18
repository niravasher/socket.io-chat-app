var express = require('express');
var socket = require('socket.io');

var app = express();

const port = process.env.PORT || 3030;

var server = app.listen(port, function() {
    console.log(`Listening to requests on port ${port}`);
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
