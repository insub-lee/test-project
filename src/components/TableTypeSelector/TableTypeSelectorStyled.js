import styled from 'styled-components';

const TableTypeSelectorStyled = styled.div`
  .TableTypeSeletorStyled {
    width: 800px;
    height: 500;

    table > tbody > tr {
      > td:first-child {
        font-size: 0.8em;
      }
    }
    .ant-table-selection-column {
      fixed: left;
    }
    .leftTable {
      .ant-table-thead {
        text-align: center;
        background-color: #d6ebff;
      }

      > div table {
        font-size: 0.5em;
        > thead {
          background-color: #d6ebff;
        }
        > tbody {
          > tr {
          }
        }
      }
    }
    .rightTable {
      .ant-table-thead {
        text-align: center;
        background-color: #d6ebff;
      }

      > div table {
        font-size: 0.5em;
        > thead {
          background-color: #d6ebff;
        }
      }
    }
  }
`;

export default TableTypeSelectorStyled;
