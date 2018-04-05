import mongoose from 'mongoose';

// установка схемы
import userScheme from './schemes/userScheme';

var User = mongoose.model("User", userScheme);

function dbAdminUndeleteUser(id, callback) {

  User.update({_id: id},
    {
      role: 'user'
    }, function(err, result) {
        callback(err, result)
      }
  );

}

export default dbAdminUndeleteUser;
