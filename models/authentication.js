/* Declare of bcrypt model, it is for salt and hasing information. Security model. */
const bcrypt = require('bcryptjs');

const dbService = require('./../library/dbLibrary');
const userSerivce = require('./users');
const authLibrary = require('./../library/authentication');
const stringBuilder = require('./../library/queryBuilder');
function Authentication() {
	"use strict";

	this.register = (req, callback) => {
		"use strict";
		bcrypt.genSalt(10, (err, salt) => {
		    bcrypt.hash(req.body.password, salt, (err, hash) => {
				let stringAdd = 'INSERT INTO users (username, name, email, hash)';
					stringAdd +='  VALUES($1, $2, $3, $4) returning *';
					// Defining values to insert 
				let value = [req.body.username, req.body.name, req.body.email, hash];
					// Calling postService to add values with string constrains 
				dbService.queryStringValue(stringAdd, value, 
					(err, results) => {
						if (err) 
							callback(err, {
								valid   : null,
								status  : null,
								data    : null,
								message : null
							});
						if (results)
							callback(err, {
								valid   : true,
								status  : 200,
								data	: null,
								message : 'User added succesfully.'
							});
						else 
							callback(err, {
								valid   : false,
								status  : 400,
								data    : null,
								message : "Error adding user."
							});
					
				});
	   		});
		});	
	};

	this.login = (req, callback) => {
		"use strict";
		let table = 'users';
		let string ='SELECT * FROM '+ table + ' WHERE UPPER(username) = UPPER($1)';
		/* Looking for the user and checking if he is registered */
		userSerivce.getAuthenticationByUsername(req.body.username,
			(err, result) => {
				
				if (err) 
					callback(err, {
						found   : null,
						valid   : null,
						status  : null,
						data    : null,
						message : null
					});

				/* If the result comes back not undefined the user was found */
				if (result.data.length > 0) {
					authLibrary.validPassword(req.body.password, result.data[0].hash, 
						(valid) => {
							if (valid) 
								callback(err, {
									found   : true,
									valid   : true,
									status  : 200,
									data	: result,
									message : 'Correct password.'
								});
							else 
								callback(err, {
									found   : true,
									valid   : false,
									status  : 422,
									data    : result,
									message : "Incorrect password."
								});

						});
					
				} else 
					callback(err, {
						found   : false,
						valid   : false,
						status  : 400,
						data    : null,
						message : "No such user."
					});
			}
		);
	};
	
}
module.exports = new Authentication();