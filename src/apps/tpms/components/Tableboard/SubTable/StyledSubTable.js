import styled from 'styled-components';

const StyledSubTable = styled.div`
  &.sub_table {
    border: 1px solid #d4d7df;
    background: white;
    width: calc(100% - 2px);

    &.close {
      display: none;
    }

    & .sub_tit_bg {
      position: relative;
      background: #ebecf0;
      padding: 15px 20px;
      font-size: 0;
      text-align: left;

      & span {
        display: inline-block;
        vertical-align: middle;

        &.big {
          font-weight: 500;
          font-size: 17px;
          color: #555;
        }
        &.line {
          width: 1px;
          height: 16px;
          background: #ccc;
          margin: 0 20px;
        }
        &.small {
          font-size: 15px;
          color: #333;
        }
      }
      & .btn_wrap {
        float: right;
        margin-top: -8px;

        & a,
        button {
          margin: 3px !important;
        }
      }
    }
    & .view_con {
      padding: 30px;
    }

    .view_reply {
      border-top: 1px solid #d4d7df;
      padding-top: 30px;
      margin-top: 30px;

      dt {
        color: #1fb5ad;
        font-size: 17px;
        //margin-bottom: 20px;
        padding: 0 30px;
        text-align: left;
      }
    }

    @media screen and (max-width: 1260px) {
      & .sub_tit_bg {
        & span {
          &.small {
            margin-top: 5px;
          }
        }

        & .btn_wrap {
          float: none;
          margin-top: 10px;
          text-align: left;
        }
      }
    }
  }
`;

export default StyledSubTable;
