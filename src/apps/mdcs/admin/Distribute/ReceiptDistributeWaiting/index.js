import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class ReceiptDistributeWaiting extends Component {
  componentDidMount() {}

  render() {
    return <BizMicroDevBase id="ReceiptDistributeWaiting" component={List} {...this.props} viewType="LIST" isCustom />;
  }
}

export default ReceiptDistributeWaiting;
