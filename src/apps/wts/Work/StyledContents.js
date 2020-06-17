import styled from 'styled-components';
import iconBig from 'apps/wts/images/icon_arr_big.png';
import iconSmall from 'apps/wts/images/icon_arr_small.png';

const StyledContents = styled.div`
  &.expanded {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    padding: 0 !important;

    .sub_con {
      height: calc(100vh - 93px);
      margin-bottom: 30px;
      padding-bottom: 100px !important;
      overflow: auto;

      & > .grid {
        min-height: 0;
        padding-bottom: 100px;
      }
    }
  }

  .sub_wrap {
    background: white;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;

    .sub_tit2 {
      overflow: hidden;
      padding: 15px 25px;
      font-size: 0;
      position: relative;

      .btn_wrap {
        float: right;
        vertical-align: middle;
        min-height: 32px;
        line-height: 32px;
      }

      .btn_wrap button {
        vertical-align: middle;
        display: inline-block;
        line-height: 32px;
        margin: 3px !important;
      }

      .icon_arr_big,
      .icon_arr_small.on {
        width: 32px;
        height: 32px;
        background: url(${iconBig}) no-repeat 9px 8px;
        border-radius: 100%;
        border: 1px solid #a0a0a0;
      }

      .icon_arr_big.on {
        width: 32px;
        height: 32px;
        background: url(${iconSmall}) no-repeat 9px 8px;
        border-radius: 100%;
        border: 1px solid #a0a0a0;
      }

      & > span {
        display: inline-block;
        vertical-align: middle;
      }

      span.small {
        font-size: 17px;
        line-height: 32px;
        font-weight: 500;
        margin-right: 10px;
        color: #333;
      }
    }

    .sub_line {
      //height: 1px;
      border-bottom: 1px solid #d4d7df;
    }

    .sub_tit2 {
      overflow: hidden;
      padding: 15px 25px;
      font-size: 0;
      position: relative;
    }

    .sub_tit2.bg {
      background: #f7fafd;
    }

    .sub_tit2 > span {
      display: inline-block;
      vertical-align: middle;
    }

    .sub_tit2 span.big {
      font-weight: 500;
      font-size: 19px;
      min-height: 32px;
      line-height: 32px;
    }

    .sub_tit2 span.line {
      width: 1px;
      height: 16px;
      background: #ccc;
      margin: 0 20px;
    }

    .sub_tit2 span.col {
      font-size: 19px;
      font-weight: 500;
      color: #1fb5ad;
    }

    .btn_wrap {
      font-size: 0;
      text-align: center;
      overflow: hidden;
    }

    .sub_tit2 .btn_wrap {
      float: right;
      vertical-align: middle;
      min-height: 32px;
      line-height: 32px;
    }

    .grid_item {
      border-radius: 5px;
      border: 1px solid #d4d7df !important;

      &.grid3 {
        width: calc(50% - 18px);
      }
    }

    .sub_con {
      padding: 30px;
      border-top: 1px solid #d4d7df;

      & > .grid {
        min-height: 0;
      }
    }
  }
`;

export default StyledContents;
