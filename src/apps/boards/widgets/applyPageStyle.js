import styled from 'styled-components';
import bgApplyPage from 'images/common/bg-widget-applyPage.png';
import bgOnApplying from 'images/common/bg-widget-onApplying.png';

const ApplyPageStyle = styled.div`
  display: table;
  width: 100%;
  height: 100%;

  .widgetContent {
    display: table-cell;
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
  }
`;

export default ApplyPageStyle;
