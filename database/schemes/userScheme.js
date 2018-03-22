import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var userScheme = new Schema({
    login: String,
    password: String,
    email: String,
    name: String,
    role: String
  },
  { versionKey: false }
);

export default userScheme;
