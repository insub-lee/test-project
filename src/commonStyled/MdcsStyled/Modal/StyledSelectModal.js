import styled from 'styled-components';

const StyledSelectModal = Component => styled(Component)`
  .ant-modal-content {
    border-radius: 6px;
    .ant-modal-close-x {
      width: 46px;
      height: 46px;
      line-height: 46px;
      font-size: 14px;
      > i {
        color: #fff;
        border: 1px solid #fff;
        padding: 5px;
        border-radius: 100%;
      }
    }
    .ant-modal-header {
      text-align: center;
      background: #4491e0;
      border-bottom: 0;
      padding: 12px;
      .ant-modal-title {
        color: #fff;
      }
    }
    .ant-modal-body {
      padding: 15px;
    }
    .ant-modal-footer {
      border-top: 0;
      padding: 0px 15px 10px;
      text-align: center;
    }
  }
`;
export default StyledSelectModal;
