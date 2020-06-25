import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import Quota from './Quota';

class QuotaMgnt extends Component {
  render() {
    return <BizMicroDevBase sagaKey="QuotaMgnt" component={Quota} />;
  }
}

export default QuotaMgnt;