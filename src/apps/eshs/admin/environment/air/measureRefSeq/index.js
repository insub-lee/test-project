import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class MeasureRefSeq extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="measureRefSeq" component={List} />;
  }
}

MeasureRefSeq.propTypes = {};
MeasureRefSeq.defaultProps = {};

export default MeasureRefSeq;
