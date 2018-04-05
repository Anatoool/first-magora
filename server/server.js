const express = require('express');
const path = require('path');
var bodyParser = require("body-parser");
import cookieParser from 'cookie-parser';

import checkUserStatus from './middleware/checkUserStatus';

import generalRoutes from './routes/generalRoutes';
import adminRoutes from './routes/adminRoutes';
import userRoutes from './routes/userRoutes';

import preLaunch from './preLaunch';
preLaunch();

const port = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(`${path.normalize(__dirname + '/../')}/public`));

generalRoutes(app);
adminRoutes(app);
userRoutes(app);

//Проверка - забанен ли пользователь при очередном запросе
app.use('*/user/*', checkUserStatus);

//Загрузка основного файла
app.get('*', (request, response) => {
  response.sendFile(path.resolve(path.normalize(__dirname + '/../'), 'public', 'index1.html'));
});

app.listen(port);
console.log(`server started on port ${port}`);
