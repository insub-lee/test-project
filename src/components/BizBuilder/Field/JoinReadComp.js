import React, { Component } from 'react';

class JoinReadComp extends Component {
  render() {
    const { CONFIG, formData, colData } = this.props;
    return <label>{formData[CONFIG.property.viewDataKey] || colData}</label>;
  }
}

export default JoinReadComp;
