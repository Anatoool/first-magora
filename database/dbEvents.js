import mongoose from 'mongoose';

var Schema = mongoose.Schema;
// для работы с promise
mongoose.Promise = global.Promise;

// установка схемы
var eventScheme = new Schema({
    user: String,
    name: String,
    description: String,
    importance: String,
    type: String,
    date_start: String,
    date_end: String
  },
  { versionKey: false }
);

var Event = mongoose.model("Event", eventScheme);

const dbGetEvents = (user, callback) => {

    Event.find({user: user}).then( (doc) => {
       callback(doc);
     });


}

export default dbGetEvents;
