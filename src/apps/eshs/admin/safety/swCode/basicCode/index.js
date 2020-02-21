import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from 'apps/eshs/admin/common/codeList';

class EshsBasicCode extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="eshsBasicCode" component={List} tableName="SW" />;
  }
}

EshsBasicCode.propTypes = {};
EshsBasicCode.defaultProps = {};

export default EshsBasicCode;
