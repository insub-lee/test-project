import styled from 'styled-components';

// Image
import imgSearch from '../images/Search.png';
import imgNoResult from '../images/No_results.png';

// Icon
import iconSearch from '../images/Search_white.png';
import iconRequired from '../images/Required_20.png';
import iconArrowDropDown from '../images/Dropdown.png';
import iconArrowDropUp from '../images/Dropup_red.png';
import iconArrowDropUpCo from '../images/co/Dropup.png';
import iconDropUp from '../images/Dropup.png';
// import iconMore from '../images/More.png';
import iconLogout from '../images/Logout.png';
import iconWorker from '../images/Worker.png';
import iconAdd from '../images/Add.png';
import iconEdit from '../images/Edit_white.png';
import iconBack from '../images/Back.png';
import iconDropDownCircle from '../images/Dropdown_circle.png';
import iconDropUpCircle from '../images/Dropup_circle.png';
import iconInform from '../images/Inform.png';
import iconFeedback from '../images/Feedback.png';
import iconRecent from '../images/Recent.png';
import iconWork from '../images/Work_order.png';
import iconListView from '../images/List_view.png';
import iconListViewActive from '../images/List_view_active.png';
import iconListViewActiveCo from '../images/co/List_view_active.png';
import iconUnCheck from '../images/Checkbox_circle_disabled.png';
import iconCheck from '../images/Check_circle_white.png';
import iconChecked from '../images/Check_circle.png';
import iconCheckedCo from '../images/co/Check_circle.png';
import iconFullscreen from '../images/Fullscreen_white.png';

// Font
import fontRegular from '../fonts/NotoSansKR-Regular.woff2';
import fontBold from '../fonts/NotoSansKR-Bold.woff2';

// etc
const colorHqPrimary = '#FF6D60';
const colorCoPrimary = '#00A282';

const colorTextNormal = '#757575';
const colorTextSub = '#9e9e9e';
const colorTextBlack = '#212121';
const colorBgBtOver = '#fef1f1';
const colorBgBtOverCo = '#e8f8f5';
const colorBgLightGray = '#e0e0e0';
const colorBgDark = '#757575';

const paddingDefault = '24px';

const heightHeader = '56px';
const heightFooter = '72px';
const heightSearch = '128px';
const heightSearchSelect = '56px';
const heightTitle = '60px';
const heightBtnL = '56px';
const heightBtnM = '48px';
const heightBtnS = '36px';

const widthGuide = '420px';
const widthGuideExpand = '708px';

const borderRadius = '4px';


