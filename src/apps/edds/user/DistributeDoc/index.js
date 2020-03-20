import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import DistributeDocList from './DistributeDocList';

class DistributeDoc extends Component {
  render() {
    return <BizMicroDevBase id="distributeDoc" component={DistributeDocList} />
  }
}

export default DistributeDoc;