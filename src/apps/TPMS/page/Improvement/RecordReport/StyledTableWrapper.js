import styled from 'styled-components';
import iconReply from '../../../images/icon_reply.png';
import iconIng1 from '../../../images/icon_ing1.png';
import iconIng2 from '../../../images/icon_ing2.png';
import iconIng3 from '../../../images/icon_ing3.png';
import iconIng4 from '../../../images/icon_ing4.png';
import iconIng5 from '../../../images/icon_ing5.png';
import iconIng6 from '../../../images/icon_ing6.png';

const StyledTableWrapper = styled.div`
  padding: 30px;

  .view_top {
    position: relative;
    margin-bottom: 15px;

    .btn_wrap {
      font-size: 0;
      text-align: center;
      overflow: hidden;
      position: absolute;
      right: 0;
      top: 3px;
    }
  }

  .rc-table-placeholder {
    text-align: center;
  }

  .rc-table-thead {
    th {
      font-size: 15px;
      padding: 12px 14px 11px 14px;
      text-align: center;
      font-weight: 400;
    }
  }

  .rc-table-tbody {
    td {
      font-size: 15px;
      padding: 11px 14px;
      text-align: center;
      color: #555555;

      > button {
        color: #555555;
      }
    }

    .rc-table-expanded-row > td {
      padding: 0;
    }
  }

  .icon.icon_reply {
    text-indent: -9999px;
    display: inline-block;
    vertical-align: middle;
    width: 16px;
    height: 16px;
    background: #697f95 url(${iconReply}) no-repeat center;
    border-radius: 100%;
  }

  .sub_tb_top {
    position: relative;
    height: 20px;
  }
  .mb15 {
    margin-bottom: 15px !important;
  }

  .sub_ing {
    font-size: 14px;
  }

  .sub_ing li {
    float: left;
    color: #555;
    margin-right: 20px;
  }

  .sub_ing .icon {
    margin: -3px 5px 0 0;
  }

  .icon_ing1 {
    width: 21px;
    height: 19px;
    background: url(${iconIng1}) no-repeat center;
  }

  .icon_ing2 {
    width: 21px;
    height: 19px;
    background: url(${iconIng2}) no-repeat center;
  }

  .icon_ing3 {
    width: 21px;
    height: 19px;
    background: url(${iconIng3}) no-repeat center;
  }

  .icon_ing4 {
    width: 21px;
    height: 19px;
    background: url(${iconIng4}) no-repeat center;
  }

  .icon_ing5 {
    width: 21px;
    height: 19px;
    background: url(${iconIng5}) no-repeat center;
  }

  .icon_ing6 {
    width: 21px;
    height: 19px;
    background: url(${iconIng6}) no-repeat center;
  }

  .sub_dot {
    position: relative;
    font-size: 0;
    text-align: center;
    width: 100%;
    max-width: 130px;
    margin: auto;
  }
  .sub_tb_top .sub_dot {
    position: absolute;
    right: 0;
    top: -10px;
  }

  .sub_dot .line {
    height: 1px;
    background: #e6e8e8;
    width: calc(100% - 14px);
    position: absolute;
    left: 7px;
    top: 4px;
    z-index: 1;
  }

  .sub_dot ul {
    position: relative;
    z-index: 2;
  }

  .sub_dot li {
    display: inline-block;
    width: 20%;
    position: relative;
  }

  .sub_dot .dot {
    width: 9px;
    height: 9px;
    border-radius: 100%;
    display: block;
    background: white;
    border: 1px solid #a9adb1;
    margin: 0 auto;
  }

  .sub_dot .on .dot {
    background: #000000;
    border: 1px solid #000000;
  }

  .sub_dot .drop .dot {
    background: #ff5d5d;
    border: 1px solid #ff5d5d;
  }

  .sub_dot .finish .dot {
    background: #0000ff;
    border: 1px solid #0000ff;
  }

  .sub_dot .txt {
    font-size: 12px;
    color: #777;
    display: block;
    margin-top: 5px;
  }

  @media screen and (max-width: 1260px) {
    .view_top {
      text-align: right;

      .btn_wrap {
        display: inline-block;
        position: relative;
        right: 0;
        top: 0;
        margin-top: 15px;
      }
    }
  }

  @media screen and (max-width: 1260px) {
    .rc-table-body {
      overflow-x: scroll;

      table {
        min-width: 1024px;
      }
    }

    .rc-table-thead {
      th {
        -ms-word-break: break-all;
        word-break: break-all;
      }
    }

    .rc-table-tbody {
      td {
        -ms-word-break: break-all;
        word-break: break-all;
      }
    }
  }
`;

export default StyledTableWrapper;
