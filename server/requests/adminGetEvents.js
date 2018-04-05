import jwt from 'jsonwebtoken';

import { dbGetAllEvents } from '../../database/dbEvent';

const adminGetEvents = function (req, res) {

  var token = req.cookies.token;

   if (token) {

     jwt.verify(token, 'my-secret', function(err, decoded) {
       if (err) {
         return res.json({ success: false, message: 'Failed to authenticate token.' });
       } else {

         const page = req.query.page;
         const pageSize = req.query.pageSize;
         const field = req.query.sort[0];
         const deleted = req.query.deleted;// true - показывать удаленные, false - нет
         const username = req.query.username;



         if (decoded.role === "admin") {
           dbGetAllEvents(page, pageSize, field, deleted, username, (docs, countEvents) => {
             res.json({events: docs, count: countEvents});
           });
         } else {
           res.status(401).json({
               success: false,
               message: 'You are not Admin!'
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

export default adminGetEvents;
