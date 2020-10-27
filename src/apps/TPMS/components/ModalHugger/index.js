import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import { ModalWrapper, Wrapper } from './Wrapper';

const StyledModal = ModalWrapper(Modal);

export const ModalHugger = ({ closable, maskClosable, modalClassName, visible, onCancel, width, title, children }) => (
  <Wrapper>
    <StyledModal
      className={modalClassName}
      width={width}
      footer={null}
      closable={closable}
      title={title}
      visible={visible}
      onCancel={onCancel}
      centered
      destroyOnClose
      maskClosable={maskClosable}
    >
      {children}
    </StyledModal>
  </Wrapper>
);

ModalHugger.propTypes = {
  modalClassName: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  visible: PropTypes.bool,
  maskClosable: PropTypes.bool,
  closable: PropTypes.bool,
  onCancel: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  footer: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  children: PropTypes.oneOfType([PropTypes.element]),
};

ModalHugger.defaultProps = {
  maskClosable: true,
  modalClassName: '',
  width: '',
  visible: false,
  closable: true,
  onCancel: () => {},
  title: '',
  footer: '',
  children: null,
};
