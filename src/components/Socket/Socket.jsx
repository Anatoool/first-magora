import React, { Component } from 'react';
import io from 'socket.io-client';

class Socket extends Component {

  constructor(props) {
    super(props);
    this.socket = io();
    this.state = { pushArray: []};
  }

  componentDidMount() {

    this.socket.on("Delete_Event", (eventName) => {
                  this.addPushDeleteEvent(eventName);
              });

    this.socket.on("First_event_achievement", () => {
                  this.addPushFirstEventAchievement();
              });
  }

  addPushDeleteEvent(eventName) {
    let newArr = this.state.pushArray.slice();
    let newPush = {
      type: 'Администратор удалил ваше событие!',
      message: 'Название события: ' + eventName
    }
    newArr.push(newPush);
    this.setState({pushArray: newArr});
  }

  addPushFirstEventAchievement () {
    let newArr = this.state.pushArray.slice();
    let newPush = {
      type: 'Поздравляем!',
      message: 'Получено достижение: \"Первое событие!\"'
    }
    newArr.push(newPush);
    this.setState({pushArray: newArr});
  }

  pushesRender() {
    var arr = [];

       this.state.pushArray.map(function(el, index) {
         console.log(index);
         arr.push(
           <div key={index} className="alert alert-success alert-dismissible fade show col col-11 col-sm-7 myPush" role="alert">
             <strong>{el.type}</strong><br/>{el.message}
             <button type="button" className="close" data-dismiss="alert" aria-label="Close">
               <span id={"push-close" + index} aria-hidden="true">&times;</span>
             </button>
           </div>
         );

        });

        return arr;
  }

  render () {
    return (
      <section className="socket-push-container row justify-content-center">

        {this.pushesRender()}

      </section>
    );
  }

}

export default Socket;
