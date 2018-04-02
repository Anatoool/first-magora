import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const deleteUser = (id) => {

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('DELETE', '/api/users/' + id);

    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.status, xhr.statusText);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(null);
  });

}

const undeleteUser = (id) => {

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('PUT', '/api/users/' + id);

    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.status, xhr.statusText);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(null);
  });

}

class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      role: this.props.role
    }
  }

  deleteUser() {
    deleteUser(this.props.id).then( () => {
      this.props.getUsers();
      this.setState({role: 'banned'});
    }, (status, statusText) => {
      console.log('Status:', status);
      console.log('statusText:', statusText);
    });
  }

  undeleteUser() {
      undeleteUser(this.props.id).then( () => {
      this.props.getUsers();
      this.setState({role: 'user'});
    }, (status, statusText) => {
      console.log('Status:', status);
      console.log('statusText:', statusText);
    });
  }

  clickLink() {
    this.props.onClickUsername(this.props.login);
  }

  rendUser() {

    if (this.state.role !== 'banned') {
      return(
        [
          <td key="1" align="center">
            <Link to={'/admin/1'} onClick={this.clickLink.bind(this)}>
              {this.props.login}
            </Link>
          </td>,
          <td key="2">{this.props.name}</td>,
          <td key="3">{this.props.email}</td>,
          <td key="4" align="center">
            <button className="btn btn-danger btn-sm"
                    data-toggle="modal"
                    style={{marginTop: '3px'}}
                    data-target={"#myModal" + this.props.id}>Del
            </button>

            <div className="modal fade" id={"myModal" + this.props.id}>
              <div className="modal-dialog">
                <div className="modal-content">

                <div className="modal-header">
                  <h4 className="modal-title">Вы действительно хотите забанить этого пользователя?</h4>
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>

                <div className="modal-body">
                  {'id:' + this.props.id}
                  <br />
                  {'Login:' + this.props.login}
                </div>

                <div className="modal-footer">
                  <button onClick={this.deleteUser.bind(this)} type="button" className="btn btn-danger" data-dismiss="modal">Удалить</button>
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
          <td key="1" className="table-danger" align="center">
            <Link to={'/admin/1'} onClick={this.clickLink.bind(this)}>
              {this.props.login}
            </Link>
          </td>,
          <td key="2" className="table-danger">{this.props.name}</td>,
          <td key="3" className="table-danger">{this.props.email}</td>,
          <td key="4" align="center" className="table-danger">
            <button
                  data-target={"#myModal" + this.props.id}
                  data-toggle="modal"
                  className="btn btn-sm btn-secondary"
                  style={{marginTop: '3px'}}>Undel</button>
            <div className="modal fade" id={"myModal" + this.props.id}>
              <div className="modal-dialog">
                <div className="modal-content">

                <div className="modal-header">
                  <h4 className="modal-title">Вы действительно хотите восстановить права этого пользователя?</h4>
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>

                <div className="modal-body">
                  {'id:' + this.props.id}
                  <br />
                  {'Login:' + this.props.login}
                </div>

                <div className="modal-footer">
                  <button onClick={this.undeleteUser.bind(this)} type="button" className="btn btn-danger" data-dismiss="modal">Восстановить</button>
                  <button type="button" className="btn btn-primary" data-dismiss="modal">Отмена</button>
                </div>

                </div>
              </div>
            </div>
          </td>
        ]
      );
    }
  }

  render () {

    return (
      <tr>
        {
          this.rendUser()
        }
      </tr>
    );
  }

}

export default connect(
  state => ({
    users: state.users.users
  }),
  dispatch => ({
    onClickUsername: (login) => {
      dispatch({ type: 'ADMIN_CHANGE_EVENTS_FILTER_USERNAME', payload: login });
    }
  })
)(User);
