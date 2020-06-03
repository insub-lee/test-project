import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class NotChkMgnt extends Component {
  render() {
    return <BizMicroDevBase sagaKey="NotChkMgnt" component={List} />;
  }
}

export default NotChkMgnt;