import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import pages from './pages';

class eiNatural extends Component {
  render() {
    return <BizMicroDevBase component={pages} sagaKey="eiNatural" />;
  }
}

export default eiNatural;
