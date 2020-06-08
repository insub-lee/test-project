import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from 'apps/eshs/admin/health/ChkResult/ChkDisease/List';
import PropTypes from 'prop-types';

class ChkDisease extends Component {
  render() {
    const { defaultUser, userSearch, sagaKey } = this.props;
    return <BizMicroDevBase sagaKey={sagaKey} component={List} />;
  }
}

ChkDisease.propTypes = {
  sagaKey: PropTypes.string,
};
ChkDisease.defaultProps = {
  sagaKey: 'ChkDisease',
};
export default ChkDisease;
