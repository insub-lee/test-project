import styled from 'styled-components';
import arrowGoToPage from 'images/bizstore/arrow-gray.png';
import arrowGoToSubPage from 'images/bizstore/arrow-gray2.png';
import arrowDown from 'images/bizstore/arrow-down.png';
import arrowGoToPageMobile from 'images/bizstore/arrow-gray-mobile.png';

const BoxWrapper = styled.div`
  width: 100%;
  padding: 0;
  margin: 0 0 30px 0;
  &:last-child {
    margin-bottom: 0;
  }

  .storeListTitle {
    position: relative;
    margin: 0 5px 0 5px;
    padding-bottom: 10px;

    h3 {
      display: inline-block;
      height: 19px;
      color: #555555;
      font-size: 16px;
      font-weight: 600;
      line-height: 19px;
    }
    
    .noAppNotification ul {
      display:table;
      width: 100%;
      min-height:110px;
      margin:10px 0px;
      border-top: 1px solid #d1d2d3;
      color:#404040;
      text-align: center;

      li {
        display:table-cell;
        vertical-align:middle;

        img {
          vertical-align:middle;
          margin-right:9px;
        }

        h4 {
          display: inline-block;
          color:#404040;
        }
      }
    }

    .arrowGoToPage {
      position: absolute;
      top: -6px;
      right: 0;
      width: 20px;
      height: 34px;
      padding: 0;
      border: 0;
      background: url(${arrowGoToPage}) no-repeat 100% 50%;
    }

    .arrowGoBack {
      display: inline-block;
      width: 20px;
      height: 34px;
      position: absolute;
      left: 0;
      padding: 0;
      margin-top: -10px;
      border: 0;
      background: url(${arrowGoToPage}) no-repeat 100% 5px;
      transform: rotate(180deg);
      vertical-align: middle;
    }
  }

  .appBox {
    width: 275px;
    height: 110px;
    margin: 10px 5px 0 5px;

    &.gridMode {width: 287px !important;}
  }

  .appBoxBiz {
    width: 250px;
    height: 110px;
    margin: 10px 5px 0 5px;
  }

  .showReadMore {
    display: block;
    height: 55px;
    margin-top: 5px;

    > .showMoreBtn {
      width: 100%;
      height: 100%;
      border:none;
      background-image: url(${arrowDown});
      background-repeat: no-repeat;
      background-position: calc(50% - 5px) 10px;
    }
  }

  .storeBoxListWrapper {
    margin:0px 0px 10px 5px;
    padding:0px;

    .isoDeleteBtn {
      backgorund-color:red;
    }

    .storeRenderChildBlock {
      margin:0;
      padding:0;
      float:left;
      width:100%;
      height:45px;
      line-height:45px;
      margin-right: 10px;
      border-top:1px solid #d9d9d9;
      font-size:14px;
      cursor:pointer;

      &:hover {
        background-color:#f8f8f8;
      }
  
      > .goSubmenuBtn {
        width:calc(100% - 12px);
        height:45px;
        padding-left 20px;
        border:none;
        text-align:left;
        color: #000000;
        font-size: 14px;
        background: url(${arrowGoToSubPage}) no-repeat 100% 50%;
      }
    }

    > div:last-child {
      border-bottom:1px solid #d9d9d9;
    }
  }  

  // TabletView
  @media only screen and (max-width: 1024px) {
    margin: auto;
    padding 0 5px;

    .storeListTitle {
      // margin: 13px 5px 0 5px;

      h3 {
        height: 16px;
        color: #555555;
        font-size: 15px;
        font-weight: 600;
        line-height: 15px;
        letter-spacing: -0.5px;
      }

      .arrowGoToPage {
        top: -6px;
        right: 5px;
        background-image: url(${arrowGoToPageMobile});
        background-size: 9px 15px;
      }
    }

    .ant-row {
      .appBox {
        width: calc(50% - 10px);
        height: 128.5px;
      }
      .appBoxBiz {
        width: calc(50% - 10px);
        height: 128.5px;
      }
    }
  }

  // MobileView
  @media only screen and (max-width: 768px) {
    .ant-row {
      .appBox {
        width: calc(100% - 10px);
        height: 128.5px;
      }
      .appBoxBiz {
        width: calc(100% - 10px);
        height: 128.5px;
      }
    }
  }  
`;

export default BoxWrapper;
