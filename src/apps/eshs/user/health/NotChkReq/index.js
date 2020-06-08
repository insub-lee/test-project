import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class NotChkReq extends Component {
  render() {
    return <BizMicroDevBase sagaKey="NotChkReq" component={List} />;
  }
}

export default NotChkReq;