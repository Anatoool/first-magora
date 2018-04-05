import jwt from 'jsonwebtoken';

import { dbAddEvent } from '../../database/dbEvent';

const userAddEvent = function (req, res) {
  var token = req.body.token;

   if (token) {

     jwt.verify(token, 'my-secret', function(err, decoded) {
       if (err) {
         return res.json({ success: false, message: 'Failed to authenticate token.' });
       } else {

         var event = req.body.event;
         event = JSON.parse(event);
         dbAddEvent(decoded.login,
                    event.name,
                    event.description,
                    event.importance,
                    event.address,
                    event.dateStart,
                    event.dateEnd, (value) => {
                      console.log('Событие добавлено', value);
                      res.json({events: 'дошло'});
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

export default userAddEvent;
