var express = require('express');
var router = express.Router();
var request = require('request');
var authentication = require('./../library/authentication');
var access = require('./../config/access');
var querystring = require('querystring');
var http = require('http');

router.post('/incident', function(req, res, next) {

  if (!req.body.title) {
    return res.status(400).json({message: 'please provide an incident title'});
  }
  if (!req.body.image) {
    return res.status(400).json({message: 'please provide incident details'});
  }

  //var token = authentication.decodeJWT(req);

  // Build the post string from an object
  var post_data = querystring.stringify({
    'incident': {
      'type': 'incident',
      'title': req.body.title,
      'service': {
        'id': 'PS337ZU',//token.pagerdutyid,
        'type': 'service_reference'
      },
      'body': {
        'type': 'incident_body',
        'details': req.body.image
      }
    }
  });

  // An object of options to indicate where to post to
  var post_options = {
      host: 'api.pagerduty.com',
      port: '80',
      path: '/incidents',
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/vnd.pagerduty+json;version=2",
        "From": "bjarnil10@ru.is", //token.email,
        "Authorization": "Token token=" + access.pagerdutyid
      }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();

  return res.status(203).json({message: 'successfully created incident'});
});
module.exports = router;
