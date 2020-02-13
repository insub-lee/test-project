import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';
import { Data } from 'react-data-grid-addons';

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
    // const {
    //   match: { params },
    //   item,
    // } = this.props;
    // const { ID } = params;
    return <BizBuilderBase sagaKey="IndusrtialAccidentCmpnyMgt" workSeq={2061} viewType="LIST" loadingComplete={this.loadingComplete} />;
  }
}

IndusrtialAccidentCmpnyMgt.propTypes = {};

IndusrtialAccidentCmpnyMgt.defaultProps = {};

export default IndusrtialAccidentCmpnyMgt;
