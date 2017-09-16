
/* load the modern build */ 
let _ = require('lodash'); 
module.exports = {
  /* To check if person scopes (rights) */
  Scopes: (scopes) => {
    return (req, res, next) => {
      /* Get from scope in request (req) payload. */
      let tokenScopes = req.payload.scopes;
      /* Checking for every scope, for val in scope and return it */
      let check = _.every(scopes, (val) => {
          return _.contains(tokenScopes, val);
      });
      /* If no Check! return 401 */
      if (!check) {
          return res.send(401, 'insufficient rights');
      } else {
          next();
      }
    };
  },
  /* To get scopes from token. */
  getScopesFromRequest: (req) => {
    return req.payload.scopes;
  },
  /* Getting username out of scope */
  getTokenUsername: (req) => {
    return req.payload.username;
  },
  /* Getting id from token */
  getTokenUserId: (req) => {
   return req.payload.id;
  },
  /* Getting exp date from token */
  expiertoken: (req) => {
    return req.paylod.exp;
  },
  /* Getting admin value of token  */
  admin: (req) => {
    return req.payload.admin;
  }
// exports ends
};

