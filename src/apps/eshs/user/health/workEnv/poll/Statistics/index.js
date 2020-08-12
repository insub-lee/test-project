import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import View from 'apps/eshs/user/health/workEnv/poll/Statistics/View';
import PropTypes from 'prop-types';

class Statistics extends Component {
  render() {
    const { sagaKey } = this.props;
    return <BizMicroDevBase sagaKey={sagaKey} component={View} />;
  }
}

Statistics.propTypes = {
  sagaKey: PropTypes.string,
};
Statistics.defaultProps = {
  sagaKey: 'Statistics',
};
export default Statistics;
