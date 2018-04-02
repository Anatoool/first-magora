import mongoose from 'mongoose';

// для работы с promise
mongoose.Promise = global.Promise;

// установка схемы
import userScheme from './schemes/userScheme';

var User = mongoose.model("User", userScheme);

function dbAdminDeleteUser(id, callback) {

  User.update({_id: id},
    {
      role: 'banned'
    }, function(err, result) {
        callback(err, result)
      }
  );

}

export default dbAdminDeleteUser;
