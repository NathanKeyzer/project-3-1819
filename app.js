const express = require('express')
const app = express()
const path = require('path')
const port = 8888
const http = require('http').Server(app);
var io = require('socket.io')(http);

// app.use(express.static('public'))
app.set('view engine', 'ejs')
console.log(path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname,'public')))


app.get('/', function (req, res) {
  res.render('index.ejs')
})
// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.ejs');
// });

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('message:' + msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:8888');
});
