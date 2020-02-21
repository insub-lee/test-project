import styled from 'styled-components';

const StyledModal = Component => styled(Component)`
  .ant-modal-header {
    padding: 16px 24px;
    color: rgba(255, 255, 255, 0.65);
    background: #3d6186;
    border-bottom: 1px solid #e8e8e8;
    border-radius: 4px 4px 0 0;
  }
  .ant-modal-title {
    margin: 0;
    color: #ffffff;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    word-wrap: break-word;
  }
  .ant-modal-content {
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
