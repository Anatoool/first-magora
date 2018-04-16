import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

//import App from './app';

import Socket from './components/Socket/Socket.jsx';

import Notfound from './components/Notfound';
import LSForm from './components/LSForm';
import ProtectedRoute from './components/ProtectedRoute';

import Admin from './components/AdminComponents/Admin';
import AdminProtectedRoute from './components/AdminComponents/AdminProtectedRoute';
import AdminEditevent from './components/AdminComponents/AdminEditevent';
import Users from './components/AdminComponents/Users';
import Notifications from './components/AdminComponents/Notifications';

import Homepage from './components/Homepage';
import Addevent from './components/Addevent';
import Editevent from './components/Editevent';
import Profile from './components/profile/Profile';

import 'styles/index.scss';
import 'normalize.css';


const Routes = () => (

  <BrowserRouter>
    <div>

      <Switch>
        <Route path='/homepage/*' component={Socket}/>
        <Route path='/addevent' component={Socket}/>
        <Route path='/editevent/*' component={Socket}/>
        <Route path='/profile' component={Socket}/>
        
      </Switch>

      <Switch>
          <Route exact path="/" component={LSForm}/>
          <AdminProtectedRoute path="/admin/events-:page-:sortfield-:direction-:deleted-:namefilter" component={Admin}/>
          <AdminProtectedRoute path="/admin/users-:page-:deleted-:namefilter" component={Users}/>
          <AdminProtectedRoute path="/admin/event/:id" component={AdminEditevent}/>
          <AdminProtectedRoute path="/admin/notifications" component={Notifications}/>

          <ProtectedRoute path="/homepage/:number" component={Homepage}/>
          <ProtectedRoute path="/addevent" component={Addevent}/>
          <ProtectedRoute path="/editevent/:id" component={Editevent}/>
          <ProtectedRoute path="/profile" component={Profile}/>
          <Route path="*" component={Notfound}/>
      </Switch>

    </div>
  </BrowserRouter>
);

export default Routes ;
