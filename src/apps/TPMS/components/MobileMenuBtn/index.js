import React from 'react';
import PropTypes from 'prop-types';
import StyledMobileMenuBtn from './StyledMobileMenuBtn';

const MobileMenuBtn = ({ active, action }) => (
  <StyledMobileMenuBtn type="button" className={`${active ? 'active' : ''}`} onClick={action}>
    Menu
    <span className="top" />
    <span className="middle" />
    <span className="bottom" />
  </StyledMobileMenuBtn>
);

MobileMenuBtn.propTypes = {
  active: PropTypes.bool,
  action: PropTypes.func,
};

MobileMenuBtn.defaultProps = {
  active: false,
  action: () => false,
};

export default MobileMenuBtn;
