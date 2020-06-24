import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class UserMgnt extends Component {
  render() {
    return <BizMicroDevBase sagaKey="UserMgnt" component={List} />;
  }
}

export default UserMgnt;