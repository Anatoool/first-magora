import mongoose from 'mongoose';

import userScheme from './schemes/userScheme';

// для работы с promise
mongoose.Promise = global.Promise;

// установка схемы

var User = mongoose.model("User", userScheme);

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


export default dbGetUsers;
