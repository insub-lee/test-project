import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import PropTypes from 'prop-types';
import MainPage from './MainPage';

class eiImportantAssesment extends Component {
  render() {
    const { searchData } = this.props;
    return <BizMicroDevBase component={MainPage} sagaKey="eiImportantAssesment" id="eiImportantAssesment" searchData={searchData} />;
  }
}

eiImportantAssesment.propTypes = {
  searchData: PropTypes.object,
};

eiImportantAssesment.defaultProps = {
  searchData: {},
};
export default eiImportantAssesment;
