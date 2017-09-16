const pg = require('pg');
/* Definging configuration of database config */
const database = require('./../config/database');
/* Defining connectionstring for the database */
const connectionStringMain = database.connectionUrl;
/* New way of connecting to pg. Since version 6.0.0 */

const pool = new pg.Pool({
	connectionString : connectionStringMain
});

module.exports = {
	/* Query to get all */
	queryString: (string, cb) => {
		"use strict";

		let results = [];	
		let i;
		pool.connect((err, client, done) => {
			if (err) {
				return cb(err, null);
			}

			/* SQL Query, select data */
			client.query(string,  (err, result) => {
				if (err) {
					return cb(err, null);
				} else {

					for (i = 0; i < result.rows.length; i++)
						results.push(result.rows[i]);

					return cb(err,results);
				}
				
			});

		});
	
	},
	/* Query to get all with an value */
	queryStringValue: (string, value, cb) => {
		"use strict";
		let results = [];	
		let i;
		pool.connect((err, client, done) => {
			if (err) {
				return cb(err, null);
			}

			/* SQL Query, select data */
			client.query(string, value, (err, result) => {
				if (err) {
					return cb(err, null);
				} else {

					for (i = 0; i < result.rows.length; i++)
						results.push(result.rows[i]);

					return cb(err,results);
				}
				
			});

		});
	}
// exports ends

}


