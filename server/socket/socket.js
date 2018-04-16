import jwt from 'jsonwebtoken';

class Socket {

  constructor(io) {
    this.io = io;
    this.connect_users = [];
    this.startSocket();
  }

  startSocket () {

    this.io.sockets.on("connection", (socket) => {

      var token = socket.request.headers.cookie.token

       if (!token) {
         return false;
       }

       jwt.verify(token, 'my-secret', (err, decoded) => {
         if (err) {
           return false;
         }
         this.connect_users.push({login: decoded.login, id: socket.id});
         //this.io.to(socket.id).emit('Start_Chat');
       });

      socket.on('disconnect', () => {
          this.connect_users = this.connect_users.filter(user => user.id !== socket.id);
      });

    });

  }

  deleteEvent(eventName, user) {
    const emitUsers = this.connect_users.filter(element => element.login === user);
    for (let i = 0, count = emitUsers.length; i < count; i++) {
      this.io.to(emitUsers[i].id).emit("Delete_Event", eventName);
    }
  }

  firstEventAchievement(login) {
    const emitUsers = this.connect_users.filter(element => element.login === login);
    for (let i = 0, count = emitUsers.length; i < count; i++) {
      this.io.to(emitUsers[i].id).emit("First_event_achievement");
    }
  }

  getConnectUsers() {
    return this.connect_users;
  }
}

export default Socket;
