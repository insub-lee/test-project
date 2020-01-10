import React from 'react';
import PropTypes from 'prop-types';

const LabelVersion = ({ colData, visible }) => (visible ? <span>{colData}</span> : '');

LabelVersion.propTypes = {
  colData: PropTypes.string,
};

export default LabelVersion;
