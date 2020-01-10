import React from 'react';
import PropTypes from 'prop-types';

const LabelNumber = ({ colData, visible }) => (visible ? <span>{colData}</span> : '');

LabelNumber.propTypes = {
  colData: PropTypes.number,
  visible: PropTypes.bool,
};

export default LabelNumber;
