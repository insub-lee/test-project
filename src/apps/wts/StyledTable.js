import styled from 'styled-components';

const StyledTable = styled.div`
  clear: both;

  table {
    border-spacing: 0;

    &.tb02 {
      width: 100%;

      th,
      td {
        font-size: 14px;
        text-align: center;
        vertical-align: middle;
      }

      th {
        color: white;
        font-weight: 400;
        background: #6e7b95;
        padding: 8px 10px;
      }

      td {
        color: rgb(85, 85, 85);
        border: 1px solid rgb(234, 236, 238);
        border-image: initial;
        padding: 10px;

        &.tb_is {
          padding: 0;
          
          input {
            width: 100%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            padding: 0px 10px;
            background: #fff;
            border: 0;
          }
        }
      }

      .bd {
        th {
          border: 1px solid rgb(90, 104, 133);
        }
      }
    }
  }

  &.ta_wrap {
    margin-top: 15px;
  }
`;

export default StyledTable;
