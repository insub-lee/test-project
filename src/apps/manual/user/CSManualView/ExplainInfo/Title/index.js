import React from 'react';
import PropTypes from 'prop-types';

import Styled from './Styled';

const Title = ({ contents, idx }) => (
  <Styled>
    <p id={`manualViewIndexComp_${idx}`}>{contents}</p>
  </Styled>
);

Title.propTypes = {
  contents: PropTypes.string,
  idx: PropTypes.number,
};

Title.defaultProps = {
  contents: '',
  idx: 0,
};

export default Title;
