import styled from 'styled-components';

const UserModalStyled = styled.div`
  padding: 0px;
  margin: auto;
  height: 100%;
  .userModal_body {
    padding: 0px;
    width: 90%;
    background-color: #ffffff;
    > table {
      width: 100%;
      > tbody {
        border: 1px solid #cccccc;
        > tr,
        > tr > td {
          width: 70%;
          border: 1px solid #cccccc;
          > input {
            width: 50%;
          }
          > input[name='TEL'],
          input[name='tel'] {
            width: 70%;
          }
          > span {
            font-size: small;
            padding: 10px;
          }
        }
        > tr > td:first-child {
          width: 30%;
          background-color: #d6ebff;
        }
      }
    }
  }
`;
export default UserModalStyled;
