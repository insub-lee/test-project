import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import Report from 'apps/eshs/admin/health/ChkResult/ChkStats/Report';
import PropTypes from 'prop-types';

class ChkStats extends Component {
  render() {
    const { sagaKey } = this.props;
    return <BizMicroDevBase sagaKey={sagaKey} component={Report} />;
  }
}

ChkStats.propTypes = {
  sagaKey: PropTypes.string,
};
ChkStats.defaultProps = {
  sagaKey: 'ChkStats',
};
export default ChkStats;
