const express = require('express');
const path = require('path');
var bodyParser = require("body-parser");
import cookieParser from 'cookie-parser';
import { addUser, findUser } from './database/db';


import getProfileFromToken from './server/middleware/getProfileFromToken';
import userGetEvents from './server/middleware/userGetEvents';
import userAddEvent from './server/middleware/userAddEvent';
import userEditProfile from './server/middleware/userEditProfile';
import userEditEvent from './server/middleware/userEditEvent';
import usersGetCount from './server/middleware/usersGetCount';

import adminGetEvents from './server/middleware/adminGetEvents';

import preLaunch from './server/preLaunch';
preLaunch();

import jwt from 'jsonwebtoken';

const port = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());


app.use(express.static(`${__dirname}/public`));



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

  findUser(login, function(doc) {

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

app.get('/api/users/count', (req, res) => {
  usersGetCount(req, res);
});

app.use('/profile/get', getProfileFromToken);
app.post('/profile/get', (req, res) => {

});

app.put('/user/profile/edit', (req, res) => {
  userEditProfile(req, res);
});

//Получение событий пользователя
app.get('/api/user/events', (req, res) => {
  userGetEvents(req, res);
});

//Получение событий администратора
app.get('/api/admin/events', (req, res) => {
  adminGetEvents(req, res);
});

app.use('/user/event/add', userAddEvent);
app.post('/user/event/add', (req, res) => {
});

app.put('/api/user/events', (req, res) => {
  userEditEvent(req, res);
});

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'public', 'index1.html'));
});


app.listen(port);
console.log(`server started on port ${port}`);
