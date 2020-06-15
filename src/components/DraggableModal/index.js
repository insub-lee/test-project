import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal-resizable-draggable';
import styled from 'styled-components';

const StyledWrap = styled.div`
  .flexible-modal {
    position: absolute;
    z-index: 1;
    border: 1px solid #ccc;
    background: white;
    padding-top: '50px';
  }
  .flexible-modal-mask {
    position: fixed;
    height: 100%;
    background: rgba(255, 255, 255, 0);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .flexible-modal-resizer {
    position: absolute;
    right: 0;
    bottom: 0;
    cursor: se-resize;
    margin: 5px;
    border-bottom: solid 2px #333;
    border-right: solid 2px #333;
  }
  .flexible-modal-drag-area {
    background: rgba(68, 145, 224, 1);
    height: 50px;
    position: absolute;
    right: 0;
    top: 0;
    cursor: move;
  }
`;
class DraggableModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, visible } = this.props;
    return (
      <StyledWrap>
        <ReactModal style={{ paddingTop: '50px' }} isOpen={visible} initHeight="auto">
          <div>dkdkdkdkdkdk</div>
          {children}
        </ReactModal>
      </StyledWrap>
    );
  }
}

export default DraggableModal;
