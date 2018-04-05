import React, { Component } from 'react';
import UserHeader from './UserHeader';
import AddEventForm from './AddEventForm';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import getCookie from '../cookie/getCookie';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import '../../styles/common/homepage.scss';

import reqAddEvent from '../requests/userRequests/reqAddEvent';

class Addevent extends Component {

  constructor(props) {
    super(props);
    this.state = {eventSent: false}
  }

  handleSubmit(values) {

    const token = getCookie('token');
    const dispatch = this.props.dispatch;

    reqAddEvent(values, token, dispatch).then(() => {
      this.setState({eventSent: true});
    });

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
      return <Redirect to='/homepage/1' />;
    }

  }

}

export default connect()(Addevent);
