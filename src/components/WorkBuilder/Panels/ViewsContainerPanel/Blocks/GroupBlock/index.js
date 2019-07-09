import React from 'react';
import PropTypes from 'prop-types';

import Block from '../Block';

const GroupBlock = ({ onClick }) => (
  <React.Fragment>
    <Block label="Group" icon="xi-layout-o xi-3x" onClick={() => onClick()} />
  </React.Fragment>
);

GroupBlock.propTypes = {
  onClick: PropTypes.func,
};

GroupBlock.propTypes = {
  onClick: () => false,
};

export default GroupBlock;
