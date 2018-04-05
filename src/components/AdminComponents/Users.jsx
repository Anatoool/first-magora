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
        <UsersTable
          page={Number(this.props.params.page)}
          deleted={this.props.params.deleted}
          namefilter={this.props.params.namefilter}
        />
      </div>
    );
  }

}

export default Users;
