import styled from 'styled-components';
// import { palette } from 'styled-theme';
// import WithDirection from 'config/withDirection';
// import { borderRadius } from 'style/style-utils';
import iconCloseModal from 'images/portal/icon-modal-close.png';
import iconPhone from 'images/portal/icon-phone.png';
import iconTalk from 'images/portal/icon-talk2.png';
import iconMail from 'images/portal/icon-mail2.png';
import iconTodo from 'images/portal/icon-todo2.png';
import iconHiThanks from 'images/portal/icon-hithanks2.png';
import iconSearch from 'images/portal/icon-search.png';
import iconIn from 'images/portal/icon-in.png';
import iconIn2 from 'images/portal/icon-in2.png';
import iconOut from 'images/portal/icon-out.png';

const StyleModal = styled.div`
  display: inline-block;
  width: 1200px;
  height: 660px;
  background: #ffffff;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -330px;
  margin-left: -600px;

  &.mobile {
    top: 0;
    margin-top: 0;
  }

  //팝업이 아닌 페이지 안에서 보여질 때 (비즈스토어 > My Page 보기 > 페이지 > 앱 설정, 어드민 > 조직관리)
  &.inPage {
    width: 100% !important;
    height: 100%;
    position: relative;
    top: 0;
    left: 0;
    margin-top: 0;
    margin-left: 0 !important;

    // 서비스 바로가기
    .modalContents.quickmenu {
      .innerBody {
        margin-top: 15px;
        padding: 0 15px 15px;
        border: 1px solid #c1c1c1 !important;
        
        @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {  
          /* IE10+ specific styles go here */
          margin-bottom: 17px;
        }

        .SUTable > div {max-height: 450px !important;}
      }
    }

    // 구성원 즐겨찾기
    .modalContents.orgAcivityBody {
      @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {  
        /* IE10+ specific styles go here */
        margin-bottom: 17px;
      }
      
      .members > div:not(.userGridResult) > div:last-child > div {
        width: 100% !important;
      }

      .react-grid-Cell:first-child {width: calc(100% - 40px) !important;} // 체크박스 셀 너비를 제외한 너비
    }

    // 서비스, 구성원
    .treeBox {
      height: 100%;

      > div {width: 100% !important;}
    }

    .inBtn {
      right: 5px !important;
      width: 26px !important;
      height: 70px !important;
      background: url(${iconIn2}) no-repeat 50% 50% !important;
    }
  }
  
  .modalTitle {
    position: relative;
    display: block;
    height: 40px;
    padding: 0 20px;
    background-color: #333333;
    color: #ffffff;
    font-size: 16px;
    line-height: 40px;

    .modalClose {
      position: absolute !important;
      top: 0;
      right: 0;
      width: 43px;
      height: 40px !important;
      border: 0 !important;
      background: url(${iconCloseModal}) no-repeat 50% 50% !important;
    }
  }

  .modalContents {
    position: relative;
    display: inline-block;
    width: 100%;
    // height: calc(100% - 45px);
    padding: 0 20px;

    textarea.ant-input {
      border-color: #cccccc;
      border-radius: 0;
    }
  }

  .modalFooter {
    position: relative;
    display: block;
    height: 65px;
    padding: 15px 20px 0 0;
    text-align: right;

    button + button {
      margin-left: 5px;
    }
  }

  /* 탭 내용에 버튼이 위치하는 경우 */
  .InTab {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }

  /* 조직도 모달창 */
  .orgAcivityBody {
    position: relative;
    display: flex;
    height: 529px;
    margin-top: 15px;

    
    // MobileView
    @media only screen and (max-width: 650px) {height: auto;}
  }

  .orgActivityInnerBody {
    height: 100%;
    overflow: hidden;
    // padding: 0 0 15px 15px;
    margin-left: 0 !important;
    margin-right: 0 !important;
    border: 1px solid #c1c1c1;

    @media only screen and (max-width: 1160px) {border: none;}
  }

  .orgAcivityBody .ant-row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .orgAcivityBody .ant-row > div:not(.rightActivity) {
    padding-left: 15px !important;
    padding-right: 0 !important;
    margin-bottom: 0 !important;
  }

  .orgAcivityBody .leftActivity {
    position: relative;
    width: 743px;
    height: 526px;
    max-height: 526px;
    padding-right: 40px !important;
    margin-bottom: 0 !important;
  }

  .orgAcivityBody .inBtn, 
  .orgAcivityBody .outBtn {
    position: absolute;
    top: 50%;
    right: 3px;
    width: 29px;
    height: 36px;
    border: 0;
  }

  .orgAcivityBody .leftActivity .inBtn {
    margin-top: -36px;
    background: url(${iconIn}) no-repeat 50% 50%;
  }

  .orgAcivityBody .leftActivity .outBtn {
    margin-top: 6px;
    background: url(${iconOut}) no-repeat 50% 50%;
  }

  .orgAcivityBody .leftActivity .tabs {
    width: 100%;
    height: 100%;
  }

  .orgAcivityBody .leftActivity .userGridResult {
    position: absolute;
    top: 61px;
    right: 39px;
  }

  .orgAcivityBody .leftActivity ul.nav-tabs {
    display: inline-block;
    width: 100%;
    padding: 0;
    border-bottom: 1px solid #e5e5e5;
  }

  .orgAcivityBody .leftActivity ul.nav-tabs > li {
    float: left;
    width: auto;
    height: 50px;
  }

  .orgAcivityBody .leftActivity ul.nav-tabs .nav-item .nav-link {
    display: block;
    padding: 0 20px;
    color: #a1a1a1;
    font-size: 14px;
    line-height: 49px;
    text-align: center;
  }

  .orgAcivityBody .leftActivity ul.nav-tabs .nav-item .nav-link.active {
    color: #886ab5;
    border-bottom: 1px solid #886ab5;
  }

  .orgAcivityBody .leftActivity .tab-content {
    width: 292px;
    height: 451px;
    margin-top: 5px;
  }

  .orgAcivityBody .leftActivity .searchOptions .inputWrapper .ant-input {border-radius: 4px;}

  .orgAcivityBody .leftActivity .userGridResult {
    // 탭이 있는 경우
    width: 386px;
    height: 562px;
    float: right;

    .userSearch {
      width: 100%;
      height: 58px;
      padding: 15px;
      background: #f5f5f5;

      .inputWrapper {
        position: relative;
        width: 100% !important;
        height: calc(1.47em + 1rem + 2px);
        margin: auto;

        .ant-input {
          height: calc(1.47em + 1rem + 2px);
          border-color: #e5e5e5;
          border-radius: 4px;
        }

        .searchButton {
          position: absolute;
          top: 4px;
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

    //체크박스(전체선택)
    .react-grid-checkbox-container {
      .react-grid-checkbox {
        top: 13px;
      }
    }

    //탭이 없는 경우
    &.userGridResultNoTab {
      position: absolute;
      top: 15px;
      right: 10px;
      width: 416px;

      .userSearch {
        margin-bottom: 10px;
      }

      .react-grid-Header, .react-grid-Header > div > div,
      .react-grid-HeaderCell {
        height: 0 !important;
      }

      .react-grid-Viewport {
        top: 1px !important;
        height: 427px !important;

        .react-grid-Cell {
          left: 0 !important;
          width: 100% !important;
          padding-left: 8px;
        }
      }
    }

  }

  .orgAcivityBody .rightActivity {
    position: relative;
    width: 400px;
    height: 497px;
    margin-top: 15px;
    margin-bottom: 0 !important;
    border: 2px solid #c1c1c1;

    @media only screen and (max-width: 1160px) {height: 529px; margin-top: 0;} // TabletView
    @media only screen and (max-width: 650px) {width: 100%; height: calc(100vh - 120px);} //MobileView
  }

  .rightActivity {
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
        padding: 0;

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
      padding: 0;
      margin-bottom: 10px;

      > li {
        float: left;
        // width: calc(25% - 6px);
        // min-width: 71px;
        // max-width: 89px;
        width: calc(33% - 6px);
        min-width: 93px;
        max-width: 125px;

        @media only screen and (max-width: 650px) {max-width: 142px; min-width: 59px;}

        &:not(:last-child) {
          margin-right: 8px;
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
      // margin-right: 15px;
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
            height: 158px;

            @media only screen and (max-width: 650px) {height: auto;}

            &:last-child > div {
              @media only screen and (max-width: 1160px) {height: 190px !important;} // TabletView
              @media only screen and (max-width: 650px) {height: calc(100vh - 460px) !important;}
            }

            ul {
              max-height: 158px;
              padding: 5px 0;
              overflow-y: auto;

              @media only screen and (max-width: 650px) {height: auto;}
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

export default StyleModal;
