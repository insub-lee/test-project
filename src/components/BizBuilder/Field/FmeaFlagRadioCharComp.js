import React, { Component } from 'react';

import RadioCharComp from './RadioCharComp';

class FmeaFlagRadioCharComp extends Component {
  componentDidMount() {
    console.debug(this.props);
  }

  render() {
    return <RadioCharComp {...this.props}></RadioCharComp>;
  }
}

export default FmeaFlagRadioCharComp;
