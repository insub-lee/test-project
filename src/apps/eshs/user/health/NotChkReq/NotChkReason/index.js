import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class NotChkReason extends Component {
  render() {
    return <BizMicroDevBase sagaKey="NotChkReason" component={List} selectedRow={this.props.selectedRow} />;
  }
}

export default NotChkReason;