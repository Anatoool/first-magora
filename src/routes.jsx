import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

//import App from './app';
import Admin from './components/Admin';
import Notfound from './components/Notfound';
import LSForm from './components/LSForm';
import ProtectedRoute from './components/ProtectedRoute';

import Homepage from './components/Homepage';
import Addevent from './components/Addevent';
import Profile from './components/profile/Profile';

import 'styles/index.scss';
import 'normalize.css';


const Routes = () => (
  <BrowserRouter>

      <Switch>
          <Route exact path="/" component={LSForm}/>
          <Route path="/admin" component={Admin}/>
          <ProtectedRoute path="/homepage/:number" component={Homepage}/>
          <ProtectedRoute path="/addevent" component={Addevent}/>
          <ProtectedRoute path="/profile" component={Profile}/>
          <Route path="*" component={Notfound}/>
      </Switch>

  </BrowserRouter>
);

export default Routes ;
