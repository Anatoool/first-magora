import mongoose from 'mongoose';

// для работы с promise
mongoose.Promise = global.Promise;

import userScheme from './schemes/userScheme';
// установка схемы


var User = mongoose.model("User", userScheme);

function addUser(login, password, email) {

  var user = new User({
      login: login,
      password: password,
      email: email,
      role: 'user'
  });

  user.save()
  .then(function(doc){
      console.log("Сохранен объект", doc);
      // отключение от базы данных
  })
  .catch(function (err){
      console.log(err);
  });

}

function findUser (login, callback) {

 User.findOne({login: login}).then( (doc) => {
    callback(doc);
  });

}

export { addUser, findUser};
