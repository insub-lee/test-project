import styled from 'styled-components';
import IconManager from 'images/portal/icon-manager.png';
import { borderRadius } from '../../../../config/style-util';

const StyledHeader = styled.header`
  &.portalHeader {
    max-width: 100%;
    width: 100%;
    padding: 10px 15px;
    border-bottom: 1px solid #ccc;
    //background: ${props => props.theme.header.backgroundColor};
    /* background-image: linear-gradient(-90deg,rgba(51,148,225,.18),transparent);
    background-color: ${props => props.theme.header.backgroundColor}; */
    
    z-index: 1010;

    .onLeft {
      display: inline-block;
      width: calc(100% - 520px);
      height: 100%;

      > ul {
        padding: 4px 0 4px 2px;
      }

      .leftBottom {
        width: 100%;
        height: 33px;
        box-sizing: border-box;

        > span {
          position: relative;
          width: 50px;
          height: 33px;
          
          .icon.icon-menu {
            display: inline-block;
            margin: 3px 0 0 6px;
            padding: 0;
            font-size: 15px;
            line-height: 30px;

            &:before {
              color: #fff;
            }
          }

          .ant-badge {
            top: 15px;
            margin-right: 20px;
          }
        }

        .siteHeader {
          display: inline-block;
          height: 33px;
          line-height: 33px;
          color: #000;
          font-size: 16px;
        }

        .gotoHome {
            background: transparent;
            cursor: pointer;
        }

        .managerInfo {
          width: 24px;
          height: 24px;
          background: url(${IconManager}) no-repeat 50% 2px;
          vertical-align: middle;
          opacity: 0.8;
        }

        .forTabView {
          display: none;
        }
      }
      // onLeft 미디어 쿼리
      @media only screen and (max-width: 1024px) {
        width: 50%;
        max-width: calc(100% - 160px);
        height: 42px;

        > ul {
          display: inline-block;
          width: 100%;
          height: 100%;
          padding: 2px 0 0 11px;
          
          .leftBottom {

            > span {
              top: 2px;
              width: 36px;

              .ant-badge:not(.ant-badge-status) {
                margin-right: 9px;
              }
            }

            .siteHeader {
              margin-left: 12px;
              line-height: 36px;
              vertical-align: middle;
            }

            .gotoHome {
              background: transparent;
              cursor: pointer;
            }

            .forTabView {
              display: inline-block;
              width: 60px;
              position: absolute;
              left: 50%;
              top: 50%;
              margin-top: -15.5px;
            }
          }
        }
      }

      @media only screen and (max-width: 414px) {
        // width: calc(100% - 170px);

        .siteHeader {
          width: calc(100% - 49px);
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
      
    }

    .onRight {
      min-width: 520px;
      height: 100%;
      float: right;

      &:before {
        clear: both;
      }


      .rightBottom {
        width: 100%;
        text-align: right;
        padding-top: 7px;

        .iconMenuWrapper {
          float: right;
          &:after {
            clear: both;
          }
        }

        .icon-bell, .icon-setting, .icon-full {
          display: inline-block;
          line-height: 30px;
        }

        .icon-bell {
          font-size: 21px;

          &:before {
            color: #666;
          }
        }

        .icon-setting {
          font-size: 19px;

          &:before {
            color: #666;
            opacity: 1;
          }
        }

        .icon-full {
          font-size: 17px;

          &:before {
            color: #666;
          }
        }

        .iconMenuWrapper > li {
          float: left;
          display: block;
          width: 49px;
          height: 27px;
          line-height: 27px;
          text-align: center;

          &:first-child {
            position: relative;
            width: 200px;
          }

          &:last-child {
            width: 41px;
          }

          .ant-btn {
            height: 27px;
            font-size: 21px;
            ${borderRadius('0')};
            border-color: transparent;
            line-height: 24px;
            background: transparent;
          }

          .mInputBox {
            width: 100%;
            height: 27px;
            padding: 5px;
            line-height: 1;
            border-radius: 0px;
            border: none;
            color: #333;
            font-size: ${props => props.theme.header.memberSearch.fontSize};
            background: ${props => props.theme.header.memberSearch.inputBackgroundColor};
            border-bottom: 1px solid #aaa;
          }

          .mInputBox::placeholder {color: #fff !important; font-weight: 400;}

          .mInputBox.ant-input:focus {
            border-color: transparent;
            box-shadow: 0 0 0 transparent;
          }

          .mSearchButton {
            position: absolute;
            right: 0;
            width: 36px;
            border: 0;
            padding: 0;
            background-color: transparent;

            > span {
              display: block;
              height: 27px;
              line-height: 29px;
              font-size: 21px;
            }
          }

          .mAlarmButton .ant-badge .ant-badge-dot {
            top: -11px;
            width: 5px;
            height: 5px;
          }

          .userInfo {
            display: inline-block;
            width: 25px;
            height: 25px;
            margin-top: 3px;
    
            .myPicture {
              display: block;
              width: 25px;
              height: 25px;
              float: left;
              margin-right: 8px;
              ${borderRadius('15px')};
              overflow:hidden;
    
              > img {
                width: 100%;
                display: block;
              }
    
              &:after {
                content: "";
                display: table;
                clear: both;
              }
            }
    
            .myInfo {
              display: block;
              width: calc(100% - 38px);
              height: 30px;
              float: right;
              color: ${props => props.theme.header.userInfo.fontColor};
              font-size: ${props => props.theme.header.userInfo.fontSize};
              line-height: 25px;
              letter-spacing: -0.5px;
    
              @media only screen and (max-width: 1599px) {
                font-size: 12px;
              }
    
              > span:not(.myPosition) {
                float: left;
              }
    
              .myPosition {
                display: inline-block;
                min-width: 60%;
                max-width: 70%;
                margin-left: 10px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
    
                .iconDiv {
                  display: inline-block;
                  padding: 0 10px;
                  color: #cccccc;
                }
              }
            }
          }
          
        }
        
      }
      
      // onRight 미디어 쿼리
      @media only screen and (max-width: 1024px) {
        width: 50%;
        min-width: 160px;

        .rightTop {
          display: none;
        }

        .rightBottom {
          .iconMenuWrapper > li:nth-child(3), .iconMenuWrapper > li:nth-child(4) { display: none; }
        }

        .userInfo { display: none; }
      }

      @media only screen and (max-width: 414px) {
        max-width: 160px;

        .iconMenuWrapper > li:first-child { max-width: 110px; }
      }
    }
  }
`;

export default StyledHeader;
