import React, { Component } from 'react';

import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

import { connect } from 'react-redux';

import '../../styles/login.scss';

class LSForm extends Component {

  constructor(props) {
    super(props);
    this.state = { isLogin: true };
  }

  componentWillMount() {
    console.log('mount');
    this.props.onMount();
  }

  changeLoginState() {
    this.setState({ isLogin: !this.state.isLogin });
  }

  handleLogin(values) {
    console.log(values, 'login');
  }

  handleSignUp(values) {

    let user = {
      login: values.login,
      password: values.password,
      email: values.email
    };

    /*let usersJSON = localStorage.getItem('Users');//Получаем массив
    let usersArray = JSON.parse(usersJSON);// Парсим
    usersArray.push(user);//Add user to array
    //console.log(usersArray);
    usersJSON = JSON.stringify(usersArray);//code to JSON
    localStorage.setItem('Users', usersJSON);//Rewrite Users store*/

    // let usersJSON = JSON.stringify(users);
    // localStorage.setItem('Users', usersJSON);
    // console.log( JSON.parse( localStorage.getItem('Users') ) );

    console.log(user, 'SignUp');
    console.log(values.password);
  }

  render() {

    if (this.state.isLogin === true) {
      return (
        <div>
          <ul className="tab-group">
            <li className="tab" onClick={ this.changeLoginState.bind(this) }>Sign Up</li>
            <li className="tab active">Log In</li>
          </ul>
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
            <SignUpForm onSubmit={this.handleSignUp}/>
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
