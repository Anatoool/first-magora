import mongoose from 'mongoose';

import userScheme from './schemes/userScheme';

// для работы с promise
mongoose.Promise = global.Promise;

// установка схемы

var User = mongoose.model("User", userScheme);

const dbGetUsersCount = (user, callback) => {

    User.count({user: user}, function( err, count){
      callback(count);
    });

}


export default dbGetUsersCount;
