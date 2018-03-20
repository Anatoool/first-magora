import mongoose from 'mongoose';

var Schema = mongoose.Schema;
// для работы с promise
mongoose.Promise = global.Promise;

// установка схемы
var userScheme = new Schema({
    login: String,
    password: String,
    email: String,
    role: String
  },
  { versionKey: false }
);

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

function findUser (login, password, callback) {

 User.findOne({login: login}).then( (doc) => {
    callback(doc);
  });

}

export { addUser, findUser};
