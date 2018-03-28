import React, { Component } from 'react';
//import axios from 'axios';

import AdminHeader from './AdminHeader';
import EventsPagination from './EventsPagination';
import AdminEventsTable from './AdminEventsTable';

class Admin extends Component {

  render () {
    return (
      <div>
        <AdminHeader login={this.props.login} page="admin"/>
        <AdminEventsTable page={Number(this.props.page)}/>
        <EventsPagination startPage={Number(this.props.page)}/>
      </div>
    );
  }

}

export default Admin;
