/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Viewer from './viewer';
import BizBuilderBase from '../../../components/BizBuilderBase';

class SearchViewer extends Component {
  render() {
    console.debug('###########');
    console.debug(this.props);
    return <BizBuilderBase id="SearchViewer" component={Viewer} viewType="VIEW" {...this.props} />;
  }
}

SearchViewer.propTypes = {
  workSeq: PropTypes.number, // 뷰 필수
  taskSeq: PropTypes.number, // 뷰 필수
  closeBtnUseYn: PropTypes.bool, // 하단 버튼 사용여부
  closeBtnFunc: PropTypes.func, // closeBtn Func
};

SearchViewer.defaultProps = {
  workSeq: 913,
  taskSeq: 10678,
  closeBtnFunc: () => false,
  closeBtnUseYn: true,
};

export default SearchViewer;
