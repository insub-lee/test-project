import styled from 'styled-components';
import bgSuspend from 'images/common/bg-widget-suspend.png';

const ServicePageStyle = styled.div`
  display: table;
  width: 100%;
  height: 100%;

  // 사용중지
  .bgImgSuspend {
    display: table-cell;
    height: 100%;
    background: url(${bgSuspend}) no-repeat 50% 50%;
    vertical-align: middle;
    text-align: center;

    .singleWidget {
      position: relative;
      top: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100vh;
    }

    // .widgetContent {

    .informTxt {
      > span {
        display: block;
        color: #707070;
        font-size: 15px;
        line-height: 22px;

        .emp {
          font-style: normal;
          font-size: 16px;

          &:before {
            content: "'";
          }

          &:after {
            content: "'";
          }
        }

        &.reason {
          font-size: 14px;
          white-space: pre-wrap;
        }
      }
    }
    // }
  }
`;

export default ServicePageStyle;
