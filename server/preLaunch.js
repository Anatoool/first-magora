import mongoose from 'mongoose';
import config from './config';

mongoose.Promise = global.Promise;

const preLaunch = () => {
  mongoose.connect('mongodb://localhost:' + config.dbPort +'/magora');
}

export default preLaunch;
