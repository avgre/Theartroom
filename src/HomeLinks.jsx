import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLinks = styled('div')`
  width: 30%;
  flex-basis: 20%;
  justify-content: left;
  padding: 20px;
  border-right: solid;
  border-width: 3px;
  border-color: black;
`;

const StyledLink = styled(Link)`
  display: grid;
  margin-left: 20px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  padding: 10px;
  text-decoration: none;
  color: black;
  font-family: 'roboto';
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;
class HomeLinks extends Component {
  render() {
    return (
      <StyledLinks>
        <StyledLink to={'/aboutme'}>ABOUT</StyledLink>
        <StyledLink to={'/calendly'}>CALENDLY</StyledLink>
        <StyledLink to={'/services'}>SERVICES</StyledLink>
        <StyledLink to={'/availability'}>AVAILABILITY</StyledLink>
        <StyledLink to={'/'}>PORTFOLIO</StyledLink>
        <StyledLink to={'/contact'}>CONTACT</StyledLink>
      </StyledLinks>
    );
  }
}
export default HomeLinks;
