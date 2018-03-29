import mongoose from 'mongoose';

// для работы с promise
mongoose.Promise = global.Promise;

// установка схемы
import eventScheme from './schemes/eventScheme';

var Event = mongoose.model("Event", eventScheme);

function dbAdminDeleteEvent(id, callback) {

  Event.update({_id: id},
    {
      deleted: true
    }, function(err, result) {
        callback(err, result);
      }
  );

}

export default dbAdminDeleteEvent;
