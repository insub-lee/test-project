import React, { Component } from 'react';

import ApproveBase from 'apps/Workflow/components/ApproveBase';
import List from './List';

class DraftDocDown extends Component {
  componentDidMount() {}

  render() {
    return <ApproveBase id={`draftDocDown`} component={List} />;
  }
}

export default DraftDocDown;
