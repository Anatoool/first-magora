import mongoose from 'mongoose';
import userScheme from './schemes/userScheme';
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
  .then(callback)
  .catch(function (err){
      console.log(err);
  });

}

function findUser (login, callback) {

 User.findOne({login: login}).then(callback);

}

function dbAdminDeleteUser(id, callback) {

  User.update({_id: id}, { role: 'banned' }, callback);

}

function dbAdminUndeleteUser(id, callback) {

  User.update({_id: id}, { role: 'user' }, callback);

}

function dbEditProfile(login, name, email, callback) {

  User.update({login: login}, {name: name, email: email}, callback);

}

const dbGetUsersCount = (login, callback) => {

    User.count({login: { $regex: new RegExp("^" + login.toLowerCase() + "$", "i") }}, callback);

}

const dbGetUsers = (page, pageSize, deleted, login, callback) => {

    const skiped = pageSize * (page - 1);
    var countUsers = 0;

    if (deleted === 'true') {

      User.count({role: {$ne: 'admin'}, login: {$regex : '.*' + login + '.*', $options: "$i"} }, function( err, count){
        countUsers = count;
        User.find({role: {$ne: 'admin'}, login: {$regex : '.*' + login + '.*', $options: "$i"} }).skip(skiped).limit(pageSize).then( (doc) => {
           callback(doc, countUsers);
         });
      });


    } else {

      User.count({login: {$regex : '.*' + login + '.*', $options: "$i"}, $and: [ {role: {$ne: 'admin'} }, { role: {$ne: 'banned'} } ] }, function( err, count){
        countUsers = count;
        User.find({login: {$regex : '.*' + login + '.*', $options: "$i"}, $and: [ {role: {$ne: 'admin'} }, { role: {$ne: 'banned'} } ] }).skip(skiped).limit(pageSize).then( (doc) => {
           callback(doc, countUsers);
         });
      });

    }

}

export {
  addUser,
  findUser,
  dbGetUsersCount,
  dbGetUsers,
  dbAdminUndeleteUser,
  dbEditProfile,
  dbAdminDeleteUser
};
