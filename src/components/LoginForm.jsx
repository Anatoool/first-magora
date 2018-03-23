import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import submit from './validate/submitValidate';

import { Redirect, Link } from 'react-router-dom';

import getCookie from './cookie/getCookie';


// const renderField = ({ input, label, type, meta: { asyncValidating, touched, error } }) => (
//   <div>
//     <div className={asyncValidating ? 'async-validating' : ''}>
//       <input {...input} type={type} placeholder={label}/>
//       {touched && error && <span>{error}</span>}
//     </div>
//   </div>
// );

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = { token: getCookie('token') };
  }

  render() {
    const { handleSubmit, error} = this.props;

    if (this.state.token !== null) {
        return <Redirect to='/homepage/1' />;

    } else {
      return (
          <form onSubmit={ handleSubmit(submit.bind(this)) } className="form">

            <h1>Авторизация</h1>

              <div className="field-wrap">
                <Field name="login" component={ renderField }  type="text" label="Login"/>
              </div>

              <div className="field-wrap">
                <Field name="password" component={ renderField }  type="password" label="Password"/>
              </div>
              {error && <span className="errorLogin">{error}</span>}
              <button className="button button-block">Log In</button>
<Link to='/homepage'>Home</Link>
          </form>
      );
    }
  }

}

LoginForm = reduxForm({
  form: 'loginForm' // a unique name for this form

})(LoginForm);

export default LoginForm;
