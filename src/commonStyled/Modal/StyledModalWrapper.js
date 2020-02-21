import styled from 'styled-components';

const StyledModalWrapper = Component => styled(Component)`
  .ant-modal-content {
    border-radius: 6px;
    .ant-modal-close-x {
      width: 50px;
      height: 50px;
      line-height: 50px;
      > i {
        color: #000;
        border: 1px solid #000;
        padding: 5px;
        border-radius: 100%;
      }
    }
    .ant-modal-body {
      padding: 0;
      .ant-table-wrapper {
        background-color: #fff;
        border-radius: 4px;
        &.tableCustom {
          .ant-table-tbody > tr > td,
          .ant-table-thead > tr > th {
            padding: 10px 16px;
            border-radius: 0;
            font-size: 12px;
          }
          .ant-table-thead > tr > th {
            background-color: #f7f7f7;
            color: #000;
            border-top: 1px solid #999;
            font-size: 13px;
          }
        }
      }
      /* table 끝 */
    }
  }
  &.modalWrapper .ant-modal-body {
    padding: 24px;
    .ant-col {
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
      font-size: 12px;
    }
    .modalSelect {
      .ant-select {
        font-size: 12px;
      }
    }
    .modalClearBtn {
      text-align: right;
      margin-top: 5px;
    }
  }

  /* modal 안에 있는 테이블에 타이틀 스타일 넣어 주려면 madalCustom 넣으면 됨 */
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
