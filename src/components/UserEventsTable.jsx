import React, { Component } from 'react';
import { connect } from 'react-redux';

import GetEvents from '../reducer-actions/getEvents';
import UserEvent from './UserEvent';


class UserEventsTable extends Component {

    constructor(props) {
      super(props);
      this.props.onGetEvents(this.props.page, this.props.userEventsSort.field, this.props.userEventsSort.dierection);
    }

  rendHeaderName(){
    if (this.props.userEventsSort.field === 'name') {
      if (this.props.userEventsSort.dierection === 'down') {
        return (<th onClick={this.clickNameSort.bind(this)} className="sort-field" scope="col">Название &darr;</th>)
      } else {
        return (<th onClick={this.clickNameSort.bind(this)} className="sort-field" scope="col">Название &uarr;</th>)
      }
    } else {
      return (<th onClick={this.clickNameSort.bind(this)} className="sort-field" scope="col">Название</th>);
    }
  }

  rendHeaderDateStart(){
    if (this.props.userEventsSort.field === 'date_start') {
      if (this.props.userEventsSort.dierection === 'down') {
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
    if (this.props.userEventsSort.field === 'name') {
      if (this.props.userEventsSort.dierection === 'down') {
        this.props.onGetEvents(this.props.page, this.props.userEventsSort.field, 'up');
      } else {this.props.onGetEvents(this.props.page, this.props.userEventsSort.field, 'down');}
    } else {
      this.props.onGetEvents(this.props.page, 'name', this.props.userEventsSort.dierection);
    }

  }

  clickDateSort() {

    this.props.onSortDateStart();

    if (this.props.userEventsSort.field === 'date_start') {
      if (this.props.userEventsSort.dierection === 'down') {
        this.props.onGetEvents(this.props.page, this.props.userEventsSort.field, 'up');
      } else {this.props.onGetEvents(this.props.page, this.props.userEventsSort.field, 'down');}
    } else {
      this.props.onGetEvents(this.props.page, 'date_start', this.props.userEventsSort.dierection);
    }

  }

  rendEvents() {
    var arr = [];

       this.props.userEvents.map(function(el) {

         arr.push(
           <UserEvent key={el._id}
                      id={el._id}
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
    userEvents: state.userEvents,
    userEventsSort: state.userEventsSort
  }),
  dispatch => ({
    onGetEvents: (page, field, direction) => {
      dispatch(GetEvents(page, field, direction));
      dispatch({ type: 'CHANGE_PAGE', payload: page });
    },
    onSortName: () => {
        dispatch({ type: 'CHANGE_SORT', payload: 'name' });
    },
    onSortDateStart: () => {
        dispatch({ type: 'CHANGE_SORT', payload: 'date_start' });
    }
  })
)(UserEventsTable);
