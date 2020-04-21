import styled from 'styled-components';

import iconPlusWhite from 'images/portal/mdcsMain/icon-plus-w.png';
import iconPlusGray from 'images/portal/mdcsMain/icon-plus-g.png';
import mainColBg1 from 'images/portal/mdcsMain/main-bg1.png';
import mainColBg2 from 'images/portal/mdcsMain/main-bg2.png';
import IconFileZip from 'images/portal/mdcsMain/icon-file-zip.png';

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
          font-size: 24px;
          font-weight: 500;
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
              font-size: 17px;

              span.board-txt {
                display: block;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-wrap: normal;
                width: calc(100% - 100px);
                overflow: hidden;

                .board-icon {
                  width: 16px;
                  height: 18px;
                  margin-right: 8px;
                  display: inline-block;

                  &.icon-file-zip {
                    background: url(${IconFileZip});
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
