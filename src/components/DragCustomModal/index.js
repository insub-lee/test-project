import React, { Component } from 'react';
import { DraggableModal, DraggableModalProvider } from 'ant-design-draggable-modal';
import 'antd/dist/antd.css';
import 'ant-design-draggable-modal/dist/index.css';

class DragCustomModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { visible } = this.props;
    return (
      <DraggableModalProvider>
        <DraggableModal visible={visible}>Body text.</DraggableModal>
      </DraggableModalProvider>
    );
  }
}

export default DragCustomModal;
