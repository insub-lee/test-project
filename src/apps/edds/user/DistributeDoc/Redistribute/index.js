import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import RedistributeRequest from './RedistributeRequest';

class Redistribute extends Component {
  render() {
    const { selectedRow, onCancelPopup } = this.props;
    return <BizMicroDevBase id="redistributeRequest" component={RedistributeRequest} selectedRow={selectedRow} onCancelPopup={onCancelPopup} />
  }
}

export default Redistribute;