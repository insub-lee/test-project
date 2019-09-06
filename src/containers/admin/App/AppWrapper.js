import styled from 'styled-components';
import IconSearchMobile from '../../../images/bizstore/icon-search-mobile.png';
import IconTriggerUnfold from '../../../images/bizstore/arrow-down-white.png';
import IconTriggerFold from '../../../images/bizstore/arrow-up-white.png';

const AppWrapper = styled.div`
  .storeHeader {
    position: fixed;
    width: 100%;
    background: #222222;
    padding: 0 20px 0 10px;
    height: 42px;
    color: #ffffff;
    z-index: 1000;

    .onCenter {
      position: absolute;
      top: 0;
      left: 50%;
      height: 42px;
      margin-left: -52.5px;
      line-height: 41px;

      > a {
        display: inline-block;
      }

      // Tablet과 Mobile에서 보임
      .headerMenu {
        display: none;
      }
    }
  }

  .storeContent {
    min-height: 100vh;
    padding: 0;
    flex-shrink: 0;
    background: #ffffff;

    .storeLayoutContentWrapper {
      min-height: calc(100vh - 140px); //header와 footer 높이값 빼기
      padding-left: 260px;
    }
  }

  .sidebarMobile,
  .triggerSider {
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
        height: 42.5px;
      }

      .onRight {
        position: absolute;
        right: 0;
        top: 0;
        width: auto;
        height: 42.5px;

        // DesktopView에서 보임
        .searchInput.store {
          > input {
            display: none;
          }

          .searchButton {
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

    .headerMenu,
    .leftMenuWrapper {
      display: none;
    }

    .storeContent {
      padding: 0;

      .contentWrapper {
        min-height: calc(100vh - 42.5px);

        .storeLayoutContentWrapper {
          padding-top: 85px;
        }
      }
    }

    .triggerSider {
      display: block;

      .trigger {
        width: 35px;
        height: 42.5px;
        padding: 0;

        &.anticon-sider-unfold {
          background: url(${IconTriggerUnfold}) no-repeat 50% 55%;
          background-size: 13px 7.5px;
        }

        &.anticon-sider-fold {
          background: url(${IconTriggerFold}) no-repeat 50% 50%;
          background-size: 13px 7.5px;
        }
      }
    }
  }

  .appListWrapper {
    display: flex;
    /* padding-left: 270px; */
    padding-left: 230px;

    .listWrapper {
      display: flex;
    }
  }
`;

export default AppWrapper;
