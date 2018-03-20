import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var eventScheme = new Schema({
    user: String,
    name: String,
    description: String,
    importance: String,
    place: String,
    date_start: String,
    date_end: String
  },
  { versionKey: false }
);

export default eventScheme;
