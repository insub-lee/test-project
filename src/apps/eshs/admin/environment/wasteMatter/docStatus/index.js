import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class DocStatus extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="docStatus" component={List} />;
  }
}

DocStatus.propTypes = {};
DocStatus.defaultProps = {};

export default DocStatus;
