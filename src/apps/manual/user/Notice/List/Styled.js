import styled from 'styled-components';

const Wrapper = styled.div`
  &.manual-descriptions-view {
    width: 100%;
    overflow: hidden;
    border-top: 2px solid #e5e5e5;
    table-layout: auto;
    border-collapse: collapse;
    & table {
      width: 100%;
      table-layout: auto;
      & tr.manual-descriptions-row {
        border-bottom: 1px solid #e8e8e8;
        & th.manual-descriptions-item-label,
        & td.manual-descriptions-item-content {
          font-size: 16px;
          font-weight: normal;
          padding: 16px 24px;
          line-height: 1.5;
          word-break: break-all;
        }
        & td.manual-descriptions-item-label {
          background-color: #f3f1f5;
          color: #000;
          text-align: center;
          white-space: nowrap;
          width: 17%;
        }
        & td.manual-descriptions-item-content {
          display: table-cell;
          background-color: #fff;
          color: #666;
        }
      }
    }
  }
  .ant-btn {
    color: #fff;
    background-color: #886ab5;
    border-color: #886ab5;
    box-shadow: 0 2px 6px 0 rgba(136, 106, 181, 0.5);
    line-height: 0rem;
    padding: 20px;
    &:hover {
      color: #fff;
      background-color: #7453a6;
      border-color: #6e4e9e;
    }
    float: right;
    margin-right: 20px;
    &.goBackButton {
      float: left !important;
      margin-top: 20px;
    }
    width: 105px;
  }
  .EditButtons {
    button {
      float: left !important;
      margin-top: 20px;
    }
  }
  a.title {
    font-size: 17px;
  }
  .ant-table-pagination {
    float: none;
    text-align: center;
  }
  .clearfix {
    width: auto;
  }
  .totalNumberPage {
    margin-left: 20px;
    font-size: 16px;
    font-weight: 550;
  }
`;

export default Wrapper;
