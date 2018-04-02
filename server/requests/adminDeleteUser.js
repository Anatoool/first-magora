import jwt from 'jsonwebtoken';

import dbAdminDeleteUser from '../../database/dbAdminDeleteUser';

const adminDeleteUser = function (req, res) {

  var token = req.cookies.token;

   if (token) {

     jwt.verify(token, 'my-secret', function(err, decoded) {
       if (err) {
         return res.json({ success: false, message: 'Failed to authenticate token.' });
       } else {

          if (decoded.role === 'admin') {
            dbAdminDeleteUser(req.params.id,
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
       }

     });

   } else {
     return res.status(403).json({
         success: false,
         message: 'No token provided.'
     });
   }

};

export default adminDeleteUser;
