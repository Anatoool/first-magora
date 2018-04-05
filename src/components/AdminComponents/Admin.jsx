import React, { Component } from 'react';
//import axios from 'axios';

import { connect } from 'react-redux';

import AdminHeader from './AdminHeader';
import EventsPagination from './EventsPagination';
import AdminEventsTable from './AdminEventsTable';
import AdminEventsFilter from './AdminEventsFilter';

class Admin extends Component {

  componentWillMount() {
    const sortfield = this.props.params.sortfield;
    const direction = this.props.params.direction;
    const deleted = (this.props.params.deleted === 'true');
    const namefilter = (this.props.params.namefilter === '""' ? '' : this.props.params.namefilter);
    this.props.onMount(sortfield, direction, deleted, namefilter);
  }

  render () {

    return (
      <div>
        <AdminHeader login={this.props.login} page="admin"/>
        <AdminEventsFilter
          page={Number(this.props.params.page)}
          sortfield={this.props.params.sortfield}
          direction={this.props.params.direction}
          deleted={this.props.params.deleted}
          namefilter={this.props.params.namefilter}
        />
        <AdminEventsTable
          page={Number(this.props.params.page)}
          sortfield={this.props.params.sortfield}
          direction={this.props.params.direction}
          deleted={this.props.params.deleted}
          namefilter={this.props.params.namefilter}
        />
        <EventsPagination
          startPage={Number(this.props.params.page)}
          sortfield={this.props.params.sortfield}
          direction={this.props.params.direction}
          deleted={this.props.params.deleted}
          namefilter={this.props.params.namefilter}
        />
      </div>
    );
  }

}

export default connect(
  state => ({
    eventsFilter: state.adminEventsFilter
  }),
  dispatch => ({
    onMount: (sortfield, direction, deleted, namefilter) => {
      const sort = {
        sortfield: sortfield,
        direction: direction
      };
      dispatch({ type: 'ADMIN_CHANGE_SORT_EVENTS_MOUNT', payload: sort });
      dispatch({ type: 'ADMIN_CHANGE_EVENTS_FILTER_DELETED_MOUNT', payload: deleted });
      dispatch({ type: 'ADMIN_CHANGE_EVENTS_FILTER_USERNAME', payload: namefilter });
    }
  })
)(Admin);
