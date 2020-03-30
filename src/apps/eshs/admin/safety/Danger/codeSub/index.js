import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import CodeList from '../codeMain/List';

class CodeSub extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="codeSub" component={CodeList} dangerMainYN={false} />;
  }
}

CodeSub.propTypes = {};
CodeSub.defaultProps = {};

export default CodeSub;
