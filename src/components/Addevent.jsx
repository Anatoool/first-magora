import React, { Component } from 'react';
import UserHeader from './UserHeader';
import AddEventForm from './AddEventForm';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import '../../styles/common/homepage.scss';

class Addevent extends Component {

  constructor(props) {
    super(props);
  }

  handleSubmit(values) {
    console.log(values, 'submit');
  }

  render () {
    return (
      <div>
        <UserHeader login={ this.props.login } page="addevent"/>
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <AddEventForm onSubmit={this.handleSubmit}/>
        </MuiThemeProvider>
        addevent
      </div>
    );
  }

}

export default Addevent;
