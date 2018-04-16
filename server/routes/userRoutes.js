import getProfileFromToken from '../requests/getProfileFromToken';
import userGetEvents from '../requests/userGetEvents';
import userAddEvent from '../requests/userAddEvent';
import userEditProfile from '../requests/userEditProfile';
import userEditEvent from '../requests/userEditEvent';
import userGetEvent from '../requests/userGetEvent';

export default function userRoutes(app, mySocket) {

//-----Работа с событиями

  app.get('/api/user/events', userGetEvents);//Получение событий

  app.get('/api/user/events/:id', userGetEvent);//Получение единственного события

  app.post('/user/event/add', (req, res) => {
    userAddEvent(req, res, mySocket);
  });//Добавление события

  app.put('/api/user/events/:id', userEditEvent);//Редактирование события

//-----Работа с профайлом

  app.post('/profile/get', getProfileFromToken);//Получение профайла

  app.put('/api/user/profile', userEditProfile);//Редактирование профайла

}
