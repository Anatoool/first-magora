import React, { Component } from 'react';
import UserHeader from './UserHeader';
import EditEventForm from './EditEventForm';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';


import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import '../../styles/common/homepage.scss';

const updateEvent = (values) => {

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    const valuesJSON = JSON.stringify(values);

    var body = {
      event: valuesJSON
    };

    body = JSON.stringify(body);

    xhr.open('PUT', '/api/user/events');

    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(body);
  });

}



class Editevent extends Component {

  constructor(props) {
    super(props);
    this.state = {eventSent: false}
  }

  handleSubmit(values) {
    updateEvent(values).then( () => {
      this.setState({eventSent: true});
    });
    console.log(values, 'edit');
  }

  render () {

    if (this.state.eventSent === false) {
      return (
        <div>
          <UserHeader login={ this.props.login } page="none"/>
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <EditEventForm onSubmit={this.handleSubmit.bind(this)}
              initialValues={{
                name: this.props.editableEvent.name,
                description: this.props.editableEvent.description,
                importance: this.props.editableEvent.importance,
                dateEnd: new Date(this.props.editableEvent.dateEnd),
                dateStart: new Date(this.props.editableEvent.dateStart),
                address: this.props.editableEvent.address,
                id: this.props.editableEvent.id
                 }}/>
          </MuiThemeProvider>
        </div>
      );
    } else {
      return <Redirect to='/homepage/1' />;
    }

  }

}

export default connect(
  state => ({
    editableEvent: state.editableEvent
  })
)(Editevent);
