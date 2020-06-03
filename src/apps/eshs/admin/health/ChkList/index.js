import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class ChkList extends Component {
  render() {
    return <BizMicroDevBase sagaKey="chkList" component={List} />;
  }
}

export default ChkList;