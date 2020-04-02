import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import RequesterList from './RequesterList';

class RequesterApproval extends Component {
  render() {
    return <BizMicroDevBase id="requesterApproval" component={RequesterList} />
  }
}

export default RequesterApproval;