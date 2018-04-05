import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import GetUsers from '../../reducer-actions/getUsers';

import User from './User';
import Pagination from './Pagination';
import UsersFilter from './UsersFilter';

class UsersTable extends Component {

  constructor(props) {
    super(props);

    const deleted = (this.props.deleted === 'true');
    const namefilter = (this.props.namefilter === '""' ? '' : this.props.namefilter);
    this.state = {currentPage: this.props.page, showDeleted: deleted, loginFilter: namefilter};

    this.props.onGetUsers(this.props.page, deleted, namefilter);
  }

  paginaionClick(linkNumber) {
    this.setState({currentPage: Number(linkNumber)});

    this.props.history.push(
      '/admin/users' +
      '-' + linkNumber +
      '-' + this.props.deleted +
      '-' + this.props.namefilter
    );

    this.props.onGetUsers(linkNumber, this.state.showDeleted, this.state.loginFilter);
  }

  filterDeletedClick() {

    const deleted = (this.state.showDeleted  ? 'false'  : 'true');

    this.props.history.push(
      '/admin/users' +
      '-' + '1' +
      '-' + deleted +
      '-' + this.props.namefilter
    );

    this.props.onGetUsers(1, !this.state.showDeleted, this.state.loginFilter);
    this.setState({currentPage: 1});
    this.setState({showDeleted: !this.state.showDeleted});
  }

  changeLoginFilter(value) {
    this.setState({loginFilter: value});
  }

  filterLoginChange() {
    this.setState({currentPage: 1});

    const loginFilter = (this.state.loginFilter === ''  ? '""'  : this.state.loginFilter);

    this.props.history.push(
      '/admin/users' +
      '-' + '1' +
      '-' + this.props.deleted +
      '-' + loginFilter
    );

    this.props.onGetUsers(1, this.state.showDeleted, this.state.loginFilter);
  }

  getUsers() {
    this.props.onGetUsers(this.state.currentPage, this.state.showDeleted, this.state.loginFilter);
  }

  rendUsers() {
    var arr = [];

       this.props.users.map((el) => {
         arr.push(
           <User key={el._id}
                      id={el._id}
                      login={el.login}
                      name={el.name}
                      email={el.email}
                      role={el.role}
                      getUsers={this.getUsers.bind(this)}
           />);

        });

        return arr;
  }

  render () {
            return (
              <div>
              <UsersFilter filterDeletedClick={this.filterDeletedClick.bind(this)}
                            changeLoginFilter={this.changeLoginFilter.bind(this)}
                            filterLoginChange={this.filterLoginChange.bind(this)}
                            defaultChecked = {this.state.showDeleted}
                            defaultNameFilter={this.state.loginFilter}
              />
                <table className="table table-bordered table-sm table-striped">
                  <thead className="thead-dark">
                    <tr align="center" valign="center">
                      <th scope="col">Login</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        this.rendUsers()
                    }
                  </tbody>
                </table>
                <Pagination count={this.props.usersCount}
                            currentPage={this.state.currentPage}
                            handleClick={this.paginaionClick.bind(this)}/>
              </div>
    );
  }

}

export default withRouter(connect(
  state => ({
    users: state.users.users,
    usersCount: state.users.count
  }),
  dispatch => ({
    onGetUsers: (page, deleted, login) => {
      dispatch(GetUsers(page, deleted, login));
    }
  })
)(UsersTable));
