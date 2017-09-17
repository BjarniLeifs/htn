module.exports = {
	DTO : (id, uid, img, sid, created) => { 
		return {
			ID 	   	  : id,
			UserId	  : uid,
			ImageURL  : img,
			ServiceId : sid,
			CreatedOn : created,
		};
	}
};

  
  