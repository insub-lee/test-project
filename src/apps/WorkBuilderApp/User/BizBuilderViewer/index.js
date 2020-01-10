import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';

class BizBuilderViewer extends Component {
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
    const {
      match: { params },
    } = this.props;
    const { ID } = params;
    return <BizBuilderBase id="BizDoc" workSeq={Number(ID || -1)} viewType="LIST" loadingComplete={this.loadingComplete} />;
  }
}

BizBuilderViewer.propTypes = {};

BizBuilderViewer.defaultProps = {};

export default BizBuilderViewer;
