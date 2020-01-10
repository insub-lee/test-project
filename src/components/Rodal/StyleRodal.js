import styled from 'styled-components';
import { borderRadius } from 'config/style-util';
import IconAttachedFile from 'images/common/icon-attachedfile-white.png';
import IconFileDonwload from 'images/common/icon-file-download.png';

const RodalContentStyle = styled.div`
  &.contentWrapper {
    @media only screen and (max-width: 1160px) {
      height: 100% !important;

      .ant-row-flex {
        height: 100%;
      }
    }
    @media only screen and (max-width: 320px) {
      width: 270px !important;
    }
  }

  .leftActivity {
    @media only screen and (max-width: 1160px) {
      height: 50% !important;
    }
    @media only screen and (max-width: 650px) {
      width: 100%;
    }

    .rodalCustomScrollbar {
      width: calc(100% - 15px) !important;
      height: calc(100vh - 230px) !important;
      background: #ffffff;

      @media only screen and (max-width: 1160px) {
        width: 100% !important;
        height: 100% !important;
      }

      .content {
        padding: 10px;
      }
    }
  }

  .rightActivity {
    @media only screen and (max-width: 1160px) {
      width: 100% !important;
      height: 50% !important;
      margin-top: 15px;
    }

    .view {
      height: 98%;
    }
  }
`;

const DrilldownView = styled.div`
  height: 100%;

  .rightContent {
    height: 100%;

    .viewTop {
      height: 40%;
      background-color: #404040;

      .contentInfo {
        padding: 15px 15px 0 15px;
        margin-right: 17px;
      }

      .empData,
      .writtenDate {
        font-size: 12px;
        color: #ffffff;

        &:after {
          content: '';
          display: table;
          clear: both;
        }

        @media only screen and (max-width: 414px) {
          // 2줄
          float: none !important;
          width: 100% !important;
        }
      }
      .empData {
        display: inline-block;
        width: calc(100% - 100px);
        float: left;

        > li {
          float: left;

          &:first-child {
            width: 30px;
          }
          &.name,
          &.dept,
          &.position {
            padding-top: 5px;
            padding-left: 8px;
          }
          &.empNo {
            padding-top: 5px;
            padding-left: 3px;
          }

          .empPicture {
            display: inline-block;
            width: 30px;
            height: 30px;
            margin-right: 8px;
            ${borderRadius('15px')};
            overflow: hidden;

            > img {
              width: 100%;
            }

            &:after {
              content: '';
              display: table;
              clear: both;
            }
          }
        }
      }
      .writtenDate {
        float: right;
        width: 100px;
        padding-top: 5px;
        text-align: right;

        @media only screen and (max-width: 414px) {
          padding-top: 0;
          padding-left: 40px;
          margin-top: -10px;
          text-align: left;
        }
      }

      h1.title {
        display: inline-block;
        width: 100%;
        margin-top: 5px;
        font-size: 14px;
        color: #fd8c08;
      }

      .attachedfiles {
        padding: 0 0 15px 15px;
        margin-right: 17px;

        .saveAll {
          text-align: right;

          > button {
            padding: 2px 10px;

            > span {
              text-decoration: underline;
            }
          }
        }

        table {
          width: 100%;
          font-size: 12px;
          color: #ffffff;

          td {
            max-width: calc(100% - 64px);
            vertical-align: top;

            .iconAttachedfile {
              padding-left: 18px;
              background: url(${IconAttachedFile}) no-repeat 0 5px;
            }

            &:last-child {
              min-width: 52px;
              text-align: right;

              > button.iconSave {
                min-width: 52px;
                padding: 1px 8px 1px 20px;
                background: url(${IconFileDonwload}) no-repeat 3px 50%;
              }
            }
          }
        }
      }
    }

    .viewBottom {
      height: calc(60% - 0px);
      padding: 15px;
      margin-top: 15px;
      background-color: #404040;

      .otherListItems {
        display: inline-block;
        width: 100%;

        > li {
          padding: 1px 0;

          > button {
            max-width: 100%;
            padding: 0;
            text-align: left;

            &.current {
              color: #fd8c08;
              cursor: default;
              pointer-events: none;
            }

            > span {
              display: inline-block;
              margin-right: 5px;
            }
          }
        }
      }
    }

    button {
      font-size: 12px;
      color: #ffffff;
      background: transparent;
    }

    .rodalCustomScrollbar {
      background: transparent;
    }
  }
`;

export { RodalContentStyle, DrilldownView };
