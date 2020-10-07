import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import PropTypes from 'prop-types';
import MainPage from './MainPage';

class eiImportantAssesment extends Component {
  render() {
    const { searchData, deptSearchBarVisible } = this.props;
    return (
      <BizMicroDevBase
        component={MainPage}
        deptSearchBarVisible={deptSearchBarVisible}
        sagaKey="eiImportantAssesment"
        id="eiImportantAssesment"
        searchData={searchData}
        relKey="환경영향평가"
        relKey2="REQ_NO"
        prcId={104}
      />
    );
  }
}

eiImportantAssesment.propTypes = {
  searchData: PropTypes.object,
  deptSearchBarVisible: PropTypes.bool,
};

eiImportantAssesment.defaultProps = {
  searchData: {},
};
export default eiImportantAssesment;
