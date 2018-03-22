import React, { Component } from 'react';

class ProfileCard extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="container card-container">
        <div className="row">
        <div className="col-12">
        <div className="card card-inverse text-white" style={{backgroundColor: '#333', borderColor: '#333'}}>
        <div className="card-block">
        <div className="row">

          <div className="col-md-8 col-sm-8">
            <h2 className="card-title">Name: {this.props.userProfile.name}</h2>
            <p className="card-text"><strong>Login: </strong> {this.props.userProfile.login} </p>
            <p className="card-text"><strong>Email: </strong> {this.props.userProfile.email} </p>
          </div>

          <div className="col-md-4 col-sm-4 text-center">
            <div className="img-profail-container">
              <img className="btn-md" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqzQ-m6hw_PMbnJk60Mw_hpiN8EH8vsjrNd67nTbBr_aEMgZZ_" alt="" />
            </div>
            <button type="button" className="btn btn-primary btn-edit" onClick={this.props.changeEditable}>Изменить</button>
          </div>

        </div>
        </div>
        </div>
        </div>
        </div>
      </div>
    );
  }

}

export default ProfileCard;
