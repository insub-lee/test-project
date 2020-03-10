import styled from 'styled-components';

const DeptModalStyled = styled.div`
  margin: auto;
  width: 100%;
  .ant-table-wrapper {
    border: 1px solid #cccccc;
  }
  .ant-table-thead {
    display: none;
  }
  .ant-table-tbody > .ant-table-row-level-0:hover {
    cursor: pointer;
  }
  .ant-table-tbody > tr {
    td {
      text-align: center;
      width: 50%;
    }
    td:first-child {
      width: 20%;
    }
  }
`;
export default DeptModalStyled;
