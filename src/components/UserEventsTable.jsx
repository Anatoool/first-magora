import React, { Component } from 'react';
import getCookie from './cookie/getCookie';

const request = () => {
  return new Promise((resolve, reject) => {

        const xhr = new XMLHttpRequest();
        const token = getCookie('token');

        var body = {
          token: token
        };

        body = JSON.stringify(body);

        xhr.open('POST', '/user/events/get');

        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(body);
  });
}

class UserEventsTable extends Component {

  getEvents() {
    request().then(resolve => {
        const data = JSON.parse(resolve);
        this.setState({renderTable: data.events});
    });
  }

  rendEvents() {
    var arr = [];

       this.state.renderTable.map(function(el, index){
         arr.push(
           <tr key={index}>
             <td>{el.name}</td>
             <td>{el.description}</td>
             <td>{el.importance}</td>
             <td>{el.place}</td>
             <td>{el.date_start}</td>
             <td>{el.date_end}</td>
           </tr>);

        });

        return arr;
  }

  constructor(props) {
    super(props);
    this.state = { renderTable: [] };
    this.getEvents();
  }

  render () {
            return (
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Название</th>
                    <th scope="col">Описание</th>
                    <th scope="col">Важность</th>
                    <th scope="col">Место</th>
                    <th scope="col">Дата начала</th>
                    <th scope="col">Дата окончания</th>
                  </tr>
                </thead>
                <tbody>
                  {
                      this.rendEvents()
                  }
                </tbody>
              </table>
    );
  }

}

export default UserEventsTable;
