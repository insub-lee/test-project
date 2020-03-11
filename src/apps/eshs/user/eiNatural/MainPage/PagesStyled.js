import styled from 'styled-components';

const PagesStyled = styled.div`
  .text-background {
    background-color: #d6ebff;
  }
  .text-align-center {
    text-align: center;
  }
  .itemsTable {
    width: 100%;
    table {
      width: 100%;
      thead {
        border: 1px solid #cccccc;
        border-bottom: none;
        > tr:first-child {
          > td {
            background-color: transparent;
          }
          text-align: right;
        }
        > tr {
          border-bottom: 1px solid #cccccc;
          > td:first-child {
            width: 3%;
          }
          > td:nth-child(2) {
            width: 3%;
          }
          > td {
            border-right: 1px solid #cccccc;
            background-color: #d6ebff;
          }
        }
      }
      tbody {
        > tr {
          border: 1px solid #cccccc;
          :hover {
            background-color: lightyellow;
            cursor: Pointer;
          }
          > td {
            border: 1px solid #cccccc;
          }
        }
        > tr:last-child {
          text-align: center;
          background-color: #f4f4f4;
          cursor: default;
        }
      }
      .text-align-center {
        text-align: center;
      }
    }
  }
`;
export default PagesStyled;
