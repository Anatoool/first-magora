import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function formatDate(date) {

  var dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  var mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  var yyyy = date.getFullYear();

  return dd + '.' + mm + '.' + yyyy;
}

class AdminEvent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editable: false
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

  render () {

    if (this.state.editable === true) {
        return <Redirect to='/editeventAdmin' />;
    }

    var dateStart = new Date(this.props.dateStart);
    dateStart = formatDate(dateStart);

    var dateEnd = new Date(this.props.dateEnd);
    dateEnd = formatDate(dateEnd);

    return (
      <tr>
        <td>{this.props.user}</td>
        <td>{this.props.name}</td>
        <td>{this.props.description}</td>
        <td>{this.props.importance}</td>
        <td>{this.props.place}</td>
        <td>{dateStart}</td>
        <td>{dateEnd}</td>
        <td><div onClick={this.editClick.bind(this)} className="btn btn-secondary">Edit</div></td>
      </tr>);
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
