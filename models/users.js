const dbService = require('./../library/dbLibrary');
const stringBuilder = require('./../library/queryBuilder');
const users = require('./../DTO/users');
function DTO (data) {
    /* 
    * Populating array with object by calling data transfer object 
    * such as it is correctly sent to caller.
    */
    let object = [];
    for (var i = 0; i < data.length; i++)
      object.push(users.DTO(data[i].id, data[i].name, data[i].email, data[i].username));

    return object;

}


function User() {

  this.get = (callback) => {
    "use strict";
    let table  = 'users';
    let string = 'SELECT * FROM ' + table;

    dbService.queryString(string, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Getting All the users.',
              err     : err,
              data    : null,
              Message : 'Failed to get the users'
            });
        else 
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting All the users.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned all the users.'
            });
      }
    );
  };


  this.getUserByID = (id, callback) => {
    "use strict";
    let table  = 'users';
    let string = 'SELECT * FROM '+ table + ' WHERE id = $1';
    let value  = [id]

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Getting users by id.',
              err     : err,
              data    : null,
              Message : 'Failed to get the users by id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting the users by type id.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned users by type id.'
            });
      }
    );  
  };



  this.delete = (id, callback) => {
    "use strict";
    let table  = 'users';
    let string = 'DELETE FROM '+ table + ' WHERE id = $1';
    let value  = [id];   
    
    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Delete users.',
              err     : err,
              data    : null,
              Message : 'Failed to delete users.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Delete users.',
              err     : err,
              data    : DTO(result),
              Message : 'Deleted users successfully.'
            });
      }
    );
  };

  /* This function is only thought to be used by the system itself! This gives out hash 
   * and all information stored in the database, so do not open this to other purpose 
   */
  this.getFullInfoById = (id, callback) => {
    "use strict";
    let table  = 'Users';
    let string = 'SELECT * FROM '+ table + ' WHERE id = $1';
    let value  = [id];

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Get full user info by id.',
              err     : err,
              data    : null,
              Message : 'Failed to get full users info by id.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Get full user info.',
              err     : err,
              data    : DTO(result),
              Message : 'Got full user info successfully by id.'
            });
      }
    );
  };
  /* This function is only thought to be used by the system itself! This gives out hash 
   * and all information stored in the database, so do not open this to other purpose 
   */
  this.getFullInfoByUsername = (username, callback) => {
    "use strict";
    let table  = 'Users';
    let string = 'SELECT * FROM '+ table + ' WHERE UPPER(username) = UPPER($1)';
    let value  = [username];

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Get full user info by username.',
              err     : err,
              data    : null,
              Message : 'Failed to get full users info by username.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Get full user info by username.',
              err     : err,
              data    : DTO(result),
              Message : 'Got full user info successfully by username.'
            });
      }
    );
  };  

  /* This function is only thought to be used by the system itself! This gives out hash 
   * and all information stored in the database, so do not open this to other purpose 
   */ 
  this.getFullInfoByEmail = (email, callback) => {
    "use strict";
    let table  = 'Users';
    let string = 'SELECT * FROM '+ table + ' WHERE UPPER(email) = UPPER($1)';
    let value  = [email];

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Get full user info by email.',
              err     : err,
              data    : null,
              Message : 'Failed to get full users info by email.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Get full user info by email.',
              err     : err,
              data    : DTO(result),
              Message : 'Got full user info successfully by email.'
            });
      }
    );
  };     
    this.getAuthenticationByUsername = (username, callback) => {
    "use strict";

    let table  = 'Users';
    let string = 'SELECT * FROM '+ table + ' WHERE UPPER(username) = UPPER($1)';
    let value  = [username];

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Get full user info by username.',
              err     : err,
              data    : null,
              Message : 'Failed to get full users info by username.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Get full user info by username.',
              err     : err,
              data    : result,
              Message : 'Got full user info successfully by username.'
            });
      }
    );
  };   
  
}
module.exports = new User();