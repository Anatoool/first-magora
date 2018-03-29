import mongoose from 'mongoose';

import eventScheme from './schemes/eventScheme';

// для работы с promise
mongoose.Promise = global.Promise;

// установка схемы

var Event = mongoose.model("Event", eventScheme);

const dbUserGetEvent = (login, id, callback, errCallback) => {


    Event.findOne({user: login, _id: id}).then( (doc) => {
       callback(doc);
     }, (err) => {
       console.log(err);
       errCallback();
     });

}


export default dbUserGetEvent;
