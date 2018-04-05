import React, { Component } from 'react';

class UsersFilter extends Component {

  constructor(props) {
    super(props);
    this.state = {timerId: '123'}
  }

  changeDeleted() {
    this.props.filterDeletedClick();
  }

  changeLoginFilter() {
    this.props.changeLoginFilter(this.filterNameInput.value);

    clearTimeout(this.state.timerId);
    const timerId = setTimeout(this.props.filterLoginChange, 1000);
    this.setState({timerId: timerId});
  }

  renderToggle () {
    if (this.props.defaultChecked) {
      return <input onChange={this.changeDeleted.bind(this)} type="checkbox" defaultChecked/>;
    } else {
      return <input onChange={this.changeDeleted.bind(this)} type="checkbox"/>;
    }
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
                <input onChange={this.changeLoginFilter.bind(this)}
                       ref={(input) => this.filterNameInput = input}
                       type="text" className="form-control"
                       aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                       defaultValue={this.props.defaultNameFilter}/>
              </div>
              <div className="col-5" style={{ paddingTop: '4px' }}>
                <span style={{verticalAlign: 'top', marginRight: '4px', fontSize: '1em'}}>Show deleted:</span>
                <label className="switch">
                  {this.renderToggle()}
                  <span className="slider round"></span>
                </label>
              </div>
          </div>
    );
  }

}

export default UsersFilter;
