import jwt from 'jsonwebtoken';

import { findUser } from '../../database/dbUser';

const checkUserStatus = function (req, res, next) {

  var token = req.cookies.token;

   if (token) {

     jwt.verify(token, 'my-secret', function(err, decoded) {
       if (err) {
         return res.json({ success: false, message: 'Failed to authenticate token.' });
       } else {

         findUser(decoded.login, (doc) => {
                if (doc.role !== 'banned') {
                  next();
                } else {
                  res.json({ success: false, message: 'banned' });
                }
         });


       }
     });

   } else {
     return res.status(403).json({
         success: false,
         message: 'No token provided.'
     });
   }

};

export default checkUserStatus;
