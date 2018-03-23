import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import GetEvents from '../reducer-actions/getEvents';

class Pagination extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentNumber: this.props.homepageNumber.currentNumber
    };
  }

  clickLink(event) {
    const number = Number(event.target.innerHTML);
    this.setState({currentNumber: number});
    this.props.onClickLink(number);
  }

  renderLinks(number){
    var arr = [];
    var currentNumber = this.props.homepageNumber.currentNumber;
    for (var i = 1; i <= number; i++) {
      if ( i !== currentNumber) {
        arr.push(
          <li className="page-item" key = {i}>
            <Link onClick={this.clickLink.bind(this)} className="page-link" to={'/homepage/' + i}>{i}</Link>
          </li>);
      } else {
        arr.push(
          <li className="page-item active" key = {i}>
            <Link className="page-link" to={'/homepage/' + i}>{i}</Link>
          </li>);
      }

    }

     return arr;
  }

  render () {
    return (
        <div className='row'>
          <ul className="pagination" style={{margin: 'auto'}}>
            {this.renderLinks(this.props.homepageNumber.numberPage)}
          </ul>

        </div>
    );
  }

}

export default connect(
  state => ({
    homepageNumber: state.homepageNumber    
  }),
  dispatch => ({
    onClickLink: (number) => {
      dispatch({ type: 'CHANGE_PAGE', payload: number });
      dispatch(GetEvents(number));
    }
  })
)(Pagination);
