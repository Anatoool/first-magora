import React, { Component } from 'react';

import AdminHeader from './AdminHeader';
//import EventsPagination from './EventsPagination';
// import AdminEventsTable from './AdminEventsTable';
// import AdminEventsFilter from './AdminEventsFilter';

class Users extends Component {

  render () {
    return (
      <div>
        <AdminHeader login={this.props.login} page="users"/>
      </div>
    );
  }

}

export default Users;
