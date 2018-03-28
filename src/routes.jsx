import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

//import App from './app';

import Notfound from './components/Notfound';
import LSForm from './components/LSForm';
import ProtectedRoute from './components/ProtectedRoute';

import Admin from './components/AdminComponents/Admin';
import AdminProtectedRoute from './components/AdminComponents/AdminProtectedRoute';

import Homepage from './components/Homepage';
import Addevent from './components/Addevent';
import Editevent from './components/Editevent';
import Profile from './components/profile/Profile';

import 'styles/index.scss';
import 'normalize.css';


const Routes = () => (
  <BrowserRouter>

      <Switch>
          <Route exact path="/" component={LSForm}/>

          <AdminProtectedRoute path="/admin/:number" component={Admin}/>
          
          <ProtectedRoute path="/homepage/:number" component={Homepage}/>
          <ProtectedRoute path="/addevent" component={Addevent}/>
          <ProtectedRoute path="/editevent" component={Editevent}/>
          <ProtectedRoute path="/profile" component={Profile}/>
          <Route path="*" component={Notfound}/>
      </Switch>

  </BrowserRouter>
);

export default Routes ;
