import React, { Component } from 'react';
import './main.css';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

class Payment extends Component {
  onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then((response) => {
      response.json().then((data) => {
        alert(`We are in business, ${data.email}`);
      });
    });
  };
  render() {
    return (
      // ...
      <>
        <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_AKE4qQMlAqGaCDpOW8Emr6SJ00hZ4VJX4l"
        />
      </>
    );
  }
}

export default Payment;
