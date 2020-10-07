import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import PropTypes from 'prop-types';
import MainPage from './MainPage';

class eiStatement extends Component {
  render() {
    const { searchData, deptSearchBarVisible } = this.props;
    return <BizMicroDevBase component={MainPage} sagaKey="eiStatement" searchData={searchData} deptSearchBarVisible={deptSearchBarVisible} />;
  }
}

eiStatement.propTypes = {
  searchData: PropTypes.object,
  deptSearchBarVisible: PropTypes.bool,
};

eiStatement.defaultProps = {
  searchData: {},
};
export default eiStatement;
