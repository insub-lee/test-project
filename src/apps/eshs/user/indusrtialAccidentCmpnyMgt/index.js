import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';
import List from './pages/ListPage';

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
    return <BizBuilderBase sagaKey="IndusrtialAccidentCmpnyMgt" workSeq={2201} viewType="LIST" CustomListPage={List} loadingComplete={this.loadingComplete} />;
  }
}

IndusrtialAccidentCmpnyMgt.propTypes = {};

IndusrtialAccidentCmpnyMgt.defaultProps = {};

export default IndusrtialAccidentCmpnyMgt;
