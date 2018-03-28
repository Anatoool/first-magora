import mongoose from 'mongoose';

// для работы с promise
mongoose.Promise = global.Promise;

// установка схемы
import eventScheme from './schemes/eventScheme';

var Event = mongoose.model("Event", eventScheme);

function dbEditEvent(event, callback) {

  Event.update({_id: event.id},
    {
      name: event.name,
      description: event.description,
      importance: event.importance,
      place: event.address,
      date_start: event.dateStart,
      date_end: event.dateEnd
    }, function(err, result) {
        callback(err, result);
      }
  );

}

export default dbEditEvent;
