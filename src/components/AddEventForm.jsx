import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
//import moment from 'moment';

import PlacesAutocomplete from 'react-places-autocomplete';
//import { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete';

import {  DatePicker } from 'redux-form-material-ui';

import { validate } from './validate/validateAddEventForm';

import '../../styles/common/eventForm.scss';

const renderField = ({ input, label, type, className, value, meta: { asyncValidating, touched, error } }) => (
  <div>
    <div className={asyncValidating ? 'async-validating' : ''}>
      <input {...input} className={className} type={type} placeholder={label} value={value}/>
      {touched && error && <span className="error-event alert alert-danger">{error}</span>}
    </div>
  </div>
);

const hiddenInput = ({ input, className, val, meta: { asyncValidating, touched, error } }) => (
  <div>
    <div className={asyncValidating ? 'async-validating' : ''}>
      <input {...input} className={className} type='hidden' value={val}/>
      {touched && error && <span className="error-event alert alert-danger">{error}</span>}
    </div>
  </div>
);

const renderTextarea = ({ input, label, type, className, id, meta: { asyncValidating, touched, error } }) => (
  <div>
    <div className={asyncValidating ? 'async-validating' : ''}>
      <textarea {...input} className={className} type={type} id={id} placeholder={label}/>
      {touched && error && <span className="error-event alert alert-danger">{error}</span>}
    </div>
  </div>
);

/*const PlaceField = ({ input, inputProps, onSelect, meta: { asyncValidating, touched, error }}) => (
    <div className={asyncValidating ? 'async-validating' : ''}>
			<PlacesAutocomplete
        {...input}
        inputProps={inputProps}
        onSelect={onSelect}
				/>
			{ touched && error && <span className="error-event alert alert-danger">{error}</span>}
    </div>
	);
*/

const MUIDatePicker = props => (
  <DatePicker
    {...props}
    value={props.val}
  />
);

class AddEventForm extends Component {

  constructor(props) {
    super(props);

    const minDate = new Date();
    this.state = {
        minDateStart: minDate,
        dateStart: minDate,
        dateEnd: minDate,
        address: 'Россия',
        geo: {}
    }
  }

  handleChangeStartDate(event, date) {
    this.setState({dateStart: date});

    if (date > this.state.dateEnd){
      this.setState({dateEnd: date});
    }
  }

  handleChangeEndDate(event, date) {
    this.setState({dateEnd: date});

  }

  onChange (address) {
      this.setState({address: address });

  }

  handleSelectPlace(address) {
    this.setState({address: address });
    this.props.change('address', this.state.address);
  }

  render() {

    const inputProps = {
      value: this.state.address,
      onChange: this.onChange.bind(this)
    }

    return (
      <div className="row">
        <form onSubmit={ this.props.handleSubmit.bind(this) } className="event-form col-md-8 col-11 bg-dark">

          <h1 className="">New event</h1>
            <div className="form-group">
              <Field name="name" component={ renderField } type="text" label="Название" className="form-control"/>
            </div>

            <div className="form-group">
              <label htmlFor="form-description" className="text-light">Описание</label>
              <Field name="description" id ="form-description"
              component={ renderTextarea } type="text" className="form-control"/>
            </div>

            <div className="form-group">
             <label htmlFor="form-importance" className="text-light">Важность события</label>
              <Field name="importance" component="select"
              className="form-control" id="form-importance">
                <option value="Обычное">Обычное</option>
                <option value="Важное">Важное</option>
                <option value="Очень важное">Очень важное</option>
              </Field>
            </div>

            <div className="form-row">

              <div className="col-6">
                <label htmlFor="datestart" className="text-light">Дата начала события:</label>
                <Field className="date-picker" name="dateStart" id="datestart"
                  component={DatePicker}
                  container="inline"
                  hintText="Дата начала события"
                  mode="landscape"
                  format={null}
                  value={this.state.dateStart}
                  minDate={this.state.minDateStart}
                  autoOk={true}
                  onChange={this.handleChangeStartDate.bind(this)}/>
              </div>
              <div className="col-6">
                <label htmlFor="dateend" className="text-light">Дата окончания события:</label>
                <Field className="date-picker" name="dateEnd" id="dateend"
                  component={MUIDatePicker}
                  format={null}
                  container="inline"
                  hintText="Дата окончания события"
                  mode="landscape"
                  val={this.state.dateEnd}
                  minDate={this.state.dateStart}
                  autoOk={true}
                  onChange={this.handleChangeEndDate.bind(this)}/>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="place" className="text-light" style={{marginTop: '10px'}}>Место события</label>
              <PlacesAutocomplete
                id = "place"
                inputProps={inputProps}
                onSelect={this.handleSelectPlace.bind(this)}
                />
            </div>

            <div className="form-group">
              <Field name="address" component={ hiddenInput } val={this.state.address} className="form-control"/>
            </div>

            <button className="btn btn-primary">Add new event</button>
        </form>
      </div>
    );
  }

}

AddEventForm = reduxForm({
  form: 'SignUpForm', // a unique name for this form
  validate: validate,
  initialValues: {importance: 'обычное',
                    dateStart: new Date(),
                    dateEnd: new Date(),
                    address: 'Россия'
                  }
})(AddEventForm);

export default AddEventForm;
