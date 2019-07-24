import React from 'react';
import PropTypes from 'prop-types';

import Styled from './Styled';

const MaskDiv = ({ children }) => (
  <Styled>
    {children}
    <div className="mask" />
  </Styled>
);

MaskDiv.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default MaskDiv;
