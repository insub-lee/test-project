import React, { Component } from 'react';
// import BizBuilderBase from 'components/BizBuilderBase';
import BizMicroDevBase from 'components/BizMicroDevBase';
import ChemicalManagePage from './page';
import Styeld from './Styled';

/*
    GCS - Chemical 관리 - 정보관리    
*/

class chemicalManage extends Component {
  componentDidMount() {}

  render() {
    // return <BizBuilderBase sagaKey="chemicalManage" workSeq={14661} viewType="LIST" />;
    return (
      <Styeld>
        <BizMicroDevBase component={ChemicalManagePage} sagaKey="chemicalManage_list" />
      </Styeld>
    );
  }
}

export default chemicalManage;
