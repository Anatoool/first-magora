const express = require('express');
const path = require('path');
var bodyParser = require("body-parser");
import cookieParser from 'cookie-parser';

import config from './config';

import requestMiddlewares from './routes/requestMiddlewares';
import generalRoutes from './routes/generalRoutes';
import adminRoutes from './routes/adminRoutes';
import userRoutes from './routes/userRoutes';
import Socket from './socket/socket';

import preLaunch from './preLaunch';
preLaunch();

const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var ioCookieParser = require('socket.io-cookie');
io.use(ioCookieParser);
var mySocket = new Socket(io);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(`${path.normalize(__dirname + '/../')}/public`));

app.set('socket', mySocket);

requestMiddlewares(app);
generalRoutes(app);
adminRoutes(app);
userRoutes(app);

//Загрузка основного файла
app.get('*', (request, response) => {
  response.sendFile(path.resolve(path.normalize(__dirname + '/../'), 'public', 'index.html'));
});

/*setInterval(() => {
  const users = mySocket.getConnectUsers();
  for(var key in users) {
    console.log(users[key] + ': ' + key);

  }
console.log('----------------------------------------');
}, 5000);*/

io.listen(app.listen(config.port));
console.log(`server started on port ${config.port}`);
