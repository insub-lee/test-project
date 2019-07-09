
import React from 'react';
import styled from 'styled-components';
import Cards from './card';
import Mark from 'images/bizstore/mark.png';
import CheckedIcon from 'images/bizstore/icon-using.png';

const CardComp = props => <Cards {...props} />;

const Card = styled(CardComp)`
  height: 100%;
  padding: 28px 15px;

  &:hover .hoverCtgIcons {
    opacity: 1;
  }

  &.ant-card-bordered {
    border-color: #f5f5f5 !important;
    background: #f5f5f5;

    &:hover {
      border-radius: 0;
      border-color: #886ab5 !important;
    }

    &.mark {
      background-image: url(${Mark});
      background-repeat: no-repeat;
      background-position: 0 0;
    }

    .ant-card-body {
      position: relative;
      padding: 0 0 0 66px;

      .CtgDivIcons, .BizDivIcons {
        position:absolute;
        top:0;
        left:0;
        width:55px;
        height:55px;
        border-radius:18.8%
        overflow:hidden;

        > img {
          width:100%;
        }
      }

      .appTitle {
        color: #000000;
        font-size: 14px;
        line-height: 1;
        letter-spacing: -0.5px;
      }

      .appDesc {
        display: block;
        margin-top: 7px;
        color: #707070;
        font-size: 12px;
        letter-spacing: -0.5px;
        line-height: 1.2;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }

      .ratingAvgInfo {

        .ant-rate {
          color: #ffb000;
          font-size: 11px;
          line-height: 12px;
  
          .ant-rate-star {
            margin-right: 0;
            margin-top: 7px;
          }
        }

        .rateNumber {
          display: inline-block;
          padding-left: 10px;
          padding-right: 5px;
          color: #707070;
          font-size: 12px;
        }

        .userIcon {
          margin-top: -1px;
        }
      }
    }

    &.bizAppCard {
      .appTitle {
        padding-top: 8px;
      }

      .appDesc {
        margin-top: 9px;
      }
    }
  }

  .hoverCtgIcons {
    position: absolute;
    top: -18px;
    right: -5px;
    width: 72px;
    height: 35px;
    opacity: 0;

    button {
      width: 35px;
      height: 35px;
      padding: 0;
      border: 1px solid #969696;
      background-color: #a8a8a8;
      color: #ffffff;
      font-size: 11px;
      letter-spacing: -1px;

      > img {
        vertical-align: bottom;
      }
    }

    .btnCategoryRgt {
      float: left;
      margin-right: 2px;
    }

    .btnMenuRgt {
      float: right;
    }
  }

  .moreMenuImg {
    display: none;
  }

  .displayCtgIcons {
    position: absolute;
    top: -20px;
    right: -5px;
    min-width: 48px;
    height: 20px;
    padding-left: 14px;
    background: url(${CheckedIcon}) no-repeat 0 50%;

    @media only screen and (max-width: 1024px) {
      right: 10px;
    }

    .infoRgt {
      float: right;
      color: #656565;
      font-size: 12px;
      letter-spacing: -0.5px;
    }
  }

  .ant-btn:hover, .ant-btn:focus {
    color: #ffffff;
    font-size: 11px;
    letter-spacing: -1px;
  }

  @media only screen and (max-width: 1024px) {
    padding: 31.5px 0 30px 17.5px;

    .ant-card-body {
      height: 100%;
      padding: 0 0 0 78px !important;

      .CtgDivIcons {
        width: 66px !important;
        height: 66px !important;
      }

      .appTitle {
        font-size: 16px !important;
        letter-spacing: -0.5px;
      }

      .appDesc {
        width: 100%;
        padding-right: 10px;
        font-size: 14px !important;
        line-height: 1.3;
        letter-spacing: -0.5px;
        text-overflow: ellipsis; 
        white-space: nowrap; 
        overflow: hidden;
      }

      .ratingAvgInfo {
        .ant-rate {
          font-size: 13px !important;
          line-height: 17px !important;
        }

        .rateNumber {
          font-size: 12px;
        }

        .userIcon {
          margin-top: -1px;
        }
    }

    .hoverCtgIcons {
      // DesktopView에서 보임
      display: none;
    }
    .moreMenuImg {
      display: block;
      position: absolute;
      top: -32px;
      right: 0;
      padding: 8px 12px 9px;
    }

  }
`;

export default Card;
