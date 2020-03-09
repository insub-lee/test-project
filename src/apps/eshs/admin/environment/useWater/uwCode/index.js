import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from 'apps/eshs/admin/common/codeList';

class EshsBasicCode extends Component {
  componantDidMount() {}

  render() {
    const { authority } = this.props;
    return <BizMicroDevBase sagaKey="eshsBasicCode" component={List} MAP_ID={47} INIT_NODE_ID={435} authority={authority} />;
  }
}

EshsBasicCode.propTypes = {};
EshsBasicCode.defaultProps = {};

export default EshsBasicCode;
