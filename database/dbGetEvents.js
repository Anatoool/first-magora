import mongoose from 'mongoose';

import eventScheme from './schemes/eventScheme';

// для работы с promise
mongoose.Promise = global.Promise;

// установка схемы

var Event = mongoose.model("Event", eventScheme);

const dbGetEvents = (user, page, pageSize, sortField, callback) => {

    const skiped = pageSize * (page - 1);
    var countEvents = 0;

    Event.count({user: user}, function( err, count){
      countEvents = count;
    });

    if (sortField[0] === "!") {
      sortField = '-' + sortField.substring(1);
    }

    Event.find({user: user}).sort(sortField).skip(skiped).limit(10).then( (doc) => {
       callback(doc, countEvents);
     });

}


export default dbGetEvents;
