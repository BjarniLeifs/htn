var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	req.io.emit('welcome', { message: 'Welcome!'});
  res.json({users: [{name: 'Timmy'}]});
});


module.exports = router;
