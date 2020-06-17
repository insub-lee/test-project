import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import ChkInput from './ChkInput';

class ChkMstInput extends Component {
  render() {
    const { onCancelPopup, onSaveAfter, chkTypeCd, chkTypeCdNodeId } = this.props;
    return (
      <BizMicroDevBase
        sagaKey="ChkMstInput"
        component={ChkInput}
        onCancelPopup={onCancelPopup}
        onSaveAfter={onSaveAfter}
        chkTypeCd={chkTypeCd}
        chkTypeCdNodeId={chkTypeCdNodeId}
      />
    );
  }
}

export default ChkMstInput;