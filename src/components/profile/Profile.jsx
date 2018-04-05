import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserHeader from '../UserHeader';
import ProfileCard from './ProfileCard';
import EditProfileForm from './EditProfileForm';

import getCookie from '../../cookie/getCookie';

import httpUserRequest from '../../requests/httpUserRequest';

import '../../../styles/common/homepage.scss';
import './profile.scss';

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

    const token = getCookie('token');
    const valuesJSON = JSON.stringify(values);

    const body = { profile: valuesJSON, token: token };

    var reqHeaders = new Headers();
    reqHeaders.append("Content-Type", 'application/json');

    const URL = '/api/user/profile';
    const init = {
      method: 'PUT',
      headers: reqHeaders,
      body: JSON.stringify(body)
    };

    const dispatch = this.props.returnDispatch();

    httpUserRequest(URL, init, dispatch).then((res) => {
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
    },
    returnDispatch: () => dispatch
  })
)(Profile);
