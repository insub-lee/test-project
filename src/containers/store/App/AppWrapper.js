import styled from 'styled-components';
import IconSearch from 'images/bizstore/icon-search.png';
import IconSearchMobile from 'images/bizstore/icon-search-mobile.png';
import IconTriggerUnfold from 'images/bizstore/arrow-down-white.png';
import IconTriggerFold from 'images/bizstore/arrow-up-white.png';
import goBack from 'images/common/icon-back.png';
import IconClose from 'images/common/icon-delete-white-big.png';

const AppWrapper = styled.div`
.storeHeader {
  position: fixed;
  width: 100%;
  height: 42px;
  padding: 0 20px 0 10px;
  color: #ffffff;
  background: #222222;
  z-index: 1000;

  &.ant-layout-header {
    line-height: 1;
  }

  .headerMenu {
    float: left;
    width: 32px;
    height: 43px;
    padding: 0;
    background: transparent;
    text-align: center;
    border: 0;

    .icon.icon-menu {
        display: inline-block;
        font-size: 15px;
        line-height: 24px;
        vertical-align: middle;
        
        &:before {
          color: #ffffff;
        }
    }
  }

  .pageHeader {
    display: inline-block;
    height: 42px;
    position: absolute;
    margin-left: 10px;
    color: #ffffff;
    font-size: 16px;
    line-height: 41px;
  }

  .onCenter {
    position: absolute;
    top: 0;
    left: 50%;
    height: 42px;
    transform: translateX(-50%);

    .siteHeader {
      display: inline-block;
      height: inherit;
      
      > a {
        display: inline-block;
        height: inherit;
        padding-top: 13px;

        > img {
          vertical-align: top;
        }
      }
    }

    // Tablet과 Mobile에서 보임
    .headerMenu {
      display: none;
    }
  }

  .onRight {
    float: right;
    width: 240px;
    height: 42px;
    line-height: 1;

    // Header 검색창
    .searchInput.store {
      position: relative;
      display: inline-block;
      height: 26px;
      margin-top: 8px;
      
      // input 스타일 달라요
      > .ant-input {
        width: 240px;
        height: 26px;
        padding: 0 30px 0 10px;
        border: 0 !important;
        border-radius: 4px;
        color: #FFFFFF;
        font-size: 14px;
        background-color: rgba(255, 255, 255, 0.3);
      }

      > .searchButton {
        position: absolute;
        right: 5px;
        width: 26px;
        height: 26px;
        border: 0;
        background: url(${IconSearch}) no-repeat 50% 50%;
        opacity: 0.7;
        cursor: pointer;
      }
    }

    // Tablet과 Mobile일 때 
    &.mobile {
      .searchButton {
        position: absolute;
        right: 0;
        width: 42px;
        height: 42px;
        border: 0;
        cursor: pointer;
        background:#222222 url(${IconSearch}) no-repeat 50% 50%;
        background-size: 17px 17px;
      }

      // 검색 아이콘 눌렀을 때
      &.active {
        float: none;
        width: 100%;

        .closeBtn {
          position: absolute;
          width: 42px;
          height: 42px;
          border: 0;
        }
  
        .closeBtn {
          left: 0;
          background:#222222 url(${IconClose}) no-repeat 50% 50%;
          background-size: 15px 15px;
        }
  
        .searchInputMobile {
          position: absolute;
          left: 42px;
          width: calc(100% - 84px);
          padding-top: 6px;
          background: #222222;
          text-align: right;
  
          > .ant-input {
            // width: 235px;
            width: 100%;
            border: none !important;
            background: #222222;
            font-size: 15px;
            color: #ffffff;
          }
        }
      }
    }
  }

}

.navTabs {
  display: none;
}

.storeContent {
  min-height: 100vh;
  // padding: 45px 0 0 300px;
  padding: 42px 0 0 0;
  flex-shrink: 0;
  background: #ffffff;

  .contentWrapper {
    position: relative;
    display: flex;
    width: 100%;
    min-height: calc(100vh - 42px);

    > div {
      width: 100%;
    }
    
    .storeLayoutContentWrapper {
      min-height: calc(100vh - 100px);  //header와 footer 높이값 빼기
    }
    
  }
}

.sidebarMobile, .triggerSider {
  //Tablet과 Mobile View에서 보임
  display: none;
}

@media only screen and (max-width: 1024px) {
  .storeHeader {
    width: 100vw;
    height: 42.5px;
    padding: 0;
    line-height: 42.5px;

    .triggerSider {
      // height: 42.5px;
      display: none;
    }

    .headerMenu {
      width: 40px;
    }

    // 모바일 용도
    .goBack {
      position: absolute;
      top: 8px;
      left: 7px;
      width: 26px;
      height: 26px;
      border: 0;
      background: url(${goBack}) no-repeat 50% 50%;
      background-size: 21px 16px;
    }

    .pageHeader {display: none;}

    .onCenter {
      // DesktopView에서 보임
      > a { display: none; }
    }

    .onRight {
      position: absolute;
      right: 0;
      top: 0;
      width: auto;
      height: 42.5px;

      // DesktopView에서 보임
      .searchInput.store {

        > .ant-input {
          // 임시 숨김
          display: none;
        }

        .searchButton {
          top: -6px;
          right: 0;
          width: 42px;
          height: 37.5px;
          background: url(${IconSearchMobile}) no-repeat 50% 50%;
          background-size: 16px 16px;
          opacity: 1;
        }
      }
    }
  }

  .navTabs {
    position: fixed;
    top: 42.5px;
    display: block;
    width: 100%;
    padding: 0 10px;
    background: #ffffff;
    z-index: 1001;

    > li {
      display: inline-block;
      width: 50%;
      height: 42.5px;

      > a {
        display: block;
        height: 42.5px;
        margin: 0;
        padding: 0;
        color: #707070;
        font-size: 14px;
        font-weight: 400;
        border-width: 0 0 1px 0;
        border-color: #d1d2d3;
        border-radius: 0;
        line-height: 42.5px;
        text-align: center;

        &.current {
          color: #222222;
          border-width: 0 0 2.5px 0;
          border-color: #222222;
        }
      }
    }
  }

  .storeContent {
    min-height: calc(100vh - 42.5px);
    padding: 0;

    .contentWrapper {
      min-height: calc(100vh - 42.5px);
      margin-top: 42.5px;

      .gridMode {
        .storeLayoutContentWrapper {
          padding-top: 0;
        }
      }

      .storeLayoutContentWrapper {
        padding-top: 42px;
      }

      .treeWrapper { display: none; } //카테고리, 업무그룹 트리 숨기기
    }
  }

  // .triggerSider {
  //   display: block;

  //   .trigger {
  //     width: 35px;
  //     height: 42.5px;
  //     padding: 0;

  //     &.anticon-sider-unfold {
  //       background: url(${IconTriggerUnfold}) no-repeat 50% 55%;
  //       background-size: 13px 7.5px;
  //     }

  //     &.anticon-sider-fold {
  //       background: url(${IconTriggerFold}) no-repeat 50% 50%;
  //       background-size: 13px 7.5px;
  //     }
      
  //   }
  // }
}

// Route path => {AppList}인 경우
.appListWrapper {
  padding-left: 300px;

  @media only screen and (max-width: 1024px) {
    padding-left: 0;
  }
}

// Route path => {AppDetail}인 경우
.appDetailWrapper {
  padding-left: 300px;

  @media only screen and (max-width: 1024px) {
    padding: 0;
  }
}

// Route path => {Biz}인 경우
.appBizWrapper {
  padding-left: 300px;

  @media only screen and (max-width: 1024px) {
    padding-left: 0;
  }
}

// Route path => {MyPage}인 경우
.appMyPageWrapper {
  display: flex;
  flex-direction: column;
  padding-left: 300px;
  background: #f7f8f9;

  @media only screen and (max-width: 1024px) {
    padding-left: 0;
    padding-top: 50px;
  }

  .myPageContentWrapper {
    position: relative;
    min-height: calc(100vh - 100px);

    //새 위젯 추가
    .addNew {
      height: 100px !important;

      .isoWidgetsWrapper {
        border-color: transparent;
        background: transparent;
        text-align: center;

        .widgetBody {
          height: 100% !important;
          cursor: default;
        }
      }
    }
  }
}
`;

export default AppWrapper;
