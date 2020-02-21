import React, { Component } from 'react';

import RadioComp from './RadioComp';

class FmeaFlagRadioCharComp extends Component {
  componentDidMount() {
    console.debug(this.props);
  }

  render() {
    return <RadioComp visible {...this.props}></RadioComp>;
  }
}

export default FmeaFlagRadioCharComp;
