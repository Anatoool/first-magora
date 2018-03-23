import jwt from 'jsonwebtoken';

import dbGetEvents from '../../database/dbGetEvents';

const userGetEvents = function (req, res, next) {
  var token = req.body.token;

   if (token) {

     jwt.verify(token, 'my-secret', function(err, decoded) {
       if (err) {
         return res.json({ success: false, message: 'Failed to authenticate token.' });
       } else {
         const page = req.body.page;
         //Надо сделать запрос в БД всех событий пользователя с логином
         dbGetEvents(decoded.login, page, "date_start", (docs, countEvents) => {
           res.json({events: docs, count: countEvents});
         });
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

export default userGetEvents;
