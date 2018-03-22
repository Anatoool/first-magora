import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserHeader from '../UserHeader';
import ProfileCard from './ProfileCard';
import EditProfileForm from './EditProfileForm';


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

  render () {
    return (
      <div>
        <UserHeader login={this.props.login} page="profile"/>
        { !this.state.editing ?
          <ProfileCard userProfile={this.props.userProfile} changeEditable={this.changeEditable.bind(this)}/> :
          <EditProfileForm
            userProfile={this.props.userProfile}
            changeEditable={this.changeEditable.bind(this)}
            
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
    //ненужный диспатч, но пока пусть будет как шаблон для редактирования
    onLoadProfile: (response) => {
      dispatch({ type: 'LOAD_DATA', payload: response });
    }
  })
)(Profile);
