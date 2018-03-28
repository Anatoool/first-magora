import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

import { validate } from './validateForm';

const renderField = ({ input, label, type, className, meta: { asyncValidating, touched, error } }) => (
  <div>
    <div className={asyncValidating ? 'async-validating' : ''}>
      <input {...input} className={className} type={type} placeholder={label}/>
      {touched && error && <span className="error-event alert alert-danger">{error}</span>}
    </div>
  </div>
);

class EditProfileForm extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="container">
        <div className="row">
          <form onSubmit={ this.props.handleSubmit } className="event-form col-md-8 col-11 bg-dark">

              <h1 className="">Edit profile</h1>

              <div className="form-group">
                <label htmlFor="form-name" className="text-light">Edit name</label>
                <Field name="name" id ="form-name"
                component={ renderField } type="text" className="form-control"
                val = {this.props.userProfile.name}/>
              </div>

              <div className="form-group">
                <label htmlFor="form-email" className="text-light">Edit email</label>
                <Field name="email" id ="form-name"
                component={ renderField } type="text" className="form-control"
                val = {this.props.userProfile.email}/>
              </div>


            <button type="submit" className="btn btn-primary btn-edit-form">Save</button>
            <div className="btn btn-primary btn-edit-form" onClick={this.props.changeEditable}>Cancel</div>
          </form>
        </div>
      </div>
    );
  }

}

EditProfileForm = reduxForm({
  form: 'EditProfileForm', // a unique name for this form
  validate: validate,
  initialValues: {
                  }
})(EditProfileForm);

export default EditProfileForm;
