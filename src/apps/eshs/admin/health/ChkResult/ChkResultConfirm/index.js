import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from 'apps/eshs/admin/health/ChkResult/ChkResultConfirm/List';
import PropTypes from 'prop-types';

class ChkResultConfirm extends Component {
  render() {
    const { defaultUser, userSearch, sagaKey } = this.props;
    return <BizMicroDevBase sagaKey={sagaKey} component={List} />;
  }
}

ChkResultConfirm.propTypes = {
  sagaKey: PropTypes.string,
};
ChkResultConfirm.defaultProps = {
  sagaKey: 'ChkResultConfirm',
};
export default ChkResultConfirm;
