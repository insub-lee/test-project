import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';

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
    return <BizBuilderBase sagaKey="IndusrtialAccidentCmpnyMgt" workSeq={2201} viewType="LIST" loadingComplete={this.loadingComplete} />;
  }
}

IndusrtialAccidentCmpnyMgt.propTypes = {};

IndusrtialAccidentCmpnyMgt.defaultProps = {};

export default IndusrtialAccidentCmpnyMgt;
