var express = require('express');
var router = express.Router();
var request = require('request');
var authentication = require('./../library/authentication');
var access = require('./../config/access');
var http = require('http');
var pagerdutyService = require('./../models/pagerduty');


router.post('/incident', function(req, res, next) {

  if (!req.body.title) {
    return res.status(400).json({message: 'please provide an incident title'});
  }
  if (!req.body.image) {
    return res.status(400).json({message: 'please provide incident details'});
  }
  req.io.emit('notification', { title: req.body.title , image: req.body.image});
  // Set the headers
  var headers = {
    "Content-Type": "application/json",
    "Accept": "application/vnd.pagerduty+json;version=2",
    "From": "alan_ma@live.ca", //token.email,
    "Authorization": "Token token=CLe5DRsxz-1iHx8A8GLw"
  };
  
  // Configure the request
  var options = {
      url: 'https://api.pagerduty.com/incidents',
      method: 'POST',
      headers: headers,
      form: {
        'incident': {
          'type': 'incident',
          'title': req.body.title + " ||DELIMITER|| " + req.body.image,
          'service': {
            'id': 'PS337ZU', //token.pagerdutyid,
            'type': 'service_reference'
          }
        }
      }
  };
  
  // Start the request
  request(options, function (error, response, body) {
      if (!error) {
        // Print out the response body
        return res.status(203).json(body);
      } else {
        return res.status(400).json(error);
      }
  });
});


  
module.exports = router;
