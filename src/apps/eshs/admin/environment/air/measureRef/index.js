import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class MeasureRef extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="measureRef" component={List} />;
  }
}

MeasureRef.propTypes = {};
MeasureRef.defaultProps = {};

export default MeasureRef;
