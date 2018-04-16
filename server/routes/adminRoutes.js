import adminGetEvents from '../requests/adminGetEvents';
import adminGetEvent from '../requests/adminGetEvent';
import adminEditEvent from '../requests/adminEditEvent';
import adminDeleteEvent from '../requests/adminDeleteEvent';
import adminGetUsers from '../requests/adminGetUsers';
import adminDeleteUser from '../requests/adminDeleteUser';
import adminUndeleteUser from '../requests/adminUndeleteUser';

export default function adminRoutes(app) {

//-----Работа с пользователями
//console.log(app.get('title').get());
  //Получение пользователей
  app.get('/api/admin/users', adminGetUsers);

  //Удаление пользователя
  app.delete('/api/users/:id', adminDeleteUser);

  //Восстановление пользователя
  app.put('/api/users/:id', adminUndeleteUser);

//-----Работа с событиями пользователей

  //Получение событий пользователя
  app.get('/api/admin/events', adminGetEvents);

  //Получение события пользователя
  app.get('/api/admin/events/:id', adminGetEvent);

  //редактирование события пользователя
  app.put('/api/admin/events/:id', adminEditEvent);

  //Удаление события администратором
  app.delete('/api/admin/events/:id', (req, res) => {
    adminDeleteEvent(req, res, app.get('socket'));
  });

}
