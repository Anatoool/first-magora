import React, { Component } from 'react';
import UserHeader from './UserHeader';
import AddEventForm from './AddEventForm';

import { Redirect } from 'react-router-dom';

import getCookie from './cookie/getCookie';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import '../../styles/common/homepage.scss';

const sendEvent = (values) => {

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    const valuesJSON = JSON.stringify(values);
    const token = getCookie('token');

    var body = {
      event: valuesJSON,
      token: token
    };

    body = JSON.stringify(body);

    xhr.open('POST', '/user/event/add');

    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(body);
  });

}



class Addevent extends Component {

  constructor(props) {
    super(props);
    this.state = {eventSent: false}
  }

  handleSubmit(values) {
    sendEvent(values).then( () => {
      this.setState({eventSent: true});
    });
    console.log(values, 'submit');
  }

  render () {

    if (this.state.eventSent === false) {
      return (
        <div>
          <UserHeader login={ this.props.login } page="addevent"/>
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <AddEventForm onSubmit={this.handleSubmit.bind(this)}/>
          </MuiThemeProvider>
        </div>
      );
    } else {
      return <Redirect to='/homepage' />;
    }

  }

}

export default Addevent;
