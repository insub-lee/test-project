import styled from 'styled-components';

const StyledModalWrapper = Component => styled(Component)`
  .ant-modal-content {
    border-radius: 6px;
    .ant-modal-close-x {
      width: 50px;
      height: 50px;
      line-height: 50px;
      > i {
        color: #fff;
        border: 1px solid #fff;
        padding: 5px;
        border-radius: 100%;
      }
    }
    .ant-modal-body {
      padding: 0;
    }
  }
  &.modalWrapper .ant-modal-body {
    padding: 24px;
    .ant-col {
      margin-right: 20px;
      &:last-child {
        margin-right: 0;
      }
    }
    .modalSelect {
      .ant-select {
        width: 100%;
      }
    }
    .modalLabel {
      position: relative;
      margin-bottom: 5px;
      .btn-label-clear {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
      }
    }
  }
  &.modalTechDoc {
    .ant-modal-body .ant-col {
      margin-right: 30px;
    }
  }
  &.modalCustom {
    .ant-modal-body {
      padding: 0;
      .pop_tit {
        height: 50px;
        line-height: 50px;
        padding: 0 22px;
        background: #4491e0;
        font-size: 19px;
        font-weight: 500;
        color: white;
        position: relative;
      }
      .pop_con {
        padding: 24px;
      }
    }
  }
`;
export default StyledModalWrapper;
