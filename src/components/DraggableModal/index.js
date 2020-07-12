import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';

import './AntdDraggableModal/style.css';
import { DraggableModal as Modal, DraggableModalProvider } from './AntdDraggableModal';

const DraggableModal = ({ children, ...otherProps }) => (
  <DraggableModalProvider>
    <Modal {...otherProps}>{children}</Modal>
  </DraggableModalProvider>
);

DraggableModal.propTypes = {
  children: PropTypes.node,
};

DraggableModal.defaultProps = {
  children: null,
};

export default DraggableModal;
