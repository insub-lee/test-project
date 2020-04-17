import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from '../cmsMonthJournal/List';

class CmsRangeJournal extends Component {
  componantDidMount() {}

  render() {
    return <BizMicroDevBase sagaKey="cmsRangeJournal" component={List} rangeYn />;
  }
}

CmsRangeJournal.propTypes = {};
CmsRangeJournal.defaultProps = {};

export default CmsRangeJournal;
