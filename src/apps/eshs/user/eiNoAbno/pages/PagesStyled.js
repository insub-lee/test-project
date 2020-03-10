import styled from 'styled-components';

const PagesStyled = styled.div`
  .text-background {
    background-color: #d6ebff;
  }
  .text-align-center {
    text-align: center;
  }
  .MaterialTable {
    width: 100%;
    table {
      width: 100%;
      border: 1px solid #cccccc;
      thead > tr {
        text-align: right;
        border: 1px solid #cccccc;
      }
      tbody {
        > tr > td:nth-child(2n-1) {
          background-color: #d6ebff;
        }
        > tr > td {
          width: 12.5%;
          text-align: center;
          border: 1px solid #cccccc;
        }
      }
    }
  }
  .MaterialItemTable {
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
          text-align: center;
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
          .text-align-center {
            text-align: center;
          }
        }
        > tr:last-child {
          text-align: center;
          background-color: #f4f4f4;
          cursor: default;
        }
      }
    }
  }
`;
export default PagesStyled;
