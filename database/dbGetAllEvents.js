import mongoose from 'mongoose';

import eventScheme from './schemes/eventScheme';

// установка схемы

var Event = mongoose.model("Event", eventScheme);

const dbGetEvents = (page, pageSize, sortField, deleted, username, callback) => {

    const skiped = pageSize * (page - 1);
    var countEvents = 0;

    if (sortField[0] === "!") {
      sortField = '-' + sortField.substring(1);
    }

    if (deleted === 'true') {

      Event.count({user: {$regex : '.*' + username + '.*', $options: "$i"}}, function( err, count){
        countEvents = count;
      });
      Event.find({user: {$regex : '.*' + username + '.*', $options: "$i"}}).sort(sortField).skip(skiped).limit(10).then( (doc) => {
         callback(doc, countEvents);
       });

    } else {
      Event.count({user: {$regex : '.*' + username + '.*', $options: "$i"}, deleted: false}, function( err, count){
        countEvents = count;
      });
      Event.find({user: {$regex : '.*' + username + '.*', $options: "$i"}, deleted: false}).sort(sortField).skip(skiped).limit(10).then( (doc) => {
         callback(doc, countEvents);
       });
    }

}


export default dbGetEvents;
