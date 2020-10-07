import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import PropTypes from 'prop-types';
import MainPage from './MainPage';

class eiMaterial extends Component {
  render() {
    const { searchData, deptSearchBarVisible } = this.props;
    return <BizMicroDevBase component={MainPage} sagaKey="eiMaterial" searchData={searchData} deptSearchBarVisible={deptSearchBarVisible} />;
  }
}

eiMaterial.propTypes = {
  searchData: PropTypes.object,
  deptSearchBarVisible: PropTypes.bool,
};

eiMaterial.defaultProps = {
  searchData: {},
};
export default eiMaterial;
