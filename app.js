var express = require('express');
var app = express();
var http = require('http').Server(app);
const jwtCheck = require('express-jwt');
/* Sockets */
var io = require('socket.io')(http);

var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var access = require('./config/access');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
/* Sockets */
/* Who is what and where to connect. */
var connections = {};

io.on('connection', function(socket){

  console.log('a user connected');
});
/* injecting sockets to request = req. */
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/v1',jwtCheck({
  secret: access.secret,
  userProperty: access.payload
}));

/* routes  */
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/authentication'));
app.use('/api/v1/pagerduty', require('./routes/pagerduty'));


app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});


http.listen(8080, function(req, res){
    console.log('listening on port 8080');
  });
console.log('Server running at http://localhost:8080/');



