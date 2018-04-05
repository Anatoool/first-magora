import getProfileFromToken from '../requests/getProfileFromToken';
import userGetEvents from '../requests/userGetEvents';
import userAddEvent from '../requests/userAddEvent';
import userEditProfile from '../requests/userEditProfile';
import userEditEvent from '../requests/userEditEvent';
import userGetEvent from '../requests/userGetEvent';

export default function userRoutes(app) {

//-----Работа с событиями

  app.get('/api/user/events', userGetEvents);//Получение событий

  app.get('/api/user/events/:id', userGetEvent);//Получение единственного события

  app.post('/user/event/add', userAddEvent);//Добавление события

  app.put('/api/user/events/:id', userEditEvent);//Редактирование события

//-----Раюота с профайлом

  app.post('/profile/get', getProfileFromToken);//Получение профайла

  app.put('/api/user/profile', userEditProfile);//Редактирование профайла

}
