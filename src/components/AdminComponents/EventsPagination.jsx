import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import GetAllEvents from '../../reducer-actions/getAllEvents';

class EventsPagination extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentNumber: this.props.adminEventsNumber.currentNumber
    };
  }

  clickLink(event) {
    const number = Number(event.target.innerHTML);
    this.setState({currentNumber: number});
    this.props.onClickLink(number, this.props.adminEventsSort.field, this.props.adminEventsSort.dierection);
  }

  renderLinks(number){
    var arr = [];
    var currentNumber = this.props.adminEventsNumber.currentNumber;
    for (var i = 1; i <= number; i++) {
      if ( i !== currentNumber) {
        arr.push(
          <li className="page-item" key = {i}>
            <Link onClick={this.clickLink.bind(this)} className="page-link" to={'/admin/' + i}>{i}</Link>
          </li>);
      } else {
        arr.push(
          <li className="page-item active" key = {i}>
            <Link className="page-link" to={'/admin/' + i}>{i}</Link>
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
    adminEventsSort: state.adminEventsSort
  }),
  dispatch => ({
    onClickLink: (number, field, direction) => {
      dispatch({ type: 'CHANGE_PAGE_ADMIN_EVENTS', payload: number });
      dispatch(GetAllEvents(number, field, direction));
    }
  })
)(EventsPagination);
