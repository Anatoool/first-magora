import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { applyMiddleware } from 'redux';
import userProfile from './userProfile';
import homepageNumber from './homepageNumber';
import userEvents from './userEvents';
import userEventsSort from './userEventsSort';
import editableEvent from './editableEvent';
import userBanned from './userBanned';

import adminEventsNumber from './adminReducers/adminEventsNumber';
import adminEventsSort from './adminReducers/adminEventsSort';
import adminEvents from './adminReducers/adminEvents';
import adminEventsFilter from './adminReducers/adminEventsFilter';
import users from './adminReducers/Users';

import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducers = {
  userProfile,
  homepageNumber,
  userEvents,
  userEventsSort,
  editableEvent,
  userBanned,
  adminEventsFilter,
  adminEvents,
  adminEventsNumber,
  adminEventsSort,
  users,

  form: formReducer     // <---- Mounted at 'form'
};
const reducer = combineReducers(reducers);


const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
