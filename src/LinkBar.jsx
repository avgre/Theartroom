import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './main.css';
import styled from 'styled-components';

const FlexLink = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  width: 75%;
  margin: auto;
  justify-content: space-evenly;
  font-size: 11px;
  height: 50px;
`;
const StyledLink = styled(Link)`
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

function LinkBar() {
  return (
    <FlexLink>
      <StyledLink to={'/aboutme'}>ABOUT</StyledLink>
      <StyledLink to={'/'}>SERVICES</StyledLink>
      <StyledLink to={'/availability'}>AVAILABILITY</StyledLink>

      <StyledLink to={'/'}>PORTFOLIO</StyledLink>
      <StyledLink to={'/'}>CONTACT</StyledLink>
    </FlexLink>
  );
}

export default LinkBar;
