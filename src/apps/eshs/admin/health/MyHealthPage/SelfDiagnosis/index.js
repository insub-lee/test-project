import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import SelfCheck from 'apps/eshs/admin/health/MyHealthPage/SelfDiagnosis/SelfCheck';

import PropTypes from 'prop-types';

class SelfDiagnosis extends Component {
  render() {
    const { sagaKey } = this.props;
    return <BizMicroDevBase sagaKey={sagaKey} component={SelfCheck} />;
  }
}

SelfDiagnosis.propTypes = {
  sagaKey: PropTypes.string,
};
SelfDiagnosis.defaultProps = {
  sagaKey: 'SelfDiagnosis',
};
export default SelfDiagnosis;
