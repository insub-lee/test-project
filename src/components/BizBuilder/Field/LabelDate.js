import React from 'react';
import PropTypes from 'prop-types';

const LabelDate = ({ colData, visible }) => (visible ? <span>{colData}</span> : '');

LabelDate.propTypes = {
  colData: PropTypes.string,
};

export default LabelDate;
