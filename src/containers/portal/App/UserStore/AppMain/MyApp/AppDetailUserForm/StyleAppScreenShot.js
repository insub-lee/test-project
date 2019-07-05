import styled from 'styled-components';
import { palette } from 'styled-theme';
import { transition, borderRadius } from '../../../../../config/style-util';
import WithDirection from '../../../../../config/withDirection';

const AppIntroduction = styled.div`
  padding-top: 30px;
  border-top: 1px solid #e0e0e0;

  .carouselWrapper {
    display: block;
    margin: 30px auto;
  }

  .dscr {
    white-space: pre-wrap;
  }
`;

const AppsRequired = styled.div`
  display: inline-block;
  width: 100%;
  padding-top: 32px;
  border-top: 1px solid #e0e0e0;

  .ant-row {
    margin-left: -5px;
  }

  .appColWrapper {
    display: inline-block;
    width: calc(100% + 12px);
    margin-left: -5px;
    margin-bottom: 10px;

    .appCols {
      position: relative;
      display: inline-block;
      width: 164px;
      height: 200px;
      float: left;
      margin: 0 5px 10px 5px;
      // padding: 20px 20px 10px 20px;
      border: 1px solid #ced2d7;
      text-align: center;

      &:after {
        content: "";
        display: table;
        clear: both;
      }

      > a:first-child {
        display: inline-block;
        padding: 20px 20px 0 20px;
      }

      .appName {
        display: block;
        margin-top: 10px;
        color: #000000;
        font-size: 14px;
        letter-spacing: -0.5px;
        word-wrap: break-word;
        line-height: 1.3;
      }
    }
  }

  .moreMenuImg {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 25px;
    border: 0;
    cursor: pointer;
  }

  // .appListColumn{
  //   display: inline-block;
  //   width: 166px;
  //   height: 200px;
  //   float: left;
  //   margin: 0 5px;

  //   .appLinkBox {
  //     position: relative;
  //     display: inline-block;
  //     width: 100%;
  //     height: 100%;
  //     border: 1px solid #ced2d7;
  //   }
  // }
`;

const AppsRecommended = styled.div`
  display: inline-block;
  width: 100%;
  padding-top: 32px;
  border-top: 1px solid #e0e0e0;

  .ant-row {
    margin-left: -5px;
  }

  .appColWrapper {
    display: inline-block;
    width: calc(100% + 12px);
    margin-left: -5px;
    margin-bottom: 10px;

    .appCols {
      position: relative;
      display: inline-block;
      width: 164px;
      height: 200px;
      float: left;
      margin: 0 5px 10px 5px;
      // padding: 20px 20px 10px 20px;
      border: 1px solid #ced2d7;
      text-align: center;

      &:after {
        content: "";
        display: table;
        clear: both;
      }

      > a:first-child {
        display: inline-block;
        padding: 20px 20px 0 20px;
      }

      .appName {
        display: block;
        margin-top: 10px;
        color: #000000;
        font-size: 14px;
        letter-spacing: -0.5px;
        word-wrap: break-word;
        line-height: 1.3;
      }
    }
  }

  .moreMenuImg {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 25px;
    border: 0;
  }

  // .appListColumn{
  //   display: inline-block;
  //   width: 166px;
  //   height: 200px;
  //   float: left;
  //   margin: 0 5px;

  //   .appLinkBox {
  //     position: relative;
  //     display: inline-block;
  //     width: 100%;
  //     height: 100%;
  //     border: 1px solid #ced2d7;
  //   }
  // }
`;

const AppDetailPart5 = styled.div`
  padding-top: 32px;
  border-top: 1px solid #e0e0e0;
`;

