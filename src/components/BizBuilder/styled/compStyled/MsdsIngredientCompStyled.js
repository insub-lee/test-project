import styled from 'styled-components';

const MsdsIngredientCompStyled = styled.div`
  .msdsIngreDientTable {
    width: 45%;
    > thead {
      background-color: #d6ebff;
      > tr {
        border: 1px solid #cccccc;
        text-align: center;
        > td {
          border-left: 1px solid #cccccc;
        }
        > td:first-child {
          border-left: none;
        }
      }
    }
    > tbody {
      > tr {
        border-bottom: 1px solid #cccccc;
        border-left: 1px solid #cccccc;
        border-right: 1px solid #cccccc;
        > tr:first-child {
          border-top: 1px solid #cccccc;
        }
        > td {
          border-left: 1px solid #cccccc;
        }
        > td:first-child {
          border-left: none;
        }
        > td:last-child {
          text-align: center;
        }
      }
    }
    .listCount {
      background-color: #f4f4f4;
    }
  }
`;

export default MsdsIngredientCompStyled;
