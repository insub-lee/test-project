import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import MainPage from './MainPage';

class eiStatement extends Component {
  render() {
    return <BizMicroDevBase component={MainPage} sagaKey="eiStatement" />;
  }
}

export default eiStatement;
