import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class CmsDailyJournal extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="cmsDailyJournal" component={List} dangerMainYN />;
  }
}

CmsDailyJournal.propTypes = {};
CmsDailyJournal.defaultProps = {};

export default CmsDailyJournal;
