import styled from 'styled-components';

import iconPlusWhite from 'images/mdcs/main/icon-plus-w.png';
import iconPlusGray from 'images/mdcs/main/icon-plus-g.png';
import mainColBg1 from 'images/mdcs/main/main-bg1.png';
import mainColBg2 from 'images/mdcs/main/main-bg2.png';
import IconFileZip from 'images/mdcs/main/icon-file-zip.png';
import IconFileXls from 'images/mdcs/main/icon-file-xls.png';
import IconFileJpg from 'images/mdcs/main/icon-file-jpg.png';
import IconFilePpt from 'images/mdcs/main/icon-file-ppt.png';
import IconWidget1 from 'images/mdcs/main/icon_main1.png';
import IconWidget2 from 'images/mdcs/main/icon_main2.png';
import IconWidget3 from 'images/mdcs/main/icon_main3.png';
import IconWidget4 from 'images/mdcs/main/icon_main4.png';
import IconWidget5 from 'images/mdcs/main/icon_main5.png';
import IconWidget6 from 'images/mdcs/main/icon_main6.png';
import IconWidget7 from 'images/mdcs/main/icon_main7.png';
import IconWidget8 from 'images/mdcs/main/icon_main8.png';
import IconWidget9 from 'images/mdcs/main/icon_main9.png';
import IconWidget10 from 'images/mdcs/main/icon_main10.png';

const StyledMainWidget = styled.div`
  padding: 20px;
  overflow: hidden;

  .main-widget-row {
    .main-widget-col {
      float: left;
      background: white;
      position: relative;
      margin: 0 0.5% 14px 0.5%;

      &.col-1-2 {
        width: 15.666%;
      }

      &.col-3 {
        width: 32.33%;
      }

      &.mb-0 {
        margin-bottom: 0;
      }

      .widget-inner {
        height: 230px;

        .widget-title {
          color: #fff;
          font-size: 20px;
          font-weight: 600;
          padding: 20px 20px 0;

          .btn-more {
            position: absolute;
            top: 22px;
            right: 20px;
            width: 28px;
            height: 28px;
            background: url(${iconPlusWhite}) no-repeat center;
            border: 1px solid white;
          }
        }

        .widget-board {
          padding: 15px 25px 0px 25px;

          li {
            color: #fff;
            a {
              position: relative;
              display: block;
              color: #fff;
              width: 100%;
              overflow: hidden;
              text-align: left;
              font-size: 14px;
              margin-bottom: 10px;

              span.board-txt {
                display: block;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-wrap: normal;
                width: calc(100% - 35px);
                overflow: hidden;

                .board-icon {
                  width: 16px;
                  height: 16px;
                  margin-right: 8px;
                  display: inline-block;

                  &.icon-file-zip {
                    background: url(${IconFileZip}) no-repeat center;
                    background-size: 100%;
                  }

                  &.icon-file-jpg {
                    background: url(${IconFileJpg}) no-repeat center;
                    background-size: 100%;
                  }

                  &.icon-file-ppt {
                    background: url(${IconFilePpt}) no-repeat center;
                    background-size: 100%;
                  }

                  &.icon-file-xls {
                    background: url(${IconFileXls}) no-repeat center;
                    background-size: 100%;
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

        &.widget-black {
          .widget-title {
            color: #333;
            .btn-more {
              background: url(${iconPlusGray}) no-repeat center;
              border: 1px solid #919394;
            }
          }

          .widget-board > li,
          .widget-board > li > a {
            color: #333;
          }
        }

        &.widget-notice {
          background: #eff3f6;

          .widget-board li a span.board-txt {
            width: calc(100% - 80px);
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
          height: 314px;

          .widget-board li a span.board-txt {
            width: 100%;
          }

          .widget-number {
            font-size: 45px;
            text-align: center;
            color: white;
            margin: 10px 0;

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
        height: 150px;
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
              height: 30px;

              &.widget-icon1 {
                background: url(${IconWidget1}) no-repeat center;
                width: 29px;
                background-size: 100%;
              }

              &.widget-icon2 {
                background: url(${IconWidget2}) no-repeat center;
                background-size: 100%;
                width: 36px;
              }

              &.widget-icon3 {
                background: url(${IconWidget3}) no-repeat center;
                background-size: 100%;
                width: 33px;
              }

              &.widget-icon4 {
                background: url(${IconWidget4}) no-repeat center;
                background-size: 100%;
                width: 42px;
              }

              &.widget-icon5 {
                background: url(${IconWidget5}) no-repeat center;
                background-size: 100%;
                width: 32px;
              }

              &.widget-icon6 {
                background: url(${IconWidget6}) no-repeat center;
                background-size: 100%;
                width: 37px;
              }

              &.widget-icon7 {
                background: url(${IconWidget7}) no-repeat center;
                background-size: 100%;
                width: 40px;
              }

              &.widget-icon8 {
                background: url(${IconWidget8}) no-repeat center;
                background-size: 100%;
                width: 33px;
              }

              &.widget-icon9 {
                background: url(${IconWidget9}) no-repeat center;
                background-size: 100%;
                width: 34px;
              }

              &.widget-icon10 {
                background: url(${IconWidget10});
                background-size: 100%;
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
              display: none;
            }

            &.widget-item-number {
              font-size: 20px;
              font-weight: 700;
              position: absolute;
              right: 15px;
              bottom: 15px;
              .total {
                opacity: 0.6;
                font-weight: 400;
              }
            }
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
