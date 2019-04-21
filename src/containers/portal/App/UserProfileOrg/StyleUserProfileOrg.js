import styled from 'styled-components';
// import { transition } from '../../../../config/style-util';
import iconPhone from '../../../../images/portal/icon-phone.png';
import iconTalk from '../../../../images/portal/icon-talk2.png';
import iconMail from '../../../../images/portal/icon-mail2.png';
import iconTodo from '../../../../images/portal/icon-todo2.png';
import iconHiThanks from '../../../../images/portal/icon-hithanks2.png';
import iconSearch from '../../../../images/portal/icon-search.png';

const StyleUserProfileOrg = styled.div`
  position: relative;
  display: flex;
  height: 526px;
  margin-top: 15px;

  .orgActivityInnerBody {
    height: 100%;
    overflow: hidden;
    margin-left: 0 !important;
    margin-right: 0 !important;
    border: 1px solid #c1c1c1;
  }

  .ant-row > div:not(.rightActivity) {
    padding-left: 0 !important;
  }

  .ant-row > div:not(.leftActivity) {
    padding-right: 0 !important;
  }

  .leftActivity {
    position: relative;
    width: 748px;
    height: 526px;
    max-height: 526px;
    padding: 0 !important;
    margin-bottom: 0 !important;

    > div:not(.userGridResult) {
      width: 306px;
      padding: 15px;
    }

    .treeTotalWrapper {
      display: flex;
      flex-flow: column;
      width: 100%;
      height: 100%;
      background: #f7f7f7;
    }

    .searchOptions {
      background: #f7f7f7;
    
      .inputWrapper {
        width: 100%;
      }
    }

    .userGridResult {
      position: absolute;
      top: 0;
      right: 0;
      width: 442px;
      height: 562px;
      padding: 15px;
      border-left: 1px solid #cacaca;
      border-right: 1px solid #cacaca;
    
      .userSearch {
        width: 100%;
        height: 60px;
        padding-top: 14px;
        background: #f5f5f5;
    
        .inputWrapper {
          position: relative;
          width: 260px;
          height: 30px;
          margin: auto;
    
          .ant-input {
            height: 30px;
            border-color: #c1c1c1;
          }
    
          .searchButton {
            position: absolute;
            top: 0;
            right: 0;
            width: 30px;
            height: 30px;
            border: 0;
            background: url(${iconSearch}) no-repeat 50% 50%;
            background-size: 50% 50%;
            cursor: pointer;
          }
        }
      }
    
      // Grid 테이블
      .react-grid-Grid {
        height: 451px !important;
    
        .react-grid-Viewport {
          top: 11px !important;
          height: 425px !important;
        }
      }
    
      .react-grid-Header {
        height: 11px !important;
    
        .react-grid-HeaderRow {
          display: none;
        }
      }
    
      .react-grid-Cell {
        left: 0 !important;
        width: 100% !important;
        padding-left: 8px !important;
        cursor: pointer;
    
        &.react-grid-Cell--locked {
          display: none;
        }
      }
    }
  }

  // 조직도 tree에 checkbox가 없음
  .orgTreeWrapper .rstcustom__rowTitle {
    margin-left: 0;
  }

  .orgTreeWrapper .rstcustom__expandButton, 
  .orgTreeWrapper .rstcustom__collapseButton {
    top: 50%;
  }

  .orgTreeWrapper .ReactVirtualized__Grid.ReactVirtualized__List.rst__virtualScrollOverride {
    height: 402px !important;
  }

  .rightActivity {
    position: relative;
    width: 410px;
    height: 100%;
    margin: 0;
    padding: 15px !important;
    border: none;

    .userBasicInfo {
      position: relative;
      width: 100%;
      height: 141px;
      padding-left: 125px;

      .picWrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 110px;
        height: 141px;
        padding: 0;
        border: 1px solid #dedede;
        overflow: hidden;

        > img {
          width: calc(100% - 10px);
          height: calc(100% - 10px);
          margin: 5px;
        }
      }

      .userInfoList {
        padding: 0 15px 0 0;

        > li {
          color: #404040;
          word-wrap: break-word;
        }

        .name {
          min-height: 24px;
          font-size: 14px;
        }

        .dept, .phone {
          font-size: 12px;
        }

        .dept {
          height: 62px;
          padding-top: 11px;

          button.treePathElement {
            display: inline-block;
            padding: 0 3px 0 0;
            background: transparent;
            cursor: pointer;
          }

          .bracket {
            display: inline-block;
            padding: 0 3px 0 0;
          }
        }

        .phone {
          height: 21px;
          padding-left: 16px;
          background: url(${iconPhone}) no-repeat 0 50%;
        }
      }
    }

    .buttonWrapper{
      display: inline-block;
      width: 100%;
      height: 60px;
      padding: 0 15px 0 0;
      margin-bottom: 10px;

      > li {
        float: left;
        width: 25%;

        &:not(:last-child) {
          padding-right: 8px;
        }

        > button {
          width: 100%;
          height: 60px;
          padding-top: 29px;
          border: 2px solid #e1e1e1;
          color: #404040;
          font-size: 12px;
          font-weight: 600;
          border-radius: 5px;
          letter-spacing: -1px;
          cursor: pointer;

          &.icon {
            &.talk {
              background: url(${iconTalk}) no-repeat 50% 8px;
            }
            &.mail {
              background: url(${iconMail}) no-repeat 50% 9px;
            }
            &.todo {
              background: url(${iconTodo}) no-repeat 50% 8px;
            }
            &.hithanks {
              background: url(${iconHiThanks}) no-repeat 50% 6px;
            }
          }
        }
      }
    }

    .userInfoDetails {
      margin-right: 15px;
      border-top: 1px solid #cacaca;

      > table {
        width: 100%;

        tr {
          td {
            height: 30px;
            border-bottom: 1px solid #dddddd;
            color: #404040;
            font-size: 12px;

            }

          &.majorJob td {
            height: 177px;

            ul {
              max-height: 177px;
              padding: 5px 0;
              overflow-y: auto;
            }
          }

          &:last-child td {
            border-color: #cacaca;
          }
        }

      }
    }
  }
`;

export default StyleUserProfileOrg;
