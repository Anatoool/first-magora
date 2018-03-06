import React, { Component } from 'react';

class Dropdown extends Component {

  constructor(props) {
    super(props);
    this.state = { isOpened: false };
  }

  toggleState() {
    this.setState({ isOpened: !this.state.isOpened });
  }

  add() {
    console.log('Hi');

    localStorage.setItem('key2', 'value');
  }

  render() {
    let dropdownText = '';
    if (this.state.isOpened) {
      dropdownText = <div>Выпавший dropdown</div>;
    }
    return (
      <div>
          <div className="" onClick={this.toggleState.bind(this)}>
            Its dropdown baby!
            {dropdownText}
          </div>
          <button onClick={this.add.bind(this)}>add</button>
      </div>
    );
  }
}

export default Dropdown;
