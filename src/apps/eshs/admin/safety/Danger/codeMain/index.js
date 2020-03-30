import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import CodeList from './List';

class CodeMain extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="codeMain" component={CodeList} dangerMainYN />;
  }
}

CodeMain.propTypes = {};
CodeMain.defaultProps = {};

export default CodeMain;
