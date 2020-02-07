import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class hostCompnyUserMgt extends Component {
  render() {
    return <BizMicroDevBase component={List} sagaKey="EshshostCompny" />;
  }
}

export default hostCompnyUserMgt;
