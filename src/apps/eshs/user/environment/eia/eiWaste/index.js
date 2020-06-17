import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import MainPage from './MainPage';

class eiWaste extends Component {
  render() {
    return <BizMicroDevBase component={MainPage} sagaKey="eiWaste" tbName="WASTE_ITEM" />;
  }
}

export default eiWaste;
