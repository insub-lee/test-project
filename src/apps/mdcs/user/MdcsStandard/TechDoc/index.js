import React, { Component } from 'react';

import Input from './Input';
import Modify from './Modify';
import View from './View';
class TechDoc extends Component {
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

  setIsDraftModal = isDraftModal => this.setState({ isDraftModal });

  saveTaskAfter = (id, taskSeq, formData) => {
    this.setState({ isDraftModal: true, taskSeq, title: formData.TITLE, formData });
  };

  render() {
    const { viewType } = this.props;
    console.log(viewType, '뷰타입..');

    return this.selectViewComponent(viewType);
  }
}
export default TechDoc;
