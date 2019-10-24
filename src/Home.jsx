import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './main.css';
import styled from 'styled-components';
import HomeLinks from './HomeLinks.jsx';

const HomeImg = styled.img`
  height: auto;
  width: 80%;
`;

const ImgDiv = styled.div`
  display: flex;
  flex-basis: 80%;
  justify-content: center;
`;

const HomeBack = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 20px;
  background-color: white;
  display: flex;

  align-items: center;
  flex-wrap: nowrap;
`;

class Home extends Component {
  render() {
    return (
      <HomeBack>
        <HomeLinks />
        <ImgDiv>
          <HomeImg src={'/images/home.jpeg'} />
        </ImgDiv>
      </HomeBack>
    );
  }
}

export default Home;
