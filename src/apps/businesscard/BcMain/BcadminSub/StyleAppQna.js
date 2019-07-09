import styled from 'styled-components';
import replyIcon from 'images/bizstore/icon-reply.png';


const StyleAppQna = styled.div`
  position: relative;
  padding-top: 3px;
  border-top: 1px solid #e0e0e0;

  .newQnaWrite, .newFaqWrite {
    position: absolute;
    top: 3px;
    right: 0;
  }

  .ant-tabs-content-animated {
    transition: unset;
  }

  .ant-tabs-tabpane.ant-tabs-tabpane-inactive > div {
    display: none;
  }
  
  .ant-tabs-bar {
    margin:0;
    border-bottom: 0;

    .ant-tabs-ink-bar {
      background-color: #886ab5;
    }

    .ant-tabs-tab {
      margin-right: 1px;
      padding: 12px 40px;
      border-bottom: 2px solid rgba(0,0,0,.1);
      color: #959595;
      font-size: 15px;

      &:hover {
        border-color: #e3e3e3;
        color: #959595;
      }

      &.ant-tabs-tab-active {
        color: #886ab5;
        border-color: #886ab5;
      }
    }
  }

  .ant-collapse {
    margin-top: 30px;

    .ant-collapse-item {
      border-bottom: none;

      .ant-collapse-header {
        padding:9px 0px 10px 18px;
        line-height:1;
        color:#555;

        i {
          position:absolute;
          top:14px;
          left:5px;
          width:4px;
          height:4px;
          background:#bcbcbc;
          
          &:before {
            content:none;
          }
        }
      }

      .ant-collapse-content {
        margin:10px 0px 28px 0px;
        padding:10px 0px 10px 20px;
        color:#555;
        
        .ant-collapse-content-box {
          position:relative;
          padding:0;

          img {
            position:absolute;
            top:4px;
            left:0px;
          }

          p {
            padding-left:20px;
          }
        }
      }
    }
  }

  //FAQ 목록
  .faqListWrapper {
    margin-top: 5px;
    overflow: hidden;

    .faqList {
      display: inline-block;
      width: 100%;
      padding: 0;

      > li {
        width: 100%;
        height: 70px;
        padding: 13px 5px 0 17px;
        color: #404040;
        font-size: 14px;

        &:before {
          position: absolute;
          left: 2px;
          content: '◾';
          color: #bcbcbc;
          font-size: 14px;
        }
        
        &:hover {
          background: #f4f6f7;
          cursor: pointer;
        }

        .itemQ {
          font-weight: 600;
          font-size: 14px;
        }

        .itemA {
          display: block;
          width: 100%;
          margin-top: 6px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

  //Q&A 목록
  .qnaListWrapper {
    margin-top: 13px;
    overflow: hidden;

    .qnaList {
      display: inline-block;
      width: 100%;
      padding: 0;

      > li {
        width: 100%;
        min-height: 70px;
        padding: 13px 5px 10px 17px;
        color: #404040;
        font-size: 14px;

        &:before {
          position: absolute;
          left: 2px;
          content: '◾';
          color: #bcbcbc;
          font-size: 14px;
        }
        
        &:hover {
          background: #f4f6f7;
          cursor: pointer;
        }

        .itemQTitle {
          font-weight: 600;
          font-size: 14px;
        }

        .itemQContent, .itemQUserInfo,
        .itemAnswer, .itemAContent, .itemAUserInfo {
          display: block;
          // width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .itemQContent, .itemQUserInfo,
        .itemAContent, .itemAUserInfo {
          margin-top: 6px;
        }

        .itemAnswer {
          margin-left: 35px;

          .itemAUserInfo {
            margin-left: 25px;
          }
        }

        .itemAContent {
          padding-left: 23px;
          background: url(${replyIcon}) no-repeat 0 50%;
        }
      }

      .userPic {
        display: inline-block;
        width: 25px;
        height: 25px;
        margin-right: 9px;
        border-radius: 50%;
        overflow: hidden;
        vertical-align: middle;

        > img {
          width: 100%;
        }
      }
    }
  }

  // 내용 없음 알림문구
  .noDataNotice {
    height: 635px;
    color: #959595;
    font-size: 14px;
    text-align: top;
    line-height: 3px; //상단 margin-top: 10px 고려해서 수직측 중앙에 놓음

    > img {
      margin-right: 10px;
    }
  }
`;

export default StyleAppQna;
