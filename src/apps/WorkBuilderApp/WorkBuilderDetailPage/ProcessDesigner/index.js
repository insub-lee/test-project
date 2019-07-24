import React, { Component } from 'react';

import Process from 'apps/WorkFlow/Admin/Process';

class ProcessDesigner extends Component {
  componentDidMount() {}

  processCallbackFunc = (prcId) => {
    console.debug('prcId >> ', prcId);
  };

  render() {
    return <Process processCallbackFunc={this.processCallbackFunc} />;
  }
}

export default ProcessDesigner;
