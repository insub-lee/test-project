import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class WorkStep extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="workStep" component={List} dangerMainYN />;
  }
}

WorkStep.propTypes = {};
WorkStep.defaultProps = {};

export default WorkStep;
