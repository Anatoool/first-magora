import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var notificationScheme = new Schema({
    username: String,
    type: String,
    message: String
  },
  { versionKey: false }
);

export default notificationScheme;
