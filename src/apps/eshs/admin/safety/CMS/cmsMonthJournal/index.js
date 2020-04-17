import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

class CmsMonthJournal extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="cmsMonthJournal" component={List} />;
  }
}

CmsMonthJournal.propTypes = {};
CmsMonthJournal.defaultProps = {};

export default CmsMonthJournal;
