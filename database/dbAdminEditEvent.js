import mongoose from 'mongoose';

// установка схемы
import eventScheme from './schemes/eventScheme';

var Event = mongoose.model("Event", eventScheme);

function dbAdminEditEvent(event, id, callback) {

  Event.update({_id: id},
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

export default dbAdminEditEvent;
