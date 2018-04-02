import React, { Component } from 'react';

import AdminHeader from './AdminHeader';
//import EventsPagination from './EventsPagination';
import UsersTable from './UsersTable';
// import AdminEventsFilter from './AdminEventsFilter';

class Users extends Component {

  render () {
    return (
      <div>
        <AdminHeader login={this.props.login} page="users"/>
        <UsersTable />
      </div>
    );
  }

}

export default Users;
