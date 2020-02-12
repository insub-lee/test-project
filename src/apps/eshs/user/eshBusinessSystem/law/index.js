import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';

class EshSystemLaw extends Component {
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
    return <BizBuilderBase sagaKey="EshSystemLaw" workSeq={1221} viewType="LIST" loadingComplete={this.loadingComplete} />;
  }
}

EshSystemLaw.propTypes = {};

EshSystemLaw.defaultProps = {};

export default EshSystemLaw;
