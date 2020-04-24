import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';
import List from 'apps/eshs/user/pages/ListPage';

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
    return <BizBuilderBase sagaKey="IndustrySafetyAndHealth" workSeq={1733} viewType="LIST" loadingComplete={this.loadingComplete} CustomListPage={List} />;
  }
}

IndustrySafetyAndHealth.propTypes = {};

IndustrySafetyAndHealth.defaultProps = {};

export default IndustrySafetyAndHealth;
