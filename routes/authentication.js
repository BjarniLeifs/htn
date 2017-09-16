const express = require('express');
const router = express.Router();

const userSerivce = require('./../models/users');
const authService = require('./../models/authentication');
const authLibrary = require('./../library/authentication');


router.post('/register', (req, res, next) => {
	"use strict";
	if(!req.body.username)
		return res.status(401).json({
			message: 'Please provide username.'
		});
	else if (!req.body.password)
		return res.status(401).json({
			message: 'Please provide password'
		});
	else if (!req.body.confirmPassword)
		return res.status(401).json({
			message: 'Please confirmed confirmPassword'
		});
	else if (req.body.password != req.body.confirmPassword)
		return res.status(401).json({
			message: 'Passwords did not match, try again.'
		});
	else if (!req.body.name) 
		return res.status(401).json({
			message: 'Please provide a name.'
		});
	else if (!req.body.email)
		return res.status(401).json({
			message: 'Please provide an email.'
		});
	//Calling for that user if exist it prompt the result else insert into database. 
	userSerivce.getFullInfoByUsername(req.body.username, 
		(err, result) => {
			if (err) 
				return res.status(400)
						.json({ message: 'Error running query.' });
			if (result.data.length < 1) {
				authService.register(req, 
					(err, results) => {
						
						if(err)
							return res.status(400)
									.json({ message: 'Error running query.' });

						if (!results.valid)
							return res.status(400)
									.json({ message: 'Error adding user.' });
						else
							return res.status(200)
									.json({ message: 'User added succesfully.' });
				});
			} else {
				// User was found, returning to user for his knowladge
				return res.status(400).json({
					message: 'Username already exists.'
				});	
			}
		}
	);
});


router.post('/login', (req, res, next) => {
	"use strict";
	
	if (!req.body.username || !req.body.password)
		return res.status(400)
				.json({ message: 'Please provide username and password.' });
	
	authService.login(req, 
		(err, result) => {
			if (err)
				return res.status(400)
						.json({ message: 'Error running query.' });
			if (result.found) {
				if(result.valid)
					/* If callback true then generate token since everything is okay*/
					return res.status(200)
							.json( { token : authLibrary.generateJWT(result.data.data[0]) });
				else
				{
					console.log(result);
					return res.status(422)
							.json({ message: 'Incorrect password' });				
				}
			} else {
				return res.status(404).json({
					message: 'No such username'
				});	
			}
		}
	);
});


module.exports = router;