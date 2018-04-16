import jwt from 'jsonwebtoken';

import { findUser } from '../../database/dbUser';

const loginRequest = function (req, res) {

  const login = req.body.login;
  const password = req.body.password;

  findUser(login, function(doc) {

    if (doc === null) {
      res.json({ success: 'false'});
    } else {

          if (doc.password === password) {

            if (doc.role !== 'banned') {
              const payload = {
                role: doc.role,
                login: doc.login
              };

              var token = jwt.sign(payload, 'my-secret', {
               expiresIn: "10h" // expires in 24 hours
             });
             console.log(doc.role);
              res.json({ success: true, token: token});
            } else {
              res.json({ success: true, message: 'banned'});
            }


          } else {
            res.json({ success: false});
          }

    }

  });

}

export default loginRequest;
