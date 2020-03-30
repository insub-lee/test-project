import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';
import { Data } from 'react-data-grid-addons';

class sqConfirmRequest extends Component {
  state = {
    isLoading: true,
  };

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  render() {
    return <BizBuilderBase sagaKey="sqConfirmRequest" workSeq={5561} viewType="LIST" loadingComplete={this.loadingComplete} />;
  }
}

sqConfirmRequest.propTypes = {};

sqConfirmRequest.defaultProps = {};

export default sqConfirmRequest;
