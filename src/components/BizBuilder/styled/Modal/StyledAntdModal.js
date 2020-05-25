import styled from 'styled-components';

const StyledAntdModal = Component => styled(Component)`
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
      text-align: left;
      background: #4491e0;
      border-bottom: 0;
      padding: 12px 20px;
      .ant-modal-title {
        color: #fff;
      }
    }
    .ant-modal-body {
      padding: 0;
    }
    .ant-modal-footer {
      border-top: 0;
      padding: 0px 15px 10px;
      text-align: center;
    }
  }

  &.modal-table-pad {
    .ant-modal-body {
      padding: 20px;
    }
  }

  &.modal-none-head {
    .ant-modal-close-x {
      display: none;
    }
  }
`;
export default StyledAntdModal;
