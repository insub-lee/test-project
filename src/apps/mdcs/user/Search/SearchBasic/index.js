import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizMicroDevBase from 'components/BizMicroDevBase';

import List from './List';

class SearchBasic extends Component {
  render() {
    return <BizMicroDevBase sagaKey="SearchBasic" component={List} />;
  }
}

SearchBasic.propTypes = {
  workSeq: PropTypes.number,
  apiInfo: PropTypes.object,
};

SearchBasic.defaultProps = {
};

export default SearchBasic;
