import jwt from 'jsonwebtoken';

import { dbEditProfile } from '../../database/dbUser';

const userEditProfile = function (req, res) {
  var token = req.body.token;

   if (token) {

     jwt.verify(token, 'my-secret', function(err, decoded) {
       if (err) {
         return res.json({ success: false, message: 'Failed to authenticate token.' });
       } else {

         var profile = req.body.profile;
         profile = JSON.parse(profile);
         dbEditProfile(decoded.login,
                    profile.name,
                    profile.email,
                    (error, result) => {
                      if (error) {
                        console.log(error);
                      } else {
                        console.log(result);
                        res.json({status: 'updated'});
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

export default userEditProfile;
