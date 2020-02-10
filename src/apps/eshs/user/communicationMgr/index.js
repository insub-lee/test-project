/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import BizMicroDevBase from 'components/BizMicroDevBase';
import List from './List';

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
