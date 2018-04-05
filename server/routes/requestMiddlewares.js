import checkUserStatus from '../middleware/checkUserStatus';

export default function requestMiddlewares(app) {

  //Проверка забанен ли пользователь
  app.use('*/user/*', checkUserStatus);

}
