import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import GetAllEvents from '../../reducer-actions/getAllEvents';

class adminEventsFilter extends Component {

  constructor(props) {
    super(props);
    this.state = {timerId: '123'}
  }

  renderCheckbox() {
    if (this.props.eventsFilter.deletedVisible === true) {
      return <input onChange={this.changeDeleted.bind(this)} type="checkbox"  defaultChecked/>;
    } else {
      return <input type="checkbox" onChange={this.changeDeleted.bind(this)}/>;
    }
  }

  changeDeleted () {
    this.props.history.push('/admin/events-1');
    const page = this.props.adminEventsNumber.currentNumber;
    const field = this.props.adminEventsSort.field;
    const dierection = this.props.adminEventsSort.dierection;
    const deleted = this.props.eventsFilter.deletedVisible;
    const username = this.props.eventsFilter.username;
    this.props.onChangeCheckbox(page, field, dierection, !deleted, username);

  }

  getEvents() {
    this.props.history.push('/admin/events-1');
    const page = this.props.adminEventsNumber.currentNumber;
    const field = this.props.adminEventsSort.field;
    const dierection = this.props.adminEventsSort.dierection;
    const deleted = this.props.eventsFilter.deletedVisible;
    const username = this.filterNameInput.value;
    this.props.onRequestNameFilter(page, field, dierection, deleted, username);
    //this.props.history.push();
  }

  nameFilterChange () {

    this.props.onChangeNameFilter(this.filterNameInput.value);
    clearTimeout(this.state.timerId);
    const timerId = setTimeout(this.getEvents.bind(this), 1000);
    this.setState({timerId: timerId});

  }

  render () {

    return (
          <div className="row" style={{ maxWidth: '100%', paddingLeft: '10px' }}>
              <div className="col-12">
                <h4 style={{ marginTop: '4px' }}>Фильтры:</h4>
              </div>
              <div className="input-group input-group-sm mb-3 col-5">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-sm">Username</span>
                </div>
                <input onChange={this.nameFilterChange.bind(this)}
                       ref={(input) => this.filterNameInput = input}
                       defaultValue={this.props.eventsFilter.username}
                       type="text" className="form-control"
                       aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
              </div>
              <div className="col-5" style={{ paddingTop: '4px' }}>
                <span style={{verticalAlign: 'top', marginRight: '4px', fontSize: '1em'}}>Show deleted:</span>
                <label className="switch">
                  {this.renderCheckbox()}
                  <span className="slider round"></span>
                </label>
              </div>
          </div>
    );
  }

}

export default withRouter(connect(
  state => ({
    eventsFilter: state.adminEventsFilter,
    adminEventsNumber: state.adminEventsNumber,
    adminEventsSort: state.adminEventsSort
  }), dispatch => ({
    onChangeCheckbox: (number, field, direction, deleted, username) => {
      dispatch({ type: 'ADMIN_CHANGE_EVENTS_FILTER_DELETED' });
      dispatch({ type: 'CHANGE_PAGE_ADMIN_EVENTS', payload: 1 });//
      dispatch(GetAllEvents(1, field, direction, deleted, username));
    },
    onChangeNameFilter: (value) => {
      dispatch({ type: 'ADMIN_CHANGE_EVENTS_FILTER_USERNAME', payload: value});
    },
    onRequestNameFilter: (number, field, direction, deleted, username) => {
      dispatch({ type: 'CHANGE_PAGE_ADMIN_EVENTS', payload: 1 });
      dispatch(GetAllEvents(1, field, direction, deleted, username));
    }
  })
)(adminEventsFilter));
