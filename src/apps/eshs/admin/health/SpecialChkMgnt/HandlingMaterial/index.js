import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class HandlingMaterial extends Component {
  render() {
    return <BizMicroDevBase sagaKey="HandlingMaterial" component={List} />;
  }
}

export default HandlingMaterial;