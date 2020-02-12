import React, { Component } from 'react';
import BizBuilderBase from 'components/BizBuilderBase';
import PubDocView from './PubDocView';

// eslint-disable-next-line react/prefer-stateless-function
class ContentView extends Component {
  render() {
    const { taskSeq, workSeq, pubDocInfo } = this.props;
    return <BizBuilderBase CustomViewPage={PubDocView} sagaKey="pubDocView" viewType="VIEW" taskSeq={taskSeq} workSeq={workSeq} pubDocInfo={pubDocInfo} />;
  }
}

export default ContentView;
