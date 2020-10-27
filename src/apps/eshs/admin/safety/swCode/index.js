import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from 'apps/eshs/admin/common/codeList';

class EshsBasicCode extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="eshsBasicCode" component={List} MAP_ID={67} INIT_NODE_ID={701} />;
  }
}

EshsBasicCode.propTypes = {};
EshsBasicCode.defaultProps = {};

export default EshsBasicCode;
