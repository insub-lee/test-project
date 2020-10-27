import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import PropTypes from 'prop-types';
import MainPage from './MainPage';

class eiStatement extends Component {
  render() {
    const { searchData, deptSearchBarVisible, reqNo } = this.props;
    return <BizMicroDevBase component={MainPage} sagaKey="eiStatement" searchData={searchData} deptSearchBarVisible={deptSearchBarVisible} reqNo={reqNo} />;
  }
}

eiStatement.propTypes = {
  searchData: PropTypes.object,
  deptSearchBarVisible: PropTypes.bool,
  reqNo: PropTypes.string,
};

eiStatement.defaultProps = {
  searchData: {},
  reqNo: undefined,
};
export default eiStatement;
