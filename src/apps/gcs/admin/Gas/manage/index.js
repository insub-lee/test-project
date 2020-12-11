import React, { Component } from 'react';
// import BizBuilderBase from 'components/BizBuilderBase';
import BizMicroDevBase from 'components/BizMicroDevBase';
import GasManagePage from './page';
import Styeld from './Styled';

/*
    GCS - GAS 관리 - 정보관리    
*/

class chemicalManage extends Component {
  componentDidMount() {}

  render() {
    return (
      <Styeld>
        <BizMicroDevBase component={GasManagePage} sagaKey="GasManage_list" />
      </Styeld>
    );
  }
}

export default chemicalManage;
