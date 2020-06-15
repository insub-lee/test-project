import styled from 'styled-components';

const StyledDarggableModal = Component => styled(Component)`
  .flexible-modal {
    position: absolute;
    z-index: 1;
    border: 1px solid #ccc;
    background: white;
  }
  .flexible-modal-mask {
    position: fixed;
    height: 100%;
    background: rgba(55, 55, 55, 0.6);
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
    background: rgba(22, 22, 333, 0.2);

    position: absolute;
    right: 0;
    top: 0;
    cursor: move;
  }
`;

export default StyledDarggableModal;
