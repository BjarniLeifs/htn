module.exports = {
	DTO : (id, pid, name, email, username) => { 
		return {
			ID 			 : id,
			PagerdutyId  : pid,
			Name 		 : name,
			Email 		 : email,
			Username 	 : username,
		};
	}
};

