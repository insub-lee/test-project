import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import MainPage from './MainPage';

class eiImportantAssesment extends Component {
  render() {
    return <BizMicroDevBase component={MainPage} sagaKey="eiImportantAssesment" id="eiImportantAssesment" />;
  }
}

export default eiImportantAssesment;
