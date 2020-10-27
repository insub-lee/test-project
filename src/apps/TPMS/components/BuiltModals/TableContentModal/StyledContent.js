import styled from 'styled-components';
import iconClose from '../../../images/icon_close_w.png';

const StyledContent = styled.div`
  .sub_tit_bg {
    background: #ebecf0;
    padding: 15px 20px;
    font-size: 0;
    text-align: left;
    position: relative;

    span {
      display: inline-block;
      vertical-align: middle;
    }

    span.big {
      font-weight: 500;
      font-size: 17px;
    }

    span.line {
      width: 1px;
      height: 16px;
      background: #ccc;
      margin: 0 20px;
    }

    span.small {
      font-size: 15px;
      color: #333;
    }

    .btn_wrap {
      float: right;
      margin-top: -9px;
      font-size: 0;
      text-align: center;
      overflow: hidden;

      button.btn_close {
        text-indent: -9999px;
        display: inline-block;
        vertical-align: top;
        width: 30px;
        height: 30px;
        background: #636a78 url(${iconClose}) no-repeat center;
        border-radius: 100%;
      }
    }

    .btn_;
  }

  .view_con {
    padding: 30px;

    .view_txt {
      color: #555;
      font-size: 15px;
      line-height: 24px;
      text-align: left;
    }
  }
`;

export default StyledContent;
