import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import ExternalDistView from './ExternalDistView';

// eslint-disable-next-line react/prefer-stateless-function
class ExternalDist extends Component {
  render() {
    const { docList, onExternalDistComplete, onExternalDistCancel } = this.props;
    return <BizMicroDevBase id="externalDist" component={ExternalDistView} docList={docList} onExternalDistComplete={onExternalDistComplete} onExternalDistCancel={onExternalDistCancel} />;
  }
}

export default ExternalDist;
