import styled from 'styled-components';

const MaterialTableStyled = styled.div`
  .text-background {
    background-color: #d6ebff;
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
`;
export default MaterialTableStyled;
