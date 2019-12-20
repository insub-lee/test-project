import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizMicroDevBase from 'components/BizMicroDevBase';

import List from './List';

class SearchDetail extends Component {
  render() {
    return <BizMicroDevBase id="SearchDetail" component={List} />;
  }
}

SearchDetail.propTypes = {
  workSeq: PropTypes.number,
  apiInfo: PropTypes.object,
};

SearchDetail.defaultProps = {};

export default SearchDetail;
