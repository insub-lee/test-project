import React from 'react';
import PropTypes from 'prop-types';

import Styled from './Styled';

const CommandsPanel = ({ action }) => <Styled />;

CommandsPanel.propTypes = {
  action: PropTypes.object,
};

CommandsPanel.defaultProps = {
  action: {},
};

export default CommandsPanel;
