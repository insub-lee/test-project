import React, { Component } from 'react';

import ApproveBase from 'apps/Workflow/components/ApproveBase';
import List from './List';

class QueueList extends Component {
  componentDidMount() {}

  render() {
    return <ApproveBase id="unApproveList" key="mdcs-unApproveList" component={List} />;
  }
}

export default QueueList;
