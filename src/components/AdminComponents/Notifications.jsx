import React, { Component } from 'react';
import AdminHeader from './AdminHeader';
import NotificationPanel from './NotificationPanel';


class Notifications extends Component {

  render () {
    return (
      <div>
        <AdminHeader login={this.props.login} page="notifications"/>
        <NotificationPanel />
      </div>
    );
  }

}

export default Notifications;
