import React from 'react';
import PropTypes from 'prop-types';
import StyledViewTop from './StyledViewTop';

const ViewTop = ({ children }) => <StyledViewTop>{children}</StyledViewTop>;

ViewTop.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

ViewTop.defaultProps = {
  children: null,
};

export default ViewTop;
