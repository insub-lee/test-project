/* eslint-disable import/no-unresolved */
import styled from 'styled-components';
import IconOut from '../../images/common/icon-out.png';
import IconAccdUnfold from '../../images/common/arrow-down.png';
import IconAccdFold from '../../images/common/arrow-up.png';
import w1x1 from '../../images/common/w1x1.png';
import w2x1 from '../../images/common/w2x1.png';
import w3x1 from '../../images/common/w3x1.png';
import w1x2 from '../../images/common/w1x2.png';
import w2x2 from '../../images/common/w2x2.png';
import w3x2 from '../../images/common/w3x2.png';
import w1x3 from '../../images/common/w1x3.png';
import w2x3 from '../../images/common/w2x3.png';

const StyleWidgetSetting = styled.div`
  position: absolute;
  width:  ${props => (props.isMenuFixed ? 'calc(100vw - 435px)' : '90vw')};
  left: ${props => (props.isMenuFixed ? '350px' : '96px')};
  height: 100vh;
  background-color: #ffffff;
  z-index: 1; //footer 내용 가리기 + 사이드바 보이기
  ${props =>
    props.isPortal
      && `padding: 45px 0px 0px;
      -webkit-transition: width 0.3s ease-out 0s, left 0.3s ease-out 0s;
      -o-transition: width 0.3s ease-out 0s, left 0.3s ease-out 0s;
      transition: width 0.3s ease-out 0s, left 0.3s ease-out 0s;`};
  
  .userSettingWrapper {
    width: 100%;

    .pageHeader {
      width: 100%;
      height: 55px;
      border-bottom: 1px solid #222222;
      color: #222222;
      font-size: 18px;
      line-height: 55px;
      text-align: center;

      .modalClose {
        position: absolute;
        right: -10px;
        width: 41px;
        height: 55px;
        border-color: transparent;
        background: url(${IconOut}) no-repeat 50% 50%;
      }
    }

    .navigation {
      width: 300px;
      padding-top: 15px;

      @media only screen and (max-width: 1200px) {
        float: left;
      }

      @media only screen and (max-width: 1160px) {
        float: none;
        width: 100%;
      }

      ul {
        display: inline-block;
        width: 100%;

        > li {
          height: 40px;
          padding-right: 20px;

          @media only screen and (max-width: 1160px) {
            float: left;
          }

          > div {
            width: 100%;
            height: 35px;
            padding-left: 10px;
            border: none;
            border-radius: 0;
            

            > a {
              display: inline-block;
              width: 100%;
              height: 100%;
              line-height: 35px;
              color: #404040;
              font-size: 15px;
              text-align: left;

              &:hover {
                color: #404040;
              }
            }

            &.current {
              background: #edeff2;
              > a {
                color: #f85023 !important;
                text-decoration: none;
                cursor: default;
              }
            }
          }
        }
      }
    }

    .navContent {
      display: inline-block;
      width: calc(100% - 300px);
      height: calc(100vh - 80px);
      margin-top: 15px;
      padding: 6px 20px 20px 20px;
      border: 1px solid #d8d8d8;

      @media only screen and (max-width: 1200px) {
        width: calc(100% - 300px);
        float: right;
      }

      @media only screen and (max-width: 1160px) {
        width: 100%;
        height: calc(100vh - 150px); 
        float: none;

        .custom-scrollbar {
          height: calc(100vh - 160px) !important;
        }
      }

      .title {
        position: relative;
        height: 50px;
        color: #404040;
        font-size: 17px;
        line-height: 50px;
        border-bottom: 1px solid #d8d8d8;

        &.commonWidget {
          width: calc(100% - 35px);
        }

        .accordion {
          position: absolute;
          top: 0;
          right: 0;
          display: inline-block;
          width: 32px;
          height: 50px;
          background-repeat: no-repeat;
          background-position: 50% 20px;
  
          &.unfold {
            background-image: url(${IconAccdUnfold});
          }
  
          &.fold {
            background-image: url(${IconAccdFold});
          }
        }
      }
      .commonPage {
        width: calc(100% - 35px);

        .basicSettingTable {
          margin-top: 25px;
  
          > table {
            
            th {
              width: 150px;
              padding-top: 8px;
              color: #808080;
              font-size: 13px;
              vertical-align: top;
            }
  
            td {
              padding-bottom: 25px;
              color: #404040;
              font-size: 14px;
  
              .radioWrapper {
                display: inline-block;
                margin: 0 27px;
  
                li {
                  float: left;
                  width:67px;
                  height: 23px;
                  line-height: 35px;
                }
              }
  
              .inputWrapper {
                display: inline-block;
                width: 503px;
  
                @media only screen and (max-width: 1440px) {
                  margin-top: 5px;
                }
  
                > input {
                  width: 100%;
                  height: 35px;
                }
              }
  
              //색상 선택
              .colorOptions {
                padding: 15px 14px;
                background: #9dc4e5;
                vertical-align: middle;
            
                //radio 버튼은 투명하게
                .ant-radio-button-wrapper {
                  width: 58px;
                  height: 45px;
                  margin: 5px;
                  padding: 0;
                  border: none;
                  border-radius: 0;
                  font-size: 14px;
                  text-align: center;
            
                  &:hover {
                    border-color: transparent;
                  }
            
                  &:not(:first-child)::before {
                    background-color: transparent;
                  }
            
                  &.ant-radio-button-wrapper-checked {
                    box-shadow: none;
            
                    &:first-child {
                      border-color: transparent;
                    }
            
                    > span > div {
                      border-color: #000000 !important;
                    }
                  }
            
                  > span > div {
                    height: 45px;
                    line-height: 41px;
                    border: 2px solid transparent;
                  }
            
                }
              }
  
              // 규격 설정
              .widgetSize {
  
                //radio 버튼은 투명하게
                .ant-radio-button-wrapper {
                  width: 102px;
                  height: 102px;
                  margin-right: 3px;
                  margin-bottom: 3px;
                  padding: 0;
                  border: none;
                  border-radius: 0;
                  text-align: center;
            
                  &:hover {
                    border-color: transparent;
                  }
            
                  &:not(:first-child)::before {
                    background-color: transparent;
                  }
            
                  &.ant-radio-button-wrapper-checked {
                    box-shadow: none;
            
                    &:first-child {
                      border-color: transparent;
                    }
            
                    > span > div {
                      border-color: #000000 !important;
                    }
                  }
  
                .rbox  {
                  display: inline-block;
                  width: 102px;
                  height: 102px;
                  margin-right: 3px;
                  background-color: #f5f5f5;
                  background-repeat: no-repeat;
                  background-position: 50% 49%;
                  padding-top: 80px;
                  border: 2px solid transparent;
  
                  &.w1X1 { background-image: url(${w1x1})};
                  &.w2X1 { background-image: url(${w2x1})};
                  &.w3X1 { background-image: url(${w3x1})};
                  &.w1X2 { background-image: url(${w1x2})};
                  &.w2X2 { background-image: url(${w2x2})};
                  &.w3X2 { background-image: url(${w3x2})};
                  &.w1X3 { background-image: url(${w1x3})};
                  &.w2X3 { background-image: url(${w2x3})};
  
                  > p {
                    color: #404040;
                    font-size: 12px;
                    line-height: 1;
                  }
                }
              }
  
            }
          }
        }

      }
    }

    .contentByMenu {
      width: calc(100% - 35px);
        
      .modalContents {
        padding: 0;
        margin-top: 0;

        .innerBody {
          width: 100% !important;
          // height: 765px;
          border: none;

          .leftActivity {
            width: 65%;
            padding-top: 15px !important;
            float: left;

            .treeWrapper, .boardGroupList {
              float: left;
              height: 100%;
              margin: 0;
            }

            .treeWrapper {width: calc(48% - 30px);}
            .boardGroupList {width: calc(48% - 10px);}

            .userGridResult, .boardList {
              float: right;
              width: 52%;

              > div:not(.userSearch) {
                height: calc(100% - 52px);
              }

              .react-grid-Container {
                height: 100%;

                .react-grid-Main {
                  height: 100%;

                  .react-grid-Grid {
                    height: 100% !important;

                    .react-grid-Viewport {
                      // height: calc(100% - 17px) !important;
                      height: 100% !important;

                      .react-grid-Canvas {
                        height: calc(100% - 50px) !important;
                      }
                    }
                  }
                }
              }

              .react-grid-Row > div:not(.react-grid-Cell--locked) {
                width: 100% !important;
              }
            }
            .userGridResult {height: calc(100% - 15px);}
            .boardList {
              height: 100%;

              > div:not(.userSearch) {height: calc(100% - 80px) !important;}
            }
          }

          .rightActivity {
            width: 35%;
            float: right;
            padding: 15px 0 0 0 !important;

            > div {
              height: 100%;

              @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {  
                /* IE10+ specific styles go here */
                height: calc(100% - 18px);
              }
            }
          }
        }
      }
    }
  }
`;

export default StyleWidgetSetting;
