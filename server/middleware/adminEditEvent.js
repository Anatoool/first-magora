import jwt from 'jsonwebtoken';

import dbAdminEditEvent from '../../database/dbAdminEditEvent';

const adminEditEvent = function (req, res) {

  var token = req.cookies.token;

   if (token) {

     jwt.verify(token, 'my-secret', function(err, decoded) {
       if (err) {
         return res.json({ success: false, message: 'Failed to authenticate token.' });
       } else {
         var event = req.body.event;
         event = JSON.parse(event);

          if (decoded.role === 'admin') {
            dbAdminEditEvent(event, req.params.id,
                       (error, result) => {
                         if (error) {
                           console.log(error);
                         } else {
                           console.log(result);
                           res.status(200).json({status: 'updated'});
                         }
                       });
          } else {
            res.status(403).json({
                success: false,
                message: 'You are not admin.'
            });
          }
       }

     });

   } else {
     return res.status(403).json({
         success: false,
         message: 'No token provided.'
     });
   }

};

export default adminEditEvent;
