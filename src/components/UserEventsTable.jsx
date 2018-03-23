import React, { Component } from 'react';
import { connect } from 'react-redux';

import GetEvents from '../reducer-actions/getEvents';

function formatDate(date) {

  var dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  var mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  var yyyy = date.getFullYear();

  return dd + '.' + mm + '.' + yyyy;
}

class UserEventsTable extends Component {

    constructor(props) {
      super(props);
      this.props.onGetEvents(this.props.page);
    }

  rendEvents() {
    var arr = [];

       this.props.userEvents.map(function(el, index){

         var dateStart = new Date(el.date_start);
         dateStart = formatDate(dateStart);

         var dateEnd = new Date(el.date_end);
         dateEnd = formatDate(dateEnd);

         arr.push(
           <tr key={index}>
             <td>{el.name}</td>
             <td>{el.description}</td>
             <td>{el.importance}</td>
             <td>{el.place}</td>
             <td>{dateStart}</td>
             <td>{dateEnd}</td>
           </tr>);

        });

        return arr;
  }

  render () {

            return (
                <table className="table">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Название</th>
                      <th scope="col">Описание</th>
                      <th scope="col">Важность</th>
                      <th scope="col">Место</th>
                      <th scope="col">Дата начала</th>
                      <th scope="col">Дата окончания</th>
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
    onGetEvents: (page) => {
      dispatch(GetEvents(page));
      dispatch({ type: 'CHANGE_PAGE', payload: page });
    }
  })
)(UserEventsTable);
