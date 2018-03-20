import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const preLaunch = () => {
  mongoose.connect("mongodb://localhost:27017/magora");
}

export default preLaunch;
