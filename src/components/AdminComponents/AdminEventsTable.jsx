import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GetAllEvents from '../../reducer-actions/getAllEvents';
import AdminEvent from './AdminEvent';


class AdminEventsTable extends Component {

    constructor(props) {
      super(props);
      this.getEvents();
      this.state = ({redirect: false});
    }

  getEvents() {
    this.props.onGetEvents(this.props.page,
                           this.props.adminEventsSort.field,
                           this.props.adminEventsSort.dierection,
                           this.props.eventsFilter.deletedVisible,
                           this.props.eventsFilter.username
    );
  }

  getSortEvents(page, field, direction) {
    this.props.onGetEvents(page,
                           field,
                           direction,
                           this.props.eventsFilter.deletedVisible,
                           this.props.eventsFilter.username);
  }

  rendHeaderName(){
    if (this.props.adminEventsSort.field === 'name') {
      if (this.props.adminEventsSort.dierection === 'down') {
        return (<th onClick={this.clickNameSort.bind(this)} className="sort-field" scope="col">Название &darr;</th>)
      } else {
        return (<th onClick={this.clickNameSort.bind(this)} className="sort-field" scope="col">Название &uarr;</th>)
      }
    } else {
      return (<th onClick={this.clickNameSort.bind(this)} className="sort-field" scope="col">Название</th>);
    }
  }

  rendHeaderDateStart(){
    if (this.props.adminEventsSort.field === 'date_start') {
      if (this.props.adminEventsSort.dierection === 'down') {
        return (<th onClick={this.clickDateSort.bind(this)} className="sort-field" scope="col">Дата начала &darr;</th>)
      } else {
        return (<th onClick={this.clickDateSort.bind(this)} className="sort-field" scope="col">Дата начала &uarr;</th>)
      }
    } else {
      return (<th onClick={this.clickDateSort.bind(this)} className="sort-field" scope="col">Дата начала</th>);
    }
  }



  clickNameSort() {

    this.props.onSortName();
    if (this.props.adminEventsSort.field === 'name') {
      if (this.props.adminEventsSort.dierection === 'down') {
        this.getSortEvents(this.props.page, this.props.adminEventsSort.field, 'up');
      } else {this.getSortEvents(this.props.page, this.props.adminEventsSort.field, 'down');}
    } else {
      this.getSortEvents(this.props.page, 'name', this.props.adminEventsSort.dierection);
    }

  }

  clickDateSort() {

    this.props.onSortDateStart();

    if (this.props.adminEventsSort.field === 'date_start') {
      if (this.props.adminEventsSort.dierection === 'down') {
        this.getSortEvents(this.props.page, this.props.adminEventsSort.field, 'up');
      } else {this.getSortEvents(this.props.page, this.props.adminEventsSort.field, 'down');}
    } else {
      this.getSortEvents(this.props.page, 'date_start', this.props.adminEventsSort.dierection);
    }

  }

  rendEvents() {
    var arr = [];
       this.props.adminEvents.map((el) => {
         arr.push(
           <AdminEvent key={el._id}
                      id={el._id}
                      user={el.user}
                      name={el.name}
                      description={el.description}
                      importance={el.importance}
                      place={el.place}
                      dateStart={el.date_start}
                      dateEnd={el.date_end}
                      deleted={el.deleted}
                      getEvents={this.getEvents.bind(this)}
           />);

        });

        return arr;
  }

  render () {

            return (
                <table className="table table-bordered table-sm table-striped">
                  <thead className="thead-dark">
                    <tr align="center" valign="center">
                      <th scope="col">User</th>
                      {this.rendHeaderName()}
                      <th scope="col">Описание</th>
                      <th scope="col">Важность</th>
                      <th scope="col">Место</th>
                      {this.rendHeaderDateStart()}
                      <th scope="col">Дата окончания</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        this.rendEvents()
                    }
                  </tbody>
                </table>

    );
  }

}

export default withRouter(connect(
  state => ({
    adminEvents: state.adminEvents,
    adminEventsSort: state.adminEventsSort,
    eventsFilter: state.adminEventsFilter
  }),
  dispatch => ({
    onGetEvents: (page, field, direction, deleted, username) => {

      dispatch(GetAllEvents(page, field, direction, deleted, username));
    },
    onSortName: () => {
        dispatch({ type: 'ADMIN_CHANGE_SORT_EVENTS', payload: 'name' });
    },
    onSortDateStart: () => {
        dispatch({ type: 'ADMIN_CHANGE_SORT_EVENTS', payload: 'date_start' });
    }
  })
)(AdminEventsTable));
