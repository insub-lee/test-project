import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import PropTypes from 'prop-types';
import View from './View';

// 근골격계설문 통계
const Statistics = props => {
  const { sagaKey } = props;
  return <BizMicroDevBase sagaKey={sagaKey} component={View} />;
};

Statistics.propTypes = {
  sagaKey: PropTypes.string,
};

Statistics.defaultProps = {
  sagaKey: 'muscle_poll_Statistics',
};

export default Statistics;
