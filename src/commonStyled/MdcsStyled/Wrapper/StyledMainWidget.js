import styled from 'styled-components';

import iconPlusWhite from 'images/portal/mdcsMain/icon-plus-w.png';
import iconPlusGray from 'images/portal/mdcsMain/icon-plus-g.png';
import mainColBg1 from 'images/portal/mdcsMain/main-bg1.png';
import mainColBg2 from 'images/portal/mdcsMain/main-bg2.png';
import IconFileZip from 'images/portal/mdcsMain/icon-file-zip.png';
import IconFileXls from 'images/portal/mdcsMain/icon-file-xls.png';
import IconFileJpg from 'images/portal/mdcsMain/icon-file-jpg.png';
import IconFilePpt from 'images/portal/mdcsMain/icon-file-ppt.png';
import IconWidget1 from 'images/portal/mdcsMain/icon_main1.png';
import IconWidget2 from 'images/portal/mdcsMain/icon_main2.png';
import IconWidget3 from 'images/portal/mdcsMain/icon_main3.png';
import IconWidget4 from 'images/portal/mdcsMain/icon_main4.png';
import IconWidget5 from 'images/portal/mdcsMain/icon_main5.png';
import IconWidget6 from 'images/portal/mdcsMain/icon_main6.png';
import IconWidget7 from 'images/portal/mdcsMain/icon_main7.png';
import IconWidget8 from 'images/portal/mdcsMain/icon_main8.png';
import IconWidget9 from 'images/portal/mdcsMain/icon_main9.png';
import IconWidget10 from 'images/portal/mdcsMain/icon_main10.png';

