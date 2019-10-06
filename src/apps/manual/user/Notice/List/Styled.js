import styled from 'styled-components';

const Wrapper = styled.div`
  // .ant-table {
  //   border-top: 2px solid black;
  //   border-bottom: 2px solid black;
  // }
  .designedTable {
    width: 100%;
    td {
      border: 1px solid black;
      padding: 20px;
    }
    td:first-child {
      background: #fafafa;
      width: 15%;
    }
  }
  .editTable {
    border: 2px solid pink;
  }
  .ant-btn {
    float: right;
    margin-right: 20px;
    &.goBackButton {
      float: left !important;
      margin-top: 20px;
    }
  }
  .EditButtons {
    button {
      float: left !important;
      margin-top: 20px;
    }
  }
  a.title {
    font-size: 16px;
    font-weight: bold;
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
