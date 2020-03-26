import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
class SafetyImprove extends Component {
  componentDidMount() {}

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  render() {
    return <BizBuilderBase sagaKey="safetyImprove" workSeq={5262} viewType="INPUT" loadingComplete={this.loadingComplete} />;
  }
}

SafetyImprove.propTypes = {};

SafetyImprove.defaultProps = {};

export default SafetyImprove;
