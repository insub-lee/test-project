import styled from 'styled-components';

const StyledModal = Component => styled(Component)`
  .ant-modal-content {
    padding-top: 30px;
    height: 100%;
  }
  .ant-modal-footer {
    padding: 10px 16px;
    text-align: center;
    background: rgba(0, 0, 0, 0);
    border-top: 1px solid #e8e8e8;
    border-radius: 0 0 4px 4px;
    background: lavender;
  }
`;

export default StyledModal;
