import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import ChkItem from './ChkItem';

class HospitalItem extends Component {
  render() {
    const { onCancelPopup, onOkChkItem, reservationInfo, userInfo, checkedVals } = this.props;
    return (
      <BizMicroDevBase
        sagaKey="ChkItem"
        component={ChkItem}
        onCancelPopup={onCancelPopup}
        onOkChkItem={onOkChkItem}
        reservationInfo={reservationInfo}
        userInfo={userInfo}
        checkedVals={checkedVals}
      />
    );
  }
}

export default HospitalItem;