const express = require('express');
const path = require('path');
var bodyParser = require("body-parser");
import cookieParser from 'cookie-parser';
import { addUser, findUser } from './database/db';

import usersGetCount from './server/requests/usersGetCount';
import usersRegistration from './server/requests/usersRegistration';

import getProfileFromToken from './server/requests/getProfileFromToken';
import userGetEvents from './server/requests/userGetEvents';
import userAddEvent from './server/requests/userAddEvent';
import userEditProfile from './server/requests/userEditProfile';
import userEditEvent from './server/requests/userEditEvent';
import userGetEvent from './server/requests/userGetEvent';

import adminGetEvents from './server/requests/adminGetEvents';
import adminGetEvent from './server/requests/adminGetEvent';
import adminEditEvent from './server/requests/adminEditEvent';
import adminDeleteEvent from './server/requests/adminDeleteEvent';
import adminGetUsers from './server/requests/adminGetUsers';
import adminDeleteUser from './server/requests/adminDeleteUser';
import adminUndeleteUser from './server/requests/adminUndeleteUser';

import checkUserStatus from './server/middleware/checkUserStatus';

import preLaunch from './server/preLaunch';
preLaunch();

import jwt from 'jsonwebtoken';

const port = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());


app.use(express.static(`${__dirname}/public`));


app.use('*/user/*', checkUserStatus);

//Проверка логина и пароля для входа(Плюс проверка забанен ли пользователь)
app.post('/login', (req, res) => {

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

});


//Узнать есть ли пользователи с таким лгином для валидации регистрации
app.get('/api/users/count', (req, res) => {
  usersGetCount(req, res);
});

//Регистрация пользователя
app.post('/api/users', (req, res) => {
  usersRegistration(req, res);
});

//Получение пользователей
app.get('/api/admin/users', (req, res) => {
  adminGetUsers(req, res);
});


//Удаление пользователя
app.delete('/api/users/:id', (req, res) => {
  adminDeleteUser(req, res);
});

//--
app.put('/api/users/:id', (req, res) => {
  adminUndeleteUser(req, res);
});

app.use('/profile/get', getProfileFromToken);
app.post('/profile/get', (req, res) => {

});

app.put('/user/profile/edit', (req, res) => {
  userEditProfile(req, res);
});

//Получение единственного события для юзера и администратора
app.get('/api/user/events/:id', (req, res) => {
  userGetEvent(req, res);
});

app.get('/api/admin/events/:id', (req, res) => {
  adminGetEvent(req, res);
});

//Получение событий пользователя и администратора
app.get('/api/user/events', (req, res) => {
  userGetEvents(req, res);
});

app.get('/api/admin/events', (req, res) => {
  adminGetEvents(req, res);
});

//Добавление события пользователя
app.use('/user/event/add', userAddEvent);
app.post('/user/event/add', (req, res) => {
});

//Редактирование события пользователем и администратором
app.put('/api/user/events/:id', (req, res) => {
  userEditEvent(req, res);
});

app.put('/api/admin/events/:id', (req, res) => {
  adminEditEvent(req, res);
});

//Удаление события администратором
app.delete('/api/admin/events/:id', (req, res) => {
  adminDeleteEvent(req, res);
});

//Загрузка основного файла
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'public', 'index1.html'));
});


app.listen(port);
console.log(`server started on port ${port}`);
