import styled from 'styled-components';

const InterLockStyled = styled.div`
  .InterLockTable {
    width: 100%;
    table {
      width: 100%;
      > thead {
        > tr {
          border: 1px solid #cccccc;
          text-align: center;
          > td {
            border-right: 1px solid #cccccc;
            background-color: #d6ebff;
            text-align: center;
          }
        }
      }
      tbody {
        > tr {
          border: 1px solid #cccccc;
          > td {
            text-align: center;
            border: 1px solid #cccccc;
          }
        }
      }
    }
  }
`;
export default InterLockStyled;
