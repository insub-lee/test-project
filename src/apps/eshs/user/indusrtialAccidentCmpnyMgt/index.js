import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';
import CustomInput from './pages/CustomInput';
import CustomModify from './pages/CustomModify';
import CustomList from './pages/CustomList';

class IndusrtialAccidentCmpnyMgt extends Component {
  state = {
    isLoading: true,
  };

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  render() {
    return (
      <>
        <BizBuilderBase
          sagaKey="IndusrtialAccidentCmpnyMgt"
          listSagaKey="IndusrtialAccidentCmpnyList"
          workSeq={2201}
          viewType="INPUT"
          CustomInputPage={CustomInput}
          CustomModifyPage={CustomModify}
          loadingComplete={this.loadingComplete}
        />
        <BizBuilderBase
          sagaKey="IndusrtialAccidentCmpnyList"
          modifySagaKey="IndusrtialAccidentCmpnyMgt"
          CustomListPage={CustomList}
          workSeq={2201}
          viewType="LIST"
          loadingComplete={this.loadingComplete}
        />
      </>
    );
  }
}

IndusrtialAccidentCmpnyMgt.propTypes = {};

IndusrtialAccidentCmpnyMgt.defaultProps = {};

export default IndusrtialAccidentCmpnyMgt;
