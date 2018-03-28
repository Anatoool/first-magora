import React, { Component } from 'react';
import dog from '../../images/dog.png';
//import axios from 'axios';

class Admin extends Component {

  render () {
    return (
      <div>
        Hello Admin
    		<img src={dog} className="small-img"/>
        <div onClick = {this.AjaxTest.bind(this)}>Запрос</div>
      </div>
    );
  }

}

export default Admin;
