var app = require('express')();
var express = require('express')
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('chat message', function(message) {
    io.emit('chat message', message);
    console.log('message: ' + message);
  });

  socket.on('user is typing', function() {
    io.emit('user is typing');
    console.log('...');
  });

  socket.on('user is not typing', function() {
    io.emit('user is not typing');
    console.log('user is not typing');
  });
});

http.listen(port, function() {
  console.log('listening on *:' + port);
});
