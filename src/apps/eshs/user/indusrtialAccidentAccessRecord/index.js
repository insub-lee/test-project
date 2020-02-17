import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class IndusrtialAccidentAccessRecord extends Component {
  render() {
    return <BizMicroDevBase component={List} sagaKey="EshsAccAccRecord" />;
  }
}

export default IndusrtialAccidentAccessRecord;
