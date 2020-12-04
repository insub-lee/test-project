import styled from 'styled-components';

export const ModalWrapper = Component => styled(Component)`
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

  .pop_con {
    padding: 10px 30px;
    position: relative;
    background-color: #ffffff;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    form {
      input[type='text'],
      input[type='password'] {
        border: 0px;
        border-bottom: 1px solid #d9e0e7;
        font-size: 15px;
        height: 45px;
        line-height: 45px;
        color: #555;
        vertical-align: middle;
        margin-bottom: 20px !important;
      }

      .ant-modal-footer {
        border-top: 0;
        padding: 0px 15px 10px;
        text-align: center;
      }
    }
  }
`;

export const Wrapper = styled.div`
  background: white;
  border-radius: 5px;
  overflow: hidden;
`;
