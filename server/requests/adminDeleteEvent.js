import jwt from 'jsonwebtoken';

import { dbAdminDeleteEvent } from '../../database/dbEvent';

const adminDeleteEvent = function (req, res) {

  var token = req.cookies.token;

   if (!token) {
     return res.status(403).json({
         success: false,
         message: 'No token provided.'
     });
   }

   jwt.verify(token, 'my-secret', function(err, decoded) {

     if (err) {
       return res.json({ success: false, message: 'Failed to authenticate token.' });
     }

      if (decoded.role === 'admin') {
        dbAdminDeleteEvent(req.params.id,
                   (error, result) => {
                     if (error) {
                       console.log(error);
                     } else {
                       console.log(result);
                       res.status(200).json({status: 'deleted'});
                     }
                   });
      } else {
        res.status(403).json({
            success: false,
            message: 'You are not admin.'
        });
      }

   });


};

export default adminDeleteEvent;
