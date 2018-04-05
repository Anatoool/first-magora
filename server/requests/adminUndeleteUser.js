import jwt from 'jsonwebtoken';

import { dbAdminUndeleteUser } from '../../database/dbUser';

const adminUndeleteUser = function (req, res) {

  var token = req.cookies.token;

   if (token) {

     jwt.verify(token, 'my-secret', function(err, decoded) {
       if (err) {
         return res.json({ success: false, message: 'Failed to authenticate token.' });
       } else {

          if (decoded.role === 'admin') {
            dbAdminUndeleteUser(req.params.id,
                       (error, result) => {
                         if (error) {
                           console.log(error);
                         } else {
                           console.log(result);
                           res.status(200).json({status: 'undeleted'});
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

export default adminUndeleteUser;
