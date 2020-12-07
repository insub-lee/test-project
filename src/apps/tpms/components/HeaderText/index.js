import React from 'react';
import PropTypes from 'prop-types';
import StyledHeader from './StyledHeader';

const Header = ({ headerText }) => (
  <StyledHeader>
    <h1>{headerText}</h1>
  </StyledHeader>
);

Header.propTypes = {
  headerText: PropTypes.string,
};

Header.defaultProps = {
  headerText: '',
};

export default Header;
