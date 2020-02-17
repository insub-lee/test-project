import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

// 2020-02-13 동작 x. 나중에 수정해야 함.
Moment.locale('ko');
const LabelDateWithoutTime = ({ colData, visible, CONFIG }) =>
  visible ? <span className={CONFIG.property.className || ''}>{Moment(colData).format('YYYY-MM-DD')}</span> : '';

LabelDateWithoutTime.propTypes = {
  colData: PropTypes.string,
};

export default LabelDateWithoutTime;
