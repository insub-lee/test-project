import styled from 'styled-components';

const primaryColor = '#886ab5';

const Wrapper = styled.div`
  width: 100%;
  .taskTransferList {
    /* height: 251px;
    overflow: auto; */
    .taskTransferTable {
      /* width: 501px; */
      .ant-table-body {
        margin: 0px;
      }

      .ant-table-thead > tr > th {
        background-color: ${primaryColor};
        text-align: center;
        font-size: 12px;
        padding: 10px;
      }
    }
    .ant-table-small > .ant-table-content > .ant-table-scroll > .ant-table-header > table > .ant-table-thead > tr > th {
      padding: 4px 2px;
    }
    .ant-table-small > .ant-table-content > .ant-table-scroll > .ant-table-body > table > .ant-table-tbody > tr > td {
      padding: 2px;
      font-size: 12px;
    }
    .ant-table colgroup > col.ant-table-selection-col {
      width: 32px;
    }
  }

  .userAddWrapper {
    width: 100%;
    height: 251px;
    text-align: center;
    display: flex;
    align-items: center;
    button {
      width: 38px;
      margin: 0 auto;
    }
    > div {
      margin: auto;
    }
  }

  .applyButtonWrapper {
    text-align: right;
    margin-top: 20px;
  }
`;

export default Wrapper;
