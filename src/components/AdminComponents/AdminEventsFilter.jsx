import React, { Component } from 'react';
import { connect } from 'react-redux';

import GetAllEvents from '../../reducer-actions/getAllEvents';

class adminEventsFilter extends Component {

  constructor(props) {
    super(props);
  }

  renderCheckbox() {
    if (this.props.eventsFilter.deletedVisible === true) {
      return <input onChange={this.changeDeleted.bind(this)} type="checkbox"  defaultChecked/>;
    } else {
      return <input type="checkbox" onChange={this.changeDeleted.bind(this)}/>;
    }
  }

  changeDeleted () {
    const page = this.props.adminEventsNumber.currentNumber;
    const field = this.props.adminEventsSort.field;
    const dierection = this.props.adminEventsSort.dierection;
    const deleted = this.props.eventsFilter.deletedVisible;
    this.props.onChangeCheckbox(page, field, dierection, !deleted);
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
                <input type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
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

export default connect(
  state => ({
    eventsFilter: state.adminEventsFilter,
    adminEventsNumber: state.adminEventsNumber,
    adminEventsSort: state.adminEventsSort
  }), dispatch => ({
    onChangeCheckbox: (number, field, direction, deleted) => {
      dispatch({ type: 'ADMIN_CHANGE_EVENTS_FILTER_DELETED' });
      dispatch(GetAllEvents(number, field, direction, deleted));
    }
  })
)(adminEventsFilter);
