import React, { Component } from 'react';

import { Radio } from 'antd';
import RadioComp from './RadioComp';

class RadioMdcsChangeComp extends Component {
  componentDidMount() {
    console.debug('mdcschange', this.props);
  }

  render() {
    return <RadioComp {...this.props}></RadioComp>;
  }
}

export default RadioMdcsChangeComp;
