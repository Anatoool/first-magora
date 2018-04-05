import jwt from 'jsonwebtoken';

import { findUser } from '../../database/db';

const getProfileFromToken = function (req, res) {

  var token = req.body.token;

   if (token) {

     jwt.verify(token, 'my-secret', function(err, decoded) {
       if (err) {
         return res.json({ success: false, message: 'Failed to authenticate token.' });
       } else {
         findUser(decoded.login, function(doc) {
           res.json({role: decoded.role, login: decoded.login, name: doc.name, email: doc.email});
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

export default getProfileFromToken;
