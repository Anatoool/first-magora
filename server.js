const express = require('express');
const path = require('path');
var bodyParser = require("body-parser");
import { addUser, findUser } from './database/db';


import getRoleFromToken from './server/middleware/getRoleFromToken';
import userGetEvents from './server/middleware/userGetEvents';

import preLaunch from './server/preLaunch';
preLaunch();

import jwt from 'jsonwebtoken';

const port = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());


app.use(express.static(`${__dirname}/public`));

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'public', 'index1.html'));
});

var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

app.use('/login', myLogger);
app.post('/login', (req, res) => {

  //var userName=req.body.email;
  const login = req.body.login;
  const password = req.body.password;

  //console.log(req.body);

  findUser(login, password, function(doc) {

    if (doc === null) {
      res.json({ success: false});
    } else {
      if (doc.password === password) {

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
        res.json({ success: false});
      }
    }

  });
  //console.log(req.body);

});

app.use('/role/get', getRoleFromToken);
app.post('/role/get', (req, res) => {

});

app.use('/user/events/get', userGetEvents);
app.post('/user/events/get', (req, res) => {

});

app.listen(port);
console.log(`server started on port ${port}`);
