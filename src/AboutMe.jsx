import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LinkBar from './LinkBar.jsx';

const StyledParagraph = styled('span')`
  max-width: 55%;
  padding: 20px;
  align-items: left;
  padding-top: 0px;
  text-align: left;
  float: left;
`;
const StyledSpan = styled('h4')`
  max-width: 45%;
  padding: 5px;
  display: flex;
  text-align: left;
`;
const StyledImg = styled('img')`
  display: block;
  border-top: solid;
  padding: 40px;
  max-width: 55%;
  height: auto;
  margin: auto;
`;

const StyledDiv = styled('div')`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
class AboutMe extends Component {
  render() {
    return (
      <>
        <LinkBar />
        <StyledDiv>
          <StyledSpan>ABOUT ME</StyledSpan>
          <StyledParagraph>
            Preet first started exploring her creative side at the age of 9 when
            she was asked to recreate the cover of her favourite book. Her
            talent for illustration was immediately apparent and she soon fell
            in love with all things art. Today, she creates such masterpieces on
            a much different canvas! Having completed the Global Makeup program
            at Blanche MacDonald and the Animation Art and Design program at the
            Art Institute, combined with her 6 years of experience in hair and
            makeup, Preet now enjoys exploring her passion through working with
            clients to create the vision, look, and feeling that they dream of
            for their special day. She’s a firm believer that it is the details
            that define the beauty of the overall picture, and using her
            clients' features to define and enhance their natural beauty is her
            specialty.
          </StyledParagraph>
          <div>
            <StyledImg src={'/images/about.jpeg'} />
          </div>
        </StyledDiv>
      </>
    );
  }
}
export default AboutMe;
