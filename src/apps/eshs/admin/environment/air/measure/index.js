import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class Measure extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="measure" component={List} />;
  }
}

Measure.propTypes = {};
Measure.defaultProps = {};

export default Measure;
