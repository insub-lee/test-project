import React, { Component } from 'react';
import BizMicroDevBase from 'components/BizMicroDevBase';
import SignUp from './SignUp';

class EddsSignUp extends Component {
  render() {
    return <BizMicroDevBase sagaKey="EddsSignUp" component={SignUp} />;
  }
}

export default EddsSignUp;