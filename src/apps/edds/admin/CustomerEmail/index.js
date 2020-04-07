import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import CustomerEmailSend from './CustomerEmailSend';

class CustomerEmail extends Component {
  render() {
    return <BizMicroDevBase id="customerEmail" component={CustomerEmailSend} />;
  }
}

export default CustomerEmail;