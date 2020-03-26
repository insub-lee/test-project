import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
class SafetyImproveAdmin extends Component {
  componentDidMount() {}

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  render() {
    return <BizBuilderBase sagaKey="safetyImproveAdmin" workSeq={5262} viewType="LIST" loadingComplete={this.loadingComplete} listMetaSeq={5461} />;
  }
}

SafetyImproveAdmin.propTypes = {};

SafetyImproveAdmin.defaultProps = {};

export default SafetyImproveAdmin;
