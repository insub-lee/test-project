import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class eshsCodeGubunMgt extends Component {
  render() {
    return <BizMicroDevBase component={List} sagaKey="EshsCodeGubun" />;
  }
}

export default eshsCodeGubunMgt;
