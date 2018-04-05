const express = require('express');
const path = require('path');
var bodyParser = require("body-parser");
import cookieParser from 'cookie-parser';

import config from './config';

import requestMiddlewares from './routes/requestMiddlewares';
import generalRoutes from './routes/generalRoutes';
import adminRoutes from './routes/adminRoutes';
import userRoutes from './routes/userRoutes';

import preLaunch from './preLaunch';
preLaunch();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(`${path.normalize(__dirname + '/../')}/public`));

requestMiddlewares(app);
generalRoutes(app);
adminRoutes(app);
userRoutes(app);

//Проверка - забанен ли пользователь при очередном запросе


//Загрузка основного файла
app.get('*', (request, response) => {
  response.sendFile(path.resolve(path.normalize(__dirname + '/../'), 'public', 'index.html'));
});

app.listen(config.port);
console.log(`server started on port ${config.port}`);
