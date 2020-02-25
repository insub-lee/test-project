import React, { Component } from 'react';

import { Radio } from 'antd';
import RadioComp from './RadioComp';

class RadioMdcsChangeComp extends Component {
  render() {
    return <RadioComp {...this.props}></RadioComp>;
  }
}

export default RadioMdcsChangeComp;
