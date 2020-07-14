import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import PropTypes from 'prop-types';
import List from 'apps/eshs/user/environment/eia/ApprovalList/List';

class ApprovalList extends Component {
  render() {
    const { sagaKey } = this.props;
    return <BizMicroDevBase sagaKey={sagaKey} component={List} />;
  }
}

ApprovalList.propTypes = {
  sagaKey: PropTypes.string,
};
ApprovalList.defaultProps = {
  sagaKey: 'ApprovalList',
};
export default ApprovalList;
