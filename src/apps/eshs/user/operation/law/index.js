import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';

class law extends Component {
  componentDidMount() {}

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  render() {
    return <BizBuilderBase sagaKey="law" workSeq={1081} viewType="LIST" loadingComplete={this.loadingComplete} />;
  }
}

law.propTypes = {};

law.defaultProps = {};

export default law;
