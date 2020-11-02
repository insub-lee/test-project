import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import InitPwd from './InitPwd';

class EddsInitPwd extends Component {
  render() {
    return <BizMicroDevBase sagaKey="EddsInitPwd" component={InitPwd} />;
  }
}

export default EddsInitPwd;
