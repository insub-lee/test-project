import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import MainPage from './MainPage';

class eiMaterial extends Component {
  render() {
    return <BizMicroDevBase component={MainPage} sagaKey="eiMaterial" />;
  }
}

export default eiMaterial;
