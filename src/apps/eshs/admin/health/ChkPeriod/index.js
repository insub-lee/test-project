import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import PeriodSetting from './PeriodSetting';

class ChkPeriod extends Component {
  render() {
    return <BizMicroDevBase sagaKey="PeriodSetting" component={PeriodSetting} />;
  }
}

export default ChkPeriod;