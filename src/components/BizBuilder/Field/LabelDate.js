import React from 'react';
import PropTypes from 'prop-types';
import { now } from 'C:/Users/notebiz509/AppData/Local/Microsoft/TypeScript/3.7/node_modules/moment/moment';

const LabelDate = ({ colData, visible, CONFIG }) =>
  visible ? <span className={CONFIG.property.className || ''}>{colData === 'NOW()' ? '' : colData}</span> : '';

LabelDate.propTypes = {
  colData: PropTypes.string,
};

export default LabelDate;
