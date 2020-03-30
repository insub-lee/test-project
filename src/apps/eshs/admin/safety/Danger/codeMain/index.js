import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class CodeMain extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="codeMain" component={List} dangerMainYN />;
  }
}

CodeMain.propTypes = {};
CodeMain.defaultProps = {};

export default CodeMain;
