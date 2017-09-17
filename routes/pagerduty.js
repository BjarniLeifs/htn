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
          'title': req.body.title,
          'service': {
            'id': 'PS337ZU', //token.pagerdutyid,
            'type': 'service_reference'
          },
          'body': {
            'type': 'incident_body',
            'details': req.body.image
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

router.post('/notification', function(req, res, next) {
  // req.body.id, req.body.type, req.body.created_on, req.body.data
  let token = jwttoken.decodeJWT(req);
  let insertObject = {
    UserId: token.userid,
    ImageURL: req.body.data.incident.body.details,
    ServiceId: req.body.data.incident.service.id,
    CreatedOn: req.body.data.incident.created_on
  };

  pagerdutyService.create(insertObject,
    (err, result) => {
      if (err)
        return res.status(result.status)
            .json({ message: result.message });
      else {
        req.io.emit('welcome', { message: 'Welcome!'});
        return res.status(result.status)
            .json( result.data );
      }
    });
  console.log(req.body);
});
  
module.exports = router;
