import styled from 'styled-components';
import bgApplyPage from 'images/common/bg-widget-applyPage.png';
import bgOnApplying from 'images/common/bg-widget-onApplying.png';

const ApplyPageStyle = styled.div`
  height: 100%;

  .applyPageWrapper {
    height: 100%;

    // 페이지 전체,  스크롤 생기지 않도록
    .singleWidget {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: table;
      width: 100%;
      height: 100vh;
      background: #ffffff;
    }    

    .widgetContent {
      display: table-cell;
      width: 100%;
      vertical-align: middle;
      text-align: center;

      &.bgImgApplyPage {
        background: url(${bgApplyPage}) no-repeat 50% 50%;
      }

      &.bgOnApplying {
        background: url(${bgOnApplying}) no-repeat 50% 50%;
      }

      .informTxt {
        > span {
          display: block;
          color: #606060;
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
          
        }
      }

      .btnBRadius {
        height: 27px;
        padding: 0 20px;
        margin-top: 10px;
        font-size: 13px;
        border-radius: 14px;

        &.dkgray {
          color: #ffffff;
          background: #404040;
        }

        &.gray {
          color: #333333;
          background: #c2c2c2;
        }
      }
    }
  }
`;

export default ApplyPageStyle;
