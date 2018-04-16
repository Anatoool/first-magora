import React, { Component } from 'react';
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import io from 'socket.io-client';

import 'react-web-tabs/dist/react-web-tabs.css';
import './styles/notificationPanel.scss';

class NotificationPanel extends Component {

  constructor(props) {
    super(props);
    this.socket = io();
    this.state = {gender: 'male'};
  }

  emitToOneNotification() {
    const login = this.loginInput.value;
    const notification = this.notificationToOneInput.value;
    console.log('ok');
    this.socket.emit("Admin_notification_to_one", login, notification);
  }

  setMale() {
    this.setState({gender: 'male'});
  }

  setFemale() {
    this.setState({gender: 'female'});
  }

  render () {
    return (
      <Tabs
        defaultTab="one"
        onChange={(tabId) => { console.log(tabId) }}
      >
        <TabList>
          <Tab tabFor="one">Уведомление пользователю</Tab>
          <Tab tabFor="two">Уведомление группе</Tab>
        </TabList>
        <TabPanel tabId="one" className="notification-tab">
          <input type="text" className="form-control notification-input"
          aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Имя пользователя"
          ref={(input) => this.loginInput = input} required/>

          <input type="text" className="form-control notification-input"
          aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Уведомление"
          ref={(input) => this.notificationToOneInput = input} required/>

          <button className="btn btn-primary notification-button" onClick={this.emitToOneNotification.bind(this)}>Emit notification</button>
        </TabPanel>

        <TabPanel tabId="two" className="notification-tab">

              <input type="text" className="form-control notification-input"
              aria-label="Small" aria-describedby="inputGroup-sizing-sm" placeholder="Уведомление"
              ref={(input) => this.genderNotificationInput = input} required/>
              <div className="gender-container" onClick={this.setMale.bind(this)}>
                <input type="radio" name="gender" value="male" id="radio-male" defaultChecked/>
                <label htmlFor="radio-male">Муж.</label>
              </div>
              <div className="gender-container" onClick={this.setFemale.bind(this)}>
                <input type="radio" name="gender" value="female" id="radio-female"/>
                <label htmlFor="radio-female">Жен.</label>
              </div>
              <button className="btn btn-primary notification-button" onClick={this.emitToOneNotification.bind(this)}>Emit notification</button>
        </TabPanel>

      </Tabs>
    );
  }

}

export default NotificationPanel;
