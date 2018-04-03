import React, { Component } from 'react';
//import axios from 'axios';

import AdminHeader from './AdminHeader';
import EventsPagination from './EventsPagination';
import AdminEventsTable from './AdminEventsTable';
import AdminEventsFilter from './AdminEventsFilter';

class Admin extends Component {

  render () {
    return (
      <div>
        <AdminHeader login={this.props.login} page="admin"/>
        <AdminEventsFilter />
        <AdminEventsTable page={Number(this.props.params.page)}/>
        <EventsPagination startPage={Number(this.props.params.page)}/>
      </div>
    );
  }

}

export default Admin;
