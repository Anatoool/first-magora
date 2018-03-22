import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserHeader from '../UserHeader';
import ProfileCard from './ProfileCard';
import EditProfileForm from './EditProfileForm';

import getCookie from '../cookie/getCookie';


import '../../../styles/common/homepage.scss';
import './profile.scss';

const sendProfile = (values) => {

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    const valuesJSON = JSON.stringify(values);
    const token = getCookie('token');

    var body = {
      profile: valuesJSON,
      token: token
    };

    body = JSON.stringify(body);

    xhr.open('PUT', '/user/profile/edit');

    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(body);
  });

}

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false
    }
  }

  changeEditable() {
    this.setState({editing: !this.state.editing});
  }

  handleSubmit(values) {
    sendProfile(values).then( (response) => {
      //this.setState({eventSent: true});
      const res = JSON.parse(response);
      if (res.status === 'updated') {
        const profile = {
          login: this.props.userProfile.login,
          name: values.name,
          email: values.email
        }
        this.props.onEditProfile(profile);
        console.log('Профайл обновлен');
        this.setState({editing: !this.state.editing});
      } else {
        console.log('Ошибка обновления');
      }
    });

  }

  render () {
    return (
      <div>
        <UserHeader login={this.props.login} page="profile"/>
        { !this.state.editing ?
          <ProfileCard userProfile={this.props.userProfile} changeEditable={this.changeEditable.bind(this)}/> :
          <EditProfileForm
            onSubmit={this.handleSubmit.bind(this)}
            userProfile={this.props.userProfile}
            changeEditable={this.changeEditable.bind(this)}
            initialValues={{ name: this.props.userProfile.name, email: this.props.userProfile.email }}
          />}

      </div>
    );
  }

}

export default connect(
  state => ({
    userProfile: state.userProfile
  }),
  dispatch => ({
    onEditProfile: (profile) => {
      dispatch({ type: 'EDIT_PROFILE', payload: profile });
    }
  })
)(Profile);
