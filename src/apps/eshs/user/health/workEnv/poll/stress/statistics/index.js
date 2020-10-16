import React from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import PropTypes from 'prop-types';
import View from './View';

// 직무스트레스 설문조사 통계
const Statistics = props => {
  const { sagaKey } = props;
  return <BizMicroDevBase sagaKey={sagaKey} component={View} />;
};

Statistics.propTypes = {
  sagaKey: PropTypes.string,
};

Statistics.defaultProps = {
  sagaKey: 'stress_poll_statistics',
};

export default Statistics;
