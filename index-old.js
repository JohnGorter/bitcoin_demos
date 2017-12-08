var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var oldy = 25;


app.use(express.static(".")); 
var connected = false;
io.on('connection', function(socket){
    console.log('connected!');
    connected = true;
});

http.listen(8081, function(){
  console.log('listening on *:8081');
});
setInterval(() => {
    if (connected){
        var percent = Math.floor(Math.random() * 21) - 10;
        var newy = oldy + (oldy * percent / 100);
        oldy = newy;
        console.log('pushing data ', oldy, ' : ', new Date());
        io.emit('stockdata', {value:oldy});
    }
}, 1000); 