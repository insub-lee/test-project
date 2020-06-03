import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class ChkMst extends Component {
  render() {
    return <BizMicroDevBase sagaKey="chkMstList" component={List} />;
  }
}

export default ChkMst;