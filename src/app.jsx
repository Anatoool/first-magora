import React, { Component } from 'react';

import LSForm from './components/LSForm';

import 'normalize.css';
import 'styles/index.scss';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const reducers = {
  // ... your other reducers here ...
  form: formReducer     // <---- Mounted at 'form'
};
const reducer = combineReducers(reducers);
const store = createStore(reducer);

class App extends Component {

  render () {
    return (
      <div className='App'>
          <Provider store={store}>
            <LSForm onSubmit={this.handleSubmit}/>
          </Provider>
      </div>
    );
  }
}

export default App;
