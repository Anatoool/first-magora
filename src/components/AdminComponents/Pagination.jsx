import React, { Component } from 'react';

class Pagination extends Component {

  constructor(props) {
    super(props);
  }

  handleClick(event) {
    this.props.handleClick(event.target.innerHTML);
  }

  renderLinks(count, currentPage){

    var countLinks = 0;

    if (count === 0) {
      countLinks = 1;
    } else if (count % 10 === 0) {
      countLinks = Math.floor(count / 10);
    } else {
      countLinks = Math.floor(count / 10) + 1;
    }

    var arr = [];

    for (var i = 1; i <= countLinks; i++) {
      if ( i !== currentPage) {
        arr.push(
          <li className="page-item" key = {i}>
            <div className="page-link" onClick={this.handleClick.bind(this)}>{i}</div>
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
              {this.renderLinks(this.props.count, this.props.currentPage)}
            </ul>
          </div>
        </div>
    );
  }

}

export default Pagination;
