import jwt from 'jsonwebtoken';

import dbGetEvents from '../../database/dbGetEvents';

const userGetEvents = function (req, res) {

  var token = req.cookies.token;

   if (token) {

     jwt.verify(token, 'my-secret', function(err, decoded) {
       if (err) {
         return res.json({ success: false, message: 'Failed to authenticate token.' });
       } else {

         const page = req.query.page;
         const pageSize = req.query.pageSize;
         const field = req.query.sort[0];         

         dbGetEvents(decoded.login, page, pageSize, field, (docs, countEvents) => {
           res.json({events: docs, count: countEvents});
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

export default userGetEvents;
