import React from 'react';
import ReactDOM from 'react-dom';
//import {AppContainer} from 'react-hot-loader';
import Routes from './routes';

//import { BrowserRouter } from 'react-router-dom';//Обертка для App для роутинга

// let users = [
//   {
//     login: "User1",
//     password: "111Qq",
//     email: "user1@gmail.com",
//     role: "user"
//   },
//   {
//     login: "User2",
//     password: "222Qq",
//     email: "user2@gmail.com",
//     role: "user"
//   },
//   {
//     login: "Admin1",
//     password: "111Qqq",
//     email: "admin1@gmail.com",
//     role: "admin"
//   }
// ];

// let usersJSON = JSON.stringify(users);
// localStorage.setItem('Users', usersJSON);
// console.log( JSON.parse( localStorage.getItem('Users') ) );

import { Provider } from 'react-redux';
import store from './reducers/reducer';

ReactDOM.render(
    <Provider store={store}>
      <Routes />
    </Provider>,
  document.getElementById('app')
);

// // Hot Module Replacement API
// if (module.hot) {
//   module.hot.accept('./app', () => {
//     const NextApp = require('./app').default;
//     ReactDOM.render(
//       <AppContainer>
//
//           <NextApp/>
//
//       </AppContainer>,
//       document.getElementById('app')
//     );
//   });
// }
