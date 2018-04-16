import mongoose from 'mongoose';
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

function dbEditEvent(event, login, id, callback) {

  Event.update({_id: id, user: login, deleted: false},
    {
      name: event.name,
      description: event.description,
      importance: event.importance,
      place: event.address,
      date_start: event.dateStart,
      date_end: event.dateEnd
    }, callback);

}

function dbAdminDeleteEvent(id, callback) {

  Event.findOneAndUpdate({_id: id}, { deleted: true }, callback);

}

function dbAdminEditEvent(event, id, callback) {

  Event.update({_id: id},
    {
      name: event.name,
      description: event.description,
      importance: event.importance,
      place: event.address,
      date_start: event.dateStart,
      date_end: event.dateEnd
    }, callback);

}

const dbGetEvents = (user, page, pageSize, sortField, callback) => {

    const skiped = pageSize * (page - 1);
    var countEvents = 0;

    Event.count({user: user, deleted: false}, function( err, count){
      countEvents = count;
    });

    if (sortField[0] === "!") {
      sortField = '-' + sortField.substring(1);
    }

    Event.find({user: user, deleted: false}).sort(sortField).skip(skiped).limit(10).then( (doc) => {
       callback(doc, countEvents);
     });

}

const dbUserGetEvent = (login, id, callback, errCallback) => {

    Event.findOne({user: login, _id: id}).then( callback,
     (err) => {
       console.log(err);
       errCallback();
     });

}

const dbAdminGetEvent = (id, callback, errCallback) => {

    Event.findOne({_id: id}).then(callback, (err) => {
       console.log(err);
       errCallback();
     });

}

const dbGetAllEvents = (page, pageSize, sortField, deleted, username, callback) => {

    const skiped = pageSize * (page - 1);
    var countEvents = 0;

    if (sortField[0] === "!") {
      sortField = '-' + sortField.substring(1);
    }

    if (deleted === 'true') {

      Event.count({user: {$regex : '.*' + username + '.*', $options: "$i"}}, function( err, count){
        countEvents = count;
      });
      Event.find({user: {$regex : '.*' + username + '.*', $options: "$i"}}).sort(sortField).skip(skiped).limit(10).then( (doc) => {
         callback(doc, countEvents);
       });

    } else {
      Event.count({user: {$regex : '.*' + username + '.*', $options: "$i"}, deleted: false}, function( err, count){
        countEvents = count;
      });
      Event.find({user: {$regex : '.*' + username + '.*', $options: "$i"}, deleted: false}).sort(sortField).skip(skiped).limit(10).then( (doc) => {
         callback(doc, countEvents);
       });
    }

}

export {
  dbUserGetEvent,
  dbEditEvent,
  dbAddEvent,
  dbGetEvents,
  dbGetAllEvents,
  dbAdminDeleteEvent,
  dbAdminEditEvent,
  dbAdminGetEvent
};
