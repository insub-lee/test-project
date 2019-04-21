import React from 'react';
import PropTypes from 'prop-types';
import LayoutContentWrapper from './layoutWrapper.style';

const LayoutWrapper = props => (
  <LayoutContentWrapper
    className="devGuideLayoutContentWrapper"
    {...props}
  >
    {props.children}
  </LayoutContentWrapper>
);

export default LayoutWrapper;

LayoutWrapper.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};
