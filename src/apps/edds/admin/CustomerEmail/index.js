import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import CustomerEmailSend from './CustomerEmailSend';

class CustomerEmail extends Component {
  render() {
    return <BizMicroDevBase sagaKey="customerEmail" component={CustomerEmailSend} />;
  }
}

export default CustomerEmail;