import mongoose from 'mongoose';

import userScheme from './schemes/userScheme';

// для работы с promise
mongoose.Promise = global.Promise;

// установка схемы

var User = mongoose.model("User", userScheme);

const dbGetUsersCount = (login, callback) => {

    User.count({login: { $regex: new RegExp("^" + login.toLowerCase() + "$", "i") }}, function( err, count){
      callback(err, count);
    });

}


export default dbGetUsersCount;
