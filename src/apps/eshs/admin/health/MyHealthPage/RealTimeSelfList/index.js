import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import PropTypes from 'prop-types';
import List from 'apps/eshs/admin/health/MyHealthPage/RealTimeSelfList/List';

class RealTimeSelfList extends Component {
  render() {
    const { sagaKey } = this.props;
    return <BizMicroDevBase sagaKey={sagaKey} component={List} />;
  }
}

RealTimeSelfList.propTypes = {
  sagaKey: PropTypes.string,
};
RealTimeSelfList.defaultProps = {
  sagaKey: 'RealTimeSelfList',
};
export default RealTimeSelfList;
