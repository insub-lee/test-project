import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import HistoryList from './HistoryList';

class DistributeHistory extends Component {
  render() {
    return <BizMicroDevBase id="distributeHistory" component={HistoryList} />
  }
}

export default DistributeHistory;