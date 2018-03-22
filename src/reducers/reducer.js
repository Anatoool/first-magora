import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import userProfile from './userProfile';

const reducers = {
  userProfile,
  form: formReducer     // <---- Mounted at 'form'
};
const reducer = combineReducers(reducers);

const store = createStore(reducer);

export default store;
