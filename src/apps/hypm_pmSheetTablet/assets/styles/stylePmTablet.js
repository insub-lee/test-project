import styled from 'styled-components';

import imgSearch from '../images/Search.png';
import iconSearch from '../images/Search_white.png';
import iconRequired from '../images/Required_20.png';
import iconArrowDropDown from '../images/Dropdown.png';
import iconArrowDropUp from '../images/Dropup.png';
// import iconArrowDropUpCo from '../images/co/Dropup.png';
import iconMore from '../images/More.png';

import fontRegular from '../fonts/NotoSansKR-Regular.woff2';
import fontBold from '../fonts/NotoSansKR-Bold.woff2';

const colorHqPrimary = '#FF6D60';
const colorCoPrimary = '#00A282';

const colorTextNormal = 'rgba(0,0,0, .54)';
const colorTextSub = 'rgba(0,0,0, .38)';
const colorTextBlack = 'rgba(0,0,0, .87)';
const colorBgBtOver = 'rgba(248,168,165,0.16)';
// const colorBgBtOverCo = 'rgba(110,211,193,0.16)';

const paddingDefault = '24px';
const heightHeader = '56px';
const heightSearch = '128px';
const heightSearchSelect = '56px';
const heightTitle = '60px';

const borderRadius = '4px';


const StylePmTablet = styled.div`
  @viewport {
    zoom: 1;
    width: device-width; //100vw
    orientation: landscape; // portrait
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
      z-index: 2;
      box-shadow: 0 0 4px 0 rgba(0,0,0,0.12), 0 4px 4px 0 rgba(0,0,0,0.24);

      &:after {
        content: "";
        clear: both;
        display: table;
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

      aside {
        float: right;

        .drop-more {
          position: relative;
          color: ${colorTextBlack};
          width: 128px;
          height: 56px;
          border: none !important;
          margin: 0;
          padding-right: 52px; 
          line-height: 24px;
          font-weight: bold;
          
          &:before {
            content: "";
            position: absolute;
            top: 16px;
            right: 16px;
            left: auto;
            display: inline-block;
            width: 24px;
            height: 24px;
            background: transparent url(${iconMore}) 50% 50%;
            background-size: 100% 100%;
            vertical-align: middle;
            opacity: 1;
          }

          &.ant-dropdown-open {
            background-color: ${colorBgBtOver};
          }
        }
      }
    }

    main {
      height: calc(100vh - ${heightHeader});

      .search-area {
        display: flex;
        justify-content: space-between;;
        flex-direction: row;
        // flex-wrap: nowrap;
        border-bottom: 1px solid rgba(0,0,0, .12);
        background-color: #F2F4F4;
        padding: ${paddingDefault};
        position: sticky;
        top: ${heightHeader};
        height: ${heightSearch};
        z-index: 1;
        
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
          z-index: 2;
        }

        .grid-area {
          position: sticky;
          top: calc(${heightHeader} + ${heightSearch} + ${heightTitle});
          z-index: 0;
          min-height: calc(100vh - (${heightHeader} + ${heightSearch} + ${heightTitle}) + 60px;);
          
        }
      }


    }
    

    // 도급사 

    &.contractor {

      header {
        h1 {
          color: ${colorCoPrimary};
        }
      }

    }

    // ant-button reset

    .ant-btn:hover, .ant-btn:focus, .ant-btn:active, .ant-btn.active {
      border: 1px solid #8c8c8c;
      box-shadow: none !important;
    }
  }

`;

export default StylePmTablet;
