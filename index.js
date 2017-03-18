var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });

  socket.on('user is typing', function(){
    io.emit('user is typing');
    console.log('...');
  });

  socket.on('user is not typing', function(){
    io.emit('user is not typing');
    console.log('user is not typing');
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
