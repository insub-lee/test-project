import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import PropTypes from 'prop-types';
import MainPage from './MainPage';

class eiMaterial extends Component {
  render() {
    const { searchData, deptSearchBarVisible, reqNo } = this.props;
    return <BizMicroDevBase component={MainPage} sagaKey="eiMaterial" searchData={searchData} deptSearchBarVisible={deptSearchBarVisible} reqNo={reqNo} />;
  }
}

eiMaterial.propTypes = {
  searchData: PropTypes.object,
  deptSearchBarVisible: PropTypes.bool,
  reqNo: PropTypes.string,
};

eiMaterial.defaultProps = {
  searchData: {},
  reqNo: undefined,
};
export default eiMaterial;
