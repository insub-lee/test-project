import React, { Component } from 'react';

import BizMicroDevBase from 'components/BizMicroDevBase/index';
import List from './List';

class WorkBuilderOptionMgr extends Component {
  render() {
    return <BizMicroDevBase id="workBuilderOption" component={List}></BizMicroDevBase>;
  }
}
export default WorkBuilderOptionMgr;
