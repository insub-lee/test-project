import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List from './List';
// import BizBuilderBase from '../../../components/BizBuilderBase';
import BizMicroDevBase from '../../../components/BizMicroDevBase';

class SearchBasic extends Component {
  render() {
    return <BizMicroDevBase id="SearchBasic" component={List} />;
  }
}

SearchBasic.propTypes = {
  workSeq: PropTypes.number,
  apiInfo: PropTypes.object,
};

SearchBasic.defaultProps = {};

export default SearchBasic;
