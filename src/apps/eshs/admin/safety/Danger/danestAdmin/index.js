import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class DenestAdmin extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="hazard" component={List} />;
  }
}

export default DenestAdmin;
