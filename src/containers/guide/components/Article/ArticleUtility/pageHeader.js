import React from 'react';

import PropTypes from 'prop-types';
import ComponentTitleWrapper from './pageHeader.style';

const pageHeader = ({ title }) => (
  <ComponentTitleWrapper className="devGuideComponentTitle">
    {title}
  </ComponentTitleWrapper>
);

pageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default pageHeader;
