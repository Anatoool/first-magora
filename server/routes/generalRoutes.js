import usersGetCount from '../requests/usersGetCount';
import usersRegistration from '../requests/usersRegistration';
import loginRequest from '../requests/loginRequest';

export default function generalRoutes(app) {

  //Проверка логина и пароля для входа(Плюс проверка забанен ли пользователь)
  app.post('/login', loginRequest);

  //Узнать есть ли пользователи с таким лгином для валидации регистрации
  app.get('/api/users/count', usersGetCount);

  //Регистрация пользователя
  app.post('/api/users', usersRegistration);

}
