import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizMicroDevBase from 'components/BizMicroDevBase';

import BizStd from './BizStd';
import Search from './Search';

class SearchDetail extends Component {
  render() {
    const { workSeq } = this.props;
    return <BizMicroDevBase id="SearchDetail" workSeq={workSeq} component={Search} />;
  }
}

SearchDetail.propTypes = {
  workSeq: PropTypes.number,
  apiInfo: PropTypes.object,
};

SearchDetail.defaultProps = {
  workSeq: 202,
};

export default SearchDetail;
