import mongoose from 'mongoose';

import eventScheme from './schemes/eventScheme';

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
