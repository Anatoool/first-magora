import jwt from 'jsonwebtoken';
import { dbGetNotifications, dbDeleteNotifications, dbAddNotification } from '../../database/dbNotification';

class Socket {

  constructor(io) {
    this.io = io;
    this.connect_users = {};
    this.startSocket();
  }

  startSocket () {

    this.io.sockets.on("connection", (socket) => {

      var token = socket.request.headers.cookie.token;

       if (!token) {
         return false;
       }

       jwt.verify(token, 'my-secret', (err, decoded) => {
         if (err) {
           return false;
         }

         this.emitOfflineNotifications(decoded.login, socket.id);
         this.connect_users[socket.id] = decoded.login;

       });

      socket.on('disconnect', () => {
          delete this.connect_users[socket.id];
      });

      socket.on("Admin_notification_to_one", (username, notification) => {
        this.adminNotificationToOne(username, notification, socket);
      });

    });

  }

  emitOfflineNotifications(login, id) {

    dbGetNotifications(login, (docs) => {

      const count = docs.length;

      if (count === 0) {
        return false;
      }

      for (let i = 0; i < count; i++) {
        this.io.to(id).emit(docs[i].type, docs[i].message);
      }

      dbDeleteNotifications(login);

    });

  }

  deleteEvent(eventName, user) {

    var countEnabledUsers = 0;//Количество доступных подключений пользователей. Если оно будет равно 0, то нужно кинуть нотификашку в БД.

    for(var key in this.connect_users) {
      if (this.connect_users[key] === user) {
        this.io.to(key).emit("Delete_Event", eventName);
        countEnabledUsers++;
      }
    }

    if (countEnabledUsers === 0) {
      dbAddNotification(user, "Delete_Event", eventName);
    }

  }

  firstEventAchievement(login) {

    for(var key in this.connect_users) {
      if (this.connect_users[key] === login) {
        this.io.to(key).emit("First_event_achievement");
      }
    }

  }

  adminNotificationToOne(username, notification, socket) {

    const token = socket.request.headers.cookie.token;
    if (!token) {
      return false;
    }

    jwt.verify(token, 'my-secret', (err, decoded) => {
      if (err) {
        return false;
      }

      if (decoded.role !== 'admin') {
        return false;
      }

      var countEnabledUsers = 0;

      for(var key in this.connect_users) {
        if (this.connect_users[key] === username) {
          this.io.to(key).emit("Admin_Notification", notification);
          countEnabledUsers++;
        }
      }

      if (countEnabledUsers === 0) {
        dbAddNotification(username, "Admin_Notification", notification);
      }

    });
  }

  getConnectUsers() {
    return this.connect_users;
  }
}

export default Socket;
