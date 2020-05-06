import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class ChkItem extends Component {
  render() {
    return <BizMicroDevBase sagaKey="healthChkItem" component={List} />;
  }
}

export default ChkItem;