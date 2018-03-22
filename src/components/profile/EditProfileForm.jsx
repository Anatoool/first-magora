import React, { Component } from 'react';

class EditProfileForm extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="container">
        <div className="row">
          <form onSubmit={ this.props.handleSubmit } className="event-form col-md-8 col-11 bg-dark">
            <button type="button" className="btn btn-primary btn-edit" onClick={this.props.changeEditable}>Сохранить</button>
            <button type="button" className="btn btn-primary btn-edit" onClick={this.props.changeEditable}>Отменить</button>
          </form>
        </div>
      </div>
    );
  }

}

export default EditProfileForm;
