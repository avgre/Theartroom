import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const StyledDivs = styled.div`
  && {
    font-size: 13px;
    font-weight: normal;
    display: flex;
    padding: 20px;
    align-items: flex-start;
  }
`;

const StyledDivsEnd = styled.div`
  && {
    display: flex;
    padding: 20px;
    align-items: flex-end;
  }
`;

const StyledDivsMid = styled.div`
  && {
    display: block;
    font-family: 'Permanent Marker';
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
  }
`;
const StyledNavbar = styled('div')`
  && {
    position: relative;
    display: flex;
    justify-content: space-between;

    background: white;
    z-index: 2;
    height: 40px;
    align-items: center;
    width: 100%;
  }
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

function UNavbar(props) {
  const { setLogout } = props;

  return (
    <div>
      <StyledNavbar>
        <StyledDivs>
          <StyledLink to={'/'}>HOME</StyledLink>
        </StyledDivs>
        <StyledDivsMid>
          <h2>THE ART ROOM</h2>
        </StyledDivsMid>
        <StyledDivsEnd>
          <Button size="small" color="default" component={Link} to="/cart">
            Cart
          </Button>
          <Button size="small" color="default" onClick={setLogout}>
            LOGOUT
          </Button>
        </StyledDivsEnd>
      </StyledNavbar>
    </div>
  );
}
function handleLogout(dispatch) {
  fetch('/logout', { method: 'POST', credentials: 'same-origin' });
  dispatch({ type: 'LOGOUT' });
}

const mapDispatchToProps = (dispatch) => ({
  setLogout: () => handleLogout(dispatch),
});
const Navbar = connect(
  null,
  mapDispatchToProps
)(UNavbar);
export default withRouter(Navbar);
