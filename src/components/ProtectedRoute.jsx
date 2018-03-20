import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';

import getCookie from './cookie/getCookie';
import deleteCookie from './cookie/deleteCookie';

const request = () => {
  return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();
        const token = getCookie('token');

        var body = {
          token: token
        };

        body = JSON.stringify(body);

        xhr.open('POST', '/role/get');

        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(body);
  });
}

class ProtectedRoute extends Component {

  constructor(props) {
    super(props);
    this.state = { role: 'wait', login: null };
  }

  checkRole() {
    request().then(resolve => {

        const data = JSON.parse(resolve);
        console.log(data.role);
        this.setState({role: data.role, login: data.login});

    });
  }

  render() {
      if (this.state.role === 'wait') {
        this.checkRole();
        return  (<div>
                Пожалуйста подождите
              </div>);
      } else if (this.state.role === 'user') {
        return <Route path={ this.props.location.pathname }
                      render={ () => <this.props.component login = {this.state.login}/> }/>;
      } else if (this.state.role === 'admin') {
        return <Redirect to='/admin' />;
      } else {
        deleteCookie('token');
        return <Redirect to='/' />;
      }

    }

}

export default ProtectedRoute;
