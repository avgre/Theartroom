import React, { Component } from 'react';
import './main.css';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Service from './Service.jsx';
import LinkBar from './LinkBar.jsx';

const StyledMarket = styled('div')`
  && {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const StyledDiv = styled('div')`
  && {
    padding: 20px;
  }
`;

class Market extends Component {
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
  searchResults() {
    result = this.props.services.filter((service) => {
      return service.name.toLowerCase;
    });
  }
  render() {
    return (
      <>
        <LinkBar />
        <StyledDiv>Request a Service</StyledDiv>
        <StyledMarket>
          {this.props.services.map((service) => (
            <Service service={service} />
          ))}
        </StyledMarket>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { services: state.services, query: state.query };
};

export default connect(mapStateToProps)(Market);
