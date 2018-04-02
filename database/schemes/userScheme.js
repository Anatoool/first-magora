import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var userScheme = new Schema({
    login: {
      type: String,
      unique: true
    },
    password: String,
    email: String,
    name: String,
    role: String
  },
  { versionKey: false }
);

export default userScheme;
