import styled from 'styled-components';
import addContent from 'images/common/icon-add.png';

const QuickMenuStyle = styled.div`
  .carouselWrapper {
    display: block;
    padding: 0;

    &.noCentent {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      transform: translate(-50%, -50%);
      color: #909090;
      font-size: 14px;
      text-align: center;
      // background: url(${addContent}) no-repeat 50% 73px;
    }

    // 위젯 2x1 크기일 때 중앙 위치
    .tableDivTwoByOne {
      table {
        width: 540px !important;
        margin: 0 auto;

        @media only screen and (max-width: 650px) {width: 100% !important;}
      }
    }

    table {
      // 화면 너비가 100%될 때
      @media only screen and (max-width: 650px) {width: 100% !important;}

      td {
        width: 90px;
        height: 95px;
        float: left;
        padding: 0;
        letter-spacing: -0.3px;

        @media only screen and (max-width: 650px) {
          width: 33.33% !important;
        }

        .quickmenu {
          height: 95px;
          padding-top: 0;
          text-align: center;
          line-height: 1.1;
          word-break: break-word;
          word-wrap: break-word;

          > a  {
            display: block;
            width: 50px;
            margin: 0 auto;

            .appWrapper {
              display: inline-block;
              border-radius: 10px;
            }
          }

          .titleText {
            padding: 6px 3px 0;
            // color: #404040;    //위젯색상 옵션에 포함됨
            // font-size: 12px;   //위젯색상 옵션에 포함됨
          }
        }

      }
    }
  }
`;

export {
  QuickMenuStyle,
};
