import styled from 'styled-components';

const ListSearchStyled = styled.div`
  padding: 0px;
  margin: auto;
  height: 100%;
  .search-group-layer {
    padding: 0px;
    width: 90%;
    background-color: #ffffff;
    > table {
      width: 100%;
      > tbody {
        border: 1px solid #cccccc;
        > tr {
          > td {
            border: 1px solid #cccccc;
          }
          > td:nth-child(odd) {
            width: 20%;
            background-color: #d6ebff;
            text-align: center;
          }
          > td:nth-child(even) {
            width: 30%;
          }
        }
      }
    }
    > div {
      text-align: center;
    }
  }
`;
export default ListSearchStyled;
