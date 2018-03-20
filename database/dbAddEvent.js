import mongoose from 'mongoose';

// для работы с promise
mongoose.Promise = global.Promise;

// установка схемы
import eventScheme from './schemes/eventScheme';

var Event = mongoose.model("Event", eventScheme);

function dbAddEvent(user, name, description, importance, place, date_start, date_end, callback) {

  var event = new Event({
      user: user,
      name: name,
      description: description,
      importance: importance,
      place: place,
      date_start: date_start,
      date_end: date_end
  });

  event.save(function(err){

    if(err) {
       return console.log(err);
    } else {
      callback(event);
    }
  });
}

export default dbAddEvent;
