import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class WMJournal extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="WMJournal" component={List} />;
  }
}

WMJournal.propTypes = {};
WMJournal.defaultProps = {};

export default WMJournal;
