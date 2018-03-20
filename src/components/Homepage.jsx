import React, { Component } from 'react';
import UserHeader from './UserHeader';
import UserEventsTable from './UserEventsTable';

import '../../styles/common/homepage.scss';

class Homepage extends Component {

  constructor(props) {
    super(props);
  }

  AjaxTest() {
    alert('Click!');
  }

  render () {
    return (
      <div>
        <UserHeader login={this.props.login} page="homepage"/>
        <UserEventsTable />
        Hello User
        <div onClick = {this.AjaxTest.bind(this)}>Запрос</div>
      </div>
    );
  }

}

export default Homepage;
