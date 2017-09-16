
/* Username for database */
const db_username = 'postgres';
const db_password = '1234';
const db_link     = 'postgres://';
const db_host     = 'localhost';
const db_port     = '5432';
const db_name     = 'htn';

function Database () { 
	switch(process.env.NODE_ENV) {
		default:
			return {
				'connectionUrl' : '' + db_link + db_username + ':' + db_password + '@' + db_host + ':' + db_port + '/' + db_name,
			};
	}
}

module.exports = new Database();  
