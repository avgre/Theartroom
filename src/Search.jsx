import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
const SearchBar = styled.input`
  padding: 10px;
  border: none;
  width: 100px;
  border-bottom: dotted;
  display: block;
`;

function Search({ query, handleQueryChange }) {
  return (
    <SearchBar
      type="text"
      placeholder="search"
      onChange={handleQueryChange}
      value={query}
    />
  );
}

const mapStateToProps = (state) => ({
  query: state.query,
});

const mapDispatchToProps = (dispatch) => ({
  handleQueryChange: (evt) =>
    dispatch({ type: 'SET_QUERY', payload: evt.target.value }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
