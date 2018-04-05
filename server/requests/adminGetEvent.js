import jwt from 'jsonwebtoken';

import { dbAdminGetEvent } from '../../database/dbEvent';

const adminGetEvent = function (req, res) {

  var token = req.cookies.token;

   if (token) {

     jwt.verify(token, 'my-secret', function(err, decoded) {
       if (err) {
         return res.json({ success: false, message: 'Failed to authenticate token.' });
       } else {

         if (decoded.role === 'admin') {

           dbAdminGetEvent(req.params.id, (docs) => {
             res.json({event: docs});
           }, () => {
             res.json({event: null});
           });
         } else {
           res.status(401).json({
               success: false,
               message: 'You are not admin.'
           });
         }

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

export default adminGetEvent;
