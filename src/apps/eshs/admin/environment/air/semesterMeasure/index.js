import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class semesterMeasure extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="semesterMeasure" component={List} />;
  }
}

semesterMeasure.propTypes = {};
semesterMeasure.defaultProps = {};

export default semesterMeasure;
