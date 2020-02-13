import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizBuilderBase from 'components/BizBuilderBase';
import List from '../pages/ListPage';

class GoalManagement extends Component {
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
    return <BizBuilderBase sagaKey="GoalManagement" workSeq={1841} viewType="LIST" loadingComplete={this.loadingComplete} CustomListPage={List} />;
  }
}

GoalManagement.propTypes = {};

GoalManagement.defaultProps = {};

export default GoalManagement;
