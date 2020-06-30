import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class ChkResult extends Component {
  render() {
    return <BizMicroDevBase sagaKey="ChkResult" component={List} />;
  }
}

export default ChkResult;