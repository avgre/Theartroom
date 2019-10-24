import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Navbar from './Navbar.jsx';
import ItemForm from './ItemForm.jsx';
import Home from './Home.jsx';
import Market from './Market.jsx';
import AboutMe from './AboutMe.jsx';
import DatePicker from './DatePicker.jsx';
import Payment from './Payment.jsx';
import Cart from './Cart.jsx';
import Calendly from './Calendly.jsx';
import Checkout from './Checkout.jsx';
import RequestForm from './RequestForm.jsx';
const renderHome = () => {
  console.log('home is rendered');
  return <Home />;
};

class App extends Component {
  async componentDidMount() {
    console.log(this.props);
    const response = await fetch('/session');
    const body = await response.json();
    if (body.success) {
      this.props.dispatch({ type: 'SET_USERNAME', payload: body.username });
    }
  }
  render = () => {
    return (
      <BrowserRouter>
        <Navbar />
        {this.props.username ? (
          <>
            <Route path="/" exact render={renderHome} />
            <Route path="/aboutme" exact component={AboutMe} />
            <Route path="/availability" exact component={DatePicker} />
            <Route path="/services" exact component={Market} />
            <Route path="/calendly" exact component={Calendly} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/request" exact component={RequestForm} />
            <Route path="/additem" exact component={ItemForm} />

            <Route path="/checkout" exact component={Checkout} />
            <Route path="/contact" exact component={RequestForm} />
          </>
        ) : (
          <>
            <Route path="/" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
          </>
        )}
      </BrowserRouter>
    );
  };
}

const mapStateToProps = (state) => {
  return { username: state.username };
};
export default connect(mapStateToProps)(App);

//const response = await fetch('/session', {
//  method: 'GET',
// body: data,
//  credentials: 'include',
//});
//let responseBody = await response.text();
//console.log('responseBody from session', responseBody);
//let body = JSON.parse(responseBody);
//console.log('parsed body', body);
//if (body.success) {
//  console.log('username set');
//  return;
//}
//this.props.dispatch({
//  type: 'SET_USERNAME',
//  username: this.state.username,
//});
// check if body.success true -> dispatch SET_USERNAME
// check username not empty string -> Means logged in
