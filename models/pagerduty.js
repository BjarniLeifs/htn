const dbService = require('./../library/dbLibrary');
const notification = require('./../DTO/notification');
function DTO (data) {
    /* 		
    * Populating array with object by calling data transfer object 
    * such as it is correctly sent to caller.
    */
    let object = [];
    for (var i = 0; i < data.length; i++)
      object.push(notification.DTO(data[i].id, data[i].userid, data[i].imageurl, data[i].serviceid, data[i].createdon));

    return object;

}


function Notifications() {

  this.get = (callback) => {
    "use strict";
    let table  = 'Notifications';
    let string = 'SELECT * FROM ' + table;

    dbService.queryString(string, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 400,
              Type    : 'Getting All the notification.',
              err     : err,
              data    : null,
              Message : 'Failed to get the notification'
            });
        else 
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting All the notification.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned all the notification.'
            });
      }
    );
  };


  this.getNotificationByID = (id, callback) => {
    "use strict";
    let table  = 'Notifications';
    let string = 'SELECT * FROM '+ table + ' WHERE id = $1';
    let value  = [id];

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Getting notification by id.',
              err     : err,
              data    : null,
              Message : 'Failed to get the notification by id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting the notification by type id.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned notification by type id.'
            });
      }
    );  
  };

   this.getNotificationByUserID = (id, callback) => {
    "use strict";
    let table  = 'Notifications';
    let string = 'SELECT * FROM '+ table + ' WHERE userid = $1';
    let value  = [id];

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 404,
              Type    : 'Getting notification by user id.',
              err     : err,
              data    : null,
              Message : 'Failed to get the notification by users  id'
            }); 
        else
          callback(err, 
            { 
              valid   : true,
              status  : 200,
              Type    : 'Getting notification by user id.',
              err     : err,
              data    : DTO(result),
              Message : 'Returned notification by users id.'
            });
      }
    );  
  };

  this.create = (data, callback) =>  {
    "use strict";
    let table  = 'Notifications';
    let string = 'INSERT INTO '+ table + '(UserId, ImageURL, ServiceId, CreatedOn) VALUES($1, $2, $3, $4)';
    let value = [data.UserId, data.ImageURL, data.ServiceId, data.CreatedOn];

    dbService.queryStringValue(string, value, 
      (err, result) => {
        if (err)
          callback(err, 
            { 
              valid   : false,
              status  : 412,
              Type    : 'Create new notification.',
              err     : err,
              data    : null,
              Message : 'Notifications creation failed.'
            });
        else
          callback(err,
            { 
              valid   : true,
              status  : 200,
              Type    : 'Create new notification.',
              err     : err,
              data    : DTO(result),
              Message : 'Notifications created successfully.'
            });
      }
    );  
  };
  
}
module.exports = new Notifications();