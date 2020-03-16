import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import MainPage from './MainPage';

class eiWater extends Component {
  render() {
    return <BizMicroDevBase component={MainPage} sagaKey="eiWater" tb_name="WATER" />;
  }
}

export default eiWater;
