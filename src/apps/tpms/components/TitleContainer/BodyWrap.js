import styled from 'styled-components';
import iconSearchMore from '../../images/icon_search_more.png';

const BodyWrap = styled.div`
  background: ${({ noBackground }) => (noBackground ? 'transparent' : 'white')};
  //background: transparent;
  border-radius: 5px;

  & > .sub_tit2 {
    overflow: hidden;
    padding: 15px 25px;
    font-size: 0;
    position: relative;
    span.big {
      display: inline-block;
      vertical-align: middle;
      font-weight: 500;
      font-size: 19px;
      min-height: 32px;
      line-height: 32px;
    }
    .btn_wrap {
      font-size: 0;
      text-align: center;
      overflow: hidden;
      float: right;
      vertical-align: middle;
      min-height: 32px;
      line-height: 32px;

      button.search_more {
        text-indent: -9999px;
        display: inline-block;
        vertical-align: middle;
        width: 32px;
        height: 32px;
        border-radius: 100%;
        border: 1px solid #a0a0a0;
        background: url(${iconSearchMore}) no-repeat center;
        background-size: 12px;
        transform: rotateX(-180deg);
        line-height: 32px;

        &.on {
          transform: rotateX(0deg);
        }
      }
    }
  }
  & .sub_con {
    padding: ${({ noPadding }) => (noPadding ? '0px' : '30px')};
    //padding: 0;
    &.border_top {
      border-top: 1px solid #d4d7df;
    }
    & button.btnWrap {
      position: absolute;
      right: 0;
      top: 3px;
    }
  }
`;

export default BodyWrap;
