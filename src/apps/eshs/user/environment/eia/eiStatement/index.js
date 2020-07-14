import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import PropTypes from 'prop-types';
import MainPage from './MainPage';

class eiStatement extends Component {
  render() {
    const { searchData } = this.props;
    return <BizMicroDevBase component={MainPage} sagaKey="eiStatement" searchData={searchData} />;
  }
}

eiStatement.propTypes = {
  searchData: PropTypes.object,
};

eiStatement.defaultProps = {
  searchData: {},
};
export default eiStatement;
