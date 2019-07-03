import React from 'react';
import PropTypes from 'prop-types';

import Block from '../Block';

const CustomBlock = ({ onClick }) => (
  <React.Fragment>
    <Block label="User Select" icon="xi-users-plus xi-3x" onClick={() => onClick('user-search-select')} />
    <Block label="Process Info" icon="fa fa-cube fa-3x" onClick={() => onClick('process-info')} />
    <Block label="Custom Component" icon="fa fa-cube fa-3x" onClick={() => console.debug('## custom block')} />
    <Block label="Custom Component" icon="fa fa-cube fa-3x" onClick={() => console.debug('## custom block')} />
    <Block label="Custom Component" icon="fa fa-cube fa-3x" onClick={() => console.debug('## custom block')} />
    <Block label="Custom Component" icon="fa fa-cube fa-3x" onClick={() => console.debug('## custom block')} />
  </React.Fragment>
);

CustomBlock.propTypes = {
  onClick: PropTypes.func,
};

CustomBlock.propTypes = {
  onClick: () => false,
};

export default CustomBlock;
