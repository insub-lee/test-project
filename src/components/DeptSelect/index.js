import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import DeptSelectComp from './DeptSelectComp';

class DeptSelect extends Component {
  render() {
    return <BizMicroDevBase {...this.props} id="deptSelect" component={DeptSelectComp} />;
  }
}

export default DeptSelect;