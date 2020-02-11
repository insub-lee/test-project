import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';

class WorkplaceEshCommittee extends Component {
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
    return <BizBuilderBase sagaKey="WorkplaceEshCommittee" workSeq={1221} viewType="LIST" loadingComplete={this.loadingComplete} />;
  }
}

WorkplaceEshCommittee.propTypes = {};

WorkplaceEshCommittee.defaultProps = {};

export default WorkplaceEshCommittee;
