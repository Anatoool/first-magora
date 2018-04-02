import mongoose from 'mongoose';

// для работы с promise
mongoose.Promise = global.Promise;

import userScheme from './schemes/userScheme';
// установка схемы

var User = mongoose.model("User", userScheme);

function addUser(login, password, email, callback) {
  console.log('addUser');
  var user = new User({
      login: login,
      password: password,
      email: email,
      role: 'user',
      name: ''
  });

  user.save()
  .then(function(doc){
      callback(doc);
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
