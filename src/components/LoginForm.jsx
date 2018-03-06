import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import submit from './validate/submitValidate';


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
  }

  render() {

    const { error} = this.props;

    return (
        <form onSubmit={ this.props.handleSubmit(submit) } className="form">

          <h1>Авторизация</h1>

            <div className="field-wrap">
              <Field name="login" component={ renderField }  type="text" label="Login"/>
            </div>

            <div className="field-wrap">
              <Field name="password" component={ renderField }  type="password" label="Password"/>
            </div>
            {error && <span className="errorLogin">{error}</span>}
            <button className="button button-block">Log In</button>

        </form>
    );
  }

}

LoginForm = reduxForm({
  form: 'loginForm' // a unique name for this form
  
})(LoginForm);

export default LoginForm;