const WDGridListViewWrapper = styled.div`

  &.GridView {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    background-color: #fff;
    position: relative;

    .isoAlGridImage {
      width: 150px;
      height: 150px;
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      flex-shrink: 0;
      align-items: center;
      -webkit-align-items: center;
      justify-content: center;
      -webkit-justify-content: center;
      overflow: hidden;
      background-color: ${palette('grayscale', 5)};
      position: relative;

      &:after {
        content: '';
        width: 100%;
        height: 100%;
        display: flex;
        background-color: rgba(0, 0, 0, 0.6);
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        ${transition()};
      }

      .ant-btn {
        &.isoAlAddToCart {
          background-color: #ffffff;
          border-color: #ffffff !important;
          color: ${palette('text', 0)};
          z-index: 1;
          position: absolute;
          height: 42px;
          opacity: 0;
          padding: 0 20px;
          transform: scale(0.8);
          ${transition()};

          i {
            margin: ${props =>
    (props['data-rtl'] === 'rtl' ? '0 0 0 10px' : '0 10px 0 0')};
            font-size: 14px;
          }

          &:hover {
            background-color: ${palette('grayscale', 4)};
          }

          &.ant-btn-loading {
            i:not(.anticon-loading) {
              margin: ${props =>
    (props['data-rtl'] === 'rtl' ? '0 10px 0 0' : '0 0 0 10px')};
            }
          }
        }
      }

      img {
        max-width: 100%;
      }

      @media only screen and (max-width: 991px) {
        width: 100%;
        overflow: hidden;
      }
    }

    .isoAlGridContents {
      width: 100%;
      padding: 20px 25px;
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      flex-direction: column;

      @media only screen and (max-width: 991px) {
        margin-top: 15px;
      }

      .isoAlGridName {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin-bottom: 5px;

        .ais-Highlight__nonHighlighted {
          font-size: 14px;
          font-weight: 700;
          color: ${palette('text', 0)};
          line-height: 1.3;
        }
      }

      .isoAlGridPriceRating {
        display: flex;
        align-items: center;

        .isoAlGridPrice {
          font-size: 14px;
          font-weight: 400;
          color: #ffffff;
          padding: 5px 10px;
          line-height: 1;
          position: absolute;
          top: 30px;
          right: 0px;
          background-color: ${palette('primary', 9)};
          ${borderRadius('3px 0 0 3px')};
        }

        .isoAlGridRating {
          display: none;
          .ant-rate {
            display: flex;
            .ant-rate-star {
              font-size: 9px;
              margin-right: 2px;
            }
          }
        }
      }

      .isoAlGridDescription {
        display: none;

        .ais-Highlight__nonHighlighted {
          font-size: 13px;
          font-weight: 400;
          color: ${palette('text', 2)};
          line-height: 1.5;
        }
      }
    }

    &:hover {
      .isoAlGridImage {
        &:after {
          opacity: 1;
        }

        .isoAlAddToCart {
          opacity: 1;
          transform: scale(1);
        }
      }
    }
  }

  &.ListView {
    width: 100%;
    display: flex;
    padding: 10px;
    background-color: #fff;
    margin-bottom: 15px;
    border: 1px solid ${palette('border', 0)};

    @media only screen and (max-width: 991px) {
      flex-direction: column;
    }

    .isoAlGridImage {
      width: 240px;
      height: auto;
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;

      &:after {
        content: '';
        width: 100%;
        height: 100%;
        display: flex;
        background-color: rgba(0, 0, 0, 0.6);
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        ${transition()};
      }

      .isoAlAddToCart {
        background-color: #ffffff;
        border-color: #ffffff !important;
        color: ${palette('text', 0)};
        z-index: 1;
        position: absolute;
        height: 42px;
        opacity: 0;
        padding: 0 20px;
        direction: ${props => (props['data-rtl'] === 'rtl' ? 'rtl' : 'ltr')};
        transform: scale(0.8);
        ${transition()};

        i {
          margin: ${props =>
    (props['data-rtl'] === 'rtl' ? '0 0 0 10px' : '0 10px 0 0')};
          font-size: 14px;
        }

        &:hover {
          background-color: ${palette('grayscale', 4)};
        }
      }

      &:hover {
        &:after {
          opacity: 1;
        }

        .isoAlAddToCart {
          opacity: 1;
          transform: scale(1);
        }
      }

      img {
        max-width: 100%;
      }

      @media only screen and (max-width: 991px) {
        width: 100%;
        height: auto;
        overflow: hidden;
      }
    }

    .isoAlGridContents {
      width: 100%;
      padding: 30px 15px;
      padding-left: 30px;
      display: flex;
      flex-direction: column;

      @media only screen and (max-width: 991px) {
        margin-top: 15px;
      }

      .isoAlGridName {
        .ais-Highlight__nonHighlighted {
          font-size: 16px;
          font-weight: 700;
          color: ${palette('text', 0)};
          line-height: 1.3;
          margin-bottom: 10px;
          display: flex;
        }
      }

      .isoAlGridPriceRating {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .isoAlGridPrice {
          font-size: 14px;
          font-weight: 400;
          color: ${palette('text', 0)};
          line-height: 1;
        }

        .isoAlGridRating {
          .ant-rate {
            display: flex;
            .ant-rate-star {
              font-size: 9px;
              margin-right: 2px;
            }
          }
        }
      }

      .isoAlGridDescription {
        .ais-Highlight__nonHighlighted {
          font-size: 13px;
          font-weight: 400;
          color: ${palette('text', 2)};
          line-height: 1.5;
        }
      }
    }
  }
`;

const GridListViewWrapper = WithDirection(WDGridListViewWrapper);

export {
  AppIntroduction,
  AppsRequired,
  AppsRecommended,
  AppDetailPart5,
  GridListViewWrapper,
};
