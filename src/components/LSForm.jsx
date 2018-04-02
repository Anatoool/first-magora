import React, { Component } from 'react';

import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

import { connect } from 'react-redux';

import '../../styles/login.scss';

const sendUser = (values) => {

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    const valuesJSON = JSON.stringify(values);

    var body = {
      user: valuesJSON,
    };

    body = JSON.stringify(body);

    xhr.open('POST', '/api/users');

    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(body);
  });

}

class LSForm extends Component {

  constructor(props) {
    super(props);
    this.state = { isLogin: true, registration: false };
  }

  componentWillMount() {
    this.props.onMount();
  }

  changeLoginState() {
    this.setState({ isLogin: !this.state.isLogin });
  }

  handleLogin(values) {
    console.log(values, 'login');
  }

  handleSignUp(values) {

    const user = {
      login: values.login,
      password: values.password,
      email: values.email
    };

    sendUser(user).then((resolve)=> {

      this.setState({registration: true});
      this.changeLoginState();
    });

  }

  render() {

    if (this.state.isLogin === true) {
      return (
        <div>
          <ul className="tab-group">
            <li className="tab" onClick={ this.changeLoginState.bind(this) }>Sign Up</li>
            <li className="tab active">Log In</li>
          </ul>

          {this.state.registration === true ?
            <div className="row justify-content-center">
              <div className="alert alert-primary col-10 col-md-6" style={{maxWidth: '100%'}} role="alert">
                Вы успешно зарегистрированы!
              </div>
            </div>
            : []
          }
          <LoginForm onSubmit={this.handleLogin}/>
        </div>
      );
    } else {
      return (
        <div>
          <ul className="tab-group">
            <li className="tab active">Sign Up</li>
            <li className="tab" onClick={ this.changeLoginState.bind(this) }>Log In</li>
          </ul>
            <SignUpForm onSubmit={this.handleSignUp.bind(this)}/>
        </div>
      );
    }

  }
}

// Decorate the form component

export default connect(
  state => ({
    userBanned: state.userBanned
  }),
  dispatch => ({
    onMount: () => {
      dispatch({ type: 'USER_BAN', payload: false });
    }
  })
)(LSForm);
