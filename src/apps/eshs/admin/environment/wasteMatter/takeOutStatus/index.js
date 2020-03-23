import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class TakeOutStatus extends Component {
  componentDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="takeOutStatus" component={List} />;
  }
}

TakeOutStatus.propTypes = {};

TakeOutStatus.defaultProps = {};

export default TakeOutStatus;
