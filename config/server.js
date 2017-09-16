const host = 'localhost';

function Server () { 
	switch(process.env.NODE_ENV) {
		default:
			return {
				'host' 		: host,
			};
	}
}

module.exports = new Server();  
