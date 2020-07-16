import React, { Component, useState, useCallback } from 'react';
import { Button } from 'antd';
import { DragModal } from './DragModal';
import { DraggableModalProvider } from './DraggableModalProvider';
// import { DraggableModal, DraggableModalProvider } from 'ant-design-draggable-modal';
import 'antd/dist/antd.css';
import 'ant-design-draggable-modal/dist/index.css';

class DraggableModal extends Component {
  render() {
    return (
      <DraggableModalProvider>
        <DragModal {...this.props}>{this.props.children}</DragModal>
      </DraggableModalProvider>
    );
  }
}

export default DraggableModal;
