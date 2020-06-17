import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import MainPage from './MainPage';

class eiAir extends Component {
  render() {
    return <BizMicroDevBase component={MainPage} sagaKey="eiAir" tbName="AIR_ITEM" />;
  }
}

export default eiAir;
