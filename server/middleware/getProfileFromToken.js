import jwt from 'jsonwebtoken';

const getProfileFromToken = function (req, res, next) {
  console.log(req.body);
  var token = req.body.token;

   if (token) {

     jwt.verify(token, 'my-secret', function(err, decoded) {
       if (err) {
         return res.json({ success: false, message: 'Failed to authenticate token.' });
       } else {
         res.json({role: decoded.role, login: decoded.login, name: decoded.name, email: decoded.email});
       }
     });

   } else {
     return res.status(403).json({
         success: false,
         message: 'No token provided.'
     });
   }
  next();
};

export default getProfileFromToken;
