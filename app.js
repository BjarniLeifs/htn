var express = require('express');
var app = express();
var http = require('http').Server(app);
/* Sockets */
var io = require('socket.io')(http);

var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var users = require('./routes/users');
var authentication = require('./routes/authentication');
/* Sockets */
var newIo = io.of('(/test');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
/* routes  */
app.use('/api/v1/users', users);
app.use('/api/v1/auth', authentication)
/* Sockets */
/* Who is what and where to connect. */
var connections = {};
newIo.on('connection', function(socket){
	socket.on('username', function(username) {
		connections[username] = socket;
		console.log("before username");
		console.log(username);
		console.log("after username");
		console.log(socket);
		console.log("after socket");
	});
  console.log('a user connected');
});

http.listen(8080, function(req, res){
    console.log('listening on port 8080');
  });
console.log('Server running at http://localhost:8080/');



