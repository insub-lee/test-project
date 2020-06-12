import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import View from 'apps/eshs/admin/health/MyHealthPage/SelfEmpResultDetail/View';
import PropTypes from 'prop-types';

class SelfEmpResultDetail extends Component {
  render() {
    const { defaultUser, userSearch, sagaKey, chkYear } = this.props;
    return <BizMicroDevBase sagaKey={sagaKey} userSearch={userSearch} component={View} defaultUser={defaultUser} chkYear={chkYear} />;
  }
}

SelfEmpResultDetail.propTypes = {
  sagaKey: PropTypes.string,
  defaultUser: PropTypes.number,
  userSearch: PropTypes.bool,
  chkYear: PropTypes.string,
};
SelfEmpResultDetail.defaultProps = {
  sagaKey: 'SelfEmpResultDetail',
  defaultUser: null,
  // defaultUser: '78347', 박연희 수석
  userSearch: true,
  chkYear: '',
};
export default SelfEmpResultDetail;
