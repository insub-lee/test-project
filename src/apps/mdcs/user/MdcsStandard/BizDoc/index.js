import React, { Component } from 'react';

import Input from './Input';
import Modify from './Modify';
import View from './View';
class BizDoc extends Component {
  selectViewComponent = viewType => {
    switch (viewType) {
      case 'INPUT':
        return <Input {...this.props}></Input>;
      case 'MODIFY':
        return <Modify {...this.props}></Modify>;
      case 'VIEW':
        return <View {...this.props}></View>;
      default:
        break;
    }
  };

  render() {
    const { viewType } = this.props;

    return this.selectViewComponent(viewType);
  }
}
export default BizDoc;
