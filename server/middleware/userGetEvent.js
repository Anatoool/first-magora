import jwt from 'jsonwebtoken';

import dbUserGetEvent from '../../database/dbUserGetEvent';

const userGetEvent = function (req, res) {

  var token = req.cookies.token;

   if (token) {

     jwt.verify(token, 'my-secret', function(err, decoded) {
       if (err) {
         return res.json({ success: false, message: 'Failed to authenticate token.' });
       } else {

         dbUserGetEvent(decoded.login, req.params.id, (docs) => {
           res.json({event: docs});
         }, () => {
           res.json({event: null});
         });
       }
     });

   } else {
     return res.status(401).json({
         success: false,
         message: 'No token provided.'
     });
   }
  //next();
};

export default userGetEvent;
