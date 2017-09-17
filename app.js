var express = require('express');
var app = express();
var http = require('http').Server(app);
/* Sockets */
var io = require('socket.io')(http);

var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/* Sockets */
var newIo = io.of('(/test');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
/* routes  */
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/auth', require('./routes/authentication'));
app.use('/api/v1/pagerduty', require('./routes/pagerduty'));

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

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});


http.listen(8080, function(req, res){
    console.log('listening on port 8080');
  });
console.log('Server running at http://localhost:8080/');



