import React, { Component } from 'react';
import './main.css';
import { connect } from 'react-redux';
import Payment from './Payment.jsx';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const StyledService = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  border-style: solid;
  border-left: none;
  border-right: none;
  padding-bottom: none;
  border-bottom: none;
  border-width: 2px;
  padding: 20px;
  width: 90%;
  text-align: center;
`;

const StyledImg = styled('img')`
  width: 200px;
  height: 100;
  object-fit: cover;
  opacity: 0.5;
  filter: grayscale(100%);
`;

const Container = styled('div')`
  position: relative;
  text-align: center;
  flex-basis: 25%;
`;
const Decscription = styled('ul')`
  text-align: left;
  flex-basis: 50%;
`;
const DecscriptionLi = styled('li')`
  padding: 5px;
  list-style: square;
`;
const End = styled('div')`
  flex-basis: 25%;
`;
const Centered = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Permanent Marker';
  color: black;
`;

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.cart,
      services: this.props.services,
    };
  }
  async componentDidMount() {
    let response = await fetch('/api/services', {
      method: 'GET',
    });
    let json = await response.json();
    this.props.dispatch({
      type: 'SET_SERVICES',
      payload: json.services,
    });
  }
  render() {
    console.log(this.props);
    if (!this.props.cart) {
      return 'loading';
    }
    return (
      <>
        <StyledService>
          <Container>
            <StyledImg src={this.props.services[this.props.cart].img} />
            <Centered>{this.props.services[this.props.cart].name}</Centered>
          </Container>
          <Decscription>
            {this.props.services[this.props.cart].desc.map((description) => (
              <DecscriptionLi>{description}</DecscriptionLi>
            ))}
          </Decscription>
          <End>
            <div>{this.props.services[this.props.cart].cost}</div>
          </End>
        </StyledService>
        <Payment />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { services: state.services, cart: state.cart };
};

export default connect(mapStateToProps)(Checkout);
