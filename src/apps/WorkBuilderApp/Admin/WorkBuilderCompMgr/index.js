import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class WorkBuilderCompMgr extends Component {
  render() {
    return <BizMicroDevBase id="ComponentPool_List" component={List} />;
  }
}

export default WorkBuilderCompMgr;
