import React, { Component } from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

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

const StyledSecBig = styled.div`
  padding: 20px;
  border-style: solid;
  border-left: none;
  border-right: none;
  padding-bottom: none;
  border-bottom: none;
`;
const StyledInput = styled.input`
  height: 100px;
  width: 300px;
`;
class RequestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      redirect: false,
    };
  }

  submitHandler = (evt) => {
    evt.preventDefault();
    this.setState({ redirect: true });
  };
  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <StyledDiv>
          <StyledSec>
            <h5>Name:</h5>
            <input
              type="text"
              onChange={this.handleEmailInput}
              value={this.state.email}
            />
          </StyledSec>
          <StyledSec>
            <h5>Email:</h5>
            <input type="text" />
          </StyledSec>
          <StyledSec>
            <h5>Phone:</h5>
            <input type="text" />
          </StyledSec>
          <StyledSecBig>
            <h5>Message:</h5>
            <StyledInput type="text" />
          </StyledSecBig>
          <StyledSec>
            <Button
              onClick={(evt) => {
                this.submitHandler(evt);
              }}
            >
              Submit
            </Button>
          </StyledSec>
          <StyledSec>
            <Button component={Link} to="/checkout">
              Checkout
            </Button>
          </StyledSec>
        </StyledDiv>
      </form>
    );
  }
}

export default withRouter(RequestForm);
