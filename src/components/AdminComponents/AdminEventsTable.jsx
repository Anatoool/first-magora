import React, { Component } from 'react';
import { connect } from 'react-redux';

import GetAllEvents from '../../reducer-actions/getAllEvents';
import AdminEvent from './AdminEvent';


class AdminEventsTable extends Component {

    constructor(props) {
      super(props);
      this.props.onGetEvents(this.props.page, this.props.adminEventsSort.field, this.props.adminEventsSort.dierection);
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
        this.props.onGetEvents(this.props.page, this.props.adminEventsSort.field, 'up');
      } else {this.props.onGetEvents(this.props.page, this.props.adminEventsSort.field, 'down');}
    } else {
      this.props.onGetEvents(this.props.page, 'name', this.props.adminEventsSort.dierection);
    }

  }

  clickDateSort() {

    this.props.onSortDateStart();

    if (this.props.adminEventsSort.field === 'date_start') {
      if (this.props.adminEventsSort.dierection === 'down') {
        this.props.onGetEvents(this.props.page, this.props.adminEventsSort.field, 'up');
      } else {this.props.onGetEvents(this.props.page, this.props.adminEventsSort.field, 'down');}
    } else {
      this.props.onGetEvents(this.props.page, 'date_start', this.props.adminEventsSort.dierection);
    }

  }

  rendEvents() {
    var arr = [];

       this.props.adminEvents.map(function(el) {
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
           />);

        });

        return arr;
  }

  render () {

            return (
                <table className="table">
                  <thead className="thead-dark">
                    <tr>
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

export default connect(
  state => ({
    adminEvents: state.adminEvents,
    adminEventsSort: state.adminEventsSort
  }),
  dispatch => ({
    onGetEvents: (page, field, direction) => {
      dispatch(GetAllEvents(page, field, direction));
      dispatch({ type: 'CHANGE_COUNT_PAGE_ADMIN_EVENTS', payload: page });
    },
    onSortName: () => {
        dispatch({ type: 'ADMIN_CHANGE_SORT_EVENTS', payload: 'name' });
    },
    onSortDateStart: () => {
        dispatch({ type: 'ADMIN_CHANGE_SORT_EVENTS', payload: 'date_start' });
    }
  })
)(AdminEventsTable);
