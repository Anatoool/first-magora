import React, { Component } from 'react';
import UserHeader from './UserHeader';
import UserEventsTable from './UserEventsTable';
import Pagination from './Pagination';

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
        <UserEventsTable page={Number(this.props.page)}/>
        <Pagination startPage={Number(this.props.page)}/>
      </div>
    );
  }

}

export default Homepage;
