import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding-top: 40px;
`;
const StyledSec = styled.div`
  padding: 20px;
  border-style: solid;
  border-left: none;
  border-right: none;
  padding-bottom: none;
  border-bottom: none;
`;
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  handleUsernameChange = (event) => {
    console.log('new username', event.target.value);
    this.setState({ username: event.target.value });
  };
  handlePasswordChange = (event) => {
    console.log('new password', event.target.value);
    this.setState({ password: event.target.value });
  };
  handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log('signup form submitted');
    let data = new FormData();
    data.append('username', this.state.username);
    data.append('password', this.state.password);
    const response = await fetch('/signup', {
      method: 'POST',
      body: data,
      credentials: 'same-origin',
    });
    const body = await response.json();
    if (!body.success) return alert(body.message);
    this.props.dispatch({
      type: 'LOGIN_SUCCESS',
      payload: this.state.username,
    });
  };
  render = () => {
    return (
      <StyledDiv>
        <h1>Signup</h1>
        <form onSubmit={this.handleSubmit}>
          <StyledSec>
            Username
            <input type="text" onChange={this.handleUsernameChange} />
          </StyledSec>
          <StyledSec>
            Password
            <input type="text" onChange={this.handlePasswordChange} />
          </StyledSec>
          <StyledSec>
            <Button type="submit">SUBMIT</Button>
          </StyledSec>
          <StyledSec>
            <Button component={Link} to="/">
              Back to Home
            </Button>
          </StyledSec>
        </form>
      </StyledDiv>
    );
  };
}

export default connect()(Signup);
