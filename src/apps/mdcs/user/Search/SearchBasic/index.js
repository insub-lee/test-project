import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List from './List';
import BizBuilderBase from '../../../components/BizBuilderBase';

class SearchBasic extends Component {
  render() {
    return <BizBuilderBase id="SearchBasic" component={List} {...this.props} viewType="LIST" />;
  }
}

SearchBasic.propTypes = {
  workSeq: PropTypes.number,
  apiInfo: PropTypes.object,
};

SearchBasic.defaultProps = {
};

export default SearchBasic;
