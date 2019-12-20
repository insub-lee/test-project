import React from 'react';
import PropTypes from 'prop-types';

import Block from '../Block';

const GroupBlock = ({ onClick }) => (
  <>
    <Block label="Group" icon="xi-layout-o xi-3x" onClick={() => onClick()} />
  </>
);

GroupBlock.propTypes = {
  onClick: PropTypes.func,
};

GroupBlock.propTypes = {
  onClick: () => false,
};

export default GroupBlock;
