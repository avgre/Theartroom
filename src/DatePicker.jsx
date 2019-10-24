import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import styled from 'styled-components';
import { DayPickerSingleDateController, SingleDatePicker } from 'react-dates';
const Centered = styled('div')`
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: black;
`;
class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      isDayBlocked: null,
    };
  }
  async componentDidMount() {
    let response = await fetch('/api/unavailabledates');
    let json = await response.json();
    this.props.dispatch({
      type: 'SET_UNAVAILABLE_DATES',
      payload: json.unavailableDates,
    });
  }
  isBlocked = (day) => {
    //server
    return this.props.unavailableDates.some((date) => day.isSame(date, 'day'));
  };
  handleDateChange = (date) => {
    this.setState({ date });
    console.log(this.state);
  };

  //date.toDate()
  handleSubmit = (evt) => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append('date', this.state.date);
    fetch('/add-date', {
      method: 'POST',
      credentials: 'same-origin',
      body: formData,
    });
  };

  render() {
    return (
      <Centered>
        <div className="App">
          <SingleDatePicker
            showClearDate={true}
            block={false}
            numberOfMonths={1}
            date={this.state.date}
            onDateChange={(date) => this.handleDateChange(date)}
            focused={this.state.focused}
            onFocusChange={({ focused }) => this.setState({ focused })}
            openDirection="down"
            hideKeyboardShortcutsPanel={true}
            isDayBlocked={this.isBlocked}
          />
        </div>
      </Centered>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  return { unavailableDates: state.unavailableDates };
};

export default connect(mapStateToProps)(DatePicker);
