import React from 'react';
import PropTypes from 'prop-types';

const LabelNumber = ({ colData, visible, CONFIG }) => (visible ? <span className={CONFIG.property.className || ''}>{colData}</span> : '');

LabelNumber.propTypes = {
  colData: PropTypes.number,
  visible: PropTypes.bool,
};

export default LabelNumber;
