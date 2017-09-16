const secret_key = 'len12h. ov34e2r asdfe4qf23 haha6p _$st61241dy3f3f';
const payload  = 'payload';

function Access () { 
	switch(process.env.NODE_ENV) {
		default:
			return {
				'secret' 		: secret_key,
				'payload' 		: payload,
			};
	}
}

module.exports = new Access();  
