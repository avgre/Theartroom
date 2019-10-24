import React, { Component } from 'react';
import './main.css';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class Cart extends Component {
  async componentDidMount() {
    const response = await fetch('/api/cart', {});
    const json = await response.json();
    this.props.dispatch({
      type: 'SET_CART',
      payload: json.cart,
    });
  }
  render() {
    if (!this.props.cart) {
      return 'loading';
    }
    return (
      <div>
        {this.props.cart}
        <Button size="small" color="default" component={Link} to="/checkout">
          CHECKOUT
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { cart: state.cart };
};

export default connect(mapStateToProps)(Cart);
