import styled from 'styled-components';
import iconBig from 'apps/wts/images/icon_arr_big.png';
import iconSmall from 'apps/wts/images/icon_arr_small.png';
import iconOpenerUp from 'apps/wts/images/icon_arr_up.png';
import iconOpenerDown from 'apps/wts/images/icon_arr_down.png';

const BodyWrap = styled.div`
  background: white;
  border-radius: 5px;

  &.expanded {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 3;

    .sub_con {
      height: calc(100vh - 69px);
      overflow: auto;
    }
  }

  & .sub_tit2 {
    overflow: hidden;
    padding: 15px 25px;
    font-size: 0;
    position: relative;
    border-bottom: 1px solid #d4d7df;

    & > span.line {
      width: 1px;
      height: 16px;
      background: #ccc;
      margin: 0 20px;
    }

    & > .count {
      font-size: 19px;
      font-weight: 500;
      color: #1fb5ad;
    }

    & > span {
      display: inline-block;
      vertical-align: middle;

      &.sub_title {
        font-weight: 500;
        font-size: 19px;
        min-height: 32px;
        line-height: 32px;
      }
    }

    & > div.btn_wrap {
      font-size: 0;
      text-align: center;
      overflow: hidden;
      float: right;
      vertical-align: middle;
      min-height: 32px;
      line-height: 32px;

      button {
        vertical-align: middle;
        display: inline-block;
        line-height: 32px;

        &.icon_expanded {
          text-indent: -9999px;
          font-size: 0;
          width: 32px;
          height: 32px;
          background: url(${iconBig}) no-repeat 9px 8px;
          -webkit-border-radius: 100%;
          -moz-border-radius: 100%;
          border-radius: 100%;
          border: 1px solid #a0a0a0;

          &.active {
            width: 32px;
            height: 32px;
            background: url(${iconSmall}) no-repeat 9px 8px;
            -webkit-border-radius: 100%;
            -moz-border-radius: 100%;
            border-radius: 100%;
            border: 1px solid #a0a0a0;
          }
        }

        &.icon_opener {
          text-indent: -9999px;
          width: 32px;
          height: 32px;
          background: url(${iconOpenerUp}) no-repeat center;
          border-radius: 100%;
          border: 1px solid #abadb5;
          vertical-align: middle;
          display: inline-block;
          line-height: 32px;

          &.active {
            width: 32px;
            height: 32px;
            background: url(${iconOpenerDown}) no-repeat center;
            border-radius: 100%;
            border: 1px solid #abadb5;
          }
        }
      }
    }
  }
  & .sub_con {
    padding: 30px;
    //border-top: 1px solid #d4d7df;
    & button.btnWrap {
      position: absolute;
      right: 0;
      top: 3px;
      transition: all 0.15s ease-out;
    }

    &.collapsed {
      transition: all 0.15s ease-in;
      height: 0;
      padding-top: 0;
      padding-bottom: 0;
      border: none;
      overflow: hidden;
      //display: none;
    }
  }
`;

export default BodyWrap;
