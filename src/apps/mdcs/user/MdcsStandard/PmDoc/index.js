import React, { Component } from 'react';

import Input from './Input';
import Modify from './Modify';
import View from './View';
class PmDoc extends Component {
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
    console.log(viewType, '뷰타입..');

    return this.selectViewComponent(viewType);
  }
}
export default PmDoc;
