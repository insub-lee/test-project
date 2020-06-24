/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import List from './list';

class CommunicationMgr extends Component {
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
    return <BizBuilderBase sagaKey="CommunicationMgr" workSeq={1301} viewType="LIST" CustomListPage={List} loadingComplete={this.loadingComplete} />;
  }
}

export default CommunicationMgr;
