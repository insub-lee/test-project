import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizMicroDevBase from 'components/BizMicroDevBase';

import Search from './Search';

class SearchDetail extends Component {
  render() {
    const { workSeq, searchType } = this.props;
    return <BizMicroDevBase sagaKey="SearchDetail" workSeq={workSeq} component={Search} searchType={searchType} />;
  }
}

SearchDetail.propTypes = {
  workSeq: PropTypes.number,
  apiInfo: PropTypes.object,
};

SearchDetail.defaultProps = {
  workSeq: 201,
};

export default SearchDetail;
