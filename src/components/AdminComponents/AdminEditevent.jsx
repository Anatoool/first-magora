import React, { Component } from 'react';
import AdminHeader from './AdminHeader';
import EditEventForm from '../EditEventForm';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';

import adminGetEvent from '../../actions/adminGetEvent';


import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import '../../../styles/common/homepage.scss';

const updateEvent = (values) => {

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    const valuesJSON = JSON.stringify(values);

    var body = {
      event: valuesJSON
    };

    body = JSON.stringify(body);

    xhr.open('PUT', '/api/admin/events/' + values.id);

    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(body);
  });

}



class AdminEditevent extends Component {

  constructor(props) {
    super(props);
    this.state = {eventSent: false, eventLoad: "no"};

    this.props.onGetEvent(this.props.params.id, this);
  }

  handleSubmit(values) {
    updateEvent(values).then( () => {
      this.setState({eventSent: true});
    });
  }

  renderEventForm() {
    if (this.state.eventLoad === "yes") {
      return(
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
      );
    } else if (this.state.eventLoad === "no") {
      return (<div>Загружается событие...</div>);
    } else if (this.state.eventLoad === "impossible") {
      return (<div>Невозможно загрузить событие. Некорректный id.</div>);
    }
  }

  render () {

    if (this.state.eventSent === false) {
      return (
        <div>
          <AdminHeader login={ this.props.login } page="none"/>
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            {this.renderEventForm()}
          </MuiThemeProvider>
        </div>
      );
    } else {
      return <Redirect to='/admin/events-1-name-up-true-""' />;
    }

  }

}

export default connect(
  state => ({
    editableEvent: state.editableEvent
  }),
  dispatch => ({
    onGetEvent: (id, editevent) => {
      dispatch(adminGetEvent(id, editevent));
    }
  })
)(AdminEditevent);
