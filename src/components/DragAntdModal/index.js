import React, { Component } from 'react';
import DragM from 'dragm';
import { Modal } from 'antd';

import StyledAntdModal from 'components/BizBuilder/styled/Modal/StyledAntdModal';

const AntdModal = StyledAntdModal(Modal);

class BuildTitle extends Component {
  updateTransform = transformStr => {
    this.modalDom.style.transform = transformStr;
  };
  componentDidMount() {
    this.modalDom = document.getElementsByClassName("ant-modal-wrap")[0];
    this.modalDom.style.transform = 'translate(0px,0px)';
  }
  render() {
    const { title } = this.props;
    return (
      <DragM updateTransform={this.updateTransform}>
        <div style={{ height: 22 }}>{title}</div>
      </DragM>
    );
  }
}

class DragAntdModal extends Component {
  render() {
    return (
      <AntdModal
        title={<BuildTitle title={this.props.title} />}
        width={this.props.width}
        visible={this.props.visible}
        onOk={this.props.onOk}
        onCancel={this.props.onCancel}
        footer={this.props.footer}
        destroyOnClose={this.props.destroyOnClose}
      >
        {this.props.children}
      </AntdModal>
    );
  }
}

export default DragAntdModal;
