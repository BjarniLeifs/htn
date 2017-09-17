var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);

var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var users = require('./routes/users');
var authentication = require('./routes/authentication');
var newIo = io.of('(/test');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

app.use('/api/v1/users', users);
app.use('/api/v1/auth', authentication)

newIo.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(8080, function(req, res){
    console.log('listening on port 8080');
  });
console.log('Server running at http://localhost:8080/');



