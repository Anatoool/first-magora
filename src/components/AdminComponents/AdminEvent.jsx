import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

function formatDate(date) {

  var dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  var mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  var yyyy = date.getFullYear();

  return dd + '.' + mm + '.' + yyyy;
}

const deleteEvent = (id) => {

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('DELETE', '/api/admin/events/' + id);

    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.status, xhr.statusText);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(null);
  });

}

class AdminEvent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      deleted: this.props.deleted
    }
  }

  editClick() {
    this.props.onEditEvent(this.props.id,
                          this.props.name,
                          this.props.description,
                          this.props.importance,
                          this.props.place,
                          this.props.dateStart,
                          this.props.dateEnd,
                          this.props.place
                          );
    this.setState({editable: true});
  }

  deleteEvent() {
    deleteEvent(this.props.id).then( () => {
      this.setState({deleted: true});
      this.props.getEvents();
    }, (status, statusText) => {
      console.log('Status:', status);
      console.log('statusText:', statusText);
    });
  }

  rendEvent() {

    var dateStart = new Date(this.props.dateStart);
    dateStart = formatDate(dateStart);

    var dateEnd = new Date(this.props.dateEnd);
    dateEnd = formatDate(dateEnd);

    if (this.state.deleted === false) {
      return(
        [
          <td key="1" align="center">{this.props.user}</td>,
          <td key="2">{this.props.name}</td>,
          <td key="3">{this.props.description}</td>,
          <td key="4">{this.props.importance}</td>,
          <td key="5">{this.props.place}</td>,
          <td key="6">{dateStart}</td>,
          <td key="7">{dateEnd}</td>,
          <td key="8" align="center">
            <Link to={'/admin/event/' + this.props.id} style={{marginTop: '3px'}} className="btn btn-secondary btn-sm">Edit</Link>
            <button className="btn btn-danger btn-sm"
                    data-toggle="modal"
                    style={{marginTop: '3px'}}
                    data-target={"#myModal" + this.props.id}>Del
            </button>

            <div className="modal fade" id={"myModal" + this.props.id}>
              <div className="modal-dialog">
                <div className="modal-content">

                <div className="modal-header">
                  <h4 className="modal-title">Вы действительно хотите удалить это событие?</h4>
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>

                <div className="modal-body">
                  {'id:' + this.props.id}
                  <br />
                  {'Название:' + this.props.name}
                </div>

                <div className="modal-footer">
                  <button onClick={this.deleteEvent.bind(this)} type="button" className="btn btn-danger" data-dismiss="modal">Удалить</button>
                  <button type="button" className="btn btn-primary" data-dismiss="modal">Отмена</button>
                </div>

                </div>
              </div>
            </div>
          </td>
        ]
      );
    } else {
      return(
        [
          <td key="1" className="table-danger">{this.props.user}</td>,
          <td key="2" className="table-danger">{this.props.name}</td>,
          <td key="3" className="table-danger">{this.props.description}</td>,
          <td key="4" className="table-danger">{this.props.importance}</td>,
          <td key="5" className="table-danger">{this.props.place}</td>,
          <td key="6" className="table-danger">{dateStart}</td>,
          <td key="7" className="table-danger">{dateEnd}</td>,
          <td key="8" align="center" className="table-danger">
            <Link to={'/admin/event/' + this.props.id}
                  className="btn btn-sm btn-secondary"
                  style={{marginTop: '3px'}}>Edit</Link>
          </td>
        ]
      );
    }
  }

  render () {
    if (this.state.editable === true) {
        return <Redirect to='/editeventAdmin' />;
    }

    return (
      <tr>
        {
          this.rendEvent()
        }
      </tr>
    );
  }

}

export default connect(
  state => ({
    userProfile: state.homepageNumber
  }),
  dispatch => ({
    onEditEvent: (id, name, description, importance, place, dateStart, dateEnd) => {
      const editEvent =
      {
        id: id,
        name: name,
        description: description,
        importance: importance,
        address: place,
        dateStart: dateStart,
        dateEnd: dateEnd
      };
      dispatch({ type: 'SET_EDITABLE_EVENT', payload: editEvent });
    }
  })
)(AdminEvent);
