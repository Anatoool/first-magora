import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import GetAllEvents from '../../reducer-actions/getAllEvents';

class EventsPagination extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentNumber: this.props.startPage
    };
  }

  clickLink(event) {
    const number = Number(event.target.innerHTML);
    this.setState({currentNumber: number});
    this.props.onClickLink(number, this.props.adminEventsSort.field,
                           this.props.adminEventsSort.dierection,
                           this.props.eventsFilter.deletedVisible,
                           this.props.eventsFilter.username);
  }

  renderLinks(number){
    var arr = [];

    if (number === 1) {
      return arr;
    }

    var currentNumber = this.props.adminEventsNumber.currentNumber;
    for (var i = 1; i <= number; i++) {
      if ( i !== currentNumber) {
        arr.push(
          <li className="page-item" key = {i}>
            <Link className="page-link"
              onClick={this.clickLink.bind(this)}
              to={'/admin/events-' + i +
              '-' + this.props.sortfield +
              '-' + this.props.direction +
              '-' + this.props.deleted +
              '-' + this.props.namefilter}>
            {i}</Link>
          </li>);
      } else {
        arr.push(
          <li className="page-item active" key = {i}>
            <div className="page-link">{i}</div>
          </li>);
      }

    }

     return arr;
  }

  render () {

    return (
        <div className='container-fluid'>
          <div className='row' style={{maxWidth: '100%'}}>
            <ul className="pagination" style={{margin: 'auto'}}>
              {this.renderLinks(this.props.adminEventsNumber.numberPage)}
            </ul>
          </div>
        </div>
    );
  }

}

export default connect(
  state => ({
    adminEventsNumber: state.adminEventsNumber,
    adminEventsSort: state.adminEventsSort,
    eventsFilter: state.adminEventsFilter
  }),
  dispatch => ({
    onClickLink: (number, field, direction, deleted, username) => {
      dispatch({ type: 'CHANGE_PAGE_ADMIN_EVENTS', payload: number });
      dispatch(GetAllEvents(number, field, direction, deleted, username));
    }
  })
)(EventsPagination);
