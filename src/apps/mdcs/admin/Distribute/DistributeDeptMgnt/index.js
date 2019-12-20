import React, { Component } from 'react';

import BizMicroDevBase from 'apps/mdcs/components/BizMicroDevBase';

import List from './List';

class DistributeDeptMgnt extends Component {
  componentDidMount() {}

  render() {
    return <BizMicroDevBase id="distMgntList" component={List} />;
  }
}

export default DistributeDeptMgnt;
