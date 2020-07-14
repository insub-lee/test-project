import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import PropTypes from 'prop-types';
import MainPage from './MainPage';

class eiMaterial extends Component {
  render() {
    const { searchData } = this.props;
    return <BizMicroDevBase component={MainPage} sagaKey="eiMaterial" searchData={searchData} />;
  }
}

eiMaterial.propTypes = {
  searchData: PropTypes.object,
};

eiMaterial.defaultProps = {
  searchData: {},
};
export default eiMaterial;
