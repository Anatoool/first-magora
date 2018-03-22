import mongoose from 'mongoose';

// для работы с promise
mongoose.Promise = global.Promise;

// установка схемы
import userScheme from './schemes/userScheme';

var User = mongoose.model("User", userScheme);

function editProfile(login, name, email, callback) {

  User.update({login: login}, {name: name, email: email}, function(err, result){
    callback(err, result);
});

}

export default editProfile;
