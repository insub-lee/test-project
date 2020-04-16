import styled from 'styled-components';

const StyledAntdModal = Component => styled(Component)`
  .ant-modal-content {
    border-radius: 6px;
    .ant-modal-close-x {
      width: 50px;
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      > i {
        color: #fff;
        border: 1px solid #fff;
        padding: 5px;
        border-radius: 100%;
      }
    }
    .ant-modal-header {
      text-align: left;
      background: #4491e0;
      border-bottom: 0;
      padding: 16px 24px;
      .ant-modal-title {
        color: #fff;
      }
    }
    .ant-modal-body {
      padding: 20px;
    }
    .ant-modal-footer {
      border-top: 0;
      padding: 0px 15px 10px;
      text-align: center;
    }
  }
`;
export default StyledAntdModal;
