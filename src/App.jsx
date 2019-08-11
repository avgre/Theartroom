import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Navbar from './Navbar.jsx';
import ItemForm from './ItemForm.jsx';
import Home from './Home.jsx';
import Market from './Market.jsx';
const renderHome = () => {
  console.log('home is rendered');
  return <Home />;
};
const renderItemForm = () => {
  console.log('ItemForm is rendered');
  return <ItemForm />;
};
const renderSignup = () => {
  console.log('signup is rendered');
  return <Signup />;
};
class App extends Component {
  async componentDidMount() {
    const response = await fetch('/session');
    const body = await response.json();
    if (body.success) {
      this.props.dispatch({ type: 'SET_USERNAME', payload: body.username });
    }
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
  }
  render = () => {
    return (
      <BrowserRouter>
        <Navbar />
        {this.props.username ? (
          <>
            <Route path="/" exact render={renderHome} />
            <Route path="/signup" exact render={renderSignup} />
            <Route path="/items" exact component={Market} />
            <Route path="/additem" exact render={renderItemForm} />
          </>
        ) : (
          <>
            <Login />
            <Signup />
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
