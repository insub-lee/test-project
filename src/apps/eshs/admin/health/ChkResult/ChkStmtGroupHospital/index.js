import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from 'apps/eshs/admin/health/ChkResult/ChkStmtGroupHospital/List';
import PropTypes from 'prop-types';

class ChkStmtGroupHospital extends Component {
  render() {
    const { defaultUser, userSearch, sagaKey } = this.props;
    return <BizMicroDevBase sagaKey={sagaKey} component={List} />;
  }
}

ChkStmtGroupHospital.propTypes = {
  sagaKey: PropTypes.string,
};
ChkStmtGroupHospital.defaultProps = {
  sagaKey: 'ChkStmtGroupHospital',
};
export default ChkStmtGroupHospital;