const StyledMainWidget = styled.div`
  padding: 20px;

  .main-widget-row {
    .main-widget-col {
      float: left;
      background: white;
      position: relative;
      margin: 0 0.5% 14px 0.5%;

      &.col-1-2 {
        width: 12.33%;
      }

      &.col-3 {
        width: 32.33%;
      }

      .widget-inner {
        height: 295px;

        .widget-title {
          color: #fff;
          font-size: 22px;
          font-weight: 600;
          height: 90px;
          line-height: 90px;
          padding: 0 35px;

          .btn-more {
            position: absolute;
            top: 35px;
            right: 35px;
            width: 28px;
            height: 28px;
            background: url(${iconPlusWhite}) no-repeat center;
            border: 1px solid white;
          }
        }

        .widget-board {
          padding: 10px 35px 30px 35px;

          li {
            a {
              position: relative;
              display: block;
              color: #fff;
              width: 100%;
              overflow: hidden;
              text-align: left;
              height: 34px;
              line-height: 34px;
              font-size: 16px;

              span.board-txt {
                display: block;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-wrap: normal;
                width: calc(100% - 40px);
                overflow: hidden;

                .board-icon {
                  width: 16px;
                  height: 18px;
                  margin-right: 8px;
                  display: inline-block;

                  &.icon-file-zip {
                    background: url(${IconFileZip});
                  }

                  &.icon-file-jpg {
                    background: url(${IconFileJpg});
                  }

                  &.icon-file-ppt {
                    background: url(${IconFilePpt});
                  }

                  &.icon-file-xls {
                    background: url(${IconFileXls});
                  }
                }

                .highlight {
                  margin-right: 3px;
                }

                &:hover {
                  text-decoration: underline;
                }
              }

              span.board-etc {
                position: absolute;
                right: 0;
                top: 0;
                font-size: 14px;
                opacity: 0.6;
              }
            }
          }
        }

        .widget-detail {
          position: absolute;
          left: 0;
          top: 0;
          background: rgba(255, 255, 255, 0.95);
          width: 100%;
          height: 100%;
          display: none;

          &.on {
            background: rgba(0, 0, 0, 0.8);
            display: block;
          }

          .detail-inner {
            padding: 30px;

            .detail-title {
              padding-bottom: 25px;
              font-size: 16px;
              text-overflow: ellipsis;
              white-space: nowrap;
              word-wrap: normal;
              width: calc(100% - 35px);
              overflow: hidden;
              color: #fff;
            }

            .detail-content {
              position: relative;
              overflow: hidden;
              height: 100%;
              max-width: 100%;
              outline: none;
              direction: ltr;
              color: white;
              font-size: 13px;
              line-height: 24px;
              margin-right: 17px;

              > div {
                overflow-y: scroll;
                max-height: 195px;
                padding-right: 20px;
              }
            }
          }
        }

        &.widget-black {
          .widget-title {
            color: #333;
            .btn-more {
              background: url(${iconPlusGray}) no-repeat center;
              border: 1px solid #919394;
            }
          }

          .widget-board > li > a {
            color: #333;
          }
        }

        &.widget-notice {
          background: #eff3f6;

          .widget-board li a span.board-txt {
            width: calc(100% - 100px);
          }
        }

        &.widget-bookmark {
          background: #1f3c62;
        }

        &.widget-view {
          background: url(${mainColBg1});
          background-size: cover;
        }

        &.widget-approve {
          background: url(${mainColBg2});
          background-size: cover;
          height: 444px;

          .widget-board li a span.board-txt {
            width: 100%;
          }

          .widget-number {
            font-size: 60px;
            text-align: center;
            color: white;
            margin: 20px 0 45px;

            strong {
              position: relative;
              color: #ffffdf;

              span {
                position: absolute;
                left: 0;
                bottom: 3px;
                height: 2px;
                width: 100%;
                display: block;
                background: #ffffdf;
              }
            }
          }
        }
      }

      .widget-hover-inner {
        position: relative;
        height: 215px;
        color: white;
        background: #798ea4;

        .widget-cover {
          display: block;
          color: white;
          text-align: left;
          width: 100%;
          padding: 20px 10px;
          background: transparent;

          > span {
            display: block;

            &.widget-icon {
              margin-bottom: 10px;
              margin-top: 0;
              height: 38px;

              &.widget-icon1 {
                background: url(${IconWidget1}) no-repeat center;
                width: 29px;
              }

              &.widget-icon2 {
                background: url(${IconWidget2}) no-repeat center;
                width: 36px;
              }

              &.widget-icon3 {
                background: url(${IconWidget3}) no-repeat center;
                width: 33px;
              }

              &.widget-icon4 {
                background: url(${IconWidget4}) no-repeat center;
                width: 42px;
              }

              &.widget-icon5 {
                background: url(${IconWidget5}) no-repeat center;
                width: 32px;
              }

              &.widget-icon6 {
                background: url(${IconWidget6}) no-repeat center;
                width: 37px;
              }

              &.widget-icon7 {
                background: url(${IconWidget7}) no-repeat center;
                width: 40px;
              }

              &.widget-icon8 {
                background: url(${IconWidget8}) no-repeat center;
                width: 33px;
              }

              &.widget-icon9 {
                background: url(${IconWidget9}) no-repeat center;
                width: 34px;
              }

              &.widget-icon10 {
                background: url(${IconWidget10});
                width: 45px;
              }
            }

            &.widget-title-kor {
              font-size: 18px;
              margin-bottom: 5px;
            }

            &.widget-title-eng {
              font-size: 11px;
              opacity: 0.7;
            }

            &.widget-item-number {
              font-size: 20px;
              font-weight: 700;
              position: absolute;
              right: 15px;
              bottom: 10px;
              .total {
                opacity: 0.6;
                font-weight: 400;
              }
            }
          }
        }

        .widget-board {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          color: white;
          z-index: 1;
          padding: 20px;
          background: rgba(65, 93, 124, 0.9);
          display: none;
          .widget-title {
            position: relative;
            height: 28px;
            font-size: 16px;
            font-weight: 500;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-wrap: normal;
            width: calc(100% - 15px);
            overflow: hidden;
            .btn-more {
              position: absolute;
              color: white;
              right: 0;
              top: 1px;
            }
          }

          ul {
            font-size: 0;
            li > a {
              display: block;
              font-size: 14px;
              line-height: 24px;
              color: white;
              text-overflow: ellipsis;
              white-space: nowrap;
              word-wrap: normal;
              width: 100%;
              overflow: hidden;
            }
          }
        }

        &:hover {
          .widget-board {
            display: block;
          }
        }
      }
    }
  }

  .hidden {
    opacity: 0.1;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 1px;
    font-size: 1px;
    line-height: 100px;
    white-space: nowrap;
  }

  .highlight {
    color: #ffffdf;
  }
`;

export default StyledMainWidget;
