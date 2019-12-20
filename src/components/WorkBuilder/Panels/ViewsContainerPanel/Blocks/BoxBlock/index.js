import React from 'react';
import PropTypes from 'prop-types';

import Block from '../Block';

const BoxBlock = ({ onClick }) => (
  <>
    <Block label="Box" icon="xi-layout-full-o xi-3x" onClick={() => onClick()} />
  </>
);

BoxBlock.propTypes = {
  onClick: PropTypes.func,
};

BoxBlock.propTypes = {
  onClick: () => false,
};

export default BoxBlock;
