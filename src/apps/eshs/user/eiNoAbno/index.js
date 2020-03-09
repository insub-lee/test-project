import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import pages from './pages';

class eiNoAbno extends Component {
  render() {
    return <BizMicroDevBase component={pages} sagaKey="eiNoAbno" />;
  }
}

export default eiNoAbno;
