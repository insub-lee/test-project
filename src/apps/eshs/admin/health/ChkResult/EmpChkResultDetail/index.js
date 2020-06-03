import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import View from 'apps/eshs/admin/health/ChkResult/EmpChkResultDetail/View';
import PropTypes from 'prop-types';

class EmpChkResultDetail extends Component {
  render() {
    const { defaultUser, userSearch, sagaKey } = this.props;
    return <BizMicroDevBase sagaKey={sagaKey} userSearch={userSearch} component={View} defaultUser={defaultUser} />;
  }
}

View.propTypes = {
  sagaKey: PropTypes.string,
  defaultUser: PropTypes.string,
  userSearch: PropTypes.bool,
};
View.defaultProps = {
  sagaKey: 'EmpChkResultDetail',
  defaultUser: '',
  // defaultUser: '78347', 박연희 수석
  userSearch: true,
};
export default EmpChkResultDetail;
