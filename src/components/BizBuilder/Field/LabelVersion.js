import React from 'react';
import PropTypes from 'prop-types';

const LabelVersion = ({ colData, visible, CONFIG }) => (visible ? <span className={CONFIG.property.className || ''}>{colData}</span> : '');

LabelVersion.propTypes = {
  colData: PropTypes.string,
};

export default LabelVersion;
