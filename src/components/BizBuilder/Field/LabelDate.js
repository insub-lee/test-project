import React from 'react';
import PropTypes from 'prop-types';

const LabelDate = ({ colData, visible, CONFIG }) =>
  visible ? <span className={CONFIG.property.className || ''}>{colData === 'NOW()' ? '' : colData}</span> : '';

LabelDate.propTypes = {
  colData: PropTypes.string,
};

export default LabelDate;
