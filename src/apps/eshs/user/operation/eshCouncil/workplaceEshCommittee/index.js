import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';
import List from 'apps/eshs/user/pages/ListPage';

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
    return <BizBuilderBase sagaKey="WorkplaceEshCommittee" workSeq={1745} viewType="LIST" loadingComplete={this.loadingComplete} />;
  }
}

WorkplaceEshCommittee.propTypes = {};

WorkplaceEshCommittee.defaultProps = {};

export default WorkplaceEshCommittee;
