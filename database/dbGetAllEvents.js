import mongoose from 'mongoose';

import eventScheme from './schemes/eventScheme';

// для работы с promise
mongoose.Promise = global.Promise;

// установка схемы

var Event = mongoose.model("Event", eventScheme);

const dbGetEvents = (page, pageSize, sortField, deleted, callback) => {

    const skiped = pageSize * (page - 1);
    var countEvents = 0;

    Event.count({}, function( err, count){
      countEvents = count;
    });

    if (sortField[0] === "!") {
      sortField = '-' + sortField.substring(1);
    }

    console.log(deleted);

    if (deleted === 'true') {
      Event.find({}).sort(sortField).skip(skiped).limit(10).then( (doc) => {
         callback(doc, countEvents);
       });
    } else {
      Event.find({deleted: false}).sort(sortField).skip(skiped).limit(10).then( (doc) => {
         callback(doc, countEvents);
       });
    }

}


export default dbGetEvents;
