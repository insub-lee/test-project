import styled from 'styled-components';

import iconMainMenu1 from 'images/eshs/main/icon_main_menu1.png';
import iconMainMenu2 from 'images/eshs/main/icon_main_menu2.png';
import iconMainMenu3 from 'images/eshs/main/icon_main_menu3.png';
import iconMainMenu1On from 'images/eshs/main/icon_main_menu1_on.png';
import iconMainMenu2On from 'images/eshs/main/icon_main_menu2_on.png';
import iconMainMenu3On from 'images/eshs/main/icon_main_menu3_on.png';
import iconMore from 'images/eshs/main/icon_more.png';
import iconMoreOn from 'images/eshs/main/icon_more_on.png';

const StyledMainWidget = styled.div`
  padding: 25px;
  overflow: hidden;
  background: #ebf0f6;

  .main-widget-section {
    background: #fff;
    border: 1px solid #dbe1e8;
    border-radius: 4px;
    float: left;
    position: relative;
    overflow: hidden;

    &.widget-left {
      margin-right: 2%;
      width: 49%;
      height: 315px;

      &.widget-left-top {
        margin-bottom: 20px;
      }
    }

    &.widget-right {
      width: 49%;
      height: 315px;

      &.widget-right-top {
        margin-bottom: 20px;
      }
    }

    .section-header {
      border-bottom: 1px solid #ededed;
      padding: 10px 20px;

      .section-title {
        font-size: 18px;
        color: #333;
      }
    }

    .section-body {
      .section-contents {
        margin-bottom: 20px;

        .contents-title {
          font-size: 18px;
          color: #333;
          margin-bottom: 8px;
        }

        .contents-body {
          overflow: hidden;

          .contents-item {
            border: 1px solid #ededed;
            border-radius: 4px;
            background: #fff;
            padding: 20px;
            position: relative;
            width: 32%;
            margin-right: 2%;
            float: left;

            > a {
              display: block;

              .item-icon {
                display: inline-block;
                width: 35px;
                height: 35px;
              }

              .item-btn-link {
                background: url(${iconMore}) no-repeat center;
                background-size: 100%;
                width: 4px;
                height: 35px;
                text-align: right;
                display: inline-block;
                position: absolute;
                right: 20px;
                top: 20px;
              }

              .title-area {
                margin-top: 30px;

                .item-title {
                  font-size: 17px;
                  color: #333;
                  margin-bottom: 5px;
                }

                .item-cont {
                  font-size: 14px;
                  color: #666666;
                  line-height: 1.5em;
                  text-overflow: ellipsis;
                  display: block;
                  -webkit-line-clamp: 2;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                  height: 42px;
                }
              }
            }

            &:hover {
              background: #4197ee;
              border: 1px solid #3883d1;

              .item-btn-link {
                background: url(${iconMoreOn}) no-repeat center;
                background-size: 100%;
              }

              .title-area .item-title,
              .title-area .item-cont {
                color: #fff;
              }
            }

            &:last-child {
              margin-right: 0;
            }
          }
        }

        &.quick-con-1 {
          .item-icon {
            background: url(${iconMainMenu1}) no-repeat center;
            background-size: 100%;
          }

          .contents-item:hover {
            .item-icon {
              background: url(${iconMainMenu1On}) no-repeat center;
              background-size: 100%;
            }
          }
        }

        &.quick-con-2 {
          .item-icon {
            background: url(${iconMainMenu2}) no-repeat center;
            background-size: 100%;
          }

          .contents-item:hover {
            .item-icon {
              background: url(${iconMainMenu2On}) no-repeat center;
              background-size: 100%;
            }
          }
        }

        &.quick-con-3 {
          .item-icon {
            background: url(${iconMainMenu3}) no-repeat center;
            background-size: 100%;
          }

          .contents-item:hover {
            .item-icon {
              background: url(${iconMainMenu3On}) no-repeat center;
              background-size: 100%;
            }
          }
        }

        &:last-child {
          margin-bottom: 0;
        }
      }

      .section-contents-board {
        font-size: 0;
        padding: 10px 0;

        li {
          padding: 5px 10px;

          a {
            position: relative;
            display: block;
            width: 100%;
            overflow: hidden;
            text-align: left;
            color: #666666;
            font-size: 14px;

            .board-txt {
              display: block;
              text-overflow: ellipsis;
              white-space: nowrap;
              word-wrap: normal;
              width: calc(100% - 65px);
              overflow: hidden;

              &:before {
                content: '·';
                display: inline-block;
                margin-right: 4px;
              }
            }

            .board-date {
              position: absolute;
              right: 0;
              top: 1px;
              font-size: 12px;
              color: #cccccc;
            }
          }

          &:last-child {
            margin-bottom: 0;
          }

          &:hover {
            background: #e3f0ff;
            a {
              color: #4491e0;
            }
          }
        }
      }
    }
  }
`;

export default StyledMainWidget;
