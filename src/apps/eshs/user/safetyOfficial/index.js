import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';

class Suggest extends Component {
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
    /* const {
      match: { params },
      item,
    } = this.props;
    const { ID } = params; */
    return <BizBuilderBase sagaKey="SafetyOfficial" workSeq={622} viewType="LIST" loadingComplete={this.loadingComplete} />;
  }
}

Suggest.propTypes = {};

Suggest.defaultProps = {};

export default Suggest;
