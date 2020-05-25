import React, { Component } from 'react';

import BizMicroDevBase from 'components/BizMicroDevBase';
import customUserSelectComp from './customUserSelectComp';

class CustomUserSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <BizMicroDevBase {...this.props} sagaKey="CustomUserSelect" component={customUserSelectComp} />;
  }
}
export default CustomUserSelect;
