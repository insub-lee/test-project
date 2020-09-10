import React, { Component } from 'react';

import ApproveBase from 'apps/Workflow/components/ApproveBase';
import List from './List';

class Approve extends Component {
  componentDidMount() {}

  render() {
    return <ApproveBase id="eshs-wasteMatter-unApproveList" relTypes={[100]} component={List} />;
  }
}

export default Approve;
