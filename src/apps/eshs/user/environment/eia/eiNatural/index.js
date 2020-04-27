import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import MainPage from './MainPage';

class eiNatural extends Component {
  render() {
    return <BizMicroDevBase component={MainPage} sagaKey="eiNatural" tbName="NATURAL" />;
  }
}

export default eiNatural;
