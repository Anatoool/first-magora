import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';


import { Provider } from 'react-redux';
import store from './reducers/reducer';

ReactDOM.render(
    <Provider store={store}>
      <Routes />
    </Provider>,
  document.getElementById('app')
);
