import mongoose from 'mongoose';
import notificationScheme from './schemes/notificationScheme';
var Notification = mongoose.model("Notification", notificationScheme);

const dbGetNotifications = (username, callback) => {

    Notification.find({username: username}).then(callback);

}

const dbDeleteNotifications = (username) => {

  Notification.remove({ username: username }, function(err, result){

    if(err) return console.log(err);

    console.log(result);

  });

}

const dbAddNotification = (username, type, message) => {

  var notification = new Notification({
      username: username,
      type: type,
      message: message
  });

  notification.save()
  .then()
  .catch(function (err){
      console.log(err);
  });

}



export {
  dbGetNotifications,
  dbDeleteNotifications,
  dbAddNotification
};
