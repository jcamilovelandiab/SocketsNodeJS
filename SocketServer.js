var express = require('express');

var app = express();
var server = app.listen(3000);
app.use(express.static('public'));

console.log('My socket server is running...');

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){
    console.log('New connection: '+socket.id);

    socket.on('mouse', mouseMsg);

    function mouseMsg(data){
        //send the received data to other clients/browsers.
        //This means that the data is not sent to the source browser.
        socket.broadcast.emit('mouse', data);
        //send the received data to everyone who's listening through this socket
        //io.sockets.emit('mouse', data);
        console.log(data);
    }

}