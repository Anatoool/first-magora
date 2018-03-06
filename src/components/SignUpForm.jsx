import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { validate } from './validate/synchValidate';

import asyncValidate from './validate/asyncValidate';

const renderField = ({ input, label, type, meta: { asyncValidating, touched, error } }) => (
  <div>
    <div className={asyncValidating ? 'async-validating' : ''}>
      <input {...input} type={type} placeholder={label}/>
      {touched && error && <span className="error">{error}</span>}
    </div>
  </div>
);

// const renderField = ({ input, label, type, meta: { touched, error } }) => (
//   <div>
//     <div>
//       <input {...input} placeholder={label} type={type}/>
//       {touched && ((error && <span className="error">{error}</span>))}
//     </div>
//   </div>
// );

class SignUpForm extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
        <form onSubmit={ this.props.handleSubmit } className="form">
          <h1>Регистрация</h1>

            <div className="field-wrap">
              <Field name="login" component={ renderField } type="text" label="Login"/>
            </div>

            <div className="field-wrap">
              <Field name="password" component={ renderField } type="password" label="Password"/>
            </div>

            <div className="field-wrap">
              <Field name="email" component={ renderField } type="email" label="Email"/>
            </div>

            <button className="button button-block">Sign Up</button>
        </form>
    );
  }

}

SignUpForm = reduxForm({
  form: 'SignUpForm', // a unique name for this form
  validate,
  asyncValidate
})(SignUpForm);

export default SignUpForm;
