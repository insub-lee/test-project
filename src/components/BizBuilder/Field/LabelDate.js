import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

Moment.locale('ko');
const LabelDate = ({ colData, visible, CONFIG }) =>
  visible ? <span className={CONFIG.property.className || ''}>{colData === 'NOW()' ? Moment().format('YYYY-MM-DD hh:mm:ss') : colData}</span> : '';

LabelDate.propTypes = {
  colData: PropTypes.string,
};

export default LabelDate;
