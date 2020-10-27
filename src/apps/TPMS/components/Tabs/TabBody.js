import React from 'react';
import PropTypes from 'prop-types';

const Body = ({ children, isActive }) => <div className={`tab_contents ${isActive ? 'on' : ''}`}>{children}</div>;

Body.propTypes = {
  isActive: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

Body.defaultProps = {
  isActive: false,
  children: null,
};

export default Body;
