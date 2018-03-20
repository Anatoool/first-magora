import React, { Component } from 'react';
import dog from '../images/dog.png';
//import axios from 'axios';

class Admin extends Component {

  AjaxTest() {

    console.log('click!!!');
    // axios.post('/test', {
    //   email: 'email1',
    //   password: 'password1'
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
      // проверяем вернулись запрошенные данные
      if(request.readyState === 4) {
        // добавляем рамку
        alert('4');
        // проверяем успешен ли запрос
        if(request.status === 200) {
          // обнавляем элемент HTML
          alert(request.responseText);
        } else {
          // иначе выводим сообщение об ошибке
          alert(request.status);
          alert(request.statusText);
        }
      }
    }

    var body = {
      password: "123",
      email: "777@ggg.tgtg"
    }

    body = JSON.stringify(body);
    request.open('POST', '/test');
    request.setRequestHeader('Content-Type', 'application/json');
    
    request.send(body);
  }

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
