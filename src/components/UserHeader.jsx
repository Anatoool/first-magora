import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import deleteCookie from '../cookie/deleteCookie';
import { connect } from 'react-redux';

class UserHeader extends Component {

  constructor(props) {
    super(props);
  }

  rendLinks () {
    if (this.props.page === 'homepage') {
      return (<ul className="navbar-nav">
        <li className="nav-item active">
          <Link className="nav-link" to={'/homepage/' + this.props.homepageNumber.currentNumber}>Events</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/addevent'>New event</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/profile'>Profile</Link>
        </li>
      </ul>);
    } else if (this.props.page === 'addevent') {
      return (<ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to={'/homepage/' + this.props.homepageNumber.currentNumber}>Events</Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link" to='/addevent'>New event</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/profile'>Profile</Link>
        </li>
      </ul>);
    } else if (this.props.page === 'profile') {
      return (<ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to={'/homepage/' + this.props.homepageNumber.currentNumber}>Events</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/addevent'>New event</Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link" to='/profile'>Profile</Link>
        </li>
      </ul>);
    } else if (this.props.page === 'none') {
      return (<ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to={'/homepage/' + this.props.homepageNumber.currentNumber}>Events</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/addevent'>New event</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/profile'>Profile</Link>
        </li>
      </ul>);
    }
  }

  logOut () {
    deleteCookie('token');
  }

  render () {
    return (
          <nav className="header navbar navbar-expand-md navbar-dark bg-dark">
              <div className="col-3 col-md-6">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  {
                    this.rendLinks()
                  }
                </div>
              </div>
              <div className="col-9 col-md-6">
                <span className="navbar-text user-name">
                  { this.props.login }
                  <Link to="/" className="btn btn-secondary log-out" onClick={ this.logOut }>Log out</Link>
                </span>
              </div>
          </nav>
    );
  }

}

export default connect(
  state => ({
    homepageNumber: state.homepageNumber
  }),
  dispatch => ({
    onLogOut: () => {
      dispatch({type: 'USER_BAN', payload: false});
    }
  })
)(UserHeader);
