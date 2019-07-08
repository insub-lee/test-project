import styled from 'styled-components';
// import { palette } from 'styled-theme';
// import notifyMarkHover from 'images/common/widget-notify-mark-hover.png';
import notifyMark from 'images/common/widget-notify-mark.png';
import setupWidget from 'images/common/widget-icon-settings2.png';
import deleteWidget from 'images/common/icon-delete-11x11.png';

const WidgetWrapper = styled.div`
  margin: 0 0px;
  height: 100%;
  border: 1px solid #d8d8d8;
  background: #ffffff;

  @media only screen and (max-width: 767) {
    margin-right: 0 !important;
  }
`;

const WidgetHeader = styled.div`
  position: relative;
  height: 36px;

  > h2 {
    position: relative;
    height: 100%;
    padding-top: 12px;
    color: #333333;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
    letter-spacing: -0.5px;

    :hover {
      // border-bottom: 1px solid #ccd2d8;

      .iconsWrapper {
        opacity: 1;
      }

      .notifyStatus {
        background-image: url(${notifyMark});
      }
    }

    .iconsWrapper {
      position: absolute;
      top: 0;
      right: 0;
      display: inline-block;
      width: 70px;
      height: 36px;
      padding: 5px 5px 0 5px;
      opacity: 0;

      > li {
        float: left;

        .setupWidget, .deleteWidget {
          display: inline-block;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          cursor: pointer;
        }

        .setupWidget {
          margin-right: 3px;
          background: #e1e1e1 url(${setupWidget}) no-repeat 50% 50%;
        }
        .deleteWidget {
          background: #e1e1e1 url(${deleteWidget}) no-repeat 50% 50%;
        }
      }
    }
  }

  //제목이 없을 때
  &.noTitle {
    height: 0;
    border-bottom: none;

    > h2 {
      height: 0;
      text-indent: -99999px;

      :hover {
        border-bottom: none;

        .notifyStatus.noTitle {
          opacity: 1;
          background-image: url(${notifyMark});
        }
      }
    }
  }
`;

const WidgetBox = styled.div`
  display: inline-block;
  width: 100%;
  height: calc(100% - 36px) !important;
  padding: 0;
  // cursor: ns-resize;

  &.fullHeight {
    height: 260px !important;

    > div {
      height: 260px !important;

      .carouselWrapper {
        // banner
        height: 260px !important;
      }
    }
  }

  > div {
    height: 100%;

    .ant-card {
      height: 100%;
      border: none;
    }
  }
`;

const WidgetColumn = styled.div`align-content: flex-start;`;

export { WidgetWrapper, WidgetBox, WidgetHeader, WidgetColumn };
