import styled from 'styled-components';

const DeptModalStyled = styled.div`
  margin: auto;
  width: 100%;
  .deptModal {
    width: 100%;
    > .ant-btn {
      padding-left: 10px;
      border: 1px solid #cccccc;
    }

    > div:first-child {
      background-image: linear-gradient(to right, #cce1ff, #ffffff);
      padding-bottom: 3px;
      border-left: 1px solid #cccccc;
    }

    > div > table {
      width: 100%;

      > thead > tr:first-child {
        background-color: #d6ebff;
        > td {
          text-align: center;
          border: 1px solid #cccccc;
        }
      }
      > thead > tr > td {
        :first-child {
          border-left: 1px solid #cccccc;
        }
        :last-child {
          border-left: 1px solid #cccccc;
          border-right: 1px solid #cccccc;
        }
        > input[name='dept_cd'] {
          width: 100%;
        }
        > input[name='dept_nm'] {
          width: 65%;
        }
        > button {
          width: 10%;
          border: 1px solid #cccccc;
          font-size: small;
        }
      }

      > tbody {
        > tr:hover {
          background-color: lightyellow;
          cursor: Pointer;
        }
        > tr > td {
          border: 1px solid #cccccc;
        }
      }
    }
  }
`;
export default DeptModalStyled;