const StylePmTabletDetail = styled.div`
  @viewport {
    zoom: 1;
    width: device-width; // 100vw
    orientation: landscape; // 세로는 portrait
  }

  @font-face{
    font-family:'Noto Sans Regular';
    src: url(${fontRegular}) format('woff2');
    font-style:normal;
    font-weight:400;
  }
  
  @font-face{
    font-family:'Noto Sans Bold';
    src: url(${fontBold}) format('woff2');
    font-style:normal;
    font-weight:400;
  }

  // hypmTablet 공통

  * {
    font-family:'Noto Sans Regular', AppleSDGothicNeo, sans-serif;
  }

  ul, li { margin: 0; padding: 0}
  
  .hypmTablet {
    color : ${colorTextNormal};
    background-color: #fff ;
    font-size: 14px;
    height: 100vh;

    header {
      width: 100%;
      height: ${heightHeader};
      background-color: #fff;
      position: sticky;
      top: 0;
      z-index: 3;
      box-shadow: 0 4px 4px 0 rgba(0,0,0,0.24);

      &:after {
        content: "";
        clear: both;
        display: table;
        width: 100%;
        height: 0;
        visibility: hidden;
      }

      h1 {
        float: left;
        margin: 13px 0 0 24px;
        height: 30px;
        line-height: 30px;
        font-family:'Noto Sans Bold';
        font-size: 20px;
        color: ${colorHqPrimary};
      }
      
      .go-main + h1 {
        margin-left: 0;
      }

      .btn-header {
        border: none !important;
        border-radius: 0;
        width: 60px;
        height: ${heightBtnL};
        text-indent: -10000px;
        overflow: hidden;
        vertical-align: top;

        &.go-main {
          float: left;
          background: transparent url(${iconBack}) no-repeat 50% 50%;
          background-size: 24px 24px;
        }

        &.more {
          background: transparent url(${iconDropDownCircle}) no-repeat 50% 50%;
          background-size: 24px 24px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          padding: 0;
          vertical-align: text-top;
          margin-left: 10px;

          &.active {
            background: transparent  url(${iconDropUpCircle}) no-repeat 50% 50%;
            background-size: 24px 24px;
          }
        }

        &.inform {
          background: transparent url(${iconInform}) no-repeat 50% 50%;
          background-size: 24px 24px;
        }

        &.feedback {
          background: transparent url(${iconFeedback}) no-repeat 50% 50%;
          background-size: 24px 24px;
          display: none;
        }

        &.recent {
          background: transparent url(${iconRecent}) no-repeat 50% 50%;
          background-size: 24px 24px;
        }

        &.work {
          background: transparent url(${iconWork}) no-repeat 50% 50%;
          background-size: 24px 24px;
        }

        &.list {
          background: transparent url(${iconListView}) no-repeat 50% 50%;
          background-size: 24px 24px;

          &.active {
            background: transparent  url(${iconListViewActive}) no-repeat 50% 50%;
            background-size: 24px 24px;
          }
        }

        &.logout {
          background: transparent url(${iconLogout}) no-repeat 50% 50%;
          background-size: 24px 24px;
        }

        &.change-worker {
          background: transparent url(${iconWorker}) no-repeat 50% 50%;
          background-size: 24px 24px;          
        }

        .count {
          position: absolute;
          top: 10px;
          left: 32px;
          min-width: 16px;
          height: 16px;
          text-align: center;
          text-indent: initial;
          font-size: 11px;
          font-style: normal;
          line-height: 16px;
          background: #E50F10;
          border-radius: 8px;
          color: #fff;

          &:empty {
            display: none;
          }
        }
      }

      .detail-tool {
        float: left;

        .sheet-info {
          font-size: 18px;
          color: ${colorTextBlack};
          line-height: 56px;

          &:before {
            content: "";
            display: inline-block;
            width: 1px;
            height: 32px;
            background-color: ${colorBgLightGray};
            margin-left: 24px;
            margin-right: 24px;
            vertical-align: middle; 
          }
        }

        .btn-area {
          position: absolute;
          top: 0;
          left: 50%;
          margin-left: -102px;

          li {
            float: left;
          }

          &:before, &:after {
            content: "";
            display: inline-block;
            float: left;
            width: 1px;
            height: 32px;
            background-color: ${colorBgLightGray};
            margin-top: 12px;
            vertical-align: middle;             
          }

          &:before {
            margin-right: 12px;
          }

          &:after {
            margin-left: 12px;
          }
        }
      }

      .user-area {
        float: right;

        li {
          float: left;

          &.user-info {
            height: ${heightHeader};
            line-height: ${heightHeader};
            color: ${colorTextBlack};
            font-size: 14px;
            font-weight: bold;
            padding-left: 24px;

            .name {
              display: inline-block;
              text-align: center;
              min-width: 48px;
              position: relative;
              

              &:empty {
                &:before {
                  content: "-";
                }
              }
            }

            i.count {
              font-size: 14px;
              font-style: normal;
              font-weight: normal;
              color: ${colorCoPrimary};

              &:before {
                content: "+";
              }

              &:empty {
                display: none;
              }
            }
          }
        }
      }

      .list-view {
        float: right;

        &:after {
          content: "";
          display: inline-block;
          width: 1px;
          height: 32px;
          margin-top: 12px;
          background-color: ${colorBgLightGray};
          vertical-align: middle; 
        }
      }
    }

    // header END

    main {
      height: calc(100vh - ${heightHeader});

      .search-area {
        display: flex;
        justify-content: space-between;;
        flex-direction: row;
        // flex-wrap: nowrap;
        border-bottom: 1px solid ${colorBgLightGray};
        background-color: #F2F4F4;
        padding: ${paddingDefault};
        position: sticky;
        top: ${heightHeader};
        height: ${heightSearch};
        z-index: 2;
        
        .search-item {
          width: calc((100% - 140px) / 3);

          .search-label {
            display: block;
            margin-bottom: 4px;

            &:before {
              content: "";
              width: 16px;
              height: 16px;
              display: inline-block;
              background: transparent url(${iconRequired}) no-repeat 50% 50%;
              background-size: 100% 100%;
              filter: gray;
              -webkit-filter : grayscale(100%);
              vertical-align: middle;
            }

            &.required:before  {
              filter: none;
              -webkit-filter : none;
            }
          }

          .search-select {
            display: block;

            .ant-select {
              display: block;

              .ant-select-selection {
                border-radius: ${borderRadius};
                border-color: rgba(0,0,0, .32) !important;
                height: ${heightSearchSelect};
              }

              .ant-select-selection__rendered {
                line-height: 54px;
                font-size: 16px;
                color: rgba(0,0,0, .87);
                margin: 0 16px;
              }
            }

            .ant-select-disabled .ant-select-selection__rendered {
              color: rgba(0,0,0, .38);
            }

            .ant-select-arrow {
              top: 50%;
              right: 12px;
              width: 24px;
              height: 24px;
              margin-top: -12px;
              z-index: 1;
            
              .anticon {
                width: 24px;
                height: 24px;
                background: transparent url(${iconArrowDropDown}) no-repeat 50% 50%;
                background-size: auto 100%;
  
                svg {
                  display: none;
                }
              }
            }
              
            .ant-select-open {

              .ant-select-selection {
                border-color: ${colorHqPrimary} !important;
                border-width: 2px !important;
              }

              .anticon {
                  background: transparent url(${iconArrowDropUp}) no-repeat 50% 50%;
                  background-size: auto 100%;                  
              }
            }              
          }
        }
        
        .btn-area {
          padding-left: 10px;

          .btn-search {
            width: 100px;
            height: 80px;
            background: ${colorHqPrimary} url(${iconSearch}) no-repeat 50% 50%;
            background-size: 24px 24px;
            border: none;
            box-shadow: 1px 1px 4px rgba(0,0,0, .2);
            text-indent: -10000px;
            overflow: hidden;

            &:hover, &:focus, &:active, &.active {
                background-color: ${colorHqPrimary} !important;
                border: none !important;
                opacity: .8;
            }
          }
        }
      }

      .firstComment { // 검색 전 코멘트 

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        height: calc(100vh - (${heightHeader} + ${heightSearch}));

        &:before {
          content: "";
          display: inline-block;
          width: 172px;
          height: 167px;
          margin: 0 auto;
          background: transparent url(${imgSearch}) no-repeat 50% 50%;
          background-size: 100% 100%;
        }

        p {
          font-size: 24px;
          line-height: 1.5;
          color: ${colorTextSub};
          text-align: center;
          margin-top: 15px;
        }
      }

      .content {

        padding: 0 ${paddingDefault};

        h2 {
          position: sticky;
          top: calc(${heightHeader} + ${heightSearch});
          height: ${heightTitle};
          line-height: ${heightTitle};
          font-family:'Noto Sans Bold';
          font-size: 18px;
          color: ${colorTextBlack};
          background-color: #fff;
          z-index: 1;
        }

        // 그리드 Custom   

        .grid-area {
          position: sticky;
          top: calc(${heightHeader} + ${heightSearch} + ${heightTitle});
          z-index: 0;
          min-height: calc(100vh - (${heightHeader} + ${heightSearch} + ${heightTitle}) - 108px);
          font-size: 12px;

          .ag-overlay-no-rows-center {
            display: block;
            width: 295px;
            margin: auto;
            padding-top: 152px;
            background: transparent url(${imgNoResult}) no-repeat 50% 0;
            background-size: 184px 152px;
            color: transparent;

            &:after {
              content: "최근 1개월내 선택하신 항목과 일치하는 HyPM 리스트가 없습니다.";
              font-size: 18px;
              display: block;
              height: 56px;
              color: ${colorTextSub};
            }
          }

          .ag-header {
            height: 48px !important;
            border-bottom: 1px solid ${colorBgLightGray};
            
            .ag-header-row {
              height: 48px !important;
              line-height: 48px;
              background-color: #fff;
            }
          }
        }

        .moreGrid {
          display: block;
          text-align: center;
          margin-top: 36px;

          button {
            color: ${colorHqPrimary};
            height: ${heightBtnM};
            line-height: ${heightBtnM};
            padding-left: ${heightBtnM};
            background: transparent url(${iconAdd}) no-repeat 12px 50%;
            background-size: 24px 24px;
            border-color: ${colorBgLightGray};

            &:hover, &:focus, &:active, &.active {
              background-color:  ${colorBgBtOver};
            }
          }
        }
      }

      // detail > sheet-info-area 

      .sheet-info-area {
        background-color: #555;
        color: #fff;
        overflow-x: auto;
        padding: 0;
        height: 0;
        opacity: 0;
        transition: all ease .3s;

        ul {
          display: table;
          width: auto;

          li {
            display: table-cell;
            padding: 16px 24px;

            > span {
              display: block;
              white-space: nowrap;

              &.title {
                color: rgba(255,255,255, .5);
                font-size: 12px;
                margin-bottom: 2px;
              }

              button.edit {
                border: none;
                background: transparent url(${iconEdit}) no-repeat 50% 50%;
                background-size: 100% 100%;
                width: 16px;
                height: 16px;
                margin-left: 8px;
                text-indent: -10000px;
                overflow: hidden;
                vertical-align: middle;
              }
            }
          }
        }
      }

      // detail section

      &.detail {
        height: calc(100vh - (${heightHeader} + ${heightFooter}));

        .detail-section {
          position: relative;
          width: 100%;
          height: 100%;
          transition: all ease .3s;
          overflow: hidden;

          .pmSheet-list {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            width: calc(100% - ${widthGuide});
            z-index: 1;
            transition: all ease .3s;            
            overflow: auto;

            > table {
              width: 100%;
              border: none;

              thead {
                th {
                  height: ${heightBtnS};
                  font-size: 12px;
                  color: ${colorTextNormal};
                  border-bottom: 1px solid ${colorBgLightGray};
                  width: 80px;
                  text-align: center;
                }

                tr > th:first-child {
                  width: auto;
                  text-align: left;
                  padding-left: 24px;
                }
              }

              tbody {

                > tr {
                  > th {
                    border-bottom: 1px solid ${colorBgLightGray};
                    padding-left: 48px;
                    position: relative;
                  }

                  > td {
                    height: ${heightBtnM};
                    line-height: 1.5;
                    border-top: 1px solid ${colorBgLightGray};
                    text-align: center;
                  }

                  &:hover, &:focus, &:active {
                    th, td {
                      background-color: ${colorBgBtOver} !important;
                    }
                  }

                }

                > tr.level-1 {
                  > th, > td {
                    background-color: #fff;
                  }

                  > th {                    
                    &:before {
                      content: "";
                      position: absolute;
                      width: 24px;
                      height: 24px;
                      top: 12px;
                      left: 16px;
                      background: transparent url(${iconArrowDropDown}) no-repeat 50% 50%;
                      background-size: 100% 100%;
                    }
                  }

                  &.selected {
                    > th {                    
                      &:before {
                        background: transparent url(${iconDropUp}) no-repeat 50% 50%;
                        background-size: 100% 100%;
                      }
                    }
                  }

                  &.progress {
                    > th, > td {
                      color: ${colorTextBlack} !important;
                    }                    
                  }

                  &.done {
                    > th, > td {
                      color: ${colorTextSub} !important;
                    }                    
                  }

                  > td {
                    .btn-list {
                      height: ${heightBtnS};
                      line-height: 34px;
                      padding: 0 12px;
                      color: ${colorTextBlack};

                      &.delay {
                        color: #E50F10;
                      }
                    }
                  }
                }

                tr.level-2 {
                  > th, > td {
                    background-color:  #F2F4F4;
                  }

                  > th {
                    padding-left: 72px;

                    &:before {
                      content: "";
                      position: absolute;
                      width: 24px;
                      height: 24px;
                      top: 12px;
                      left: 16px;
                    }
                  }

                  &.guide-required {
                    > th {                    
                      &:before {
                        background: transparent url(${iconRequired}) no-repeat 50% 50%;
                        background-size: 20px 20px;
                      }
                    }
                  }

                  &.done {
                    > th {                    
                      &:after {
                        content: "";
                        position: absolute;
                        width: 16px;
                        height: 16px;
                        top: 17px;
                        left: 48px;                        
                        background: transparent url(${iconChecked}) no-repeat 50% 50%;
                        background-size: 100% 100%;
                      }
                    }
                  }
                }

                // grouping 추후 개발

                // tr.level-1-1 { 
                //   > th, > td {
                //     background-color: #F9FAFA;
                //   }
                  
                //   > th {
                //     padding-left: 40px;
                //   }
                // }
              }
            }
          }

          .pmSheet-guide {
            background-color: #fff;
            position: absolute;
            top: 0;
            left: calc(100% - ${widthGuide});
            bottom: 0;
            width: ${widthGuide};
            z-index: 2;
            box-shadow: 0 4px 5px 0 rgba(0,0,0,0.14);
            transition: all ease .3s;            
            // overflow: auto;

            .btn-expand {
              position: absolute;
              top: 50%;
              left: -8px;
              width: 16px;
              height: 56px;
              margin-top: -28px;
              background-color: #fff;
              border-radius: ${borderRadius};
              text-indent: -10000px;
              box-shadow: -3px 0 4px 0 rgba(0,0,0,0.12);
              overflow: hidden;

              &:before {
                content: "";
                display: inline-block;
                position: absolute;
                top: 4px;
                left: 4px;
                width: 4px;
                height: 48px;
                background-color: rgba(0,0,0,0.12);
              }

              &:focus {
                box-shadow: -3px 0 4px 0 rgba(0,0,0,0.12);                
              }
            }

            .no-result {
              display: table;
              width: 100%;
              height: 100%;
              
              p {
                display: table-cell;
                vertical-align: middle;
                text-align: center;
                font-size: 18px;
                color: ${colorTextSub};
              }
            }

            h3 {
              font-size: 16px;
              color: ${colorTextBlack};
              margin-bottom: 16px;
              display: inline-block;

              &.required {
                padding-right: 24px;
                background: transparent url(${iconRequired}) no-repeat 100% 50%;
                background-size: 20px 20px;
              }
            }

            // 가이드 탭 
            .guide-area {
              padding: 16px 18px;

              .ant-tabs-nav-wrap {
                margin-bottom: 0;
              }

              .ant-tabs-bar {
                border: none;
                margin-bottom: 8px;
              }

              .ant-tabs-nav {
                display: block;

                .ant-tabs-ink-bar {
                  display: none !important;
                }

                .ant-tabs-tab {
                  color: ${colorHqPrimary};
                  font-weight: bold;
                  height: ${heightBtnS};
                  line-height: 33px;
                  width: 122px;
                  margin: 0;
                  padding: 0;
                  border: 1px solid ${colorBgLightGray} !important;
                  border-radius: ${borderRadius};
                  text-align: center;

                  & + .ant-tabs-tab {
                    margin-left: 9px;
                  }
                  
                  &.ant-tabs-tab-active {
                    color: #fff !important;
                    background-color: ${colorHqPrimary};
                    border-color: ${colorHqPrimary} !important;
                  }

                  span {
                    display: inline-block;
                    position: relative;

                    &:after {
                      content: "";
                      display: inline-block;
                      width: 16px;
                      height: 16px;
                      background: transparent url(${iconUnCheck}) no-repeat 50% 50%;
                      background-size: 100% 100%;
                      vertical-align: middle;
                      margin-left: 8px;
                    }

                    &.check:after {
                      background: transparent url(${iconCheck}) no-repeat 50% 50%;
                      background-size: 100% 100%;
                    }
                    
                    &.checked:after {
                      background: transparent url(${iconChecked}) no-repeat 50% 50%;
                      background-size: 100% 100%;                      
                    }
                  }
                }
              }

              .ant-tabs-tabpane {
                height: 216px;

                .photo, .video, .document {
                  width: 100%;
                  height: 100%;
                  position: relative;
                  z-index: 0;
                }

                img {
                  width: auto;
                  height: auto;
                  max-width: 100%;
                  max-height: 100%;
                }

                .photo {
                  button.full-screen {
                    position: absolute;
                    width: 40px;
                    height: 40px;
                    right:8px;
                    bottom: 8px;
                    background: ${colorBgDark} url(${iconFullscreen}) no-repeat 50% 50%;
                    background-size: 24px 24px;
                    border-radius: 50%;
                    text-indent: -10000px;
                    overflow: hidden;
                    z-index: 9;
                  }
                }
              }
            }

            // 가이드 코멘트
            .comment-area {
              padding: 16px 18px;
              
              ol {
                margin: 0;
                padding-left: 16px;
              }
            }

            .guide-area + .comment-area {
              border-top: 1px solid ${colorBgLightGray};
              margin-top: 20px;
            }
          }
        }
      }
    }

    &.view-info { // 상단 sheet info display
      .detail-section {
        height: calc(100% - 72px) !important;
      }

      .sheet-info-area {
        height: 72px;
        opacity: 1;
      }
    }

    &.view-list { // 가이드 가리고 목록만 보기
      .pmSheet-list {
        width: 100% !important;
      }

      .pmSheet-guide {
        left: 100% !important;
      }
    }
    
    &.expand-guide { // 가이드 영역 확대
      // .pmSheet-list {
      //   width: calc(100% - ${widthGuideExpand}) !important;
      // }

      .pmSheet-guide {
        left: calc(100% - ${widthGuideExpand}) !important;
        width: ${widthGuideExpand} !important;

        .ant-tabs-tabpane {
          height: 378px !important;
        }
      }      
    }

    // 메인 끝

    footer {
      height: ${heightFooter};
      position: fixed;
      bottom: 0;
      width: 100%;
      background-color: #fff;
      box-shadow: 0 1px 18px 0 rgba(0,0,0,0.12);
      border-top: 1px solid ${colorBgLightGray};
      z-index: 3;
      
      .status-area {
        display: table;
        width: 100%;
        height: 100%;

        .item {
          display: table-cell;

          &.left {

          }

          &.center {
            text-align: center;
          }

          &.right {
            text-align: right;
          }

        }
      }
    }

    // 도급사용 테마 

    &.CO {
      header {
        h1 {
          color: ${colorCoPrimary};
        }

        .btn-area {
          .btn-header {
            &.work {
              display: none;
            }
            &.feedback {
              display: block;
            }
          }
        }

        .list.active {
          background: transparent  url(${iconListViewActiveCo}) no-repeat 50% 50%;
          background-size: 24px 24px;
        }

        .user-area i.count {
          color: ${colorCoPrimary};
        }
      }

      main {

        &.detail {
          .detail-section {

            .pmSheet-list {
              > table {
                tbody {
                  > tr {
                    &:hover, &:focus, &:active {
                      th, td {
                        background-color: ${colorBgBtOverCo} !important;
                      }
                    }  
                  }  
  
                  tr.level-2 {
                    &.selected {
                      > th, > td {                      
                        border-top: 2px solid ${colorCoPrimary};
                        border-bottom: 2px solid ${colorCoPrimary};
                      }
                      
                      > th {
                        border-left: 2px solid ${colorCoPrimary};
                      }

                      > td:last-child {
                        border-right: 2px solid ${colorCoPrimary};
                      }
                    }
  
                    &.progress {
                      > th, > td {
                        color: #fff !important;
                        background-color: ${colorCoPrimary} !important;
                      }                    
                    }
  
                    &.done {
                      > th, > td {
                        color: ${colorTextSub} !important;
                      } 

                      > th {                    
                        &:after {
                          background: transparent url(${iconCheckedCo}) no-repeat 50% 50%;
                          background-size: 100% 100%;
                        }
                      }
                    }
                  }
                }
              }
            }
  
            .pmSheet-guide {
              .guide-area {
                .ant-tabs-tab {
                  color: ${colorCoPrimary};
                  
                  &.ant-tabs-tab-active {
                    background-color: ${colorCoPrimary};
                    border-color: ${colorCoPrimary} !important;
                  }
    
                  span {
    
                    &.checked:after {
                      background: transparent url(${iconCheckedCo}) no-repeat 50% 50%;
                      background-size: 100% 100%;                      
                    }
                  }
                }    
              }
            }
          }
        }
        .search-area .search-item .search-select {
          .ant-select-open {
            .ant-select-selection {
              border-color: ${colorCoPrimary} !important;
              border-width: 2px !important;
            }

            .anticon {
                background: transparent url(${iconArrowDropUpCo}) no-repeat 50% 50%;
                background-size: auto 100%;                  
            }
          }
        }

        .btn-search {
          background: ${colorCoPrimary} url(${iconSearch}) no-repeat 50% 50%;
          background-size: 24px 24px;

          &:hover, &:focus, &:active {
            background-color: ${colorCoPrimary} !important;
            border: none !important;
            opacity: .8;
          }
        }
      }

      // ant-button reset 도급사용

      .ant-btn:hover, .ant-btn:focus, .ant-btn:active {
        border: 1px solid ${colorBgLightGray};
        box-shadow: none !important;
        background-color: ${colorBgBtOverCo} !important;
      }
    }
  }

  // ant-button reset

  .ant-btn {
    box-shadow: none !important;
  }

  .ant-btn:hover, .ant-btn:focus, .ant-btn:active {
    border: 1px solid ${colorBgLightGray};
    box-shadow: none !important;
    background-color: ${colorBgBtOver} !important;
  }

  // ant-spin color ---> root 밖에 뜨는 공통 같음 차후 처리 

  .ant-spin-dot i {
    background-color: ${colorHqPrimary};
  }
`;

export default StylePmTabletDetail;
