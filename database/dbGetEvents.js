import mongoose from 'mongoose';

import eventScheme from './schemes/eventScheme';

// для работы с promise
mongoose.Promise = global.Promise;

// установка схемы


var Event = mongoose.model("Event", eventScheme);

const dbGetEvents = (user, callback) => {

    Event.find({user: user}).then( (doc) => {
       callback(doc);
     });

}


export default dbGetEvents;
