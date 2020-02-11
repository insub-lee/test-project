import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';

class IndustrySafetyAndHealth extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {}

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  render() {
    return <BizBuilderBase sagaKey="IndustrySafetyAndHealth" workSeq={1221} viewType="LIST" loadingComplete={this.loadingComplete} />;
  }
}

IndustrySafetyAndHealth.propTypes = {};

IndustrySafetyAndHealth.defaultProps = {};

export default IndustrySafetyAndHealth;
