import React from 'react';
import PropTypes from 'prop-types';

import Styled from './Styled';

const DevicesPanel = ({ action }) => <Styled />;

DevicesPanel.propTypes = {
  action: PropTypes.object,
};

DevicesPanel.defaultProps = {
  action: {},
};

export default DevicesPanel;
