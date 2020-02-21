import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BizBuilderBase from 'components/BizBuilderBase';

import List from './List';

class roadmapList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {}

  loadingComplete = () => {
    this.setState({
      isLoading: false,
    });
  };

  render() {
    return <BizBuilderBase sagaKey="roadMapList" viewType="LIST" workSeq={2401} CustomListPage={List} loadingComplete={this.loadingComplete} />;
  }
}

roadmapList.propTypes = {};

export default roadmapList;
