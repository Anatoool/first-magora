import jwt from 'jsonwebtoken';

import { dbGetUsers } from '../../database/dbUser';

const adminGetUsers = function (req, res) {

  var token = req.cookies.token;

   if (token) {

     jwt.verify(token, 'my-secret', function(err, decoded) {
       if (err) {
         return res.json({ success: false, message: 'Failed to authenticate token.' });
       } else {

         const page = req.query.page;
         const pageSize = Number(req.query.pageSize);
         const deleted = req.query.deleted;// true - показывать удаленные, false - нет
         /*const field = req.query.sort[0];*/
         const login = req.query.login;

         if (decoded.role === "admin") {
           dbGetUsers(page, pageSize, deleted, login, (docs, countUsers) => {
             res.json({users: docs, count: countUsers});
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

};

export default adminGetUsers;
